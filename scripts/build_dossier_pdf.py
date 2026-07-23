import re
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether, HRFlowable, ListFlowable, ListItem
)
from reportlab.lib import colors

SRC = r"D:\MTB Bike Builder\EXPERT-REVIEW-DOSSIER.md"
OUT = r"D:\MTB Bike Builder\EXPERT-REVIEW-DOSSIER.pdf"

with open(SRC, encoding="utf-8") as f:
    text = f.read()

styles = getSampleStyleSheet()

title_style = ParagraphStyle("TBTitle", parent=styles["Title"], fontSize=20, spaceAfter=4, textColor=colors.HexColor("#1a1a1a"))
meta_style = ParagraphStyle("TBMeta", parent=styles["Normal"], fontSize=10, textColor=colors.HexColor("#555555"), spaceAfter=14, leading=14)
h2_style = ParagraphStyle("TBH2", parent=styles["Heading2"], fontSize=14, spaceBefore=16, spaceAfter=8, textColor=colors.HexColor("#0f3d3e"))
h3_style = ParagraphStyle("TBH3", parent=styles["Heading3"], fontSize=12.5, spaceBefore=4, spaceAfter=6, textColor=colors.HexColor("#0f3d3e"), keepWithNext=True)
body_style = ParagraphStyle("TBBody", parent=styles["Normal"], fontSize=10.5, leading=15, spaceAfter=6, alignment=TA_LEFT)
ask_style = ParagraphStyle("TBAsk", parent=styles["Normal"], fontSize=10.5, leading=15, spaceAfter=4, textColor=colors.HexColor("#7a3d00"), backColor=colors.HexColor("#fff4e5"))
li_style = ParagraphStyle("TBLI", parent=body_style, spaceAfter=4)
table_gap_style = ParagraphStyle("TBTableCell", parent=styles["Normal"], fontSize=9.5, leading=12.5)

SYMBOL_MAP = {
    "✓": "[Y]",   # checkmark
    "✗": "[N]",   # cross
    "☐": "[ ]",   # ballot box
    "‘": "'", "’": "'", "“": '"', "”": '"',
}

def fix_symbols(s):
    for k, v in SYMBOL_MAP.items():
        s = s.replace(k, v)
    return s

def inline_md(s):
    s = fix_symbols(s)
    s = s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"(?<!\*)\*([^*]+?)\*(?!\*)", r"<i>\1</i>", s)
    s = re.sub(r"`([^`]+?)`", r'<font face="Courier">\1</font>', s)
    return s

lines = text.split("\n")
story = []

# Header block
story.append(Paragraph("TrailBuilder", ParagraphStyle("Brand", parent=styles["Normal"], fontSize=11, textColor=colors.HexColor("#0f3d3e"), spaceAfter=2)))
story.append(Paragraph("Expert Review Dossier", title_style))

i = 0
# skip the first H1 (already rendered as title)
if lines and lines[0].startswith("# "):
    i = 1

review_marks_added = False
rule_buffer = []
in_rule = False

def flush_rule_buffer():
    global rule_buffer, in_rule
    if rule_buffer:
        # Append a mark-here box at the end of each rule
        mark_table = Table(
            [["Mechanic verdict:   [ ] correct    [ ] wrong (say why below)    [ ] right idea, wrong tier/wording"],
             [""]],
            colWidths=[6.7 * inch],
            rowHeights=[16, 26],
        )
        mark_table.setStyle(TableStyle([
            ("FONTSIZE", (0, 0), (-1, -1), 9),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#333333")),
            ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#999999")),
            ("INNERGRID", (0, 0), (-1, -1), 0.6, colors.HexColor("#999999")),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ]))
        rule_buffer.append(Spacer(1, 4))
        rule_buffer.append(mark_table)
        rule_buffer.append(Spacer(1, 10))
        story.append(KeepTogether(list(rule_buffer)))
        rule_buffer = []
    in_rule = False

def add(flowable):
    if in_rule:
        rule_buffer.append(flowable)
    else:
        story.append(flowable)

