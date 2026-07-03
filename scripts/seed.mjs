// Seed script: populates MongoDB with the site's full content so the
// frontend (university, skill, and course pages) can read it live
// instead of relying on hardcoded arrays. Safe to re-run (upserts).
// Run with: node --env-file=.env.local scripts/seed.mjs
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set');
  process.exit(1);
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const UniversitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String },
  website: { type: String },
  ranking: { type: String },
  image: { type: String },
  logo: { type: String },
  color: { type: String, default: '#3B82F6' },
  description: { type: String },
  about: { type: String },
  programs: [{ type: String }],
  highlights: [{ type: String }],
  stats: [{ label: { type: String }, value: { type: String } }],
  createdAt: { type: Date, default: Date.now },
});

const SkillUniversitySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  subtitle: { type: String },
  color: { type: String, default: '#3B82F6' },
  flag: { type: String },
  logo: { type: String },
  bgImage: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const SkillCourseSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  universityId: { type: String, required: true },
  universityName: { type: String, required: true },
  color: { type: String, default: '#3B82F6' },
  icon: { type: String, default: 'BookOpen' },
  duration: { type: String },
  mode: { type: String, default: 'Online' },
  tools: { type: String },
  img: { type: String },
  highlights: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const LeaderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  image: { type: String },
  years: { type: String },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const University = mongoose.model('University', UniversitySchema);
const SkillUniversity = mongoose.model('SkillUniversity', SkillUniversitySchema);
const SkillCourse = mongoose.model('SkillCourse', SkillCourseSchema);
const Leader = mongoose.model('Leader', LeaderSchema);

