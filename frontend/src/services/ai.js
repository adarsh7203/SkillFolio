import api from "./api";

export async function improveSummary(summary) {
  const res = await api.post("/api/ai/improve-summary", { summary });
  return res.data.improved_summary;
}

export async function suggestSkills(skills) {
  const res = await api.post("/api/ai/suggest-skills", { skills });
  return res.data.suggested_skills;
}

export async function improveProject(description) {
  const res = await api.post("/api/ai/improve-project", { project_description: description });
  return res.data.improved_project;
}
