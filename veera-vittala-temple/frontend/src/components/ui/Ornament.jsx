/** Small lotus divider used under headings. */
export default function Ornament({ className = '', light = false }) {
  const c = light ? '#e2c76f' : '#c0962c';
  return (
    <svg viewBox="0 0 200 24" className={`h-5 w-40 ${className}`} aria-hidden="true">
      <path d="M0 12 H70" stroke={c} strokeWidth="1.2" />
      <path d="M130 12 H200" stroke={c} strokeWidth="1.2" />
      <circle cx="66" cy="12" r="2" fill={c} />
      <circle cx="134" cy="12" r="2" fill={c} />
      <path d="M100 2 C106 8 106 16 100 22 C94 16 94 8 100 2Z" fill={c} />
      <path d="M100 22 C92 20 84 14 82 8 C90 9 97 14 100 22Z" fill={c} opacity=".75" />
      <path d="M100 22 C108 20 116 14 118 8 C110 9 103 14 100 22Z" fill={c} opacity=".75" />
    </svg>
  );
}
