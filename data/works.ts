export type Work = {
  id: string;
  index: string;
  title: string;
  role: string;
  year: string;
  duration: string;
  client: string;
  summary: string;
  body: string[];
  tech: string[];
  link?: string;
  image: string;
};

const img = (seed: string) => `https://picsum.photos/seed/${seed}/1920/1280?grayscale`;

export const works: Work[] = [
  {
    id: 'hindra',
    index: '01',
    title: 'Hindra Studio',
    role: 'Founder, Frontend',
    year: '2024',
    duration: 'Ongoing',
    client: 'Istanbul',
    summary: 'A studio for AI, content and growth focused products.',
    body: [
      'Founded Hindra in early 2024 to turn ideas into polished, shippable products for startups and growing brands.',
      'I own everything: positioning, scoping, design system, UI, frontend in Next.js, and ongoing iteration with clients. One mind, fewer translations lost in handoff.',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Design Systems'],
    link: 'https://hindra.studio',
    image: img('armin_hindra'),
  },
  {
    id: 'biguppetite',
    index: '02',
    title: 'Big Uppetite',
    role: 'Frontend Developer',
    year: '2024',
    duration: 'Ongoing',
    client: 'Australia, Remote',
    summary: 'Frontend for a remote, distributed product team.',
    body: [
      'Building and maintaining the product frontend with Next.js and SSR. Turning design concepts into fast, polished interfaces.',
      'Stretches into motion graphics and video editing whenever the brand needs it.',
    ],
    tech: ['Next.js', 'SSR', 'React', 'Motion'],
    image: img('armin_biguppetite'),
  },
  {
    id: 'rush',
    index: '03',
    title: 'Rush Graphics',
    role: 'Designer',
    year: '2024',
    duration: '2024 to 2025',
    client: 'New Jersey, Remote',
    summary: 'UI and brand assets for client work.',
    body: [
      'Designed user interfaces and brand assets across multiple client projects in Adobe Creative Suite.',
      'Focus areas: UI, visual systems and polished production graphics.',
    ],
    tech: ['Figma', 'Adobe CC', 'Brand', 'UI'],
    image: img('armin_rush'),
  },
  {
    id: 'aaq',
    index: '04',
    title: 'AAQ Real Estate',
    role: 'Project Manager',
    year: '2025',
    duration: 'Ongoing',
    client: 'Dubai, Remote',
    summary: 'Coordinating teams across the UK, UAE and Türkiye.',
    body: [
      'Coordinating projects across distributed teams in three time zones.',
      'Planning, delivery and stakeholder communication for a fast scaling real estate business.',
    ],
    tech: ['Project Management', 'Operations', 'Cross Team'],
    image: img('armin_aaq'),
  },
];

export const sectionImages = [
  img('armin_cover'),
  img('armin_about'),
  img('armin_stack'),
  img('armin_selected'),
  img('armin_contact'),
];

export const stack = {
  deep: ['Next.js', 'React', 'TypeScript', 'UI Design', 'UX', 'Design Systems'],
  broad: ['Motion', 'AI', 'Brand', 'Adobe CC', 'Project Management'],
  marketing: ['Audience', 'Paid Ads', 'Search Engine Optimization', 'Answer Engine Optimization'],
};

export const meta = {
  name: 'Armin Parvardegary',
  role: 'T Shape · Senior Frontend & Product Designer',
  city: 'Istanbul',
  email: 'hello@hindra.studio',
  linkedin: 'https://linkedin.com/in/armin-parvardegary',
  education: {
    school: 'İstanbul Kent Üniversitesi',
    field: 'Computer Programming',
    years: '2025 to 2028',
  },
};
