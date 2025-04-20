import React, { useState } from 'react';
import { Skill, JobDescription } from '../../types';
import SkillTag from '../ui/SkillTag';
import { PlusCircle } from 'lucide-react';

interface SkillsFormProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  jobDescription: JobDescription | null;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ skills, setSkills, jobDescription }) => {
  const [skillName, setSkillName] = useState('');
  const [skillType, setSkillType] = useState<'hard' | 'soft' | 'tool'>('hard');
  
  const handleAddSkill = () => {
    if (skillName.trim() === '') return;
    
    // Check if skill already exists
    if (skills.some(skill => skill.name.toLowerCase() === skillName.toLowerCase())) {
      return;
    }
    
    setSkills([...skills, { name: skillName, type: skillType }]);
    setSkillName('');
  };
  
  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillName.trim() !== '') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  // Function to suggest skills from job description
  const suggestSkillsFromJob = () => {
    if (!jobDescription) return [];
    
    // Combine all skills from job description
    const hardSkills = jobDescription.extractedData.hardSkills || [];
    const softSkills = jobDescription.extractedData.softSkills || [];
    const tools = jobDescription.extractedData.tools || [];
    
    // Create a set of existing skill names for quick lookup
    const existingSkillNames = new Set(skills.map(skill => skill.name.toLowerCase()));
    
    // Filter out skills that are already added
    const suggestedHardSkills = hardSkills.filter(
      skill => !existingSkillNames.has(skill.toLowerCase())
    ).map(name => ({ name, type: 'hard' as const }));
    
    const suggestedSoftSkills = softSkills.filter(
      skill => !existingSkillNames.has(skill.toLowerCase())
    ).map(name => ({ name, type: 'soft' as const }));
    
    const suggestedTools = tools.filter(
      skill => !existingSkillNames.has(skill.toLowerCase())
    ).map(name => ({ name, type: 'tool' as const }));
    
    return [...suggestedHardSkills, ...suggestedSoftSkills, ...suggestedTools];
  };
  
  const suggestedSkills = suggestSkillsFromJob();
  
  const addSuggestedSkill = (skill: Skill) => {
    setSkills([...skills, skill]);
  };

  // Group skills by type for display
  const hardSkills = skills.filter(skill => skill.type === 'hard');
  const softSkills = skills.filter(skill => skill.type === 'soft');
  const toolSkills = skills.filter(skill => skill.type === 'tool');
  
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Skills</h3>
      
      <div className="mb-6">
        <div className="flex mb-4">
          <div className="flex-grow mr-2">
            <input
              type="text"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a skill..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="mr-2">
            <select
              value={skillType}
              onChange={(e) => setSkillType(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="hard">Technical Skill</option>
              <option value="soft">Soft Skill</option>
              <option value="tool">Tool/Technology</option>
            </select>
          </div>
          
          <button
            type="button"
            onClick={handleAddSkill}
            disabled={skillName.trim() === ''}
            className={`
              px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
              ${skillName.trim() === '' 
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                : 'bg-primary-600 text-white border-transparent hover:bg-primary-700'}
            `}
          >
            Add
          </button>
        </div>
        
        {suggestedSkills.length > 0 && (
          <div className="mb-2">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Suggested skills from job description:
            </h4>
            <div className="flex flex-wrap gap-2">
              {suggestedSkills.slice(0, 10).map((skill, index) => (
                <button
                  key={index}
                  onClick={() => addSuggestedSkill(skill)}
                  className={`
                    px-3 py-1 rounded-full text-sm flex items-center
                    ${skill.type === 'hard' ? 'bg-primary-50 text-primary-700' : 
                      skill.type === 'soft' ? 'bg-secondary-50 text-secondary-700' : 
                      'bg-accent-50 text-accent-700'}
                    hover:bg-opacity-80 transition-colors
                  `}
                >
                  <PlusCircle className="h-3 w-3 mr-1" />
                  {skill.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {hardSkills.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Technical Skills</h4>
            <div className="flex flex-wrap gap-2">
              {hardSkills.map((skill, index) => (
                <SkillTag
                  key={index}
                  name={skill.name}
                  type={skill.type}
                  onRemove={() => handleRemoveSkill(skills.findIndex(s => s.name === skill.name))}
                />
              ))}
            </div>
          </div>
        )}
        
        {softSkills.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Soft Skills</h4>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill, index) => (
                <SkillTag
                  key={index}
                  name={skill.name}
                  type={skill.type}
                  onRemove={() => handleRemoveSkill(skills.findIndex(s => s.name === skill.name))}
                />
              ))}
            </div>
          </div>
        )}
        
        {toolSkills.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Tools & Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {toolSkills.map((skill, index) => (
                <SkillTag
                  key={index}
                  name={skill.name}
                  type={skill.type}
                  onRemove={() => handleRemoveSkill(skills.findIndex(s => s.name === skill.name))}
                />
              ))}
            </div>
          </div>
        )}
        
        {skills.length === 0 && (
          <p className="text-gray-500 text-sm py-2">No skills added yet.</p>
        )}
      </div>
    </div>
  );
};

export default SkillsForm;