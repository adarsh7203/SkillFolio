🚀 SkillFolio — AI Powered Resume Builder

SkillFolio is a modern, fast, and intelligent AI-powered Resume Builder built using React + FastAPI + pdfkit (wkhtmltopdf).

Create professional resumes in minutes with smart AI suggestions, multiple templates, and one-click PDF export!

✨ Features
🔹 AI-Powered Improvements

Improve your summary, skills, and projects using AI suggestions.

Uses DEEPSEEK API to enhance content.

🔹 Multiple Resume Templates

Choose from 3 clean & professional resume layouts, rendered via Jinja2 templates.

🔹 Live Preview

Real-time preview using HTML + iframe

Matches final exported PDF exactly

🔹 One-Click PDF Export

High-quality A4 PDF generated with wkhtmltopdf

100% accurate styling (colors, spacing, fonts)

🔹 Frontend

Built with React + Vite

Beautiful UI using TailwindCSS

Smooth animations with Framer Motion

🔹 Backend

Fast & scalable FastAPI

Jinja template engine

PDF generation with pdfkit

🛠️ Tech Stack
Frontend

React (Vite)

Tailwind CSS

Framer Motion

Axios

Backend

FastAPI

pdfkit + wkhtmltopdf

Jinja2

DEEPSEEK API

🚀 Deployment
✅ Frontend (Netlify)

Build command:

npm run build


Output directory:

build


Set environment variable:

VITE_API_BASE = https://your-backend-url.onrender.com

✅ Backend (Render)

Uses render.yaml.

Build Command
nixpacks build

Start Command
uvicorn backend.main:app --host 0.0.0.0 --port $PORT

Environment Variables
DEEPSEEK_API_KEY = your_key_here

📦 Installation & Running Locally
🔹 Clone Repository
git clone https://github.com/adarsh7203/SkillFolio.git
cd SkillFolio

🖥️ Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
source venv/bin/activate # Linux/Mac

pip install -r requirements.txt
uvicorn main:app --reload


Backend will run on:

http://localhost:8000


Docs:

http://localhost:8000/docs

🌐 Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:3000

📄 PDF Generation (Development)

Make sure wkhtmltopdf is installed:

Windows:
"C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe"

Linux:

Already bundled inside /backend/bin/wkhtmltopdf.

🧪 Test JSON for Swagger

Use this in Swagger UI:

{
  "template_id": 1,
  "data": {
    "personal": {
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "+1 234 567 890",
      "location": "New York"
    },
    "summary": "A passionate full-stack developer with experience in building high-quality applications.",
    "skills": ["React", "Node.js", "Python", "Git"],
    "education": [
      { "school": "Harvard University", "degree": "BSc Computer Science", "year": "2024" }
    ],
    "projects": [
      { "title": "E-Commerce App", "description": "Built a full-stack e-commerce platform using MERN stack." }
    ],
    "certificates": [
      { "name": "AWS Developer", "issuer": "Amazon", "date": "2023" }
    ]
  }
}

🤝 Contributing

Pull requests are welcome.
For major changes, open an issue first.

📄 License

MIT License © 2025 Adarsh Gupta

⭐ Show Support

If you like this project:

👉 Star the repository on GitHub!
