
import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { CheckCircle2, DollarSign, Clock, Heart } from 'lucide-react';

export const WhyChoose: React.FC = () => {
  const reasons = [
    {
      icon: <DollarSign className="w-[1.3125rem] h-[1.3125rem]" />,
      title: "Affordable",
      desc: "Premium results at a fraction of standard agency costs."
    },
    {
      icon: <CheckCircle2 className="w-[1.3125rem] h-[1.3125rem]" />,
      title: "Verified",
      desc: "Rigorous multi-stage screening before you interview."
    },
    {
      icon: <Clock className="w-[1.3125rem] h-[1.3125rem]" />,
      title: "Fast",
      desc: "Shortlist top candidates in under 48 hours on average."
    },
    {
      icon: <Heart className="w-[1.3125rem] h-[1.3125rem]" />,
      title: "Human",
      desc: "We focus on potential, not just bullet points on a CV."
    }
  ];

  return (
    <section id="why-us" className="py-[4.2rem] lg:py-[5.25rem] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-indigo-600 rounded-[2.1rem] lg:rounded-[3.15rem] p-[2.1rem] lg:p-[4.2rem] text-white overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-[21rem] h-[21rem] bg-indigo-500 rounded-full blur-[84px] opacity-20 -mr-[4.2rem] -mt-[4.2rem]"></div>
          
          <div className="grid lg:grid-cols-2 gap-[2.625rem] lg:gap-[4.2rem] relative z-10">
            <div>
              <ScrollReveal direction="right" delay={0.1}>
                <h2 className="text-[1.575rem] lg:text-[2.625rem] font-bold leading-tight mb-[1.575rem]">
                  Why companies choose <span className="text-indigo-200">RightOne</span>.
                </h2>
                <p className="text-indigo-100 text-[0.918rem] lg:text-[1.05rem] mb-[2.1rem] max-w-[31.5rem]">
                  We've reimagined recruitment to be faster, more transparent, and significantly more cost-effective.
                </p>
                <div className="flex space-x-[2.625rem]">
                  <ScrollReveal delay={0.2} direction="up">
                    <h3 className="text-[1.97rem] lg:text-[2.36rem] font-bold text-white mb-[0.26rem]">98%</h3>
                    <p className="text-indigo-200 text-[0.656rem] uppercase font-bold tracking-wider">Retention</p>
                  </ScrollReveal>
                  <ScrollReveal delay={0.25} direction="up">
                    <h3 className="text-[1.97rem] lg:text-[2.36rem] font-bold text-white mb-[0.26rem]">48h</h3>
                    <p className="text-indigo-200 text-[0.656rem] uppercase font-bold tracking-wider">Shortlist</p>
                  </ScrollReveal>
                </div>
              </ScrollReveal>
            </div>

            <div className="grid sm:grid-cols-2 gap-[1.05rem] lg:gap-[1.575rem]">
              {reasons.map((r, i) => (
                <ScrollReveal key={i} delay={0.2 + (i * 0.05)} className="bg-indigo-700/30 p-[1.31rem] rounded-2xl border border-indigo-400/20">
                  <div className="w-[2.36rem] h-[2.36rem] bg-indigo-400/20 rounded-lg flex items-center justify-center mb-[0.78rem]">
                    {r.icon}
                  </div>
                  <h4 className="text-[1.05rem] font-bold mb-[0.26rem]">{r.title}</h4>
                  <p className="text-indigo-100 text-[0.72rem] lg:text-[0.82rem] leading-relaxed">
                    {r.desc}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
