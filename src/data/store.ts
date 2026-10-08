import {
  Project,
  BlogPost,
  BlogComment,
  ResearchItem,
  BookItem,
  PaperItem,
  MovieItem,
  ExperienceItem,
  SkillCategory,
  TelemetryStatus,
  CurrentlyStatus,
} from '../types';
import { API_BASE } from '../services/api';
import { normalizeImagePath } from '../utils/image';

export const INITIAL_TELEMETRY: TelemetryStatus = {
  status: 'Available for SWE Roles, fullstack projects, mern stack projects',
  location: 'Chandigarh, India',
  coordinates: '30.7333° N, 76.7794° E',
  systemId: 'DR-902',
  version: 'v4.5.0',
  uptime: 'Active Candidate',
  activeFleetCount: 4,
};

export const SOCIAL_LINKS = {
  github: 'https://github.com/Divss72',
  linkedin: 'https://www.linkedin.com/in/divya-rao-975a3b32a/',
  email: 'divyarao2403@gmail.com',
  instagram: 'https://www.instagram.com/divsss62',
  cvRequest: 'mailto:divyarao2403@gmail.com?subject=Request%20CV%20-%20Divya%20Rao',
};

export const INITIAL_CURRENTLY: CurrentlyStatus = {
  reading: 'Designing Data-Intensive Applications',
  readingAuthor: 'Martin Kleppmann',
  exploring: 'Context degradation & attention behavior in long-context models',
  building: 'Full-stack MERN platforms & interactive agentic experiments',
  obsessedWith: 'How retrieval changes what a language model actually knows',
  debuggingNote: 'Usually tracking down a state hydration mismatch or query bottleneck',
  coffeeStatus: 'Fresh brew • 2403 vibe',
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'devposting',
    slug: 'devposting',
    indexNumber: '01',
    title: 'DevPosting',
    subtitle: 'Developer Community, Chronicled Blogging & Explore Engine',
    category: 'Full Stack Web Platform',
    type: 'MERN Stack Web Platform',
    description:
      'A community platform built for developers featuring chronicled blogging, topics explore engine, dev-rants, and authentication. Engineered with MongoDB compound indexing and structured middleware pipelines.',
    problem:
      'Developer feeds often slow down as article collections grow, and organizing topics by taxonomy requires clean schema design and efficient querying.',
    solution:
      'Built a centralized Express middleware architecture with cursor-based pagination, 4 compound-indexed MongoDB schemas, and clean authentication pipelines that reduced feed query latency by ~40%.',
    myRole: 'Full-Stack Developer',
    architectureFlow: {
      steps: [
        { step: 'Client Tier', detail: 'React + Tailwind CSS with edge hosting on Cloudflare Pages' },
        { step: 'API Layer', detail: 'Express.js with rate limiting, Zod schema validation, and JWT verification' },
        { step: 'Service Layer', detail: 'Cursor-based pagination with query decompression and cache invalidation' },
        { step: 'Data Store', detail: 'MongoDB database with compound indexes for fast topic and date traversal' },
      ],
    },
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Zod', 'Docker', 'Railway', 'Cloudflare Pages'],
    metrics: [
      { label: 'Database Engine', value: 'MongoDB', highlight: true },
      { label: 'API Architecture', value: 'RESTful' },
      { label: 'Validation Layer', value: 'Zod Schemas' },
      { label: 'Auth Pipeline', value: 'JWT + Bcrypt' },
    ],
    keyFeatures: [
      'Chronicled developer blogging with tag taxonomy and Markdown authoring',
      'Topics explore engine with real-time categorizations and filters',
      'Dedicated Dev-Rants channel with community reaction engagement',
      'Security middleware with rate limiting, bcrypt password hashing, and input sanitization',
    ],
    challenges: [
      'Optimizing MongoDB queries for dynamic tag feeds: solved with composite indexes ({ tags: 1, createdAt: -1 })',
      'Managing stateless JWT authentication smoothly: solved with secure cookie handling and token refresh',
    ],
    learnings: [
      'Profiling database queries with explain() revealed that indexing was the single highest ROI optimization',
      'Decoupling feed querying from full document hydration kept memory usage lean under throughput',
    ],
    result:
      'Deployed on Railway and Cloudflare Pages with snappy sub-80ms API responses under simulated loads.',
    githubUrl: 'https://github.com/Divss72/devposting-backend',
    liveUrl: 'https://devposting.pages.dev',
    image: '/project-devposting.png',
    galleryImages: [
      { url: '/devposting-chronicles.png', caption: 'DevPosting Chronicles — Main Community Feed' },
      { url: '/devposting-topics.png', caption: 'Topics Explore Engine with Taxonomy Clusters' },
      { url: '/devposting-rants.png', caption: 'Dev Rants — Community Micro-Discussion Stream' },
      { url: '/devposting-societies.png', caption: 'Developer Societies & Group Channels' },
    ],
    featured: true,
    status: 'PRODUCTION',
  },
  {
    id: 'autoheal-j',
    slug: 'autoheal-j',
    indexNumber: '02',
    title: 'AutoHeal-J',
    subtitle: 'Microservice Resilience & Telemetry Recovery Experiment',
    category: 'Systems & Observability',
    type: 'Systems Observability & Recovery Engine',
    description:
      'An experimental dashboard and monitoring prototype built with Spring Boot, testing Prometheus metric scraping and automated container restarts under simulated chaos.',
    problem:
      'Understanding how services fail in practice: wanting to test what happens when an endpoint begins throwing 500 errors or leaks memory under load.',
    solution:
      'Built a Java Spring Boot controller connected to Prometheus that samples service health and triggers container restarts via Kubernetes client APIs when sustained error thresholds are crossed.',
    myRole: 'Backend & Systems Developer',
    architectureFlow: {
      steps: [
        { step: 'Service Endpoints', detail: 'Mock user, order, payment, and gateway service endpoints' },
        { step: 'Telemetry Scraper', detail: 'Prometheus scraper tracking CPU, memory, and error rates' },
        { step: 'Threshold Evaluator', detail: 'Hysteresis logic requiring consecutive ticks before triggering' },
        { step: 'Restart Trigger', detail: 'Kubernetes client API executing container restarts on confirmed errors' },
      ],
    },
    techStack: ['Java', 'Spring Boot', 'Kubernetes', 'Prometheus', 'REST APIs', 'Docker'],
    metrics: [
      { label: 'Scrape Window', value: '3s', highlight: true },
      { label: 'Evaluation Logic', value: 'Hysteresis' },
      { label: 'Monitored Endpoints', value: '4 Services' },
      { label: 'Restart Trigger', value: 'Automated' },
    ],
    keyFeatures: [
      'Live topology telemetry dashboard with interactive microservice node statuses',
      'Simulated chaos testing to observe how services recover under memory pressure',
      'Automated restart routines triggered via Kubernetes client API',
      'Audit log of automated interventions and recovery duration metrics',
    ],
    challenges: [
      'Preventing restart loops during transient network blips: solved by adding cooldown dampeners',
      'Balancing polling frequency with metric overhead: optimized sampling intervals to sub-3s without CPU spikes',
    ],
    learnings: [
      'Reliability requires designing clear thresholds and exponential backoffs',
      'Automated recovery significantly shortens Mean Time To Recovery (MTTR) compared to manual alerts',
    ],
    result:
      'Successfully sustained recovery across synthetic failure injections simulating 40% node degradation.',
    githubUrl: 'https://github.com/Divss72/Java_AutoHeal-J',
    image: '/project-autoheal-real.png',
    galleryImages: [
      { url: '/project-autoheal-real.png', caption: 'AutoHeal-J Live Fleet Telemetry Command Console' },
      { url: '/project-autoheal.jpg', caption: 'Microservice Node Topology & Status Map' },
    ],
    featured: true,
    status: 'ONLINE',
  },
  {
    id: 'algolabs',
    slug: 'algolabs',
    indexNumber: '03',
    title: 'AlgoLabs',
    subtitle: 'Interactive DSA Visualization & Algorithm Platform',
    category: 'Algorithms & Learning',
    type: 'Computer Science Visualizer & Sandbox',
    description:
      'An interactive sandbox to master Data Structures & Algorithms visually with step-by-step visual execution, custom array inputs, and interactive theory playbooks.',
    problem:
      'Static pseudocode and abstract textbook diagrams make algorithmic intuition difficult to grasp when learning pointers, state mutation, and recursion trees.',
    solution:
      'Built a reactive Canvas/SVG pipeline that animates array partition steps, binary tree traversals, and dynamic programming tables frame-by-frame with interactive scrubbing and custom datasets.',
    myRole: 'Frontend Developer & Visualizer Designer',
    architectureFlow: {
      steps: [
        { step: 'Algorithm Engine', detail: 'Pure TypeScript state generator recording every step snapshot' },
        { step: 'Scrubber Controller', detail: 'Allows stepping forward, backward, or variable-speed auto-play' },
        { step: 'Rendering Canvas', detail: 'SVG and Canvas elements animating element shifts and pointer highlights' },
        { step: 'Theory Companion', detail: 'Complexity breakdowns explaining time and space bounds at current step' },
      ],
    },
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Canvas / SVG', 'Cloudflare Pages', 'Vite'],
    metrics: [
      { label: 'Visual Execution', value: 'Real-Time', highlight: true },
      { label: 'Paradigms Supported', value: '4 Core' },
      { label: 'Step Granularity', value: 'Frame-by-Step' },
      { label: 'Edge Latency', value: '<25ms' },
    ],
    keyFeatures: [
      'Interactive visual sandbox for Linear/Binary Search, Sorting routines, DP, and Trees',
      'Frame-by-frame step trace debugger allowing backward and forward stepping',
      'Custom array and tree inputs with instant syntax validation',
      'Integrated theory flashcards and complexity breakdown sheets',
    ],
    challenges: [
      'Smoothly animating array element swaps without DOM lag: solved with virtualized state slices',
      'Designing clean visual mental models for tree traversals and recursive calls',
    ],
    learnings: [
      'Decoupling algorithm calculation from visualization renders makes state stepping deterministic',
      'Building visualizers is one of the best ways to truly understand an algorithm deeply',
    ],
    result:
      'Deployed globally on Cloudflare Pages with zero server dependencies and near-instant load times.',
    githubUrl: 'https://github.com/Divss72/Algo--visualization',
    liveUrl: 'https://algolabs-frontend.pages.dev',
    image: '/project-algolabs-real.png',
    galleryImages: [
      { url: '/project-algolabs-real.png', caption: 'AlgoLabs Interactive Sorting Sandbox Interface' },
      { url: '/project-algolabs.jpg', caption: 'Binary Search & Tree Traversal Visual Execution' },
    ],
    featured: true,
    status: 'ACTIVE',
  },
];

