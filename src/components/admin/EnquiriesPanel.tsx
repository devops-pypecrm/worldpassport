'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Download, Loader2, RefreshCw, Search, Inbox, ChevronDown } from 'lucide-react';
import type { Enquiry } from '@/lib/enquiries';

const SOURCES = ['Program application', 'Website popup', 'Contact form', 'Partner application'];

const sourceStyle: Record<string, string> = {
  'Program application': 'bg-orange-50 text-orange-600',
  'Website popup': 'bg-violet-50 text-violet-600',
  'Contact form': 'bg-blue-50 text-blue-600',
  'Partner application': 'bg-emerald-50 text-emerald-600',
};
const statusStyle: Record<string, string> = {
  approved: 'bg-green-50 text-green-600',
  rejected: 'bg-red-50 text-red-500',
  pending: 'bg-amber-50 text-amber-600',
};

function buildQuery(source: string, q: string) {
  const qs = new URLSearchParams();
  if (source) qs.set('source', source);
  if (q.trim()) qs.set('q', q.trim());
  const s = qs.toString();
  return s ? `?${s}` : '';
}

const fmtDate = (d: string) =>
  d ? new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

export default function EnquiriesPanel({ onError }: { onError?: (msg: string) => void }) {
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('');
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState(''); // debounced search
  const [expanded, setExpanded] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  // Keep the latest error handler without re-running the data load when it changes
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  useEffect(() => {
    const t = setTimeout(() => setQuery(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/enquiries${buildQuery(source, query)}`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load enquiries');
      setRows(data.enquiries || []);
    } catch (err) {
      onErrorRef.current?.(err instanceof Error ? err.message : 'Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  }, [source, query]);

  useEffect(() => { load(); }, [load]);

  // Downloads the leads currently shown (same source + search filters)
  const download = async () => {
    setDownloading(true);
    try {
      const res = await fetch(`/api/admin/enquiries/export${buildQuery(source, query)}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Could not create the Excel file');
      const blob = await res.blob();
      const name = res.headers.get('Content-Disposition')?.match(/filename="([^"]+)"/)?.[1] || 'enquiries.xlsx';
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      onErrorRef.current?.(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Enquiries</h2>
          <p className="text-sm text-gray-500">Every lead submitted through the website&apos;s forms, newest first.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load} disabled={loading} title="Refresh"
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-60">
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={download} disabled={downloading || loading || rows.length === 0}
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg,#16A34A,#15803D)' }}>
            {downloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            Download Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, phone, program, message…"
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/25" />
        </div>
        <select value={source} onChange={(e) => setSource(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/25">
          <option value="">All sources</option>
          {SOURCES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {loading && rows.length === 0 ? (
          <div className="flex items-center justify-center py-20 text-sm text-gray-400"><Loader2 className="mr-3 h-5 w-5 animate-spin text-violet-500" /> Loading…</div>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Inbox size={28} className="mb-2" />
            <p className="text-sm">{source || query ? 'No enquiries match your filters' : 'No enquiries yet'}</p>
          </div>
        ) : (
          <>
            <div className="border-b border-gray-100 px-5 py-3 text-xs text-gray-500">
              {rows.length} enquir{rows.length === 1 ? 'y' : 'ies'}{loading && <Loader2 size={12} className="ml-2 inline animate-spin" />}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    {['#', 'Date', 'Source', 'Name', 'Email', 'Phone', 'Interested in', 'Program / Course', 'University', 'Destination', 'Level', 'Duration', 'Tuition fee', 'Intake', 'Message', 'Status', ''].map((h, i) => (
                      <th key={i} className="whitespace-nowrap px-4 py-3 text-left text-xs font-bold uppercase text-gray-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => {
                    const open = expanded === r._id;
                    return (
                      <tr key={`${r.source}-${r._id}`} onClick={() => setExpanded(open ? null : r._id)}
                        className="cursor-pointer border-t border-gray-50 align-top hover:bg-violet-50/30">
                        <td className="px-4 py-3 text-xs text-gray-300">{i + 1}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-500">{fmtDate(r.createdAt)}</td>
                        <td className="px-4 py-3">
                          <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold ${sourceStyle[r.source] || 'bg-gray-100 text-gray-600'}`}>{r.source}</span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-gray-900">{r.name || '—'}</p>
                          {r.organization && <p className="text-xs text-gray-400">{r.organization}</p>}
                        </td>
                        <td className="px-4 py-3">
                          {r.email ? <a href={`mailto:${r.email}`} onClick={(e) => e.stopPropagation()} className="text-blue-600 hover:underline">{r.email}</a> : '—'}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                          {r.phone ? <a href={`tel:${r.phone.replace(/\s/g, '')}`} onClick={(e) => e.stopPropagation()} className="hover:underline">{r.phone}</a> : '—'}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{r.subject || '—'}</td>
                        <td className="min-w-[180px] px-4 py-3 font-medium text-gray-800">{r.program || '—'}</td>
                        <td className="min-w-[160px] px-4 py-3 text-gray-600">{r.university || '—'}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-gray-600">{r.destination || '—'}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-gray-600">{r.level || '—'}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-gray-600">{r.duration || '—'}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-gray-600">{r.tuitionFee || '—'}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-gray-600">{r.intake || '—'}</td>
                        <td className={`px-4 py-3 text-gray-500 ${open ? 'min-w-[280px] whitespace-pre-wrap' : 'max-w-[240px] truncate'}`}>{r.message || '—'}</td>
                        <td className="px-4 py-3">
                          {r.status ? <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize ${statusStyle[r.status] || 'bg-gray-100 text-gray-600'}`}>{r.status}</span> : <span className="text-gray-300">—</span>}
                        </td>
                        <td className="px-2 py-3 text-gray-300">
                          {r.message && <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
