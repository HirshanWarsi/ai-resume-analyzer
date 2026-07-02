from app.services.parser_service import extract_text_from_pdf

text = extract_text_from_pdf(
    "uploads/resumes/625bfb44-2c31-4ef6-b905-dea8f76cf739.pdf"
)

print(text)