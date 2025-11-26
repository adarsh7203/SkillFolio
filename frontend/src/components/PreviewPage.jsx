import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Download } from "lucide-react";
import { Header } from "./Header";
import api from "../services/api";

export function PreviewPage({ onNavigate, resumeData, template }) {
  const [htmlPreview, setHtmlPreview] = useState("");
  const iframeRef = useRef(null);

  // 👉 Fetch live preview HTML from backend
  const loadPreview = async () => {
    try {
      const payload = { template_id: template, data: resumeData };

      const res = await api.post("/api/pdf/preview", payload, {
        headers: { "Content-Type": "application/json" },
      });

      setHtmlPreview(res.data);
    } catch (err) {
      console.error("Preview load error:", err);
    }
  };

  useEffect(() => {
    loadPreview();
  }, [template, resumeData]);

  // 👉 Auto-resize iframe height
  useEffect(() => {
    if (!iframeRef.current) return;

    const updateHeight = () => {
      try {
        const iframeDoc = iframeRef.current.contentDocument;
        if (iframeDoc?.body?.scrollHeight) {
          iframeRef.current.style.height = iframeDoc.body.scrollHeight + "px";
        }
      } catch (e) {}
    };

    setTimeout(updateHeight, 300);
  }, [htmlPreview]);

  // 👉 Download handler (PDF)
  const handleDownload = async () => {
    try {
      const payload = {
        template_id: template,
        data: resumeData,
      };

      const res = await api.post("/api/pdf/generate", payload, {
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Skillfolio_Resume.pdf";
      a.click();

      window.URL.revokeObjectURL(url);

      onNavigate("success");
    } catch (error) {
      console.error(error);
      alert("Failed to generate PDF.");
    }
  };

  return (
    <div className="min-h-screen">
      <Header onNavigate={onNavigate} currentPage="preview" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE: REAL TEMPLATE PREVIEW */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h2 className="text-2xl text-gray-900 mb-6">Resume Preview</h2>

            <div className="bg-white rounded-xl shadow-xl p-6">
              {htmlPreview ? (
                <iframe
                  ref={iframeRef}
                  srcDoc={htmlPreview}
                  className="w-full border rounded-xl"
                  style={{
                    height: "1000px",
                    background: "white"
                  }}
                />
              ) : (
                <p className="text-gray-500">Loading preview...</p>
              )}
            </div>
          </motion.div>

          {/* RIGHT SIDE — Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-6 space-y-4">
              <h2 className="text-2xl text-gray-900 mb-6">Actions</h2>

              <button
                onClick={() => onNavigate("form")}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:scale-105 shadow-md transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Edit
              </button>

              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#4F46E5] text-white rounded-xl hover:scale-105 shadow-lg shadow-indigo-500/20 transition-all"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
