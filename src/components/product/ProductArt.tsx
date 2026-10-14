import type { ArtKey } from "@/lib/catalog";

/**
 * Vector renderings of Waggle devices, drawn from the live product photography.
 * Used until official assets are supplied through `product.images`.
 */
/** Official product photography (transparent cutouts). Any art key listed here renders the photo instead of the drawing. */
export const ART_PHOTOS: Partial<Record<ArtKey, { src: string; w: number; h: number }>> = {
  "monitor-pro": { src: "/images/products/pet-monitor-pro-plus.webp", w: 510, h: 554 },
  "mini-cam-4g": { src: "/images/products/rv-4g-mini-camera.webp", w: 282, h: 468 },
  "wifi-mini-cam": { src: "/images/products/rv-wifi-mini-cam.webp", w: 250, h: 419 },
  "observation-system": { src: "/images/products/rv-observation-system.webp", w: 900, h: 720 },
};

export function ProductArt({ art, className, title }: { art: ArtKey; className?: string; title: string }) {
  const photo = ART_PHOTOS[art];
  if (photo) {
    // Same square footprint as the drawings, so layouts don't shift between photo and illustration.
    return (
      <span className={`relative inline-block aspect-square ${className ?? ""}`} role={title ? "img" : undefined} aria-label={title || undefined}>
        <span aria-hidden className="absolute bottom-[12%] left-1/2 h-[4%] w-[62%] -translate-x-1/2 rounded-[50%] bg-ink/10 blur-[2px]" />
        {/* eslint-disable-next-line @next/next/no-img-element -- static cutouts; also used inside SVG-sized slots */}
        <img src={photo.src} alt="" width={photo.w} height={photo.h} loading="lazy" decoding="async" className="absolute inset-[10%] bottom-[14%] m-auto max-h-[76%] max-w-[80%] object-contain" />
      </span>
    );
  }
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label={title}>
      <title>{title}</title>
      <ellipse cx="200" cy="338" rx="118" ry="12" fill="#111318" opacity="0.10" />
      {ART[art]}
    </svg>
  );
}

const Wordmark = ({ x, y, size = 13, fill = "#fff" }: { x: number; y: number; size?: number; fill?: string }) => (
  <text x={x} y={y} textAnchor="middle" fontFamily="var(--font-lexend), sans-serif" fontWeight={500} fontSize={size} fill={fill} letterSpacing="0.5">
    waggle
  </text>
);

const Lcd = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="8" fill="#0d0f12" />
    <rect x={x + 6} y={y + 6} width={w - 12} height={h - 12} rx="5" fill="#16191e" />
    <text x={x + w / 2} y={y + h * 0.48} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize={h * 0.3} fill="#e8ecf2" fontWeight={600}>
      75.0°F
    </text>
    <line x1={x + 18} x2={x + w - 18} y1={y + h * 0.58} y2={y + h * 0.58} stroke="#e8ecf2" strokeOpacity="0.35" />
    <text x={x + w / 2} y={y + h * 0.82} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize={h * 0.19} fill="#e8ecf2" opacity="0.85">
      56%RH
    </text>
  </g>
);

const MonitorBody = ({ accent }: { accent: "red" | "graphite" | "satellite" }) => {
  const base = accent === "red" ? "#cf3b2f" : accent === "satellite" ? "#3c4250" : "#2a2e35";
  const baseDark = accent === "red" ? "#a62a21" : "#1d2026";
  return (
    <g>
      {/* clip */}
      <rect x="168" y="78" width="64" height="26" rx="8" fill="#1b1d22" />
      {accent === "satellite" && (
        <g>
          <rect x="268" y="62" width="12" height="54" rx="6" fill="#2a2e35" />
          <circle cx="274" cy="60" r="9" fill="#e8ecf2" stroke="#2a2e35" strokeWidth="4" />
        </g>
      )}
      {/* body */}
      <rect x="104" y="96" width="192" height="216" rx="30" fill="#17191d" />
      <rect x="110" y="102" width="180" height="140" rx="24" fill="#202329" />
      {/* lower band */}
      <path d={`M104 236 h192 v46 a30 30 0 0 1 -30 30 h-132 a30 30 0 0 1 -30 -30 z`} fill={base} />
      <g opacity="0.22" stroke={baseDark} strokeWidth="2">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={112 + i * 16} y1="240" x2={104 + i * 16} y2="308" />
        ))}
      </g>
      <Lcd x={132} y={124} w={136} h={86} />
      <Wordmark x={200} y={232} size={14} fill="#d9dde4" />
      <circle cx="200" cy="268" r="4.5" fill="#3ddc84" />
      <rect x="250" y="258" width="26" height="26" rx="4" fill={baseDark} opacity="0.8" />
    </g>
  );
};

