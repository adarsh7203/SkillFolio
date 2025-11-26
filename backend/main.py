# backend/main.py
from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.ai_routes import router as ai_router
from routes.pdf_routes import router as pdf_router

app = FastAPI(title="Skillfolio Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_router, prefix="/api/ai", tags=["ai"])
app.include_router(pdf_router, prefix="/api/pdf", tags=["pdf"])

@app.get("/api/health")
def health():
    return {"status": "ok"}
