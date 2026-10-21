export type LandingIntent = 'general' | 'commercial' | 'ahcccs' | 'private_pay';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LandingPageConfig {
  intent: LandingIntent;
  slug: string;
  title: string;
  description: string;
  h1: string;
  subhead: string;
  eligibilityNote: string;
  primaryCta: string;
  eyebrow: string;
  heroImage: string;
  heroAlt: string;
  heroHeight: number;
  careImage: string;
  careAlt: string;
  reassuranceTitle: string;
  reassuranceBody: string;
  highlights: string[];
  payerTitle: string;
  payerBody: string;
  payerPoints: string[];
  processTitle: string;
  processSteps: { title: string; body: string }[];
  faq: FAQItem[];
  formTitle: string;
  formIntro: string;
}

const eligibilityNote =
  'Eligibility: ages 18 months through 8 years • autism diagnosis required';

const sharedProcess = [
  {
    title: 'Request a consultation',
    body: 'Share basic contact information so an AIA team member can follow up about your questions and next steps.',
  },
  {
    title: 'Confirm service and payment fit',
    body: 'AIA provides ABA therapy for children ages 18 months through 8 years old and requires an autism diagnosis before services begin. AIA can also explain the payment or coverage path that applies.',
  },
  {
    title: 'Complete the clinical intake steps',
    body: 'If ABA services are appropriate, AIA will explain the assessment, authorization, and care-planning steps that apply.',
  },
];

export const paymentPaths = [
  { label: 'Commercial insurance', href: '/lp/aba-insurance', intent: 'commercial' },
  { label: 'AHCCCS / UHC Community Plan', href: '/lp/aba-ahcccs', intent: 'ahcccs' },
  { label: 'Private pay', href: '/lp/aba-private-pay', intent: 'private_pay' },
];

