'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus, Trash2, Loader2, X, LayoutDashboard, GraduationCap,
  BookOpen, Mail, LogOut, ChevronRight, Globe, ExternalLink, Pencil,
  CheckCircle2, AlertCircle, Building2, Users, Award,
} from 'lucide-react';

type ToastType = 'success' | 'error';
interface ToastMsg { id: number; message: string; type: ToastType; }
function useToast() {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const counter = useRef(0);
  const show = (message: string, type: ToastType = 'success') => {
    const id = ++counter.current;
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  };
  return { toasts, show };
}
function ToastContainer({ toasts }: { toasts: ToastMsg[] }) {
  return (
    <div className="fixed top-5 right-5 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-semibold text-white pointer-events-auto"
          style={{ background: t.type === 'success' ? 'linear-gradient(135deg,#16A34A,#15803D)' : 'linear-gradient(135deg,#DC2626,#B91C1C)', animation: 'slideIn 0.3s ease-out' }}>
          {t.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{t.message}</span>
        </div>
      ))}
      <style>{`@keyframes slideIn { from { opacity:0; transform:translateX(60px) } to { opacity:1; transform:translateX(0) } }`}</style>
    </div>
  );
}

interface ContactEntry { _id: string; name: string; email: string; phone?: string; subject?: string; message: string; createdAt: string; }
interface UniversityEntry { _id: string; name: string; country: string; city?: string; website?: string; ranking?: string; image?: string; description?: string; createdAt: string; }
interface CourseEntry { _id: string; title: string; university: string; country: string; level: string; duration?: string; tuitionFee?: string; intake?: string; description?: string; createdAt: string; }
interface SkillUniEntry { _id: string; name: string; shortName: string; subtitle?: string; color?: string; description?: string; createdAt: string; }
interface SkillCourseEntry { _id: string; title: string; universityId: string; universityName: string; color?: string; duration?: string; mode?: string; tools?: string; highlights: string[]; createdAt: string; }
interface LeaderEntry { _id: string; name: string; role: string; bio?: string; image?: string; years?: string; order?: number; createdAt: string; }

type Tab = 'dashboard' | 'universities' | 'courses' | 'skill-unis' | 'skill-courses' | 'leaders' | 'contacts';

const EMPTY_UNI = { name: '', country: '', city: '', website: '', ranking: '', image: '', description: '' };
const EMPTY_COURSE = { title: '', university: '', country: '', level: "Master's", duration: '', tuitionFee: '', intake: '', description: '' };
const EMPTY_SKILL_UNI = { name: '', shortName: '', subtitle: '', color: '#3B82F6', description: '' };
const EMPTY_SKILL_COURSE = { title: '', universityId: '', universityName: '', color: '#3B82F6', duration: '', mode: 'Online', tools: '', highlights: '' };
const EMPTY_LEADER = { name: '', role: '', bio: '', image: '', years: '', order: '0' };

