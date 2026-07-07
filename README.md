# 🚀 AI Resume Analyzer

An AI-powered full-stack web application that analyzes resumes, calculates ATS scores, identifies strengths and weaknesses, matches resumes against job descriptions, and generates downloadable PDF reports using **Google Gemini AI**.

> Built with **React, FastAPI, PostgreSQL, SQLAlchemy, JWT Authentication, and Gemini AI**.

---

## 📸 Screenshots

> Add screenshots here after deployment.

| Dashboard | Resume Analysis |
|-----------|-----------------|
| ![Dashboard](screenshots/dashboard.png) | ![Analysis](screenshots/analysis.png) |

| Job Match | Upload Resume |
|-----------|---------------|
| ![Job Match](screenshots/jobmatch.png) | ![Upload](screenshots/upload.png) |

---

# ✨ Features

### 🔐 Authentication
- User Registration & Login
- JWT Authentication
- Protected Routes
- Secure User Sessions

### 📄 Resume Management
- Upload PDF Resume
- PDF Parsing & Text Extraction
- Resume History
- Download Resume Analysis Report

### 🤖 AI Resume Analysis
- ATS Score Generation
- Resume Summary
- Strengths Detection
- Weaknesses Identification
- Missing Skills Detection
- Personalized Improvement Suggestions

### 🎯 Job Match
- Compare Resume with Job Description
- AI Match Score
- Matching Skills
- Missing Skills
- Recommendations

### 📊 Dashboard
- Resume Analytics
- ATS Score Overview
- Recent Resume History
- Responsive UI
- Modern Dashboard Design

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- Framer Motion
- Recharts
- Lucide React

## Backend
- FastAPI
- Python
- SQLAlchemy
- JWT Authentication
- Pydantic

## Database
- PostgreSQL

## AI Integration
- Google Gemini AI

## Tools
- Git
- GitHub
- Postman
- VS Code

---

# 📂 Project Structure

```
AI-Resume-Analyzer
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── context/
│
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   ├── database/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── utils/
│   └── requirements.txt
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-Resume-Analyzer.git

cd AI-Resume-Analyzer
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file inside the backend folder.

```env
DATABASE_URL=your_postgresql_database_url

SECRET_KEY=your_secret_key

ALGORITHM=HS256

GEMINI_API_KEY=your_gemini_api_key
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend/resume-analyzer

npm install
```

Create a `.env` file.

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Run the frontend

```bash
npm run dev
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/auth/register` |
| POST | `/auth/login` |
| GET | `/auth/me` |

---

## Resume

| Method | Endpoint |
|---------|----------|
| POST | `/resume/upload` |
| GET | `/resume/history` |
| GET | `/resume/{id}/analysis` |
| GET | `/resume/{id}/export` |

---

## Job Match

| Method | Endpoint |
|---------|----------|
| POST | `/job-match/` |

---

# 🔒 Security

- JWT Authentication
- Protected REST APIs
- Secure Password Hashing
- User-specific Resume Access
- Authorization Middleware
- File Validation
- PDF-only Upload Support

---

# 📈 Future Improvements

- Resume Version Comparison
- AI Cover Letter Generator
- Interview Question Generator
- Resume Templates
- Email Notifications
- Cloud File Storage
- Admin Dashboard
- Docker Support
- CI/CD Pipeline

---

# 🧪 Testing

Frontend

```bash
npm run lint

npm run build
```

Backend

```bash
python -m pytest -vv
```

---

# 👨‍💻 Author

**Hirshan Warsi**

📧 Email: **hirshanwarsi@gmail.com**

🔗 LinkedIn: **https://www.linkedin.com/in/hirshan-warsi-358a09307**

💻 GitHub: **https://github.com/hirshanwarsi**

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!
