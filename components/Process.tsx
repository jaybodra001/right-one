
import React from 'react';
import { ScrollReveal } from './ScrollReveal';

export const Process: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Requirement",
      desc: "We dive deep into your specific technical and cultural needs."
    },
    {
      number: "02",
      title: "Scouting",
      desc: "Our team leverages networks to find the perfect candidates."
    },
    {
      number: "03",
      title: "Shortlisting",
      desc: "We screen applicants, presenting only the top 3-5 to you."
    },
    {
      number: "04",
      title: "Support",
      desc: "We assist with offers and follow up during onboarding."
    }
  ];

  return (
    <section id="process" className="py-[4.2rem] lg:py-[5.25rem] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-[4.2rem]">
          <ScrollReveal delay={0.1}>
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-[0.82rem] lg:text-[0.918rem]">How it works</span>
            <h2 className="text-[1.97rem] lg:text-[2.625rem] font-bold text-slate-900 mt-[0.525rem]">Simple, streamlined hiring.</h2>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-[2.1rem] lg:gap-[3.15rem] relative">
          <div className="hidden lg:block absolute top-[2.1rem] left-0 right-0 h-[1.05px] bg-slate-100 -z-10"></div>

          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={0.15 + (i * 0.05)} className="text-center lg:text-left">
              <div className="relative inline-block mb-[1.575rem]">
                <div className="w-[3.15rem] h-[3.15rem] bg-white border-[2.1px] border-indigo-600 rounded-xl flex items-center justify-center mx-auto lg:mx-0 shadow-sm">
                  <span className="text-[1.05rem] font-bold text-indigo-600">{step.number}</span>
                </div>
              </div>
              <h3 className="text-[1.18rem] font-bold text-slate-900 mb-[0.78rem]">{step.title}</h3>
              <p className="text-slate-500 text-[0.82rem] lg:text-[0.918rem] leading-relaxed">
                {step.desc}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
