import React, { useState } from 'react';
import { Experience } from '../../types';
import { PlusCircle, Trash, Edit } from 'lucide-react';

interface ExperienceFormProps {
  experiences: Experience[];
  setExperiences: (experiences: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ experiences, setExperiences }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<Experience>({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ['']
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedDesc = [...formData.description];
    updatedDesc[index] = value;
    setFormData({ ...formData, description: updatedDesc });
  };

  const addDescriptionField = () => {
    setFormData({ ...formData, description: [...formData.description, ''] });
  };

  const removeDescriptionField = (index: number) => {
    const updatedDesc = formData.description.filter((_, i) => i !== index);
    setFormData({ ...formData, description: updatedDesc });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty description items
    const cleanedData = {
      ...formData,
      description: formData.description.filter(desc => desc.trim() !== '')
    };
    
    if (isEditing !== null) {
      const updatedExperiences = [...experiences];
      updatedExperiences[isEditing] = cleanedData;
      setExperiences(updatedExperiences);
      setIsEditing(null);
    } else {
      setExperiences([...experiences, cleanedData]);
    }
    
    resetForm();
  };

  const handleEdit = (index: number) => {
    setIsEditing(index);
    setIsAdding(true);
    setFormData(experiences[index]);
  };

  const handleDelete = (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ['']
    });
    setIsAdding(false);
  };

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Work Experience</h3>

      {!isAdding ? (
        <div className="space-y-4">
          {experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <div key={index} className="bg-gray-50 rounded-md p-4 border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{exp.title}</h4>
                    <p className="text-gray-600 text-sm">
                      {exp.company}{exp.location ? ` • ${exp.location}` : ''}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {new Date(exp.startDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short' 
                      })} - {
                        exp.current 
                          ? 'Present' 
                          : new Date(exp.endDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short' 
                            })
                      }
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-primary-600 hover:text-primary-800"
                      aria-label="Edit experience"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Delete experience"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-2">
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm py-2">No work experience added yet.</p>
          )}

          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Experience
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Job Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Software Engineer"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company*
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g., Google"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Mountain View, CA"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date*
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={formData.current}
                required={!formData.current}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="current"
              name="current"
              checked={formData.current}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="current" className="ml-2 block text-sm text-gray-700">
              I currently work here
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description / Achievements*
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Describe your responsibilities and achievements. Use bullet points that start with action verbs.
            </p>
            
            {formData.description.map((desc, index) => (
              <div key={index} className="flex items-start mb-2">
                <textarea
                  value={desc}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  placeholder="e.g., Developed and maintained web applications using React and Node.js"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={2}
                />
                <button
                  type="button"
                  onClick={() => removeDescriptionField(index)}
                  className="ml-2 text-red-600 hover:text-red-800 mt-2"
                  disabled={formData.description.length <= 1}
                  aria-label="Remove description"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addDescriptionField}
              className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <PlusCircle className="h-3 w-3 mr-1" />
              Add Bullet Point
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
              {isEditing !== null ? 'Update' : 'Add'} Experience
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ExperienceForm;