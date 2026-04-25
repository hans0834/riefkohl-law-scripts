#!/usr/bin/env python3
"""Build the Act 60 Eligibility Checklist PDF from markdown source."""

import os
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
)

REPO = Path(__file__).resolve().parent.parent
SRC = REPO / "lead-magnets" / "act60-eligibility-checklist.md"
OUT = REPO / "files" / "act60-eligibility-checklist.pdf"

NAVY = colors.HexColor("#1a2033")
GOLD = colors.HexColor("#bfa35d")
INK = colors.HexColor("#1a1a1a")
MUTED = colors.HexColor("#5b5b5b")

# Register fonts (macOS system paths)
FONT_DIR_SUP = "/System/Library/Fonts/Supplemental"
pdfmetrics.registerFont(TTFont("Georgia", f"{FONT_DIR_SUP}/Georgia.ttf"))
pdfmetrics.registerFont(TTFont("Georgia-Bold", f"{FONT_DIR_SUP}/Georgia Bold.ttf"))
pdfmetrics.registerFont(TTFont("Georgia-Italic", f"{FONT_DIR_SUP}/Georgia Italic.ttf"))
pdfmetrics.registerFont(TTFont("ArialU", f"{FONT_DIR_SUP}/Arial Unicode.ttf"))
pdfmetrics.registerFont(TTFont("Arial", f"{FONT_DIR_SUP}/Arial.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", f"{FONT_DIR_SUP}/Arial Bold.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Italic", f"{FONT_DIR_SUP}/Arial Italic.ttf"))


# ---------- Markdown parsing ----------

def parse_markdown(text: str):
    """Parse the lead-magnet markdown into a structured list of (kind, payload).

    Skips the 'Purpose' and 'Design Notes for PDF' sections per spec.
    Recognized kinds: h1, h2, h3, p, hr, checkbox.
    """
    out = []
    skip = False
    in_pdf_content = False
    for raw in text.splitlines():
        line = raw.rstrip()
        # Skip the wrapper headings/sections.
        m = re.match(r"^(#{1,3})\s+(.*)$", line)
        if m:
            level = len(m.group(1))
            title = m.group(2).strip()
            if title in ("Purpose", "Design Notes for PDF"):
                skip = True
                continue
            if title == "PDF Content":
                in_pdf_content = True
                skip = False
                continue
            # New top-level heading resets skip
            if level <= 2:
                skip = title in ("Purpose", "Design Notes for PDF")
            if skip:
                continue
            if not in_pdf_content:
                continue
            out.append(("h" + str(level), title))
            continue
        if skip or not in_pdf_content:
            continue
        if line.strip() == "---":
            out.append(("hr", None))
            continue
        # Checkbox line:  **☐ Label.** body...
        m = re.match(r"^\*\*☐\s+(.+?)\*\*\s*(.*)$", line)
        if m:
            label, rest = m.group(1).strip(), m.group(2).strip()
            out.append(("checkbox", (label, rest)))
            continue
        if line.strip() == "":
            out.append(("blank", None))
            continue
        out.append(("p", line))
    return out


# ---------- Custom flowable: checkbox row ----------

class CheckboxRow(Paragraph):
    """A paragraph rendered with a leading unicode checkbox glyph in a serif/unicode font."""

    def __init__(self, label_html: str, body_html: str, styles):
        bodyfont = "ArialU"
        # Use the unicode ballot box (☐) at slightly larger size for visual weight.
        text = (
            f'<font name="{bodyfont}" size="13" color="#1a2033">☐</font>&nbsp;&nbsp;'
            f'<b>{label_html}</b> {body_html}'
        )
        super().__init__(text, styles["body"])


# ---------- Page templates ----------

