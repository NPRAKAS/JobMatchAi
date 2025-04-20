import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Upload, Briefcase, AlignLeft } from 'lucide-react';
import { analyzeJobDescription } from '../utils/jobAnalyzer';
import { JobDescription } from '../types';
import { useAppContext } from '../context/AppContext';
import SkillTag from '../components/ui/SkillTag';

const AnalyzeJobPage: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobText, setJobText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [analyzedJob, setAnalyzedJob] = useState<JobDescription | null>(null);
  
  const { setJobDescription, setActiveStep } = useAppContext();
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!jobTitle.trim() || !jobText.trim()) {
      setErrorMessage('Please enter both job title and description');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage('');

    try {
      // In a real application, this would be an API call to a backend service
      const result = await analyzeJobDescription({
        title: jobTitle,
        company: company,
        description: jobText,
      });

      setAnalyzedJob(result);
      setJobDescription(result);
      setActiveStep(0);
      setAnalyzed(true);
      setIsAnalyzing(false);
    } catch (error) {
      setErrorMessage('Error analyzing job description. Please try again.');
      setIsAnalyzing(false);
    }
  };

  const handleContinue = () => {
    if (analyzedJob) {
      setJobDescription(analyzedJob);
      setActiveStep(1);
      navigate('/build');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setJobText(event.target.result.toString());
      }
    };
    reader.readAsText(file);
  };

  const renderSkillTags = (skills: string[], type: 'hard' | 'soft' | 'tool') => {
    return skills.map((skill, index) => (
      <SkillTag key={index} name={skill} type={type} />
    ));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Step 1: Analyze Job Description</h1>
        <p className="text-gray-600">
          Paste a job description to extract key skills and requirements that will help optimize your resume.
        </p>
      </div>

      {!analyzed ? (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Job Title*
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Software Engineer, Product Manager"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company (Optional)
            </label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Google, Microsoft"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Job Description*
            </label>
            <div className="flex justify-end mb-1">
              <label className="inline-flex items-center text-primary-600 hover:text-primary-700 cursor-pointer">
                <Upload className="h-4 w-4 mr-1" />
                <span className="text-sm">Upload File</span>
                <input
                  type="file"
                  accept=".txt,.pdf,.docx,.doc"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            <textarea
              id="jobDescription"
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder="Paste the full job description here..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent h-64"
              required
            />
          </div>

          {errorMessage && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {errorMessage}
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Job Description'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-primary-100 text-primary-600 p-2 rounded">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {analyzedJob?.title} {analyzedJob?.company ? `at ${analyzedJob.company}` : ''}
                </h2>
                <div className="text-sm text-gray-500 mt-1">
                  Analysis complete
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-lg font-medium mb-4">Required Skills</h3>
              
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Technical Skills</div>
                <div className="flex flex-wrap gap-2">
                  {renderSkillTags(analyzedJob?.extractedData.hardSkills || [], 'hard')}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Soft Skills</div>
                <div className="flex flex-wrap gap-2">
                  {renderSkillTags(analyzedJob?.extractedData.softSkills || [], 'soft')}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Tools & Technologies</div>
                <div className="flex flex-wrap gap-2">
                  {renderSkillTags(analyzedJob?.extractedData.tools || [], 'tool')}
                </div>
              </div>
            </div>

            {analyzedJob?.extractedData.experienceLevel && (
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Experience Level</div>
                <div className="bg-gray-100 p-2 rounded inline-block">
                  {analyzedJob.extractedData.experienceLevel}
                </div>
              </div>
            )}

            {analyzedJob?.extractedData.responsibilities && analyzedJob.extractedData.responsibilities.length > 0 && (
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="flex items-start gap-2">
                  <AlignLeft className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Key Responsibilities</div>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {analyzedJob.extractedData.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
            >
              Continue to Resume Builder
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzeJobPage;