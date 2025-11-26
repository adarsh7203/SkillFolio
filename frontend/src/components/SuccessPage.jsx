import { motion } from 'motion/react';
import { CheckCircle, Download, Home } from 'lucide-react';
import { Header } from './Header';
import axios from "axios";
import { API_BASE } from "../services/api";

export function SuccessPage({ onNavigate, finalData, selectedTemplate }) {

  const handleDownload = async () => {
    try {
      const url = `${API_BASE}/api/pdf/generate?t=${Date.now()}`;

      const payload = {
        template_id: selectedTemplate,
        data: finalData
      };

      const response = await axios.post(url, payload, {
        responseType: "blob",
        headers: { "Cache-Control": "no-cache" }
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = link;
      a.download = "SkillFolio_Resume.pdf";
      a.click();

      window.URL.revokeObjectURL(link);

    } catch (err) {
      console.error("PDF Download Error:", err);
      alert("PDF download failed. Check backend logs.");
    }
  };

  return (
    <div className="min-h-screen">
      <Header onNavigate={onNavigate} currentPage="preview" />
      
      <div className="max-w-2xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl text-gray-900 mb-4"
          >
            Your Resume is Ready!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-gray-600 mb-12"
          >
            Your professional resume has been successfully created and is ready to download.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-[#4F46E5] text-white rounded-xl transition-all hover:scale-105 shadow-lg shadow-indigo-500/20"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl transition-all hover:scale-105 shadow-md"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
