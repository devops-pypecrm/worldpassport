'use client';
import { useEffect, useState } from 'react';
import { Eye, EyeOff, Save, Loader2, CheckCircle2 } from 'lucide-react';

/**
 * Admin → Integration: CRM connection details.
 * Saved in the database. Once saved, every website form (program application, website popup,
 * contact form, partner application) is stored in the admin panel and also sent to this CRM.
 * The full API key is never sent back to the browser; only its last 4 characters are shown.
 */
interface Settings { endpoint: string; hasApiKey: boolean; apiKeyHint: string; updatedAt: string | null }

export default function IntegrationPanel({ onSaved, onError }: { onSaved?: (msg: string) => void; onError?: (msg: string) => void }) {
  const [apiKey, setApiKey] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
    </div>
  );
}
