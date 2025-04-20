import { Resume, JobDescription, MatchResult, Suggestion } from '../types';

export const optimizeResume = async (
  resume: Resume,
  jobDescription: JobDescription
): Promise<MatchResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Extract data from resume and job description
  const resumeSkills = resume.skills.map(skill => skill.name.toLowerCase());
  const jobSkills = [
    ...jobDescription.extractedData.hardSkills,
    ...jobDescription.extractedData.softSkills,
    ...jobDescription.extractedData.tools
  ].map(skill => skill.toLowerCase());
  
  // Find matched and missing skills
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];
  
  // Check each job skill to see if it's in the resume
  for (const skill of jobSkills) {
    if (resumeSkills.some(s => 
      s === skill || 
      s.includes(skill) || 
      skill.includes(s))
    ) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  }
  
  // Calculate skill match percentage
  const skillScore = jobSkills.length > 0 
    ? Math.round((matchedSkills.length / jobSkills.length) * 100) 
    : 100;
  
  // Experience scoring
  let experienceScore = 70; // Default score
  if (resume.experience.length > 0) {
    // Check if experience titles or descriptions contain relevant keywords
    let relevantExperienceCount = 0;
    
    for (const exp of resume.experience) {
      const expText = `${exp.title} ${exp.company} ${exp.description.join(' ')}`.toLowerCase();
      
      // Check if experience mentions any job skills
      if (jobSkills.some(skill => expText.includes(skill))) {
        relevantExperienceCount++;
      }
      
      // Check if title is similar to job title
      if (exp.title.toLowerCase().includes(jobDescription.title.toLowerCase()) || 
          jobDescription.title.toLowerCase().includes(exp.title.toLowerCase())) {
        experienceScore += 10;
      }
    }
    
    // Adjust score based on relevant experience
    if (relevantExperienceCount > 0) {
      experienceScore = Math.min(100, experienceScore + (relevantExperienceCount * 10));
    }
  } else {
    experienceScore = 0;
  }
  
  // Education scoring
  let educationScore = 70; // Default score
  if (resume.education.length > 0) {
    // Check if education field matches job title
    for (const edu of resume.education) {
      const fieldText = edu.field.toLowerCase();
      
      // Check if field is relevant to job title
      if (jobDescription.title.toLowerCase().includes(fieldText) || 
          fieldText.includes(jobDescription.title.toLowerCase())) {
        educationScore += 20;
      }
    }
  } else {
    educationScore = 0;
  }
  
  // Certifications scoring
  let certificationScore = 60; // Default score
  if (resume.certifications.length > 0) {
    // Check if certifications relate to job skills
    let relevantCertCount = 0;
    
    for (const cert of resume.certifications) {
      const certText = `${cert.name} ${cert.issuer}`.toLowerCase();
      
      // Check if certification mentions any job skills
      if (jobSkills.some(skill => certText.includes(skill))) {
        relevantCertCount++;
      }
    }
    
    // Adjust score based on relevant certifications
    if (relevantCertCount > 0) {
      certificationScore = Math.min(100, certificationScore + (relevantCertCount * 15));
    }
  } else {
    certificationScore = 50; // Not critical but somewhat important
  }
  
  // Overall score calculation (weighted average)
  const overallScore = Math.round(
    (skillScore * 0.4) + 
    (experienceScore * 0.35) + 
    (educationScore * 0.15) + 
    (certificationScore * 0.1)
  );
  
  // Generate suggestions
  const suggestions: Suggestion[] = [];
  
  // Skill suggestions
  if (missingSkills.length > 0) {
    for (const skill of missingSkills.slice(0, 3)) {
      suggestions.push({
        type: 'add',
        category: 'skill',
        text: `Add "${skill}" to your skills section as it's mentioned in the job description.`,
        priority: 'high'
      });
    }
  }
  
  // Experience suggestions
  if (resume.experience.length > 0) {
    const allDescriptions = resume.experience.flatMap(exp => exp.description);
    
    // Check if descriptions use action verbs
    if (!allDescriptions.some(desc => 
      /^(Developed|Created|Implemented|Managed|Led|Designed|Built|Achieved)/i.test(desc)
    )) {
      suggestions.push({
        type: 'improve',
        category: 'experience',
        text: 'Start your experience bullet points with strong action verbs (e.g., "Developed," "Implemented," "Managed").', 
        priority: 'medium'
      });
    }
    
    // Check if descriptions include measurable achievements
    if (!allDescriptions.some(desc => 
      /increased|decreased|reduced|improved|achieved|saved|grew|generated/i.test(desc) &&
      /\d+%|\d+ percent|\$\d+|\d+ hours/i.test(desc)
    )) {
      suggestions.push({
        type: 'improve',
        category: 'experience',
        text: 'Include measurable achievements with percentages or numbers in your experience.',
        priority: 'medium'
      });
    }
  } else {
    suggestions.push({
      type: 'add',
      category: 'experience',
      text: 'Add relevant work experience to your resume.',
      priority: 'high'
    });
  }
  
  // Summary suggestions
  if (!resume.summary || resume.summary.length < 50) {
    suggestions.push({
      type: 'add',
      category: 'summary',
      text: 'Add a professional summary that highlights your relevant skills and experience for this role.',
      priority: 'medium'
    });
  } else if (!jobSkills.some(skill => resume.summary?.toLowerCase().includes(skill))) {
    suggestions.push({
      type: 'improve',
      category: 'summary',
      text: 'Customize your professional summary to include keywords from the job description.',
      priority: 'medium'
    });
  }
  
  // Education suggestions
  if (resume.education.length === 0) {
    suggestions.push({
      type: 'add',
      category: 'education',
      text: 'Add your educational background to your resume.',
      priority: 'medium'
    });
  }
  
  // General formatting suggestions
  suggestions.push({
    type: 'improve',
    category: 'general',
    text: 'Make sure your resume is using a clean, ATS-friendly format with standard headings and fonts.',
    priority: 'low'
  });
  
  // Create a simple keyword frequency analysis
  const keywordDensity: Record<string, number> = {};
  for (const skill of jobSkills) {
    // Count occurrences in resume text
    const resumeText = JSON.stringify(resume).toLowerCase();
    const regex = new RegExp(skill, 'gi');
    const matches = resumeText.match(regex);
    keywordDensity[skill] = matches ? matches.length : 0;
  }
  
  // Return match result
  return {
    overallScore,
    categoryScores: {
      skills: skillScore,
      experience: experienceScore,
      education: educationScore,
      certifications: certificationScore
    },
    matchedSkills,
    missingSkills,
    suggestions,
    keywordDensity
  };
};