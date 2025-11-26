# backend/utils/ai_helper.py

import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY missing in .env")

genai.configure(api_key=API_KEY)

# Stable Model → Works for text tasks
MODEL = "models/gemini-2.0-flash-exp"

model = genai.GenerativeModel(MODEL)

async def call_chat(prompt: str, max_tokens=300):
    try:
        response = model.generate_content(
            [{
                "role": "user",
                "parts": [{"text": prompt}]
            }],
            generation_config={
                "max_output_tokens": max_tokens,
                "temperature": 0.7
            }
        )

        # --- SAFE PARSE LOGIC (never fails) ---
        # 1. Try quick accessor:
        if hasattr(response, "text") and response.text:
            return response.text.strip()

        # 2. Try manual extraction from parts:
        if response.candidates:
            c = response.candidates[0]
            if c.content and c.content.parts:
                text_parts = [
                    p.text for p in c.content.parts if hasattr(p, "text")
                ]
                full = "".join(text_parts).strip()
                if full:
                    return full

        return "AI Error: Empty response from Gemini model."

    except Exception as e:
        return f"AI Error: {str(e)}"


async def improve_summary(summary_text: str):
    prompt = f"Improve this resume summary professionally:\n\n{summary_text}"
    return await call_chat(prompt)


async def suggest_skills(skills_list):
    skills_str = ", ".join(skills_list)
    prompt = f"Given these skills: {skills_str}\nSuggest 8 additional technical skills."
    raw = await call_chat(prompt)

    if raw.startswith("AI Error"):
        return []

    return [x.strip() for x in raw.replace("\n", ",").split(",") if x.strip()][:8]


async def improve_project(project_desc):
    prompt = f"Rewrite this project description in 1–2 concise resume bullet points:\n\n{project_desc}"
    return await call_chat(prompt)
