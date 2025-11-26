#!/bin/bash
set -e

apt-get update
apt-get install -y xfonts-75dpi xfonts-base

chmod +x backend/bin/wkhtmltopdf
pip install -r requirements.txt