from app.services.ai_service import analyze_resume

sample_resume = """
Software Engineer

Skills:
Python
Java
React
Node.js
MongoDB

Projects:
Expense Tracker
AI Resume Analyzer
"""

result = analyze_resume(sample_resume)

print(result)