// --- Full rich content, migrated from the static frontend files ---
const universities = [
  {
    name: 'Canadian Institute of Technology', country: 'Albania', city: 'Tirana', ranking: 'Top Private', color: '#3B82F6',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80&auto=format&fit=crop',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Logo_of_the_Canadian_Institute_of_Technology.svg/250px-Logo_of_the_Canadian_Institute_of_Technology.svg.png',
    description: 'A recognized European higher education institution in one of Tirana\'s landmark towers, offering Bachelor and Master programs entirely in English.',
    about: 'The Canadian Institute of Technology (CIT) is located in one of the most important towers of Tirana, within walking distance of the main City Square. CIT offers Bachelor and Master programs entirely in English, divided into the Faculty of Engineering and the Faculty of Economy. The library provides access to over 3,000 English titles, and the institution is committed to internationally aligned academic excellence, innovation, and applied learning.',
    programs: ['BSc Computer Engineering', 'BSc Business Informatics', 'BSc Economy & Finance', 'MSc Computer Engineering', 'MSc Business Administration', 'Professional Skill Certifications (ECTS)'],
    highlights: ['Programs entirely in English', 'ECTS accredited credentials', 'Central Tirana campus location', 'Strong industry partnerships', 'International student community', 'SkillDad placement support'],
    stats: [{ label: 'Tuition', value: '€2k–4k/yr' }, { label: 'Programs', value: '10+' }, { label: 'Language', value: 'English' }, { label: 'Accreditation', value: 'ECTS' }],
  },
  {
    name: 'Western Balkans University', country: 'Albania', city: 'Tirana', ranking: 'Accredited', color: '#DC2626',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf18c8db0e?w=1200&q=80&auto=format&fit=crop',
    description: 'Established through Cambridge Clinical Laboratories and American Hospital Group, offering Medicine, Dentistry, and Pharmacy programs in English.',
    about: 'Western Balkans University (WBU) was established in 2022 through the cooperation framework of Cambridge Clinical Laboratories, the American Hospitals Group, and the International Hygeia Hospital. Located on Highway Tirana–Durrës, the campus features modern laboratories, simulation centres, and clinical training environments with the latest medical technology. WBU places a unique emphasis on academic excellence in Medicine, Medical Sciences, Technology, Economy, and Innovation.',
    programs: ['Medicine (MD)', 'Dentistry', 'Pharmacy', 'Nursing', 'BSc Biomedical Sciences', 'MSc Health Management'],
    highlights: ['Cambridge Clinical Laboratories partnership', 'American Hospital Group affiliation', 'Modern simulation centres', 'English-taught medical programs', 'Clinical training environments', 'EU-aligned medical standards'],
    stats: [{ label: 'Tuition', value: '€5k–8k/yr' }, { label: 'Programs', value: '8+' }, { label: 'Language', value: 'English' }, { label: 'Founded', value: '2022' }],
  },
  {
    name: 'Mediterranean University of Albania', country: 'Albania', city: 'Tirana', ranking: 'Accredited', color: '#A855F7',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80&auto=format&fit=crop',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Mediterranean_University_of_Albania_logo.png/200px-Mediterranean_University_of_Albania_logo.png',
    description: 'A recognized European private institution in the heart of Tirana with a modern Faculty of Medical Sciences campus and state-of-the-art laboratories.',
    about: 'The Mediterranean University of Albania (MUA) is located in the heart of Tirana with state-of-the-art infrastructure. The university recently inaugurated a new Faculty of Medical Sciences campus equipped with modern laboratories. MUA\'s central location gives students countless opportunities to work with neighboring companies and organizations. The university is dedicated to academic excellence, research development, and international cooperation.',
    programs: ['Medicine', 'Law', 'Economics', 'Political Science', 'Professional Skill Certifications (ECTS)', 'Health Administration'],
    highlights: ['New Faculty of Medical Sciences building', 'Central Tirana location', 'Modern laboratory infrastructure', 'Research development focus', 'International cooperation programs', 'SkillDad placement support'],
    stats: [{ label: 'Tuition', value: '€2k–5k/yr' }, { label: 'Programs', value: '12+' }, { label: 'Language', value: 'English/Albanian' }, { label: 'Accreditation', value: 'ECTS' }],
  },
  {
    name: 'Epoka University', country: 'Albania', city: 'Tirana', ranking: 'Top Ranked', color: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1200&q=80&auto=format&fit=crop',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Logo_e_Universitetit_Epoka.svg/250px-Logo_e_Universitetit_Epoka.svg.png',
    description: 'One of Albania\'s top-ranked universities with a green campus near Tirana International Airport, offering engineering, architecture, and economics programs.',
    about: 'Epoka University (EU) is a private university founded in 2007 in Tirana, Albania. The Rinas campus is located 12 km from the city centre near Tirana International Airport, set amidst green surroundings with comfortable physical and IT infrastructure. Epoka is a member of the Balkan Universities Network and offers programs in engineering, architecture, economics, and law with strong international partnerships.',
    programs: ['BSc Computer Engineering', 'BSc Architecture', 'BSc Civil Engineering', 'BA Economics', 'BA Law', 'MSc Applied Sciences'],
    highlights: ['Green campus near the airport', 'Balkan Universities Network member', 'Strong international partnerships', 'Modern IT infrastructure', 'Research-focused environment', 'English-taught programs'],
    stats: [{ label: 'Tuition', value: '€3k–5k/yr' }, { label: 'Programs', value: '15+' }, { label: 'Founded', value: '2007' }, { label: 'Campus', value: '12km from centre' }],
  },
  {
    name: 'ALAM', country: 'Malaysia', city: 'Melaka', ranking: 'Top Maritime', color: '#0EA5E9',
    image: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1f?w=1200&q=80&auto=format&fit=crop',
    description: 'Malaysia\'s premier maritime academy on a 67-acre campus overlooking the Straits of Malacca, training marine engineers and nautical officers.',
    about: 'Akademi Laut Malaysia (ALAM) is Malaysia\'s premier maritime education institution, located on a 67-acre campus in Melaka overlooking the busy Straits of Malacca. The campus features advanced classrooms, workshops, simulation centers, modern hostels, dining halls, sports facilities, and recreational areas. ALAM provides world-class training in marine engineering, nautical science, and port management, creating the ultimate experience for students immersed in maritime life.',
    programs: ['Diploma in Nautical Studies', 'Diploma in Marine Engineering', 'BSc Maritime Technology', 'Port Management', 'Advanced Maritime Safety', 'Ship Management'],
    highlights: ['67-acre campus on the Straits of Malacca', 'Advanced simulation centers', 'World-class maritime training', 'Modern hostel accommodation', 'Sports and recreational facilities', 'Industry-recognized certifications'],
    stats: [{ label: 'Tuition', value: '$3k–6k/yr' }, { label: 'Campus', value: '67 acres' }, { label: 'Location', value: 'Melaka' }, { label: 'Focus', value: 'Maritime' }],
  },
  {
    name: 'Geomatika University College', country: 'Malaysia', city: 'Kuala Lumpur', ranking: 'Accredited', color: '#10B981',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&q=80&auto=format&fit=crop',
    description: 'A leading Malaysian institution specializing in geospatial technology, IT, and built environment programs with satellite campuses across the country.',
    about: 'Geomatika University College (GUC) started as a Vocational Centre in 2000, carving a niche in Land Surveying, and has since been approved as a University by MOHE under the name Universiti Geomatika Malaysia. The main campus is in Setiawangsa, Kuala Lumpur, with satellite campuses in Kuching, Kota Kinabalu, and Keningau. GUC offers programs from foundation level to PhD across business, science, architecture, humanities, and social sciences.',
    programs: ['BSc Geospatial Technology', 'BSc Information Technology', 'Diploma in Architecture', 'Diploma in Business', 'MSc Built Environment', 'PhD Programs'],
    highlights: ['Specialization in geospatial technology', 'Multiple campuses across Malaysia', 'Foundation to PhD programs', 'Industry connections', 'Built environment expertise', 'MQA accredited'],
    stats: [{ label: 'Tuition', value: '$3k–7k/yr' }, { label: 'Programs', value: '20+' }, { label: 'Campuses', value: '4' }, { label: 'Founded', value: '2000' }],
  },
  {
    name: 'VIT Mauritius', country: 'Mauritius', city: 'Pierrefonds', ranking: 'Top Branch', color: '#8B5CF6',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80&auto=format&fit=crop',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Vellore_Institute_of_Technology_logo.svg/330px-Vellore_Institute_of_Technology_logo.svg.png',
    description: 'An international campus of India\'s prestigious VIT, situated in the Uniciti International Education Hub with modern facilities and labs.',
    about: 'VIT Mauritius is an international branch campus of India\'s prestigious Vellore Institute of Technology, one of India\'s top 10 universities. Situated in the Uniciti International Education Hub (UIEH) in Pierrefonds, Mauritius, VIT Mauritius provides modern facilities and laboratories for engineering and technology programs. Although an independent international campus, it is a proud member of the wider VIT Group of Institutions.',
    programs: ['BSc Computer Science', 'BSc Electronics Engineering', 'BSc Mechanical Engineering', 'BBA', 'MSc Data Science', 'MSc Artificial Intelligence'],
    highlights: ['Part of VIT Group (India Top 10)', 'Uniciti Education Hub campus', 'Modern labs and facilities', 'International student body', 'Engineering and technology focus', 'Island study environment'],
    stats: [{ label: 'Tuition', value: '$4k–8k/yr' }, { label: 'Programs', value: '10+' }, { label: 'Parent', value: 'VIT India' }, { label: 'Hub', value: 'Uniciti UIEH' }],
  },
  {
    name: 'Aura Institute of Business & Hospitality', country: 'Mauritius', city: 'Port Louis', ranking: 'Accredited', color: '#EC4899',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&auto=format&fit=crop',
    description: 'A specialized institute delivering premium hospitality, tourism, and business management education in the heart of the Indian Ocean.',
    about: 'The Aura Institute of Business and Hospitality is located in Port Louis, Mauritius, offering specialized programs in hospitality, tourism, and business management. Leveraging Mauritius\'s position as a premier tourism destination in the Indian Ocean, the institute provides students with hands-on industry experience alongside academic learning. The tropical island setting offers a unique environment for hospitality education.',
    programs: ['Diploma in Hospitality Management', 'BBA Hospitality & Tourism', 'Culinary Arts', 'Event Management', 'Hotel Operations', 'Tourism Marketing'],
    highlights: ['Premier tourism destination setting', 'Hands-on industry experience', 'Hospitality and tourism focus', 'Business management programs', 'Island learning environment', 'Industry placement support'],
    stats: [{ label: 'Tuition', value: '$4k–7k/yr' }, { label: 'Programs', value: '8+' }, { label: 'Focus', value: 'Hospitality' }, { label: 'Location', value: 'Port Louis' }],
  },
  {
    name: 'Brighton International Business School', country: 'Mauritius', city: 'Quatre Bornes', ranking: 'Accredited', color: '#0EA5E9',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop',
    description: 'An international business school offering UK-aligned business, finance, and management programs with global career pathways.',
    about: 'Brighton International Business School is located in Quatre Bornes, Mauritius, offering UK-aligned business, finance, and management programs. The school provides global career pathways through internationally recognized qualifications and industry partnerships. Students benefit from a multicultural learning environment with access to both African and Asian business networks.',
    programs: ['BBA International Business', 'BSc Finance & Accounting', 'MBA', 'Diploma in Management', 'MSc Strategic Marketing', 'Executive Education'],
    highlights: ['UK-aligned curriculum', 'International business focus', 'Global career pathways', 'Multicultural environment', 'Industry partnerships', 'Executive education options'],
    stats: [{ label: 'Tuition', value: '$5k–10k/yr' }, { label: 'Programs', value: '10+' }, { label: 'Focus', value: 'Business' }, { label: 'Alignment', value: 'UK Standards' }],
  },
  {
    name: 'Global College Malta', country: 'Malta', city: 'Smartcity', ranking: 'Accredited', color: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1614094082869-cd4e6b420843?w=1200&q=80&auto=format&fit=crop',
    description: 'An EU-based college in SmartCity Malta\'s modern business hub with panoramic Mediterranean views and Schengen area access.',
    about: 'Global College Malta (GCM) is located in SmartCity Malta, a modern and innovative business hub with panoramic views of the Mediterranean Sea. SmartCity Malta is a joint venture designed to be a creative business hub for Malta\'s knowledge economy. GCM is part of Study World Education Holding Group, offering European accredited degree courses at both undergraduate and postgraduate levels. Being in an EU member state provides students with Schengen area access and post-study work opportunities.',
    programs: ['BBA Business Management', 'BSc Information Technology', 'MBA', 'Diploma in Business', 'MSc Digital Marketing', 'Postgraduate Certificates'],
    highlights: ['SmartCity Malta business hub', 'Panoramic Mediterranean views', 'EU member state benefits', 'Schengen area access', 'Post-study work opportunities', 'Modern campus facilities'],
    stats: [{ label: 'Tuition', value: '€4k–8k/yr' }, { label: 'Programs', value: '12+' }, { label: 'Location', value: 'SmartCity' }, { label: 'EU Access', value: 'Schengen' }],
  },
  {
    name: 'MCAST', country: 'Malta', city: 'Paola', ranking: 'Top Public', color: '#3B82F6',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/2022_-_MCAST_Square.jpg/1200px-2022_-_MCAST_Square.jpg',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/MCAST_Logo_2021.jpg/250px-MCAST_Logo_2021.jpg',
    description: 'Malta\'s leading public vocational college with a flagship Resource Centre, offering hands-on diploma and degree programs across seven institutes.',
    about: 'The Malta College of Arts, Science and Technology (MCAST) is Malta\'s leading public vocational and higher education institution, consisting of seven institutes over four campuses. The main campus in Paola includes the flagship €9.3 million MCAST Resource Centre, a striking 4-floor building with a gross floor area of 7,920 m². MCAST offers hands-on diploma and degree programs across multiple disciplines, with campuses also in Mosta and Gozo.',
    programs: ['Diploma in Engineering', 'BSc Applied Sciences', 'Creative Arts & Design', 'ICT & Computing', 'Business & Commerce', 'Health & Social Care'],
    highlights: ['Malta\'s top public institution', '€9.3M flagship Resource Centre', 'Seven specialized institutes', 'Four campus locations', 'Hands-on vocational training', 'Strong EU employment links'],
    stats: [{ label: 'Tuition', value: '€4k–6k/yr' }, { label: 'Institutes', value: '7' }, { label: 'Campuses', value: '4' }, { label: 'Type', value: 'Public' }],
  },
  {
    name: 'IDEA College', country: 'Malta', city: 'Valletta', ranking: 'Accredited', color: '#EC4899',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&q=80&auto=format&fit=crop',
    description: 'A creative and design-focused institution in Malta offering innovative programs in digital arts, media, and creative technologies.',
    about: 'IDEA College is a creative and design-focused institution located in Valletta, Malta. The college offers innovative programs in digital arts, media, and creative technologies, preparing students for careers in the rapidly evolving creative industries. Located in Malta\'s historic capital, students benefit from the rich cultural heritage and growing digital economy of the EU island nation.',
    programs: ['Digital Arts & Design', 'Media Production', 'Creative Technologies', 'Graphic Design', 'Animation & VFX', 'UX/UI Design'],
    highlights: ['Creative and design focus', 'Historic Valletta location', 'Digital arts specialization', 'Growing EU creative sector', 'Industry-relevant curriculum', 'Portfolio-based learning'],
    stats: [{ label: 'Tuition', value: '€4k–7k/yr' }, { label: 'Programs', value: '8+' }, { label: 'Focus', value: 'Creative Arts' }, { label: 'Location', value: 'Valletta' }],
  },
  {
    name: 'ECI', country: 'Malta', city: 'St. Julian\'s', ranking: 'Accredited', color: '#10B981',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80&auto=format&fit=crop',
    description: 'A technology-focused institution in Malta providing accredited programs in IT, cybersecurity, and digital transformation.',
    about: 'ECI is a technology-focused institution located in St. Julian\'s, Malta, providing accredited programs in IT, cybersecurity, and digital transformation. As Malta positions itself as a growing European tech hub, ECI prepares students for careers in the digital economy. The institution\'s location in the vibrant St. Julian\'s area offers students a dynamic learning environment with proximity to Malta\'s growing tech ecosystem.',
    programs: ['BSc Information Technology', 'Cybersecurity', 'Digital Transformation', 'Software Development', 'Cloud Computing', 'Data Analytics'],
    highlights: ['Technology-focused curriculum', 'Cybersecurity specialization', 'Malta\'s growing tech hub', 'St. Julian\'s vibrant location', 'Digital transformation programs', 'EU tech career access'],
    stats: [{ label: 'Tuition', value: '€4k–8k/yr' }, { label: 'Programs', value: '8+' }, { label: 'Focus', value: 'Technology' }, { label: 'Location', value: 'St. Julian\'s' }],
  },
  {
    name: 'University of Montenegro', country: 'Montenegro', city: 'Podgorica', ranking: 'National Top', color: '#6366F1',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Podgorica_Law_School%281%29.jpg/1200px-Podgorica_Law_School%281%29.jpg',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/University_of_Montenegro_logo_%28version_1%29.svg/500px-University_of_Montenegro_logo_%28version_1%29.svg.png',
    description: 'Montenegro\'s premier national university with faculties across Podgorica, offering multi-disciplinary programs as an EU candidate country institution.',
    about: 'The University of Montenegro is the country\'s premier national university, with its central administration and most faculties located in Podgorica, the capital. The university\'s new Rectorate building was opened in 2009, and the University Sports and Cultural Center opened in 2015. As an EU candidate country institution, the university provides affordable education with growing international programs in engineering, tourism, sciences, and business administration.',
    programs: ['BSc Engineering', 'BA Tourism & Hospitality', 'BSc Natural Sciences', 'MBA', 'Law', 'Maritime Studies (Kotor)'],
    highlights: ['Montenegro\'s top national university', 'EU candidate country institution', 'Very affordable education', 'Beautiful Adriatic location', 'Modern sports & cultural centre', 'Maritime faculty in Kotor'],
    stats: [{ label: 'Tuition', value: '€2k–4k/yr' }, { label: 'Programs', value: '20+' }, { label: 'Faculties', value: '19' }, { label: 'Status', value: 'National Top' }],
  },
  {
    name: 'Luarasi University', country: 'Albania', city: 'Tirana', ranking: 'Accredited', color: '#0D9488',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&q=80&auto=format&fit=crop',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Luarasi_University_Logo.svg/250px-Luarasi_University_Logo.svg.png',
    description: 'A private Albanian university in Tirana known for its Law and Business faculties, offering ECTS-accredited programs with a focus on the Western Balkans job market.',
    about: 'Luarasi University is a private higher education institution based in Tirana, Albania, recognized for its strong Law and Business faculties. The university follows the Bologna Process / ECTS credit framework, making its degrees comparable and transferable across the European Higher Education Area. Luarasi focuses on preparing graduates for legal, administrative, and business careers across Albania and the wider Western Balkans region.',
    programs: ['BA Law', 'BA Business Administration', 'BSc Economics & Finance', 'Master in Law', 'MBA', 'Professional Skill Certifications (ECTS)'],
    highlights: ['Strong Law faculty reputation', 'ECTS-accredited programs', 'Central Tirana location', 'Business & legal career focus', 'Bologna Process aligned', 'Affordable tuition'],
    stats: [{ label: 'Tuition', value: '€2k–4k/yr' }, { label: 'Programs', value: '8+' }, { label: 'Language', value: 'English/Albanian' }, { label: 'Accreditation', value: 'ECTS' }],
  },
];

