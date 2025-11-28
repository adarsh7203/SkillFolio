# backend/utils/ai_helper.py

import os
from deepseek import DeepSeekAPI
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("DEEPSEEK_API_KEY")

if not API_KEY:
    raise RuntimeError("DEEPSEEK_API_KEY missing in environment variables.")

# correct client initialization
client = DeepSeekAPI(api_key=API_KEY)

MODEL = "deepseek-chat"


async def call_chat(prompt: str, max_tokens=300):
    try:
        response = client.completions.create(
            model=MODEL,
            prompt=prompt,
            max_tokens=max_tokens,
            temperature=0.7
        )

        return response.choices[0].text.strip()

    except Exception as e:
        return f"AI Error: {str(e)}"


async def improve_summary(summary_text: str):
    prompt = (
        "Improve this resume summary professionally. "
        "Keep it concise, ATS-friendly, and impact-driven:\n\n"
        f"{summary_text}"
    )
    return await call_chat(prompt)


async def suggest_skills(skills_list):
    skills_str = ", ".join(skills_list)

    prompt = (
        f"Given these skills ({skills_str}), suggest exactly 8 additional "
        "modern technical skills relevant to a resume. "
        "Return only a comma-separated list."
    )

    raw = await call_chat(prompt)

    if raw.startswith("AI Error"):
        return []

    return [s.strip() for s in raw.replace("\n", ",").split(",") if s.strip()][:8]


async def improve_project(project_desc):
    prompt = (
        "Rewrite this project description into 1–2 bullet points. "
        "Make it concise, action-oriented, and resume-ready:\n\n"
        f"{project_desc}"
    )

    return await call_chat(prompt)