def cover_page(canvas, doc):
    """Cover page: full-bleed navy top band with gold accent line."""
    w, h = letter
    # Navy top band (top 38% of page)
    band_h = h * 0.42
    canvas.setFillColor(NAVY)
    canvas.rect(0, h - band_h, w, band_h, fill=1, stroke=0)
    # Gold accent line below band
    canvas.setFillColor(GOLD)
    canvas.rect(0, h - band_h - 6, w, 6, fill=1, stroke=0)
    # RIEFKOHL LAW wordmark
    canvas.setFillColor(GOLD)
    canvas.setFont("Georgia-Bold", 13)
    canvas.drawString(0.75 * inch, h - 0.85 * inch, "RIEFKOHL LAW")
    canvas.setFillColor(colors.white)
    canvas.setFont("ArialU", 9)
    canvas.drawString(
        0.75 * inch,
        h - 1.05 * inch,
        "273 Ponce de Leon Ave., San Juan, PR 00917  ·  (787) 236-1657  ·  riefkohllaw.com",
    )
    # Title (large serif, centered vertically in band)
    canvas.setFillColor(colors.white)
    canvas.setFont("Georgia-Bold", 34)
    title = "Act 60 Eligibility Checklist"
    title_y = h - band_h * 0.55
    canvas.drawCentredString(w / 2, title_y, title)
    # Subtitle (italic serif, white)
    canvas.setFont("Georgia-Italic", 13)
    canvas.setFillColor(colors.HexColor("#d8d2bf"))
    sub = "Do You Qualify for Puerto Rico's Individual Investor or Export Services Decree?"
    canvas.drawCentredString(w / 2, title_y - 0.42 * inch, sub)
    # Bottom: small label
    canvas.setFillColor(MUTED)
    canvas.setFont("ArialU", 8)
    canvas.drawCentredString(
        w / 2,
        0.65 * inch,
        "A pre-application screening tool from Riefkohl Law  ·  For informational purposes only.",
    )


def content_page(canvas, doc):
    """Content pages: simple navy header band + footer with page number."""
    w, h = letter
    # Top thin navy band
    canvas.setFillColor(NAVY)
    canvas.rect(0, h - 0.45 * inch, w, 0.45 * inch, fill=1, stroke=0)
    canvas.setFillColor(GOLD)
    canvas.rect(0, h - 0.48 * inch, w, 0.03 * inch, fill=1, stroke=0)
    canvas.setFillColor(colors.white)
    canvas.setFont("Georgia-Bold", 10)
    canvas.drawString(0.75 * inch, h - 0.30 * inch, "RIEFKOHL LAW")
    canvas.setFont("ArialU", 8)
    canvas.setFillColor(colors.HexColor("#d8d2bf"))
    canvas.drawRightString(
        w - 0.75 * inch, h - 0.30 * inch, "Act 60 Eligibility Checklist"
    )
    # Footer
    canvas.setFillColor(MUTED)
    canvas.setFont("ArialU", 8)
    footer = "Riefkohl Law  ·  riefkohllaw.com  ·  (787) 236-1657"
    canvas.drawString(0.75 * inch, 0.45 * inch, footer)
    canvas.drawRightString(
        w - 0.75 * inch, 0.45 * inch, f"Page {doc.page - 1}"  # cover is page 1, content starts at 1
    )


# ---------- Styles ----------

def build_styles():
    base = getSampleStyleSheet()
    body = ParagraphStyle(
        "body",
        parent=base["BodyText"],
        fontName="ArialU",
        fontSize=10.5,
        leading=15,
        textColor=INK,
        spaceAfter=6,
        alignment=TA_LEFT,
    )
    h1 = ParagraphStyle(
        "h1",
        parent=base["Heading1"],
        fontName="Georgia-Bold",
        fontSize=20,
        leading=24,
        textColor=NAVY,
        spaceBefore=8,
        spaceAfter=10,
    )
    h2 = ParagraphStyle(
        "h2",
        parent=base["Heading2"],
        fontName="Georgia-Bold",
        fontSize=16,
        leading=20,
        textColor=GOLD,
        spaceBefore=18,
        spaceAfter=4,
        borderPadding=(0, 0, 4, 0),
        borderColor=GOLD,
        borderWidth=0,  # underline drawn separately
    )
    h3 = ParagraphStyle(
        "h3",
        parent=base["Heading3"],
        fontName="Georgia-Bold",
        fontSize=11.5,
        leading=15,
        textColor=NAVY,
        spaceBefore=10,
        spaceAfter=2,
    )
    intro = ParagraphStyle(
        "intro",
        parent=body,
        fontName="Georgia-Italic",
        fontSize=11,
        leading=16,
        textColor=MUTED,
        spaceAfter=10,
    )
    small = ParagraphStyle(
        "small", parent=body, fontSize=9, leading=12, textColor=MUTED
    )
    contact = ParagraphStyle(
        "contact",
        parent=body,
        fontName="Georgia-Bold",
        fontSize=11,
        leading=15,
        textColor=NAVY,
        alignment=TA_CENTER,
        spaceBefore=4,
        spaceAfter=2,
    )
    return {
        "body": body,
        "h1": h1,
        "h2": h2,
        "h3": h3,
        "intro": intro,
        "small": small,
        "contact": contact,
    }


# ---------- Gold underline flowable ----------

from reportlab.platypus.flowables import Flowable


