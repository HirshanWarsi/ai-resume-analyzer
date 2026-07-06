import os

import fitz


def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract text from a PDF using PyMuPDF.
    """

    if not os.path.exists(file_path):
        return ""

    document = fitz.open(file_path)

    text = ""

    for page in document:
        text += page.get_text()

    document.close()

    return text.strip()