export interface Skill {
  name: string;
  type: 'hard' | 'soft' | 'tool';
  matched?: boolean;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: string;
  achievements?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  expiration?: string;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  website?: string;
  location: string;
}

export interface Resume {
  id?: string;
  contactInfo: ContactInfo;
  summary?: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  additionalSections?: {
    [key: string]: string[];
  };
}

export interface JobDescription {
  id?: string;
  title: string;
  company?: string;
  location?: string;
  description: string;
  extractedData: {
    hardSkills: string[];
    softSkills: string[];
    tools: string[];
    experienceLevel?: string;
    education?: string;
    responsibilities?: string[];
  };
}

export interface Suggestion {
  type: 'add' | 'improve' | 'remove' | 'reorder';
  category: 'skill' | 'experience' | 'education' | 'certification' | 'summary' | 'general';
  text: string;
  priority: 'high' | 'medium' | 'low';
}

export interface MatchResult {
  overallScore: number;
  categoryScores: {
    skills: number;
    experience: number;
    education: number;
    certifications: number;
  };
  suggestions: Suggestion[];
  matchedSkills: string[];
  missingSkills: string[];
  keywordDensity: {
    [key: string]: number;
  };
}

export enum TemplateType {
  MODERN = 'modern',
  CLASSIC = 'classic',
  MINIMAL = 'minimal',
}

export type ResumeTemplate = {
  id: TemplateType;
  name: string;
  description: string;
  preview: string;
};