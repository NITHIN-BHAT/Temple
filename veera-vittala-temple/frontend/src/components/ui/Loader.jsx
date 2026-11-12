export default function Loader({ label = 'Loading…' }) {
  return (
    <div role="status" className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-maroon-800">
      <svg viewBox="0 0 40 60" className="h-14 w-10" aria-hidden="true">
        <ellipse cx="20" cy="22" rx="8" ry="16" fill="#e8821e" className="animate-flicker" />
        <ellipse cx="20" cy="27" rx="4" ry="8" fill="#fff1c9" className="animate-flicker" />
        <path d="M2 44 q18 18 36 0Z" fill="#c0962c" />
      </svg>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
