/* Small fetch helper. In dev, Vite proxies /api to the Express server (see vite.config.js).
   In production set VITE_API_URL to the backend URL, e.g. https://temple-api.onrender.com */
export const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
export const STATIC_ONLY = typeof __HASH_ROUTER__ !== 'undefined' && __HASH_ROUTER__;

const TOKEN_KEY = 'temple_admin_token';
export const tokenStore = {
  get() { try { return localStorage.getItem(TOKEN_KEY); } catch { return null; } },
  set(t) { try { localStorage.setItem(TOKEN_KEY, t); } catch { /* ignore */ } },
  clear() { try { localStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ } },
};

export async function api(path, { method = 'GET', body, auth = false, isForm = false, timeout = 10000 } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeout);
  const headers = {};
  if (!isForm && body !== undefined) headers['Content-Type'] = 'application/json';
  if (auth) {
    const t = tokenStore.get();
    if (t) headers.Authorization = `Bearer ${t}`;
  }
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method, headers, signal: ctrl.signal,
      body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
    });
    const isJson = res.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await res.json() : null;
    if (!res.ok) {
      const err = new Error(data?.error || `Request failed (${res.status})`);
      err.status = res.status;
      throw err;
    }
    return data;
  } catch (e) {
    if (e.name === 'AbortError') throw new Error('The server took too long to respond.');
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

/** Resolve an image path: absolute URLs untouched, /uploads/... prefixed with API base. */
export function assetUrl(src) {
  if (!src) return '';
  if (/^(https?:|data:|blob:)/.test(src)) return src;
  if (src.startsWith('/uploads')) return `${API_BASE}${src}`;
  return src;
}
