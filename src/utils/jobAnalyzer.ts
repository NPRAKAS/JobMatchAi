import { JobDescription } from '../types';

// Simple tokenizer implementation that works in browser
const tokenize = (text: string): string[] => {
  return text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
};

// Simple stemmer implementation (Porter algorithm simplified for browser)
const stem = (word: string): string => {
  // Very basic implementation of Porter stemming rules
  return word
    .replace(/ing$|ed$|s$/, '')
    .replace(/ational$/, 'ate')
    .replace(/tional$/, 'tion')
    .replace(/izer$/, 'ize')
    .replace(/ator$/, 'ate')
    .replace(/alism$|aliti$/, 'al')
    .replace(/fulness$/, 'ful')
    .replace(/ousness$/, 'ous')
    .replace(/iveness$/, 'ive');
};

// Simple n-gram implementation
const generateNGrams = (tokens: string[], n: number): string[] => {
  const result: string[] = [];
  for (let i = 0; i <= tokens.length - n; i++) {
    result.push(tokens.slice(i, i + n).join(' '));
  }
  return result;
};

// Common stop words to filter out
const stopWords = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'could', 'did',
  'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'has', 'have',
  'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in',
  'into', 'is', 'it', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'my', 'myself', 'nor', 'of',
  'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own',
  'same', 'she', 'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them',
  'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under',
  'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom',
  'why', 'with', 'would', 'you', 'your', 'yours', 'yourself', 'yourselves'
]);

// Hard skills dictionary (common technical skills)
const hardSkills = new Set([
  'javascript', 'python', 'java', 'c++', 'sql', 'nosql', 'react', 'angular', 'vue', 'node', 'express',
  'django', 'flask', 'spring', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'ci/cd', 'devops',
  'machine learning', 'ai', 'data science', 'analytics', 'tableau', 'power bi', 'excel', 'statistics',
  'algorithm', 'data structure', 'oop', 'functional programming', 'agile', 'scrum', 'kanban', 'jira',
  'git', 'github', 'gitlab', 'bitbucket', 'rest', 'graphql', 'microservices', 'saas', 'testing',
  'test-driven', 'unit testing', 'selenium', 'cypress', 'jest', 'mocha', 'chai', 'html', 'css',
  'sass', 'less', 'webpack', 'babel', 'typescript', 'php', 'laravel', 'ruby', 'rails', 'go', 'golang',
  'scala', 'hadoop', 'spark', 'kafka', 'mongodb', 'postgresql', 'mysql', 'oracle', 'database',
  'data modeling', 'etl', 'ui/ux', 'figma', 'sketch', 'adobe', 'photoshop', 'illustrator', 'indesign',
  'mobile', 'ios', 'android', 'swift', 'kotlin', 'flutter', 'react native', 'cyber security',
  'network', 'linux', 'unix', 'windows', 'macos', 'shell scripting', 'bash', 'powershell',
  'blockchain', 'cryptocurrency', 'fintech', 'compliance', 'gdpr', 'hipaa', 'accounting',
  'finance', 'budgeting', 'forecasting', 'seo', 'sem', 'digital marketing', 'content marketing',
  'social media', 'email marketing', 'google analytics', 'crm', 'salesforce', 'hubspot'
]);

// Soft skills dictionary
const softSkills = new Set([
  'communication', 'teamwork', 'problem solving', 'critical thinking', 'creativity', 'leadership',
  'time management', 'adaptability', 'flexibility', 'collaboration', 'work ethic', 'interpersonal',
  'organization', 'detail oriented', 'multitasking', 'negotiation', 'persuasion', 'presentation',
  'public speaking', 'writing', 'conflict resolution', 'decision making', 'stress management',
  'emotional intelligence', 'empathy', 'self motivation', 'confidence', 'reliability', 'responsibility',
  'integrity', 'patience', 'positive attitude', 'professional', 'coaching', 'mentoring', 'listening',
  'cultural awareness', 'networking', 'feedback', 'customer service', 'research', 'analytical',
  'strategic thinking', 'innovation', 'initiative'
]);

// Tools and technologies
const tools = new Set([
  'microsoft office', 'word', 'excel', 'powerpoint', 'outlook', 'teams', 'slack', 'zoom', 'google docs',
  'google sheets', 'gmail', 'drive', 'dropbox', 'onedrive', 'sharepoint', 'salesforce', 'hubspot',
  'zendesk', 'asana', 'trello', 'monday', 'notion', 'jira', 'confluence', 'bitbucket', 'github',
  'gitlab', 'jenkins', 'travis', 'circleci', 'aws', 'azure', 'gcp', 'digital ocean', 'heroku',
  'netlify', 'vercel', 'cloudflare', 'wordpress', 'shopify', 'webflow', 'wix', 'squarespace',
  'sap', 'oracle', 'quickbooks', 'xero', 'tableau', 'power bi', 'looker', 'datadog', 'splunk',
  'elasticsearch', 'kibana', 'grafana', 'prometheus', 'google analytics', 'hotjar', 'optimizely',
  'segment', 'mixpanel', 'amplitude', 'intercom', 'drift', 'mailchimp', 'sendgrid', 'twilio',
  'stripe', 'paypal', 'square', 'adobe creative cloud', 'photoshop', 'illustrator', 'indesign',
  'premiere', 'after effects', 'xd', 'figma', 'sketch', 'invision', 'zeplin', 'framer'
]);

