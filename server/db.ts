import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  familiarity?: string;
  technologies?: string[];
  description?: string;
  displayOrder: number;
  published: boolean;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  type: string;
  description: string;
  problem: string;
  solution: string;
  myRole: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  galleryImages: { url: string; caption: string }[];
  featured: boolean;
  status: 'PRODUCTION' | 'ONLINE' | 'ACTIVE' | 'ARCHIVED';
  published: boolean;
  displayOrder: number;
  date: string;
}

export interface ExperienceRecord {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: string;
  badge: string;
  highlights: string[];
  current: boolean;
  displayOrder: number;
  published: boolean;
}

export interface ResearchRecord {
  id: string;
  slug: string;
  title: string;
  type: 'Research Interest' | 'Paper Reading' | 'Experiment' | 'Research Question' | 'Technical Investigation';
  topic: string;
  question: string;
  whyInterested: string;
  whatReading: string;
  whatTesting: string;
  whatFound: string;
  whatStillDontKnow: string;
  status: 'Exploring' | 'Reading Papers' | 'Prototyping' | 'Analyzing Results';
  tags: string[];
  references?: string;
  githubUrl?: string;
  published: boolean;
  displayOrder: number;
  date: string;
}

export interface BookRecord {
  id: string;
  title: string;
  author: string;
  cover?: string;
  category: string;
  status: 'Reading' | 'Completed' | 'Want to Read' | 'Revisiting';
  rating?: number;
  note: string;
  takeaway?: string;
  favoriteQuote?: string;
  published: boolean;
  displayOrder: number;
}

export interface HobbyRecord {
  id: string;
  title: string;
  category: 'books' | 'basketball' | 'doodling' | 'running' | 'sketching' | 'movies';
  description: string;
  personalStory: string;
  imageUrl?: string;
  relatedLink?: string;
  displayOrder: number;
  published: boolean;
}

export interface BlogRecord {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  publishDate: string;
  readTime: string;
  draft: boolean;
  seoTitle?: string;
  seoDescription?: string;
  author: string;
  updatedDate: string;
}

export interface CommentRecord {
  id: string;
  blogSlug: string;
  authorName: string;
  authorEmail?: string;
  content: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected' | 'spam';
}

export interface MediaRecord {
  id: string;
  title: string;
  category: string;
  url: string;
  uploadedAt: string;
}

export interface SettingsRecord {
  currently: {
    reading: string;
    readingAuthor: string;
    exploring: string;
    building: string;
    obsessedWith: string;
    debuggingNote: string;
    coffeeStatus: string;
  };
  siteMetadata: {
    title: string;
    description: string;
    author: string;
    location: string;
    statusBadge: string;
    activePhoto: string;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    instagram: string;
  };
}

export interface DatabaseSchema {
  skills: SkillItem[];
  projects: ProjectItem[];
  experience: ExperienceRecord[];
  research: ResearchRecord[];
  books: BookRecord[];
  hobbies: HobbyRecord[];
  blogs: BlogRecord[];
  comments: CommentRecord[];
  media: MediaRecord[];
  settings: SettingsRecord;
}

