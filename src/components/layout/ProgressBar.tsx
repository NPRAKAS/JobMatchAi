import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, FileEdit, CheckCircle } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
}

const steps = [
  { 
    id: 0, 
    name: 'Analyze Job', 
    icon: FileText, 
    path: '/analyze' 
  },
  { 
    id: 1, 
    name: 'Build Resume', 
    icon: FileEdit, 
    path: '/build' 
  },
  { 
    id: 2, 
    name: 'Optimize & Export', 
    icon: CheckCircle, 
    path: '/optimize' 
  },
];

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = currentStep >= step.id;
            const isCurrent = currentStep === step.id;
            
            // Calculate connector line styles
            const hasNextStep = index < steps.length - 1;
            
            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => navigate(step.path)}
                  className={`flex flex-col items-center space-y-2 ${
                    isActive ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                  }`}
                  disabled={!isActive}
                >
                  <div 
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${isCurrent ? 'bg-primary-600 text-white' : isActive ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-400'}
                      transition-all duration-300 ease-in-out
                    `}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <span 
                    className={`
                      text-sm font-medium hidden md:block
                      ${isCurrent ? 'text-primary-600' : isActive ? 'text-gray-700' : 'text-gray-400'}
                    `}
                  >
                    {step.name}
                  </span>
                  <span 
                    className={`
                      text-xs font-medium md:hidden
                      ${isCurrent ? 'text-primary-600' : isActive ? 'text-gray-700' : 'text-gray-400'}
                    `}
                  >
                    Step {index + 1}
                  </span>
                </button>
                
                {/* Connector Line */}
                {hasNextStep && (
                  <div className="flex-1 mx-2 md:mx-4 h-0.5 relative">
                    <div 
                      className="absolute inset-0 bg-gray-200"
                    ></div>
                    <div 
                      className={`
                        absolute inset-0 bg-primary-500 transition-all duration-500 ease-in-out
                        ${currentStep > index ? 'w-full' : 'w-0'}
                      `}
                    ></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;