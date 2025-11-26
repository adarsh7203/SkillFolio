#!/usr/bin/env bash
set -o errexit

echo "Installing system dependencies..."

apt-get update
apt-get install -y wget gnupg
apt-get install -y xvfb

echo "Installing wkhtmltopdf..."
wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-1/wkhtmltox_0.12.6.1-1.focal_amd64.deb
apt install -y ./wkhtmltox_0.12.6.1-1.focal_amd64.deb

echo "wkhtmltopdf installed successfully!"
