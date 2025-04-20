import React, { useState } from 'react';
import { Certification } from '../../types';
import { PlusCircle, Trash, Edit } from 'lucide-react';

interface CertificationsFormProps {
  certifications: Certification[];
  setCertifications: (certifications: Certification[]) => void;
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({ 
  certifications, 
  setCertifications 
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<Certification>({
    name: '',
    issuer: '',
    date: '',
    expiration: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing !== null) {
      const updatedCertifications = [...certifications];
      updatedCertifications[isEditing] = formData;
      setCertifications(updatedCertifications);
      setIsEditing(null);
    } else {
      setCertifications([...certifications, formData]);
    }
    
    resetForm();
  };

  const handleEdit = (index: number) => {
    setIsEditing(index);
    setIsAdding(true);
    setFormData(certifications[index]);
  };

  const handleDelete = (index: number) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      issuer: '',
      date: '',
      expiration: ''
    });
    setIsAdding(false);
  };

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

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Certifications & Licenses</h3>

      {!isAdding ? (
        <div className="space-y-4">
          {certifications.length > 0 ? (
            certifications.map((cert, index) => (
              <div key={index} className="bg-gray-50 rounded-md p-4 border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{cert.name}</h4>
                    <p className="text-gray-600 text-sm">
                      {cert.issuer}
                    </p>
                    <p className="text-gray-500 text-xs">
                      Issued: {formatDate(cert.date)}
                      {cert.expiration && ` • Expires: ${formatDate(cert.expiration)}`}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-primary-600 hover:text-primary-800"
                      aria-label="Edit certification"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Delete certification"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm py-2">No certifications added yet.</p>
          )}

          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Certification
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Certification Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., AWS Certified Solutions Architect"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="issuer" className="block text-sm font-medium text-gray-700 mb-1">
              Issuing Organization*
            </label>
            <input
              type="text"
              id="issuer"
              name="issuer"
              value={formData.issuer}
              onChange={handleChange}
              placeholder="e.g., Amazon Web Services"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Issue Date*
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="expiration" className="block text-sm font-medium text-gray-700 mb-1">
                Expiration Date (Optional)
              </label>
              <input
                type="date"
                id="expiration"
                name="expiration"
                value={formData.expiration || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
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
              {isEditing !== null ? 'Update' : 'Add'} Certification
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CertificationsForm;