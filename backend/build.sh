#!/bin/bash
set -e

# Install required system packages for wkhtmltopdf
apt-get update
apt-get install -y \
    libjpeg8 \
    libxrender1 \
    libxext6 \
    libfontconfig1 \
    libfreetype6 \
    xfonts-75dpi \
    xfonts-base

# Make wkhtmltopdf executable
chmod +x backend/bin/wkhtmltopdf

# Install Python dependencies (from repo root)
pip install -r backend/requirements.txt
