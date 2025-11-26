from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.ai_helper import improve_summary, suggest_skills, improve_project

router = APIRouter()

class SummaryRequest(BaseModel):
    summary: str

class SkillsRequest(BaseModel):
    skills: list 

class ProjectRequest(BaseModel):
    project_description: str

@router.post("/improve-summary")
async def api_improve_summary(req: SummaryRequest):
    try:
        improved = await improve_summary(req.summary)
        return {"improved_summary": improved}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/suggest-skills")
async def api_suggest_skills(req: SkillsRequest):
    try:
        suggestions = await suggest_skills(req.skills)
        return {"suggested_skills": suggestions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/improve-project")
async def api_improve_project(req: ProjectRequest):
    try:
        improved = await improve_project(req.project_description)
        return {"improved_project": improved}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
