
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 group">
            <img 
              src="https://res.cloudinary.com/dlaykkhkc/image/upload/v1768728865/Rightone_Logo_f9irxr.svg" 
              alt="RightOne Logo" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-serif font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              RightOne<span className="text-indigo-600">.</span>
            </span>
          </div>

          <div className="text-sm text-slate-400 font-medium">
            <p>© {new Date().getFullYear()} RightOne Recruitment Agency. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
