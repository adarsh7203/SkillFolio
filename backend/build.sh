#!/usr/bin/env bash
set -o errexit

# Install backend dependencies
pip install -r requirements.txt

# Install Playwright browser
playwright install --with-deps chromium
