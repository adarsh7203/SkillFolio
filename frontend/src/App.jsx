import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { ResumeForm } from './components/ResumeForm';
import { TemplateSelection } from './components/TemplateSelection';
import { PreviewPage } from './components/PreviewPage';
import { SuccessPage } from './components/SuccessPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [resumeData, setResumeData] = useState({
    personal: { fullName: '', email: '', phone: '', location: '' },
    education: [{ school: '', degree: '', year: '' }],
    skills: [],
    projects: [{ title: '', description: '' }],
    summary: '',
    certificates: [{ name: '', issuer: '', date: '' }]
  });
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
      
      {currentPage === 'form' && (
        <ResumeForm
          onNavigate={navigateTo}
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
      )}

      {currentPage === 'templates' && (
        <TemplateSelection
          onNavigate={navigateTo}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
      )}

      {currentPage === 'preview' && (
        <PreviewPage
          onNavigate={navigateTo}
          resumeData={resumeData}
          template={selectedTemplate}
        />
      )}

      {currentPage === 'success' && (
        <SuccessPage 
          onNavigate={navigateTo}
          finalData={resumeData}
          selectedTemplate={selectedTemplate}
        />
      )}

    </div>
  );
}
