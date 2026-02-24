
import React from 'react';
import { motion } from 'framer-motion';
import { LineReveal, ScrollReveal } from './ScrollReveal';
import { ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const handleHeroClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 85,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-[89vh] flex items-center pt-[6.3rem] pb-[3.15rem] lg:pb-[5.25rem] overflow-hidden bg-white">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-indigo-50/15 blur-[126px] rounded-full translate-x-1/4 -translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-[2.1rem] lg:gap-[3.15rem] items-center">
        <div className="lg:col-span-7 xl:col-span-6">
          <div className="relative z-10 mb-[1.575rem] lg:mb-[2.1rem]">
            <h1 className="text-[2.36rem] md:text-[3.15rem] lg:text-[4rem] xl:text-[4.725rem] font-serif font-bold tracking-tight text-slate-900 leading-[1.12]">
              <LineReveal text="Find your" className="-ml-[0.05rem]" />
              <div className="overflow-hidden pb-[0.26rem] -mt-[0.26rem] lg:-mt-[0.525rem]">
                <motion.span 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="block text-indigo-600 italic font-normal lowercase"
                >
                  right<span className="font-serif font-bold text-slate-900 not-italic"> one.</span>
                </motion.span>
              </div>
            </h1>
            
            <ScrollReveal direction="up" delay={0.5} duration={0.8} className="mt-[1.05rem] lg:mt-[1.575rem]">
              <span className="inline-block px-[1.05rem] py-[0.525rem] rounded-full bg-indigo-50/50 text-indigo-600 text-[0.656rem] font-bold tracking-[0.21em] uppercase border border-indigo-100/50 shadow-sm">
                Modern Recruitment Solutions
              </span>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.6}>
            <p className="text-[0.918rem] lg:text-[1.05rem] text-slate-500 leading-relaxed mb-[2.1rem] max-w-[31.5rem] font-medium">
              Empowering young talent and providing mid-size companies with fast, quality, and affordable hiring. Your growth starts with the right people.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.7} className="flex flex-col sm:flex-row items-center gap-[1.05rem] lg:gap-[1.575rem]">
            <a 
              href="#book" 
              onClick={(e) => handleHeroClick(e, '#book')}
              className="w-full sm:w-auto px-[2.1rem] py-[0.92rem] bg-indigo-600 text-white rounded-full font-bold text-[0.918rem] lg:text-[1.05rem] hover:bg-indigo-700 transition-all flex items-center justify-center shadow-lg shadow-indigo-100/50 group"
            >
              Book a Call
              <ChevronRight className="ml-2 w-[1.05rem] h-[1.05rem] group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#services" 
              onClick={(e) => handleHeroClick(e, '#services')}
              className="w-full sm:w-auto px-[2.1rem] py-[0.92rem] bg-slate-50 border border-slate-100 text-slate-700 rounded-full font-bold text-[0.918rem] lg:text-[1.05rem] hover:bg-slate-100 transition-all text-center shadow-sm"
            >
              Explore Services
            </a>
          </ScrollReveal>

          {/* <ScrollReveal delay={0.9} className="mt-[2.1rem] lg:mt-[3.15rem] flex items-center space-x-[1.05rem]">
            <div className="flex -space-x-[0.525rem]">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i}
                  src={`https://images.unsplash.com/photo-${i === 1 ? '1507003211169-0a1dd7228f2d' : i === 2 ? '1494790108377-be9c29b29330' : i === 3 ? '1500648767791-00dcc994a43e' : '1534528741775-53994a69daeb'}?w=105&h=105&fit=crop`} 
                  className="w-[2.1rem] h-[2.1rem] lg:w-[2.36rem] lg:h-[2.36rem] rounded-full border-[2.1px] border-white shadow-md grayscale hover:grayscale-0 transition-all duration-500" 
                  alt="Candidate" 
                />
              ))}
            </div>
            <p className="text-[0.82rem] text-slate-400 font-medium">
              Trusted by <span className="text-slate-900 font-bold">210+ companies</span>
            </p>
          </ScrollReveal> */}
        </div>

        <div className="lg:col-span-5 xl:col-span-6 relative flex justify-center lg:justify-end">
          <ScrollReveal direction="left" delay={0.2} duration={1} className="w-full max-w-[441px] lg:max-w-[462px] xl:max-w-[535px] relative">
            {/* Added an orange glow background like the reference */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-orange-400/40 rounded-full blur-[100px] -z-10"></div>
            
            <div className="relative z-10 rounded-[2.1rem] lg:rounded-[3.15rem] overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 border-[8.4px] border-white">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1260&auto=format&fit=crop" 
                alt="Professional HR" 
                className="w-full h-auto aspect-[4/5] lg:aspect-square object-cover"
              />
            </div>
            
            <motion.div 
              animate={{ y: [0, -10.5, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -bottom-[1.05rem] -left-[1.05rem] lg:-bottom-[1.575rem] lg:-left-[1.575rem] z-20 bg-white p-[1.05rem] lg:p-[1.575rem] rounded-[1.31rem] shadow-2xl border border-slate-50 max-w-[210px] lg:max-w-[252px]"
            >
              <div className="flex items-center space-x-[0.78rem]">
                <div className="w-[2.1rem] h-[2.1rem] lg:w-[2.625rem] lg:h-[2.625rem] bg-indigo-50 text-indigo-600 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-[1.3125rem] h-[1.3125rem] lg:w-[1.575rem] h-[1.575rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-[0.82rem] lg:text-[0.918rem]">Right match found</h4>
                  <p className="text-[0.59rem] lg:text-[0.656rem] text-slate-400 font-medium uppercase tracking-wider">Hired in 48 hours</p>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
