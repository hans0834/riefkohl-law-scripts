#!/usr/bin/env python3
"""
Convert 25 case law markdown blog posts to WordPress eXtended RSS (WXR) XML
for Squarespace import.
"""

import os
import re
import html
from collections import OrderedDict

POSTS_DIR = "/Users/hansriefkohl/Downloads/Claude Code/Riefkohl Law updates/blog-posts/March 15 2026"
SEO_FILE = "/Users/hansriefkohl/Downloads/Claude Code/Riefkohl Law updates/seo-fixes.html"
OUTPUT_FILE = "/Users/hansriefkohl/Downloads/Claude Code/Riefkohl Law updates/squarespace-import.xml"

def parse_seo_fixes(filepath):
    """Extract slug -> h1 mapping from seo-fixes.html."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    slug_h1 = {}
    # Match patterns like: '/blog/slug': { h1: 'Title', ...
    pattern = r"'/blog/([^']+)':\s*\{\s*h1:\s*'([^']*(?:\\'[^']*)*)',"
    for match in re.finditer(pattern, content):
        slug = match.group(1)
        h1_val = match.group(2).replace("\\'", "'")
        slug_h1[slug] = h1_val

    return slug_h1

def parse_metadata(text):
    """Parse SEO metadata block from the top of a markdown file."""
    meta = {}
    for line in text.strip().split('\n'):
        line = line.strip()
        if line.startswith('- **') and ':**' in line:
            # Extract key and value
            m = re.match(r'-\s*\*\*(.+?)\*\*\s*(.*)', line)
            if m:
                key = m.group(1).rstrip(':').strip().lower()
                val = m.group(2).strip()
                meta[key] = val
    return meta

def markdown_to_html(md_text):
    """Convert markdown body content to HTML."""
    lines = md_text.split('\n')
    html_parts = []
    i = 0

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Horizontal rule
        if stripped == '---':
            html_parts.append('<hr>')
            i += 1
            continue

        # Empty line - skip (paragraph breaks handled below)
        if stripped == '':
            i += 1
            continue

        # Headings
        if stripped.startswith('### '):
            heading_text = inline_format(stripped[4:].strip())
            html_parts.append(f'<h4>{heading_text}</h4>')
            i += 1
            continue
        if stripped.startswith('## '):
            heading_text = inline_format(stripped[3:].strip())
            html_parts.append(f'<h3>{heading_text}</h3>')
            i += 1
            continue
        if stripped.startswith('# '):
            heading_text = inline_format(stripped[2:].strip())
            html_parts.append(f'<h2>{heading_text}</h2>')
            i += 1
            continue

        # Bullet list
        if stripped.startswith('- '):
            list_items = []
            while i < len(lines) and lines[i].strip().startswith('- '):
                item_text = inline_format(lines[i].strip()[2:].strip())
                list_items.append(f'<li>{item_text}</li>')
                i += 1
            html_parts.append('<ul>' + ''.join(list_items) + '</ul>')
            continue

        # Paragraph - collect consecutive non-empty, non-special lines
        para_lines = []
        while i < len(lines):
            l = lines[i].strip()
            if l == '' or l == '---' or l.startswith('# ') or l.startswith('## ') or l.startswith('### ') or l.startswith('- '):
                break
            para_lines.append(l)
            i += 1

        if para_lines:
            para_text = inline_format(' '.join(para_lines))
            html_parts.append(f'<p>{para_text}</p>')

    return '\n'.join(html_parts)

def inline_format(text):
    """Apply inline markdown formatting: bold, links."""
    # Links: [text](url)
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', text)
    # Bold: **text**
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    # Escape latex-style parens \( \) used in some posts
    text = text.replace('\\(', '(').replace('\\)', ')')
    return text

def process_markdown_file(filepath):
    """Read a markdown file and extract metadata + body content."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split on first --- separator (after metadata block)
    # Metadata is between start and first ---
    parts = content.split('\n---\n', 1)
    if len(parts) < 2:
        # Try with \r\n
        parts = content.split('\r\n---\r\n', 1)

    if len(parts) < 2:
        print(f"  WARNING: Could not find --- separator in {os.path.basename(filepath)}")
        return None, None

    metadata_text = parts[0]
    body_text = parts[1]

    meta = parse_metadata(metadata_text)
    html_content = markdown_to_html(body_text)

    return meta, html_content

def xml_escape(text):
    """Escape text for XML (outside CDATA)."""
    return html.escape(text, quote=True)

