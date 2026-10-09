import { z } from 'astro/zod';

const requiredText = z.string().refine((value) => value.trim().length > 0, {
  message: 'Team content must not be empty or whitespace-only'
});

const teamMemberSchema = z.object({
  name: requiredText,
  role: requiredText,
  image: requiredText,
  imageAlt: requiredText
});

const teamGroupSchema = z.object({
  heading: requiredText,
  members: z.array(teamMemberSchema).min(1)
});

export const teamPageSchema = z.object({
  intro: z.object({
    heading: requiredText,
    organization: requiredText,
    location: requiredText,
    body: requiredText
  }),
  clinicalGroups: z.array(teamGroupSchema).min(1),
  careTeam: z.object({
    heading: requiredText,
    groupHeading: requiredText,
    tagline: requiredText,
    members: z.array(teamMemberSchema).min(1),
    closingStatement: requiredText
  }),
  careers: z.object({
    eyebrow: requiredText,
    heading: requiredText,
    intro: requiredText,
    contactText: requiredText,
    email: z.email(),
    cta: z.object({
      label: requiredText,
      href: z.string().regex(/^\/(?!\/)/, 'Team CTA must use a root-relative local path')
    })
  })
}).superRefine((content, context) => {
  const members = [
    ...content.clinicalGroups.flatMap((group) => group.members),
    ...content.careTeam.members
  ];
  const seen = new Set<string>();
  for (const member of members) {
    const key = member.name.trim().toLocaleLowerCase('en-US');
    if (seen.has(key)) {
      context.addIssue({ code: 'custom', message: `Duplicate Team member: ${member.name}` });
    }
    seen.add(key);
  }
});

export type TeamPageContent = z.infer<typeof teamPageSchema>;
