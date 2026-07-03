export interface CourseItem {
  slug: string;
  title: string;
  universityId: string;
  universityName: string;
  universitySubtitle: string;
  color: string;
  duration: string;
  mode: string;
  tools: string | null;
  img: string;
  highlights: string[];
}

export interface SkillUniversityItem {
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  color: string;
  flag: string;
  description: string;
  logo: string;
  bgImage: string;
  programs: CourseItem[];
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const skillUniversities: SkillUniversityItem[] = [
  {
    id: 'cit',
    name: 'Canadian Institute of Technology (CIT)',
    shortName: 'Canadian Institute of Technology',
    subtitle: 'Tirana, Albania',
    color: '#3B82F6',
    flag: '🇦🇱',
    description: 'A recognized European higher education institution committed to internationally aligned academic excellence, innovation, and applied learning.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Logo_of_the_Canadian_Institute_of_Technology.svg/250px-Logo_of_the_Canadian_Institute_of_Technology.svg.png',
    bgImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80&auto=format&fit=crop',
    programs: [
      { slug: slugify('AI Video Creation Smart Sustainable'), title: 'AI Video Creation – Smart & Sustainable', universityId: 'cit', universityName: 'Canadian Institute of Technology (CIT)', universitySubtitle: 'Tirana, Albania', color: '#A855F7', duration: '3 Months', mode: 'Online', tools: 'Runway ML, ChatGPT, ElevenLabs', img: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&q=80&auto=format&fit=crop', highlights: ['Create professional videos using AI tools', 'Smart scriptwriting & automated production', 'AI-powered media analytics & editing', 'Content monetization strategies', 'Freelancing opportunities in AI media'] },
      { slug: slugify('Applied Data Science Machine Learning'), title: 'Applied Data Science & Machine Learning', universityId: 'cit', universityName: 'Canadian Institute of Technology (CIT)', universitySubtitle: 'Tirana, Albania', color: '#3B82F6', duration: '4 Months', mode: 'Online', tools: 'Python, TensorFlow, Jupyter', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop', highlights: ['Understand real-world data analysis techniques', 'Build machine learning models for business', 'Predict trends using AI-driven insights', 'Ethical and responsible AI practices', 'Data-driven decision making frameworks'] },
      { slug: slugify('Logistics Supply Chain Management'), title: 'Logistics & Supply Chain Management', universityId: 'cit', universityName: 'Canadian Institute of Technology (CIT)', universitySubtitle: 'Tirana, Albania', color: '#00C9B0', duration: '3 Months', mode: 'Online', tools: 'Excel, ERP Systems, SAP', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80&auto=format&fit=crop', highlights: ['Modern supply chain systems & workflows', 'Inventory and distribution management', 'Cost optimization strategies', 'KPI monitoring and performance analysis', 'Risk management in logistics operations'] },
      { slug: slugify('Business Intelligence Data Analytics'), title: 'Business Intelligence & Data Analytics', universityId: 'cit', universityName: 'Canadian Institute of Technology (CIT)', universitySubtitle: 'Tirana, Albania', color: '#FFB800', duration: '4 Months', mode: 'Online', tools: 'Power BI, Tableau, SQL', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format&fit=crop', highlights: ['Transform raw data into business insights', 'Design interactive dashboards & reports', 'KPI tracking for business performance', 'Data visualization for decision making', 'Strategic analytics for organizations'] },
      { slug: slugify('Digital Marketing with AI'), title: 'Digital Marketing with AI', universityId: 'cit', universityName: 'Canadian Institute of Technology (CIT)', universitySubtitle: 'Tirana, Albania', color: '#FF3B3B', duration: '3 Months', mode: 'Online', tools: 'ChatGPT, Canva AI, Google Analytics', img: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80&auto=format&fit=crop', highlights: ['AI-powered content creation strategies', 'Smart campaign optimization techniques', 'Customer behavior and audience analytics', 'Marketing automation using AI tools', 'Improve campaign ROI and performance'] },
      { slug: slugify('Virtual Reality VR for Business'), title: 'Virtual Reality (VR) for Business', universityId: 'cit', universityName: 'Canadian Institute of Technology (CIT)', universitySubtitle: 'Tirana, Albania', color: '#FF6B00', duration: '3 Months', mode: 'Online', tools: 'Unity, VR Headsets, Blender', img: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&q=80&auto=format&fit=crop', highlights: ['Introduction to immersive VR technologies', 'Business training and simulation solutions', 'VR integration for modern enterprises', 'Safety and operational applications', 'Future trends in immersive technologies'] },
    ],
  },
  {
    id: 'mua',
    name: 'Mediterranean University of Albania',
    shortName: 'Mediterranean University',
    subtitle: 'Tirana, Albania',
    color: '#DC2626',
    flag: '🇦🇱',
    description: 'A recognized European private higher education institution dedicated to academic excellence, research development, and international cooperation.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Mediterranean_University_of_Albania_logo.png/200px-Mediterranean_University_of_Albania_logo.png',
    bgImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80&auto=format&fit=crop',
    programs: [
      { slug: slugify('Real Estate Broker Certification'), title: 'Real Estate Broker Certification', universityId: 'mua', universityName: 'Mediterranean University of Albania', universitySubtitle: 'Tirana, Albania', color: '#3B82F6', duration: '4 Months', mode: 'Online + Practical', tools: null, img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&auto=format&fit=crop', highlights: ['Civil & Commercial Law fundamentals', 'Property Valuation methods', 'Contract Drafting & negotiation', 'Tax Legislation for real estate', 'Professional Ethics & standards', 'Practical Agency Training'] },
      { slug: slugify('Data Science AI Professional Training'), title: 'Data Science & AI Professional Training', universityId: 'mua', universityName: 'Mediterranean University of Albania', universitySubtitle: 'Tirana, Albania', color: '#A855F7', duration: '6 Months', mode: 'Online', tools: 'Python, SQL, TensorFlow', img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80&auto=format&fit=crop', highlights: ['Data Structures & SQL databases', 'Python for Data Science applications', 'Probability & Statistics foundations', 'Machine Learning algorithms', 'Deep Learning & neural networks', 'AI Tools Integration for business'] },
      { slug: slugify('Digital Marketing Professional'), title: 'Digital Marketing Professional', universityId: 'mua', universityName: 'Mediterranean University of Albania', universitySubtitle: 'Tirana, Albania', color: '#FF3B3B', duration: '4 Months', mode: 'Online', tools: 'Google Ads, Meta, Semrush', img: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80&auto=format&fit=crop', highlights: ['Digital Strategy & Market Research', 'SEO & Website Development', 'Social Media & Google Ads management', 'Data Analytics for marketing', 'AI-Based Content Optimization', 'Practical Campaign Development'] },
      { slug: slugify('Health Administrator'), title: 'Health Administrator', universityId: 'mua', universityName: 'Mediterranean University of Albania', universitySubtitle: 'Tirana, Albania', color: '#00C9B0', duration: '5 Months', mode: 'Online + Practical', tools: null, img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80&auto=format&fit=crop', highlights: ['Healthcare Systems & Policy analysis', 'Health Law & Ethics compliance', 'Hospital Operations & Finance', 'Quality & Patient Safety standards', 'Digital Health Systems management', 'Practical Training in healthcare'] },
    ],
  },
];

export function getAllCourses(): CourseItem[] {
  return skillUniversities.flatMap(u => u.programs);
}

export function getCourseBySlug(slug: string): CourseItem | undefined {
  return getAllCourses().find(c => c.slug === slug);
}

export function getUniversityById(id: string): SkillUniversityItem | undefined {
  return skillUniversities.find(u => u.id === id);
}
