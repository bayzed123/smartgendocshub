#!/usr/bin/env python3
"""
SEO Optimizer for SmartGen Tools
Automatically updates all tool pages with:
- High-CTR meta tags
- Open Graph tags
- Twitter Cards
- Canonical links
- JSON-LD schema markup
- Semantic HTML structure
"""

import json
import os
import re
from pathlib import Path

# Load SEO metadata
with open('seo-metadata.json', 'r') as f:
    seo_data = json.load(f)['tools']

def get_tool_name(folder_name):
    """Convert folder name to tool name"""
    return folder_name.replace('-', ' ').title()

def generate_json_ld_schema(tool_id, tool_data):
    """Generate JSON-LD schema markup"""
    schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": tool_data['title'].replace(' | SmartGen', ''),
        "description": tool_data['description'],
        "url": f"https://smartgentools.com/{tool_id}/",
        "applicationCategory": tool_data['applicationCategory'],
        "operatingSystem": "All",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "creator": {
            "@type": "Organization",
            "name": "SmartGen",
            "url": "https://smartgentools.com/"
        }
    }
    return json.dumps(schema, indent=2)

def update_tool_page(tool_folder, tool_id, tool_data):
    """Update a single tool page with SEO metadata"""
    index_path = Path(tool_folder) / 'index.html'
    
    if not index_path.exists():
        print(f"⚠️  No index.html found in {tool_folder}")
        return False
    
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Generate meta tags
    meta_title = tool_data['title']
    meta_description = tool_data['description']
    canonical_url = f"https://smartgentools.com/{tool_id}/"
    og_title = tool_data['ogTitle']
    og_description = tool_data['ogDescription']
    og_image = tool_data['ogImage']
    json_ld = generate_json_ld_schema(tool_id, tool_data)
    
    # Update title tag
    content = re.sub(
        r'<title>.*?</title>',
        f'<title>{meta_title}</title>',
        content,
        flags=re.DOTALL
    )
    
    # Update or add meta description
    if '<meta name="description"' in content:
        content = re.sub(
            r'<meta name="description" content="[^"]*"',
            f'<meta name="description" content="{meta_description}"',
            content
        )
    else:
        content = re.sub(
            r'(<meta name="viewport"[^>]*>)',
            f'\\1\n    <meta name="description" content="{meta_description}">',
            content
        )
    
    # Add canonical link
    if '<link rel="canonical"' not in content:
        content = re.sub(
            r'(<meta name="viewport"[^>]*>)',
            f'\\1\n    <link rel="canonical" href="{canonical_url}">',
            content
        )
    else:
        content = re.sub(
            r'<link rel="canonical" href="[^"]*"',
            f'<link rel="canonical" href="{canonical_url}"',
            content
        )
    
    # Add Open Graph tags
    og_tags = f'''    <meta property="og:title" content="{og_title}">
    <meta property="og:description" content="{og_description}">
    <meta property="og:url" content="{canonical_url}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="{og_image}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{og_title}">
    <meta name="twitter:description" content="{og_description}">
    <meta name="twitter:image" content="{og_image}">'''
    
    # Remove existing OG tags if present
    content = re.sub(
        r'    <meta property="og:[^>]*>\n',
        '',
        content
    )
    content = re.sub(
        r'    <meta name="twitter:[^>]*>\n',
        '',
        content
    )
    
    # Add OG tags before closing head
    content = re.sub(
        r'(</head>)',
        f'{og_tags}\n\\1',
        content
    )
    
    # Update or add JSON-LD schema
    if '<script type="application/ld+json">' in content:
        # Replace existing schema
        content = re.sub(
            r'<script type="application/ld\+json">.*?</script>',
            f'<script type="application/ld+json">\n{json_ld}\n    </script>',
            content,
            flags=re.DOTALL
        )
    else:
        # Add new schema
        content = re.sub(
            r'(</head>)',
            f'    <script type="application/ld+json">\n{json_ld}\n    </script>\n\\1',
            content
        )
    
    # Write updated content
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Updated: {tool_id}")
    return True

def main():
    """Main function to optimize all tool pages"""
    print("🚀 Starting SEO Optimization for SmartGen Tools...\n")
    
    updated_count = 0
    failed_count = 0
    
    for tool_id, tool_data in seo_data.items():
        tool_folder = tool_id
        
        if os.path.isdir(tool_folder):
            try:
                if update_tool_page(tool_folder, tool_id, tool_data):
                    updated_count += 1
                else:
                    failed_count += 1
            except Exception as e:
                print(f"❌ Error updating {tool_id}: {str(e)}")
                failed_count += 1
        else:
            print(f"⚠️  Folder not found: {tool_folder}")
            failed_count += 1
    
    print(f"\n{'='*50}")
    print(f"✅ SEO Optimization Complete!")
    print(f"📊 Updated: {updated_count} tools")
    print(f"❌ Failed: {failed_count} tools")
    print(f"{'='*50}\n")

if __name__ == '__main__':
    main()
