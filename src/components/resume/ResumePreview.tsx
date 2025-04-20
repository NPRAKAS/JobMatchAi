import React from 'react';
import { Resume, TemplateType } from '../../types';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';
import SkillTag from '../ui/SkillTag';

interface ResumePreviewProps {
  resume: Resume;
  template?: TemplateType;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ 
  resume, 
  template = TemplateType.MODERN 
}) => {
  if (!resume) return null;

  const { 
    contactInfo, 
    summary, 
    experience, 
    education, 
    skills, 
    certifications 
  } = resume;

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short'
      });
    } catch (e) {
      return dateString;
    }
  };
  
  // Template-specific styles
  const getTemplateStyles = () => {
    switch (template) {
      case TemplateType.MODERN:
        return {
          container: 'bg-white font-sans',
          header: 'bg-primary-50 px-8 py-6',
          name: 'text-3xl font-bold text-gray-900',
          section: 'mb-6',
          sectionTitle: 'text-lg font-semibold text-primary-700 border-b border-primary-200 pb-1 mb-3',
          bodyText: 'text-gray-700',
        };
      case TemplateType.CLASSIC:
        return {
          container: 'bg-white font-serif',
          header: 'text-center border-b-2 border-gray-300 px-8 py-6',
          name: 'text-3xl font-bold text-gray-900',
          section: 'mb-6',
          sectionTitle: 'text-lg font-semibold text-gray-800 uppercase border-b border-gray-300 pb-1 mb-3',
          bodyText: 'text-gray-700',
        };
      case TemplateType.MINIMAL:
        return {
          container: 'bg-white font-sans',
          header: 'px-8 py-6',
          name: 'text-3xl font-bold text-gray-900',
          section: 'mb-6',
          sectionTitle: 'text-lg font-semibold text-gray-800 mb-3',
          bodyText: 'text-gray-700',
        };
      default:
        return {
          container: 'bg-white font-sans',
          header: 'bg-primary-50 px-8 py-6',
          name: 'text-3xl font-bold text-gray-900',
          section: 'mb-6',
          sectionTitle: 'text-lg font-semibold text-primary-700 border-b border-primary-200 pb-1 mb-3',
          bodyText: 'text-gray-700',
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className={`${styles.container} min-h-full`}>
      {/* Header / Contact Information */}
      <header className={styles.header}>
        <h1 className={styles.name}>{contactInfo.name}</h1>
        
        <div className="flex flex-wrap gap-3 mt-3 text-gray-700">
          {contactInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span>{contactInfo.email}</span>
            </div>
          )}
          
          {contactInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              <span>{contactInfo.phone}</span>
            </div>
          )}
          
          {contactInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{contactInfo.location}</span>
            </div>
          )}
          
          {contactInfo.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              <span>{contactInfo.website}</span>
            </div>
          )}
          
          {contactInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="h-4 w-4 mr-1" />
              <span>{contactInfo.linkedin}</span>
            </div>
          )}
        </div>
      </header>

      <main className="px-8 py-6">
        {/* Professional Summary */}
        {summary && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Professional Summary</h2>
            <p className={styles.bodyText}>{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Professional Experience</h2>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                      <div className="text-gray-600">
                        {exp.company}{exp.location ? `, ${exp.location}` : ''}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <ul className="list-disc list-inside mt-2 text-gray-700">
                    {exp.description.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="mb-1">{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{edu.degree} in {edu.field}</h3>
                      <div className="text-gray-600">{edu.institution}</div>
                      {edu.gpa && <div className="text-gray-600">GPA: {edu.gpa}</div>}
                    </div>
                    <div className="text-sm text-gray-600 whitespace-nowrap">
                      {formatDate(edu.graduationDate)}
                    </div>
                  </div>
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      {edu.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <SkillTag 
                  key={index} 
                  name={skill.name} 
                  type={skill.type}
                  matched={skill.matched}
                />
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Certifications</h2>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                    <div className="text-gray-600">{cert.issuer}</div>
                  </div>
                  <div className="text-sm text-gray-600 whitespace-nowrap">
                    {formatDate(cert.date)}
                    {cert.expiration && ` - ${formatDate(cert.expiration)}`}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ResumePreview;