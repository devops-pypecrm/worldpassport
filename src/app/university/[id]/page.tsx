'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, CheckCircle, GraduationCap,
  BookOpen, Globe, Award, Users, Rocket, BadgeCheck,
  MapPin, Building2, Star, Shield, Briefcase, Clock,
  FileCheck, DollarSign, Plane, MessageCircle, ChevronDown,
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const flagMap: Record<string, string> = {
  albania: '🇦🇱', malaysia: '🇲🇾', mauritius: '🇲🇺', malta: '🇲🇹', montenegro: '🇲🇪',
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const universities: Record<string, {
  name: string; country: string; city: string; ranking: string;
  image: string; description: string; color: string;
  about: string; programs: string[]; highlights: string[];
  stats: { label: string; value: string }[];
}> = {
  'canadian-institute-of-technology': {
    name: 'Canadian Institute of Technology',
    country: 'Albania', city: 'Tirana', ranking: 'Top Private', color: '#3B82F6',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80&auto=format&fit=crop',
    description: 'A recognized European higher education institution in one of Tirana\'s landmark towers, offering Bachelor and Master programs entirely in English.',
    about: 'The Canadian Institute of Technology (CIT) is located in one of the most important towers of Tirana, within walking distance of the main City Square. CIT offers Bachelor and Master programs entirely in English, divided into the Faculty of Engineering and the Faculty of Economy. The library provides access to over 3,000 English titles, and the institution is committed to internationally aligned academic excellence, innovation, and applied learning.',
    programs: ['BSc Computer Engineering', 'BSc Business Informatics', 'BSc Economy & Finance', 'MSc Computer Engineering', 'MSc Business Administration', 'Professional Skill Certifications (ECTS)'],
    highlights: ['Programs entirely in English', 'ECTS accredited credentials', 'Central Tirana campus location', 'Strong industry partnerships', 'International student community', 'SkillDad placement support'],
    stats: [{ label: 'Tuition', value: '€2k–4k/yr' }, { label: 'Programs', value: '10+' }, { label: 'Language', value: 'English' }, { label: 'Accreditation', value: 'ECTS' }],
  },
  'western-balkans-university': {
    name: 'Western Balkans University',
    country: 'Albania', city: 'Tirana', ranking: 'Accredited', color: '#DC2626',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf18c8db0e?w=1200&q=80&auto=format&fit=crop',
    description: 'Established through Cambridge Clinical Laboratories and American Hospital Group, offering Medicine, Dentistry, and Pharmacy programs in English.',
    about: 'Western Balkans University (WBU) was established in 2022 through the cooperation framework of Cambridge Clinical Laboratories, the American Hospitals Group, and the International Hygeia Hospital. Located on Highway Tirana–Durrës, the campus features modern laboratories, simulation centres, and clinical training environments with the latest medical technology. WBU places a unique emphasis on academic excellence in Medicine, Medical Sciences, Technology, Economy, and Innovation.',
    programs: ['Medicine (MD)', 'Dentistry', 'Pharmacy', 'Nursing', 'BSc Biomedical Sciences', 'MSc Health Management'],
    highlights: ['Cambridge Clinical Laboratories partnership', 'American Hospital Group affiliation', 'Modern simulation centres', 'English-taught medical programs', 'Clinical training environments', 'EU-aligned medical standards'],
    stats: [{ label: 'Tuition', value: '€5k–8k/yr' }, { label: 'Programs', value: '8+' }, { label: 'Language', value: 'English' }, { label: 'Founded', value: '2022' }],
  },
  'mediterranean-university-of-albania': {
    name: 'Mediterranean University of Albania',
    country: 'Albania', city: 'Tirana', ranking: 'Accredited', color: '#A855F7',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80&auto=format&fit=crop',
    description: 'A recognized European private institution in the heart of Tirana with a modern Faculty of Medical Sciences campus and state-of-the-art laboratories.',
    about: 'The Mediterranean University of Albania (MUA) is located in the heart of Tirana with state-of-the-art infrastructure. The university recently inaugurated a new Faculty of Medical Sciences campus equipped with modern laboratories. MUA\'s central location gives students countless opportunities to work with neighboring companies and organizations. The university is dedicated to academic excellence, research development, and international cooperation.',
    programs: ['Medicine', 'Law', 'Economics', 'Political Science', 'Professional Skill Certifications (ECTS)', 'Health Administration'],
    highlights: ['New Faculty of Medical Sciences building', 'Central Tirana location', 'Modern laboratory infrastructure', 'Research development focus', 'International cooperation programs', 'SkillDad placement support'],
    stats: [{ label: 'Tuition', value: '€2k–5k/yr' }, { label: 'Programs', value: '12+' }, { label: 'Language', value: 'English/Albanian' }, { label: 'Accreditation', value: 'ECTS' }],
  },
  'epoka-university': {
    name: 'Epoka University',
    country: 'Albania', city: 'Tirana', ranking: 'Top Ranked', color: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1200&q=80&auto=format&fit=crop',
    description: 'One of Albania\'s top-ranked universities with a green campus near Tirana International Airport, offering engineering, architecture, and economics programs.',
    about: 'Epoka University (EU) is a private university founded in 2007 in Tirana, Albania. The Rinas campus is located 12 km from the city centre near Tirana International Airport, set amidst green surroundings with comfortable physical and IT infrastructure. Epoka is a member of the Balkan Universities Network and offers programs in engineering, architecture, economics, and law with strong international partnerships.',
    programs: ['BSc Computer Engineering', 'BSc Architecture', 'BSc Civil Engineering', 'BA Economics', 'BA Law', 'MSc Applied Sciences'],
    highlights: ['Green campus near the airport', 'Balkan Universities Network member', 'Strong international partnerships', 'Modern IT infrastructure', 'Research-focused environment', 'English-taught programs'],
    stats: [{ label: 'Tuition', value: '€3k–5k/yr' }, { label: 'Programs', value: '15+' }, { label: 'Founded', value: '2007' }, { label: 'Campus', value: '12km from centre' }],
  },
  'alam': {
    name: 'ALAM',
    country: 'Malaysia', city: 'Melaka', ranking: 'Top Maritime', color: '#0EA5E9',
    image: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1f?w=1200&q=80&auto=format&fit=crop',
    description: 'Malaysia\'s premier maritime academy on a 67-acre campus overlooking the Straits of Malacca, training marine engineers and nautical officers.',
    about: 'Akademi Laut Malaysia (ALAM) is Malaysia\'s premier maritime education institution, located on a 67-acre campus in Melaka overlooking the busy Straits of Malacca. The campus features advanced classrooms, workshops, simulation centers, modern hostels, dining halls, sports facilities, and recreational areas. ALAM provides world-class training in marine engineering, nautical science, and port management, creating the ultimate experience for students immersed in maritime life.',
    programs: ['Diploma in Nautical Studies', 'Diploma in Marine Engineering', 'BSc Maritime Technology', 'Port Management', 'Advanced Maritime Safety', 'Ship Management'],
    highlights: ['67-acre campus on the Straits of Malacca', 'Advanced simulation centers', 'World-class maritime training', 'Modern hostel accommodation', 'Sports and recreational facilities', 'Industry-recognized certifications'],
    stats: [{ label: 'Tuition', value: '$3k–6k/yr' }, { label: 'Campus', value: '67 acres' }, { label: 'Location', value: 'Melaka' }, { label: 'Focus', value: 'Maritime' }],
  },
  'geomatika-university-college': {
    name: 'Geomatika University College',
    country: 'Malaysia', city: 'Kuala Lumpur', ranking: 'Accredited', color: '#10B981',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&q=80&auto=format&fit=crop',
    description: 'A leading Malaysian institution specializing in geospatial technology, IT, and built environment programs with satellite campuses across the country.',
    about: 'Geomatika University College (GUC) started as a Vocational Centre in 2000, carving a niche in Land Surveying, and has since been approved as a University by MOHE under the name Universiti Geomatika Malaysia. The main campus is in Setiawangsa, Kuala Lumpur, with satellite campuses in Kuching, Kota Kinabalu, and Keningau. GUC offers programs from foundation level to PhD across business, science, architecture, humanities, and social sciences.',
    programs: ['BSc Geospatial Technology', 'BSc Information Technology', 'Diploma in Architecture', 'Diploma in Business', 'MSc Built Environment', 'PhD Programs'],
    highlights: ['Specialization in geospatial technology', 'Multiple campuses across Malaysia', 'Foundation to PhD programs', 'Industry connections', 'Built environment expertise', 'MQA accredited'],
    stats: [{ label: 'Tuition', value: '$3k–7k/yr' }, { label: 'Programs', value: '20+' }, { label: 'Campuses', value: '4' }, { label: 'Founded', value: '2000' }],
  },
  'vit-mauritius': {
    name: 'VIT Mauritius',
    country: 'Mauritius', city: 'Pierrefonds', ranking: 'Top Branch', color: '#8B5CF6',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80&auto=format&fit=crop',
    description: 'An international campus of India\'s prestigious VIT, situated in the Uniciti International Education Hub with modern facilities and labs.',
    about: 'VIT Mauritius is an international branch campus of India\'s prestigious Vellore Institute of Technology, one of India\'s top 10 universities. Situated in the Uniciti International Education Hub (UIEH) in Pierrefonds, Mauritius, VIT Mauritius provides modern facilities and laboratories for engineering and technology programs. Although an independent international campus, it is a proud member of the wider VIT Group of Institutions.',
    programs: ['BSc Computer Science', 'BSc Electronics Engineering', 'BSc Mechanical Engineering', 'BBA', 'MSc Data Science', 'MSc Artificial Intelligence'],
    highlights: ['Part of VIT Group (India Top 10)', 'Uniciti Education Hub campus', 'Modern labs and facilities', 'International student body', 'Engineering and technology focus', 'Island study environment'],
    stats: [{ label: 'Tuition', value: '$4k–8k/yr' }, { label: 'Programs', value: '10+' }, { label: 'Parent', value: 'VIT India' }, { label: 'Hub', value: 'Uniciti UIEH' }],
  },
  'aura-institute-of-business-hospitality': {
    name: 'Aura Institute of Business & Hospitality',
    country: 'Mauritius', city: 'Port Louis', ranking: 'Accredited', color: '#EC4899',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&auto=format&fit=crop',
    description: 'A specialized institute delivering premium hospitality, tourism, and business management education in the heart of the Indian Ocean.',
    about: 'The Aura Institute of Business and Hospitality is located in Port Louis, Mauritius, offering specialized programs in hospitality, tourism, and business management. Leveraging Mauritius\'s position as a premier tourism destination in the Indian Ocean, the institute provides students with hands-on industry experience alongside academic learning. The tropical island setting offers a unique environment for hospitality education.',
    programs: ['Diploma in Hospitality Management', 'BBA Hospitality & Tourism', 'Culinary Arts', 'Event Management', 'Hotel Operations', 'Tourism Marketing'],
    highlights: ['Premier tourism destination setting', 'Hands-on industry experience', 'Hospitality and tourism focus', 'Business management programs', 'Island learning environment', 'Industry placement support'],
    stats: [{ label: 'Tuition', value: '$4k–7k/yr' }, { label: 'Programs', value: '8+' }, { label: 'Focus', value: 'Hospitality' }, { label: 'Location', value: 'Port Louis' }],
  },
  'brighton-international-business-school': {
    name: 'Brighton International Business School',
    country: 'Mauritius', city: 'Quatre Bornes', ranking: 'Accredited', color: '#0EA5E9',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop',
    description: 'An international business school offering UK-aligned business, finance, and management programs with global career pathways.',
    about: 'Brighton International Business School is located in Quatre Bornes, Mauritius, offering UK-aligned business, finance, and management programs. The school provides global career pathways through internationally recognized qualifications and industry partnerships. Students benefit from a multicultural learning environment with access to both African and Asian business networks.',
    programs: ['BBA International Business', 'BSc Finance & Accounting', 'MBA', 'Diploma in Management', 'MSc Strategic Marketing', 'Executive Education'],
    highlights: ['UK-aligned curriculum', 'International business focus', 'Global career pathways', 'Multicultural environment', 'Industry partnerships', 'Executive education options'],
    stats: [{ label: 'Tuition', value: '$5k–10k/yr' }, { label: 'Programs', value: '10+' }, { label: 'Focus', value: 'Business' }, { label: 'Alignment', value: 'UK Standards' }],
  },
  'global-college-malta': {
    name: 'Global College Malta',
    country: 'Malta', city: 'Smartcity', ranking: 'Accredited', color: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1614094082869-cd4e6b420843?w=1200&q=80&auto=format&fit=crop',
    description: 'An EU-based college in SmartCity Malta\'s modern business hub with panoramic Mediterranean views and Schengen area access.',
    about: 'Global College Malta (GCM) is located in SmartCity Malta, a modern and innovative business hub with panoramic views of the Mediterranean Sea. SmartCity Malta is a joint venture designed to be a creative business hub for Malta\'s knowledge economy. GCM is part of Study World Education Holding Group, offering European accredited degree courses at both undergraduate and postgraduate levels. Being in an EU member state provides students with Schengen area access and post-study work opportunities.',
    programs: ['BBA Business Management', 'BSc Information Technology', 'MBA', 'Diploma in Business', 'MSc Digital Marketing', 'Postgraduate Certificates'],
    highlights: ['SmartCity Malta business hub', 'Panoramic Mediterranean views', 'EU member state benefits', 'Schengen area access', 'Post-study work opportunities', 'Modern campus facilities'],
    stats: [{ label: 'Tuition', value: '€4k–8k/yr' }, { label: 'Programs', value: '12+' }, { label: 'Location', value: 'SmartCity' }, { label: 'EU Access', value: 'Schengen' }],
  },
  'mcast': {
    name: 'MCAST',
    country: 'Malta', city: 'Paola', ranking: 'Top Public', color: '#3B82F6',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/2022_-_MCAST_Square.jpg/1200px-2022_-_MCAST_Square.jpg',
    description: 'Malta\'s leading public vocational college with a flagship Resource Centre, offering hands-on diploma and degree programs across seven institutes.',
    about: 'The Malta College of Arts, Science and Technology (MCAST) is Malta\'s leading public vocational and higher education institution, consisting of seven institutes over four campuses. The main campus in Paola includes the flagship €9.3 million MCAST Resource Centre, a striking 4-floor building with a gross floor area of 7,920 m². MCAST offers hands-on diploma and degree programs across multiple disciplines, with campuses also in Mosta and Gozo.',
    programs: ['Diploma in Engineering', 'BSc Applied Sciences', 'Creative Arts & Design', 'ICT & Computing', 'Business & Commerce', 'Health & Social Care'],
    highlights: ['Malta\'s top public institution', '€9.3M flagship Resource Centre', 'Seven specialized institutes', 'Four campus locations', 'Hands-on vocational training', 'Strong EU employment links'],
    stats: [{ label: 'Tuition', value: '€4k–6k/yr' }, { label: 'Institutes', value: '7' }, { label: 'Campuses', value: '4' }, { label: 'Type', value: 'Public' }],
  },
  'idea-college': {
    name: 'IDEA College',
    country: 'Malta', city: 'Valletta', ranking: 'Accredited', color: '#EC4899',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200&q=80&auto=format&fit=crop',
    description: 'A creative and design-focused institution in Malta offering innovative programs in digital arts, media, and creative technologies.',
    about: 'IDEA College is a creative and design-focused institution located in Valletta, Malta. The college offers innovative programs in digital arts, media, and creative technologies, preparing students for careers in the rapidly evolving creative industries. Located in Malta\'s historic capital, students benefit from the rich cultural heritage and growing digital economy of the EU island nation.',
    programs: ['Digital Arts & Design', 'Media Production', 'Creative Technologies', 'Graphic Design', 'Animation & VFX', 'UX/UI Design'],
    highlights: ['Creative and design focus', 'Historic Valletta location', 'Digital arts specialization', 'Growing EU creative sector', 'Industry-relevant curriculum', 'Portfolio-based learning'],
    stats: [{ label: 'Tuition', value: '€4k–7k/yr' }, { label: 'Programs', value: '8+' }, { label: 'Focus', value: 'Creative Arts' }, { label: 'Location', value: 'Valletta' }],
  },
  'eci': {
    name: 'ECI',
    country: 'Malta', city: 'St. Julian\'s', ranking: 'Accredited', color: '#10B981',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80&auto=format&fit=crop',
    description: 'A technology-focused institution in Malta providing accredited programs in IT, cybersecurity, and digital transformation.',
    about: 'ECI is a technology-focused institution located in St. Julian\'s, Malta, providing accredited programs in IT, cybersecurity, and digital transformation. As Malta positions itself as a growing European tech hub, ECI prepares students for careers in the digital economy. The institution\'s location in the vibrant St. Julian\'s area offers students a dynamic learning environment with proximity to Malta\'s growing tech ecosystem.',
    programs: ['BSc Information Technology', 'Cybersecurity', 'Digital Transformation', 'Software Development', 'Cloud Computing', 'Data Analytics'],
    highlights: ['Technology-focused curriculum', 'Cybersecurity specialization', 'Malta\'s growing tech hub', 'St. Julian\'s vibrant location', 'Digital transformation programs', 'EU tech career access'],
    stats: [{ label: 'Tuition', value: '€4k–8k/yr' }, { label: 'Programs', value: '8+' }, { label: 'Focus', value: 'Technology' }, { label: 'Location', value: 'St. Julian\'s' }],
  },
  'university-of-montenegro': {
    name: 'University of Montenegro',
    country: 'Montenegro', city: 'Podgorica', ranking: 'National Top', color: '#6366F1',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Podgorica_Law_School%281%29.jpg/1200px-Podgorica_Law_School%281%29.jpg',
    description: 'Montenegro\'s premier national university with faculties across Podgorica, offering multi-disciplinary programs as an EU candidate country institution.',
    about: 'The University of Montenegro is the country\'s premier national university, with its central administration and most faculties located in Podgorica, the capital. The university\'s new Rectorate building was opened in 2009, and the University Sports and Cultural Center opened in 2015. As an EU candidate country institution, the university provides affordable education with growing international programs in engineering, tourism, sciences, and business administration.',
    programs: ['BSc Engineering', 'BA Tourism & Hospitality', 'BSc Natural Sciences', 'MBA', 'Law', 'Maritime Studies (Kotor)'],
    highlights: ['Montenegro\'s top national university', 'EU candidate country institution', 'Very affordable education', 'Beautiful Adriatic location', 'Modern sports & cultural centre', 'Maritime faculty in Kotor'],
    stats: [{ label: 'Tuition', value: '€2k–4k/yr' }, { label: 'Programs', value: '20+' }, { label: 'Faculties', value: '19' }, { label: 'Status', value: 'National Top' }],
  },
  'luarasi-university': {
    name: 'Luarasi University',
    country: 'Albania', city: 'Tirana', ranking: 'Accredited', color: '#0D9488',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&q=80&auto=format&fit=crop',
    description: 'A private Albanian university in Tirana known for its Law and Business faculties, offering ECTS-accredited programs with a focus on the Western Balkans job market.',
    about: 'Luarasi University is a private higher education institution based in Tirana, Albania, recognized for its strong Law and Business faculties. The university follows the Bologna Process / ECTS credit framework, making its degrees comparable and transferable across the European Higher Education Area. Luarasi focuses on preparing graduates for legal, administrative, and business careers across Albania and the wider Western Balkans region.',
    programs: ['BA Law', 'BA Business Administration', 'BSc Economics & Finance', 'Master in Law', 'MBA', 'Professional Skill Certifications (ECTS)'],
    highlights: ['Strong Law faculty reputation', 'ECTS-accredited programs', 'Central Tirana location', 'Business & legal career focus', 'Bologna Process aligned', 'Affordable tuition'],
    stats: [{ label: 'Tuition', value: '€2k–4k/yr' }, { label: 'Programs', value: '8+' }, { label: 'Language', value: 'English/Albanian' }, { label: 'Accreditation', value: 'ECTS' }],
  },
};

function FaqSection({ color, universityName, country }: { color: string; universityName: string; country: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: 'What are the entry requirements?', a: `Entry requirements vary by program. Generally, you need a high school diploma (for Bachelor\'s) or a Bachelor\'s degree (for Master\'s), English proficiency proof, and academic transcripts. Our advisors will guide you through the specific requirements for ${universityName}.` },
    { q: 'Is the degree internationally recognized?', a: `Yes. ${universityName} in ${country} is an accredited institution. Degrees earned here are recognized internationally, and many programs follow the Bologna Process / ECTS framework used across Europe.` },
    { q: 'What is the cost of living?', a: `${country} offers a very affordable cost of living compared to Western Europe. Students typically spend €300–€600/month on accommodation, food, and transport. Our team helps you plan your budget before you arrive.` },
    { q: 'Do you help with visa applications?', a: 'Absolutely. GEC provides end-to-end visa support — from document preparation to embassy appointment booking. We have a 98% visa approval success rate across all our partner countries.' },
    { q: 'Will I get placement or internship support?', a: 'Yes. GEC connects students with internship and job placement opportunities through our partner network of 500+ companies. We also provide CV building, interview coaching, and LinkedIn optimization.' },
    { q: 'Can I work while studying?', a: `International students in ${country} are generally allowed to work part-time during their studies. The exact hours depend on visa regulations. Our team will brief you on the specific rules before departure.` },
  ];

  return (
    <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
      <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2"><MessageCircle size={20} style={{ color }} /> Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden">
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
              <span className="text-gray-800 text-sm font-semibold pr-4">{faq.q}</span>
              <ChevronDown size={16} className={`text-gray-400 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
            </button>
            {openFaq === i && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 pb-4">
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function UniversityDetailPage() {
  const { id } = useParams();
  const uni = universities[id as string];

  if (!uni) return (
    <PageWrapper>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100">
          <Building2 size={48} className="text-gray-200 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">University Not Found</h2>
          <p className="text-gray-500 text-sm mb-6">This university may have been removed or the link is incorrect.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold text-sm">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );

  const color = uni.color;
  const flag = flagMap[uni.country.toLowerCase()] ?? '🏫';

  return (
    <main className="min-h-screen relative" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 30%, #E0F2FE 60%, #F0F9FF 100%)' }}>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07]" style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />
      <div className="relative z-10">
      <Navbar />

      {/* HERO */}
      <motion.section initial="hidden" animate="visible" variants={stagger} className="px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp}>
            <Link href="/#universities" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors">
              <ArrowLeft size={16} /> Back to Universities
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden relative min-h-[320px] flex items-end">
            <div className="absolute inset-0" style={{ backgroundImage: `url('${uni.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${color}30 0%, ${color}EE 100%)` }} />
            <div className="absolute top-6 right-8 opacity-[0.08]"><GraduationCap size={180} className="text-white" /></div>

            <div className="relative z-10 p-8 sm:p-12 w-full">
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-5">
                <span className="px-4 py-1.5 rounded-full bg-white/25 text-white text-xs font-bold border border-white/30 backdrop-blur-sm">{flag} {uni.country}</span>
                <span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium border border-white/20 flex items-center gap-1.5"><MapPin size={11} /> {uni.city}</span>
                <span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium border border-white/20 flex items-center gap-1.5"><Award size={11} /> {uni.ranking}</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-3 leading-tight">{uni.name}</motion.h1>
              <motion.p variants={fadeUp} className="text-white/70 text-base sm:text-lg max-w-2xl">{uni.description}</motion.p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* STATS BAR */}
      <section className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {uni.stats.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                  <GraduationCap size={18} style={{ color }} />
                </div>
                <div>
                  <div className="text-gray-900 font-bold text-sm">{s.value}</div>
                  <div className="text-gray-400 text-[10px] uppercase tracking-wider">{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="lg:col-span-2 space-y-6">

            {/* About */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <h2 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2"><Building2 size={20} style={{ color }} /> About {uni.name}</h2>
              <p className="text-gray-600 leading-relaxed">{uni.about}</p>
            </motion.div>

            {/* Why This University */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2"><Star size={20} style={{ color }} /> Why Choose This University?</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {uni.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <CheckCircle size={16} style={{ color }} className="flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Programs */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2"><BookOpen size={20} style={{ color }} /> Programs Offered</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {uni.programs.map((p) => (
                  <div key={p} className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                      <GraduationCap size={16} style={{ color }} />
                    </div>
                    <span className="text-gray-800 text-sm font-medium">{p}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Eligibility */}
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
              <h2 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2"><FileCheck size={20} style={{ color }} /> Admission Requirements</h2>
              <div className="space-y-3">
                {['High school diploma or equivalent for Bachelor programs', 'Bachelor degree for Master programs', 'English proficiency (IELTS/TOEFL or equivalent)', 'Valid passport and student visa eligibility', 'Academic transcripts and recommendation letters', 'Statement of purpose / motivation letter'].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <CheckCircle size={16} style={{ color }} className="flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FAQ */}
            <FaqSection color={color} universityName={uni.name} country={uni.country} />
          </motion.div>

          {/* SIDEBAR */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-6">
            <motion.div variants={fadeUp} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg sticky top-24">
              <div className="text-center mb-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)`, boxShadow: `0 10px 25px ${color}35` }}>
                  <GraduationCap size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{uni.name}</h3>
                <p className="text-gray-400 text-xs mt-1">{flag} {uni.city}, {uni.country}</p>
              </div>
              <div className="space-y-2.5 mb-6">
                {[
                  { icon: MapPin, label: 'Location', value: `${uni.city}, ${uni.country}` },
                  { icon: Award, label: 'Ranking', value: uni.ranking },
                  { icon: BadgeCheck, label: 'Status', value: 'Accredited' },
                  { icon: Globe, label: 'Recognition', value: 'International' },
                ].map((item) => { const Icon = item.icon; return (
                  <div key={item.label} className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-gray-500 text-sm flex items-center gap-2"><Icon size={14} /> {item.label}</span>
                    <span className="font-semibold text-sm text-gray-900">{item.value}</span>
                  </div>
                ); })}
              </div>
              <Link href="/contact"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold transition-all hover:scale-[1.02] shadow-lg"
                style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)`, boxShadow: `0 8px 20px ${color}30` }}>
                Apply Now <ArrowRight size={16} />
              </Link>
              <p className="text-center text-[10px] text-gray-400 mt-3">Free consultation available</p>
            </motion.div>

            <motion.div variants={fadeUp} className="rounded-3xl p-6 border shadow-lg" style={{ background: `linear-gradient(135deg, ${color}08, ${color}04)`, borderColor: `${color}20` }}>
              <Plane size={24} style={{ color }} className="mb-3" />
              <h4 className="font-bold text-gray-900 text-sm mb-2">GEC Support</h4>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">From application to arrival — visa support, accommodation help, and on-ground assistance.</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl p-3 bg-white border border-gray-100 text-center">
                  <div className="font-black text-lg" style={{ color }}>98%</div>
                  <div className="text-gray-400 text-[9px] uppercase">Visa Success</div>
                </div>
                <div className="rounded-xl p-3 bg-white border border-gray-100 text-center">
                  <div className="font-black text-lg" style={{ color }}>24/7</div>
                  <div className="text-gray-400 text-[9px] uppercase">Support</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-10 text-center shadow-lg" style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)` }}>
            <h2 className="font-black text-2xl sm:text-3xl text-white mb-3">Ready to Study at {uni.name}?</h2>
            <p className="text-white/70 max-w-lg mx-auto mb-6 text-sm">Book a free consultation with our advisors. We'll guide you through admission, visa, and arrival.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact" className="px-8 py-3.5 rounded-full font-bold text-gray-900 bg-white shadow-lg flex items-center gap-2 text-sm hover:scale-105 transition-transform">
                Book Consultation <ArrowRight size={15} />
              </Link>
              <Link href="/overseas" className="px-8 py-3.5 rounded-full font-semibold text-white/80 border border-white/30 hover:bg-white/10 text-sm flex items-center gap-2">
                <Globe size={15} /> Explore All Destinations
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      </div>
    </main>
  );
}
