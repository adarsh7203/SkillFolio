import { motion } from 'motion/react';
import { Sparkles, Zap, Download } from 'lucide-react';
import { Header } from './Header';
import { ImageWithFallback } from './image/ImageWithFallback';

export function HomePage({ onNavigate }) {
  return (
    <div className="min-h-screen">
      <Header onNavigate={onNavigate} currentPage="home" />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl text-gray-900 mb-6">
              Build Your Resume with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Simple, Smart and Fast AI-Powered Resume Builder.
            </p>
            <button
              onClick={() => onNavigate('form')}
              className="bg-[#4F46E5] text-white px-8 py-3 rounded-xl transition-transform hover:scale-105 shadow-lg shadow-indigo-500/20"
            >
              Start Building
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <ImageWithFallback
                src="https://i.ibb.co/ywLW4Zd/Gemini-Generated-Image-le2d0qle2d0qle2d.png"
                alt="Resume illustration"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-[#4F46E5]" />
            </div>
            <h3 className="text-xl text-gray-900 mb-3">AI-Powered</h3>
            <p className="text-gray-600">
              Get intelligent suggestions for your skills, projects, and professional summary
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#4F46E5]" />
            </div>
            <h3 className="text-xl text-gray-900 mb-3">Fast & Simple</h3>
            <p className="text-gray-600">
              Create a professional resume in minutes with our intuitive builder
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-[#4F46E5]" />
            </div>
            <h3 className="text-xl text-gray-900 mb-3">Export Ready</h3>
            <p className="text-gray-600">
              Download your resume as a PDF and start applying immediately
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 mt-20 mb-6 border-t border-gray-200">
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <a
            href="https://github.com/adarsh7203/SkillFolio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#4F46E5] transition"
          >
            {/* GitHub Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.2-1.1-1.6-1.1-1.6-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.6 1.1 3.2.8.1-.7.4-1.1.7-1.4-2.6-.3-5.4-1.3-5.4-6a4.7 4.7 0 0 1 1.3-3.3 4.3 4.3 0 0 1 .1-3.2s1-.3 3.4 1.3a11.5 11.5 0 0 1 6.2 0c2.4-1.6 3.4-1.3 3.4-1.3a4.3 4.3 0 0 1 .1 3.2 4.7 4.7 0 0 1 1.3 3.3c0 4.7-2.8 5.7-5.5 6 .5.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
            </svg>

            <span className="text-sm font-medium">GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
