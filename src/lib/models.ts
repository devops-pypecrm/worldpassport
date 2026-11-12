import mongoose, { Schema } from 'mongoose';

const ContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const NewsletterSchema = new Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
});

const UniversitySchema = new Schema({
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

const CourseSchema = new Schema({
  title: { type: String, required: true },
  university: { type: String, required: true },
  country: { type: String, required: true },
  level: { type: String, enum: ["Bachelor's", "Master's", "PhD", 'MBA', 'Certificate'], required: true },
  duration: { type: String },
  tuitionFee: { type: String },
  intake: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const SkillUniversitySchema = new Schema({
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

const SkillCourseSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  universityId: { type: String, required: true },
  universityName: { type: String, required: true },
  universitySubtitle: { type: String },
  color: { type: String, default: '#3B82F6' },
  icon: { type: String, default: 'BookOpen' },
  duration: { type: String },
  mode: { type: String, default: 'Online' },
  tools: { type: String },
  img: { type: String },
  highlights: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const PartnerSchema = new Schema({
  name: { type: String, required: true },
  organization: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  message: { type: String },
  // Legacy fields from the removed partner login; kept optional so older records still load.
  passwordHash: { type: String },
  passwordSalt: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

// Leads captured by the website's enquiry popup (shown in Admin -> Enquiry)
const LeadSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  destination: { type: String, trim: true },
  level: { type: String, trim: true },
  message: { type: String, trim: true },
  // Filled when the lead comes from "Apply now" on a program card (source: 'Program application')
  programId: { type: String },
  program: { type: String, trim: true },
  university: { type: String, trim: true },
  duration: { type: String, trim: true },
  tuitionFee: { type: String, trim: true },
  intake: { type: String, trim: true },
  source: { type: String, default: 'Website popup' },
  page: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Study destinations (navbar dropdown, home page, Study Destinations page). `order` controls display position.
const DestinationSchema = new Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, trim: true, uppercase: true },
  tagline: { type: String, default: '' },
  tag: { type: String, default: '' },
  stats: {
    unis: { type: String, default: '' },
    avgCost: { type: String, default: '' },
    acceptance: { type: String, default: '' },
    intl: { type: String, default: '' },
  },
  highlights: [{ type: String }],
  topUnis: [{ _id: false, name: { type: String }, rank: { type: String }, field: { type: String } }],
  programs: [{ type: String }],
  salary: { type: String, default: '' },
  order: { type: Number, default: 0, index: true },
  createdAt: { type: Date, default: Date.now },
});

const LeaderSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  image: { type: String },
  years: { type: String },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Third-party integration settings (one document per integration, e.g. name: 'crm')
const IntegrationSchema = new Schema({
  name: { type: String, required: true, unique: true },
  apiKey: { type: String },
  endpoint: { type: String },
  updatedAt: { type: Date, default: Date.now },
});

export const Contact        = mongoose.models.Contact        || mongoose.model('Contact',        ContactSchema);
export const Newsletter     = mongoose.models.Newsletter     || mongoose.model('Newsletter',     NewsletterSchema);
export const University     = mongoose.models.University     || mongoose.model('University',     UniversitySchema);
export const Course         = mongoose.models.Course         || mongoose.model('Course',         CourseSchema);
export const SkillUniversity = mongoose.models.SkillUniversity || mongoose.model('SkillUniversity', SkillUniversitySchema);
export const SkillCourse    = mongoose.models.SkillCourse    || mongoose.model('SkillCourse',    SkillCourseSchema);
export const Partner        = mongoose.models.Partner        || mongoose.model('Partner',        PartnerSchema);
export const Lead           = mongoose.models.Lead           || mongoose.model('Lead',           LeadSchema);
export const Destination    = mongoose.models.Destination    || mongoose.model('Destination',    DestinationSchema);
export const Leader         = mongoose.models.Leader         || mongoose.model('Leader',         LeaderSchema);
export const Integration    = mongoose.models.Integration    || mongoose.model('Integration',    IntegrationSchema);
