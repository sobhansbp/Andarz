#!/usr/bin/env bash
# Run with root privileges after updating the application code.
set -Eeuo pipefail
cd /opt/andarzgoo
node --check deploy/import-config.mjs
was_active=$(systemctl is-active andarzgoo || true)
restart_app() {
  local result=$?
  trap - EXIT
  if [ "$was_active" = active ]; then
    if ! systemctl start andarzgoo; then
      echo 'Could not restart andarzgoo; inspect journalctl -u andarzgoo.' >&2
      exit 1
    fi
  fi
  exit "$result"
}
trap restart_app EXIT
systemctl stop andarzgoo
node deploy/import-config.mjs
systemctl start andarzgoo
for attempt in $(seq 1 20); do
  if curl --noproxy '*' --max-time 3 --fail --silent --output /dev/null http://127.0.0.1:3000/; then
    echo 'Configuration transfer complete. Open https://andarzgo.shop/admin and check the sessions.'
    exit 0
  fi
  sleep 1
done
journalctl -u andarzgoo -n 15 --no-pager
exit 1
