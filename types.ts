
// Fix: Added React import to provide access to the React namespace for types like React.ReactNode
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  avatar: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}