export interface Destination {
  id: string;
  code: string;
  name: string;
  tagline: string;
  tag: string;
  stats: { unis: string; avgCost: string; acceptance: string; intl: string };
  highlights: string[];
  topUnis: { name: string; rank: string; field: string }[];
  programs: string[];
  salary: string;
}

export const destinations: Destination[] = [
  {
    id: 'al', code: 'AL', name: 'Albania',
    tagline: 'Affordable European education hub',
    tag: 'Most Popular',
    stats: { unis: '5', avgCost: '€2k–5k/yr', acceptance: '80%', intl: '10k+' },
    highlights: ['Affordable tuition & living costs', 'EU-aligned academic standards', 'English-taught programs available', 'Growing international student community'],
    topUnis: [
      { name: 'Canadian Institute of Technology', rank: 'Top Private', field: 'Technology' },
      { name: 'Western Balkans University', rank: 'Accredited', field: 'Business' },
      { name: 'Mediterranean University of Albania', rank: 'Accredited', field: 'Sciences' },
      { name: 'Epoka University', rank: 'Top Ranked', field: 'Engineering' },
      { name: 'Luarasi University', rank: 'Accredited', field: 'Law & Business' },
    ],
    programs: ['BSc Computer Science', 'MBA', 'Engineering', 'Data Science'],
    salary: '€15,000+',
  },
  {
    id: 'mt', code: 'MT', name: 'Malta',
    tagline: 'English-speaking EU member state',
    tag: 'EU Member',
    stats: { unis: '4', avgCost: '€4k–8k/yr', acceptance: '72%', intl: '8k+' },
    highlights: ['EU member state with Schengen access', 'English is an official language', 'Strong vocational training', 'Post-study work opportunities'],
    topUnis: [
      { name: 'Global College Malta', rank: 'Accredited', field: 'Business' },
      { name: 'MCAST', rank: 'Top Public', field: 'Vocational' },
      { name: 'IDEA College', rank: 'Accredited', field: 'Creative Arts' },
      { name: 'ECI', rank: 'Accredited', field: 'Technology' },
    ],
    programs: ['BSc IT', 'Diploma Studies', 'Business Management', 'Creative Arts'],
    salary: '€22,000+',
  },
  {
    id: 'my', code: 'MY', name: 'Malaysia',
    tagline: "Asia's education gateway",
    tag: 'Top Value',
    stats: { unis: '2', avgCost: '$3k–8k/yr', acceptance: '75%', intl: '130k+' },
    highlights: ['World-class maritime education', 'Affordable cost of living', 'Multicultural learning environment', 'Strong industry connections'],
    topUnis: [
      { name: 'ALAM', rank: 'Top Maritime', field: 'Maritime Studies' },
      { name: 'Geomatika University College', rank: 'Accredited', field: 'Technology' },
    ],
    programs: ['Maritime Studies', 'BSc IT', 'Diploma Programs', 'Engineering'],
    salary: '$18,000+',
  },
  {
    id: 'mu', code: 'MU', name: 'Mauritius',
    tagline: 'English-medium island campuses',
    tag: 'Emerging',
    stats: { unis: '3', avgCost: '$4k–10k/yr', acceptance: '78%', intl: '5k+' },
    highlights: ['English-medium instruction', 'International branch campuses', 'Hospitality & business focus', 'Safe study environment'],
    topUnis: [
      { name: 'VIT Mauritius', rank: 'Top Branch', field: 'Engineering' },
      { name: 'Aura Institute of Business & Hospitality', rank: 'Accredited', field: 'Hospitality' },
      { name: 'Brighton International Business School', rank: 'Accredited', field: 'Business' },
    ],
    programs: ['BSc Engineering', 'BBA', 'Hospitality Management', 'MBA'],
    salary: '$15,000+',
  },
  {
    id: 'me', code: 'ME', name: 'Montenegro',
    tagline: 'Adriatic academic gateway',
    tag: 'Rising Star',
    stats: { unis: '1', avgCost: '€2k–4k/yr', acceptance: '82%', intl: '3k+' },
    highlights: ['Very affordable education', 'Adriatic coastal location', 'EU candidate country', 'Growing international programs'],
    topUnis: [
      { name: 'University of Montenegro', rank: 'National Top', field: 'Multi-discipline' },
    ],
    programs: ['BSc Engineering', 'BA Tourism', 'MSc Sciences', 'MBA'],
    salary: '€12,000+',
  },
];
