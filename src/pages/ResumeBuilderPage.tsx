import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, UserCircle, Briefcase, GraduationCap, Award, Upload } from 'lucide-react';
import { Resume, ContactInfo, Experience, Education, Skill, Certification, TemplateType } from '../types';
import { useAppContext } from '../context/AppContext';
import TemplateSelector from '../components/resume/TemplateSelector';
import ResumePreview from '../components/resume/ResumePreview';
import ContactForm from '../components/resume/ContactForm';
import ExperienceForm from '../components/resume/ExperienceForm';
import EducationForm from '../components/resume/EducationForm';
import SkillsForm from '../components/resume/SkillsForm';
import CertificationsForm from '../components/resume/CertificationsForm';

type FormSection = 'contact' | 'summary' | 'experience' | 'education' | 'skills' | 'certifications' | 'template';

const ResumeBuilderPage: React.FC = () => {
  const { jobDescription, resume: savedResume, setResume, setActiveStep } = useAppContext();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<FormSection>('contact');
  const [template, setTemplate] = useState<TemplateType>(TemplateType.MODERN);
  
  // Resume state
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
    location: '',
  });
  const [summary, setSummary] = useState('');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  // If we have a saved resume, load it
  useEffect(() => {
    if (savedResume) {
      setContactInfo(savedResume.contactInfo);
      setSummary(savedResume.summary || '');
      setExperiences(savedResume.experience);
      setEducation(savedResume.education);
      setSkills(savedResume.skills);
      setCertifications(savedResume.certifications);
    } else if (jobDescription) {
      // Pre-populate skills based on job description
      const hardSkills = jobDescription.extractedData.hardSkills.map(name => ({ name, type: 'hard' as const }));
      const softSkills = jobDescription.extractedData.softSkills.map(name => ({ name, type: 'soft' as const }));
      const tools = jobDescription.extractedData.tools.map(name => ({ name, type: 'tool' as const }));
      
      setSkills([...hardSkills, ...softSkills, ...tools]);
    }
  }, [savedResume, jobDescription]);

  const handleSectionChange = (section: FormSection) => {
    setActiveSection(section);
  };

  const handleContinue = () => {
    const currentResume: Resume = {
      contactInfo,
      summary,
      experience: experiences,
      education,
      skills,
      certifications,
    };

    setResume(currentResume);
    setActiveStep(2);
    navigate('/optimize');
  };

  const sections: { id: FormSection; label: string; icon: React.FC<any> }[] = [
    { id: 'contact', label: 'Contact', icon: UserCircle },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'template', label: 'Template', icon: Upload },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'contact':
        return (
          <ContactForm
            contactInfo={contactInfo}
            setContactInfo={setContactInfo}
            summary={summary}
            setSummary={setSummary}
          />
        );
      case 'experience':
        return (
          <ExperienceForm
            experiences={experiences}
            setExperiences={setExperiences}
          />
        );
      case 'education':
        return (
          <EducationForm
            education={education}
            setEducation={setEducation}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            skills={skills}
            setSkills={setSkills}
            jobDescription={jobDescription}
          />
        );
      case 'certifications':
        return (
          <CertificationsForm
            certifications={certifications}
            setCertifications={setCertifications}
          />
        );
      case 'template':
        return (
          <TemplateSelector
            selectedTemplate={template}
            setSelectedTemplate={setTemplate}
          />
        );
      default:
        return null;
    }
  };

  const isFormValid = () => {
    // Basic validation
    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      return false;
    }
    
    if (experiences.length === 0) {
      return false;
    }
    
    if (education.length === 0) {
      return false;
    }
    
    if (skills.length === 0) {
      return false;
    }
    
    return true;
  };

  return (
    <div className="mb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Step 2: Build Your Resume</h1>
        <p className="text-gray-600">
          Create an ATS-friendly resume that highlights your skills and experience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionChange(section.id)}
                      className={`relative flex-1 py-4 px-1 text-center text-xs font-medium overflow-hidden
                        ${activeSection === section.id
                          ? 'text-primary-600 border-b-2 border-primary-500'
                          : 'text-gray-500 hover:text-gray-700'
                        }`}
                      aria-current={activeSection === section.id ? 'page' : undefined}
                    >
                      <Icon className="h-5 w-5 mx-auto mb-1" />
                      <span className="truncate">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6">
              {renderActiveSection()}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <ResumePreview
            resume={{
              contactInfo,
              summary,
              experience: experiences,
              education,
              skills,
              certifications,
            }}
            template={template}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleContinue}
          disabled={!isFormValid()}
          className={`
            flex items-center py-3 px-8 rounded-lg shadow-md transition-all duration-300
            ${isFormValid()
              ? 'bg-primary-600 hover:bg-primary-700 text-white hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          Continue to Optimize
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;