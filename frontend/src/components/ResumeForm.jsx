import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Plus } from "lucide-react";
import { Header } from "./Header";
import { improveSummary, suggestSkills, improveProject } from "../services/ai";

export function ResumeForm({ onNavigate, resumeData, setResumeData }) {

  // INPUT STATES
  const [skillInput, setSkillInput] = useState("");

  // AI SUGGESTION STATES
  const [summarySuggestion, setSummarySuggestion] = useState("");
  const [skillsSuggestion, setSkillsSuggestion] = useState("");
  const [projectSuggestions, setProjectSuggestions] = useState({}); // {0: "text", 1:"text"}

  const [progress, setProgress] = useState(25);
  const [loadingField, setLoadingField] = useState(null); // which field is loading AI

  // ----------------------------------------------------------
  // AI Handler (NO AUTOFILL — ONLY SHOW SUGGESTION)
  // ----------------------------------------------------------
  const handleAIImprovement = async (field, index = null) => {
    setLoadingField(field);

    try {
      if (field === "summary") {
        const res = await improveSummary(resumeData.summary || "");
        setSummarySuggestion(res);
      }

      else if (field === "skills") {
        const list = await suggestSkills(resumeData.skills || []);
        setSkillsSuggestion(list.join(", "));
      }

      else if (field.startsWith("project-")) {
        const idx = Number(field.split("-")[1]);
        const res = await improveProject(resumeData.projects[idx].description || "");

        setProjectSuggestions(prev => ({
          ...prev,
          [idx]: res
        }));
      }
    } catch (error) {
      alert("AI Error: Please check backend or API key.");
    }

    setLoadingField(null);
  };

  // ----------------------------------------------------------
  // ADD NEW FIELDS
  // ----------------------------------------------------------
  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { school: "", degree: "", year: "" }],
    });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, { title: "", description: "" }],
    });
  };

  const addCertificate = () => {
    setResumeData({
      ...resumeData,
      certificates: [...resumeData.certificates, { name: "", issuer: "", date: "" }],
    });
  };

  const handleContinue = () => {
    setProgress(100);
    setTimeout(() => onNavigate("templates"), 300);
  };

  // ----------------------------------------------------------
  // MAIN FORM JSX
  // ----------------------------------------------------------
  return (
    <div className="min-h-screen">
      <Header onNavigate={onNavigate} currentPage="form" />

      {/* PROGRESS BAR */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Resume Progress</span>
            <span className="text-sm text-[#4F46E5]">{progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#4F46E5]"
              initial={{ width: "25%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >

          {/* ------------------------------------------------ */}
          {/* PERSONAL INFORMATION */}
          {/* ------------------------------------------------ */}
          <section className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Personal Information</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  value={resumeData.personal.fullName}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personal: { ...resumeData.personal, fullName: e.target.value },
                    })
                  }
                  onFocus={() => setProgress(Math.max(progress, 25))}
                  className="w-full px-4 py-2 border rounded-xl"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={resumeData.personal.email}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personal: { ...resumeData.personal, email: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border rounded-xl"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  value={resumeData.personal.phone}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personal: { ...resumeData.personal, phone: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border rounded-xl"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Location</label>
                <input
                  type="text"
                  value={resumeData.personal.location}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personal: { ...resumeData.personal, location: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border rounded-xl"
                  placeholder="New York, NY"
                />
              </div>
            </div>
          </section>

          {/* ------------------------------------------------ */}
          {/* EDUCATION */}
          {/* ------------------------------------------------ */}
          <section className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Education</h2>
              <button onClick={addEducation} className="flex items-center gap-2 text-[#4F46E5]">
                <Plus className="w-4 h-4" /> Add More
              </button>
            </div>

            {resumeData.education.map((edu, index) => (
              <div key={index} className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm mb-2">School</label>
                  <input
                    type="text"
                    value={edu.school}
                    onChange={(e) => {
                      const copy = [...resumeData.education];
                      copy[index].school = e.target.value;
                      setResumeData({ ...resumeData, education: copy });
                      setProgress(Math.max(progress, 50));
                    }}
                    className="w-full px-4 py-2 border rounded-xl"
                    placeholder="University Name"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      const copy = [...resumeData.education];
                      copy[index].degree = e.target.value;
                      setResumeData({ ...resumeData, education: copy });
                    }}
                    className="w-full px-4 py-2 border rounded-xl"
                    placeholder="Bachelor of Science"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Year</label>
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => {
                      const copy = [...resumeData.education];
                      copy[index].year = e.target.value;
                      setResumeData({ ...resumeData, education: copy });
                    }}
                    className="w-full px-4 py-2 border rounded-xl"
                    placeholder="2024"
                  />
                </div>
              </div>
            ))}
          </section>

          {/* ------------------------------------------------ */}
          {/* SKILLS + AI */}
          {/* ------------------------------------------------ */}
          <section className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">Skills</h2>

              <button
                onClick={() => handleAIImprovement("skills")}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl text-[#4F46E5]"
              >
                <Sparkles className="w-4 h-4" />
                Improve with AI
              </button>
            </div>

            {/* AI SUGGESTION */}
            {skillsSuggestion && (
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-[#4F46E5]">AI Suggestion:</span> {skillsSuggestion}
                </p>
              </div>
            )}

            {/* TAG INPUT */}
            <div className="border p-3 rounded-xl flex flex-wrap gap-2">
              {resumeData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() =>
                      setResumeData({
                        ...resumeData,
                        skills: resumeData.skills.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}

              {/* INPUT */}
              <input
                type="text"
                placeholder="Type skill & press Enter"
                className="flex-grow min-w-[150px] px-3 py-2 border rounded-xl"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && skillInput.trim()) {
                    e.preventDefault();
                    setResumeData({
                      ...resumeData,
                      skills: [...resumeData.skills, skillInput.trim()],
                    });
                    setSkillInput("");
                    setProgress(Math.max(progress, 60));
                  }
                }}
              />
            </div>
          </section>

          {/* ------------------------------------------------ */}
          {/* PROJECTS + AI */}
          {/* ------------------------------------------------ */}
          <section className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Projects</h2>
              <button onClick={addProject} className="flex items-center gap-2 text-[#4F46E5]">
                <Plus className="w-4 h-4" /> Add More
              </button>
            </div>

            {resumeData.projects.map((project, index) => (
              <div key={index} className="space-y-4 mb-6">
                {/* TITLE */}
                <div>
                  <label className="block text-sm mb-2">Project Title</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => {
                      const copy = [...resumeData.projects];
                      copy[index].title = e.target.value;
                      setResumeData({ ...resumeData, projects: copy });
                      setProgress(Math.max(progress, 70));
                    }}
                    className="w-full px-4 py-2 border rounded-xl"
                    placeholder="E-commerce Platform"
                  />
                </div>

                {/* DESCRIPTION */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm">Description</label>
                    <button
                      onClick={() => handleAIImprovement(`project-${index}`)}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl text-[#4F46E5]"
                    >
                      <Sparkles className="w-4 h-4" />
                      Improve with AI
                    </button>
                  </div>

                  {/* AI SUGGESTION (PROJECT SPECIFIC) */}
                  {projectSuggestions[index] && (
                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl mb-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium text-[#4F46E5]">AI Suggestion:</span>{" "}
                        {projectSuggestions[index]}
                      </p>
                    </div>
                  )}

                  <textarea
                    value={project.description}
                    onChange={(e) => {
                      const copy = [...resumeData.projects];
                      copy[index].description = e.target.value;
                      setResumeData({ ...resumeData, projects: copy });
                    }}
                    rows={3}
                    className="w-full px-4 py-3 border rounded-xl"
                    placeholder="Describe your project..."
                  />
                </div>
              </div>
            ))}
          </section>

          {/* ------------------------------------------------ */}
          {/* SUMMARY + AI */}
          {/* ------------------------------------------------ */}
          <section className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">Professional Summary</h2>

              <button
                onClick={() => handleAIImprovement("summary")}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl text-[#4F46E5]"
              >
                <Sparkles className="w-4 h-4" /> Improve with AI
              </button>
            </div>

            {/* AI SUMMARY SUGGESTION */}
            {summarySuggestion && (
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-[#4F46E5]">AI Suggestion:</span>{" "}
                  {summarySuggestion}
                </p>
              </div>
            )}

            <textarea
              rows={4}
              value={resumeData.summary}
              onChange={(e) => {
                setResumeData({ ...resumeData, summary: e.target.value });
                setProgress(Math.max(progress, 85));
              }}
              className="w-full px-4 py-3 border rounded-xl"
              placeholder="Write your professional summary..."
            />
          </section>

          {/* ------------------------------------------------ */}
          {/* CERTIFICATES */}
          {/* ------------------------------------------------ */}
          <section className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Certificates</h2>
              <button onClick={addCertificate} className="flex items-center gap-2 text-[#4F46E5]">
                <Plus className="w-4 h-4" /> Add More
              </button>
            </div>

            {resumeData.certificates.map((cert, index) => (
              <div key={index} className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm mb-2">Certificate Name</label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => {
                      const copy = [...resumeData.certificates];
                      copy[index].name = e.target.value;
                      setResumeData({ ...resumeData, certificates: copy });
                      setProgress(100);
                    }}
                    className="w-full px-4 py-2 border rounded-xl"
                    placeholder="AWS Certified Developer"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Issuer</label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => {
                      const copy = [...resumeData.certificates];
                      copy[index].issuer = e.target.value;
                      setResumeData({ ...resumeData, certificates: copy });
                    }}
                    className="w-full px-4 py-2 border rounded-xl"
                    placeholder="Amazon Web Services"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Date</label>
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) => {
                      const copy = [...resumeData.certificates];
                      copy[index].date = e.target.value;
                      setResumeData({ ...resumeData, certificates: copy });
                    }}
                    className="w-full px-4 py-2 border rounded-xl"
                    placeholder="2024"
                  />
                </div>
              </div>
            ))}
          </section>

          {/* CONTINUE BUTTON */}
          <div className="flex justify-end">
            <button
              onClick={handleContinue}
              className="bg-[#4F46E5] text-white px-8 py-3 rounded-xl hover:scale-105 transition-all shadow-lg"
            >
              Continue to Templates
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
