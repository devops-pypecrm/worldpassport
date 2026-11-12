'use client';
import { useEffect, useState } from 'react';
import { Eye, EyeOff, Save } from 'lucide-react';

/**
 * Admin → Integration: CRM connection details.
 * UI only for now — the CRM integration will be wired up later. Until then the values are
 * kept in this browser only (localStorage), so the API key is never sent to or stored on the server.
 */
const STORAGE_KEY = 'wp_crm_integration';

export default function IntegrationPanel({ onSaved, onError }: { onSaved?: (msg: string) => void; onError?: (msg: string) => void }) {
  const [apiKey, setApiKey] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (typeof saved.apiKey === 'string') setApiKey(saved.apiKey);
      if (typeof saved.endpoint === 'string') setEndpoint(saved.endpoint);
    } catch { /* storage unavailable: start empty */ }
  }, []);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const url = endpoint.trim();
    if (url) {
      try {
        const u = new URL(url);
        if (u.protocol !== 'https:' && u.protocol !== 'http:') throw new Error();
      } catch {
        onError?.('Enter a valid CRM endpoint URL (https://…)');
        return;
      }
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ apiKey: apiKey.trim(), endpoint: url }));
      onSaved?.('Integration details saved');
    } catch {
      onError?.('Could not save the details in this browser');
    }
  };

  const inputCls = 'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/25';

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Integration</h2>
        <p className="text-sm text-gray-500">Configure CRM connection details.</p>
      </div>

      <form onSubmit={save} className="max-w-2xl space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <label htmlFor="crm-key" className="mb-2 block text-sm font-semibold text-gray-700">CRM API KEY :</label>
          <div className="relative">
            <input id="crm-key" type={showKey ? 'text' : 'password'} autoComplete="off" value={apiKey}
              onChange={(e) => setApiKey(e.target.value)} placeholder="Enter CRM API key" className={`${inputCls} pr-11`} />
            <button type="button" onClick={() => setShowKey((v) => !v)} aria-label={showKey ? 'Hide API key' : 'Show API key'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showKey ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="crm-url" className="mb-2 block text-sm font-semibold text-gray-700">CRM Endpoint URL :</label>
          <input id="crm-url" type="url" autoComplete="off" value={endpoint} onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://pypecrm.com/api/v1/leads" className={inputCls} />
        </div>
        <button type="submit" className="flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(135deg,#EF4444,#DC2626)' }}>
          <Save size={15} /> Save
        </button>
      </form>
    </div>
  );
}
