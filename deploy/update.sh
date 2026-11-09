#!/usr/bin/env bash
# Run as root on the Ubuntu deployment. Never prints runtime credentials.
set -Eeuo pipefail

repo=/opt/andarzgoo
database=/var/lib/andarzgoo/site.sqlite
changed=0
backup_ready=0
backup_dir=''
stage=''

if [ "$(id -u)" -ne 0 ]; then
  echo 'Run this updater as root.' >&2
  exit 1
fi
cd "$repo"
if [ -n "$(git status --porcelain)" ]; then
  echo 'Local repository changes found. Nothing was changed; review git status first.' >&2
  exit 1
fi
if [ ! -f "$database" ]; then
  echo 'Expected database is missing. Nothing was changed.' >&2
  exit 1
fi
old_sha=$(git rev-parse HEAD)
was_active=$(systemctl is-active andarzgoo || true)
cleanup() { if [ -n "$stage" ]; then rm -rf -- "$stage"; fi; }
rollback() {
  local result=$?
  if [ "$result" -eq 0 ]; then result=1; fi
  trap - ERR INT TERM
  set +e
  echo 'Update failed. Restoring the previous deployment.' >&2
  systemctl stop andarzgoo
  if [ "$changed" -eq 1 ]; then git reset --hard "$old_sha"; fi
  if [ "$backup_ready" -eq 1 ]; then
    for suffix in -wal -shm -journal; do
      if [ -f "$database$suffix" ]; then mv -- "$database$suffix" "$backup_dir/failed-site.sqlite$suffix"; fi
    done
    install -o andarzgoo -g andarzgoo -m 640 "$backup_dir/site.sqlite" "$database"
  fi
  if [ "$was_active" = active ]; then systemctl start andarzgoo; fi
  echo "Backup directory: ${backup_dir:-not created}" >&2
  echo 'Send the error output for investigation; do not delete the backups.' >&2
  exit "${result:-1}"
}
trap cleanup EXIT

echo 'Fetching the latest source...'
git fetch origin
new_sha=$(git rev-parse origin/main)
if ! git merge-base --is-ancestor "$old_sha" "$new_sha"; then
  echo 'Local main has diverged. Nothing was changed.' >&2
  exit 1
fi

# Verify an isolated copy before stopping the running website.
stage=$(mktemp -d /tmp/andarzgoo-stage.XXXXXXXX)
git archive "$new_sha" | tar -x -C "$stage"
echo 'Testing the candidate version...'
node --check "$stage/server.mjs"
node --check "$stage/worker.js"
env -u WORKER_FILE node "$stage/tests/admin-workflow.mjs"

echo 'Stopping the app and backing up the database...'
install -d -m 700 /root/andarzgoo-backups
backup_dir=$(mktemp -d /root/andarzgoo-backups/update-XXXXXXXX)
printf '%s\n' "$old_sha" > "$backup_dir/previous-commit.txt"
printf '%s\n' "$new_sha" > "$backup_dir/new-commit.txt"
systemctl stop andarzgoo
trap rollback ERR INT TERM
ANDARZ_DATABASE="$database" ANDARZ_BACKUP="$backup_dir/site.sqlite" node --input-type=module <<'JS'
import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync(process.env.ANDARZ_DATABASE);
db.prepare('VACUUM INTO ?').run(process.env.ANDARZ_BACKUP);
db.close();
JS
chmod 600 "$backup_dir/site.sqlite"
backup_ready=1
changed=1
git merge --ff-only "$new_sha"
runuser -u andarzgoo -- env DB_PATH="$database" node "$repo/deploy/migrate.mjs"
systemctl start andarzgoo

echo 'Waiting for the application...'
healthy=0
for attempt in $(seq 1 20); do
  if curl --noproxy '*' --max-time 3 --fail --silent --output /dev/null http://127.0.0.1:3000/ \
    && curl --noproxy '*' --max-time 3 --fail --silent --output /dev/null http://127.0.0.1:3000/admin; then
    healthy=1
    break
  fi
  sleep 1
done
if [ "$healthy" -ne 1 ]; then
  journalctl -u andarzgoo -n 15 --no-pager
  false
fi
trap - ERR INT TERM
echo "Updated successfully: $new_sha"
echo "Database backup: $backup_dir/site.sqlite"
echo 'Home and admin pages returned successful HTTP responses.'
echo 'Open https://andarzgo.shop and refresh the page.'
