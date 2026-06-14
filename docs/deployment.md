# Deployment Guide

Follow these guidelines to understand the deployment architecture of the SmartGen documentation system.

## CI/CD Architecture
This documentation site utilizes a strict isolation architecture. 
1. **Trigger**: Changes pushed to the `docs/` directory or configuration files.
2. **Automation**: A custom script (`generate_docs.py`) processes internal data.
3. **Build**: MkDocs compiles the Markdown files into a static HTML site.
4. **Deploy**: GitHub Actions publishes the output directly to GitHub Pages.

## Local Testing
If you want to test the documentation locally without affecting the main project, run the following commands:

```bash
# Install required dependencies
pip install -r requirements.txt

# Start the local development server
mkdocs serve