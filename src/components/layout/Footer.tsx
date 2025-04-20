import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-primary-600 mb-4">
              <Briefcase className="h-6 w-6" />
              <span className="font-bold text-xl">JobMatch AI</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Helping job seekers optimize their resumes for specific job descriptions with AI-powered analysis.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/analyze" className="text-gray-600 hover:text-primary-600 text-sm">
                  Job Description Analyzer
                </Link>
              </li>
              <li>
                <Link to="/build" className="text-gray-600 hover:text-primary-600 text-sm">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/optimize" className="text-gray-600 hover:text-primary-600 text-sm">
                  Resume Optimizer
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                  Resume Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-600 text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary-600">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} JobMatch AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;