import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, CheckCircle, XCircle, RefreshCw, ArrowUpRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MatchResult, Suggestion } from '../types';
import { optimizeResume } from '../utils/resumeOptimizer';
import ResumePreview from '../components/resume/ResumePreview';
import SkillTag from '../components/ui/SkillTag';
import { exportToPdf } from '../utils/exportToPdf';

const OptimizePage: React.FC = () => {
  const { jobDescription, resume, matchResult: savedMatchResult, setMatchResult } = useAppContext();
  const navigate = useNavigate();
  
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [matchData, setMatchData] = useState<MatchResult | null>(savedMatchResult);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  useEffect(() => {
    if (!jobDescription || !resume) {
      navigate('/analyze');
      return;
    }

    if (!matchData && !savedMatchResult) {
      handleOptimize();
    }
  }, [jobDescription, resume, navigate, matchData, savedMatchResult]);

  const handleOptimize = async () => {
    if (!jobDescription || !resume) return;
    
    setIsOptimizing(true);
    
    try {
      // In a real app, this would be an API call
      const result = await optimizeResume(resume, jobDescription);
      setMatchData(result);
      setMatchResult(result);
    } catch (error) {
      console.error('Error optimizing resume:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleExport = async () => {
    if (!resume) return;
    
    setPdfGenerating(true);
    try {
      await exportToPdf(resume);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setPdfGenerating(false);
    }
  };

  const renderSuggestion = (suggestion: Suggestion, index: number) => {
    const priorityColors: Record<string, string> = {
      high: 'bg-red-50 border-red-200 text-red-700',
      medium: 'bg-yellow-50 border-yellow-200 text-yellow-700',
      low: 'bg-green-50 border-green-200 text-green-700',
    };
    
    const categoryIcons: Record<string, React.ReactNode> = {
      skill: <Award className="h-5 w-5" />,
      experience: <Briefcase className="h-5 w-5" />,
      education: <GraduationCap className="h-5 w-5" />,
      certification: <Award className="h-5 w-5" />,
      summary: <AlignLeft className="h-5 w-5" />,
      general: <Info className="h-5 w-5" />,
    };
    
    return (
      <div 
        key={index}
        className={`p-4 rounded-md border mb-3 ${priorityColors[suggestion.priority]}`}
      >
        <div className="flex">
          <div className="mr-3">
            {suggestion.type === 'add' ? (
              <PlusCircle className="h-5 w-5" />
            ) : suggestion.type === 'improve' ? (
              <RefreshCw className="h-5 w-5" />
            ) : suggestion.type === 'remove' ? (
              <XCircle className="h-5 w-5" />
            ) : (
              <ArrowUpRight className="h-5 w-5" />
            )}
          </div>
          <div>
            <div className="flex items-center text-sm font-medium mb-1">
              {categoryIcons[suggestion.category]}
              <span className="ml-1 capitalize">{suggestion.category}</span>
            </div>
            <p>{suggestion.text}</p>
          </div>
        </div>
      </div>
    );
  };

  if (!jobDescription || !resume) {
    return (
      <div className="text-center py-10">
        <div className="mb-4 text-gray-500">
          <XCircle className="h-12 w-12 mx-auto" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Missing Information
        </h2>
        <p className="text-gray-600 mb-6">
          Please complete the previous steps before optimizing your resume.
        </p>
        <button
          onClick={() => navigate('/analyze')}
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded"
        >
          Go to Step 1
        </button>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Step 3: Optimize & Export</h1>
        <p className="text-gray-600">
          Check how well your resume matches the job description and get suggestions for improvement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          {matchData ? (
            <>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Match Score</h2>
                
                <div className="mb-6 text-center">
                  <div className="inline-flex justify-center items-center w-32 h-32 rounded-full bg-primary-50 text-primary-600 mb-2">
                    <span className="text-4xl font-bold">{matchData.overallScore}%</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {matchData.overallScore >= 80
                      ? 'Excellent match! Your resume is well-optimized for this job.'
                      : matchData.overallScore >= 60
                      ? 'Good match. With a few changes, your resume can be even better.'
                      : 'Your resume needs improvement to match this job description.'}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Skills</span>
                      <span className="text-sm font-medium">{matchData.categoryScores.skills}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${matchData.categoryScores.skills}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Experience</span>
                      <span className="text-sm font-medium">{matchData.categoryScores.experience}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${matchData.categoryScores.experience}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Education</span>
                      <span className="text-sm font-medium">{matchData.categoryScores.education}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${matchData.categoryScores.education}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Certifications</span>
                      <span className="text-sm font-medium">{matchData.categoryScores.certifications}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${matchData.categoryScores.certifications}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Skills Analysis</h2>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Matched Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {matchData.matchedSkills.length > 0 ? (
                      matchData.matchedSkills.map((skill, index) => (
                        <div key={index} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {skill}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No matched skills found.</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Missing Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {matchData.missingSkills.length > 0 ? (
                      matchData.missingSkills.map((skill, index) => (
                        <div key={index} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm flex items-center">
                          <XCircle className="h-3 w-3 mr-1" />
                          {skill}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No missing skills found.</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Improvement Suggestions</h2>
                </div>
                
                <div className="space-y-2">
                  {matchData.suggestions.length > 0 ? (
                    matchData.suggestions.map((suggestion, index) => renderSuggestion(suggestion, index))
                  ) : (
                    <p className="text-gray-500">No suggestions at this time.</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Analyzing your resume...</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Optimized Resume</h2>
            <div className="h-[650px] overflow-y-auto shadow border rounded">
              <ResumePreview resume={resume} />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={handleOptimize}
              disabled={isOptimizing}
              className="bg-secondary-600 hover:bg-secondary-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              {isOptimizing ? 'Analyzing...' : 'Re-analyze Resume'}
            </button>
            
            <button
              onClick={handleExport}
              disabled={pdfGenerating}
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              <Download className="mr-2 h-5 w-5" />
              {pdfGenerating ? 'Generating PDF...' : 'Download PDF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import needed components
import { Award, Briefcase, GraduationCap, AlignLeft, Info, PlusCircle } from 'lucide-react';

export default OptimizePage;