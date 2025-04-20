import { Resume } from '../types';
import { useToPDF } from 'react-to-pdf';

export const exportToPdf = async (resume: Resume): Promise<void> => {
  // Simulate PDF generation delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real implementation, you'd use a PDF generation library here
  // For now, we'll just trigger a browser download with the resume data as JSON
  
  try {
    // Create a blob of the resume data (in a real app, this would be PDF content)
    const resumeJson = JSON.stringify(resume, null, 2);
    const blob = new Blob([resumeJson], { type: 'application/json' });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create an anchor element and click it to trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resume.contactInfo.name.replace(/\s+/g, '_')}_Resume.json`;
    a.click();
    
    // Clean up by revoking the blob URL
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};