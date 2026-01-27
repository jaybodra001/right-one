
import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Users, Briefcase, Search, Sparkles } from 'lucide-react';

export const Services: React.FC = () => {
  const services = [
    {
      title: "Recruitment",
      desc: "Full-cycle hiring for junior to mid-level roles. We handle job posting to final selection.",
      icon: <Users className="w-[1.575rem] h-[1.575rem]" />,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Staffing",
      desc: "Flexible staffing for project-based needs. Get professionals exactly when you need them.",
      icon: <Briefcase className="w-[1.575rem] h-[1.575rem]" />,
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      title: "Talent Sourcing",
      desc: "Headhunting passive candidates. We find the hidden gems for your niche roles.",
      icon: <Search className="w-[1.575rem] h-[1.575rem]" />,
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "HR Consulting",
      desc: "Process optimization and culture building for growing companies looking to scale.",
      icon: <Sparkles className="w-[1.575rem] h-[1.575rem]" />,
      color: "bg-rose-50 text-rose-600"
    }
  ];

  return (
    <section id="services" className="py-[4.2rem] lg:py-[5.25rem] bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 text-center mb-[3.15rem]">
        <ScrollReveal delay={0.1}>
          <span className="text-indigo-600 font-bold tracking-widest uppercase text-[0.82rem] lg:text-[0.918rem]">Our Services</span>
          <h2 className="text-[1.97rem] lg:text-[2.625rem] font-bold text-slate-900 mt-[0.525rem]">Solutions for every stage.</h2>
        </ScrollReveal>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-[1.575rem] lg:gap-[2.1rem]">
        {services.map((s, i) => (
          <ScrollReveal key={i} delay={0.15 + (i * 0.05)} className="h-full">
            <div className="bg-white p-[1.575rem] lg:p-[2.1rem] rounded-[1.31rem] lg:rounded-[1.97rem] border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full group">
              <div className={`w-[3.15rem] h-[3.15rem] ${s.color} rounded-xl flex items-center justify-center mb-[1.31rem] group-hover:scale-105 transition-transform`}>
                {s.icon}
              </div>
              <h3 className="text-[1.18rem] font-bold text-slate-900 mb-[0.78rem]">{s.title}</h3>
              <p className="text-slate-500 leading-relaxed text-[0.82rem] lg:text-[0.918rem]">
                {s.desc}
              </p>
              <div className="mt-[1.31rem] pt-[1.31rem] border-t border-slate-50">
                <a href="#book" className="text-indigo-600 font-bold text-[0.82rem] inline-flex items-center hover:translate-x-1 transition-transform">
                  Learn More <ChevronSmallRight />
                </a>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

const ChevronSmallRight = () => (
  <svg className="w-[1.05rem] h-[1.05rem] ml-[0.26rem]" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);