def build_wxr(posts_data):
    """Build the WXR XML document."""
    # Collect all unique categories and tags
    all_categories = OrderedDict()
    all_tags = OrderedDict()

    for post in posts_data:
        for cat in post.get('categories', []):
            slug = cat.lower().replace(' ', '-').replace('&', 'and')
            all_categories[slug] = cat
        for tag in post.get('tags', []):
            all_tags[tag] = tag

    xml_lines = []
    xml_lines.append('<?xml version="1.0" encoding="UTF-8"?>')
    xml_lines.append('<rss version="2.0"')
    xml_lines.append('  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"')
    xml_lines.append('  xmlns:content="http://purl.org/rss/1.0/modules/content/"')
    xml_lines.append('  xmlns:wfw="http://wellformedweb.org/CommentAPI/"')
    xml_lines.append('  xmlns:dc="http://purl.org/dc/elements/1.1/"')
    xml_lines.append('  xmlns:wp="http://wordpress.org/export/1.2/">')
    xml_lines.append('<channel>')
    xml_lines.append('  <title>Riefkohl Law Blog</title>')
    xml_lines.append('  <link>https://www.riefkohllaw.com</link>')
    xml_lines.append('  <wp:wxr_version>1.2</wp:wxr_version>')
    xml_lines.append('')

    # Category definitions
    cat_id = 1
    for slug, name in all_categories.items():
        xml_lines.append('  <wp:category>')
        xml_lines.append(f'    <wp:term_id>{cat_id}</wp:term_id>')
        xml_lines.append(f'    <wp:category_nicename>{xml_escape(slug)}</wp:category_nicename>')
        xml_lines.append('    <wp:category_parent></wp:category_parent>')
        xml_lines.append(f'    <wp:cat_name><![CDATA[{name}]]></wp:cat_name>')
        xml_lines.append('  </wp:category>')
        cat_id += 1
    xml_lines.append('')

    # Tag definitions
    tag_id = 100
    for tag_slug, tag_name in all_tags.items():
        xml_lines.append('  <wp:tag>')
        xml_lines.append(f'    <wp:term_id>{tag_id}</wp:term_id>')
        xml_lines.append(f'    <wp:tag_slug>{xml_escape(tag_slug)}</wp:tag_slug>')
        xml_lines.append(f'    <wp:tag_name><![CDATA[{tag_name}]]></wp:tag_name>')
        xml_lines.append('  </wp:tag>')
        tag_id += 1
    xml_lines.append('')

    # Posts
    for post in posts_data:
        xml_lines.append('  <item>')
        xml_lines.append(f'    <title>{xml_escape(post["title"])}</title>')
        xml_lines.append(f'    <link>https://www.riefkohllaw.com/blog/{xml_escape(post["slug"])}</link>')
        xml_lines.append(f'    <wp:post_name>{xml_escape(post["slug"])}</wp:post_name>')
        xml_lines.append('    <wp:post_date>2026-03-15 00:00:00</wp:post_date>')
        xml_lines.append('    <wp:post_type>post</wp:post_type>')
        xml_lines.append('    <wp:status>draft</wp:status>')
        xml_lines.append('    <dc:creator>Hans Riefkohl</dc:creator>')
        xml_lines.append(f'    <content:encoded><![CDATA[{post["html"]}]]></content:encoded>')
        xml_lines.append(f'    <excerpt:encoded><![CDATA[{post["meta_description"]}]]></excerpt:encoded>')

        for cat in post.get('categories', []):
            slug = cat.lower().replace(' ', '-').replace('&', 'and')
            xml_lines.append(f'    <category domain="category" nicename="{xml_escape(slug)}"><![CDATA[{cat}]]></category>')

        for tag in post.get('tags', []):
            xml_lines.append(f'    <category domain="post_tag" nicename="{xml_escape(tag)}"><![CDATA[{tag}]]></category>')

        xml_lines.append('  </item>')
        xml_lines.append('')

    xml_lines.append('</channel>')
    xml_lines.append('</rss>')

    return '\n'.join(xml_lines)

def main():
    print("=== WXR Export Script ===\n")

    # Load H1 mappings from seo-fixes.html
    slug_h1 = parse_seo_fixes(SEO_FILE)
    print(f"Loaded {len(slug_h1)} slug->H1 mappings from seo-fixes.html")

    # Find all .md files in the posts directory
    md_files = sorted([f for f in os.listdir(POSTS_DIR) if f.endswith('.md')])
    print(f"Found {len(md_files)} markdown files\n")

    posts_data = []

    for filename in md_files:
        filepath = os.path.join(POSTS_DIR, filename)
        print(f"Processing: {filename}")

        meta, html_content = process_markdown_file(filepath)
        if meta is None:
            print(f"  SKIPPED (no metadata found)")
            continue

        slug = meta.get('slug', filename.replace('.md', ''))
        title_tag = meta.get('title tag', '')
        meta_desc = meta.get('meta description', '')

        # Get H1 from seo-fixes.html
        h1 = slug_h1.get(slug, title_tag.split('|')[0].strip() if '|' in title_tag else title_tag)

        # Parse categories (comma-separated)
        categories = [c.strip() for c in meta.get('category', '').split(',') if c.strip()]

        # Parse tags (comma-separated)
        tags = [t.strip() for t in meta.get('tags', '').split(',') if t.strip()]

        post = {
            'slug': slug,
            'title': h1,
            'meta_description': meta_desc,
            'html': html_content,
            'categories': categories,
            'tags': tags,
        }
        posts_data.append(post)
        print(f"  Slug: {slug}")
        print(f"  H1: {h1}")
        print(f"  Categories: {categories}")
        print(f"  Tags count: {len(tags)}")

    print(f"\n--- Building WXR XML ---")
    wxr_xml = build_wxr(posts_data)

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(wxr_xml)

    file_size = os.path.getsize(OUTPUT_FILE)
    print(f"\nWrote {OUTPUT_FILE}")
    print(f"File size: {file_size:,} bytes ({file_size/1024:.1f} KB)")
    print(f"Total posts processed: {len(posts_data)}")
    print("\nDone!")

if __name__ == '__main__':
    main()
