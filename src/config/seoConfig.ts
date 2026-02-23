// SEO Configuration for RightOne Recruitment Agency

export const seoConfig = {
  site: {
    name: 'RightOne',
    fullName: 'RightOne HR & Recruitment Agency',
    description: 'Premium HR and recruitment agency specializing in finding the perfect match between top talent and growing companies. Fast, affordable, and quality hiring solutions.',
    url: 'https://rightonenow.com',
    image: 'https://res.cloudinary.com/dlaykkhkc/image/upload/v1768728865/Rightone_Logo_f9irxr.svg',
    keywords: 'recruitment agency, HR solutions, talent acquisition, job placement, hiring solutions, staffing agency',
    language: 'en-US',
  },
  pages: {
    home: {
      title: 'RightOne | Premium HR & Recruitment Agency | Find Your Right Match',
      description: 'RightOne is a modern HR & recruitment agency specializing in finding the perfect match between top talent and growing companies. Fast, affordable, and quality hiring solutions.',
      path: '/',
    },
    about: {
      title: 'About RightOne | Premium Recruitment Solutions',
      description: 'Learn about RightOne\'s mission to connect top talent with growing companies through innovative recruitment solutions.',
      path: '/#about',
    },
    services: {
      title: 'Recruitment Services | RightOne',
      description: 'Explore RightOne\'s comprehensive recruitment and HR services designed to meet your business needs.',
      path: '/#services',
    },
    whyChoose: {
      title: 'Why Choose RightOne | Professional Recruitment Agency',
      description: 'Discover what makes RightOne the best choice for your recruitment and HR needs.',
      path: '/#why-choose',
    },
    process: {
      title: 'Our Recruitment Process | RightOne',
      description: 'Understand RightOne\'s streamlined and efficient recruitment process.',
      path: '/#process',
    },
    testimonials: {
      title: 'Client Testimonials | RightOne Recruitment',
      description: 'See what our satisfied clients say about RightOne\'s recruitment services.',
      path: '/#testimonials',
    },
    contact: {
      title: 'Contact RightOne | Get Your Recruitment Solutions',
      description: 'Contact RightOne for your recruitment and HR needs. We\'re here to help you find the right talent.',
      path: '/#contact',
    },
  },
  socialLinks: {
    facebook: 'https://www.facebook.com/rightonenow',
    twitter: 'https://www.twitter.com/rightonenow',
    linkedin: 'https://www.linkedin.com/company/rightonenow',
    instagram: 'https://www.instagram.com/rightonenow',
  },
};

export type SEOConfig = typeof seoConfig;
