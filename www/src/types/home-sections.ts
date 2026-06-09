export interface HeroSection {
  type: 'hero';
  eyebrow: string;
  heading: string;
  body: string;
  cta: { label: string; href: string };
  image: string;
  imageAlt: string;
}

export interface ServicesIntroSection {
  type: 'services-intro';
  servicesHeading: string;
  services: string[];
  servicesImage: string;
  servicesImageAlt: string;
  commitmentsHeading: string;
  commitments: string[];
  commitmentsCta: { label: string; href: string };
  commitmentsImage: string;
  commitmentsImageAlt: string;
}

export interface BenefitsSection {
  type: 'benefits';
  heading: string;
  subheading: string;
  items: string[];
  videoUrl: string;
  videoTitle: string;
  videoImage: string;
  videoImageAlt: string;
}

export interface SkillsSection {
  type: 'skills';
  heading: string;
  skills: { icon: string; label: string }[];
}

export interface InsuranceSection {
  type: 'insurance';
  heading: string;
  body: string;
  logos: { file: string; alt: string }[];
}

export interface EsaSection {
  type: 'esa';
  heading: string;
  body: string;
  image: string;
  imageAlt: string;
}

export interface FinancialHelpSection {
  type: 'financial-help';
  heading: string;
  body: string;
  cta: { label: string; href: string };
}

export interface ProcessSection {
  type: 'process';
  heading: string;
  steps: { icon: string; label: string }[];
}

export interface DirectorSection {
  type: 'director';
  heading: string;
  quote: string;
  photo: string;
  photoAlt: string;
  name: string;
  credentials: string;
  signature: string;
  signatureAlt: string;
}

export interface TestimonialsSection {
  type: 'testimonials';
  heading: string;
  items: { author: string; text: string }[];
}

export type HomeSection =
  | HeroSection
  | ServicesIntroSection
  | BenefitsSection
  | SkillsSection
  | InsuranceSection
  | EsaSection
  | FinancialHelpSection
  | ProcessSection
  | DirectorSection
  | TestimonialsSection;
