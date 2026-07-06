from io import BytesIO
import json

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

try:
    pdfmetrics.registerFont(
        TTFont("Helvetica", "Helvetica.ttf")
    )
except:
    pass


def generate_resume_report(resume, analysis):
    """
    Creates a PDF report in memory and returns BytesIO.
    """

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer)

    styles = getSampleStyleSheet()

    title_style = styles["Heading1"]
    title_style.alignment = TA_CENTER

    heading = styles["Heading2"]

    normal = styles["BodyText"]

    story = []

    # -------------------------------------------------

    story.append(
        Paragraph(
            "AI Resume Analyzer Report",
            title_style
        )
    )

    story.append(Spacer(1, 20))

    story.append(
        Paragraph(
            f"<b>Resume:</b> {resume.original_filename}",
            normal
        )
    )

    story.append(
        Paragraph(
            f"<b>ATS Score:</b> {analysis.ats_score}/100",
            normal
        )
    )

    story.append(
        Paragraph(
            f"<b>Generated:</b> {analysis.created_at}",
            normal
        )
    )

    story.append(Spacer(1, 20))

    # -------------------------------------------------

    story.append(
        Paragraph(
            "Summary",
            heading
        )
    )

    story.append(
        Paragraph(
            analysis.summary,
            normal
        )
    )

    story.append(Spacer(1, 15))

    # -------------------------------------------------

    def add_list(title, data):

        story.append(
            Paragraph(title, heading)
        )

        items = json.loads(data)

        for item in items:
            story.append(
                Paragraph(
                    f"• {item}",
                    normal
                )
            )

        story.append(Spacer(1, 15))

    add_list(
        "Strengths",
        analysis.strengths
    )

    add_list(
        "Weaknesses",
        analysis.weaknesses
    )

    add_list(
        "Missing Skills",
        analysis.missing_skills
    )

    add_list(
        "Suggestions",
        analysis.suggestions
    )

    # -------------------------------------------------

    doc.build(story)

    buffer.seek(0)

    return buffer