// --- Skill universities + skill courses, migrated from src/app/skill/page.tsx ---
const skillUniversities = [
  {
    slug: 'cit', name: 'Canadian Institute of Technology (CIT)', shortName: 'Canadian Institute of Technology',
    subtitle: 'Tirana, Albania', color: '#3B82F6', flag: '🇦🇱',
    description: 'A recognized European higher education institution committed to internationally aligned academic excellence, innovation, and applied learning.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Logo_of_the_Canadian_Institute_of_Technology.svg/250px-Logo_of_the_Canadian_Institute_of_Technology.svg.png',
    bgImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'mua', name: 'Mediterranean University of Albania', shortName: 'Mediterranean University',
    subtitle: 'Tirana, Albania', color: '#DC2626', flag: '🇦🇱',
    description: 'A recognized European private higher education institution dedicated to academic excellence, research development, and international cooperation.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Mediterranean_University_of_Albania_logo.png/200px-Mediterranean_University_of_Albania_logo.png',
    bgImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80&auto=format&fit=crop',
  },
];

const skillCourses = [
  { title: 'AI Video Creation – Smart & Sustainable', universityId: 'cit', universityName: 'Canadian Institute of Technology (CIT)', color: '#A855F7', icon: 'Cpu', duration: '3 Months', mode: 'Online', tools: 'Runway ML, ChatGPT, ElevenLabs', img: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&q=80&auto=format&fit=crop', highlights: ['Create professional videos using AI tools', 'Smart scriptwriting & automated production', 'AI-powered media analytics & editing', 'Content monetization strategies', 'Freelancing opportunities in AI media'] },
  { title: 'Applied Data Science & Machine Learning', universityId: 'cit', universityName: 'Canadian Institute of Technology (CIT)', color: '#3B82F6', icon: 'Brain', duration: '4 Months', mode: 'Online', tools: 'Python, TensorFlow, Jupyter', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop', highlights: ['Understand real-world data analysis techniques', 'Build machine learning models for business', 'Predict trends using AI-driven insights', 'Ethical and responsible AI practices', 'Data-driven decision making frameworks'] },
  { title: 'Logistics & Supply Chain Management', universityId: 'cit', universityName: 'Canadian Institute of Technology (CIT)', color: '#00C9B0', icon: 'ShoppingCart', duration: '3 Months', mode: 'Online', tools: 'Excel, ERP Systems, SAP', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80&auto=format&fit=crop', highlights: ['Modern supply chain systems & workflows', 'Inventory and distribution management', 'Cost optimization strategies', 'KPI monitoring and performance analysis', 'Risk management in logistics operations'] },
  { title: 'Business Intelligence & Data Analytics', universityId: 'cit', universityName: 'Canadian Institute of Technology (CIT)', color: '#FFB800', icon: 'BarChart3', duration: '4 Months', mode: 'Online', tools: 'Power BI, Tableau, SQL', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format&fit=crop', highlights: ['Transform raw data into business insights', 'Design interactive dashboards & reports', 'KPI tracking for business performance', 'Data visualization for decision making', 'Strategic analytics for organizations'] },
  { title: 'Digital Marketing with AI', universityId: 'cit', universityName: 'Canadian Institute of Technology (CIT)', color: '#FF3B3B', icon: 'Megaphone', duration: '3 Months', mode: 'Online', tools: 'ChatGPT, Canva AI, Google Analytics', img: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80&auto=format&fit=crop', highlights: ['AI-powered content creation strategies', 'Smart campaign optimization techniques', 'Customer behavior and audience analytics', 'Marketing automation using AI tools', 'Improve campaign ROI and performance'] },
  { title: 'Virtual Reality (VR) for Business', universityId: 'cit', universityName: 'Canadian Institute of Technology (CIT)', color: '#FF6B00', icon: 'Glasses', duration: '3 Months', mode: 'Online', tools: 'Unity, VR Headsets, Blender', img: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&q=80&auto=format&fit=crop', highlights: ['Introduction to immersive VR technologies', 'Business training and simulation solutions', 'VR integration for modern enterprises', 'Safety and operational applications', 'Future trends in immersive technologies'] },
  { title: 'Real Estate Broker Certification', universityId: 'mua', universityName: 'Mediterranean University of Albania', color: '#3B82F6', icon: 'Home', duration: '4 Months', mode: 'Online + Practical', tools: null, img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&auto=format&fit=crop', highlights: ['Civil & Commercial Law fundamentals', 'Property Valuation methods', 'Contract Drafting & negotiation', 'Tax Legislation for real estate', 'Professional Ethics & standards', 'Practical Agency Training'] },
  { title: 'Data Science & AI Professional Training', universityId: 'mua', universityName: 'Mediterranean University of Albania', color: '#A855F7', icon: 'Brain', duration: '6 Months', mode: 'Online', tools: 'Python, SQL, TensorFlow', img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80&auto=format&fit=crop', highlights: ['Data Structures & SQL databases', 'Python for Data Science applications', 'Probability & Statistics foundations', 'Machine Learning algorithms', 'Deep Learning & neural networks', 'AI Tools Integration for business'] },
  { title: 'Digital Marketing Professional', universityId: 'mua', universityName: 'Mediterranean University of Albania', color: '#FF3B3B', icon: 'Megaphone', duration: '4 Months', mode: 'Online', tools: 'Google Ads, Meta, Semrush', img: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80&auto=format&fit=crop', highlights: ['Digital Strategy & Market Research', 'SEO & Website Development', 'Social Media & Google Ads management', 'Data Analytics for marketing', 'AI-Based Content Optimization', 'Practical Campaign Development'] },
  { title: 'Health Administrator', universityId: 'mua', universityName: 'Mediterranean University of Albania', color: '#00C9B0', icon: 'Stethoscope', duration: '5 Months', mode: 'Online + Practical', tools: null, img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80&auto=format&fit=crop', highlights: ['Healthcare Systems & Policy analysis', 'Health Law & Ethics compliance', 'Hospital Operations & Finance', 'Quality & Patient Safety standards', 'Digital Health Systems management', 'Practical Training in healthcare'] },
];

const leaders = [
  { name: 'Edwin C Benny', role: 'CEO', image: '/assets/team/edwin.jpeg', bio: 'Visionary leader driving World Passport\'s mission to make international education accessible to every student.', order: 0 },
  { name: 'Mujeeb T', role: 'Director', image: '/assets/team/mujeeb-t.jpg', bio: 'Guiding strategic direction and partnerships to expand World Passport\'s global education network.', order: 1 },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to', mongoose.connection.name);

  for (const u of universities) {
    await University.findOneAndUpdate({ name: u.name }, u, { upsert: true, new: true, setDefaultsOnInsert: true });
  }
  console.log(`Universities upserted: ${universities.length}`);

  for (const su of skillUniversities) {
    await SkillUniversity.findOneAndUpdate({ name: su.name }, su, { upsert: true, new: true, setDefaultsOnInsert: true });
  }
  console.log(`Skill universities upserted: ${skillUniversities.length}`);

  for (const sc of skillCourses) {
    const slug = slugify(sc.title);
    const parentUni = skillUniversities.find(u => u.slug === sc.universityId);
    await SkillCourse.findOneAndUpdate(
      { slug },
      { ...sc, slug, universitySubtitle: parentUni?.subtitle },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }
  console.log(`Skill courses upserted: ${skillCourses.length}`);

  for (const l of leaders) {
    await Leader.findOneAndUpdate({ name: l.name }, l, { upsert: true, new: true, setDefaultsOnInsert: true });
  }
  console.log(`Leaders upserted: ${leaders.length}`);

  await mongoose.disconnect();
  console.log('Done.');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
