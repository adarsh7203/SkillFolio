import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Header } from './Header';
import { ImageWithFallback } from './image/ImageWithFallback';

export function TemplateSelection({
  onNavigate,
  selectedTemplate,
  setSelectedTemplate
}) {
  const templates = [
    {
      id: 1,
      name: 'Modern Professional',
      image: 'https://i.ibb.co/NgjZ6Sxd/Gemini-Generated-Image-tixbttixbttixbtt.png'
    },
    {
      id: 2,
      name: 'Clean Minimal',
      image: 'https://i.ibb.co/JRTvYbYr/Gemini-Generated-Image-tixbttixbttixbtt-1.png'
    },
    {
      id: 3,
      name: 'Creative Bold',
      image: 'https://i.ibb.co/rfRGL4S6/Gemini-Generated-Image-tixbttixbttixbtt-2.png'
    }
  ];

  const handleContinue = () => {
    onNavigate('preview');
  };

  return (
    <div className="min-h-screen">
      <Header onNavigate={onNavigate} currentPage="templates" />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl text-gray-900 mb-3 text-center">
            Choose Your Resume Template
          </h1>
          <p className="text-xl text-gray-600 mb-12 text-center">
            Select a template that best represents your style
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div
                  className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all hover:scale-[1.03] ${
                    selectedTemplate === template.id
                      ? 'ring-2 ring-[#4F46E5] shadow-lg shadow-indigo-500/20'
                      : ''
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="aspect-[4/5] bg-gray-100 relative">
                    <ImageWithFallback
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                    {selectedTemplate === template.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 w-8 h-8 bg-[#4F46E5] rounded-full flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg text-gray-900 mb-3 text-center">
                      {template.name}
                    </h3>
                    <button
                      className={`w-full py-2 rounded-xl transition-colors ${
                        selectedTemplate === template.id
                          ? 'bg-[#4F46E5] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate(template.id);
                      }}
                    >
                      {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              className="bg-[#4F46E5] text-white px-8 py-3 rounded-xl transition-transform hover:scale-105 shadow-lg shadow-indigo-500/20"
            >
              Continue to Preview
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
