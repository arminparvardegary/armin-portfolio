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

// Scroll order is REVERSED: top of page is Contact, bottom is Origin.
// Indices below match the new scroll-order activeSection state.
export const sectionImages = [
  img('armin_contact'),  // 0 — top (Contact)
  img('armin_selected'), // 1 — Work
  img('armin_stack'),    // 2 — Stack
  img('armin_about'),    // 3 — About
  img('armin_cover'),    // 4 — bottom (Origin / Name)
];

const svg = (s: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(s.replace(/\s+/g, ' ').trim())}`;

export const introImages = [
  // Warm blurred blobs
  svg(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 800'>
      <defs>
        <filter id='b' x='-20%' y='-20%' width='140%' height='140%'>
          <feGaussianBlur stdDeviation='75'/>
        </filter>
      </defs>
      <rect width='600' height='800' fill='#161310'/>
      <circle cx='180' cy='260' r='240' fill='#ff3d00' opacity='0.5' filter='url(#b)'/>
      <circle cx='460' cy='620' r='280' fill='#3a261a' opacity='0.75' filter='url(#b)'/>
      <circle cx='320' cy='460' r='80' fill='#f4f1ec' opacity='0.1' filter='url(#b)'/>
    </svg>
  `),
  // Cool monochrome blobs
  svg(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 720 960'>
      <defs>
        <filter id='b' x='-20%' y='-20%' width='140%' height='140%'>
          <feGaussianBlur stdDeviation='100'/>
        </filter>
      </defs>
      <rect width='720' height='960' fill='#13161a'/>
      <circle cx='560' cy='280' r='340' fill='#3e4750' opacity='0.85' filter='url(#b)'/>
      <circle cx='160' cy='760' r='220' fill='#f4f1ec' opacity='0.18' filter='url(#b)'/>
      <circle cx='420' cy='620' r='120' fill='#ff3d00' opacity='0.22' filter='url(#b)'/>
    </svg>
  `),
  // Geometric diagonal bands
  svg(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 520 720'>
      <rect width='520' height='720' fill='#1a1814'/>
      <path d='M-20,180 L540,40 L540,92 L-20,232 Z' fill='#ff3d00' opacity='0.6'/>
      <path d='M-20,380 L540,280 L540,330 L-20,430 Z' fill='#f4f1ec' opacity='0.11'/>
      <path d='M-20,540 L540,460 L540,490 L-20,570 Z' fill='#f4f1ec' opacity='0.06'/>
      <path d='M-20,640 L540,580 L540,605 L-20,665 Z' fill='#ff3d00' opacity='0.18'/>
    </svg>
  `),
  // Radial gradient with concentric rings
  svg(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 780'>
      <defs>
        <filter id='b' x='-20%' y='-20%' width='140%' height='140%'>
          <feGaussianBlur stdDeviation='35'/>
        </filter>
        <radialGradient id='g' cx='32%' cy='34%' r='85%'>
          <stop offset='0%' stop-color='#ff3d00' stop-opacity='0.55'/>
          <stop offset='62%' stop-color='#2a1a14' stop-opacity='1'/>
          <stop offset='100%' stop-color='#0e0e10' stop-opacity='1'/>
        </radialGradient>
      </defs>
      <rect width='560' height='780' fill='url(#g)'/>
      <circle cx='180' cy='280' r='80' fill='none' stroke='#f4f1ec' stroke-width='1' opacity='0.34' filter='url(#b)'/>
      <circle cx='180' cy='280' r='150' fill='none' stroke='#f4f1ec' stroke-width='1' opacity='0.22' filter='url(#b)'/>
      <circle cx='180' cy='280' r='225' fill='none' stroke='#f4f1ec' stroke-width='1' opacity='0.14' filter='url(#b)'/>
      <circle cx='180' cy='280' r='305' fill='none' stroke='#f4f1ec' stroke-width='1' opacity='0.08' filter='url(#b)'/>
    </svg>
  `),
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
