# backend/utils/pdf_helper.py
import os
import pdfkit
from jinja2 import Environment, FileSystemLoader, select_autoescape

# ------------------------
# Jinja Setup
# ------------------------
TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), "..", "templates")
env = Environment(
    loader=FileSystemLoader(TEMPLATE_DIR),
    autoescape=select_autoescape(["html"])
)

# ------------------------
# Normalize Data
# ------------------------
def normalize_data(data, template_id=1):
    personal = data.get("personal", {})
    skills = data.get("skills", [])
    education = data.get("education", [])
    projects = data.get("projects", [])
    certificates = data.get("certificates", [])

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


# ------------------------
# Render HTML from template
# ------------------------
def _render_template(template_id: int, data: dict) -> str:
    tpl = f"template{template_id}.html"
    template = env.get_template(tpl)
    return template.render(**data)


# ------------------------
# PLAYWRIGHT ASYNC PDF GENERATOR
# ------------------------
def generate_pdf_bytes(template_id: int, data: dict) -> bytes:
    clean_data = normalize_data(data, template_id)
    html = _render_template(template_id, clean_data)

    # Linux path for wkhtmltopdf on Render
    # Detect wkhtmltopdf depending on environment
    if os.name == "nt":
        # Windows
        wkhtml_path = r"C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe"
    else:
        # Linux (Render)
        wkhtml_path = "/usr/bin/wkhtmltopdf"

    # If not found, raise clear error
    if not os.path.exists(wkhtml_path):
        raise RuntimeError(f"wkhtmltopdf not found at: {wkhtml_path}")


    config = pdfkit.configuration(wkhtmltopdf=wkhtml_path)

    options = {
        "page-size": "A4",
        "encoding": "UTF-8",
        "enable-local-file-access": None,
        "disable-smart-shrinking": None,
        "quiet": None,
    }

    pdf_bytes = pdfkit.from_string(html, output_path=False, configuration=config, options=options)
    return pdf_bytes

# ------------------------
# HTML PREVIEW FUNCTION
# ------------------------
def generate_html_preview(template_id: int, data: dict) -> str:
    clean_data = normalize_data(data, template_id=template_id)
    html = _render_template(template_id, clean_data)
    return html
