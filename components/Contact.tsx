
import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Phone, Mail } from 'lucide-react';
import { BookingForm } from './BookingForm';

export const Contact: React.FC = () => {
  return (
    <section id="book" className="py-[4.2rem] lg:py-[5.25rem] bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-slate-50 rounded-[2.1rem] lg:rounded-[3.15rem] overflow-hidden grid lg:grid-cols-5 border border-slate-100 shadow-xl">
          {/* Left Panel - Information only, logo removed per request */}
          <div className="lg:col-span-2 bg-indigo-600 p-[2.1rem] lg:p-[3.15rem] text-white flex flex-col justify-between">
            <div>
              <ScrollReveal direction="right" delay={0.1}>
                <h2 className="text-[1.97rem] lg:text-[2.625rem] font-serif font-bold mb-[1.575rem] leading-tight">Let's talk hiring.</h2>
                <p className="text-indigo-100 text-[0.918rem] lg:text-[1.05rem] mb-[2.625rem] opacity-90">
                  Ready to find the right one? Book a consultation call to get started.
                </p>
              </ScrollReveal>

              <div className="space-y-[1.575rem] lg:space-y-[2.1rem]">
                <ScrollReveal direction="right" delay={0.2}>
                  <div className="flex items-center space-x-[1.05rem] group cursor-pointer" onClick={() => window.location.href = 'tel:9537472860'}>
                    <div className="w-[2.625rem] h-[2.625rem] bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Phone className="w-[1.05rem] h-[1.05rem]" />
                    </div>
                    <div>
                      <p className="text-[0.656rem] text-indigo-200 font-bold uppercase tracking-widest">Call</p>
                      <p className="text-[1.05rem] lg:text-[1.18rem] font-semibold">+91 9537472860</p>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={0.25}>
                  <div className="flex items-center space-x-[1.05rem] group cursor-pointer" onClick={() => window.location.href = 'mailto:anjali.rightone@gmail.com'}>
                    <div className="w-[2.625rem] h-[2.625rem] bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Mail className="w-[1.05rem] h-[1.05rem]" />
                    </div>
                    <div>
                      <p className="text-[0.656rem] text-indigo-200 font-bold uppercase tracking-widest">Email</p>
                      <p className="text-[1.05rem] lg:text-[1.18rem] font-semibold break-all">contact@rightonenow.com</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            <ScrollReveal delay={0.3} direction="up" className="mt-[3.15rem] pt-[1.575rem] border-t border-white/10 hidden lg:block">
              <p className="text-[0.78rem] italic opacity-70 font-medium font-serif">
                "Finding talent shouldn't be hard. We make it simple."
              </p>
            </ScrollReveal>
          </div>

          {/* Right Panel with Dynamic Booking Form */}
          <div className="lg:col-span-3 p-[2.1rem] lg:p-[3.15rem] bg-white relative">
            <ScrollReveal direction="left" delay={0.15}>
              <h3 className="text-[1.8rem] lg:text-[2.2rem] font-serif font-bold text-slate-900 mb-8">Book a Call</h3>
              
              <BookingForm />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
