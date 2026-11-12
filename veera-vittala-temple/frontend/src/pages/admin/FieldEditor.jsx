import { useId, useRef, useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, Upload, Loader2 } from 'lucide-react';
import { api, assetUrl } from '../../lib/api';

/**
 * Generic editor that renders a form for ANY JSON value:
 * strings → inputs, booleans → toggles, arrays → add/remove/reorder lists, objects → grouped fields.
 * Adding a new key to templeData.json automatically shows up here — no admin code changes needed.
 */

const IMAGE_KEYS = ['src', 'image', 'heroImage', 'logo'];
const LONG_KEYS = ['description', 'significance', 'intro', 'welcome', 'text', 'history', 'notes', 'disabledText', 'sampleNoticeText', 'address'];
const HIDDEN_KEYS = ['_README'];

const LABELS = { sample: 'Sample content (shows “to be confirmed” tag)', verified: 'Verified', showSampleNotice: 'Show sample-content notice', enabled: 'Enable donation details', lat: 'Latitude', lng: 'Longitude' };
export const pretty = (k) => LABELS[k] ||
  String(k).replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').replace(/^./, (c) => c.toUpperCase()).trim();

function blankLike(v) {
  if (Array.isArray(v)) return [];
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blankLike(x)]));
  if (typeof v === 'boolean') return false;
  if (typeof v === 'number') return 0;
  return '';
}

function ImageField({ value, onChange, canUpload }) {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const upload = async (file) => {
    if (!file) return;
    setBusy(true); setErr('');
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await api('/api/upload', { method: 'POST', body: fd, isForm: true, auth: true, timeout: 60000 });
      onChange(res.url);
    } catch (e) { setErr(e.message); } finally { setBusy(false); if (ref.current) ref.current.value = ''; }
  };
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-cream-300 bg-cream-200">
        {value ? <img src={assetUrl(value)} alt="" className="h-full w-full object-cover" /> : <span className="flex h-full items-center justify-center text-xs text-ink-700/50">No image</span>}
      </div>
      <div className="flex-1 space-y-2">
        <input className="input !py-2 text-sm" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="/images/photo.jpg or https://…" />
        {canUpload && (
          <>
            <input ref={ref} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => upload(e.target.files?.[0])} />
            <button type="button" onClick={() => ref.current?.click()} disabled={busy} className="btn-outline !px-4 !py-1.5 text-sm">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} {busy ? 'Uploading…' : 'Upload image'}
            </button>
          </>
        )}
        {err && <p className="text-sm text-maroon-600">{err}</p>}
      </div>
    </div>
  );
}

export default function FieldEditor({ name, value, onChange, canUpload, depth = 0 }) {
  const id = useId();
  if (HIDDEN_KEYS.includes(name)) return null;
  const label = name !== undefined ? pretty(name) : null;

  if (typeof value === 'boolean') {
    return (
      <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl bg-cream-100 px-4 py-3">
        <span className="text-sm font-semibold text-ink-700">{label}</span>
        <span className="relative inline-flex">
          <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
          <span className="h-6 w-11 rounded-full bg-cream-300 transition peer-checked:bg-emerald-500" />
          <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
        </span>
      </label>
    );
  }

  if (typeof value === 'number') {
    return (
      <div>
        <label htmlFor={id} className="label">{label}</label>
        <input id={id} type="number" step="any" className="input" value={value} onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))} />
      </div>
    );
  }

  if (typeof value === 'string' || value === null || value === undefined) {
    if (IMAGE_KEYS.includes(name)) {
      return <div><span className="label">{label}</span><ImageField value={value} onChange={onChange} canUpload={canUpload} /></div>;
    }
    const long = LONG_KEYS.includes(name) || (value || '').length > 80;
    const isTime = /^(open|close|time)$/.test(name);
    const isDate = name === 'date';
    return (
      <div>
        {label && <label htmlFor={id} className="label">{label}</label>}
        {long
          ? <textarea id={id} rows={3} className="input resize-y" value={value || ''} onChange={(e) => onChange(e.target.value)} />
          : <input id={id} type={isTime ? 'time' : isDate ? 'date' : 'text'} className="input" value={value || ''} onChange={(e) => onChange(e.target.value)} />}
      </div>
    );
  }

  if (Array.isArray(value)) {
    const template = value[0] !== undefined ? blankLike(value[0]) : '';
    const move = (i, d) => { const a = [...value]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; onChange(a); };
    const primitive = typeof template !== 'object';
    return (
      <fieldset className="space-y-3">
        {label && <legend className="label !mb-3 text-base">{label} <span className="font-normal text-ink-700/50">({value.length})</span></legend>}
        {value.map((item, i) => (
          <div key={i} className={`rounded-2xl border border-cream-300 bg-white ${primitive ? 'flex gap-2 p-2' : 'p-4'}`}>
            {!primitive && (
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-saffron-600">#{i + 1} {item?.name || item?.title || item?.label || ''}</span>
                <ItemTools i={i} n={value.length} move={move} remove={() => onChange(value.filter((_, j) => j !== i))} />
              </div>
            )}
            <div className={primitive ? 'flex-1' : 'grid gap-4 md:grid-cols-2 [&>*:has(textarea)]:md:col-span-2 [&>fieldset]:md:col-span-2'}>
              {primitive
                ? <FieldEditor value={item} onChange={(v) => onChange(value.map((x, j) => (j === i ? v : x)))} depth={depth + 1} name={undefined} />
                : Object.keys(item).map((k) => (
                  <FieldEditor key={k} name={k} value={item[k]} canUpload={canUpload} depth={depth + 1}
                    onChange={(v) => onChange(value.map((x, j) => (j === i ? { ...x, [k]: v } : x)))} />
                ))}
            </div>
            {primitive && <ItemTools i={i} n={value.length} move={move} remove={() => onChange(value.filter((_, j) => j !== i))} />}
          </div>
        ))}
        <button type="button" onClick={() => onChange([...value, template])} className="btn-outline !px-4 !py-2 text-sm"><Plus className="h-4 w-4" /> Add {label ? label.replace(/s$/, '').toLowerCase() : 'item'}</button>
      </fieldset>
    );
  }

  // object
  return (
    <fieldset className={depth > 0 ? 'rounded-2xl border border-cream-300 p-4' : ''}>
      {label && depth > 0 && <legend className="px-2 text-sm font-semibold text-maroon-800">{label}</legend>}
      <div className="grid gap-4 md:grid-cols-2 [&>*:has(textarea)]:md:col-span-2 [&>fieldset]:md:col-span-2 [&>*:has(img)]:md:col-span-2">
        {Object.keys(value).map((k) => (
          <FieldEditor key={k} name={k} value={value[k]} canUpload={canUpload} depth={depth + 1} onChange={(v) => onChange({ ...value, [k]: v })} />
        ))}
      </div>
    </fieldset>
  );
}

function ItemTools({ i, n, move, remove }) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="rounded-lg p-1.5 text-ink-700/60 hover:bg-cream-200 disabled:opacity-30" aria-label="Move up"><ChevronUp className="h-4 w-4" /></button>
      <button type="button" onClick={() => move(i, 1)} disabled={i === n - 1} className="rounded-lg p-1.5 text-ink-700/60 hover:bg-cream-200 disabled:opacity-30" aria-label="Move down"><ChevronDown className="h-4 w-4" /></button>
      <button type="button" onClick={remove} className="rounded-lg p-1.5 text-maroon-600 hover:bg-maroon-50" aria-label="Remove item"><Trash2 className="h-4 w-4" /></button>
    </div>
  );
}
