/**
 * Original illustration of a coastal-Karnataka village temple at dusk
 * (tiled sloping roof, wooden pillars, deepastambha, coconut palms).
 * It is artwork, NOT a photo of the actual temple — used until real photos
 * are added via templeData.json → temple.heroImage or the admin dashboard.
 */
export default function TempleIllustration({ className = '' }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className={className} role="img" aria-label="Illustration of a traditional tiled-roof temple at dusk">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a060c" />
          <stop offset=".42" stopColor="#5c111d" />
          <stop offset=".75" stopColor="#b5541a" />
          <stop offset="1" stopColor="#f0a24a" />
        </linearGradient>
        <radialGradient id="sun" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#fff1c9" />
          <stop offset=".35" stopColor="#f6c56a" stopOpacity=".9" />
          <stop offset="1" stopColor="#f19c3a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a1a14" />
          <stop offset="1" stopColor="#2b0a08" />
        </linearGradient>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a0d10" />
          <stop offset="1" stopColor="#1f0507" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24070a" />
          <stop offset="1" stopColor="#120304" />
        </linearGradient>
        <radialGradient id="doorGlow" cx=".5" cy=".7" r=".6">
          <stop offset="0" stopColor="#ffd98a" />
          <stop offset=".6" stopColor="#f19c3a" />
          <stop offset="1" stopColor="#8f3a10" />
        </radialGradient>
        <radialGradient id="halo" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffcf7a" stopOpacity=".55" />
          <stop offset="1" stopColor="#ffcf7a" stopOpacity="0" />
        </radialGradient>
        <pattern id="tiles" width="26" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 13 Q13 3 26 13" fill="none" stroke="#7a2a1c" strokeWidth="2" opacity=".55" />
        </pattern>
      </defs>

      <rect width="1600" height="900" fill="url(#sky)" />
      <circle cx="800" cy="560" r="330" fill="url(#sun)" />

      {/* Western Ghats hills */}
      <path d="M0 600 Q180 470 360 560 T720 520 T1080 540 T1400 500 T1600 560 V900 H0Z" fill="#4a0f16" opacity=".75" />
      <path d="M0 650 Q220 560 460 630 T940 610 T1320 640 T1600 600 V900 H0Z" fill="#360a10" opacity=".9" />

      {/* Palms – left */}
      <Palm x={150} y={760} h={360} lean={-8} />
      <Palm x={260} y={770} h={280} lean={6} />
      {/* Palms – right */}
      <Palm x={1400} y={770} h={340} lean={8} />
      <Palm x={1500} y={780} h={260} lean={-6} />

      {/* Halo behind temple */}
      <ellipse cx="800" cy="600" rx="520" ry="230" fill="url(#halo)" />

      {/* Temple */}
      <g>
        {/* plinth + steps */}
        <rect x="430" y="720" width="740" height="40" fill="#2a0a0c" />
        <rect x="430" y="718" width="740" height="4" fill="#c0962c" opacity=".55" />
        <rect x="720" y="760" width="160" height="14" fill="#2a0a0c" />
        <rect x="700" y="774" width="200" height="14" fill="#230709" />
        {/* walls */}
        <rect x="470" y="600" width="660" height="120" fill="url(#wall)" />
        {/* pillars */}
        {[500, 570, 640, 960, 1030, 1100].map((x) => (
          <g key={x}>
            <rect x={x - 8} y="600" width="16" height="120" fill="#4b1512" />
            <rect x={x - 11} y="600" width="22" height="7" fill="#c0962c" opacity=".6" />
            <rect x={x - 11} y="712" width="22" height="7" fill="#c0962c" opacity=".45" />
          </g>
        ))}
        {/* glowing sanctum door */}
        <rect x="735" y="610" width="130" height="110" rx="6" fill="#2b0a08" />
        <path d="M748 720 V650 a52 40 0 0 1 104 0 V720Z" fill="url(#doorGlow)" />
        <path d="M748 720 V650 a52 40 0 0 1 104 0 V720" fill="none" stroke="#e2c76f" strokeWidth="3" />
        {/* deity silhouette with prabhavali */}
        <path d="M770 718 V668 a30 26 0 0 1 60 0 V718" fill="none" stroke="#fff3d1" strokeWidth="3" opacity=".9" />
        <circle cx="800" cy="676" r="9" fill="#5a1a14" />
        <path d="M790 718 L792 688 Q800 682 808 688 L810 718Z" fill="#5a1a14" />
        <g className="animate-flicker"><ellipse cx="762" cy="706" rx="3" ry="6" fill="#fff6d8" /></g>
        <g className="animate-flicker" style={{ animationDelay: '.6s' }}><ellipse cx="838" cy="706" rx="3" ry="6" fill="#fff6d8" /></g>

        {/* lower roof (wide tiled roof over hall) */}
        <path d="M400 612 L560 520 H1040 L1200 612Z" fill="url(#roof)" />
        <path d="M400 612 L560 520 H1040 L1200 612Z" fill="url(#tiles)" />
        <path d="M400 612 L560 520 H1040 L1200 612" fill="none" stroke="#c0962c" strokeWidth="3" opacity=".7" />
        {/* upper roof */}
        <path d="M600 525 L700 455 H900 L1000 525Z" fill="url(#roof)" />
        <path d="M600 525 L700 455 H900 L1000 525Z" fill="url(#tiles)" />
        <path d="M600 525 L700 455 H900 L1000 525" fill="none" stroke="#c0962c" strokeWidth="3" opacity=".75" />
        {/* top ridge + kalasha */}
        <path d="M690 458 L760 410 H840 L910 458Z" fill="#3b0f0c" />
        <path d="M690 458 L760 410 H840 L910 458" fill="none" stroke="#d4ad46" strokeWidth="3" />
        <g fill="#d4ad46">
          <rect x="794" y="388" width="12" height="22" />
          <ellipse cx="800" cy="384" rx="14" ry="10" />
          <ellipse cx="800" cy="368" rx="9" ry="8" />
          <path d="M800 340 L806 360 H794Z" />
        </g>
        {/* roof finials */}
        <path d="M400 612 q-16 -4 -22 -22 q14 6 26 14Z" fill="#d4ad46" opacity=".8" />
        <path d="M1200 612 q16 -4 22 -22 q-14 6 -26 14Z" fill="#d4ad46" opacity=".8" />
      </g>

      {/* Deepastambha (lamp pillar) */}
      <g>
        <rect x="350" y="560" width="14" height="210" fill="#2a0a0c" />
        {[580, 615, 650, 685, 720].map((y, i) => (
          <g key={y}>
            <rect x={340 - i * 2} y={y} width={34 + i * 4} height="4" rx="2" fill="#7a5a1a" />
            <g className="animate-flicker" style={{ animationDelay: `${i * 0.3}s` }}>
              <ellipse cx={340 - i * 2} cy={y - 5} rx="3" ry="6" fill="#ffd27a" />
              <ellipse cx={374 + i * 2} cy={y - 5} rx="3" ry="6" fill="#ffd27a" />
            </g>
          </g>
        ))}
        <rect x="336" y="764" width="42" height="10" fill="#2a0a0c" />
      </g>
      {/* Dhwajastambha (flag post) */}
      <g>
        <rect x="1236" y="470" width="10" height="300" fill="#8a6a22" />
        <rect x="1228" y="470" width="26" height="8" fill="#d4ad46" />
        <path d="M1246 480 L1300 492 L1246 506Z" fill="#e8821e" />
        <rect x="1224" y="764" width="34" height="10" fill="#2a0a0c" />
      </g>

      <rect y="770" width="1600" height="130" fill="url(#ground)" />
      <rect y="770" width="1600" height="2" fill="#c0962c" opacity=".25" />
    </svg>
  );
}

function Palm({ x, y, h, lean }) {
  const topX = x + lean * 4;
  const topY = y - h;
  const fronds = [-150, -120, -85, -50, -20, 15, 40];
  return (
    <g fill="#1a0406" stroke="#1a0406">
      <path d={`M${x - 7} ${y} Q${x + lean * 2} ${y - h / 2} ${topX - 3} ${topY} L${topX + 3} ${topY} Q${x + lean * 2 + 8} ${y - h / 2} ${x + 7} ${y}Z`} />
      {fronds.map((a) => {
        const r = (a * Math.PI) / 180;
        const len = 95;
        const ex = topX + Math.cos(r) * len;
        const ey = topY + Math.sin(r) * len * 0.6 + 40;
        const cx = topX + Math.cos(r) * len * 0.5;
        const cy = topY + Math.sin(r) * len * 0.6 - 18;
        return <path key={a} d={`M${topX} ${topY} Q${cx} ${cy} ${ex} ${ey}`} fill="none" strokeWidth="9" strokeLinecap="round" />;
      })}
    </g>
  );
}
