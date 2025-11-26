import { FileText } from 'lucide-react';

export function Header({ onNavigate, currentPage = 'home' }) {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl text-gray-900">Skillfolio</span>
        </button>
        
        <nav className="flex gap-8">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors ${
              currentPage === 'home'
                ? 'text-[#4F46E5]'
                : 'text-gray-600 hover:text-[#4F46E5]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('form')}
            className={`transition-colors ${
              currentPage === 'form' ||
              currentPage === 'templates' ||
              currentPage === 'preview'
                ? 'text-[#4F46E5]'
                : 'text-gray-600 hover:text-[#4F46E5]'
            }`}
          >
            Create Resume
          </button>
        </nav>
      </div>
    </header>
  );
}