const inputCls = 'w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/25 focus:border-violet-500 transition-all placeholder-gray-400';
const labelCls = 'block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide';

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-7 z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"><X size={15} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color, onClick }: { icon: React.ReactNode; label: string; value: number | string; color: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex items-center justify-between">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md" style={{ background: color }}>{icon}</div>
        <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-400 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toasts, show: showToast } = useToast();

  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [universities, setUniversities] = useState<UniversityEntry[]>([]);
  const [courses, setCourses] = useState<CourseEntry[]>([]);
  const [skillUnis, setSkillUnis] = useState<SkillUniEntry[]>([]);
  const [skillCourses, setSkillCourses] = useState<SkillCourseEntry[]>([]);
  const [leaders, setLeaders] = useState<LeaderEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [uniForm, setUniForm] = useState({ ...EMPTY_UNI });
  const [courseForm, setCourseForm] = useState({ ...EMPTY_COURSE });
  const [skillUniForm, setSkillUniForm] = useState({ ...EMPTY_SKILL_UNI });
  const [skillCourseForm, setSkillCourseForm] = useState({ ...EMPTY_SKILL_COURSE });
  const [leaderForm, setLeaderForm] = useState({ ...EMPTY_LEADER });

  useEffect(() => { if (typeof window !== 'undefined' && sessionStorage.getItem('adminLoggedIn') !== 'true') router.replace('/'); }, [router]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [c, u, co, su, sc, l] = await Promise.all([
        fetch('/api/contact').then(r => r.json()),
        fetch('/api/admin/universities').then(r => r.json()),
        fetch('/api/admin/courses').then(r => r.json()),
        fetch('/api/admin/skill-universities').then(r => r.json()),
        fetch('/api/admin/skill-courses').then(r => r.json()),
        fetch('/api/admin/leaders').then(r => r.json()),
      ]);
      setContacts(c.contacts || []);
      setUniversities(u.universities || []);
      setCourses(co.courses || []);
      setSkillUnis(su.skillUniversities || []);
      setSkillCourses(sc.skillCourses || []);
      setLeaders(l.leaders || []);
    } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleLogout = () => { sessionStorage.removeItem('adminLoggedIn'); router.replace('/'); };

  async function crudAction(endpoint: string, method: string, body: Record<string, unknown> | null, id?: string) {
    setSaving(true);
    try {
      const url = id ? `${endpoint}?id=${id}` : endpoint;
      const res = await fetch(url, { method, headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      return data;
    } finally { setSaving(false); }
  }

  // University CRUD
  const saveUni = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const data = await crudAction('/api/admin/universities', 'PUT', uniForm, editingId);
        setUniversities(p => p.map(u => u._id === editingId ? data.university : u));
        showToast('University updated');
      } else {
        const data = await crudAction('/api/admin/universities', 'POST', uniForm);
        setUniversities(p => [data.university, ...p]);
        showToast('University added');
      }
      setModal(null); setEditingId(null); setUniForm({ ...EMPTY_UNI });
    } catch (err) { showToast(err instanceof Error ? err.message : 'Error', 'error'); }
  };
  const deleteUni = async (id: string) => { if (!confirm('Delete?')) return; try { await crudAction('/api/admin/universities', 'DELETE', null, id); setUniversities(p => p.filter(u => u._id !== id)); showToast('Deleted'); } catch { showToast('Failed', 'error'); } };
  const editUni = (u: UniversityEntry) => { setEditingId(u._id); setUniForm({ name: u.name, country: u.country, city: u.city || '', website: u.website || '', ranking: u.ranking || '', image: u.image || '', description: u.description || '' }); setModal('uni'); };

  // Course CRUD
  const saveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await crudAction('/api/admin/courses', 'POST', courseForm);
      setCourses(p => [data.course, ...p]);
      setModal(null); setCourseForm({ ...EMPTY_COURSE });
      showToast('Course added');
    } catch (err) { showToast(err instanceof Error ? err.message : 'Error', 'error'); }
  };
  const deleteCourse = async (id: string) => { if (!confirm('Delete?')) return; try { await crudAction('/api/admin/courses', 'DELETE', null, id); setCourses(p => p.filter(c => c._id !== id)); showToast('Deleted'); } catch { showToast('Failed', 'error'); } };

  // Skill University CRUD
  const saveSkillUni = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const data = await crudAction('/api/admin/skill-universities', 'PUT', skillUniForm, editingId);
        setSkillUnis(p => p.map(u => u._id === editingId ? data.skillUniversity : u));
        showToast('Updated');
      } else {
        const data = await crudAction('/api/admin/skill-universities', 'POST', skillUniForm);
        setSkillUnis(p => [data.skillUniversity, ...p]);
        showToast('Added');
      }
      setModal(null); setEditingId(null); setSkillUniForm({ ...EMPTY_SKILL_UNI });
    } catch (err) { showToast(err instanceof Error ? err.message : 'Error', 'error'); }
  };
  const deleteSkillUni = async (id: string) => { if (!confirm('Delete?')) return; try { await crudAction('/api/admin/skill-universities', 'DELETE', null, id); setSkillUnis(p => p.filter(u => u._id !== id)); showToast('Deleted'); } catch { showToast('Failed', 'error'); } };
  const editSkillUni = (u: SkillUniEntry) => { setEditingId(u._id); setSkillUniForm({ name: u.name, shortName: u.shortName, subtitle: u.subtitle || '', color: u.color || '#3B82F6', description: u.description || '' }); setModal('skill-uni'); };

  // Skill Course CRUD
  const saveSkillCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = { ...skillCourseForm, highlights: skillCourseForm.highlights.split('\n').filter(Boolean) };
      if (editingId) {
        const data = await crudAction('/api/admin/skill-courses', 'PUT', body, editingId);
        setSkillCourses(p => p.map(c => c._id === editingId ? data.skillCourse : c));
        showToast('Updated');
      } else {
        const data = await crudAction('/api/admin/skill-courses', 'POST', body);
        setSkillCourses(p => [data.skillCourse, ...p]);
        showToast('Added');
      }
      setModal(null); setEditingId(null); setSkillCourseForm({ ...EMPTY_SKILL_COURSE });
    } catch (err) { showToast(err instanceof Error ? err.message : 'Error', 'error'); }
  };
  const deleteSkillCourse = async (id: string) => { if (!confirm('Delete?')) return; try { await crudAction('/api/admin/skill-courses', 'DELETE', null, id); setSkillCourses(p => p.filter(c => c._id !== id)); showToast('Deleted'); } catch { showToast('Failed', 'error'); } };
  const editSkillCourse = (c: SkillCourseEntry) => { setEditingId(c._id); setSkillCourseForm({ title: c.title, universityId: c.universityId, universityName: c.universityName, color: c.color || '#3B82F6', duration: c.duration || '', mode: c.mode || 'Online', tools: c.tools || '', highlights: c.highlights.join('\n') }); setModal('skill-course'); };

  // Leader CRUD
  const saveLeader = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = { ...leaderForm, order: parseInt(leaderForm.order) || 0 };
      if (editingId) {
        const data = await crudAction('/api/admin/leaders', 'PUT', body, editingId);
        setLeaders(p => p.map(l => l._id === editingId ? data.leader : l));
        showToast('Updated');
      } else {
        const data = await crudAction('/api/admin/leaders', 'POST', body);
        setLeaders(p => [data.leader, ...p]);
        showToast('Added');
      }
      setModal(null); setEditingId(null); setLeaderForm({ ...EMPTY_LEADER });
    } catch (err) { showToast(err instanceof Error ? err.message : 'Error', 'error'); }
  };
  const deleteLeader = async (id: string) => { if (!confirm('Delete?')) return; try { await crudAction('/api/admin/leaders', 'DELETE', null, id); setLeaders(p => p.filter(l => l._id !== id)); showToast('Deleted'); } catch { showToast('Failed', 'error'); } };
  const editLeader = (l: LeaderEntry) => { setEditingId(l._id); setLeaderForm({ name: l.name, role: l.role, bio: l.bio || '', image: l.image || '', years: l.years || '', order: String(l.order || 0) }); setModal('leader'); };

  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'universities', label: 'Universities', icon: <GraduationCap size={18} /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen size={18} /> },
    { id: 'skill-unis', label: 'Skill Universities', icon: <Building2 size={18} /> },
    { id: 'skill-courses', label: 'Skill Courses', icon: <Award size={18} /> },
    { id: 'leaders', label: 'Leadership', icon: <Users size={18} /> },
    { id: 'contacts', label: 'Contact', icon: <Mail size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#F4F6FB] font-sans">
      <ToastContainer toasts={toasts} />

      <aside className="flex flex-col transition-all duration-300 z-20 flex-shrink-0" style={{ width: sidebarOpen ? 240 : 72, background: '#181C2E', minHeight: '100vh', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg,#7C3AED,#4F46E5)' }}><Globe size={18} className="text-white" /></div>
          {sidebarOpen && <span className="text-white font-bold text-[15px]">World Passport</span>}
          <button onClick={() => setSidebarOpen(o => !o)} className="ml-auto text-white/40 hover:text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {sidebarOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />}
            </svg>
          </button>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map(item => {
            const active = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} title={!sidebarOpen ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'text-white shadow-lg' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                style={active ? { background: 'linear-gradient(135deg,#7C3AED,#6D28D9)', boxShadow: '0 4px 15px rgba(124,58,237,0.4)' } : {}}>
                <span className="flex-shrink-0">{item.icon}</span>
                {sidebarOpen && <span className="whitespace-nowrap text-xs">{item.label}</span>}
              </button>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <button onClick={() => router.push('/')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5">
            <ExternalLink size={18} />{sidebarOpen && <span className="text-xs">Back to Website</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-200/80 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between px-6 py-3.5">
            <h2 className="text-lg font-bold text-gray-800 capitalize">{navItems.find(n => n.id === activeTab)?.label ?? 'Dashboard'}</h2>
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow" style={{ background: 'linear-gradient(135deg,#7C3AED,#4F46E5)' }}>A</div>
              <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 border border-red-100"><LogOut size={16} /><span className="hidden sm:inline">Logout</span></button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">

          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="rounded-3xl p-7 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#6D28D9 0%,#7C3AED 40%,#a855f7 100%)' }}>
                <div className="relative z-10">
                  <h2 className="text-2xl font-extrabold text-white mb-1">Welcome to Admin Panel</h2>
                  <p className="text-violet-200 text-sm">Manage all website content — universities, courses, leadership & more</p>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={<GraduationCap size={20} />} label="Universities" value={loading ? '—' : universities.length} color="linear-gradient(135deg,#6D28D9,#7C3AED)" onClick={() => setActiveTab('universities')} />
                <StatCard icon={<BookOpen size={20} />} label="Courses" value={loading ? '—' : courses.length} color="linear-gradient(135deg,#0EA5E9,#2563EB)" onClick={() => setActiveTab('courses')} />
                <StatCard icon={<Building2 size={20} />} label="Skill Unis" value={loading ? '—' : skillUnis.length} color="linear-gradient(135deg,#F59E0B,#D97706)" onClick={() => setActiveTab('skill-unis')} />
                <StatCard icon={<Award size={20} />} label="Skill Courses" value={loading ? '—' : skillCourses.length} color="linear-gradient(135deg,#10B981,#059669)" onClick={() => setActiveTab('skill-courses')} />
                <StatCard icon={<Users size={20} />} label="Leaders" value={loading ? '—' : leaders.length} color="linear-gradient(135deg,#EC4899,#DB2777)" onClick={() => setActiveTab('leaders')} />
                <StatCard icon={<Mail size={20} />} label="Messages" value={loading ? '—' : contacts.length} color="linear-gradient(135deg,#EF4444,#DC2626)" onClick={() => setActiveTab('contacts')} />
              </div>
            </div>
          )}

          {/* UNIVERSITIES */}
          {activeTab === 'universities' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Overseas Universities</h2>
                <button onClick={() => { setEditingId(null); setUniForm({ ...EMPTY_UNI }); setModal('uni'); }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg,#6D28D9,#7C3AED)' }}><Plus size={16} /> Add</button>
              </div>
              {loading ? <Spinner /> : universities.length === 0 ? <Empty label="No universities yet" /> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {universities.map(u => (
                    <div key={u._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 group hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">{u.name}</h3>
                          <p className="text-xs text-gray-400">{u.country}{u.city ? ` · ${u.city}` : ''}</p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => editUni(u)} className="p-1.5 rounded-lg hover:bg-violet-50 text-violet-500"><Pencil size={13} /></button>
                          <button onClick={() => deleteUni(u._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={13} /></button>
                        </div>
                      </div>
                      {u.ranking && <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-50 text-violet-600">{u.ranking}</span>}
                      {u.description && <p className="text-xs text-gray-400 mt-2 line-clamp-2">{u.description}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* COURSES */}
          {activeTab === 'courses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Courses</h2>
                <button onClick={() => { setCourseForm({ ...EMPTY_COURSE }); setModal('course'); }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg,#0EA5E9,#2563EB)' }}><Plus size={16} /> Add</button>
              </div>
              {loading ? <Spinner /> : courses.length === 0 ? <Empty label="No courses yet" /> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map(c => (
                    <div key={c._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 group hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-semibold">{c.level}</span>
                        <button onClick={() => deleteCourse(c._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 opacity-0 group-hover:opacity-100"><Trash2 size={13} /></button>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{c.title}</h3>
                      <p className="text-xs text-violet-500">{c.university}</p>
                      <p className="text-xs text-gray-400">{c.country}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SKILL UNIVERSITIES */}
          {activeTab === 'skill-unis' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Skill Page Universities</h2>
                <button onClick={() => { setEditingId(null); setSkillUniForm({ ...EMPTY_SKILL_UNI }); setModal('skill-uni'); }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg,#F59E0B,#D97706)' }}><Plus size={16} /> Add</button>
              </div>
              {loading ? <Spinner /> : skillUnis.length === 0 ? <Empty label="No skill universities. Add CIT or Mediterranean here." /> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skillUnis.map(u => (
                    <div key={u._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 group hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${u.color}15`, border: `1px solid ${u.color}30` }}>
                            <Building2 size={18} style={{ color: u.color }} />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-sm">{u.shortName}</h3>
                            <p className="text-xs text-gray-400">{u.subtitle}</p>
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => editSkillUni(u)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500"><Pencil size={13} /></button>
                          <button onClick={() => deleteSkillUni(u._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={13} /></button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{u.name}</p>
                      {u.description && <p className="text-xs text-gray-400 mt-1 line-clamp-2">{u.description}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SKILL COURSES */}
          {activeTab === 'skill-courses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Skill Courses (ECTS Programs)</h2>
                <button onClick={() => { setEditingId(null); setSkillCourseForm({ ...EMPTY_SKILL_COURSE }); setModal('skill-course'); }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg,#10B981,#059669)' }}><Plus size={16} /> Add</button>
              </div>
              {loading ? <Spinner /> : skillCourses.length === 0 ? <Empty label="No skill courses yet" /> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {skillCourses.map(c => (
                    <div key={c._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 group hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">{c.title}</h3>
                          <p className="text-xs text-gray-400">{c.universityName} · {c.duration} · {c.mode}</p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => editSkillCourse(c)} className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-500"><Pencil size={13} /></button>
                          <button onClick={() => deleteSkillCourse(c._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={13} /></button>
                        </div>
                      </div>
                      {c.tools && <p className="text-[10px] text-gray-400 mb-1">Tools: {c.tools}</p>}
                      <div className="flex flex-wrap gap-1">
                        {c.highlights.slice(0, 3).map((h, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-500">{h}</span>
                        ))}
                        {c.highlights.length > 3 && <span className="text-[10px] text-gray-400">+{c.highlights.length - 3} more</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* LEADERS */}
          {activeTab === 'leaders' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">About Page Leadership</h2>
                <button onClick={() => { setEditingId(null); setLeaderForm({ ...EMPTY_LEADER }); setModal('leader'); }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg,#EC4899,#DB2777)' }}><Plus size={16} /> Add</button>
              </div>
              {loading ? <Spinner /> : leaders.length === 0 ? <Empty label="No leaders yet. Add team members for the About page." /> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {leaders.map(l => (
                    <div key={l._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 group hover:shadow-md transition-all">
                      <div className="flex items-start gap-3">
                        {l.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={l.image} alt={l.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center flex-shrink-0"><Users size={20} className="text-pink-400" /></div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-sm">{l.name}</h3>
                          <p className="text-xs text-pink-500">{l.role}</p>
                          {l.years && <p className="text-[10px] text-gray-400">{l.years}</p>}
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => editLeader(l)} className="p-1.5 rounded-lg hover:bg-pink-50 text-pink-500"><Pencil size={13} /></button>
                          <button onClick={() => deleteLeader(l._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={13} /></button>
                        </div>
                      </div>
                      {l.bio && <p className="text-xs text-gray-400 mt-2 line-clamp-2">{l.bio}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CONTACTS */}
          {activeTab === 'contacts' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Submissions</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? <Spinner /> : contacts.length === 0 ? <Empty label="No messages yet" /> : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="bg-gray-50">{['#','Name','Email','Phone','Subject','Message','Date'].map(h => <th key={h} className="px-5 py-3 text-xs font-bold text-gray-400 uppercase text-left">{h}</th>)}</tr></thead>
                      <tbody>
                        {contacts.map((c, i) => (
                          <tr key={c._id} className="border-t border-gray-50 hover:bg-violet-50/20">
                            <td className="px-5 py-3 text-gray-300 text-xs">{i+1}</td>
                            <td className="px-5 py-3 font-semibold text-gray-900">{c.name}</td>
                            <td className="px-5 py-3 text-blue-600"><a href={`mailto:${c.email}`}>{c.email}</a></td>
                            <td className="px-5 py-3 text-gray-500">{c.phone || '—'}</td>
                            <td className="px-5 py-3 text-gray-500 max-w-[140px] truncate">{c.subject || '—'}</td>
                            <td className="px-5 py-3 text-gray-400 max-w-[200px] truncate">{c.message}</td>
                            <td className="px-5 py-3 text-gray-300 text-xs">{new Date(c.createdAt).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODALS */}
      {modal === 'uni' && (
        <Modal title={editingId ? 'Edit University' : 'Add University'} onClose={() => { setModal(null); setEditingId(null); }}>
          <form onSubmit={saveUni} className="space-y-4">
            <div><label className={labelCls}>Name *</label><input required className={inputCls} value={uniForm.name} onChange={e => setUniForm(p => ({...p, name: e.target.value}))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Country *</label><input required className={inputCls} value={uniForm.country} onChange={e => setUniForm(p => ({...p, country: e.target.value}))} /></div>
              <div><label className={labelCls}>City</label><input className={inputCls} value={uniForm.city} onChange={e => setUniForm(p => ({...p, city: e.target.value}))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Ranking</label><input className={inputCls} value={uniForm.ranking} onChange={e => setUniForm(p => ({...p, ranking: e.target.value}))} /></div>
              <div><label className={labelCls}>Website</label><input className={inputCls} value={uniForm.website} onChange={e => setUniForm(p => ({...p, website: e.target.value}))} /></div>
            </div>
            <div><label className={labelCls}>Image URL</label><input className={inputCls} value={uniForm.image} onChange={e => setUniForm(p => ({...p, image: e.target.value}))} /></div>
            <div><label className={labelCls}>Description</label><textarea rows={2} className={`${inputCls} resize-none`} value={uniForm.description} onChange={e => setUniForm(p => ({...p, description: e.target.value}))} /></div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl text-sm border border-gray-200 hover:bg-gray-50">Cancel</button>
              <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60" style={{ background: 'linear-gradient(135deg,#6D28D9,#7C3AED)' }}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </form>
        </Modal>
      )}

      {modal === 'course' && (
        <Modal title="Add Course" onClose={() => setModal(null)}>
          <form onSubmit={saveCourse} className="space-y-4">
            <div><label className={labelCls}>Title *</label><input required className={inputCls} value={courseForm.title} onChange={e => setCourseForm(p => ({...p, title: e.target.value}))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>University *</label><input required className={inputCls} value={courseForm.university} onChange={e => setCourseForm(p => ({...p, university: e.target.value}))} /></div>
              <div><label className={labelCls}>Country *</label><input required className={inputCls} value={courseForm.country} onChange={e => setCourseForm(p => ({...p, country: e.target.value}))} /></div>
            </div>
            <div><label className={labelCls}>Level *</label><select required className={inputCls} value={courseForm.level} onChange={e => setCourseForm(p => ({...p, level: e.target.value}))}>{["Bachelor's","Master's","PhD","MBA","Certificate"].map(l => <option key={l}>{l}</option>)}</select></div>
            <div className="grid grid-cols-3 gap-3">
              <div><label className={labelCls}>Duration</label><input className={inputCls} value={courseForm.duration} onChange={e => setCourseForm(p => ({...p, duration: e.target.value}))} /></div>
              <div><label className={labelCls}>Fee</label><input className={inputCls} value={courseForm.tuitionFee} onChange={e => setCourseForm(p => ({...p, tuitionFee: e.target.value}))} /></div>
              <div><label className={labelCls}>Intake</label><input className={inputCls} value={courseForm.intake} onChange={e => setCourseForm(p => ({...p, intake: e.target.value}))} /></div>
            </div>
            <div><label className={labelCls}>Description</label><textarea rows={2} className={`${inputCls} resize-none`} value={courseForm.description} onChange={e => setCourseForm(p => ({...p, description: e.target.value}))} /></div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl text-sm border border-gray-200 hover:bg-gray-50">Cancel</button>
              <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60" style={{ background: 'linear-gradient(135deg,#0EA5E9,#2563EB)' }}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </form>
        </Modal>
      )}

      {modal === 'skill-uni' && (
        <Modal title={editingId ? 'Edit Skill University' : 'Add Skill University'} onClose={() => { setModal(null); setEditingId(null); }}>
          <form onSubmit={saveSkillUni} className="space-y-4">
            <div><label className={labelCls}>Full Name *</label><input required className={inputCls} placeholder="Canadian Institute of Technology (CIT)" value={skillUniForm.name} onChange={e => setSkillUniForm(p => ({...p, name: e.target.value}))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Short Name *</label><input required className={inputCls} placeholder="CIT" value={skillUniForm.shortName} onChange={e => setSkillUniForm(p => ({...p, shortName: e.target.value}))} /></div>
              <div><label className={labelCls}>Subtitle</label><input className={inputCls} placeholder="Tirana, Albania" value={skillUniForm.subtitle} onChange={e => setSkillUniForm(p => ({...p, subtitle: e.target.value}))} /></div>
            </div>
            <div><label className={labelCls}>Brand Color</label><input type="color" className="w-full h-10 rounded-xl border border-gray-200 cursor-pointer" value={skillUniForm.color} onChange={e => setSkillUniForm(p => ({...p, color: e.target.value}))} /></div>
            <div><label className={labelCls}>Description</label><textarea rows={2} className={`${inputCls} resize-none`} value={skillUniForm.description} onChange={e => setSkillUniForm(p => ({...p, description: e.target.value}))} /></div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl text-sm border border-gray-200 hover:bg-gray-50">Cancel</button>
              <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60" style={{ background: 'linear-gradient(135deg,#F59E0B,#D97706)' }}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </form>
        </Modal>
      )}

      {modal === 'skill-course' && (
        <Modal title={editingId ? 'Edit Skill Course' : 'Add Skill Course'} onClose={() => { setModal(null); setEditingId(null); }}>
          <form onSubmit={saveSkillCourse} className="space-y-4">
            <div><label className={labelCls}>Course Title *</label><input required className={inputCls} placeholder="AI Video Creation" value={skillCourseForm.title} onChange={e => setSkillCourseForm(p => ({...p, title: e.target.value}))} /></div>
            <div><label className={labelCls}>University *</label>
              <select required className={inputCls} value={skillCourseForm.universityId} onChange={e => { const su = skillUnis.find(u => u._id === e.target.value); setSkillCourseForm(p => ({...p, universityId: e.target.value, universityName: su?.name || ''})); }}>
                <option value="">Select university...</option>
                {skillUnis.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div><label className={labelCls}>Duration</label><input className={inputCls} placeholder="3 Months" value={skillCourseForm.duration} onChange={e => setSkillCourseForm(p => ({...p, duration: e.target.value}))} /></div>
              <div><label className={labelCls}>Mode</label><input className={inputCls} placeholder="Online" value={skillCourseForm.mode} onChange={e => setSkillCourseForm(p => ({...p, mode: e.target.value}))} /></div>
              <div><label className={labelCls}>Color</label><input type="color" className="w-full h-10 rounded-xl border border-gray-200" value={skillCourseForm.color} onChange={e => setSkillCourseForm(p => ({...p, color: e.target.value}))} /></div>
            </div>
            <div><label className={labelCls}>Tools</label><input className={inputCls} placeholder="Python, TensorFlow, Jupyter" value={skillCourseForm.tools} onChange={e => setSkillCourseForm(p => ({...p, tools: e.target.value}))} /></div>
            <div><label className={labelCls}>Highlights (one per line)</label><textarea rows={4} className={`${inputCls} resize-none`} placeholder={"Build ML models\nData analysis\nAI practices"} value={skillCourseForm.highlights} onChange={e => setSkillCourseForm(p => ({...p, highlights: e.target.value}))} /></div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl text-sm border border-gray-200 hover:bg-gray-50">Cancel</button>
              <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60" style={{ background: 'linear-gradient(135deg,#10B981,#059669)' }}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </form>
        </Modal>
      )}

      {modal === 'leader' && (
        <Modal title={editingId ? 'Edit Leader' : 'Add Leader'} onClose={() => { setModal(null); setEditingId(null); }}>
          <form onSubmit={saveLeader} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Name *</label><input required className={inputCls} placeholder="Dr. Amit Kumar" value={leaderForm.name} onChange={e => setLeaderForm(p => ({...p, name: e.target.value}))} /></div>
              <div><label className={labelCls}>Role *</label><input required className={inputCls} placeholder="Founder & CEO" value={leaderForm.role} onChange={e => setLeaderForm(p => ({...p, role: e.target.value}))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Years / Experience</label><input className={inputCls} placeholder="20+ years in education" value={leaderForm.years} onChange={e => setLeaderForm(p => ({...p, years: e.target.value}))} /></div>
              <div><label className={labelCls}>Display Order</label><input type="number" className={inputCls} value={leaderForm.order} onChange={e => setLeaderForm(p => ({...p, order: e.target.value}))} /></div>
            </div>
            <div><label className={labelCls}>Image URL</label><input className={inputCls} placeholder="https://..." value={leaderForm.image} onChange={e => setLeaderForm(p => ({...p, image: e.target.value}))} /></div>
            <div><label className={labelCls}>Bio</label><textarea rows={3} className={`${inputCls} resize-none`} placeholder="Short bio..." value={leaderForm.bio} onChange={e => setLeaderForm(p => ({...p, bio: e.target.value}))} /></div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl text-sm border border-gray-200 hover:bg-gray-50">Cancel</button>
              <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60" style={{ background: 'linear-gradient(135deg,#EC4899,#DB2777)' }}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Spinner() { return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 text-violet-500 animate-spin" /><span className="ml-3 text-sm text-gray-400">Loading...</span></div>; }
function Empty({ label }: { label: string }) { return <div className="flex flex-col items-center justify-center py-20 text-gray-300 bg-white rounded-2xl border border-gray-100"><p className="text-sm text-gray-400">{label}</p></div>; }