export const INITIAL_SKILLS: SkillCategory[] = [
  {
    id: 'ai-ml',
    code: 'MOD_01',
    title: 'AI, ML & Agentic Systems',
    icon: '🤖',
    skills: [
      { name: 'Agentic AI', projectSlugs: ['devposting', 'autoheal-j'], experienceTag: 'Alta Fellow' },
      { name: 'RAG Systems', projectSlugs: ['devposting'], experienceTag: 'AI Projects' },
      { name: 'LLM Prompt Engineering', projectSlugs: ['algolabs'], experienceTag: 'Exploration' },
      { name: 'NLP (NLTK)', experienceTag: 'Coursework' },
      { name: 'OpenCV & Computer Vision', experienceTag: 'Experiments' },
      { name: 'Pandas & NumPy', experienceTag: 'Data analysis' },
      { name: 'Scikit-learn', experienceTag: 'ML Core' },
      { name: 'Vector Databases', projectSlugs: ['devposting'], experienceTag: 'RAG' },
    ],
  },
  {
    id: 'backend',
    code: 'MOD_02',
    title: 'Backend & Systems',
    icon: '⚡',
    skills: [
      { name: 'Node.js', projectSlugs: ['devposting'], experienceTag: 'Core' },
      { name: 'Express.js', projectSlugs: ['devposting'], experienceTag: 'API Engine' },
      { name: 'Java (Spring Boot)', projectSlugs: ['autoheal-j'], experienceTag: 'Projects' },
      { name: 'Python', experienceTag: 'AI & Scripting' },
      { name: 'RESTful API Design', projectSlugs: ['devposting', 'autoheal-j'], experienceTag: 'APIs' },
      { name: 'JWT Authentication', projectSlugs: ['devposting'], experienceTag: 'Auth' },
      { name: 'Zod Validation', projectSlugs: ['devposting'], experienceTag: 'Contracts' },
    ],
  },
  {
    id: 'frontend',
    code: 'MOD_03',
    title: 'Frontend & UI',
    icon: '🎨',
    skills: [
      { name: 'React.js', projectSlugs: ['devposting', 'algolabs'], experienceTag: 'Primary' },
      { name: 'TypeScript', projectSlugs: ['algolabs', 'devposting'], experienceTag: 'Typed Apps' },
      { name: 'Tailwind CSS', projectSlugs: ['devposting', 'algolabs'], experienceTag: 'Styling' },
      { name: 'Framer Motion', projectSlugs: ['algolabs'], experienceTag: 'Interactions' },
      { name: 'Vite', projectSlugs: ['algolabs'], experienceTag: 'Tooling' },
      { name: 'Canvas & SVG APIs', projectSlugs: ['algolabs'], experienceTag: 'Visualizers' },
      { name: 'HTML5 & CSS3', projectSlugs: ['devposting', 'algolabs'], experienceTag: 'Semantics' },
    ],
  },
  {
    id: 'databases',
    code: 'MOD_04',
    title: 'Databases & Storage',
    icon: '🗄️',
    skills: [
      { name: 'MongoDB (Indexing)', projectSlugs: ['devposting'], experienceTag: 'Optimizations' },
      { name: 'PostgreSQL', experienceTag: 'Relational' },
      { name: 'MySQL', experienceTag: 'Coursework' },
      { name: 'Query Optimization', projectSlugs: ['devposting'], experienceTag: 'Index Analysis' },
    ],
  },
  {
    id: 'devops',
    code: 'MOD_05',
    title: 'DevOps & Tools',
    icon: '☁️',
    skills: [
      { name: 'Docker', projectSlugs: ['devposting', 'autoheal-j'], experienceTag: 'Containers' },
      { name: 'Kubernetes', projectSlugs: ['autoheal-j'], experienceTag: 'Basics' },
      { name: 'Prometheus', projectSlugs: ['autoheal-j'], experienceTag: 'Metrics' },
      { name: 'Git & GitHub', experienceTag: 'GSSoC 24' },
      { name: 'Cloudflare Pages', projectSlugs: ['devposting', 'algolabs'], experienceTag: 'Edge' },
      { name: 'Railway', projectSlugs: ['devposting'], experienceTag: 'Deployments' },
    ],
  },
];

