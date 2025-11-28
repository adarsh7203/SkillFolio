// frontend/src/components/ResumeForm.jsx
import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Plus } from "lucide-react";
import { Header } from "./Header";
import { improveSummary, suggestSkills, improveProject } from "../services/ai";

export function ResumeForm({ onNavigate, resumeData, setResumeData }) {
  const [skillInput, setSkillInput] = useState("");
  const [showAISuggestion, setShowAISuggestion] = useState(null);
  const [progress, setProgress] = useState(25);

  // ----------------------------------------------
  // AI IMPROVEMENT HANDLER
  // ----------------------------------------------
  const handleAIImprovement = async (field, index = null) => {
    setShowAISuggestion("loading");

    try {
      let result = "";

      if (field === "summary") {
        result = await improveSummary(resumeData.summary || "");
        setResumeData({ ...resumeData, summary: result });
      } else if (field === "skills") {
        result = await suggestSkills(resumeData.skills || []);
        // result may be array or comma string depending on backend — normalize
        const newSkills =
          Array.isArray(result) ? result : (result || "").toString().split(",").map(s => s.trim()).filter(Boolean);
        setResumeData({ ...resumeData, skills: [...(resumeData.skills || []), ...newSkills] });
      } else if (field.startsWith("project-")) {
        const idx = parseInt(field.split("-")[1], 10);
        result = await improveProject(resumeData.projects?.[idx]?.description || "");
        const updated = [...(resumeData.projects || [])];
        updated[idx] = { ...(updated[idx] || {}), description: result };
        setResumeData({ ...resumeData, projects: updated });
      }
    } catch (err) {
      console.error(err);
      alert("AI request failed. Check backend / API key.");
    }

    setShowAISuggestion(null);
  };

  // ----------------------------------------------
  // ADD FIELDS
  // ----------------------------------------------
  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...(resumeData.education || []), { school: "", degree: "", year: "" }],
    });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [...(resumeData.projects || []), { title: "", description: "" }],
    });
  };

  const addCertificate = () => {
    setResumeData({
      ...resumeData,
      certificates: [...(resumeData.certificates || []), { name: "", issuer: "", date: "" }],
    });
  };

  const handleContinue = () => {
    setProgress(100);
    setTimeout(() => onNavigate("templates"), 300);
  };

  // Helper to safely read nested values
  const getPersonal = (key, fallback = "") => (resumeData?.personal?.[key] ?? fallback);

  return (
    <div className="min-h-screen">
      <Header onNavigate={onNavigate} currentPage="form" />

      {/* Progress Bar */}
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

      {/* MAIN FORM */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* ----------------------------------------------
              PERSONAL INFO
          ---------------------------------------------- */}
          <section className="bg-white rounded-xl p-8 shadow-md">
            <h2 className="text-2xl text-gray-900 mb-6">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  value={getPersonal("fullName")}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personal: { ...(resumeData.personal || {}), fullName: e.target.value },
                    })
                  }
                  onFocus={() => setProgress(Math.max(progress, 25))}
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#4F46E5]"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={getPersonal("email")}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personal: { ...(resumeData.personal || {}), email: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#4F46E5]"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  value={getPersonal("phone")}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personal: { ...(resumeData.personal || {}), phone: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#4F46E5]"
                  placeholder="+1 234 567 8900"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm mb-2">Location</label>
                <input
                  type="text"
                  value={getPersonal("location")}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personal: { ...(resumeData.personal || {}), location: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#4F46E5]"
                  placeholder="New York, NY"
                />
              </div>
            </div>
          </section>

          {/* ----------------------------------------------
              EDUCATION
          ---------------------------------------------- */}
          <section className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-900">Education</h2>
              <button onClick={addEducation} className="flex items-center gap-2 text-[#4F46E5]">
                <Plus className="w-4 h-4" />
                <span>Add More</span>
              </button>
            </div>

            <div className="space-y-6">
              {(resumeData.education || [{ school: "", degree: "", year: "" }]).map((edu, index) => (
                <div key={index} className="grid md:grid-cols-3 gap-4">
                  {/* School */}
                  <div>
                    <label className="text-sm block mb-2">School</label>
                    <input
                      type="text"
                      value={edu.school || ""}
                      onChange={(e) => {
                        const list = [...(resumeData.education || [])];
                        list[index] = { ...(list[index] || {}), school: e.target.value };
                        setResumeData({ ...resumeData, education: list });
                        setProgress(Math.max(progress, 50));
                      }}
                      className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#4F46E5]"
                      placeholder="University Name"
                    />
                  </div>

                  {/* Degree */}
                  <div>
                    <label className="text-sm block mb-2">Degree</label>
                    <input
                      type="text"
                      value={edu.degree || ""}
                      onChange={(e) => {
                        const list = [...(resumeData.education || [])];
                        list[index] = { ...(list[index] || {}), degree: e.target.value };
                        setResumeData({ ...resumeData, education: list });
                      }}
                      className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#4F46E5]"
                      placeholder="Bachelor of Science"
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <label className="text-sm block mb-2">Year</label>
                    <input
                      type="text"
                      value={edu.year || ""}
                      onChange={(e) => {
                        const list = [...(resumeData.education || [])];
                        list[index] = { ...(list[index] || {}), year: e.target.value };
                        setResumeData({ ...resumeData, education: list });
                      }}
                      className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#4F46E5]"
                      placeholder="2024"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ----------------------------------------------
              SKILLS + AI
          ---------------------------------------------- */}
          <section className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-800">Skills</h2>

              <button
                onClick={() => handleAIImprovement("skills")}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-[#4F46E5] rounded-xl"
              >
                <Sparkles className="w-4 h-4" />
                <span>Improve with AI</span>
              </button>
            </div>

            {/* LOADING */}
            {showAISuggestion === "loading" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100"
              >
                <p className="text-sm text-gray-700">
                  <span className="text-[#4F46E5]">AI Thinking...</span> Generating optimized skills.
                </p>
              </motion.div>
            )}

            {/* Tags */}
            <div className="border p-3 rounded-xl flex flex-wrap gap-2">
              {(resumeData.skills || []).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() =>
                      setResumeData({
                        ...resumeData,
                        skills: (resumeData.skills || []).filter((_, i) => i !== idx),
                      })
                    }
                    className="text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}

              {/* Input */}
              <input
                type="text"
                className="flex-grow min-w-[150px] px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#4F46E5]"
                placeholder="Type skill & press Enter"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && skillInput.trim()) {
                    e.preventDefault();
                    setResumeData({
                      ...resumeData,
                      skills: [...(resumeData.skills || []), skillInput.trim()],
                    });
                    setSkillInput("");
                    setProgress(Math.max(progress, 60));
                  }
                }}
              />
            </div>
          </section>

          {/* ----------------------------------------------
              PROJECTS + AI
          ---------------------------------------------- */}
          <section className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-900">Projects</h2>
              <button onClick={addProject} className="flex items-center gap-2 text-[#4F46E5]">
                <Plus className="w-4 h-4" />
                <span>Add More</span>
              </button>
            </div>

            {(resumeData.projects || [{ title: "", description: "" }]).map((project, index) => (
              <div key={index} className="space-y-4 mb-6">
                {/* Project Title */}
                <div>
                  <label className="block text-sm mb-2">Project Title</label>
                  <input
                    type="text"
                    value={project.title || ""}
                    onChange={(e) => {
                      const list = [...(resumeData.projects || [])];
                      list[index] = { ...(list[index] || {}), title: e.target.value };
                      setResumeData({ ...resumeData, projects: list });
                      setProgress(Math.max(progress, 70));
                    }}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#4F46E5]"
                    placeholder="E-commerce Platform"
                  />
                </div>

                {/* Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm">Description</label>

                    <button
                      onClick={() => handleAIImprovement(`project-${index}`)}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-[#4F46E5] rounded-xl"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Improve with AI</span>
                    </button>
                  </div>

                  <textarea
                    value={project.description || ""}
                    onChange={(e) => {
                      const list = [...(resumeData.projects || [])];
                      list[index] = { ...(list[index] || {}), description: e.target.value };
                      setResumeData({ ...resumeData, projects: list });
                    }}
                    rows={3}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#4F46E5]"
                    placeholder="Built a full-stack e-commerce platform using React and Node.js..."
                  />
                </div>
              </div>
            ))}
          </section>

          {/* ----------------------------------------------
              SUMMARY + AI
          ---------------------------------------------- */}
          <section className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-900">Professional Summary</h2>

              <button
                onClick={() => handleAIImprovement("summary")}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-[#4F46E5] rounded-xl"
              >
                <Sparkles className="w-4 h-4" />
                <span>Improve with AI</span>
              </button>
            </div>

            <textarea
              value={resumeData.summary || ""}
              onChange={(e) => {
                setResumeData({ ...resumeData, summary: e.target.value });
                setProgress(Math.max(progress, 85));
              }}
              rows={4}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#4F46E5]"
              placeholder="Passionate software developer with experience in building web applications..."
            />
          </section>

          {/* ----------------------------------------------
              CERTIFICATES
          ---------------------------------------------- */}
          <section className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-900">Certificates</h2>
              <button onClick={addCertificate} className="flex items-center gap-2 text-[#4F46E5]">
                <Plus className="w-4 h-4" />
                <span>Add More</span>
              </button>
            </div>

            {(resumeData.certificates || [{ name: "", issuer: "", date: "" }]).map((cert, index) => (
              <div key={index} className="grid md:grid-cols-3 gap-4 mb-6">
                {/* Name */}
                <div>
                  <label className="block text-sm mb-2">Certificate Name</label>
                  <input
                    type="text"
                    value={cert.name || ""}
                    onChange={(e) => {
                      const list = [...(resumeData.certificates || [])];
                      list[index] = { ...(list[index] || {}), name: e.target.value };
                      setResumeData({ ...resumeData, certificates: list });
                      setProgress(100);
                    }}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#4F46E5]"
                    placeholder="AWS Certified Developer"
                  />
                </div>

                {/* Issuer */}
                <div>
                  <label className="block text-sm mb-2">Issuer</label>
                  <input
                    type="text"
                    value={cert.issuer || ""}
                    onChange={(e) => {
                      const list = [...(resumeData.certificates || [])];
                      list[index] = { ...(list[index] || {}), issuer: e.target.value };
                      setResumeData({ ...resumeData, certificates: list });
                    }}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#4F46E5]"
                    placeholder="Amazon Web Services"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm mb-2">Date</label>
                  <input
                    type="text"
                    value={cert.date || ""}
                    onChange={(e) => {
                      const list = [...(resumeData.certificates || [])];
                      list[index] = { ...(list[index] || {}), date: e.target.value };
                      setResumeData({ ...resumeData, certificates: list });
                    }}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#4F46E5]"
                    placeholder="2024"
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Continue */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleContinue}
              className="bg-[#4F46E5] text-white px-8 py-3 rounded-xl hover:scale-105 transition-transform"
            >
              Continue to Templates
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
