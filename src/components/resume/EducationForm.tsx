import React, { useState } from 'react';
import { Education } from '../../types';
import { PlusCircle, Trash, Edit } from 'lucide-react';

interface EducationFormProps {
  education: Education[];
  setEducation: (education: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ education, setEducation }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<Education>({
    institution: '',
    degree: '',
    field: '',
    graduationDate: '',
    gpa: '',
    achievements: ['']
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAchievementChange = (index: number, value: string) => {
    const updatedAchievements = [...(formData.achievements || [])];
    updatedAchievements[index] = value;
    setFormData({ ...formData, achievements: updatedAchievements });
  };

  const addAchievementField = () => {
    setFormData({ 
      ...formData, 
      achievements: [...(formData.achievements || []), ''] 
    });
  };

  const removeAchievementField = (index: number) => {
    const updatedAchievements = (formData.achievements || []).filter((_, i) => i !== index);
    setFormData({ ...formData, achievements: updatedAchievements });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean up the form data
    const cleanedData = {
      ...formData,
      achievements: formData.achievements?.filter(achievement => achievement.trim() !== '') || []
    };
    
    if (isEditing !== null) {
      const updatedEducation = [...education];
      updatedEducation[isEditing] = cleanedData;
      setEducation(updatedEducation);
      setIsEditing(null);
    } else {
      setEducation([...education, cleanedData]);
    }
    
    resetForm();
  };

  const handleEdit = (index: number) => {
    setIsEditing(index);
    setIsAdding(true);
    setFormData(education[index]);
  };

  const handleDelete = (index: number) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
  };

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      field: '',
      graduationDate: '',
      gpa: '',
      achievements: ['']
    });
    setIsAdding(false);
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Education</h3>

      {!isAdding ? (
        <div className="space-y-4">
          {education.length > 0 ? (
            education.map((edu, index) => (
              <div key={index} className="bg-gray-50 rounded-md p-4 border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{edu.degree} in {edu.field}</h4>
                    <p className="text-gray-600 text-sm">{edu.institution}</p>
                    <p className="text-gray-500 text-xs">
                      Graduated: {new Date(edu.graduationDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short' 
                      })}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-primary-600 hover:text-primary-800"
                      aria-label="Edit education"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Delete education"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="mt-2">
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm py-2">No education added yet.</p>
          )}

          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Education
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
              Institution*
            </label>
            <input
              type="text"
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              placeholder="e.g., Stanford University"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
              Degree*
            </label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              placeholder="e.g., Bachelor of Science"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
              Field of Study*
            </label>
            <input
              type="text"
              id="field"
              name="field"
              value={formData.field}
              onChange={handleChange}
              placeholder="e.g., Computer Science"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="graduationDate" className="block text-sm font-medium text-gray-700 mb-1">
                Graduation Date*
              </label>
              <input
                type="date"
                id="graduationDate"
                name="graduationDate"
                value={formData.graduationDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="gpa" className="block text-sm font-medium text-gray-700 mb-1">
                GPA (Optional)
              </label>
              <input
                type="text"
                id="gpa"
                name="gpa"
                value={formData.gpa || ''}
                onChange={handleChange}
                placeholder="e.g., 3.8/4.0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Achievements / Activities (Optional)
            </label>
            <p className="text-xs text-gray-500 mb-2">
              List relevant coursework, honors, activities, or projects.
            </p>
            
            {(formData.achievements || []).map((achievement, index) => (
              <div key={index} className="flex items-start mb-2">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => handleAchievementChange(index, e.target.value)}
                  placeholder="e.g., Dean's List, Senior Thesis, Student Government"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => removeAchievementField(index)}
                  className="ml-2 text-red-600 hover:text-red-800 mt-2"
                  aria-label="Remove achievement"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addAchievementField}
              className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <PlusCircle className="h-3 w-3 mr-1" />
              Add Achievement
            </button>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {isEditing !== null ? 'Update' : 'Add'} Education
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EducationForm;