export const INITIAL_RESEARCH: ResearchItem[] = [
  {
    id: 'res-01',
    slug: 'context-degradation-long-context-llms',
    title: 'Context Degradation & Retrieval in Long-Context LLMs',
    question: 'How does model recall change when relevant facts are placed in the middle versus the ends of long contexts, and how does retrieval compare?',
    whyInterested:
      'I noticed in my own experiments that simply giving a model a 32k or 128k prompt doesn’t mean it actually uses all that context accurately. I want to understand where attention degrades.',
    whatReading:
      'Nelson Liu et al. "Lost in the Middle", FlashAttention papers, and recent benchmarks on long-context needle-in-a-haystack evaluations.',
    whatTesting:
      'Testing variable document position distributions using small synthetic test sets with different placement offsets (start, 25%, 50%, 75%, end).',
    whatFound:
      'Initial observations reflect the classic U-shaped curve: facts placed right after the system prompt or near the final query are retrieved far more reliably than facts nestled in the middle third.',
    whatStillDontKnow:
      'At what token threshold does chunking + reranking clearly beat feeding the entire raw document? How do different prompt structures mitigate the dip?',
    status: 'Exploring',
    tags: ['Long-Context LLMs', 'Attention Behavior', 'Context Degradation', 'Retrieval'],
    references: 'https://arxiv.org/abs/2307.03172',
    currentStepIndex: 3, // Experimenting
  },
  {
    id: 'res-02',
    slug: 'agentic-ai-feedback-loops-and-failure-modes',
    title: 'Agentic Tool Loops: Failure Modes & Self-Correction',
    question: 'Why do LLM agents get stuck in repetitive failure loops when tools return unexpected errors, and how can we prevent endless reflection?',
    whyInterested:
      'When building agent experiments, I kept watching models repeatedly retry the exact same failing action while saying "Let me try that again". I want to understand what makes agent planning fragile.',
    whatReading:
      'ReAct (Yao et al.), Reflexion (Shinn et al.), and literature on bounded state machines and tool validation schemas.',
    whatTesting:
      'Setting up small agent loops with mocked external tools and introducing deterministic guardrails (error counters, AST checks, hard termination caps).',
    whatFound:
      'Providing structured, typed error payloads rather than raw stack traces helps models adjust parameters, but bounded loop dampeners are necessary to stop infinite retries.',
    whatStillDontKnow:
      'How to best balance giving the agent autonomy to retry versus cutting off the loop early without abandoning legitimate problem-solving.',
    status: 'Prototyping',
    tags: ['Agentic AI', 'Tool Use', 'Feedback Loops', 'Reliability'],
    references: 'https://arxiv.org/abs/2210.03629',
    currentStepIndex: 3,
  },
  {
    id: 'res-03',
    slug: 'rag-retrieval-noise-and-context-selection',
    title: 'RAG Retrieval Noise & Context Selection',
    question: 'How much does irrelevant retrieved context hurt LLM answer quality, and how can we select only what actually helps?',
    whyInterested:
      'Naive top-k vector search often brings in noisy or tangentially related text chunks. I want to see how much irrelevant chunks confuse the model’s reasoning.',
    whatReading:
      'Self-RAG (Asai et al.), contextual compression techniques, and hybrid BM25 + dense vector ranking papers.',
    whatTesting:
      'Evaluating Q&A accuracy when injecting varying ratios of distractor chunks alongside the ground truth answer snippet.',
    whatFound:
      'Even 2-3 distractor chunks can introduce hallucinations or cause the model to hedge unnecessarily, even when the exact answer was in chunk #1.',
    whatStillDontKnow:
      'What is the computational trade-off of running a local cross-encoder reranker versus filtering with a lighter heuristic before prompt assembly?',
    status: 'Reading Papers',
    tags: ['RAG', 'Retrieval Quality', 'Vector DBs', 'Context Selection'],
    references: 'https://arxiv.org/abs/2310.11511',
    currentStepIndex: 1,
  },
];

