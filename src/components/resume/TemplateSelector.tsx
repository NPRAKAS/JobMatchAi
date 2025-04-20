import React from 'react';
import { TemplateType, ResumeTemplate } from '../../types';

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  setSelectedTemplate: (template: TemplateType) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  selectedTemplate, 
  setSelectedTemplate 
}) => {
  const templates: ResumeTemplate[] = [
    {
      id: TemplateType.MODERN,
      name: 'Modern',
      description: 'Clean, professional design with color accents and a modern layout.',
      preview: 'modern-template.png'
    },
    {
      id: TemplateType.CLASSIC,
      name: 'Classic',
      description: 'Traditional format preferred by conservative industries and ATS systems.',
      preview: 'classic-template.png'
    },
    {
      id: TemplateType.MINIMAL,
      name: 'Minimal',
      description: 'Streamlined design focusing on content with minimal styling.',
      preview: 'minimal-template.png'
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Choose a Template</h3>
      <div className="space-y-4">
        {templates.map(template => (
          <div 
            key={template.id}
            className={`
              border rounded-lg cursor-pointer overflow-hidden transition duration-200
              ${selectedTemplate === template.id 
                ? 'border-primary-500 ring-2 ring-primary-200' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">{template.name}</h4>
                <div className={`h-4 w-4 rounded-full ${
                  selectedTemplate === template.id 
                    ? 'bg-primary-500' 
                    : 'bg-gray-200'
                }`} />
              </div>
              <p className="text-sm text-gray-500">{template.description}</p>
            </div>
            <div className="bg-gray-100 p-4 flex justify-center items-center h-32">
              <div className={`
                w-full h-full bg-white shadow-sm border
                ${template.id === TemplateType.MODERN 
                  ? 'border-t-4 border-t-primary-500' 
                  : template.id === TemplateType.CLASSIC 
                  ? 'border-gray-300' 
                  : 'border-gray-200'
                }
              `}>
                <div className="h-6 bg-gray-200 mx-4 mt-4 mb-2 rounded" />
                <div className="h-4 bg-gray-100 mx-4 mb-1 rounded w-3/4" />
                <div className="h-4 bg-gray-100 mx-4 mb-2 rounded w-1/2" />
                <div className="flex mx-4 mb-1 space-x-1">
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;