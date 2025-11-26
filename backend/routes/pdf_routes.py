# backend/routes/pdf_routes.py
from fastapi import APIRouter, Response, HTTPException
from pydantic import BaseModel
import time
from utils.pdf_helper import generate_pdf_bytes, generate_html_preview

router = APIRouter()

class PDFRequest(BaseModel):
    template_id: int
    data: dict


# -------------------------
# GENERATE PDF (ASYNC FIX)
# -------------------------
@router.post("/generate")
async def api_generate_pdf(req: PDFRequest):
    try:
        # IMPORTANT: await the async function
        pdf_bytes = generate_pdf_bytes(req.template_id, req.data)

        headers = {
            "Content-Disposition": f'attachment; filename="resume_{int(time.time())}.pdf"',
            "Cache-Control": "no-store",
        }

        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers=headers
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -------------------------
# HTML PREVIEW
# -------------------------
@router.post("/preview")
async def api_preview_html(req: PDFRequest):
    try:
        html = generate_html_preview(req.template_id, req.data)

        return Response(
            content=html,
            media_type="text/html",
            headers={"Cache-Control": "no-store"}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