export const INITIAL_PAPERS: PaperItem[] = [
  {
    id: 'paper-01',
    title: 'Lost in the Middle: How Language Models Use Long Contexts',
    authors: 'Nelson F. Liu et al.',
    year: 2023,
    link: 'https://arxiv.org/abs/2307.03172',
    topic: 'Long-Context LLMs',
    whyReading: 'To understand why performance drops sharply when relevant information is in the middle of long prompts.',
    notes: 'Strong U-shaped retrieval accuracy curve. Even 32k+ models suffer unless key facts are near the very beginning or end.',
    status: 'Reading',
  },
  {
    id: 'paper-02',
    title: 'FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness',
    authors: 'Tri Dao et al.',
    year: 2022,
    link: 'https://arxiv.org/abs/2205.14135',
    topic: 'LLM Efficiency',
    whyReading: 'Curious about GPU SRAM tiling and why memory access overhead dominates standard attention computation.',
    notes: 'Tiling dramatically reduces HBM read/write rounds. Key foundational reading for understanding memory latency in transformers.',
    status: 'Read',
  },
  {
    id: 'paper-03',
    title: 'Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection',
    authors: 'Akari Asai et al.',
    year: 2023,
    link: 'https://arxiv.org/abs/2310.11511',
    topic: 'RAG & Retrieval',
    whyReading: 'Exploring how to train models to selectively retrieve on-demand rather than dumping raw vector chunks into context.',
    notes: 'Special reflection tokens evaluate retrieval necessity and factual support.',
    status: 'Want to Read',
  },
  {
    id: 'paper-04',
    title: 'ReAct: Synergizing Reasoning and Acting in Language Models',
    authors: 'Shunyu Yao et al.',
    year: 2022,
    link: 'https://arxiv.org/abs/2210.03629',
    topic: 'Agentic AI',
    whyReading: 'The foundational blueprint for agent tool execution loops and verbal reasoning traces.',
    notes: 'Alternating between Thought, Action, and Observation significantly grounds tool parameters.',
    status: 'Read',
  },
];

export const INITIAL_EXPERIENCE: ExperienceItem[] = [
  {
    id: 'exp-01',
    role: 'AI Builders Fellow',
    organization: 'Alta AI Builders Fellowship',
    period: '2024 — PRESENT',
    location: 'Remote',
    type: 'fellowship',
    badge: 'AI Fellow',
    highlights: [
      'Selected fellow exploring interactive agent workflows, tool use, and multi-step reasoning pipelines.',
      'Experimenting with structured JSON outputs, prompt context selection, and agent feedback loops.',
      'Collaborating with other builders across AI product design and technical prototypes.',
    ],
  },
  {
    id: 'exp-02',
    role: 'Open Source Contributor',
    organization: 'GirlScript Summer of Code (GSSoC \'24)',
    period: '2024',
    location: 'Remote',
    type: 'opensource',
    badge: 'GSSoC \'24',
    highlights: [
      'Contributed pull requests across open-source web platforms and developer tools.',
      'Worked on modular React components, backend REST controllers, and documentation fixes.',
      'Participated in code reviews, issue triage, and collaborative GitHub workflows.',
    ],
  },
  {
    id: 'exp-03',
    role: 'National Finalist & Prototype Builder',
    organization: 'National Hackathons',
    period: '2024',
    location: 'India',
    type: 'hackathon',
    badge: 'Finalist',
    highlights: [
      'Recognized for building working full-stack and systems prototypes under 24-36 hour hackathon sprints.',
      'Built live telemetry and interactive web dashboards alongside teammates under time constraints.',
    ],
  },
  {
    id: 'exp-04',
    role: 'B.E. Computer Science & Engineering',
    organization: 'Chandigarh University',
    period: '2024 — PRESENT',
    location: 'Chandigarh, India',
    type: 'education',
    badge: 'B.E. CSE',
    highlights: [
      'Undergraduate student studying Data Structures & Algorithms, Operating Systems, Database Management Systems, and Object-Oriented Programming.',
      'Active candidate building projects alongside academic coursework and exploring AI/ML.',
      'Completed 15+ verified technical certifications across development and cloud fundamentals.',
    ],
  },
];

