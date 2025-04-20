import React from 'react';
import { ContactInfo } from '../../types';

interface ContactFormProps {
  contactInfo: ContactInfo;
  setContactInfo: (contact: ContactInfo) => void;
  summary: string;
  setSummary: (summary: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  contactInfo,
  setContactInfo,
  summary,
  setSummary
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'summary') {
      setSummary(value);
    } else {
      setContactInfo({
        ...contactInfo,
        [name]: value
      });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={contactInfo.name}
            onChange={handleChange}
            placeholder="e.g., John Smith"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={contactInfo.email}
            onChange={handleChange}
            placeholder="e.g., john.smith@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number*
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={contactInfo.phone}
            onChange={handleChange}
            placeholder="e.g., (555) 123-4567"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location*
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={contactInfo.location}
            onChange={handleChange}
            placeholder="e.g., New York, NY"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn (Optional)
          </label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            value={contactInfo.linkedin || ''}
            onChange={handleChange}
            placeholder="e.g., linkedin.com/in/johnsmith"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
            Website (Optional)
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={contactInfo.website || ''}
            onChange={handleChange}
            placeholder="e.g., johnsmith.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Professional Summary</h3>
        <div>
          <p className="text-sm text-gray-500 mb-2">
            Write a brief summary highlighting your professional background, key skills, and career goals.
          </p>
          <textarea
            id="summary"
            name="summary"
            value={summary}
            onChange={handleChange}
            placeholder="Experienced software engineer with 5+ years of experience specializing in web development and cloud technologies..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent h-40"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;