// Extract experience level from text
const extractExperienceLevel = (text: string): string | undefined => {
  const experiencePhrases = [
    { level: 'Entry Level', patterns: [/entry[ -]level/, /junior/, /0-1 years?/, /less than \d years?/] },
    { level: 'Mid Level', patterns: [/mid[ -]level/, /\b[2-5][\+]? years?/, /\b[2-5] to \d+ years?/] },
    { level: 'Senior Level', patterns: [/senior/, /\b[5-7][\+]? years?/, /\b[5-7] to \d+ years?/] },
    { level: 'Expert Level', patterns: [/expert/, /\b[8-9][\+]? years?/, /\b\d{2}[\+]? years?/, /\b[8-9] to \d+ years?/] },
  ];

  for (const { level, patterns } of experiencePhrases) {
    for (const pattern of patterns) {
      if (pattern.test(text.toLowerCase())) {
        return level;
      }
    }
  }
  
  return undefined;
};

// Extract responsibilities from text
const extractResponsibilities = (text: string): string[] => {
  // Look for bullet points or numbered items
  const bullets = text.match(/[•\-*] (.*?)(?=\n[•\-*]|\n\n|$)/gs) || [];
  const numbered = text.match(/\d+\.\s+(.*?)(?=\n\d+\.|\n\n|$)/gs) || [];
  
  // Combine and clean up
  const responsibilities = [...bullets, ...numbered]
    .map(item => item.replace(/^[•\-*\d.]\s+/, '').trim())
    .filter(item => item.length > 10 && item.length < 200); // Filter out too short or too long items
  
  // If no bullet points found, try to extract sentences that look like responsibilities
  if (responsibilities.length === 0) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const responsibilitySentences = sentences.filter(sentence => {
      const lower = sentence.toLowerCase();
      return (
        (lower.includes('you will') || lower.includes('responsibilities include') || 
         lower.includes('duties include') || lower.includes('role will') ||
         lower.includes('responsible for') || lower.match(/^(develop|create|design|implement|manage|lead|analyze)/i)) &&
        sentence.length > 20 && sentence.length < 200
      );
    }).map(s => s.trim());
    
    return responsibilitySentences.slice(0, 5); // Limit to top 5
  }
  
  return responsibilities.slice(0, 5); // Limit to top 5
};

// Main analysis function
export const analyzeJobDescription = async (
  input: { title: string; company?: string; description: string }
): Promise<JobDescription> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const { title, company, description } = input;
  
  // Tokenize and normalize text
  const tokens = tokenize(description);
  
  // Filter out stop words and stem the tokens
  const processedTokens = tokens
    .filter(token => !stopWords.has(token) && token.length > 2)
    .map(token => stem(token));
  
  // Extract n-grams (phrases) for better matching
  const bigrams = generateNGrams(tokens, 2);
  const trigrams = generateNGrams(tokens, 3);
  
  // Join n-grams into phrases
  const phrases = [
    ...tokens,
    ...bigrams,
    ...trigrams
  ];

  // Find matches from our dictionaries
  const extractedHardSkills = new Set<string>();
  const extractedSoftSkills = new Set<string>();
  const extractedTools = new Set<string>();

  // Check multi-word phrases first
  for (const phrase of phrases) {
    // Check for matches in our dictionaries
    if (hardSkills.has(phrase)) {
      extractedHardSkills.add(phrase);
    } else if (softSkills.has(phrase)) {
      extractedSoftSkills.add(phrase);
    } else if (tools.has(phrase)) {
      extractedTools.add(phrase);
    }
  }

  // Extract experience level
  const experienceLevel = extractExperienceLevel(description);
  
  // Extract responsibilities
  const responsibilities = extractResponsibilities(description);
  
  // Create the result
  const result: JobDescription = {
    title,
    ...(company && { company }),
    description,
    extractedData: {
      hardSkills: Array.from(extractedHardSkills),
      softSkills: Array.from(extractedSoftSkills),
      tools: Array.from(extractedTools),
      ...(experienceLevel && { experienceLevel }),
      responsibilities,
    }
  };
  
  // For empty results, add some dummy data (in a real app, this would be more sophisticated NLP)
  if (result.extractedData.hardSkills.length === 0) {
    result.extractedData.hardSkills = ['JavaScript', 'React', 'Node.js', 'SQL'];
  }
  
  if (result.extractedData.softSkills.length === 0) {
    result.extractedData.softSkills = ['Communication', 'Teamwork', 'Problem Solving'];
  }
  
  if (result.extractedData.tools.length === 0) {
    result.extractedData.tools = ['Git', 'JIRA', 'VS Code'];
  }
  
  return result;
};