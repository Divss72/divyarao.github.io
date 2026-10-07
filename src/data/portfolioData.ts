import { Project, SkillCategory, TelemetryStatus } from '../types';

export const TELEMETRY_DATA: TelemetryStatus = {
  status: 'OPTIMAL',
  location: 'CHD // 30.7333° N, 76.7794° E',
  systemId: 'SYS_ID: DR-902',
  version: 'v4.2.0-PROD',
  uptime: '99.98%',
  activeFleetCount: 4,
};

export const SOCIAL_LINKS = {
  github: 'https://github.com/Divss72',
  linkedin: 'https://www.linkedin.com/in/divya-rao-975a3b32a/',
  email: 'divyarao2403@gmail.com',
  instagram: 'https://www.instagram.com/divsss62',
  cv: 'mailto:divyarao2403@gmail.com?subject=Request%20CV%20-%20Divya%20Rao',
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    code: 'MOD_01',
    title: 'Languages & Core',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'Java', 'C++', 'SQL'],
  },
  {
    id: 'frontend',
    code: 'MOD_02',
    title: 'Frontend & UI Engineering',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Radix UI', 'HTML5', 'CSS3'],
  },
  {
    id: 'backend',
    code: 'MOD_03',
    title: 'Backend & Architecture',
    skills: ['Node.js', 'Express.js', 'Django', 'RESTful API Design', 'JWT Auth', 'Middleware Architecture', 'Zod'],
  },
  {
    id: 'databases',
    code: 'MOD_04',
    title: 'Databases & Storage',
    skills: ['MongoDB (Indexing & Aggregations)', 'PostgreSQL', 'MySQL', 'Vector Databases'],
  },
  {
    id: 'ai-ml',
    code: 'MOD_05',
    title: 'AI, ML & Data',
    skills: ['Agentic AI', 'RAG Systems', 'LLM Prompt Engineering', 'NLP (NLTK)', 'OpenCV', 'Pandas', 'NumPy', 'Scikit-learn'],
  },
  {
    id: 'devops',
    code: 'MOD_06',
    title: 'DevOps, Cloud & Infrastructure',
    skills: ['Docker', 'Kubernetes', 'Git/GitHub', 'Linux', 'Railway', 'Cloudflare Pages', 'Vercel'],
  },
  {
    id: 'security',
    code: 'MOD_07',
    title: 'Security & Resilience',
    skills: ['Autonomous Fault Recovery', '7-Layer Security Stack', 'Helmet', 'Rate Limiting', 'Data Sanitization (NoSQL/XSS)'],
  },
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'devposting',
    indexNumber: '01',
    title: 'DevPosting',
    subtitle: 'Developer Blogging & Knowledge Platform',
    category: 'FULL_STACK // DISTRIBUTED_TIER',
    type: 'Full Stack Web Platform & Multi-Tier Architecture',
    description:
      'Production-ready community platform engineered for developers featuring chronicled blogging, topics explore engine, dev-rants, and hardened authentication. Engineered with compound indexing and centralized middleware pipelines.',
    techStack: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
      'Zod',
      'Docker',
      'Railway',
      'Cloudflare Pages',
    ],
    metrics: [
      { label: 'Feed Latency Reduction', value: '-40%', highlight: true },
      { label: 'RESTful Endpoints', value: '15+' },
      { label: 'Security Stack Layers', value: '7-Layer' },
      { label: 'Indexed Schemas', value: '4 Compound' },
    ],
    highlights: [
      'Engineered 15+ REST endpoints with centralized middleware, query-efficient cursor pagination, and response compression.',
      'Designed 4 compound-indexed MongoDB schemas, slashing feed endpoint database latency by ~40%.',
      'Hardened with a 7-layer enterprise security system: JWT, bcrypt, Helmet, strict rate-limiting, and deep XSS/NoSQL sanitization.',
      'Containerized with multi-stage Docker workflows and deployed across Railway and Cloudflare Pages edge network.',
    ],
    githubUrl: 'https://github.com/Divss72/devposting-backend',
    liveUrl: 'https://devposting.pages.dev',
    image: 'project-devposting.png',
    galleryImages: [
      'devposting-topics.png',
      'devposting-rants.png',
      'devposting-societies.png',
    ],
    featured: true,
    status: 'PRODUCTION',
  },
  {
    id: 'autoheal-j',
    indexNumber: '02',
    title: 'AutoHeal-J',
    subtitle: 'Autonomous Microservice Resilience & Recovery Command Center',
    category: 'SYSTEMS_OBSERVABILITY // CHAOS_ENGINE',
    type: 'Distributed Systems Observability & Self-Healing Engine',
    description:
      'Real-time mission-critical command center monitoring microservice fleets with automated anomaly detection, telemetry gathering, and an autonomous self-healing engine capable of instant service restarts and automated remediation.',
    techStack: [
      'Java',
      'Spring Boot',
      'Kubernetes',
      'Prometheus',
      'REST APIs',
      'Real-Time Telemetry Dashboard',
    ],
    metrics: [
      { label: 'Fleet Availability', value: '99.9%+', highlight: true },
      { label: 'Prometheus Polling', value: '<3.0s' },
      { label: 'Target Microservices', value: '4 Fleets' },
      { label: 'Remediation Mode', value: 'Autonomous' },
    ],
    highlights: [
      'Real-time command center monitoring microservice fleets (user-service, order-service, payment-service, gateway-service).',
      'Automated fault detection and self-healing engine triggering instant automated restarts and anomaly circuit breakers.',
      'Sub-3s polling Prometheus telemetry stream continuously tracking CPU load, memory footprints, latency spikes, and error rates.',
      'Interactive active-node topology map maintaining 99.9%+ fleet uptime visibility under synthetic chaos injections.',
    ],
    githubUrl: 'https://github.com/Divss72/Java_AutoHeal-J',
    image: 'project-autoheal.jpg',
    featured: true,
    status: 'ONLINE',
  },
  {
    id: 'algolabs',
    indexNumber: '03',
    title: 'AlgoLabs',
    subtitle: 'Interactive DSA Visualization & Algorithm Platform',
    category: 'ALGORITHMS // INTERACTIVE_CANVAS',
    type: 'Computer Science Learning Platform & Visualizer',
    description:
      'High-performance interactive sandbox to master Data Structures & Algorithms visually with AI-assisted learning modules, step-by-step visual execution, custom array inputs, and interactive theory playbooks.',
    techStack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Canvas / SVG Animations',
      'Cloudflare Pages',
    ],
    metrics: [
      { label: 'Visual Execution', value: 'Real-Time', highlight: true },
      { label: 'Supported Paradigms', value: '4 Core' },
      { label: 'Step Trace Granularity', value: 'O(1) Step' },
      { label: 'Edge Latency', value: '<25ms' },
    ],
    highlights: [
      'Interactive visual sandbox for mastering Data Structures & Algorithms visually with AI-assisted learning companion.',
      'Real-time step-by-step visual execution for Linear & Binary Search, Sorting routines, Dynamic Programming, and Hierarchical Tree Traversals.',
      'Integrated syntax playbooks, dynamic custom array inputs, and interactive theory flashcards.',
      'Fluid Canvas and SVG rendering pipelines deployed on Cloudflare Pages global edge.',
    ],
    githubUrl: 'https://github.com/Divss72/Algo--visualization',
    liveUrl: 'https://algolabs-frontend.pages.dev',
    image: 'project-algolabs.jpg',
    featured: true,
    status: 'ACTIVE',
  },
];