const ART: Record<ArtKey, React.ReactNode> = {
  "monitor-pro": <MonitorBody accent="red" />,
  "monitor-lite": <MonitorBody accent="graphite" />,
  "monitor-satellite": <MonitorBody accent="satellite" />,

  "wagglecam-pro": (
    <g>
      <rect x="187" y="44" width="26" height="30" rx="4" fill="#d6382c" />
      <rect x="128" y="60" width="144" height="262" rx="58" fill="#f4f5f7" />
      <rect x="128" y="60" width="144" height="262" rx="58" fill="url(#camShade)" />
      <rect x="160" y="96" width="80" height="168" rx="40" fill="#15171b" />
      <circle cx="200" cy="146" r="24" fill="#24282f" />
      <circle cx="200" cy="146" r="14" fill="#0b0c0e" />
      <circle cx="205" cy="141" r="4" fill="#5b6b8c" opacity="0.8" />
      <circle cx="200" cy="208" r="10" fill="#24282f" />
      <circle cx="200" cy="240" r="5" fill="#2f343c" />
      <Wordmark x={200} y={298} size={16} fill="#2a2e35" />
      <defs>
        <linearGradient id="camShade" x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.06" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </g>
  ),

  "wifi-mini-cam": (
    <g>
      <path d="M150 300 q50 -26 100 0 v14 q-50 14 -100 0z" fill="#e7e9ed" />
      <rect x="182" y="250" width="36" height="56" rx="12" fill="#eceef1" />
      <rect x="126" y="70" width="148" height="196" rx="64" fill="#f6f7f9" />
      <rect x="126" y="70" width="148" height="196" rx="64" fill="url(#miniShade)" />
      <circle cx="200" cy="152" r="54" fill="#121418" />
      <circle cx="200" cy="152" r="34" fill="#1f232a" />
      <circle cx="200" cy="152" r="17" fill="#07080a" />
      <circle cx="207" cy="145" r="5" fill="#6e8bbd" opacity="0.7" />
      <circle cx="200" cy="112" r="3" fill="#3a3f48" />
      <Wordmark x={200} y={238} size={16} fill="#2a2e35" />
      <defs>
        <linearGradient id="miniShade" x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.05" />
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.09" />
        </linearGradient>
      </defs>
    </g>
  ),

  "mini-cam-4g": (
    <g>
      {/* wall mount */}
      <circle cx="224" cy="300" r="30" fill="#eceef1" />
      <circle cx="224" cy="300" r="20" fill="#dfe2e7" />
      <path d="M216 300 l-20 -46" stroke="#cfd3d9" strokeWidth="12" strokeLinecap="round" />
      <circle cx="196" cy="252" r="11" fill="#c7ccd3" />
      {/* body */}
      <rect x="132" y="66" width="128" height="190" rx="34" fill="#f5f6f8" />
      <rect x="146" y="80" width="100" height="162" rx="26" fill="#14161a" />
      <circle cx="196" cy="128" r="24" fill="#22262d" />
      <circle cx="196" cy="128" r="13" fill="#060708" />
      <circle cx="201" cy="123" r="4" fill="#6e8bbd" opacity="0.8" />
      <rect x="176" y="168" width="40" height="18" rx="9" fill="#2a2f37" />
      <circle cx="196" cy="214" r="12" fill="#1d2026" stroke="#2f343c" strokeWidth="3" />
      <text x="255" y="166" fontFamily="var(--font-lexend), sans-serif" fontSize="11" fill="#9aa0aa" transform="rotate(90 255 166)">
        waggle
      </text>
    </g>
  ),

  "camera-4g": (
    <g>
      <rect x="262" y="40" width="8" height="98" rx="4" fill="#e9ebee" />
      <rect x="132" y="96" width="136" height="98" rx="24" fill="#f5f6f8" />
      <Wordmark x={200} y={132} size={14} fill="#3a3f48" />
      <rect x="182" y="194" width="36" height="20" fill="#e3e6ea" />
      <path d="M130 214 h140 v28 a70 70 0 0 1 -140 0z" fill="#f2f3f5" />
      <circle cx="200" cy="254" r="46" fill="#15171b" />
      <circle cx="200" cy="254" r="22" fill="#23272e" />
      <circle cx="200" cy="254" r="12" fill="#060708" />
      <circle cx="205" cy="249" r="4" fill="#6e8bbd" opacity="0.8" />
      <circle cx="170" cy="236" r="5" fill="#2a2f37" />
      <circle cx="230" cy="236" r="5" fill="#2a2f37" />
    </g>
  ),

  travelcam: (
    <g>
      <ellipse cx="200" cy="300" rx="46" ry="10" fill="#cfd3d9" />
      <rect x="182" y="262" width="36" height="40" rx="10" fill="#2a2e35" />
      <rect x="140" y="100" width="120" height="170" rx="40" fill="#1a1c21" />
      <rect x="150" y="110" width="100" height="150" rx="32" fill="#22252b" />
      <circle cx="200" cy="164" r="30" fill="#0f1114" />
      <circle cx="200" cy="164" r="17" fill="#1f232a" />
      <circle cx="200" cy="164" r="9" fill="#050607" />
      <circle cx="205" cy="159" r="3.5" fill="#6e8bbd" opacity="0.8" />
      <circle cx="176" cy="214" r="4" fill="#3ddc84" />
      <Wordmark x={200} y={240} size={13} fill="#c9ced6" />
    </g>
  ),

  "observation-system": (
    <g>
      {/* monitor */}
      <rect x="84" y="42" width="8" height="70" rx="4" fill="#1a1c20" />
      <rect x="252" y="42" width="8" height="70" rx="4" fill="#1a1c20" />
      <rect x="56" y="104" width="232" height="152" rx="14" fill="#16181c" />
      <rect x="66" y="114" width="212" height="122" rx="6" fill="url(#sky)" />
      <path d="M66 200 q40 -30 80 -10 t80 -6 t52 4 v48 h-212z" fill="#3e5b3a" />
      <path d="M66 214 h212 v22 h-212z" fill="#7a6a52" />
      <g fill="#2c3f2a">
        <path d="M86 196 l10 -36 l10 36z" />
        <path d="M244 192 l12 -44 l12 44z" />
        <path d="M262 198 l8 -28 l8 28z" />
      </g>
      <rect x="146" y="178" width="70" height="30" rx="8" fill="#e9e6df" />
      <rect x="150" y="184" width="14" height="10" rx="2" fill="#8fa3b8" />
      <circle cx="160" cy="210" r="6" fill="#1a1c20" />
      <circle cx="202" cy="210" r="6" fill="#1a1c20" />
      <rect x="66" y="240" width="212" height="10" fill="#16181c" />
      {/* camera */}
      <rect x="320" y="150" width="7" height="60" rx="3.5" fill="#1a1c20" />
      <rect x="250" y="206" width="104" height="92" rx="12" fill="#1b1d22" />
      <rect x="262" y="224" width="80" height="44" rx="8" fill="#0e0f12" />
      <circle cx="302" cy="246" r="14" fill="#23272e" />
      <circle cx="302" cy="246" r="7" fill="#060708" />
      <circle cx="276" cy="246" r="4" fill="#2f343c" />
      <circle cx="328" cy="246" r="4" fill="#2f343c" />
      <Wordmark x={302} y={288} size={12} fill="#c9ced6" />
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9cc4e4" />
          <stop offset="1" stopColor="#e8d9bd" />
        </linearGradient>
      </defs>
    </g>
  ),

  "solar-panel": (
    <g>
      <path d="M200 250 l-30 70 M200 250 l30 70" stroke="#c7ccd3" strokeWidth="8" strokeLinecap="round" />
      <g transform="rotate(-12 200 170)">
        <rect x="96" y="92" width="208" height="156" rx="10" fill="#c9ced6" />
        <rect x="104" y="100" width="192" height="140" rx="4" fill="#1b2a4a" />
        <g stroke="#3b5287" strokeWidth="2">
          {[1, 2, 3, 4, 5].map((i) => (
            <line key={`v${i}`} x1={104 + i * 32} y1="100" x2={104 + i * 32} y2="240" />
          ))}
          {[1, 2, 3].map((i) => (
            <line key={`h${i}`} x1="104" y1={100 + i * 35} x2="296" y2={100 + i * 35} />
          ))}
        </g>
        <path d="M104 100 l80 0 l-60 140 l-20 0z" fill="#fff" opacity="0.06" />
      </g>
    </g>
  ),
};
