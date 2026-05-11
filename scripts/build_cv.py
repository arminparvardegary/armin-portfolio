#!/usr/bin/env python3
"""Build the CV PDF from the same content shown on the portfolio."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

OUT_PATH = Path(__file__).resolve().parent.parent / "public" / "cv.pdf"
OUT_PATH.parent.mkdir(parents=True, exist_ok=True)

INK = colors.HexColor("#0a0a0a")
INK2 = colors.HexColor("#4a4a4a")
INK3 = colors.HexColor("#8a8a8a")
ACCENT = colors.HexColor("#ff3d00")
LINE = colors.HexColor("#dddddd")

doc = SimpleDocTemplate(
    str(OUT_PATH),
    pagesize=A4,
    leftMargin=20 * mm,
    rightMargin=20 * mm,
    topMargin=20 * mm,
    bottomMargin=20 * mm,
    title="Armin Parvardegary — CV",
    author="Armin Parvardegary",
    subject="Senior Frontend & Product Designer",
)

s_name = ParagraphStyle(
    "Name",
    fontName="Helvetica",
    fontSize=22,
    leading=26,
    textColor=INK,
)
s_role = ParagraphStyle(
    "Role",
    fontName="Helvetica",
    fontSize=9.5,
    leading=13,
    textColor=INK2,
    spaceBefore=4,
)
s_contact = ParagraphStyle(
    "Contact",
    fontName="Helvetica",
    fontSize=8,
    leading=11,
    textColor=INK3,
    alignment=TA_RIGHT,
)
s_label = ParagraphStyle(
    "Label",
    fontName="Helvetica-Bold",
    fontSize=8,
    leading=12,
    textColor=ACCENT,
    spaceAfter=8,
    spaceBefore=14,
)
s_body = ParagraphStyle(
    "Body",
    fontName="Helvetica",
    fontSize=9.5,
    leading=14,
    textColor=INK,
    spaceAfter=4,
)
s_job_title = ParagraphStyle(
    "JobTitle",
    fontName="Helvetica-Bold",
    fontSize=10,
    leading=14,
    textColor=INK,
)
s_job_meta_r = ParagraphStyle(
    "JobMetaR",
    fontName="Helvetica",
    fontSize=8.5,
    leading=12,
    textColor=INK3,
    alignment=TA_RIGHT,
)
s_col_label = ParagraphStyle(
    "ColLabel",
    fontName="Helvetica-Bold",
    fontSize=7.5,
    leading=10,
    textColor=INK3,
)
s_col_item = ParagraphStyle(
    "ColItem",
    fontName="Helvetica",
    fontSize=9.5,
    leading=14,
    textColor=INK,
)


def hr() -> HRFlowable:
    return HRFlowable(width="100%", thickness=0.5, color=LINE)


story = []

# Header row: name on left, contact on right
header_table = Table(
    [
        [
            Paragraph("ARMIN PARVARDEGARY", s_name),
            Paragraph(
                "Istanbul, Türkiye<br/>"
                "hello@hindra.studio<br/>"
                "linkedin.com/in/armin-parvardegary",
                s_contact,
            ),
        ]
    ],
    colWidths=[110 * mm, 60 * mm],
)
header_table.setStyle(
    TableStyle(
        [
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ]
    )
)
story.append(header_table)
story.append(
    Paragraph(
        "T Shape · Senior Frontend &amp; Product Designer · Founder, Hindra Studio",
        s_role,
    )
)
story.append(Spacer(1, 6))
story.append(hr())

# Profile
story.append(Paragraph("PROFILE", s_label))
story.append(
    Paragraph(
        "Senior Frontend Developer and Product Designer with a T Shape skill set. "
        "Deep specialization in UI / UX design and modern frontend engineering, paired "
        "with broad working knowledge of AI tooling, motion graphics, brand work, "
        "marketing and project management. Founder of Hindra Studio, where I turn "
        "ideas into polished, shippable products from the first wireframe to a live "
        "Next.js app.",
        s_body,
    )
)

# Expertise — two columns
story.append(Paragraph("EXPERTISE", s_label))
exp_data = [
    [Paragraph("DEEP", s_col_label), Paragraph("BROAD", s_col_label)],
    [
        Paragraph("Frontend Engineering", s_col_item),
        Paragraph("AI Workflows", s_col_item),
    ],
    [
        Paragraph("Next.js, React, TypeScript", s_col_item),
        Paragraph("Motion Graphics", s_col_item),
    ],
    [
        Paragraph("UI Design", s_col_item),
        Paragraph("Brand &amp; Visual Identity", s_col_item),
    ],
    [Paragraph("UX Flows", s_col_item), Paragraph("Adobe Creative Suite", s_col_item)],
    [
        Paragraph("Design Systems", s_col_item),
        Paragraph("Project Management", s_col_item),
    ],
]
exp_table = Table(exp_data, colWidths=[85 * mm, 85 * mm])
exp_table.setStyle(
    TableStyle(
        [
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 1),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ("BOTTOMPADDING", (0, 0), (-1, 0), 6),
        ]
    )
)
story.append(exp_table)

# Marketing
story.append(Paragraph("MARKETING", s_label))
story.append(
    Paragraph(
        "Audience · Paid Ads · Search Engine Optimization · Answer Engine Optimization",
        s_body,
    )
)

# Experience
story.append(Paragraph("EXPERIENCE", s_label))

experiences = [
    {
        "title": "Hindra Studio",
        "role": "Founder, Frontend",
        "period": "2024 to present",
        "location": "Istanbul (self)",
        "body": (
            "A studio for AI, content and growth focused products. I own everything: "
            "positioning, scoping, design system, UI, UX, frontend in Next.js, and "
            "ongoing iteration with clients. One mind, fewer translations lost in "
            "handoff."
        ),
    },
    {
        "title": "Big Uppetite",
        "role": "Frontend Developer",
        "period": "2024 to present",
        "location": "Australia (remote)",
        "body": (
            "Building and maintaining the product frontend with Next.js and SSR for a "
            "remote, distributed team. Stretches into motion graphics and video "
            "editing when the brand needs it."
        ),
    },
    {
        "title": "Rush Graphics Inc",
        "role": "Designer",
        "period": "2024 to 2025",
        "location": "New Jersey (remote)",
        "body": (
            "Designed user interfaces and brand assets across multiple client projects "
            "in Adobe Creative Suite. UI, visual systems and polished production "
            "graphics."
        ),
    },
    {
        "title": "AAQ Real Estate",
        "role": "Project Manager",
        "period": "2025 to present",
        "location": "Dubai (remote)",
        "body": (
            "Coordinating projects across distributed teams in the UK, UAE and "
            "Türkiye. Planning, delivery and stakeholder communication for a fast "
            "scaling real estate business."
        ),
    },
]

for exp in experiences:
    header = Table(
        [
            [
                Paragraph(exp["title"], s_job_title),
                Paragraph(f"{exp['role']} · {exp['period']}", s_job_meta_r),
            ],
            [
                "",
                Paragraph(exp["location"], s_job_meta_r),
            ],
        ],
        colWidths=[85 * mm, 85 * mm],
    )
    header.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 1), (-1, 1), 4),
            ]
        )
    )
    story.append(KeepTogether([header, Paragraph(exp["body"], s_body), Spacer(1, 8)]))

# Education
story.append(Paragraph("EDUCATION", s_label))
story.append(
    Paragraph(
        "<b>İstanbul Kent Üniversitesi</b>  ·  Associate Degree, Computer Programming  "
        "·  2025 to 2028",
        s_body,
    )
)

# Languages
story.append(Paragraph("LANGUAGES", s_label))
story.append(
    Paragraph(
        "English (professional) · Persian (native) · Turkish (working)",
        s_body,
    )
)

doc.build(story)
print(f"Wrote {OUT_PATH}")
