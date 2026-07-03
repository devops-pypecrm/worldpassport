// One-off seed script: populates MongoDB with the content currently
// hardcoded in the frontend (university pages, skill/course pages, team).
// Run with: node --env-file=.env.local scripts/seed.mjs
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set');
  process.exit(1);
}

const UniversitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String },
  website: { type: String },
  ranking: { type: String },
  image: { type: String },
  logo: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const SkillUniversitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  subtitle: { type: String },
  color: { type: String, default: '#3B82F6' },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const SkillCourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  universityId: { type: String, required: true },
  universityName: { type: String, required: true },
  color: { type: String, default: '#3B82F6' },
  icon: { type: String, default: 'BookOpen' },
  duration: { type: String },
  mode: { type: String, default: 'Online' },
  tools: { type: String },
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

// --- Data extracted from src/app/university/[id]/page.tsx ---
const universities = [
  { name: 'Canadian Institute of Technology', country: 'Albania', city: 'Tirana', ranking: 'Top Private', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80&auto=format&fit=crop', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Logo_of_the_Canadian_Institute_of_Technology.svg/250px-Logo_of_the_Canadian_Institute_of_Technology.svg.png', description: 'A recognized European higher education institution in one of Tirana\'s landmark towers, offering Bachelor and Master programs entirely in English.' },
  { name: 'Western Balkans University', country: 'Albania', city: 'Tirana', ranking: 'Accredited', image: 'https://images.unsplash.com/photo-1587825140708-dfaf18c8db0e?w=1200&q=80&auto=format&fit=crop', description: 'Established through Cambridge Clinical Laboratories and American Hospital Group, offering Medicine, Dentistry, and Pharmacy programs in English.' },
  { name: 'Mediterranean University of Albania', country: 'Albania', city: 'Tirana', ranking: 'Accredited', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80&auto=format&fit=crop', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Mediterranean_University_of_Albania_logo.png/200px-Mediterranean_University_of_Albania_logo.png', description: 'A recognized European private institution in the heart of Tirana with a modern Faculty of Medical Sciences campus and state-of-the-art laboratories.' },
  { name: 'Epoka University', country: 'Albania', city: 'Tirana', ranking: 'Top Ranked', image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1200&q=80&auto=format&fit=crop', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Logo_e_Universitetit_Epoka.svg/250px-Logo_e_Universitetit_Epoka.svg.png', description: 'One of Albania\'s top-ranked universities with a green campus near Tirana International Airport, offering engineering, architecture, and economics programs.' },
  { name: 'ALAM', country: 'Malaysia', city: 'Melaka', ranking: 'Top Maritime', image: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1f?w=1200&q=80&auto=format&fit=crop', description: 'Malaysia\'s premier maritime academy on a 67-acre campus overlooking the Straits of Malacca, training marine engineers and nautical officers.' },
  { name: 'Geomatika University College', country: 'Malaysia', city: 'Kuala Lumpur', ranking: 'Accredited', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&q=80&auto=format&fit=crop', description: 'A leading Malaysian institution specializing in geospatial technology, IT, and built environment programs with satellite campuses across the country.' },
  { name: 'VIT Mauritius', country: 'Mauritius', city: 'Pierrefonds', ranking: 'Top Branch', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80&auto=format&fit=crop', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Vellore_Institute_of_Technology_logo.svg/330px-Vellore_Institute_of_Technology_logo.svg.png', description: 'An international campus of India\'s prestigious VIT, situated in the Uniciti International Education Hub with modern facilities and labs.' },
  { name: 'Aura Institute of Business & Hospitality', country: 'Mauritius', city: 'Port Louis', ranking: 'Accredited', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&auto=format&fit=crop', description: 'A specialized institute delivering premium hospitality, tourism, and business management education in the heart of the Indian Ocean.' },
  { name: 'Brighton International Business School', country: 'Mauritius', city: 'Quatre Bornes', ranking: 'Accredited', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop', description: 'An international business school offering UK-aligned business, finance, and management programs with global career pathways.' },
  { name: 'Global College Malta', country: 'Malta', city: 'Smartcity', ranking: 'Accredited', image: 'https://images.unsplash.com/photo-1614094082869-cd4e6b420843?w=1200&q=80&auto=format&fit=crop', description: 'An EU-based college in SmartCity Malta\'s modern business hub with panoramic Mediterranean views and Schengen area access.' },
  { name: 'MCAST', country: 'Malta', city: 'Paola', ranking: 'Top Public', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/2022_-_MCAST_Square.jpg/1200px-2022_-_MCAST_Square.jpg', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/MCAST_Logo_2021.jpg/250px-MCAST_Logo_2021.jpg', description: 'Malta\'s leading public vocational college with a flagship Resource Centre, offering hands-on diploma and degree programs across seven institutes.' },
  { name: 'IDEA College', country: 'Malta', city: 'Valletta', ranking: 'Accredited', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&q=80&auto=format&fit=crop', description: 'A creative and design-focused institution in Malta offering innovative programs in digital arts, media, and creative technologies.' },
  { name: 'ECI', country: 'Malta', city: 'St. Julian\'s', ranking: 'Accredited', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80&auto=format&fit=crop', description: 'A technology-focused institution in Malta providing accredited programs in IT, cybersecurity, and digital transformation.' },
  { name: 'University of Montenegro', country: 'Montenegro', city: 'Podgorica', ranking: 'National Top', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Podgorica_Law_School%281%29.jpg/1200px-Podgorica_Law_School%281%29.jpg', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/University_of_Montenegro_logo_%28version_1%29.svg/500px-University_of_Montenegro_logo_%28version_1%29.svg.png', description: 'Montenegro\'s premier national university with faculties across Podgorica, offering multi-disciplinary programs as an EU candidate country institution.' },
  { name: 'Luarasi University', country: 'Albania', city: 'Tirana', ranking: 'Accredited', image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&q=80&auto=format&fit=crop', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Luarasi_University_Logo.svg/250px-Luarasi_University_Logo.svg.png', description: 'A private Albanian university in Tirana known for its Law and Business faculties, offering ECTS-accredited programs with a focus on the Western Balkans job market.' },
];

// --- Data extracted from src/lib/courseData.ts ---
const skillUniversities = [
  { id: 'cit', name: 'Canadian Institute of Technology (CIT)', shortName: 'Canadian Institute of Technology', subtitle: 'Tirana, Albania', color: '#3B82F6', description: 'A recognized European higher education institution committed to internationally aligned academic excellence, innovation, and applied learning.' },
  { id: 'mua', name: 'Mediterranean University of Albania', shortName: 'Mediterranean University', subtitle: 'Tirana, Albania', color: '#DC2626', description: 'A recognized European private higher education institution dedicated to academic excellence, research development, and international cooperation.' },
];

const skillCourses = [
  { title: 'AI Video Creation – Smart & Sustainable', universityId: 'cit', universityName: 'Canadian Institute of Technology (CIT)', color: '#A855F7', duration: '3 Months', mode: 'Online', tools: 'Runway ML, ChatGPT, ElevenLabs', highlights: ['Create professional videos using AI tools', 'Smart scriptwriting & automated production', 'AI-powered media analytics & editing', 'Content monetization strategies', 'Freelancing opportunities in AI media'] },
  { title: 'Applied Data Science & Machine Learning', universityId: 'cit', universityName: 'Canadian Institute of Technology (CIT)', color: '#3B82F6', duration: '4 Months', mode: 'Online', tools: 'Python, TensorFlow, Jupyter', highlights: ['Understand real-world data analysis techniques', 'Build machine learning models for business', 'Predict trends using AI-driven insights', 'Ethical and responsible AI practices', 'Data-driven decision making frameworks'] },
  { title: 'Logistics & Supply Chain Management', universityId: 'cit', universityName: 'Canadian Institute of Technology (CIT)', color: '#00C9B0', duration: '3 Months', mode: 'Online', tools: 'Excel, ERP Systems, SAP', highlights: ['Modern supply chain systems & workflows', 'Inventory and distribution management', 'Cost optimization strategies', 'KPI monitoring and performance analysis', 'Risk management in logistics operations'] },
  { title: 'Business Intelligence & Data Analytics', universityId: 'cit', universityName: 'Canadian Institute of Technology (CIT)', color: '#FFB800', duration: '4 Months', mode: 'Online', tools: 'Power BI, Tableau, SQL', highlights: ['Transform raw data into business insights', 'Design interactive dashboards & reports', 'KPI tracking for business performance', 'Data visualization for decision making', 'Strategic analytics for organizations'] },
  { title: 'Digital Marketing with AI', universityId: 'cit', universityName: 'Canadian Institute of Technology (CIT)', color: '#FF3B3B', duration: '3 Months', mode: 'Online', tools: 'ChatGPT, Canva AI, Google Analytics', highlights: ['AI-powered content creation strategies', 'Smart campaign optimization techniques', 'Customer behavior and audience analytics', 'Marketing automation using AI tools', 'Improve campaign ROI and performance'] },
  { title: 'Virtual Reality (VR) for Business', universityId: 'cit', universityName: 'Canadian Institute of Technology (CIT)', color: '#FF6B00', duration: '3 Months', mode: 'Online', tools: 'Unity, VR Headsets, Blender', highlights: ['Introduction to immersive VR technologies', 'Business training and simulation solutions', 'VR integration for modern enterprises', 'Safety and operational applications', 'Future trends in immersive technologies'] },
  { title: 'Real Estate Broker Certification', universityId: 'mua', universityName: 'Mediterranean University of Albania', color: '#3B82F6', duration: '4 Months', mode: 'Online + Practical', tools: null, highlights: ['Civil & Commercial Law fundamentals', 'Property Valuation methods', 'Contract Drafting & negotiation', 'Tax Legislation for real estate', 'Professional Ethics & standards', 'Practical Agency Training'] },
  { title: 'Data Science & AI Professional Training', universityId: 'mua', universityName: 'Mediterranean University of Albania', color: '#A855F7', duration: '6 Months', mode: 'Online', tools: 'Python, SQL, TensorFlow', highlights: ['Data Structures & SQL databases', 'Python for Data Science applications', 'Probability & Statistics foundations', 'Machine Learning algorithms', 'Deep Learning & neural networks', 'AI Tools Integration for business'] },
  { title: 'Digital Marketing Professional', universityId: 'mua', universityName: 'Mediterranean University of Albania', color: '#FF3B3B', duration: '4 Months', mode: 'Online', tools: 'Google Ads, Meta, Semrush', highlights: ['Digital Strategy & Market Research', 'SEO & Website Development', 'Social Media & Google Ads management', 'Data Analytics for marketing', 'AI-Based Content Optimization', 'Practical Campaign Development'] },
  { title: 'Health Administrator', universityId: 'mua', universityName: 'Mediterranean University of Albania', color: '#00C9B0', duration: '5 Months', mode: 'Online + Practical', tools: null, highlights: ['Healthcare Systems & Policy analysis', 'Health Law & Ethics compliance', 'Hospital Operations & Finance', 'Quality & Patient Safety standards', 'Digital Health Systems management', 'Practical Training in healthcare'] },
];

// --- Data extracted from src/app/about/page.tsx ---
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
    await SkillCourse.findOneAndUpdate(
      { title: sc.title, universityId: sc.universityId },
      sc,
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
