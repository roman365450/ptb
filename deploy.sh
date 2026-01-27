#!/bin/bash
set -e

echo "Pulling latest..."
git -C /Users/db/code/active/ptb pull

echo "Deploying PTB..."
lxc file push -r /Users/db/code/active/ptb/ hetzner:ptb-web/var/www/
ssh hetzner "lxc exec ptb-web -- rm -rf /var/www/ptb/.git && lxc exec ptb-web -- chown -R www-data:www-data /var/www/ptb"
echo "Done → https://ptb.hetzner.zero2one.ee"