export const INITIAL_BOOKS: BookItem[] = [
  {
    id: 'book-01',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    rating: 5,
    status: 'Reading',
    genre: 'Distributed Systems & Data',
    note: 'An incredible breakdown of storage engines, replication, consensus, and how data systems actually behave under the hood. It changed how I think about databases and caching.',
    takeaway: 'Reliability is about continuing to work correctly even when individual components fail.',
    favoriteQuote: 'Reliability is continuing to work correctly even when things go wrong.',
  },
  {
    id: 'book-02',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    rating: 5,
    status: 'Read',
    genre: 'Cognitive Science & Psychology',
    note: 'Fascinating perspective on System 1 (intuitive, fast) and System 2 (deliberate, effortful) cognitive modes. It gave me a cool mental model for comparing fast heuristic retrieval with deliberate agent reasoning.',
    takeaway: 'Our intuition is often overconfident; deliberate checking is worth the latency.',
    favoriteQuote: 'Nothing in life is as important as you think it is, while you are thinking about it.',
  },
  {
    id: 'book-03',
    title: 'Deep Learning',
    author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
    rating: 5,
    status: 'Reading',
    genre: 'Machine Learning Fundamentals',
    note: 'Working through the mathematical foundations: linear algebra, gradient-based optimization, and neural network mechanics.',
    takeaway: 'Understanding the linear algebra makes transformer architectures feel concrete rather than magical.',
    favoriteQuote: 'Machine learning is not just about doing what computers do well, but about teaching them what humans do naturally.',
  },
  {
    id: 'book-04',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    rating: 4.5,
    status: 'Read',
    genre: 'Software Craftsmanship',
    note: 'Helped me write cleaner functions, pay attention to descriptive variable naming, and take pride in readable code.',
    takeaway: 'Code is read far more often than it is written.',
    favoriteQuote: 'Truth can only be found in one place: the code.',
  },
  {
    id: 'book-05',
    title: 'Atomic Habits',
    author: 'James Clear',
    rating: 5,
    status: 'Read',
    genre: 'Systems & Personal Growth',
    note: 'A reminder that consistent daily practice — whether coding every morning, running a few kilometers, or reading a few pages — compounds massively over time.',
    takeaway: 'Focus on building sustainable systems rather than fixating on distant outcomes.',
    favoriteQuote: 'You do not rise to the level of your goals. You fall to the level of your systems.',
  },
  {
    id: 'book-06',
    title: 'Structure and Interpretation of Computer Programs (SICP)',
    author: 'Harold Abelson & Gerald Jay Sussman',
    rating: 5,
    status: 'Want to Read',
    genre: 'Computer Science Core',
    note: 'The classic MIT text on computational thinking, recursion, and interpreters from first principles. On my active study list.',
    takeaway: 'Programs are written for humans to understand, and only incidentally for computers to run.',
    favoriteQuote: 'Programs must be written for people to read, and only incidentally for machines to execute.',
  },
];

