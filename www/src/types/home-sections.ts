import { z } from 'astro:content';

const ctaSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const heroSectionSchema = z.object({
  type: z.literal('hero'),
  eyebrow: z.string(),
  heading: z.string(),
  body: z.string(),
  cta: ctaSchema,
  image: z.string(),
  imageAlt: z.string(),
});

const servicesIntroSectionSchema = z.object({
  type: z.literal('services-intro'),
  servicesHeading: z.string(),
  services: z.array(z.string()),
  servicesImage: z.string(),
  servicesImageAlt: z.string(),
  commitmentsHeading: z.string(),
  commitments: z.array(z.string()),
  commitmentsCta: ctaSchema,
  commitmentsImage: z.string(),
  commitmentsImageAlt: z.string(),
});

const benefitsSectionSchema = z.object({
  type: z.literal('benefits'),
  heading: z.string(),
  subheading: z.string(),
  items: z.array(z.string()),
  videoUrl: z.string(),
  videoTitle: z.string(),
  videoImage: z.string(),
  videoImageAlt: z.string(),
});

const skillsSectionSchema = z.object({
  type: z.literal('skills'),
  heading: z.string(),
  skills: z.array(z.object({
    icon: z.string(),
    label: z.string(),
  })),
});

const insuranceSectionSchema = z.object({
  type: z.literal('insurance'),
  heading: z.string(),
  body: z.string(),
  logos: z.array(z.object({
    file: z.string(),
    alt: z.string(),
  })),
});

const esaSectionSchema = z.object({
  type: z.literal('esa'),
  heading: z.string(),
  body: z.string(),
  image: z.string(),
  imageAlt: z.string(),
});

const financialHelpSectionSchema = z.object({
  type: z.literal('financial-help'),
  heading: z.string(),
  body: z.string(),
  cta: ctaSchema,
});

const processSectionSchema = z.object({
  type: z.literal('process'),
  heading: z.string(),
  steps: z.array(z.object({
    icon: z.string(),
    label: z.string(),
  })),
});

const directorSectionSchema = z.object({
  type: z.literal('director'),
  heading: z.string(),
  quote: z.string(),
  photo: z.string(),
  photoAlt: z.string(),
  name: z.string(),
  credentials: z.string(),
  signature: z.string(),
  signatureAlt: z.string(),
});

const testimonialsSectionSchema = z.object({
  type: z.literal('testimonials'),
  heading: z.string(),
  items: z.array(z.object({
    author: z.string(),
    text: z.string(),
  })),
});

export const homeSectionSchema = z.discriminatedUnion('type', [
  heroSectionSchema,
  servicesIntroSectionSchema,
  benefitsSectionSchema,
  skillsSectionSchema,
  insuranceSectionSchema,
  esaSectionSchema,
  financialHelpSectionSchema,
  processSectionSchema,
  directorSectionSchema,
  testimonialsSectionSchema,
]);

export const homeSectionsSchema = z.array(homeSectionSchema);

const homeHeroSchema = heroSectionSchema.omit({ type: true });
const homeServicesIntroSchema = servicesIntroSectionSchema.omit({ type: true });
const homeBenefitsSchema = benefitsSectionSchema.omit({ type: true });
const homeSkillsSchema = skillsSectionSchema.omit({ type: true });
const homeInsuranceSchema = insuranceSectionSchema.omit({ type: true });
const homeEsaSchema = esaSectionSchema.omit({ type: true });
const homeFinancialHelpSchema = financialHelpSectionSchema.omit({ type: true });
const homeProcessSchema = processSectionSchema.omit({ type: true });
const homeDirectorSchema = directorSectionSchema.omit({ type: true });
const homeTestimonialsSchema = testimonialsSectionSchema.omit({ type: true });

export const homePageSchema = z.object({
  hero: homeHeroSchema,
  servicesIntro: homeServicesIntroSchema,
  benefits: homeBenefitsSchema,
  skills: homeSkillsSchema,
  insurance: homeInsuranceSchema,
  esa: homeEsaSchema,
  financialHelp: homeFinancialHelpSchema,
  process: homeProcessSchema,
  director: homeDirectorSchema,
  testimonials: homeTestimonialsSchema,
});

export type HomeSection = z.infer<typeof homeSectionSchema>;
export type HeroSection = z.infer<typeof heroSectionSchema>;
export type ServicesIntroSection = z.infer<typeof servicesIntroSectionSchema>;
export type BenefitsSection = z.infer<typeof benefitsSectionSchema>;
export type SkillsSection = z.infer<typeof skillsSectionSchema>;
export type InsuranceSection = z.infer<typeof insuranceSectionSchema>;
export type EsaSection = z.infer<typeof esaSectionSchema>;
export type FinancialHelpSection = z.infer<typeof financialHelpSectionSchema>;
export type ProcessSection = z.infer<typeof processSectionSchema>;
export type DirectorSection = z.infer<typeof directorSectionSchema>;
export type TestimonialsSection = z.infer<typeof testimonialsSectionSchema>;
export type HomePageContent = z.infer<typeof homePageSchema>;
