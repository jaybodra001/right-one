
import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Target, Shield, Zap } from 'lucide-react';

export const About: React.FC = () => {
  const values = [
    {
      icon: <Shield className="w-[1.3125rem] h-[1.3125rem]" />,
      title: "Trust First",
      desc: "Transparency is our foundation. We build lasting relationships through honesty."
    },
    {
      icon: <Zap className="w-[1.3125rem] h-[1.3125rem]" />,
      title: "Fast Results",
      desc: "Time is money. Our process ensures roles are filled within days, not weeks."
    },
    {
      icon: <Target className="w-[1.3125rem] h-[1.3125rem]" />,
      title: "Quality Matching",
      desc: "We match skills, culture, and ambitions perfectly for long-term success."
    }
  ];

  return (
    <section id="about" className="py-[4.2rem] lg:py-[5.25rem] bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-[3.15rem] lg:gap-[4.2rem] items-center">
          <ScrollReveal direction="right" delay={0.1}>
            <div className="relative">
              <div className="absolute -top-[1.05rem] -left-[1.05rem] w-[4.2rem] h-[4.2rem] bg-indigo-50 rounded-xl -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1260&auto=format&fit=crop" 
                alt="Team working" 
                className="rounded-[1.575rem] lg:rounded-[2.36rem] shadow-lg w-full object-cover max-h-[525px]"
              />
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal delay={0.1}>
              <span className="text-indigo-600 font-bold tracking-widest uppercase text-[0.82rem] lg:text-[0.918rem]">About RightOne</span>
              <h2 className="text-[1.97rem] lg:text-[2.625rem] font-bold text-slate-900 mt-[0.525rem] mb-[1.575rem] leading-tight">
                We believe everyone deserves the <span className="text-indigo-600">Right Match.</span>
              </h2>
              <p className="text-[0.918rem] lg:text-[1.05rem] text-slate-600 leading-relaxed mb-[2.1rem]">
                RightOne was born from a simple observation: mid-size companies struggle with expensive recruitment, while young talent often gets overlooked. We bridge this gap by offering affordable solutions.
              </p>
            </ScrollReveal>

            <div className="space-y-[1.3125rem] lg:space-y-[1.575rem]">
              {values.map((v, i) => (
                <ScrollReveal key={i} delay={0.2 + (i * 0.05)} direction="up">
                  <div className="flex items-start space-x-[1.05rem]">
                    <div className="mt-[0.26rem] w-[2.625rem] h-[2.625rem] bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      {v.icon}
                    </div>
                    <div>
                      <h4 className="text-[1.18rem] font-bold text-slate-900">{v.title}</h4>
                      <p className="text-[0.918rem] text-slate-500 mt-[0.13rem]">{v.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
