# backend/utils/pdf_helper.py
import os
import pdfkit
from jinja2 import Environment, FileSystemLoader, select_autoescape

# --- Jinja Setup ---
TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), "..", "templates")
env = Environment(
    loader=FileSystemLoader(TEMPLATE_DIR),
    autoescape=select_autoescape(["html"])
)


def normalize_data(data, template_id=1):
    personal = data.get("personal", {})
    skills = data.get("skills", [])
    education = data.get("education", [])
    projects = data.get("projects", [])
    certificates = data.get("certificates", [])

    # DIFFERENT SKILL CLASS BASED ON TEMPLATE
    skill_class = (
        "skill-chip" if template_id == 1 else
        "skill-tag" if template_id == 2 else
        "skill-badge"
    )

    skills_html = "".join([
        f"<span class='{skill_class}'>{s}</span>"
        for s in skills
    ])

    edu_html = "".join([
        f"<li>{e.get('school','')} - {e.get('degree','')} ({e.get('year','')})</li>"
        for e in education
    ])

    proj_html = "".join([
        f"<li><strong>{p.get('title','')}</strong>: {p.get('description','')}</li>"
        for p in projects
    ])

    cert_html = "".join([
        f"<li>{c.get('name','')} - {c.get('issuer','')} ({c.get('date','')})</li>"
        for c in certificates
    ])

    return {
        "name": personal.get("fullName", ""),
        "email": personal.get("email", ""),
        "phone": personal.get("phone", ""),
        "location": personal.get("location", ""),
        "summary": data.get("summary", ""),
        "skills": skills_html,
        "education": edu_html,
        "projects": proj_html,
        "certificates": cert_html,
    }



def _render_template(template_id: int, data: dict) -> str:
    tpl = f"template{template_id}.html"
    template = env.get_template(tpl)
    return template.render(**data)


def generate_pdf_bytes(template_id: int, data: dict) -> bytes:
    """
    Synchronous generation using wkhtmltopdf via pdfkit.
    This function is sync on purpose — the route will call it in a thread executor.
    """
    clean_data = normalize_data(data, template_id=template_id)
    html = _render_template(template_id, clean_data)

    # Prefer env var WKHTMLTOPDF_PATH (easier to change); fallback to common Windows path
    wkhtml_path = os.getenv("WKHTMLTOPDF_PATH",
                            r"C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe")
    if not os.path.exists(wkhtml_path):
        # Raise a clear error so the caller can log it
        raise RuntimeError(f"wkhtmltopdf not found at: {wkhtml_path}. "
                           "Set WKHTMLTOPDF_PATH environment variable to the correct path.")

    config = pdfkit.configuration(wkhtmltopdf=wkhtml_path)

    options = {
        "page-size": "A4",
        "encoding": "UTF-8",
        # enable local file access for css/images if templates reference local files
        "enable-local-file-access": None,
        "disable-smart-shrinking": None,
        "quiet": None,
    }

    # pdfkit.from_string returns bytes when output_path=False
    pdf_bytes = pdfkit.from_string(
        html,
        output_path=False,
        configuration=config,
        options=options
    )

    if not isinstance(pdf_bytes, (bytes, bytearray)):
        raise RuntimeError("pdfkit did not return bytes")

    return pdf_bytes

def generate_html_preview(template_id: int, data: dict) -> str:
    """
    Returns rendered HTML (not PDF) for preview.
    """
    clean_data = normalize_data(data, template_id=template_id)
    html = _render_template(template_id, clean_data)
    return html

