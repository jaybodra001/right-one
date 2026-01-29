
import React, { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Phone, Mail, Send, CheckCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('Full Name') as string;
    const email = formData.get('Email') as string;
    const interest = formData.get('Interest') as string;
    const message = formData.get('Message') as string;

    const subject = encodeURIComponent(`Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:anjali.rightone@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 8000);
  };

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

          {/* Right Panel with Form */}
          <div className="lg:col-span-3 p-[2.1rem] lg:p-[3.15rem] bg-white relative">
            <ScrollReveal direction="left" delay={0.15}>
              <h3 className="text-[1.8rem] lg:text-[2.2rem] font-serif font-bold text-slate-900 mb-8">Book a Call</h3>
              
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-[4rem] text-center">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h4 className="text-[1.5rem] font-serif font-bold text-slate-900 mb-3">Message Prepared!</h4>
                  <p className="text-[1rem] lg:text-[1.1rem] text-slate-500 max-w-sm">
                    Your default email application has been opened. Please hit send to complete your booking.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.95rem] font-bold text-slate-700">Full Name</label>
                      <input 
                        type="text" 
                        name="Full Name" 
                        required 
                        placeholder="John Doe"
                        className="w-full px-5 py-4 bg-white border border-slate-300 rounded-xl text-[1rem] focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-300 shadow-sm" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.95rem] font-bold text-slate-700">Email Address</label>
                      <input 
                        type="email" 
                        name="Email" 
                        required 
                        placeholder="john@email.com"
                        className="w-full px-5 py-4 bg-white border border-slate-300 rounded-xl text-[1rem] focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-300 shadow-sm" 
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[0.95rem] font-bold text-slate-700">I am looking for...</label>
                    <div className="relative">
                      <select 
                        name="Interest" 
                        className="w-full px-5 py-4 bg-white border border-slate-300 rounded-xl text-[1rem] outline-none cursor-pointer focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 appearance-none transition-all shadow-sm"
                      >
                        <option>Hiring New Talent</option>
                        <option>My Next Career Move</option>
                        <option>Staffing Solutions</option>
                        <option>General Inquiry</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[0.95rem] font-bold text-slate-700">Message</label>
                    <textarea 
                      name="Message" 
                      rows={4} 
                      placeholder="How can we help you today?"
                      className="w-full px-5 py-4 bg-white border border-slate-300 rounded-xl text-[1rem] outline-none resize-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all placeholder:text-slate-300 shadow-sm"
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit" 
                      className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-[1.2rem] hover:bg-indigo-700 active:scale-[0.99] transition-all flex items-center justify-center shadow-xl shadow-indigo-600/20 group"
                    >
                      Confirm Booking <Send className="ml-3 w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    <p className="text-[0.85rem] text-slate-400 text-center mt-5 font-medium">
                      This safely prepares a message in your preferred email app.
                    </p>
                  </div>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