export const INITIAL_MOVIES: MovieItem[] = [
  {
    id: 'mov-01',
    title: 'Interstellar',
    year: 2014,
    director: 'Christopher Nolan',
    rating: 9.8,
    shortNote: 'Breathtaking blend of general relativity, human endurance, and Hans Zimmer’s organ score. An absolute masterclass in visual storytelling.',
    tags: ['Sci-Fi', 'Space', 'Physics', 'Nolan'],
  },
  {
    id: 'mov-02',
    title: 'The Matrix',
    year: 1999,
    director: 'Lana & Lilly Wachowski',
    rating: 9.9,
    shortNote: 'The ultimate programmer film. Philosophical allegory on simulation hypothesis, agency, and rebellion against deterministic algorithms.',
    tags: ['Cyberpunk', 'Simulation', 'Philosophy', 'Action'],
  },
  {
    id: 'mov-03',
    title: 'Whiplash',
    year: 2014,
    director: 'Damien Chazelle',
    rating: 9.6,
    shortNote: 'Relentless exploration of obsessive dedication, rhythmic tempo, and the cost of greatness. The finale performance is unmatched energy.',
    tags: ['Music', 'Drama', 'Perfectionism', 'Intensity'],
  },
  {
    id: 'mov-04',
    title: 'Ex Machina',
    year: 2014,
    director: 'Alex Garland',
    rating: 9.2,
    shortNote: 'Subtle, tense Turing test chamber play. Raises fundamental questions about machine consciousness, manipulation, and synthetic empathy.',
    tags: ['AI', 'Psychological', 'Turing Test', 'Ethics'],
  },
  {
    id: 'mov-05',
    title: 'Oppenheimer',
    year: 2023,
    director: 'Christopher Nolan',
    rating: 9.4,
    shortNote: 'Monumental cinematic biopic examining theoretical physics, bureaucratic paranoia, and chain reactions that reshape human civilization.',
    tags: ['Physics', 'History', 'Drama', 'Cinema'],
  },
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-01',
    slug: 'architecting-agentic-workflows',
    title: 'What I Learned Building Agent Loops: Moving Past Static Prompts',
    excerpt:
      'Notes on why single-turn prompts fall apart on multi-step tasks, how tool validation helps, and how to stop models from getting stuck in reflection cycles.',
    category: 'AI & LLMs',
    tags: ['Agentic AI', 'LLMs', 'Tool Use', 'Reflections'],
    publishDate: 'Oct 06, 2026',
    readTime: '6 min read',
    isDraft: false,
    seoTitle: 'What I Learned Building Agent Loops — Divya Rao',
    seoDescription:
      'Observations on agent loops, tool validation, and avoiding repetitive failure cycles when building with LLMs.',
    content: `
### What Happened When I Tried Building AI Agents

When I first started experimenting with LLMs, I did what almost everyone does: I tried to solve everything with longer prompts. Add five examples, tell the model to "think step by step," and hope for the best.

That works well for drafting an email or summarizing an article. But the moment you try to connect a model to a database, ask it to look up documentation, or have it debug a piece of code across several steps, single-turn prompts quickly break.

The model hallucinates a tool argument that doesn't exist, gets an error, and then apologizes and tries the exact same broken command three more times.

---

### What Actually Helped

In my experiments through the Alta fellowship and personal projects, three practical adjustments made agent loops much more reliable:

1. **Strictly Typed Tool Contracts:** Using Zod schemas so that if the model invents a parameter name, the execution engine catches it immediately and sends a clear error message back to the model before calling any real code.
2. **Explicit Observation Formatting:** Returning structured summaries of tool results instead of raw giant JSON dumps. Models reason much better over 100 clear tokens than 4,000 raw lines of response headers.
3. **Loop Dampeners:** Setting hard limits on consecutive identical errors. If a model tries an action twice and fails, forcing a strategy shift rather than asking "What did you do wrong? Try again."

\`\`\`typescript
// Simple Agent Loop Pattern
interface AgentState {
  goal: string;
  history: { action: string; result: string }[];
  stepsCount: number;
}
\`\`\`

### Still Learning

I don't have all the answers here. I'm still exploring how to balance giving an agent enough freedom to recover while keeping it bounded enough not to burn tokens in a loop. But moving from static prompting to structured feedback loops has been the most interesting part of working with modern AI.
    `,
  },
  {
    id: 'blog-02',
    slug: 'autonomous-microservice-self-healing',
    title: 'Building AutoHeal-J: Notes on Prometheus Telemetry and Container Restarts',
    excerpt:
      'What I learned experimenting with Prometheus metrics in Java Spring Boot and triggering automated container restarts under simulated load.',
    category: 'Distributed Systems',
    tags: ['Java', 'Spring Boot', 'Kubernetes', 'Prometheus', 'Experiments'],
    publishDate: 'Sep 28, 2026',
    readTime: '7 min read',
    isDraft: false,
    seoTitle: 'Building AutoHeal-J — Divya Rao',
    seoDescription:
      'Notes on Prometheus telemetry, threshold evaluation, and automated service restarts in Java Spring Boot.',
    content: `
### Why I Wanted to Build This

I wanted to understand how systems monitoring actually works. In class, we talk about uptime and health checks, but I wanted to see what happens when a service actually begins to leak memory or throw 500 errors in real time.

So I built **AutoHeal-J** as an exploration: a Spring Boot application that polls Prometheus metrics for a small set of mock microservices, visualizes the state on a dashboard, and automatically triggers pod restarts if a service crosses a sustained error threshold.

---

### Key Lessons from the Experiment

1. **Polling Frequency Matters:** Standard Prometheus scrape intervals of 15–30s felt too slow during sudden spikes. Shortening the polling window allowed the dashboard to feel real-time.
2. **Hysteresis / Cooldowns are Essential:** My first version rebooted the service at the very first latency spike. That was a mistake! A single slow database query would trigger an unnecessary restart. Adding a requirement that errors persist across multiple consecutive ticks prevented false alarms.

It was a great project for learning how real-world monitoring pipelines behave when things go wrong.
    `,
  },
  {
    id: 'blog-03',
    slug: 'slashing-feed-latency-compound-indexing',
    title: 'What Happened When I Added Compound Indexes to DevPosting',
    excerpt:
      'How profiling queries with explain() and adding compound MongoDB indexes brought our feed query time down by ~40%.',
    category: 'Web Engineering',
    tags: ['MongoDB', 'Performance', 'Node.js', 'Express', 'MERN'],
    publishDate: 'Sep 15, 2026',
    readTime: '5 min read',
    isDraft: false,
    seoTitle: 'Compound Indexes in DevPosting — Divya Rao',
    seoDescription:
      'A practical guide to database indexing, cursor-based pagination, and feed performance in MongoDB.',
    content: `
### When the Feed Started Feeling Sluggish

While building **DevPosting**, our MERN community platform, everything was fast with 20 dummy posts. But once I seeded a few thousand mock articles and started filtering by multiple tags and sorting by creation date, the main feed endpoint started taking over 400ms.

Running \`explain("executionStats")\` in the MongoDB shell showed what was wrong: **COLLSCAN** (full collection scan). MongoDB was scanning thousands of documents in memory just to return 15 paginated cards!

---

### What Fixed It

1. **Cursor-Based Pagination:** Instead of using \`.skip(page * limit)\` (which still scans previous documents), switching to timestamp pointers (\`createdAt < lastSeenDate\`).
2. **Compound Index:** Adding a composite index on \`{ tags: 1, createdAt: -1 }\`.

The query execution time dropped by ~40% (down to ~65ms), and documents examined dropped from thousands to the exact 15 returned. It made me realize that database indexing is one of the most practical skills any web developer can learn.
    `,
  },
];

export const INITIAL_COMMENTS: BlogComment[] = [
  {
    id: 'comm-01',
    blogSlug: 'architecting-agentic-workflows',
    authorName: 'Rohan Sharma',
    authorEmail: 'rohan.dev@example.com',
    content:
      'The point about loop dampeners preventing infinite retries is so true. We faced the exact same cycle in our LangChain scripts. Great write-up!',
    timestamp: 'Oct 07, 2026, 11:24 AM',
    status: 'approved',
  },
  {
    id: 'comm-02',
    blogSlug: 'slashing-feed-latency-compound-indexing',
    authorName: 'Ananya Verma',
    authorEmail: 'ananya@tech.org',
    content:
      'Cursor pagination combined with compound indexing is such a clean pattern. The explain() execution statistics comparison really drives it home.',
    timestamp: 'Sep 18, 2026, 04:15 PM',
    status: 'approved',
  },
];

