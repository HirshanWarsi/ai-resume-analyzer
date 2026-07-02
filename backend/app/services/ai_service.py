import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
)


def analyze_resume(resume_text: str):

    prompt = f"""
You are an expert ATS Resume Reviewer.

Analyze the following resume.

Return ONLY valid JSON.

The JSON format must be:

{{
    "ats_score": 0,
    "summary": "",
    "strengths": [],
    "weaknesses": [],
    "missing_skills": [],
    "suggestions": []
}}

Resume:

{resume_text}
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    # Remove Markdown code fences if present
    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()
    elif text.startswith("```"):
        text = text.replace("```", "").strip()

    return json.loads(text)