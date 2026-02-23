import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
}

/**
 * Hook to manage SEO meta tags and document title
 * Use this in your components to dynamically set meta tags
 */
export const useSEO = ({
  title,
  description,
  keywords,
  image = 'https://res.cloudinary.com/dlaykkhkc/image/upload/v1768728865/Rightone_Logo_f9irxr.svg',
  url = 'https://rightonenow.com',
  type = 'website',
  author = 'RightOne',
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to set or update meta tag
    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element: HTMLMetaElement | null = document.querySelector(selector);

      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update meta tags
    setMeta('description', description);
    
    if (keywords) {
      setMeta('keywords', keywords);
    }

    setMeta('author', author);

    // Open Graph meta tags
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:image', image, true);
    setMeta('og:url', url, true);
    setMeta('og:type', type, true);

    // Twitter meta tags
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', description, true);
    setMeta('twitter:image', image, true);
    setMeta('twitter:card', 'summary_large_image', true);

    // Cleanup function
    return () => {
      // Keep the meta tags for SEO purposes, don't remove them
    };
  }, [title, description, keywords, image, url, type, author]);
};

/**
 * Hook to add structured data (JSON-LD) to the page
 */
export const useStructuredData = (data: Record<string, any>) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);
};