const DEFAULT_DB: DatabaseSchema = {
  skills: [
    {
      id: 'skill-01',
      name: 'Agentic AI & LLMs',
      category: 'AI / ML',
      familiarity: 'Core Interest',
      technologies: ['Tool schemas', 'ReAct', 'Prompt evaluation', 'Context selection'],
      description: 'Building multi-step reasoning loops, structured Zod schemas, and agent failure recovery.',
      displayOrder: 1,
      published: true,
    },
    {
      id: 'skill-02',
      name: 'RAG & Vector Retrieval',
      category: 'AI / ML',
      familiarity: 'Active Exploration',
      technologies: ['Vector Databases', 'Chunking', 'Embeddings', 'Context noise'],
      description: 'Understanding how distractor noise influences generation and testing hybrid search.',
      displayOrder: 2,
      published: true,
    },
    {
      id: 'skill-03',
      name: 'React & TypeScript',
      category: 'Frontend',
      familiarity: 'Proficient',
      technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'Canvas'],
      description: 'Crafting responsive, editorial user interfaces, custom Canvas animations, and web applications.',
      displayOrder: 3,
      published: true,
    },
    {
      id: 'skill-04',
      name: 'Node.js & Express',
      category: 'Backend',
      familiarity: 'Proficient',
      technologies: ['REST APIs', 'JWT Auth', 'Middleware', 'Bcrypt', 'Zod validation'],
      description: 'Building secure RESTful backend APIs, auth pipelines, and data models.',
      displayOrder: 4,
      published: true,
    },
    {
      id: 'skill-05',
      name: 'MongoDB & Database Optimization',
      category: 'Databases',
      familiarity: 'Working Knowledge',
      technologies: ['Mongoose', 'Compound Indexes', 'Cursor Pagination', 'Profiling'],
      description: 'Schema modeling, index analysis with explain(), and query performance tuning.',
      displayOrder: 5,
      published: true,
    },
    {
      id: 'skill-06',
      name: 'Java & Spring Boot',
      category: 'Backend',
      familiarity: 'Coursework & Projects',
      technologies: ['Spring Boot', 'REST Controllers', 'Prometheus client', 'OOP'],
      description: 'Building backend services, studying systems observability, and metrics gathering.',
      displayOrder: 6,
      published: true,
    },
    {
      id: 'skill-07',
      name: 'Python & Data Tools',
      category: 'Languages',
      familiarity: 'Working Knowledge',
      technologies: ['Python 3', 'Pandas', 'NumPy', 'Scikit-learn', 'OpenCV'],
      description: 'Scripting, machine learning fundamentals, and computer vision experiments.',
      displayOrder: 7,
      published: true,
    },
    {
      id: 'skill-08',
      name: 'Docker & Deployment',
      category: 'Cloud / Deployment',
      familiarity: 'Practical Tools',
      technologies: ['Docker', 'Git', 'GitHub Actions', 'Cloudflare Pages', 'Railway'],
      description: 'Containerizing services and configuring CI/CD edge deployments.',
      displayOrder: 8,
      published: true,
    },
  ],
  projects: [
    {
      id: 'proj-01',
      slug: 'devposting',
      title: 'DevPosting',
      subtitle: 'Developer Community & Knowledge Ecosystem',
      category: 'Full-Stack Development',
      type: 'MERN Stack Community Platform',
      description: 'A full-stack community blogging platform built with React, Node.js, Express, and MongoDB. Features tag taxonomies, community rants, JWT authentication, and compound indexing for feed queries.',
      problem: 'Building a responsive developer platform that handles multi-tag filtering without sluggish full-table database scans under increasing content loads.',
      solution: 'Constructed an Express REST API with compound MongoDB indexing ({ tags: 1, createdAt: -1 }), cursor-based timestamp pagination, and strictly validated Zod contracts.',
      myRole: 'Full Stack Engineer & Designer',
      techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Zod', 'Docker', 'Railway', 'Cloudflare Pages'],
      githubUrl: 'https://github.com/Divss72/devposting-backend',
      liveUrl: 'https://devposting.pages.dev',
      image: '/devposting-chronicles.png',
      galleryImages: [
        { url: '/devposting-chronicles.png', caption: 'DevPosting Community Chronicles Feed' },
        { url: '/devposting-topics.png', caption: 'Topic Taxonomy & Categorized Feed' },
        { url: '/devposting-rants.png', caption: 'Dev Rants Discussion Stream' },
      ],
      featured: true,
      status: 'ONLINE',
      published: true,
      displayOrder: 1,
      date: '2024',
    },
    {
      id: 'proj-02',
      slug: 'algolabs',
      title: 'AlgoLabs',
      subtitle: 'Interactive DSA Visualization & Algorithm Platform',
      category: 'Algorithms & Learning',
      type: 'Computer Science Visualizer & Sandbox',
      description: 'An interactive sandbox to master Data Structures & Algorithms visually with step-by-step visual execution, custom array inputs, and interactive theory playbooks.',
      problem: 'Static pseudocode and abstract textbook diagrams make algorithmic intuition difficult to grasp when learning pointers, state mutation, and recursion trees.',
      solution: 'Built a reactive Canvas/SVG pipeline that animates array partition steps, binary tree traversals, and dynamic programming tables frame-by-frame with interactive scrubbing.',
      myRole: 'Frontend Developer & Visualizer Designer',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Canvas / SVG', 'Cloudflare Pages', 'Vite'],
      githubUrl: 'https://github.com/Divss72/Algo--visualization',
      liveUrl: 'https://algolabs-frontend.pages.dev',
      image: '/project-algolabs-real.png',
      galleryImages: [
        { url: '/project-algolabs-real.png', caption: 'AlgoLabs Interactive Sorting Sandbox Interface' },
        { url: '/project-algolabs.jpg', caption: 'Binary Search & Tree Traversal Visual Execution' },
      ],
      featured: true,
      status: 'ONLINE',
      published: true,
      displayOrder: 2,
      date: '2024',
    },
    {
      id: 'proj-03',
      slug: 'autoheal-j',
      title: 'AutoHeal-J',
      subtitle: 'Microservice Telemetry & Anomaly Restart Prototype',
      category: 'Systems & Observability',
      type: 'Observability & Recovery Experiment',
      description: 'An experimental dashboard and monitoring prototype built with Spring Boot, testing Prometheus metric scraping and automated container restarts under simulated chaos.',
      problem: 'Understanding how services fail in practice: wanting to test what happens when an endpoint begins throwing 500 errors or leaks memory under load.',
      solution: 'Built a Java Spring Boot controller connected to Prometheus that samples service health and triggers container restarts via Kubernetes client APIs when sustained error thresholds are crossed.',
      myRole: 'Backend Developer',
      techStack: ['Java', 'Spring Boot', 'Kubernetes', 'Prometheus', 'REST APIs', 'Docker'],
      githubUrl: 'https://github.com/Divss72/Java_AutoHeal-J',
      image: '/project-autoheal-real.png',
      galleryImages: [
        { url: '/project-autoheal-real.png', caption: 'AutoHeal-J Live Telemetry Console' },
      ],
      featured: true,
      status: 'ACTIVE',
      published: true,
      displayOrder: 3,
      date: '2024',
    },
  ],
  experience: [
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
      current: true,
      displayOrder: 1,
      published: true,
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
      current: false,
      displayOrder: 2,
      published: true,
    },
    {
      id: 'exp-03',
      role: 'National Hackathon Finalist',
      organization: 'National Hackathons',
      period: '2024',
      location: 'India',
      type: 'hackathon',
      badge: 'Finalist',
      highlights: [
        'Recognized for building working full-stack and systems prototypes under 24-36 hour hackathon sprints.',
        'Built live telemetry and interactive web dashboards alongside teammates under time constraints.',
      ],
      current: false,
      displayOrder: 3,
      published: true,
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
        'Completed verified technical certifications across development and cloud fundamentals.',
      ],
      current: true,
      displayOrder: 4,
      published: true,
    },
  ],
  research: [
    {
      id: 'res-01',
      slug: 'context-degradation-long-context-llms',
      title: 'Context Degradation & Retrieval in Long-Context LLMs',
      type: 'Research Interest',
      topic: 'Long-Context LLMs',
      question: 'How does model recall change when relevant facts are placed in the middle versus the ends of long contexts, and how does retrieval compare?',
      whyInterested: 'I noticed in my own experiments that simply giving a model a 32k or 128k prompt doesn’t mean it actually uses all that context accurately. I want to understand where attention degrades.',
      whatReading: 'Nelson Liu et al. "Lost in the Middle", FlashAttention papers, and benchmarks on long-context evaluations.',
      whatTesting: 'Testing variable document position distributions using small synthetic test sets with different placement offsets (start, 25%, 50%, 75%, end).',
      whatFound: 'Initial observations reflect the classic U-shaped curve: facts placed right after the system prompt or near the final query are retrieved far more reliably than facts nestled in the middle third.',
      whatStillDontKnow: 'At what token threshold does chunking + reranking clearly beat feeding the entire raw document? How do different prompt structures mitigate the dip?',
      status: 'Exploring',
      tags: ['Long-Context LLMs', 'Attention Behavior', 'Context Degradation', 'Retrieval'],
      references: 'https://arxiv.org/abs/2307.03172',
      published: true,
      displayOrder: 1,
      date: '2024',
    },
    {
      id: 'res-02',
      slug: 'agentic-ai-feedback-loops-and-failure-modes',
      title: 'Agentic Tool Loops: Failure Modes & Self-Correction',
      type: 'Experiment',
      topic: 'Agentic AI',
      question: 'Why do LLM agents get stuck in repetitive failure loops when tools return unexpected errors, and how can we prevent endless reflection?',
      whyInterested: 'When building agent experiments, I kept watching models repeatedly retry the exact same failing action while saying "Let me try that again". I want to understand what makes agent planning fragile.',
      whatReading: 'ReAct (Yao et al.), Reflexion (Shinn et al.), and literature on bounded state machines and tool validation schemas.',
      whatTesting: 'Setting up small agent loops with mocked external tools and introducing deterministic guardrails (error counters, AST checks, hard termination caps).',
      whatFound: 'Providing structured, typed error payloads rather than raw stack traces helps models adjust parameters, but bounded loop dampeners are necessary to stop infinite retries.',
      whatStillDontKnow: 'How to best balance giving the agent autonomy to retry versus cutting off the loop early without abandoning legitimate problem-solving.',
      status: 'Prototyping',
      tags: ['Agentic AI', 'Tool Use', 'Feedback Loops', 'Reliability'],
      references: 'https://arxiv.org/abs/2210.03629',
      published: true,
      displayOrder: 2,
      date: '2024',
    },
    {
      id: 'res-03',
      slug: 'rag-retrieval-noise-and-context-selection',
      title: 'RAG Retrieval Noise & Context Selection',
      type: 'Paper Reading',
      topic: 'RAG',
      question: 'How much does irrelevant retrieved context hurt LLM answer quality, and how can we select only what actually helps?',
      whyInterested: 'Naive top-k vector search often brings in noisy or tangentially related text chunks. I want to see how much irrelevant chunks confuse the model’s reasoning.',
      whatReading: 'Self-RAG (Asai et al.), contextual compression techniques, and hybrid BM25 + dense vector ranking papers.',
      whatTesting: 'Evaluating Q&A accuracy when injecting varying ratios of distractor chunks alongside the ground truth answer snippet.',
      whatFound: 'Even 2-3 distractor chunks can introduce hallucinations or cause the model to hedge unnecessarily, even when the exact answer was in chunk #1.',
      whatStillDontKnow: 'What is the computational trade-off of running a local cross-encoder reranker versus filtering with a lighter heuristic before prompt assembly?',
      status: 'Reading Papers',
      tags: ['RAG', 'Retrieval Quality', 'Vector DBs', 'Context Selection'],
      references: 'https://arxiv.org/abs/2310.11511',
      published: true,
      displayOrder: 3,
      date: '2024',
    },
  ],
  books: [
    {
      id: 'book-01',
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      category: 'Distributed Systems & Data',
      status: 'Reading',
      rating: 5,
      note: 'An incredible breakdown of storage engines, replication, consensus, and how data systems actually behave under the hood. It changed how I think about databases and caching.',
      takeaway: 'Reliability is about continuing to work correctly even when individual components fail.',
      favoriteQuote: 'Reliability is continuing to work correctly even when things go wrong.',
      published: true,
      displayOrder: 1,
    },
    {
      id: 'book-02',
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      category: 'Cognitive Science',
      status: 'Completed',
      rating: 5,
      note: 'Fascinating perspective on System 1 (intuitive, fast) and System 2 (deliberate, effortful) cognitive modes. It gave me a cool mental model for comparing fast heuristic retrieval with deliberate agent reasoning.',
      takeaway: 'Our intuition is often overconfident; deliberate checking is worth the latency.',
      favoriteQuote: 'Nothing in life is as important as you think it is, while you are thinking about it.',
      published: true,
      displayOrder: 2,
    },
    {
      id: 'book-03',
      title: 'Deep Learning',
      author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
      category: 'Machine Learning',
      status: 'Reading',
      rating: 5,
      note: 'Working through the mathematical foundations: linear algebra, gradient-based optimization, and neural network mechanics.',
      takeaway: 'Understanding the linear algebra makes transformer architectures feel concrete rather than magical.',
      published: true,
      displayOrder: 3,
    },
    {
      id: 'book-04',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      category: 'Software Craftsmanship',
      status: 'Completed',
      rating: 4.5,
      note: 'Helped me write cleaner functions, pay attention to descriptive variable naming, and take pride in readable code.',
      takeaway: 'Code is read far more often than it is written.',
      favoriteQuote: 'Truth can only be found in one place: the code.',
      published: true,
      displayOrder: 4,
    },
  ],
  hobbies: [
    {
      id: 'hobby-01',
      title: 'Reading Books',
      category: 'books',
      description: 'Physical books on distributed systems, cognitive psychology, and habits always sit on my desk.',
      personalStory: 'I read physical books to step away from screens and absorb foundational concepts deeply.',
      displayOrder: 1,
      published: true,
    },
    {
      id: 'hobby-02',
      title: 'Basketball Free-Throws',
      category: 'basketball',
      description: 'Shooting hoops and court rhythm after long hours at the keyboard.',
      personalStory: 'There is something deeply centering about shooting free throws. Focus on arc, release, and rhythm.',
      displayOrder: 2,
      published: true,
    },
    {
      id: 'hobby-03',
      title: 'Running',
      category: 'running',
      description: 'Morning kilometers as a physical metaphor for learning and endurance.',
      personalStory: 'You don\'t sprint through a hard problem; you find a steady tempo and keep moving forward.',
      displayOrder: 3,
      published: true,
    },
    {
      id: 'hobby-04',
      title: 'Doodling & Sketching',
      category: 'sketching',
      description: 'Notebook diagrams, architecture flowcharts, and loose pen sketches.',
      personalStory: 'Putting actual ink on paper helps clarify messy ideas before writing a single line of code.',
      displayOrder: 4,
      published: true,
    },
    {
      id: 'hobby-05',
      title: '35mm Cinema & Sci-Fi',
      category: 'movies',
      description: 'Sci-fi and philosophical cinema — Interstellar, The Matrix, Ex Machina, Whiplash, and Oppenheimer.',
      personalStory: 'Great films teach visual composition, tension, and narrative pacing that influence how I design software.',
      displayOrder: 5,
      published: true,
    },
  ],
  blogs: [
    {
      id: 'blog-01',
      slug: 'architecting-agentic-workflows',
      title: 'What I Learned Building Agent Loops: Moving Past Static Prompts',
      excerpt: 'Notes on why single-turn prompts fall apart on multi-step tasks, how tool validation helps, and how to stop models from getting stuck in reflection cycles.',
      content: `### What Happened When I Tried Building AI Agents\n\nWhen I first started experimenting with LLMs, I did what almost everyone does: I tried to solve everything with longer prompts. Add five examples, tell the model to "think step by step," and hope for the best.\n\nThat works well for drafting an email or summarizing an article. But the moment you try to connect a model to a database, ask it to look up documentation, or have it debug a piece of code across several steps, single-turn prompts quickly break.\n\n### What Actually Helped\n\n1. **Strictly Typed Tool Contracts:** Using Zod schemas so that if the model invents a parameter name, the execution engine catches it immediately and sends a clear error message back to the model.\n2. **Explicit Observation Formatting:** Returning structured summaries of tool results instead of raw giant JSON dumps.\n3. **Loop Dampeners:** Setting hard limits on consecutive identical errors to stop infinite retries.\n\nI'm still exploring how to balance giving an agent enough freedom to recover while keeping it bounded enough not to burn tokens in a loop.`,
      category: 'AI & LLMs',
      tags: ['Agentic AI', 'LLMs', 'Tool Use', 'Reflections'],
      publishDate: 'Oct 06, 2026',
      readTime: '6 min read',
      draft: false,
      seoTitle: 'What I Learned Building Agent Loops — Divya Rao',
      seoDescription: 'Observations on agent loops, tool validation, and avoiding repetitive failure cycles when building with LLMs.',
      author: 'Divya Rao',
      updatedDate: '2026-10-06',
    },
    {
      id: 'blog-02',
      slug: 'slashing-feed-latency-compound-indexing',
      title: 'What Happened When I Added Compound Indexes to DevPosting',
      excerpt: 'How profiling queries with explain() and adding compound MongoDB indexes brought our feed query time down.',
      content: `### When the Feed Started Feeling Sluggish\n\nWhile building **DevPosting**, our MERN community platform, everything was fast with 20 dummy posts. But once I seeded a few thousand mock articles and started filtering by multiple tags and sorting by creation date, the main feed endpoint started taking over 400ms.\n\nRunning \`explain("executionStats")\` in the MongoDB shell showed what was wrong: **COLLSCAN** (full collection scan). MongoDB was scanning thousands of documents in memory just to return 15 paginated cards!\n\n### What Fixed It\n\n1. **Cursor-Based Pagination:** Instead of using \`.skip(page * limit)\` (which still scans previous documents), switching to timestamp pointers (\`createdAt < lastSeenDate\`).\n2. **Compound Index:** Adding a composite index on \`{ tags: 1, createdAt: -1 }\`.\n\nThe documents examined dropped from thousands to the exact 15 returned. Profiling database queries is one of the most practical skills any web developer can learn.`,
      category: 'Web Engineering',
      tags: ['MongoDB', 'Performance', 'Node.js', 'Express', 'MERN'],
      publishDate: 'Sep 15, 2026',
      readTime: '5 min read',
      draft: false,
      seoTitle: 'Compound Indexes in DevPosting — Divya Rao',
      seoDescription: 'A practical guide to database indexing, cursor-based pagination, and feed performance in MongoDB.',
      author: 'Divya Rao',
      updatedDate: '2026-09-15',
    },
    {
      id: 'blog-03',
      slug: 'building-autoheal-j-monitoring',
      title: 'Building AutoHeal-J: Notes on Prometheus Telemetry and Container Restarts',
      excerpt: 'What I learned experimenting with Prometheus metrics in Java Spring Boot and triggering automated container restarts under simulated load.',
      content: `### Why I Wanted to Build This\n\nI wanted to understand how systems monitoring actually works. In class, we talk about uptime and health checks, but I wanted to see what happens when a service actually begins to throw 500 errors in real time.\n\nSo I built **AutoHeal-J** as an exploration: a Spring Boot application that polls Prometheus metrics for a small set of mock services, visualizes the state on a dashboard, and automatically triggers pod restarts if a service crosses a sustained error threshold.\n\n### Key Lessons\n\n1. **Hysteresis / Cooldowns are Essential:** A single slow database query shouldn't trigger a reboot! Requiring errors to persist across consecutive ticks prevented false alarms.\n2. **Metrics Overhead:** Polling too aggressively spikes CPU. Finding a balanced interval was key.`,
      category: 'Systems Observability',
      tags: ['Java', 'Spring Boot', 'Prometheus', 'Monitoring'],
      publishDate: 'Sep 28, 2026',
      readTime: '6 min read',
      draft: false,
      seoTitle: 'Building AutoHeal-J — Divya Rao',
      seoDescription: 'Notes on Prometheus telemetry, threshold evaluation, and automated service restarts in Java Spring Boot.',
      author: 'Divya Rao',
      updatedDate: '2026-09-28',
    },
  ],
  comments: [
    {
      id: 'comm-01',
      blogSlug: 'architecting-agentic-workflows',
      authorName: 'Rohan Sharma',
      authorEmail: 'rohan.dev@example.com',
      content: 'The point about loop dampeners preventing infinite retries is so true. We faced the exact same cycle in our LangChain scripts. Great write-up!',
      timestamp: 'Oct 07, 2026, 11:24 AM',
      status: 'approved',
    },
  ],
  media: [
    { id: 'media-01', title: 'Profile Portrait 01', category: 'Profile', url: 'me1.jpeg', uploadedAt: '2026-10-01' },
    { id: 'media-02', title: 'Profile Portrait 02', category: 'Profile', url: 'me.jpg', uploadedAt: '2026-10-01' },
    { id: 'media-03', title: 'Profile Portrait 03', category: 'Profile', url: 'm.jpeg', uploadedAt: '2026-10-01' },
    { id: 'media-04', title: 'DevPosting Chronicles', category: 'Project', url: 'devposting-chronicles.png', uploadedAt: '2026-10-01' },
    { id: 'media-05', title: 'AlgoLabs Real', category: 'Project', url: 'project-algolabs-real.png', uploadedAt: '2026-10-01' },
    { id: 'media-06', title: 'AutoHeal-J Real', category: 'Project', url: 'project-autoheal-real.png', uploadedAt: '2026-10-01' },
  ],
  settings: {
    currently: {
      reading: 'Designing Data-Intensive Applications',
      readingAuthor: 'Martin Kleppmann',
      exploring: 'Context degradation & attention behavior in long-context models',
      building: 'Full-stack MERN platforms & interactive agentic experiments',
      obsessedWith: 'How retrieval changes what a language model actually knows',
      debuggingNote: 'Usually tracking down a state hydration mismatch or query bottleneck',
      coffeeStatus: 'Fresh brew • 2403 vibe',
    },
    siteMetadata: {
      title: 'Divya Rao — Computer Science Student, Developer & AI Explorer',
      description: 'Personal digital world of Divya Rao. Building full-stack software, exploring AI, reading systems books, running, and sketching.',
      author: 'Divya Rao',
      location: 'Chandigarh, India',
      statusBadge: 'Available for SWE Roles, fullstack projects, mern stack projects',
      activePhoto: 'divya-profile.png',
    },
    socialLinks: {
      github: 'https://github.com/Divss72',
      linkedin: 'https://www.linkedin.com/in/divya-rao-975a3b32a/',
      email: 'divyarao2403@gmail.com',
      instagram: 'https://www.instagram.com/divsss62',
    },
  },
};

export class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.load();
  }

  private load(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error('Failed to read db.json, falling back to defaults:', err);
    }
    // Write defaults
    this.save(DEFAULT_DB);
    return DEFAULT_DB;
  }

  private save(data: DatabaseSchema) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
      console.error('Failed to write db.json:', err);
    }
  }

  public get(): DatabaseSchema {
    return this.data;
  }

  public update(updater: (draft: DatabaseSchema) => void): DatabaseSchema {
    updater(this.data);
    this.save(this.data);
    return this.data;
  }
}

export const db = new Database();