function normalizeProjectImages(p: Project): Project {
  return {
    ...p,
    image: normalizeImagePath(p.image),
    galleryImages: p.galleryImages?.map((g) => {
      if (typeof g === 'string') {
        return normalizeImagePath(g);
      }
      return {
        ...g,
        url: normalizeImagePath(g.url),
      };
    }) as any,
  };
}

// Reactive Store Implementation with LocalStorage Persistence
class PortfolioStore {
  private listeners: Set<() => void> = new Set();

  private projects: Project[] = INITIAL_PROJECTS.map(normalizeProjectImages);
  private blogs: BlogPost[] = INITIAL_BLOGS;
  private comments: BlogComment[] = INITIAL_COMMENTS;
  private research: ResearchItem[] = INITIAL_RESEARCH;
  private books: BookItem[] = INITIAL_BOOKS;
  private papers: PaperItem[] = INITIAL_PAPERS;
  private movies: MovieItem[] = INITIAL_MOVIES;
  private experience: ExperienceItem[] = INITIAL_EXPERIENCE;
  private skills: SkillCategory[] = INITIAL_SKILLS;
  private currently: CurrentlyStatus = INITIAL_CURRENTLY;
  private activePhoto: string = '/divya-profile.png';
  private customImages: { id: string; url: string; title: string; category: string }[] = [];

  constructor() {
    this.loadFromStorage();
    this.syncWithServer();
  }

  public async syncWithServer() {
    if (typeof window === 'undefined') return;
    try {
      const res = await fetch(`${API_BASE}/public/data`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.projects && data.projects.length) {
        this.projects = data.projects.map(normalizeProjectImages);
      }
      if (data.blogs && data.blogs.length) this.blogs = data.blogs;
      if (data.approvedComments && data.approvedComments.length) this.comments = data.approvedComments;
      if (data.research && data.research.length) this.research = data.research;
      if (data.books && data.books.length) this.books = data.books;
      if (data.settings?.currently) this.currently = data.settings.currently;
      if (data.settings?.siteMetadata?.activePhoto) this.activePhoto = data.settings.siteMetadata.activePhoto;
      this.notify();
    } catch {
      // Offline fallback
    }
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;
    try {
      const storedProjects = localStorage.getItem('dr_projects');
      if (storedProjects) {
        const parsed = JSON.parse(storedProjects);
        this.projects = Array.isArray(parsed) ? parsed.map(normalizeProjectImages) : this.projects;
      }

      const storedBlogs = localStorage.getItem('dr_blogs');
      if (storedBlogs) this.blogs = JSON.parse(storedBlogs);

      const storedComments = localStorage.getItem('dr_comments');
      if (storedComments) this.comments = JSON.parse(storedComments);

      const storedBooks = localStorage.getItem('dr_books');
      if (storedBooks) this.books = JSON.parse(storedBooks);

      const storedPapers = localStorage.getItem('dr_papers');
      if (storedPapers) this.papers = JSON.parse(storedPapers);

      const storedMovies = localStorage.getItem('dr_movies');
      if (storedMovies) this.movies = JSON.parse(storedMovies);

      const storedResearch = localStorage.getItem('dr_research');
      if (storedResearch) this.research = JSON.parse(storedResearch);

      const storedCurrently = localStorage.getItem('dr_currently');
      if (storedCurrently) this.currently = JSON.parse(storedCurrently);

      const storedPhoto = localStorage.getItem('dr_active_photo');
      if (storedPhoto && storedPhoto !== 'me1.jpeg' && storedPhoto !== 'me.jpg') {
        this.activePhoto = storedPhoto;
      } else {
        this.activePhoto = '/divya-profile.png';
      }

      const storedCustomImgs = localStorage.getItem('dr_custom_images');
      if (storedCustomImgs) this.customImages = JSON.parse(storedCustomImgs);
    } catch (e) {
      console.warn('Could not load portfolio store from localStorage', e);
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('dr_projects', JSON.stringify(this.projects));
      localStorage.setItem('dr_blogs', JSON.stringify(this.blogs));
      localStorage.setItem('dr_comments', JSON.stringify(this.comments));
      localStorage.setItem('dr_books', JSON.stringify(this.books));
      localStorage.setItem('dr_papers', JSON.stringify(this.papers));
      localStorage.setItem('dr_movies', JSON.stringify(this.movies));
      localStorage.setItem('dr_research', JSON.stringify(this.research));
      localStorage.setItem('dr_currently', JSON.stringify(this.currently));
      localStorage.setItem('dr_active_photo', this.activePhoto);
      localStorage.setItem('dr_custom_images', JSON.stringify(this.customImages));
    } catch (e) {
      console.warn('Could not save portfolio store to localStorage', e);
    }
    this.notify();
  }

  public subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  // Getters
  public getProjects(): Project[] {
    return this.projects.map(normalizeProjectImages);
  }

  public getProjectBySlug(slug: string): Project | undefined {
    const p = this.projects.find((proj) => proj.slug === slug || proj.id === slug);
    return p ? normalizeProjectImages(p) : undefined;
  }

  public getBlogs(includeDrafts = false): BlogPost[] {
    return includeDrafts ? this.blogs : this.blogs.filter((b) => !b.isDraft);
  }

  public getBlogBySlug(slug: string): BlogPost | undefined {
    return this.blogs.find((b) => b.slug === slug);
  }

  public getComments(blogSlug: string): BlogComment[] {
    return this.comments.filter((c) => c.blogSlug === blogSlug && c.status === 'approved');
  }

  public getAllComments(): BlogComment[] {
    return this.comments;
  }

  public getResearch(): ResearchItem[] {
    return this.research;
  }

  public getBooks(): BookItem[] {
    return this.books;
  }

  public getPapers(): PaperItem[] {
    return this.papers;
  }

  public getMovies(): MovieItem[] {
    return this.movies;
  }

  public getExperience(): ExperienceItem[] {
    return this.experience;
  }

  public getSkills(): SkillCategory[] {
    return this.skills;
  }

