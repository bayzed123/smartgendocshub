
import json

# Load the existing seo-metadata.json
with open("/home/ubuntu/SmartGenQR.oi/seo-metadata.json", "r") as f:
    seo_data = json.load(f)

# Define the new metadata based on the formula
new_metadata = {
    "qr-generator": {
        "title": "Generate QR Codes Fast - Free Custom QR Maker",
        "description": "Create custom QR codes for URLs, WiFi, and more. Generate and download instantly for free, perfect for sharing on social media, business cards, ...",
        "ogTitle": "Generate QR Codes Fast - Free Custom QR Maker",
        "ogDescription": "Create custom QR codes for URLs, WiFi, and more. Generate and download instantly for free, perfect for sharing on social media, business cards, ..."
    },
    "utm-builder": {
        "title": "Build UTM Links - Track Marketing Campaigns Free",
        "description": "Generate UTM tracking links for marketing campaigns. Monitor source, medium, and performance with ease, boosting your analytics data accuracy, ...",
        "ogTitle": "Build UTM Links - Track Marketing Campaigns Free",
        "ogDescription": "Generate UTM tracking links for marketing campaigns. Monitor source, medium, and performance with ease, boosting your analytics data accuracy, ..."
    },
    "whatsapp-link": {
        "title": "WhatsApp Link Creator - Direct Chat Generator",
        "description": "Create direct WhatsApp chat links instantly. Connect with customers or friends without saving numbers, enhancing communication efficiency, ...",
        "ogTitle": "WhatsApp Link Creator - Direct Chat Generator",
        "ogDescription": "Create direct WhatsApp chat links instantly. Connect with customers or friends without saving numbers, enhancing communication efficiency, ..."
    },
    "mailto-generator": {
        "title": "Mailto Link Generator - Create Email Links Easily",
        "description": "Generate mailto links with pre-filled subject and body. Simplify email communication for your website visitors, saving them time and effort, ...",
        "ogTitle": "Mailto Link Generator - Create Email Links Easily",
        "ogDescription": "Generate mailto links with pre-filled subject and body. Simplify email communication for your website visitors, saving them time and effort, ..."
    },
    "meta-tag-generator": {
        "title": "Meta Tag Generator - Boost SEO & CTR Free",
        "description": "Generate SEO-optimized meta tags for your website. Improve search engine rankings and click-through rates, attracting more organic traffic, ...",
        "ogTitle": "Meta Tag Generator - Boost SEO & CTR Free",
        "ogDescription": "Generate SEO-optimized meta tags for your website. Improve search engine rankings and click-through rates, attracting more organic traffic, ..."
    },
    "robots-txt-generator": {
        "title": "Robots.txt Generator - Control Search Crawlers",
        "description": "Create robots.txt files to manage search engine crawler access. Optimize crawl budget and improve SEO performance, ensuring proper indexing, ...",
        "ogTitle": "Robots.txt Generator - Control Search Crawlers",
        "ogDescription": "Create robots.txt files to manage search engine crawler access. Optimize crawl budget and improve SEO performance, ensuring proper indexing, ..."
    },
    "keyword-density-checker": {
        "title": "Keyword Density Checker - Analyze SEO Content",
        "description": "Analyze keyword frequency and density in your content. Optimize for SEO and ensure proper distribution, enhancing your content's visibility, ...",
        "ogTitle": "Keyword Density Checker - Analyze SEO Content",
        "ogDescription": "Analyze keyword frequency and density in your content. Optimize for SEO and ensure proper distribution, enhancing your content's visibility, ..."
    },
    "schema-generator": {
        "title": "Schema Generator - Boost Rich Snippets Free",
        "description": "Generate JSON-LD schema markup for your website. Improve search visibility and rich snippets, making your content stand out in SERPs, ...",
        "ogTitle": "Schema Generator - Boost Rich Snippets Free",
        "ogDescription": "Generate JSON-LD schema markup for your website. Improve search visibility and rich snippets, making your content stand out in SERPs, ..."
    },
    "word-counter": {
        "title": "Word Counter Tool - Analyze Text Instantly",
        "description": "Count words, characters, sentences, and paragraphs instantly. Optimize content length and readability for better engagement, improving SEO, ...",
        "ogTitle": "Word Counter Tool - Analyze Text Instantly",
        "ogDescription": "Count words, characters, sentences, and paragraphs instantly. Optimize content length and readability for better engagement, improving SEO, ..."
    },
    "text-case-converter": {
        "title": "Text Case Converter - Change Text Format Fast",
        "description": "Convert text to uppercase, lowercase, title case, and more. Format content effortlessly for various platforms, saving time and effort, ...",
        "ogTitle": "Text Case Converter - Change Text Format Fast",
        "ogDescription": "Convert text to uppercase, lowercase, title case, and more. Format content effortlessly for various platforms, saving time and effort, ..."
    },
    "hashtag-generator": {
        "title": "Hashtag Generator - Boost Social Media Reach",
        "description": "Generate trending hashtags for social media posts. Increase visibility and engagement on platforms like Instagram, Twitter, and TikTok, ...",
        "ogTitle": "Hashtag Generator - Boost Social Media Reach",
        "ogDescription": "Generate trending hashtags for social media posts. Increase visibility and engagement on platforms like Instagram, Twitter, and TikTok, ..."
    },
    "lorem-ipsum-generator": {
        "title": "Lorem Ipsum Generator - Placeholder Text Tool",
        "description": "Generate placeholder text for designs and mockups. Customize paragraphs, words, and sentences instantly, streamlining your design workflow, ...",
        "ogTitle": "Lorem Ipsum Generator - Placeholder Text Tool",
        "ogDescription": "Generate placeholder text for designs and mockups. Customize paragraphs, words, and sentences instantly, streamlining your design workflow, ..."
    },
    "password-generator": {
        "title": "Password Generator - Create Strong Passwords",
        "description": "Generate strong, random passwords instantly. Customize length and character types for maximum security, protecting your online accounts, ...",
        "ogTitle": "Password Generator - Create Strong Passwords",
        "ogDescription": "Generate strong, random passwords instantly. Customize length and character types for maximum security, protecting your online accounts, ..."
    },
    "age-calculator": {
        "title": "Age Calculator - Find Age & Date Differences",
        "description": "Calculate exact age and date differences instantly. Perfect for finding age, anniversaries, and time intervals, simplifying date calculations, ...",
        "ogTitle": "Age Calculator - Find Age & Date Differences",
        "ogDescription": "Calculate exact age and date differences instantly. Perfect for finding age, anniversaries, and time intervals, simplifying date calculations, ..."
    },
    "image-to-base64": {
        "title": "Image to Base64 - Encode Images Instantly",
        "description": "Convert images to Base64 strings instantly. Embed images in CSS, HTML, and data URIs, optimizing web performance and reducing requests, ...",
        "ogTitle": "Image to Base64 - Encode Images Instantly",
        "ogDescription": "Convert images to Base64 strings instantly. Embed images in CSS, HTML, and data URIs, optimizing web performance and reducing requests, ..."
    },
    "picture-url-generator": {
        "title": "Image Link Generator - Create URLs for Pictures",
        "description": "Upload your image and get a shareable URL link instantly. Create temporary links for your photos to share on social media, forums, websites, ...",
        "ogTitle": "Image Link Generator - Create URLs for Pictures",
        "ogDescription": "Upload your image and get a shareable URL link instantly. Create temporary links for your photos to share on social media, forums, websites, ..."
    },
    "cpm-roi-calculator": {
        "title": "CPM & ROI Calculator - Marketing Metrics Tool",
        "description": "Calculate Cost Per Mille (CPM) and Return on Investment (ROI). Essential for digital marketing and advertising analysis, optimizing campaigns, ...",
        "ogTitle": "CPM & ROI Calculator - Marketing Metrics Tool",
        "ogDescription": "Calculate Cost Per Mille (CPM) and Return on Investment (ROI). Essential for digital marketing and advertising analysis, optimizing campaigns, ..."
    },
    "color-palette-extractor": {
        "title": "Color Palette Extractor - Get Colors from Images",
        "description": "Extract dominant colors from images as HEX and RGB values. Perfect for design inspiration and color matching, streamlining your creative process, ...",
        "ogTitle": "Color Palette Extractor - Get Colors from Images",
        "ogDescription": "Extract dominant colors from images as HEX and RGB values. Perfect for design inspiration and color matching, streamlining your creative process, ..."
    },
    "blog-title-generator": {
        "title": "Blog Title Generator - Create Catchy Headlines",
        "description": "Generate SEO-friendly blog titles and headlines instantly. Increase click-through rates with compelling titles, attracting more readers, ...",
        "ogTitle": "Blog Title Generator - Create Catchy Headlines",
        "ogDescription": "Generate SEO-friendly blog titles and headlines instantly. Increase click-through rates with compelling titles, attracting more readers, ..."
    },
    "emi-calculator": {
        "title": "EMI Calculator - Loan & Installment Planner",
        "description": "Calculate monthly EMI, total interest, and loan details instantly. Plan your finances for loans, mortgages, and investments with ease, ...",
        "ogTitle": "EMI Calculator - Loan & Installment Planner",
        "ogDescription": "Calculate monthly EMI, total interest, and loan details instantly. Plan your finances for loans, mortgages, and investments with ease, ..."
    },
    "serp-preview-tool": {
        "title": "SERP Preview Tool - Optimize Google Snippets",
        "description": "Preview how your page appears in Google search results. Optimize meta titles and descriptions for better CTR, enhancing your visibility, ...",
        "ogTitle": "SERP Preview Tool - Optimize Google Snippets",
        "ogDescription": "Preview how your page appears in Google search results. Optimize meta titles and descriptions for better CTR, enhancing your visibility, ..."
    },
    "image-compressor": {
        "title": "Image Compressor - Reduce Image Size Free",
        "description": "Compress images locally without uploading. Reduce file size while maintaining quality for faster websites, improving load times and SEO, ...",
        "ogTitle": "Image Compressor - Reduce Image Size Free",
        "ogDescription": "Compress images locally without uploading. Reduce file size while maintaining quality for faster websites, improving load times and SEO, ..."
    },
    "percentage-calculator": {
        "title": "Percentage Calculator - Solve Percent Problems",
        "description": "Calculate percentages, discounts, and percent differences instantly. Perfect for math, shopping, and finance, simplifying complex calculations, ...",
        "ogTitle": "Percentage Calculator - Solve Percent Problems",
        "ogDescription": "Calculate percentages, discounts, and percent differences instantly. Perfect for math, shopping, and finance, simplifying complex calculations, ..."
    },
    "pomodoro-timer": {
        "title": "Pomodoro Timer - Boost Focus & Productivity",
        "description": "Use the 25/5 Pomodoro technique for focused work sessions. Boost productivity with scientifically-proven time management, improving concentration, ...",
        "ogTitle": "Pomodoro Timer - Boost Focus & Productivity",
        "ogDescription": "Use the 25/5 Pomodoro technique for focused work sessions. Boost productivity with scientifically-proven time management, improving concentration, ..."
    },
    "secure-notepad": {
        "title": "Secure Notepad - Private Notes with Auto-Save",
        "description": "Auto-save notes to browser storage with complete privacy. No server uploads, 100% secure and private, keeping your sensitive information safe, ...",
        "ogTitle": "Secure Notepad - Private Notes with Auto-Save",
        "ogDescription": "Auto-save notes to browser storage with complete privacy. No server uploads, 100% secure and private, keeping your sensitive information safe, ..."
    },
    "fancy-font-generator": {
        "title": "Fancy Font Generator - Create Cool Text Styles",
        "description": "Convert text to cool Unicode styles and fonts. Perfect for social media, gaming, and creative writing, making your content stand out, ...",
        "ogTitle": "Fancy Font Generator - Create Cool Text Styles",
        "ogDescription": "Convert text to cool Unicode styles and fonts. Perfect for social media, gaming, and creative writing, making your content stand out, ..."
    },
    "unit-converter": {
        "title": "Unit Converter - Convert Measurements Instantly",
        "description": "Convert between units of length, weight, and temperature instantly. Essential for science, cooking, and travel, simplifying complex conversions, ...",
        "ogTitle": "Unit Converter - Convert Measurements Instantly",
        "ogDescription": "Convert between units of length, weight, and temperature instantly. Essential for science, cooking, and travel, simplifying complex conversions, ..."
    },
    "youtube-thumbnail-downloader": {
        "title": "YouTube Thumbnail Downloader - Get HD Thumbnails",
        "description": "Download HD thumbnails from any YouTube video instantly. Perfect for content creators and video analysis, enhancing your visual assets, ...",
        "ogTitle": "YouTube Thumbnail Downloader - Get HD Thumbnails",
        "ogDescription": "Download HD thumbnails from any YouTube video instantly. Perfect for content creators and video analysis, enhancing your visual assets, ..."
    },
    "bmi-bmr-calculator": {
        "title": "BMI & BMR Calculator - Health & Fitness Tool",
        "description": "Calculate Body Mass Index (BMI) and Basal Metabolic Rate (BMR) instantly. Essential for fitness and health tracking, supporting your wellness goals, ...",
        "ogTitle": "BMI & BMR Calculator - Health & Fitness Tool",
        "ogDescription": "Calculate Body Mass Index (BMI) and Basal Metabolic Rate (BMR) instantly. Essential for fitness and health tracking, supporting your wellness goals, ..."
    },
    "url-encoder-decoder": {
        "title": "URL Encoder/Decoder - Encode & Decode URLs",
        "description": "Encode and decode URLs securely and instantly. Perfect for web development and data processing, ensuring proper URL handling, ...",
        "ogTitle": "URL Encoder/Decoder - Encode & Decode URLs",
        "ogDescription": "Encode and decode URLs securely and instantly. Perfect for web development and data processing, ensuring proper URL handling, ..."
    },
    "css-gradient-generator": {
        "title": "CSS Gradient Generator - Create Beautiful Gradients",
        "description": "Create beautiful CSS gradients with color pickers. Perfect for web design and styling, enhancing your website's visual appeal, ...",
        "ogTitle": "CSS Gradient Generator - Create Beautiful Gradients",
        "ogDescription": "Create beautiful CSS gradients with color pickers. Perfect for web design and styling, enhancing your website's visual appeal, ..."
    },
    "random-choice-picker": {
        "title": "Random Choice Picker - Make Decisions Easily",
        "description": "Make random decisions from a list of choices instantly. Perfect for games, decisions, and random selection, simplifying tough choices, ...",
        "ogTitle": "Random Choice Picker - Make Decisions Easily",
        "ogDescription": "Make random decisions from a list of choices instantly. Perfect for games, decisions, and random selection, simplifying tough choices, ..."
    },
    "facebook-id-finder": {
        "title": "Facebook ID Finder - Extract Profile IDs",
        "description": "Extract numeric Facebook IDs from profile links instantly. Perfect for developers and marketers, streamlining data collection, ...",
        "ogTitle": "Facebook ID Finder - Extract Profile IDs",
        "ogDescription": "Extract numeric Facebook IDs from profile links instantly. Perfect for developers and marketers, streamlining data collection, ..."
    }
}

# Update the seo_data with the new metadata
for tool_id, new_meta in new_metadata.items():
    if tool_id in seo_data["tools"]:
        seo_data["tools"][tool_id].update(new_meta)
    else:
        print(f"Warning: Tool ID {tool_id} not found in existing seo-metadata.json. Skipping.")

# Write the updated JSON back to the file
with open("/home/ubuntu/SmartGenQR.oi/seo-metadata.json", "w") as f:
    json.dump(seo_data, f, indent=2)

print("seo-metadata.json updated successfully!")
