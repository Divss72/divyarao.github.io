import React, { useState } from 'react';

export const FeaturedProjects: React.FC = () => {
  const [devpostingImg, setDevpostingImg] = useState<string>('/devposting-chronicles.png');

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto border-b border-slate-200">
      <div className="mb-14">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 block">
          Portfolio Showcase
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Featured Projects
        </h2>
        <p className="text-slate-600 mt-2 text-base max-w-2xl">
          Real software platforms built with modern web technologies, self-healing architectures, and algorithm visualizers.
        </p>
      </div>

      <div className="space-y-16">
        {/* Project 1: DevPosting */}
        <div className="card-clean p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-md">
                <div className="aspect-video w-full bg-slate-950 overflow-hidden relative">
                  <img
                    src={devpostingImg}
                    alt="DevPosting Real Screenshot"
                    className="w-full h-full object-cover object-top transition duration-300"
                  />
                </div>
              </div>

              {/* View Switchers */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-slate-500 mr-2">Views:</span>
                <button
                  onClick={() => setDevpostingImg('/devposting-chronicles.png')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                    devpostingImg === '/devposting-chronicles.png'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Chronicles (Home)
                </button>
                <button
                  onClick={() => setDevpostingImg('/devposting-topics.png')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                    devpostingImg === '/devposting-topics.png'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Explore Topics
                </button>
                <button
                  onClick={() => setDevpostingImg('/devposting-rants.png')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                    devpostingImg === '/devposting-rants.png'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Dev Rants
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700">
                    Full Stack Web
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700">
                    Live
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">DevPosting</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Developer blogging & knowledge platform featuring chronicled blogging, topics explore engine, dev-rants, and authentication.
                </p>

                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Key Highlights</h4>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>15+ REST endpoints with centralized middleware and query pagination.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>4 compound-indexed MongoDB schemas cutting feed latency by <strong>~40%</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>7-layer security system (JWT, bcrypt, Helmet, rate-limiting, and XSS sanitization).</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Docker', 'Railway'].map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
                <a
                  href="https://devposting.pages.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>Live: devposting.pages.dev</span>
                  <span>↗</span>
                </a>
                <a
                  href="https://github.com/Divss72/devposting-backend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>GitHub</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Project 2: AutoHeal-J */}
        <div className="card-clean p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-md">
                <div className="aspect-video w-full bg-slate-100 overflow-hidden relative">
                  <img
                    src="/project-autoheal-real.png"
                    alt="AutoHeal-J Real Command Center"
                    className="w-full h-full object-cover object-top hover:scale-[1.02] transition duration-300"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                    Systems & Resilience
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-700">
                    Java / Spring
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">AutoHeal-J</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Autonomous Microservice Resilience & Recovery Command Center monitoring microservice fleets with automated anomaly remediation.
                </p>

                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Key Highlights</h4>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>Monitors microservice fleets (user-service, order-service, payment-service, gateway-service).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>Automated self-healing engine triggering instant restarts and circuit breakers.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>Sub-3s Prometheus telemetry polling CPU load, memory footprints, and latency.</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {['Java', 'Spring Boot', 'Kubernetes', 'Prometheus', 'REST APIs'].map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/Divss72/Java_AutoHeal-J"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>GitHub Repository</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Project 3: AlgoLabs */}
        <div className="card-clean p-6 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-md">
                <div className="aspect-video w-full bg-slate-950 overflow-hidden relative">
                  <img
                    src="/project-algolabs-real.png"
                    alt="AlgoLabs Real Screenshot"
                    className="w-full h-full object-cover object-top hover:scale-[1.02] transition duration-300"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-violet-100 text-violet-700">
                    Interactive Learning
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700">
                    Live
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">AlgoLabs</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Interactive sandbox to master Data Structures & Algorithms visually with step-by-step visual execution and learning playbooks.
                </p>

                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Key Highlights</h4>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-violet-600 font-bold">•</span>
                      <span>Visual execution for Sorting, Binary Trees, Arrays, Stacks, Queues, and Graphs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-600 font-bold">•</span>
                      <span>Interactive learning modules with course progression tracking.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-600 font-bold">•</span>
                      <span>High-performance canvas animations deployed on Cloudflare Pages global edge.</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {['React', 'TypeScript', 'Tailwind CSS', 'Canvas / SVG', 'Cloudflare Pages'].map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
                <a
                  href="https://algolabs-frontend.pages.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-violet-600 text-white font-semibold text-xs hover:bg-violet-700 transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>Live: algolabs-frontend.pages.dev</span>
                  <span>↗</span>
                </a>
                <a
                  href="https://github.com/Divss72/Algo--visualization"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>GitHub</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
