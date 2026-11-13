// Programs are the "Courses" created in the admin panel (Course model in models.ts).

export interface Program {
  _id: string;
  title: string;
  university: string;
  country: string;
  level: string;
  duration?: string;
  tuitionFee?: string;
  intake?: string;
  description?: string;
}

// Must match the `level` enum on the Course model.
export const PROGRAM_LEVELS = ["Bachelor's", "Master's", 'PhD', 'MBA', 'Certificate'];

export interface ProgramFilters {
  program: string;
  country: string;
  level: string;
}

const norm = (s: string | undefined) => (s || '').trim().toLowerCase();

export function filterPrograms(programs: Program[], f: ProgramFilters) {
  return programs.filter((p) =>
    // Exact title, or a title containing the chosen program (e.g. "MBA" matches "MBA in Finance"),
    // since the hero's program list comes from the destinations' "Popular programs"
    (!f.program || norm(p.title) === norm(f.program) || norm(p.title).includes(norm(f.program))) &&
    (!f.country || norm(p.country) === norm(f.country)) &&
    (!f.level || norm(p.level) === norm(f.level)),
  );
}

/** Sorted, de-duplicated (case-insensitive) list of non-empty values. */
export function uniqueValues(values: (string | undefined)[]) {
  const seen = new Map<string, string>();
  for (const v of values) {
    const t = (v || '').trim();
    if (t && !seen.has(t.toLowerCase())) seen.set(t.toLowerCase(), t);
  }
  return Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
}

export function buildProgramsUrl(f: Partial<ProgramFilters>) {
  const qs = new URLSearchParams();
  if (f.program) qs.set('program', f.program);
  if (f.country) qs.set('country', f.country);
  if (f.level) qs.set('level', f.level);
  const q = qs.toString();
  return q ? `/programs?${q}` : '/programs';
}

export async function fetchPrograms(): Promise<Program[]> {
  const res = await fetch('/api/admin/courses', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load programs');
  const data = await res.json();
  return Array.isArray(data.courses) ? data.courses : [];
}
