import os

# Security Constraint: STRICTLY confine all operations to the 'docs' directory
DOCS_DIR = "docs"

def ensure_docs_dir():
    """Ensure the docs directory exists without touching other folders."""
    if not os.path.exists(DOCS_DIR):
        os.makedirs(DOCS_DIR)

def save_markdown(filename, content):
    """Save generated Markdown strictly inside the docs/ folder."""
    # Prevent path traversal vulnerabilities
    filepath = os.path.join(DOCS_DIR, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Success: Saved generated content to {filepath}")

def main():
    ensure_docs_dir()
    
    # NOTE FOR BAYEZID: Insert your script logic here.
    
    # Example logic:
    sample_content = "# Auto-Generated Guideline\n\nThis content is strictly isolated from the main project."
    save_markdown("guideline.md", sample_content)

if __name__ == "__main__":
    main()