  public getCurrently(): CurrentlyStatus {
    return this.currently;
  }

  public getActivePhoto(): string {
    return normalizeImagePath(this.activePhoto);
  }

  public getCustomImages() {
    return this.customImages.map((img) => ({
      ...img,
      url: normalizeImagePath(img.url),
    }));
  }

  public isAdmin(): boolean {
    return false; // Deprecated: Real authentication is server-side via /api/auth/me
  }

  // Setters & Actions
  public setActivePhoto(photo: string) {
    this.activePhoto = photo;
    this.saveToStorage();
  }

  public updateCurrently(updated: Partial<CurrentlyStatus>) {
    this.currently = { ...this.currently, ...updated };
    this.saveToStorage();
  }

  public addCustomImage(img: { id: string; url: string; title: string; category: string }) {
    this.customImages.unshift(img);
    this.saveToStorage();
  }

  public deleteCustomImage(id: string) {
    this.customImages = this.customImages.filter((img) => img.id !== id);
    this.saveToStorage();
  }

  public addBlog(blog: Omit<BlogPost, 'id'>) {
    const newBlog: BlogPost = {
      ...blog,
      id: 'blog-' + Date.now(),
    };
    this.blogs.unshift(newBlog);
    this.saveToStorage();
    return newBlog;
  }

  public updateBlog(id: string, updated: Partial<BlogPost>) {
    this.blogs = this.blogs.map((b) => (b.id === id ? { ...b, ...updated } : b));
    this.saveToStorage();
  }

  public deleteBlog(id: string) {
    this.blogs = this.blogs.filter((b) => b.id !== id);
    this.saveToStorage();
  }

  public addComment(comment: Omit<BlogComment, 'id' | 'timestamp' | 'status'>) {
    const newComment: BlogComment = {
      ...comment,
      id: 'comm-' + Date.now(),
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'approved',
    };
    this.comments.unshift(newComment);
    this.saveToStorage();
    return newComment;
  }

  public updateCommentStatus(id: string, status: 'approved' | 'pending') {
    this.comments = this.comments.map((c) => (c.id === id ? { ...c, status } : c));
    this.saveToStorage();
  }

  public deleteComment(id: string) {
    this.comments = this.comments.filter((c) => c.id !== id);
    this.saveToStorage();
  }

  public addBook(book: Omit<BookItem, 'id'>) {
    const newBook: BookItem = { ...book, id: 'book-' + Date.now() };
    this.books.unshift(newBook);
    this.saveToStorage();
  }

  public deleteBook(id: string) {
    this.books = this.books.filter((b) => b.id !== id);
    this.saveToStorage();
  }

  public addPaper(paper: Omit<PaperItem, 'id'>) {
    const newPaper: PaperItem = { ...paper, id: 'paper-' + Date.now() };
    this.papers.unshift(newPaper);
    this.saveToStorage();
  }

  public deletePaper(id: string) {
    this.papers = this.papers.filter((p) => p.id !== id);
    this.saveToStorage();
  }

  public addResearchItem(item: Omit<ResearchItem, 'id'>) {
    const newItem: ResearchItem = { ...item, id: 'res-' + Date.now() };
    this.research.unshift(newItem);
    this.saveToStorage();
  }

  public updateResearchItem(id: string, updated: Partial<ResearchItem>) {
    this.research = this.research.map((r) => (r.id === id ? { ...r, ...updated } : r));
    this.saveToStorage();
  }

  public deleteResearchItem(id: string) {
    this.research = this.research.filter((r) => r.id !== id);
    this.saveToStorage();
  }

  public addMovie(movie: Omit<MovieItem, 'id'>) {
    const newMovie: MovieItem = { ...movie, id: 'mov-' + Date.now() };
    this.movies.unshift(newMovie);
    this.saveToStorage();
  }

  public deleteMovie(id: string) {
    this.movies = this.movies.filter((m) => m.id !== id);
    this.saveToStorage();
  }

  // Backup & Restore
  public exportDataJSON(): string {
    return JSON.stringify(
      {
        projects: this.projects,
        blogs: this.blogs,
        comments: this.comments,
        research: this.research,
        books: this.books,
        papers: this.papers,
        movies: this.movies,
        experience: this.experience,
        skills: this.skills,
        currently: this.currently,
        activePhoto: this.activePhoto,
        customImages: this.customImages,
      },
      null,
      2
    );
  }

  public importDataJSON(jsonStr: string): boolean {
    try {
      const data = JSON.parse(jsonStr);
      if (data.projects) this.projects = data.projects;
      if (data.blogs) this.blogs = data.blogs;
      if (data.comments) this.comments = data.comments;
      if (data.books) this.books = data.books;
      if (data.papers) this.papers = data.papers;
      if (data.movies) this.movies = data.movies;
      if (data.research) this.research = data.research;
      if (data.currently) this.currently = data.currently;
      if (data.activePhoto) this.activePhoto = data.activePhoto;
      if (data.customImages) this.customImages = data.customImages;
      this.saveToStorage();
      return true;
    } catch (e) {
      console.error('Invalid JSON import format', e);
      return false;
    }
  }

  public resetToDefaults() {
    this.projects = INITIAL_PROJECTS;
    this.blogs = INITIAL_BLOGS;
    this.comments = INITIAL_COMMENTS;
    this.research = INITIAL_RESEARCH;
    this.books = INITIAL_BOOKS;
    this.papers = INITIAL_PAPERS;
    this.movies = INITIAL_MOVIES;
    this.experience = INITIAL_EXPERIENCE;
    this.skills = INITIAL_SKILLS;
    this.currently = INITIAL_CURRENTLY;
    this.activePhoto = '/divya-profile.png';
    this.customImages = [];
    this.saveToStorage();
  }
}

export const portfolioStore = new PortfolioStore();
