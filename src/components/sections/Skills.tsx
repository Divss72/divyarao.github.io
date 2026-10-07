import React from 'react';

export const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: '</>',
      iconBg: 'bg-blue-100 text-blue-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-100',
      skills: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'Java', 'C++', 'SQL'],
    },
    {
      title: 'Frontend & UI Engineering',
      icon: '🎨',
      iconBg: 'bg-emerald-100 text-emerald-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Radix UI', 'HTML5 / CSS3'],
    },
    {
      title: 'Backend & Architecture',
      icon: '⚡',
      iconBg: 'bg-indigo-100 text-indigo-600',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      skills: ['Node.js', 'Express.js', 'Django', 'RESTful API Design', 'JWT Auth', 'Middleware', 'Zod'],
    },
    {
      title: 'Databases & Storage',
      icon: '🗄️',
      iconBg: 'bg-amber-100 text-amber-600',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      skills: ['MongoDB (Indexing & Aggs)', 'PostgreSQL', 'MySQL', 'Vector Databases'],
    },
    {
      title: 'AI, ML & Data',
      icon: '🤖',
      iconBg: 'bg-rose-100 text-rose-600',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-100',
      skills: ['Agentic AI', 'RAG Systems', 'LLM Prompting', 'NLP (NLTK)', 'OpenCV', 'Pandas / NumPy', 'Scikit-learn'],
    },
    {
      title: 'DevOps & Cloud Infra',
      icon: '☁️',
      iconBg: 'bg-sky-100 text-sky-600',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-100',
      skills: ['Docker', 'Kubernetes', 'Git & GitHub', 'Linux', 'Railway', 'Cloudflare Pages', 'Vercel'],
    },
    {
      title: 'Security & System Resilience',
      icon: '🛡️',
      iconBg: 'bg-red-100 text-red-600',
      badgeBg: 'bg-red-50 text-red-700 border-red-100',
      skills: ['Autonomous Fault Recovery', '7-Layer Security Stack', 'Helmet Middleware', 'Rate Limiting', 'Data Sanitization (NoSQL/XSS)'],
    },
  ];

  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto border-b border-slate-200">
      <div className="mb-14">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2 block">
          Technical Toolkit
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Skills & Technologies
        </h2>
        <p className="text-slate-600 mt-2 text-base max-w-2xl">
          A structured overview of programming languages, libraries, databases, and engineering workflows I work with.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat, idx) => (
          <div
            key={cat.title}
            className={`card-clean p-6 bg-white border border-slate-200 rounded-xl hover:shadow-lg transition ${
              idx === 6 ? 'md:col-span-2 lg:col-span-3' : ''
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-lg ${cat.iconBg} flex items-center justify-center font-bold text-sm`}>
                {cat.icon}
              </div>
              <h3 className="font-display font-bold text-slate-900 text-base">{cat.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium ${cat.badgeBg}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
