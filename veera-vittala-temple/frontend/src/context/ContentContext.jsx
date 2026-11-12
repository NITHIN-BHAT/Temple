import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import defaults from '../data/templeData.json';
import { api, STATIC_ONLY } from '../lib/api';

const ContentContext = createContext(null);

/** Deep-merge saved content over the defaults so a missing key never breaks a page. */
function merge(base, over) {
  if (Array.isArray(base) || Array.isArray(over)) return over ?? base;
  if (base && typeof base === 'object' && over && typeof over === 'object') {
    const out = { ...base };
    for (const k of Object.keys(over)) out[k] = merge(base[k], over[k]);
    return out;
  }
  return over === undefined ? base : over;
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaults);
  const [status, setStatus] = useState(STATIC_ONLY ? 'static' : 'loading'); // loading | live | static
  const [backendOnline, setBackendOnline] = useState(false);

  const load = useCallback(async () => {
    if (STATIC_ONLY) return;
    try {
      const data = await api('/api/content', { timeout: 4000 });
      setContent(merge(defaults, data));
      setBackendOnline(true);
      setStatus('live');
    } catch {
      // No backend (e.g. static hosting) — the bundled templeData.json is used.
      setContent(defaults);
      setBackendOnline(false);
      setStatus('static');
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <ContentContext.Provider value={{ content, setContent, status, backendOnline, reload: load }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