class GoldRule(Flowable):
    def __init__(self, width=4.0 * inch, thickness=1.2):
        super().__init__()
        self.width = width
        self.thickness = thickness
        self.height = thickness + 2

    def draw(self):
        self.canv.setFillColor(GOLD)
        self.canv.rect(0, 0, self.width, self.thickness, fill=1, stroke=0)


# ---------- Main build ----------

def html_escape(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def md_inline_to_html(s: str) -> str:
    """Minimal markdown → reportlab xml: **bold**, *italic*."""
    s = html_escape(s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"(?<!\*)\*(?!\s)(.+?)(?<!\s)\*(?!\*)", r"<i>\1</i>", s)
    # Convert **§§** etc — already handled. Convert URLs to links.
    s = re.sub(
        r"(riefkohllaw\.com\/[\w\-\/]+|hans@riefkohllaw\.com)",
        r'<font color="#bfa35d">\1</font>',
        s,
    )
    return s


def build():
    md = SRC.read_text(encoding="utf-8")
    items = parse_markdown(md)
    styles = build_styles()

    # Split items into "stream after cover" (we'll handle the H1 cover-page title via the page template)
    # Drop everything until after the introduction is encountered: keep all post-cover content.
    # Strategy: the markdown's "PDF Content" section starts with a Cover Page section then Introduction.
    # We render the body starting from the Introduction.
    body_items = []
    started = False
    for kind, payload in items:
        if not started:
            if kind == "h2" and "Before You Apply" in (payload or ""):
                started = True
                body_items.append((kind, payload))
            continue
        body_items.append((kind, payload))

    if not started:
        # Fallback: include everything except the cover page's H2
        body_items = items

    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(
        str(OUT),
        pagesize=letter,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
        topMargin=0.85 * inch,
        bottomMargin=0.85 * inch,
        title="Act 60 Eligibility Checklist",
        author="Riefkohl Law",
        subject="Pre-application screening for Puerto Rico's Act 60 individual investor and export services decrees",
    )
    cover_frame = Frame(0, 0, *letter, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id="cover")
    content_frame = Frame(
        0.75 * inch,
        0.75 * inch,
        letter[0] - 1.5 * inch,
        letter[1] - 1.6 * inch,
        id="content",
    )
    doc.addPageTemplates(
        [
            PageTemplate(id="cover", frames=[cover_frame], onPage=cover_page),
            PageTemplate(id="content", frames=[content_frame], onPage=content_page),
        ]
    )

    story = [NextPageTemplate("content"), PageBreak()]

    section_h2_seen_count = 0
    for kind, payload in body_items:
        if kind == "h1":
            story.append(Paragraph(md_inline_to_html(payload), styles["h1"]))
        elif kind == "h2":
            section_h2_seen_count += 1
            story.append(Paragraph(md_inline_to_html(payload), styles["h2"]))
            story.append(GoldRule(width=2.6 * inch, thickness=1.2))
            story.append(Spacer(1, 6))
        elif kind == "h3":
            story.append(Paragraph(md_inline_to_html(payload), styles["h3"]))
        elif kind == "p":
            text = payload.strip()
            if not text:
                continue
            # Italic disclaimer block at end → small style.
            if text.startswith("*") and text.endswith("*") and "informational purposes only" in text:
                clean = text.strip("*")
                story.append(Spacer(1, 6))
                story.append(Paragraph("<i>" + html_escape(clean) + "</i>", styles["small"]))
            elif re.match(r"^\*[^*]+\*$", text):
                # italic single line (intro tagline)
                story.append(Paragraph("<i>" + html_escape(text.strip("*")) + "</i>", styles["intro"]))
            elif text.startswith("**Book your free"):
                story.append(Spacer(1, 4))
                story.append(Paragraph(md_inline_to_html(text), styles["contact"]))
            elif re.sub(r"\*+", "", text).strip() in (
                "riefkohllaw.com/calendly",
                "(787) 236-1657",
                "Riefkohl Law",
                "273 Ponce de Leon Ave.",
                "San Juan, PR 00917",
                "hans@riefkohllaw.com",
            ):
                story.append(Paragraph(md_inline_to_html(text), styles["contact"]))
            else:
                story.append(Paragraph(md_inline_to_html(text), styles["body"]))
        elif kind == "checkbox":
            label, rest = payload
            story.append(
                CheckboxRow(md_inline_to_html(label), md_inline_to_html(rest), styles)
            )
        elif kind == "hr":
            story.append(Spacer(1, 8))
        elif kind == "blank":
            story.append(Spacer(1, 2))

    doc.build(story)
    print(f"Built {OUT} ({OUT.stat().st_size:,} bytes)")


if __name__ == "__main__":
    build()
