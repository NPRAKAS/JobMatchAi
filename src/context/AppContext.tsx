import React, { createContext, useContext, useState } from 'react';
import { JobDescription, Resume, MatchResult } from '../types';

interface AppContextType {
  jobDescription: JobDescription | null;
  resume: Resume | null;
  matchResult: MatchResult | null;
  activeStep: number;
  setJobDescription: (job: JobDescription) => void;
  setResume: (resume: Resume) => void;
  setMatchResult: (result: MatchResult) => void;
  setActiveStep: (step: number) => void;
  resetData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobDescription, setJobDescription] = useState<JobDescription | null>(null);
  const [resume, setResume] = useState<Resume | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  const resetData = () => {
    setJobDescription(null);
    setResume(null);
    setMatchResult(null);
    setActiveStep(0);
  };

  return (
    <AppContext.Provider
      value={{
        jobDescription,
        resume,
        matchResult,
        activeStep,
        setJobDescription,
        setResume,
        setMatchResult,
        setActiveStep,
        resetData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};