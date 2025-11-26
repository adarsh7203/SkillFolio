#!/bin/bash
set -e

# Install Python dependencies
pip install -r requirements.txt

# Make wkhtmltopdf binary executable
chmod +x bin/wkhtmltopdf
