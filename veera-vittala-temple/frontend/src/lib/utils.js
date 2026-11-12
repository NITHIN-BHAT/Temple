export const cn = (...c) => c.filter(Boolean).join(' ');

/** "17:30" -> "5:30 PM" */
export function fmtTime(hhmm) {
  if (!hhmm || !/^\d{1,2}:\d{2}$/.test(hhmm)) return hhmm || '';
  let [h, m] = hhmm.split(':').map(Number);
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')} ${ap}`;
}

/** Current minutes since midnight in the temple's timezone. */
export function nowMinutes(timeZone = 'Asia/Kolkata') {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const h = Number(parts.find((p) => p.type === 'hour').value) % 24;
  const m = Number(parts.find((p) => p.type === 'minute').value);
  return h * 60 + m;
}
const toMin = (t) => { const [h, m] = (t || '0:0').split(':').map(Number); return h * 60 + m; };

/** Returns { open: bool, label: string } */
export function openStatus(sessions = [], timeZone) {
  const now = nowMinutes(timeZone);
  const sorted = [...sessions].sort((a, b) => toMin(a.open) - toMin(b.open));
  for (const s of sorted) {
    if (now >= toMin(s.open) && now < toMin(s.close)) return { open: true, label: `Open now · closes ${fmtTime(s.close)}` };
  }
  const next = sorted.find((s) => toMin(s.open) > now) || sorted[0];
  return { open: false, label: next ? `Closed now · opens ${fmtTime(next.open)}` : 'Timings not available' };
}

export function fmtDate(iso) {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return { day: '--', month: '', year: '', full: iso };
  return {
    day: d.toLocaleDateString('en-IN', { day: '2-digit' }),
    month: d.toLocaleDateString('en-IN', { month: 'short' }),
    year: d.getFullYear(),
    weekday: d.toLocaleDateString('en-IN', { weekday: 'long' }),
    full: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }),
  };
}

export function upcomingEvents(list = []) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return [...list]
    .filter((e) => new Date(`${e.date}T23:59:59`) >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export const telHref = (p) => `tel:${(p || '').replace(/[^\d+]/g, '')}`;
export const isPlaceholderPhone = (p) => !p || /^\+?91\s?0{5}\s?0{5}$/.test(p.trim()) || /^[+0\s-]*$/.test(p);
