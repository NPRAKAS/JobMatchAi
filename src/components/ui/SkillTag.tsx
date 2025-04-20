import React from 'react';
import { Skill } from '../../types';

interface SkillTagProps {
  name: string;
  type: 'hard' | 'soft' | 'tool';
  matched?: boolean;
  onRemove?: () => void;
}

const SkillTag: React.FC<SkillTagProps> = ({ name, type, matched, onRemove }) => {
  const getBgColor = () => {
    if (matched === true) return 'bg-green-100 text-green-800';
    if (matched === false) return 'bg-red-100 text-red-800';
    
    switch (type) {
      case 'hard':
        return 'bg-primary-100 text-primary-800';
      case 'soft':
        return 'bg-secondary-100 text-secondary-800';
      case 'tool':
        return 'bg-accent-100 text-accent-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`px-3 py-1 rounded-full text-sm ${getBgColor()} flex items-center`}>
      <span>{name}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={`Remove ${name}`}
        >
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SkillTag;