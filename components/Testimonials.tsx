
import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      content: "RightOne helped us scale our engineering team fast. Their candidates weren't just skilled; they fit our startup culture perfectly.",
      author: "Sarah Jenkins",
      role: "Founder, TechBloom",
      avatar: "https://picsum.photos/seed/sarah/105/105"
    },
    {
      content: "As a young job seeker, I felt seen for my potential, not just my years of experience. They landed me my dream role in 2 weeks.",
      author: "Michael Chen",
      role: "UX Designer",
      avatar: "https://picsum.photos/seed/michael/105/105"
    },
    {
      content: "Affordable and incredibly professional. They're now our go-to partner for all our hiring needs. Highly recommended.",
      author: "Robert Wilson",
      role: "HR Director, Nexus Logistics",
      avatar: "https://picsum.photos/seed/robert/105/105"
    }
  ];

  return (
    <section id="testimonials" className="py-[6.3rem] bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 text-center mb-[4.2rem]">
        <ScrollReveal>
          <span className="text-indigo-600 font-bold tracking-widest uppercase text-[0.918rem]">Success Stories</span>
          <h2 className="text-[2.625rem] lg:text-[3.28rem] font-bold text-slate-900 mt-[1.05rem]">Hear from the community.</h2>
        </ScrollReveal>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-[2.1rem]">
        {reviews.map((r, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className="bg-white p-[2.625rem] rounded-[1.97rem] shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-lg transition-shadow">
              <Quote className="text-indigo-100 w-[3.15rem] h-[3.15rem] mb-[1.575rem]" />
              <p className="text-slate-700 italic mb-[2.1rem] text-[1.05rem] leading-relaxed flex-grow">"{r.content}"</p>
              <div className="flex items-center space-x-[1.05rem]">
                <img src={r.avatar} alt={r.author} className="w-[3.15rem] h-[3.15rem] rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900 text-[1.05rem]">{r.author}</h4>
                  <p className="text-[0.78rem] text-slate-500 font-medium uppercase tracking-wider">{r.role}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