export const landingPages: Record<LandingIntent, LandingPageConfig> = {
  general: {
    intent: 'general',
    slug: '/lp/aba-therapy',
    title: 'ABA Therapy Ages 18 Months–8 Years | Arizona Institute for Autism',
    description:
      "Explore individualized ABA therapy for children ages 18 months through 8 years with an autism diagnosis at AIA's Scottsdale clinic.",
    h1: 'ABA Therapy for Children Ages 18 Months–8 Years',
    subhead:
      "AIA provides individualized, neurodiversity-affirming ABA therapy at its Scottsdale clinic for children ages 18 months through 8 years. An autism diagnosis is required before ABA services begin.",
    eligibilityNote,
    primaryCta: 'Request a Free Consultation',
    eyebrow: 'ABA Therapy in Scottsdale',
    heroImage: '/assets/campaign/media/aba/general/hero.webp',
    heroAlt: 'Young boy exploring wooden blocks with an attentive adult nearby.',
    heroHeight: 720,
    careImage: '/assets/campaign/media/aba/general/shared-reading.webp',
    careAlt: 'Young child and an adult reading a picture book together, with its illustrated cover facing the camera.',
    reassuranceTitle: 'Start with a conversation about your child and your goals',
    reassuranceBody:
      'Families often begin with questions about communication, everyday routines, independence, flexibility, or how ABA services may fit into daily life. A consultation can help clarify whether AIA is an appropriate next step for a child who meets the age and diagnosis requirements.',
    highlights: [
      'ABA therapy for children ages 18 months through 8 years',
      'Autism diagnosis required before services begin',
      'Individualized goals with parent and caregiver collaboration',
    ],
    payerTitle: 'Explore payment and coverage options',
    payerBody:
      'Your payment path affects the administrative steps, not the goal of individualized care. Choose the option that best matches what you are looking for.',
    payerPoints: [
      'Commercial insurance: learn how benefit verification and authorization may work.',
      'AHCCCS: AIA is in network with UnitedHealthcare Community Plan and accepts no other AHCCCS plans.',
      'Private pay: discuss current self-pay options directly with AIA.',
    ],
    processTitle: 'What happens after you reach out?',
    processSteps: sharedProcess,
    faq: [
      {
        question: 'What ages does AIA serve for ABA therapy?',
        answer:
          'AIA provides ABA therapy for children ages 18 months through 8 years old at its Scottsdale clinic.',
      },
      {
        question: 'Does my child need an autism diagnosis before ABA starts?',
        answer:
          'Yes. An autism diagnosis is required before ABA therapy services can begin. AIA offers examination and evaluation services but does not provide diagnoses.',
      },
      {
        question: 'What kinds of skills can ABA support?',
        answer:
          'Depending on individual needs, goals may involve functional communication, daily routines, flexibility, independence, social participation, safety, or other meaningful skills. Specific goals are determined through the clinical process.',
      },
    ],
    formTitle: 'Request a Free Consultation',
    formIntro:
      'Share basic contact information and an AIA team member can follow up about ABA services, eligibility, and next steps.',
  },

  commercial: {
    intent: 'commercial',
    slug: '/lp/aba-insurance',
    title: 'ABA Therapy and Insurance Support | AIA',
    description:
      'Learn how AIA helps families verify ABA insurance benefits and next steps for eligible children ages 18 months through 8 years.',
    h1: 'ABA Therapy With Insurance Support',
    subhead:
      'AIA provides individualized, neurodiversity-affirming ABA therapy at its Scottsdale clinic for children ages 18 months through 8 years. AIA helps families verify ABA benefits and understand coverage, authorizations, copays, deductibles, and next steps before care begins.',
    eligibilityNote,
    primaryCta: 'Request Insurance Verification',
    eyebrow: 'Commercial Insurance',
    heroImage: '/assets/campaign/media/aba/commercial/insurance-support.webp',
    heroAlt: 'Two adults having a relaxed conversation at a table in a welcoming room.',
    heroHeight: 853,
    careImage: '/assets/campaign/media/aba/commercial/creative-play.webp',
    careAlt: 'Young child painting at a table with an attentive adult nearby.',
    reassuranceTitle: 'Coverage is specific to your plan',
    reassuranceBody:
      'Insurance participation and benefits can vary by carrier, employer plan, policy, and authorization requirements. AIA can help verify the details that apply to your specific coverage before services begin.',
    highlights: [
      'ABA therapy for children ages 18 months through 8 years',
      'Autism diagnosis required before services begin',
      'Verify current plan participation',
      'Connect coverage steps with the ABA intake process',
    ],
    payerTitle: 'Questions to review about your plan',
    payerBody:
      'Contact AIA to discuss your specific plan and the steps that may apply before services begin.',
    payerPoints: [
      'Is my specific plan currently accepted?',
      'What benefits, authorization requirements, and out-of-pocket costs apply?',
      'What steps are needed before services can begin?',
    ],
    processTitle: 'What happens next?',
    processSteps: sharedProcess,
    faq: [
      {
        question: 'Does my insurance cover ABA therapy?',
        answer:
          'Coverage depends on the specific policy and applicable requirements. AIA can verify plan participation and available benefit information rather than assuming coverage from the carrier name alone.',
      },
      {
        question: 'Does AIA accept my insurance carrier?',
        answer:
          'AIA accepts Blue Cross Blue Shield of Arizona PPO plans, subject to verification of your specific policy. For other commercial plans, contact AIA to ask about current participation. Acceptance does not guarantee coverage or authorization for a particular service.',
      },
      {
        question: 'Does my child need an autism diagnosis?',
        answer:
          'Yes. AIA requires an autism diagnosis before ABA therapy services can begin, in addition to the child being within AIA’s service age range of 18 months through 8 years.',
      },
      {
        question: 'Will ABA require prior authorization?',
        answer:
          'Authorization requirements vary by plan. AIA can identify the requirements that apply after the relevant insurance information is reviewed.',
      },
    ],
    formTitle: 'Request Insurance Verification',
    formIntro:
      'Start with basic contact information. AIA can collect any plan-specific details through the appropriate secure process during follow-up.',
  },

  ahcccs: {
    intent: 'ahcccs',
    slug: '/lp/aba-ahcccs',
    title: 'UnitedHealthcare Community Plan ABA Therapy | AIA',
    description:
      'AIA is in network with UnitedHealthcare Community Plan for eligible ABA therapy for children ages 18 months through 8 years.',
    h1: 'ABA Therapy With UnitedHealthcare Community Plan',
    subhead:
      'AIA provides individualized, neurodiversity-affirming ABA therapy at its Scottsdale clinic for children ages 18 months through 8 years. AIA is in network with UnitedHealthcare Community Plan for eligible ABA therapy services. This is the only AHCCCS plan AIA currently accepts.',
    eligibilityNote,
    primaryCta: 'Request a Benefits Check',
    eyebrow: 'AHCCCS • UnitedHealthcare Community Plan',
    heroImage: '/assets/campaign/media/aba/ahcccs/family-support.webp',
    heroAlt: 'A parent and another adult talking while a young child explores a toy nearby.',
    heroHeight: 853,
    careImage: '/assets/campaign/media/aba/ahcccs/everyday-routine.webp',
    careAlt: 'Young child placing a book into a backpack with an adult nearby.',
    reassuranceTitle: 'AIA is in network with UnitedHealthcare Community Plan',
    reassuranceBody:
      'UnitedHealthcare Community Plan is the only AHCCCS plan AIA currently accepts for eligible ABA therapy services. Individual benefits, authorization, documentation, and member-specific requirements still need to be verified before services begin.',
    highlights: [
      'In network with UnitedHealthcare Community Plan',
      'No other AHCCCS plans are currently accepted',
      'ABA therapy for children ages 18 months through 8 years',
      'Autism diagnosis required before services begin',
    ],
    payerTitle: 'What UnitedHealthcare Community Plan families should know',
    payerBody:
      'Being in network does not eliminate member-specific benefit or authorization requirements. AIA can verify the administrative steps that apply before ABA services begin.',
    payerPoints: [
      'AIA is in network with UnitedHealthcare Community Plan for eligible ABA therapy services.',
      'AIA does not currently accept any other AHCCCS plan.',
      'Benefit, authorization, referral, and documentation requirements should be verified for the individual member.',
    ],
    processTitle: 'What happens next?',
    processSteps: sharedProcess,
    faq: [
      {
        question: 'Does AIA accept UnitedHealthcare Community Plan for ABA?',
        answer:
          'Yes. AIA is in network with UnitedHealthcare Community Plan for eligible ABA therapy services.',
      },
      {
        question: 'Does AIA accept other AHCCCS plans?',
        answer:
          'No. UnitedHealthcare Community Plan is the only AHCCCS plan AIA currently accepts.',
      },
      {
        question: 'Does my child need an autism diagnosis?',
        answer:
          'Yes. An autism diagnosis is required before ABA therapy services can begin at AIA, and AIA provides ABA for children ages 18 months through 8 years old.',
      },
      {
        question: 'Does UnitedHealthcare Community Plan require authorization for ABA?',
        answer:
          'Member-specific authorization, referral, benefit, and documentation requirements should be verified before services begin. AIA can explain the applicable steps after reviewing the relevant plan information.',
      },
    ],
    formTitle: 'Request a Benefits Check',
    formIntro:
      'Contact AIA about your UnitedHealthcare Community Plan benefits. Start with your contact details; member-specific information can be discussed through the appropriate secure process during follow-up.',
  },

  private_pay: {
    intent: 'private_pay',
    slug: '/lp/aba-private-pay',
    title: 'Private-Pay ABA Therapy Options | AIA',
    description:
      'Explore self-pay ABA options for eligible children ages 18 months through 8 years and discuss current rates and next steps with AIA.',
    h1: 'Private-Pay ABA Therapy Options',
    subhead:
      "AIA provides individualized, neurodiversity-affirming ABA therapy at its Scottsdale clinic for children ages 18 months through 8 years. Explore self-pay ABA options with AIA and request a conversation about current rates, payment options, and the intake process.",
    eligibilityNote,
    primaryCta: 'Discuss Private-Pay Options',
    eyebrow: 'Self-Pay / Private Pay',
    heroImage: '/assets/campaign/media/aba/private-pay/consultation.webp',
    heroAlt: 'Two adults having a calm planning conversation across a small table.',
    heroHeight: 853,
    careImage: '/assets/campaign/media/aba/private-pay/plant-care.webp',
    careAlt: 'Young child watering a small plant with an adult nearby.',
    reassuranceTitle: 'Get clear information before deciding how to pay',
    reassuranceBody:
      'Private pay may be relevant for families who plan to self-pay, do not have applicable coverage, or want to understand options outside insurance. AIA can explain current rates and available payment mechanisms directly.',
    highlights: [
      'ABA therapy for children ages 18 months through 8 years',
      'Autism diagnosis required before services begin',
      'Discuss current private-pay rates directly with AIA',
      'Keep financial decisions separate from individualized clinical recommendations',
    ],
    payerTitle: 'Questions worth asking in a private-pay conversation',
    payerBody:
      'Ask about the costs and billing details that matter to your family. AIA accepts HSA/FSA cards for ABA program fees. Payment method does not change clinical eligibility or guarantee a start date.',
    payerPoints: [
      'What are the current rates and billing cadence?',
      'What services are included in the quoted rate?',
      'Which payment methods can I use for ABA program fees?',
    ],
    processTitle: 'What happens next?',
    processSteps: sharedProcess,
    faq: [
      {
        question: 'Can I use AIA without insurance?',
        answer:
          'AIA can discuss current private-pay options with families considering care outside an insurance payment path. The same age and diagnosis eligibility requirements apply.',
      },
      {
        question: 'What does private-pay ABA cost?',
        answer:
          'Ask AIA about current rates, what a quote includes, and billing arrangements before deciding on next steps.',
      },
      {
        question: 'Can I pay with an HSA or FSA card?',
        answer:
          'AIA accepts HSA/FSA cards for ABA program fees. Check with your account administrator about your own eligibility and account requirements.',
      },
      {
        question: 'Does my child need an autism diagnosis?',
        answer:
          'Yes. An autism diagnosis is required before ABA therapy services can begin at AIA, and the child must be within AIA’s ABA service age range of 18 months through 8 years.',
      },
      {
        question: 'Does private pay change which services are recommended?',
        answer:
          'Clinical recommendations should be individualized based on assessment and need rather than the payment method.',
      },
    ],
    formTitle: 'Discuss Private-Pay Options',
    formIntro:
      'Share basic contact information and AIA can follow up about current private-pay options, eligibility, and next steps.',
  },
};