while i < len(lines):
    line = lines[i]

    if line.strip() == "---":
        flush_rule_buffer()
        add(Spacer(1, 4))
        add(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#cccccc"), spaceBefore=4, spaceAfter=10))
        i += 1
        continue

    if line.startswith("## "):
        flush_rule_buffer()
        heading = line[3:].strip()
        if heading.lower().startswith("rule-by-rule"):
            story.append(PageBreak())
        story.append(Paragraph(inline_md(heading), h2_style))
        i += 1
        continue

    if line.startswith("### "):
        flush_rule_buffer()
        heading = line[4:].strip()
        in_rule = True
        rule_buffer = []
        rule_buffer.append(Paragraph(inline_md(heading), h3_style))
        i += 1
        continue

    if line.strip().startswith("|"):
        # collect table block
        table_lines = []
        while i < len(lines) and lines[i].strip().startswith("|"):
            table_lines.append(lines[i].strip())
            i += 1
        rows = []
        for tl in table_lines:
            cells = [c.strip() for c in tl.strip("|").split("|")]
            rows.append(cells)
        # drop separator row (---)
        rows = [r for r in rows if not all(re.match(r"^:?-+:?$", c) for c in r)]
        data = [[Paragraph(inline_md(c), table_gap_style) for c in r] for r in rows]
        t = Table(data, colWidths=[3.6 * inch, 3.1 * inch])
        t.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0f3d3e")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#bbbbbb")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f5f5f0")]),
            ("TOPPADDING", (0, 0), (-1, -1), 5),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ]))
        add(Spacer(1, 4))
        add(t)
        add(Spacer(1, 8))
        continue

    is_bullet = line.strip().startswith(("- ", "* "))
    is_numbered = bool(re.match(r"^\d+\.\s", line.strip()))
    if is_bullet or is_numbered:
        list_items = []
        numbered = is_numbered

        def is_marker(s):
            s = s.strip()
            return s.startswith(("- ", "* ")) or bool(re.match(r"^\d+\.\s", s))

        while i < len(lines) and is_marker(lines[i]):
            item_lines = [re.sub(r"^(-|\*|\d+\.)\s+", "", lines[i].strip())]
            i += 1
            while i < len(lines) and lines[i].strip() != "" and not is_marker(lines[i]) and not lines[i].startswith(("#", "|", "---")):
                item_lines.append(lines[i].strip())
                i += 1
            item_text = " ".join(item_lines)
            list_items.append(ListItem(Paragraph(inline_md(item_text), li_style), leftIndent=6))
        if numbered:
            add(ListFlowable(list_items, bulletType="1", leftIndent=18, spaceAfter=6, bulletFontName="Helvetica"))
        else:
            add(ListFlowable(list_items, bulletType="bullet", start="-", leftIndent=14, spaceAfter=6, bulletFontName="Helvetica"))
        continue

    if line.strip() == "":
        i += 1
        continue

    # regular paragraph, possibly multi-line wrapped (join until blank/special)
    para_lines = [line]
    i += 1
    while i < len(lines) and lines[i].strip() != "" and not lines[i].startswith(("#", "-", "*", "|", "---")) and not re.match(r"^\d+\.\s", lines[i].strip()):
        para_lines.append(lines[i])
        i += 1
    para = " ".join(l.strip() for l in para_lines)
    style = ask_style if para.strip().startswith("**Ask:**") else body_style
    add(Paragraph(inline_md(para), style))

flush_rule_buffer()

def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#888888"))
    canvas.drawString(0.75 * inch, 0.5 * inch, "TrailBuilder — Expert Review Dossier")
    canvas.drawRightString(letter[0] - 0.75 * inch, 0.5 * inch, f"Page {doc.page}")
    canvas.restoreState()

doc = SimpleDocTemplate(
    OUT, pagesize=letter,
    leftMargin=0.85 * inch, rightMargin=0.85 * inch,
    topMargin=0.85 * inch, bottomMargin=0.85 * inch,
    title="TrailBuilder — Expert Review Dossier",
    author="TrailBuilder",
)
doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
print("wrote", OUT)
