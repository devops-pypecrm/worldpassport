'use client';
import { useEffect, useState } from 'react';
import { Eye, EyeOff, Save, Loader2, CheckCircle2, Send, RefreshCw, XCircle } from 'lucide-react';

/**
 * Admin → Integration: CRM connection details.
 * Saved in the database. Once saved, every website form (program application, website popup,
 * contact form, partner application) is stored in the admin panel and also sent to this CRM.
 * The full API key is never sent back to the browser; only its last 4 characters are shown.
 */
interface CrmLogRow { _id: string; source?: string; name?: string; email?: string; status: 'sent' | 'failed'; httpStatus?: number; error?: string; crmId?: string; durationMs?: number; createdAt: string }

const fmtDate = (d: string) =>
  new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit' });

interface Settings { endpoint: string; hasApiKey: boolean; apiKeyHint: string; updatedAt: string | null }

export default function IntegrationPanel({ onSaved, onError }: { onSaved?: (msg: string) => void; onError?: (msg: string) => void }) {
  const [apiKey, setApiKey] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logs, setLogs] = useState<CrmLogRow[]>([]);
  const [logsLoading, setLogsLoading] = useState(true);
  const [testing, setTesting] = useState(false);

  // Delivery log: every attempt to send a lead to the CRM, with the CRM's reply when it fails
  const loadLogs = () => {
    setLogsLoading(true);
    fetch('/api/admin/integration/logs', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => setLogs(Array.isArray(d.logs) ? d.logs : []))
      .catch(() => setLogs([]))
      .finally(() => setLogsLoading(false));
  };
  useEffect(() => { loadLogs(); }, []);

  const sendTest = async () => {
    setTesting(true);
    try {
      const res = await fetch('/api/admin/integration/test', { method: 'POST' });
      const data = await res.json().catch(() => ({}));
      if (data.result === 'sent') onSaved?.('Test lead sent. Check your CRM for "WP Integration Test (delete me)".');
      else onError?.(data.error || 'The CRM did not accept the test lead. See the delivery log below.');
    } catch {
      onError?.('Could not send the test lead');
    } finally {
      setTesting(false);
      loadLogs();
    }
  };

  useEffect(() => {
    fetch('/api/admin/integration', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d: Settings & { error?: string }) => {
        if (d.error) throw new Error(d.error);
        setSaved(d);
        setEndpoint(d.endpoint || '');
      })
      .catch((err) => onError?.(err instanceof Error ? err.message : 'Could not load integration settings'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = endpoint.trim();
    try {
      const u = new URL(url);
      if (u.protocol !== 'https:') throw new Error();
    } catch {
      onError?.('Enter a valid CRM endpoint URL starting with https://');
      return;
    }
    if (!apiKey.trim() && !saved?.hasApiKey) {
      onError?.('Enter the CRM API key');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/integration', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: url, apiKey: apiKey.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save');
      setSaved(data);
      setEndpoint(data.endpoint || url);
      setApiKey('');
      setShowKey(false);
      onSaved?.('Integration saved. New leads will be sent to the CRM.');
    } catch (err) {
      onError?.(err instanceof Error ? err.message : 'Could not save');
    } finally {
      setSaving(false);
    }
  };

  const inputCls = 'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/25 disabled:bg-gray-50';
  const connected = Boolean(saved?.hasApiKey && saved?.endpoint);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Integration</h2>
        <p className="text-sm text-gray-500">Configure CRM connection details.</p>
      </div>

      <form onSubmit={save} className="max-w-2xl space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        {connected && (
          <p className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
            <CheckCircle2 size={16} /> Connected. Leads from all website forms are sent to this CRM.
          </p>
        )}
        <div>
          <label htmlFor="crm-key" className="mb-2 block text-sm font-semibold text-gray-700">CRM API KEY :</label>
          <div className="relative">
            <input id="crm-key" type={showKey ? 'text' : 'password'} autoComplete="new-password" value={apiKey} disabled={loading}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={saved?.hasApiKey ? `Saved key ${saved.apiKeyHint}. Leave blank to keep it` : 'Enter CRM API key'}
              className={`${inputCls} pr-11`} />
            <button type="button" onClick={() => setShowKey((v) => !v)} aria-label={showKey ? 'Hide API key' : 'Show API key'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showKey ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="crm-url" className="mb-2 block text-sm font-semibold text-gray-700">CRM Endpoint URL :</label>
          <input id="crm-url" type="url" autoComplete="off" value={endpoint} disabled={loading} onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://pypecrm.com/api/v1/leads" className={inputCls} />
        </div>
        <button type="submit" disabled={saving || loading} className="flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg,#EF4444,#DC2626)' }}>
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Save
        </button>
      </form>

      {/* Delivery log */}
      <div className="mt-8 max-w-5xl rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-6 py-4">
          <div>
            <h3 className="font-bold text-gray-900">Delivery log</h3>
            <p className="text-xs text-gray-500">Every lead sent to the CRM in the last 30 days, newest first.</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={loadLogs} disabled={logsLoading} title="Refresh"
              className="flex items-center rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-60">
              <RefreshCw size={14} className={logsLoading ? 'animate-spin' : ''} />
            </button>
            <button type="button" onClick={sendTest} disabled={testing || !connected}
              title={connected ? 'Send one test lead to the CRM' : 'Save the API key and endpoint first'}
              className="flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-100 disabled:opacity-50">
              {testing ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />} Send test lead
            </button>
          </div>
        </div>
        {logsLoading && logs.length === 0 ? (
          <div className="flex items-center justify-center py-10 text-sm text-gray-400"><Loader2 size={16} className="mr-2 animate-spin" /> Loading…</div>
        ) : logs.length === 0 ? (
          <p className="py-10 text-center text-sm text-gray-400">No leads have been sent to the CRM yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  {['Time', 'Result', 'Source', 'Lead', 'CRM reply'].map((h) => (
                    <th key={h} className="whitespace-nowrap px-4 py-3 text-left text-xs font-bold uppercase text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map((l) => (
                  <tr key={l._id} className="border-t border-gray-50 align-top">
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-500">{fmtDate(l.createdAt)}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {l.status === 'sent'
                        ? <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-600"><CheckCircle2 size={12} /> Sent</span>
                        : <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-500"><XCircle size={12} /> Failed</span>}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-500">{l.source || '—'}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">{l.name || '—'}</p>
                      {l.email && <p className="text-xs text-gray-400">{l.email}</p>}
                    </td>
                    <td className="max-w-[360px] px-4 py-3 text-xs text-gray-500">
                      {l.httpStatus ? <span className="font-semibold text-gray-700">HTTP {l.httpStatus}</span> : null}
                      {l.durationMs !== undefined && <span className="text-gray-400"> · {(l.durationMs / 1000).toFixed(1)}s</span>}
                      {l.status === 'sent' && l.crmId && <p className="text-gray-400">CRM id {l.crmId}</p>}
                      {l.error && <p className="mt-0.5 break-words text-red-500">{l.error}</p>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
