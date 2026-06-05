import os
from google import genai
from github import Github, Auth

# API and GitHub Configuration Setup
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GITHUB_TOKEN = os.getenv("GH_TOKEN")
REPO_NAME = os.getenv("GITHUB_REPOSITORY")

# Initialize Gemini and GitHub clients using the latest SDK
client = genai.Client(api_key=GEMINI_API_KEY)
auth = Auth.Token(GITHUB_TOKEN)
g = Github(auth=auth)
repo = g.get_repo(REPO_NAME)

# Target directory for saving generated markdown files
BLOG_FOLDER = "Blog-posts"

def get_existing_data():
    """Fetches existing blog topics to prevent duplicates and retrieves formatting samples."""
    topics = []
    sample_format = ""
    try:
        contents = repo.get_contents(BLOG_FOLDER)
        files = [f for f in contents if f.type == "file" and f.name.endswith(".md")]
        topics = [f.name.replace(".md", "").lower() for f in files]
        
        # Read the first available blog to copy its layout and structure
        if files:
            sample_file = repo.get_contents(files[0].path)
            sample_format = sample_file.decoded_content.decode('utf-8')
            
        return topics, sample_format
    except Exception as e:
        print(f"Notice: Directory might not exist yet. It will be created automatically. Details: {e}")
        return topics, sample_format

def get_repository_tools():
    """Scans the repository to understand the context and tools available."""
    try:
        contents = repo.get_contents("")
        tools = [c.name for c in contents if c.type == "file" and not c.name.startswith('.')]
        return ", ".join(tools)
    except Exception:
        return "Various open-source tech tools, scripts, and automation workflows."

def generate_blog_content(existing_blogs, tools_info, sample_format):
    """Generates a 1500+ word educational tech guide using Gemini 1.5 Pro."""
    
    prompt = f"""
    You are an expert open-source contributor, software educator, and technical blogger. 
    Our repository contains these files/tools context: {tools_info}.
    Topics ALREADY covered (DO NOT write about these to avoid duplication): {existing_blogs}.
    
    CRITICAL FORMATTING INSTRUCTION:
    If a sample format is provided below, you MUST strictly follow its exact styling (headings, bold text, spacing):
    ---
    {sample_format}
    ---
    
    Task Instructions:
    1. Select a UNIQUE, highly engaging, and advanced tech topic related to our repository context.
    2. Write a comprehensive, step-by-step educational tech guide. 
    3. MANDATORY LENGTH: The blog post MUST be a minimum of 1500 words. Dive deep into technical architecture, provide relevant code snippets, and explain the logic under the hood.
    4. TONE: "Open-source learning style" - make it transparent, highly informative, and encouraging so that ANYONE can learn. Maintain a human-touch, conversational yet professional voice.
    5. At the very end of the blog, include a "Working Need FAQ" section focusing strictly on practical usage, real-life problem solving, and troubleshooting.
    6. First line of your response MUST be exactly: 'FILENAME: your-topic-slug.md' followed by a newline, and then the Markdown content.
    """
    
    # Utilizing the most capable model available for the API
    response = client.models.generate_content(
        model='gemini-1.5-pro-latest',
        contents=prompt
    )
    return response.text

def save_blog_to_github(generated_text):
    """Parses the AI output and commits it directly to the GitHub repository."""
    if "FILENAME:" not in generated_text:
        print("Error: Invalid formatting returned by the AI model. Missing FILENAME tag.")
        return False

    # Extract filename and the actual blog content
    parts = generated_text.split("\n", 1)
    title_slug = parts[0].replace("FILENAME:", "").strip()
    blog_content = parts[1].strip()
    
    # Ensure proper markdown extension
    if not title_slug.endswith(".md"):
        title_slug += ".md"
        
    file_path = f"{BLOG_FOLDER}/{title_slug}"
    
    try:
        repo.create_file(
            path=file_path,
            message=f"Feat: Added comprehensive tech guide - {title_slug}",
            content=blog_content,
            branch="main" 
        )
        print(f"Success: High-quality tech guide successfully uploaded to {file_path}")
        return True
    except Exception as e:
        print(f"Error: Failed to save file {file_path}. Details: {e}")
        return False

if __name__ == "__main__":
    print("Initiating Automated High-Quality Tech Guide Generation...")
    
    existing_topics, format_template = get_existing_data()
    tools = get_repository_tools()
    
    print("Connecting to Gemini Pro API and generating content (This may take a minute)...")
    blog_text = generate_blog_content(existing_topics, tools, format_template)
    
    save_blog_to_github(blog_text)
    
    print("Automation Process Completed Successfully.")