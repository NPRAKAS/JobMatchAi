import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, FileEdit, CheckCircle, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/analyze');
  };

  return (
    <div className="flex flex-col space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl shadow-sm">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Get Your Resume <span className="text-primary-600">ATS-Ready</span>
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
          JobMatch AI helps you optimize your resume for specific job descriptions. 
          Analyze requirements, build ATS-friendly resumes, and increase your chances of landing your dream job.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center mx-auto"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </section>

      {/* How It Works */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
            <div className="bg-primary-100 text-primary-600 p-4 rounded-full inline-flex items-center justify-center mb-6">
              <FileText className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Analyze Job Description</h3>
            <p className="text-gray-600">
              Paste a job description to extract key skills, requirements, and keywords that recruiters and ATS systems look for.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
            <div className="bg-primary-100 text-primary-600 p-4 rounded-full inline-flex items-center justify-center mb-6">
              <FileEdit className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Build Your Resume</h3>
            <p className="text-gray-600">
              Create an ATS-friendly resume using our professionally designed templates. Add your experience, education, and skills.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
            <div className="bg-primary-100 text-primary-600 p-4 rounded-full inline-flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Optimize & Export</h3>
            <p className="text-gray-600">
              Get a match score and personalized suggestions to improve your resume. Export your optimized resume as a PDF.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleGetStarted}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center mx-auto"
          >
            Try JobMatch AI
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white rounded-3xl shadow-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="bg-accent-100 text-accent-600 p-3 rounded-lg">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">NLP-Powered Analysis</h3>
                <p className="text-gray-600">
                  Our advanced algorithms extract keywords, skills, and requirements from job descriptions to ensure your resume matches what recruiters are looking for.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="bg-secondary-100 text-secondary-600 p-3 rounded-lg">
                  <FileEdit className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">ATS-Friendly Templates</h3>
                <p className="text-gray-600">
                  Professional resume templates designed to pass through Applicant Tracking Systems while maintaining a clean, modern look.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="bg-primary-100 text-primary-600 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Match Score & Suggestions</h3>
                <p className="text-gray-600">
                  Get a detailed breakdown of how well your resume matches the job and receive personalized suggestions for improvement.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="bg-success-100 text-success-600 p-3 rounded-lg">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Export & Download</h3>
                <p className="text-gray-600">
                  Download your optimized resume as a PDF that can be submitted to employers immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16 px-8 rounded-3xl text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Start optimizing your resume with JobMatch AI and increase your chances of getting interviews.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center mx-auto"
        >
          Get Started for Free
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </section>
    </div>
  );
};

export default HomePage;