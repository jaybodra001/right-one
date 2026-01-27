
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sectionIds = ['about', 'services', 'why-us', 'process', 'book'];
    
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    if (targetId === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 85,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Why Us', href: '#why-us', id: 'why-us' },
    { label: 'Process', href: '#process', id: 'process' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-[1.05rem]' : 'bg-transparent py-[1.575rem]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, '#')} 
          className="flex items-center gap-3 group relative"
        >
          <img 
            src="https://res.cloudinary.com/dlaykkhkc/image/upload/v1768728865/Rightone_Logo_f9irxr.svg" 
            alt="RightOne Logo" 
            className="h-10 w-auto"
          />
          <span className="text-[1.575rem] font-serif font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
            RightOne<span className="text-indigo-600">.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-[2.625rem]">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-[0.925rem] font-semibold transition-colors duration-300 relative group ${
                activeSection === link.id ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1.5 left-0 h-0.5 bg-indigo-600 transition-all duration-300 ${
                activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
          ))}
          <a 
            href="#book" 
            onClick={(e) => handleNavClick(e, '#book')}
            className={`px-[1.575rem] py-[0.62rem] rounded-full text-[0.925rem] font-bold transition-all bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 active:scale-95`}
          >
            Book a Call
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-900 p-2.5" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t md:hidden flex flex-col p-9 space-y-7">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-[1.3125rem] font-bold ${
                activeSection === link.id ? 'text-indigo-600' : 'text-slate-800'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a 
            href="#book" 
            onClick={(e) => handleNavClick(e, '#book')}
            className="bg-indigo-600 text-white px-[1.3125rem] py-[1.05rem] rounded-2xl text-center font-bold text-[1.18rem] shadow-lg shadow-indigo-100"
          >
            Book a Call
          </a>
        </div>
      )}
    </nav>
  );
};
