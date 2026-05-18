#!/usr/bin/env python3
"""
Inject dynamic related-tools placeholder and script tag into all tool pages.
This script scans all subdirectories for index.html files and injects:
1. A placeholder <div id="dynamic-related-tools"></div> before the FAQ section
2. A <script> tag linking to related-tools.js in the <head>
"""

import os
import re
from pathlib import Path

# Root directory of the project
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Directories to skip (not tool directories)
SKIP_DIRS = {
    'assets', 'scripts', 'data', 'contact', 'about', 'privacy', 
    'terms', 'disclaimer', 'updates', '.git', '__pycache__'
}

def inject_script_tag(html_content):
    """Inject the related-tools.js script tag in the <head>."""
    # Since all tools are in subfolders, the paths are relative
    search_data_script = '    <script src="../assets/js/search-data.js" defer></script>\n'
    related_tools_script = '    <script src="../assets/js/related-tools.js" defer></script>\n'
    
    # Find the closing </head> tag
    head_close_pattern = r'(</head>)'
    
    # Check if the scripts are already present
    if 'search-data.js' not in html_content:
        html_content = re.sub(head_close_pattern, search_data_script + r'\1', html_content, count=1)
    
    if 'related-tools.js' not in html_content:
        html_content = re.sub(head_close_pattern, related_tools_script + r'\1', html_content, count=1)
    
    return html_content

def inject_placeholder(html_content):
    """Inject the placeholder <div> before the FAQ section."""
    placeholder = '        <div id="dynamic-related-tools"></div>\n\n'
    
    # Check if placeholder already exists
    if 'dynamic-related-tools' in html_content:
        return html_content
    
    # Find the FAQ section pattern
    # Look for <h3>Frequently Asked Questions</h3> or similar
    faq_pattern = r'(\s+<h3>Frequently Asked Questions</h3>)'
    
    # If the FAQ pattern is found, insert before it
    if re.search(faq_pattern, html_content):
        modified_content = re.sub(
            faq_pattern,
            placeholder + r'\1',
            html_content,
            count=1
        )
        return modified_content
    
    # Alternative: Look for <div class="faq-container">
    faq_container_pattern = r'(\s+<div class="faq-container">)'
    if re.search(faq_container_pattern, html_content):
        modified_content = re.sub(
            faq_container_pattern,
            placeholder + r'\1',
            html_content,
            count=1
        )
        return modified_content
    
    # Alternative: Look for <article class="seo-content-container
    article_pattern = r'(\s+<article class="seo-content-container)'
    if re.search(article_pattern, html_content):
        modified_content = re.sub(
            article_pattern,
            placeholder + r'\1',
            html_content,
            count=1
        )
        return modified_content
    
    return html_content

def is_tool_directory(dir_path):
    """Check if a directory is a tool directory (contains index.html)."""
    index_file = os.path.join(dir_path, 'index.html')
    return os.path.isfile(index_file)

def process_tool_file(file_path):
    """Process a single tool index.html file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Inject script tag
        content = inject_script_tag(content)
        
        # Inject placeholder
        content = inject_placeholder(content)
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return True
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Main function to scan and inject into all tool pages."""
    print(f"Scanning {ROOT_DIR} for tool pages...")
    
    processed_count = 0
    error_count = 0
    
    # Iterate through all directories in ROOT_DIR
    for item in os.listdir(ROOT_DIR):
        item_path = os.path.join(ROOT_DIR, item)
        
        # Skip if not a directory or if it's in the skip list
        if not os.path.isdir(item_path) or item in SKIP_DIRS:
            continue
        
        # Check if this is a tool directory
        if is_tool_directory(item_path):
            index_file = os.path.join(item_path, 'index.html')
            print(f"Processing: {item}...", end=' ')
            
            if process_tool_file(index_file):
                print("✓ Done")
                processed_count += 1
            else:
                print("✗ Error")
                error_count += 1
    
    print(f"\n{'='*50}")
    print(f"Summary:")
    print(f"  Processed: {processed_count} tool pages")
    print(f"  Errors: {error_count}")
    print(f"{'='*50}")

if __name__ == '__main__':
    main()
