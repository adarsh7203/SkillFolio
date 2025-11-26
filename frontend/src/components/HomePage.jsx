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
    </div>
  );
}
