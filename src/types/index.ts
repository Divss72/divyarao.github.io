export interface Project {
  id: string;
  slug: string;
  indexNumber: string;
  title: string;
  subtitle: string;
  category: string;
  type: string;
  description: string;
  problem: string;
  solution: string;
  myRole: string;
  architectureFlow: {
    steps: { step: string; detail: string }[];
  };
  techStack: string[];
  metrics: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
  keyFeatures: string[];
  challenges: string[];
  learnings: string[];
  result: string;
  githubUrl: string;
  liveUrl?: string;
  image: string;
  galleryImages: { url: string; caption: string }[];
  featured: boolean;
  status: 'PRODUCTION' | 'ONLINE' | 'ACTIVE' | 'ARCHIVED';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: 'AI & LLMs' | 'Distributed Systems' | 'Algorithms' | 'Web Engineering' | 'Life & Books';
  tags: string[];
  publishDate: string;
  readTime: string;
  isDraft: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogComment {
  id: string;
  blogSlug: string;
  authorName: string;
  authorEmail?: string;
  content: string;
  timestamp: string;
  status: 'approved' | 'pending';
}

export interface ResearchItem {
  id: string;
  slug: string;
  title: string;
  question: string;
  whyInterested: string;
  whatReading: string;
  whatTesting: string;
  whatFound: string;
  whatStillDontKnow: string;
  status: 'Exploring' | 'Reading Papers' | 'Prototyping' | 'Analyzing Results';
  tags: string[];
  references?: string;
  codeUrl?: string;
  currentStepIndex: number;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  cover?: string;
  rating: number;
  status: 'Reading' | 'Read' | 'Want to Read' | 'Revisiting';
  note: string;
  favoriteQuote?: string;
  genre: string;
  takeaway?: string;
}

export interface PaperItem {
  id: string;
  title: string;
  authors: string;
  year: number;
  link?: string;
  topic: string;
  whyReading: string;
  notes: string;
  status: 'Reading' | 'Read' | 'Want to Read' | 'Revisiting';
}

export interface MovieItem {
  id: string;
  title: string;
  year: number;
  director: string;
  rating: number;
  poster?: string;
  shortNote: string;
  tags: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: 'fellowship' | 'opensource' | 'education' | 'hackathon';
  badge: string;
  highlights: string[];
}

export interface SkillCategory {
  id: string;
  code: string;
  title: string;
  icon: string;
  skills: { name: string; projectSlugs?: string[]; experienceTag?: string }[];
}

export interface TelemetryStatus {
  status: string;
  location: string;
  coordinates: string;
  systemId: string;
  version: string;
  uptime: string;
  activeFleetCount: number;
}

export interface CurrentlyStatus {
  reading: string;
  readingAuthor: string;
  exploring: string;
  building: string;
  obsessedWith: string;
  debuggingNote: string;
  coffeeStatus: string;
}
