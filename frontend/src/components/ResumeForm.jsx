import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Plus, Trash2 } from 'lucide-react';
import { Header } from './Header';



export function ResumeForm({ onNavigate, resumeData, setResumeData }) {
  const [skillInput, setSkillInput] = useState("");
  const [showAISuggestion, setShowAISuggestion] = useState(null);
  const [progress, setProgress] = useState(25);

  const handleAIImprovement = (field) => {
    setShowAISuggestion(field);
    setTimeout(() => {
      setShowAISuggestion(null);
    }, 3000);
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { school: '', degree: '', year: '' }]
    });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, { title: '', description: '' }]
    });
  };

  const addCertificate = () => {
    setResumeData({
      ...resumeData,
      certificates: [...resumeData.certificates, { name: '', issuer: '', date: '' }]
    });
  };

  const handleContinue = () => {
    setProgress(100);
    setTimeout(() => onNavigate('templates'), 300);
  };

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
              initial={{ width: '25%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Personal Information */}
          <section className="bg-white rounded-xl p-8 shadow-md">
            <h2 className="text-2xl text-gray-900 mb-6">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={resumeData.personal.fullName}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    personal: { ...resumeData.personal, fullName: e.target.value }
                  })}
                  onFocus={() => setProgress(Math.max(progress, 25))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-shadow"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={resumeData.personal.email}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    personal: { ...resumeData.personal, email: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-shadow"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={resumeData.personal.phone}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    personal: { ...resumeData.personal, phone: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-shadow"
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={resumeData.personal.location}
                  onChange={(e) => setResumeData({
                    ...resumeData,
                    personal: { ...resumeData.personal, location: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-shadow"
                  placeholder="New York, NY"
                />
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="bg-white rounded-xl p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-900">Education</h2>
              <button
                onClick={addEducation}
                className="flex items-center gap-2 text-[#4F46E5] hover:text-[#6366F1] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add More</span>
              </button>
            </div>
            <div className="space-y-6">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-sm text-gray-700 mb-2">School</label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => {
                        const newEducation = [...resumeData.education];
                        newEducation[index].school = e.target.value;
                        setResumeData({ ...resumeData, education: newEducation });
                        setProgress(Math.max(progress, 50));
                      }}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-shadow"
                      placeholder="University Name"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm text-gray-700 mb-2">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const newEducation = [...resumeData.education];
                        newEducation[index].degree = e.target.value;
                        setResumeData({ ...resumeData, education: newEducation });
                      }}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-shadow"
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm text-gray-700 mb-2">Year</label>
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => {
                        const newEducation = [...resumeData.education];
                        newEducation[index].year = e.target.value;
                        setResumeData({ ...resumeData, education: newEducation });
                      }}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-shadow"
                      placeholder="2024"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="bg-white rounded-xl p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-800">Skills</h2>
              <button
                onClick={() => handleAIImprovement('skills')}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-[#4F46E5] rounded-xl hover:bg-indigo-100 transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">Improve with AI</span>
              </button>
            </div>

            {/* TAG INPUT */}
            <div className="border border-gray-200 rounded-xl p-3 flex flex-wrap gap-2">
              {resumeData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => {
                      const updated = resumeData.skills.filter((_, i) => i !== idx);
                      setResumeData({ ...resumeData, skills: updated });
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}

              {/* Input Box */}
              <input
              type="text"
              className="flex-grow min-w-[150px] px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
              placeholder="Type skill and press Space or Enter"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && skillInput.trim() !== "") {
                  e.preventDefault();
                  const newSkill = skillInput.trim();
                  setResumeData({
                    ...resumeData,
                    skills: [...resumeData.skills, newSkill]
                  });
                  setSkillInput("");
                  setProgress(prev => Math.max(prev, 60));
                }
              }}
            />

            </div>

            {showAISuggestion === 'skills' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-xl"
              >
                <p className="text-sm text-gray-700">
                  <span className="text-[#4F46E5]">AI Suggestion:</span> Consider adding: UI/UX Design, Git, Agile Methodologies
                </p>
              </motion.div>
            )}
          </section>


          {/* Projects */}
          <section className="bg-white rounded-xl p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-900">Projects</h2>
              <button
                onClick={addProject}
                className="flex items-center gap-2 text-[#4F46E5] hover:text-[#6366F1] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add More</span>
              </button>
            </div>
            <div className="space-y-6">
              {resumeData.projects.map((project, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Project Title</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => {
                        const newProjects = [...resumeData.projects];
                        newProjects[index].title = e.target.value;
                        setResumeData({ ...resumeData, projects: newProjects });
                        setProgress(Math.max(progress, 70));
                      }}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-shadow"
                      placeholder="E-commerce Platform"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm text-gray-700">Description</label>
                      <button
                        onClick={() => handleAIImprovement(`project-${index}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-[#4F46E5] rounded-xl 
                                  hover:bg-indigo-100 transition-all hover:scale-105"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm">Improve with AI</span>
                      </button>
                    </div>
                    <textarea
                      value={project.description}
                      onChange={(e) => {
                        const newProjects = [...resumeData.projects];
                        newProjects[index].description = e.target.value;
                        setResumeData({ ...resumeData, projects: newProjects });
                      }}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-shadow resize-none"
                      rows={3}
                      placeholder="Built a full-stack e-commerce platform using React and Node.js..."
                    />
                    {showAISuggestion === `project-${index}` && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 p-4 bg-indigo-50 border border-indigo-100 rounded-xl"
                      >
                        <p className="text-sm text-gray-700">
                          <span className="text-[#4F46E5]">AI Suggestion:</span> Add metrics like user count, performance improvements, or technologies used to make your description more impactful.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Summary */}
          <section className="bg-white rounded-xl p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-900">Professional Summary</h2>
              <button
                onClick={() => handleAIImprovement('summary')}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-[#4F46E5] rounded-xl hover:bg-indigo-100 transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">Improve with AI</span>
              </button>
            </div>
            <textarea
              value={resumeData.summary}
              onChange={(e) => {
                setResumeData({ ...resumeData, summary: e.target.value });
                setProgress(Math.max(progress, 85));
              }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-shadow resize-none"
              rows={4}
              placeholder="Passionate software developer with experience in building web applications..."
            />
            {showAISuggestion === 'summary' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-indigo-50 border border-indigo-100 rounded-xl"
              >
                <p className="text-sm text-gray-700">
                  <span className="text-[#4F46E5]">AI Suggestion:</span> Highlight your unique strengths and quantify your achievements to stand out to employers.
                </p>
              </motion.div>
            )}
          </section>

          {/* Certificates */}
          <section className="bg-white rounded-xl p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-900">Certificates</h2>
              <button
                onClick={addCertificate}
                className="flex items-center gap-2 text-[#4F46E5] hover:text-[#6366F1] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add More</span>
              </button>
            </div>
            <div className="space-y-6">
              {resumeData.certificates.map((cert, index) => (
                <div key={index} className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Certificate Name</label>
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => {
                        const newCerts = [...resumeData.certificates];
                        newCerts[index].name = e.target.value;
                        setResumeData({ ...resumeData, certificates: newCerts });
                        setProgress(100);
                      }}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-shadow"
                      placeholder="AWS Certified Developer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Issuer</label>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => {
                        const newCerts = [...resumeData.certificates];
                        newCerts[index].issuer = e.target.value;
                        setResumeData({ ...resumeData, certificates: newCerts });
                      }}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-shadow"
                      placeholder="Amazon Web Services"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Date</label>
                    <input
                      type="text"
                      value={cert.date}
                      onChange={(e) => {
                        const newCerts = [...resumeData.certificates];
                        newCerts[index].date = e.target.value;
                        setResumeData({ ...resumeData, certificates: newCerts });
                      }}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-shadow"
                      placeholder="2024"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Continue Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleContinue}
              className="bg-[#4F46E5] text-white px-8 py-3 rounded-xl transition-transform hover:scale-105 shadow-lg shadow-indigo-500/20"
            >
              Continue to Templates
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
