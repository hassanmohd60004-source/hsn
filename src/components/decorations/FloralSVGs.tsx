"use client";

import React from "react";

interface FlowerProps {
  className?: string;
  style?: React.CSSProperties;
}

/* ═══════════════════════════════════════════════
   1. WHITE ROSE — Delicate multi-petal cream rose
   ═══════════════════════════════════════════════ */
export function WhiteRose({ className = "", style }: FlowerProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer petals */}
      <path d="M40 8 C28 14,16 28,18 40 C20 52,32 56,40 54 C48 56,60 52,62 40 C64 28,52 14,40 8Z" fill="#FAF7F2" stroke="#E8DDD0" strokeWidth="0.5"/>
      <path d="M12 36 C18 24,30 16,40 20 C50 16,62 24,68 36 C62 48,50 56,40 52 C30 56,18 48,12 36Z" fill="#F5F0EA" stroke="#E8DDD0" strokeWidth="0.5"/>
      {/* Mid petals */}
      <path d="M40 14 C32 20,24 32,26 40 C28 48,36 50,40 48 C44 50,52 48,54 40 C56 32,48 20,40 14Z" fill="#FDFBF8" stroke="#E0D5C8" strokeWidth="0.4"/>
      <path d="M18 38 C24 28,34 22,40 26 C46 22,56 28,62 38 C56 48,46 52,40 48 C34 52,24 48,18 38Z" fill="#FAF7F2" stroke="#E0D5C8" strokeWidth="0.4"/>
      {/* Inner petals */}
      <path d="M40 22 C35 26,30 34,32 40 C34 46,38 47,40 46 C42 47,46 46,48 40 C50 34,45 26,40 22Z" fill="#FFFFFF" stroke="#DDD2C4" strokeWidth="0.3"/>
      <path d="M26 38 C30 32,36 28,40 30 C44 28,50 32,54 38 C50 44,44 46,40 44 C36 46,30 44,26 38Z" fill="#FDFCFA" stroke="#DDD2C4" strokeWidth="0.3"/>
      {/* Center */}
      <circle cx="40" cy="39" r="5" fill="#EDE0D0" stroke="#D4C4B0" strokeWidth="0.4"/>
      <circle cx="40" cy="39" r="2.5" fill="#C8A46B" opacity="0.4"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   2. CHAMPAGNE ROSE — Warm champagne-tinted rose
   ═══════════════════════════════════════════════ */
export function ChampagneRose({ className = "", style }: FlowerProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer petals */}
      <path d="M40 10 C26 16,14 30,18 42 C22 54,34 56,40 54 C46 56,58 54,62 42 C66 30,54 16,40 10Z" fill="#F0E6D8" stroke="#DFC8AD" strokeWidth="0.5"/>
      <path d="M14 38 C20 24,32 16,40 22 C48 16,60 24,66 38 C60 50,48 56,40 52 C32 56,20 50,14 38Z" fill="#E8D5C0" stroke="#DFC8AD" strokeWidth="0.5"/>
      {/* Mid petals */}
      <path d="M40 16 C33 22,26 32,28 40 C30 48,37 50,40 48 C43 50,50 48,52 40 C54 32,47 22,40 16Z" fill="#F5EDE2" stroke="#D8C4A8" strokeWidth="0.4"/>
      <path d="M20 38 C26 28,36 22,40 26 C44 22,54 28,60 38 C54 48,44 52,40 48 C36 52,26 48,20 38Z" fill="#F0E6D8" stroke="#D8C4A8" strokeWidth="0.4"/>
      {/* Inner petals */}
      <path d="M40 24 C36 28,32 34,33 40 C34 45,38 46,40 45 C42 46,46 45,47 40 C48 34,44 28,40 24Z" fill="#F5EDE2" stroke="#D0BC9E" strokeWidth="0.3"/>
      {/* Center */}
      <circle cx="40" cy="39" r="5.5" fill="#E0D0BA" stroke="#C8A46B" strokeWidth="0.5"/>
      <circle cx="40" cy="39" r="2.8" fill="#C8A46B" opacity="0.5"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   3. PEONY — Full-bloom ruffled peony
   ═══════════════════════════════════════════════ */
export function Peony({ className = "", style }: FlowerProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer ruffled layer */}
      <path d="M50 6 C36 12,20 26,18 44 C16 62,30 76,50 74 C70 76,84 62,82 44 C80 26,64 12,50 6Z" fill="#F5E6E0" stroke="#EDD5CC" strokeWidth="0.5"/>
      <path d="M10 46 C16 28,32 14,50 18 C68 14,84 28,90 46 C84 64,68 78,50 74 C32 78,16 64,10 46Z" fill="#F0DDD4" stroke="#EDD5CC" strokeWidth="0.5"/>
      {/* Middle ruffle */}
      <path d="M50 14 C38 20,26 32,28 46 C30 60,40 66,50 64 C60 66,70 60,72 46 C74 32,62 20,50 14Z" fill="#F8ECE6" stroke="#E8D0C6" strokeWidth="0.4"/>
      <path d="M18 46 C24 30,38 20,50 24 C62 20,76 30,82 46 C76 62,62 70,50 66 C38 70,24 62,18 46Z" fill="#F5E6E0" stroke="#E8D0C6" strokeWidth="0.4"/>
      {/* Inner layer */}
      <path d="M50 24 C42 28,34 38,36 48 C38 56,44 60,50 58 C56 60,62 56,64 48 C66 38,58 28,50 24Z" fill="#FBF2EE" stroke="#E0CCC2" strokeWidth="0.3"/>
      <path d="M28 48 C32 36,42 28,50 32 C58 28,68 36,72 48 C68 58,58 64,50 60 C42 64,32 58,28 48Z" fill="#F8ECE6" stroke="#E0CCC2" strokeWidth="0.3"/>
      {/* Center cluster */}
      <circle cx="50" cy="48" r="7" fill="#EDD5CC" stroke="#D4B8A8" strokeWidth="0.4"/>
      <circle cx="48" cy="46" r="2" fill="#C8A46B" opacity="0.35"/>
      <circle cx="52" cy="47" r="1.8" fill="#C8A46B" opacity="0.3"/>
      <circle cx="50" cy="50" r="1.5" fill="#C8A46B" opacity="0.25"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   4. BABY'S BREATH — Tiny cluster flowers on stems
   ═══════════════════════════════════════════════ */
export function BabyBreath({ className = "", style }: FlowerProps) {
  return (
    <svg viewBox="0 0 120 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main stems */}
      <path d="M60 95 C58 80,50 65,42 52" stroke="#B5C4AC" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M60 95 C62 78,68 60,75 48" stroke="#B5C4AC" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M60 95 C60 75,56 55,54 40" stroke="#A8B5A0" strokeWidth="0.7" strokeLinecap="round"/>
      {/* Branch stems */}
      <path d="M42 52 C36 44,28 38,22 34" stroke="#B5C4AC" strokeWidth="0.5" strokeLinecap="round"/>
      <path d="M42 52 C44 42,48 34,52 28" stroke="#B5C4AC" strokeWidth="0.5" strokeLinecap="round"/>
      <path d="M75 48 C82 40,88 34,94 30" stroke="#B5C4AC" strokeWidth="0.5" strokeLinecap="round"/>
      <path d="M75 48 C72 38,68 30,66 24" stroke="#B5C4AC" strokeWidth="0.5" strokeLinecap="round"/>
      <path d="M54 40 C48 30,44 22,42 16" stroke="#A8B5A0" strokeWidth="0.5" strokeLinecap="round"/>
      <path d="M54 40 C60 32,64 26,68 20" stroke="#A8B5A0" strokeWidth="0.5" strokeLinecap="round"/>
      {/* Flower dots */}
      {[
        [22,32],[28,36],[36,42],[44,40],[52,26],[48,30],[42,14],[46,18],
        [60,22],[66,18],[68,22],[72,36],[78,42],[82,38],[88,32],[94,28],
        [56,34],[64,28],[50,44],[70,44]
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="3" fill="#FFFFFF" stroke="#E8DDD0" strokeWidth="0.3"/>
          <circle cx={cx} cy={cy} r="1" fill="#DFC8AD" opacity="0.6"/>
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   5. EUCALYPTUS LEAF — Elongated sage-green branch
   ═══════════════════════════════════════════════ */
export function EucalyptusLeaf({ className = "", style }: FlowerProps) {
  return (
    <svg viewBox="0 0 60 160" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main stem */}
      <path d="M30 155 C30 140,28 120,30 100 C32 80,28 60,30 40 C32 20,30 8,30 2" stroke="#8FA688" strokeWidth="1" strokeLinecap="round"/>
      {/* Leaf pairs - opposite arrangement */}
      {[
        { y: 130, flip: false }, { y: 130, flip: true },
        { y: 110, flip: false }, { y: 110, flip: true },
        { y: 90, flip: false },  { y: 90, flip: true },
        { y: 70, flip: false },  { y: 70, flip: true },
        { y: 50, flip: false },  { y: 50, flip: true },
        { y: 32, flip: false },  { y: 32, flip: true },
        { y: 16, flip: false },  { y: 16, flip: true },
      ].map(({ y, flip }, i) => (
        <ellipse
          key={i}
          cx={flip ? 42 : 18}
          cy={y}
          rx="10"
          ry="6"
          fill="#A8B5A0"
          fillOpacity="0.5"
          stroke="#8FA688"
          strokeWidth="0.4"
          transform={`rotate(${flip ? -25 : 25} ${flip ? 42 : 18} ${y})`}
        />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   6. GOLD FLORAL LINE — Ornamental vine divider
   ═══════════════════════════════════════════════ */
export function GoldFloralLine({ className = "", style }: FlowerProps) {
  return (
    <svg viewBox="0 0 400 50" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Central vine */}
      <path d="M20 25 Q60 12,100 25 T180 25 T260 25 T340 25 L380 25" stroke="#C8A46B" strokeWidth="1.5" opacity="0.85" strokeLinecap="round"/>
      <path d="M40 25 Q80 32,120 25 T200 25 T280 25 T360 25" stroke="#9E7D46" strokeWidth="0.8" opacity="0.6" strokeLinecap="round"/>
      {/* Center flower */}
      <circle cx="200" cy="25" r="7" fill="#FAF7F2" stroke="#C8A46B" strokeWidth="1.2"/>
      <circle cx="200" cy="25" r="4" fill="#F0E6D8" stroke="#9E7D46" strokeWidth="0.8"/>
      <circle cx="200" cy="25" r="2" fill="#C8A46B"/>
      {/* Side roses */}
      <circle cx="120" cy="25" r="4.5" fill="#FAF7F2" stroke="#C8A46B" strokeWidth="1"/>
      <circle cx="120" cy="25" r="2" fill="#C8A46B"/>
      <circle cx="280" cy="25" r="4.5" fill="#FAF7F2" stroke="#C8A46B" strokeWidth="1"/>
      <circle cx="280" cy="25" r="2" fill="#C8A46B"/>
      {/* Leaves */}
      <path d="M70 25 C63 16,52 14,46 20 C52 23,63 23,70 25Z" fill="#A8B5A0" stroke="#8FA688" strokeWidth="0.8" opacity="0.8"/>
      <path d="M150 25 C143 32,132 34,126 28 C132 26,143 26,150 25Z" fill="#A8B5A0" stroke="#8FA688" strokeWidth="0.8" opacity="0.8"/>
      <path d="M250 25 C257 32,268 34,274 28 C268 26,257 26,250 25Z" fill="#A8B5A0" stroke="#8FA688" strokeWidth="0.8" opacity="0.8"/>
      <path d="M330 25 C337 16,348 14,354 20 C348 23,337 23,330 25Z" fill="#A8B5A0" stroke="#8FA688" strokeWidth="0.8" opacity="0.8"/>
      {/* End flourishes */}
      <circle cx="20" cy="25" r="3" fill="#C8A46B"/>
      <circle cx="380" cy="25" r="3" fill="#C8A46B"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   7. FLORAL CORNER — Composed corner arrangement
   ═══════════════════════════════════════════════ */
export function FloralCorner({ className = "", style }: FlowerProps) {
  return (
    <svg viewBox="0 0 150 150" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main curved vines */}
      <path d="M4 146 C4 95,12 55,38 30 C60 10,100 4,146 4" stroke="#C8A46B" strokeWidth="1.8" opacity="0.85" fill="none" strokeLinecap="round"/>
      <path d="M12 146 C12 102,18 64,42 38 C64 16,102 12,146 12" stroke="#9E7D46" strokeWidth="1.0" opacity="0.6" fill="none" strokeLinecap="round"/>
      
      {/* Corner Rose Bloom */}
      <g transform="translate(18, 18)">
        {/* Outer petals */}
        <path d="M30 4 C18 10,8 24,10 36 C12 48,24 52,30 50 C36 52,48 48,50 36 C52 24,42 10,30 4Z" fill="#FAF7F2" stroke="#C8A46B" strokeWidth="1.2"/>
        <path d="M4 32 C10 18,24 10,30 14 C36 10,50 18,56 32 C50 44,36 50,30 46 C24 50,10 44,4 32Z" fill="#F5E6E0" stroke="#C8A46B" strokeWidth="1.0"/>
        {/* Inner petals */}
        <circle cx="30" cy="30" r="12" fill="#F0E6D8" stroke="#9E7D46" strokeWidth="1.0"/>
        <circle cx="30" cy="30" r="6" fill="#C8A46B" opacity="0.8"/>
        <circle cx="30" cy="30" r="3" fill="#FFFFFF"/>
      </g>

      {/* Secondary Rose Bud */}
      <g transform="translate(68, 8)">
        <path d="M12 2 C6 6,2 14,4 20 C6 26,14 28,18 26 C22 28,30 26,32 20 C34 14,30 6,24 2Z" fill="#F0E6D8" stroke="#C8A46B" strokeWidth="1.0"/>
        <circle cx="18" cy="15" r="4" fill="#C8A46B" opacity="0.7"/>
      </g>
      <g transform="translate(8, 68)">
        <path d="M12 2 C6 6,2 14,4 20 C6 26,14 28,18 26 C22 28,30 26,32 20 C34 14,30 6,24 2Z" fill="#FAF7F2" stroke="#C8A46B" strokeWidth="1.0"/>
        <circle cx="18" cy="15" r="4" fill="#C8A46B" opacity="0.7"/>
      </g>

      {/* Baby's breath clusters */}
      {[[95,20],[115,14],[132,10],[50,50],[20,95],[14,115],[10,132]].map(([cx,cy], i) => (
        <g key={`bb-${i}`}>
          <circle cx={cx} cy={cy} r="3.5" fill="#FFFFFF" stroke="#C8A46B" strokeWidth="0.8"/>
          <circle cx={cx} cy={cy} r="1.5" fill="#C8A46B"/>
        </g>
      ))}
      
      {/* Eucalyptus leaves along vine */}
      <ellipse cx="108" cy="22" rx="10" ry="5" fill="#A8B5A0" stroke="#688060" strokeWidth="1.0" transform="rotate(-18 108 22)"/>
      <ellipse cx="134" cy="14" rx="9" ry="4.5" fill="#A8B5A0" stroke="#688060" strokeWidth="1.0" transform="rotate(-10 134 14)"/>
      <ellipse cx="22" cy="108" rx="10" ry="5" fill="#A8B5A0" stroke="#688060" strokeWidth="1.0" transform="rotate(72 22 108)"/>
      <ellipse cx="14" cy="134" rx="9" ry="4.5" fill="#A8B5A0" stroke="#688060" strokeWidth="1.0" transform="rotate(80 14 134)"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   8. FLORAL FRAME — Full 4-corner decorative frame
   ═══════════════════════════════════════════════ */
export function FloralFrame({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={`relative ${className}`}>
      {/* Top-right corner */}
      <FloralCorner className="absolute -top-6 -right-6 w-28 h-28 md:w-36 md:h-36 pointer-events-none" />
      {/* Top-left corner (mirrored) */}
      <FloralCorner className="absolute -top-6 -left-6 w-28 h-28 md:w-36 md:h-36 -scale-x-100 pointer-events-none" />
      {/* Bottom-right corner (mirrored) */}
      <FloralCorner className="absolute -bottom-6 -right-6 w-28 h-28 md:w-36 md:h-36 -scale-y-100 pointer-events-none" />
      {/* Bottom-left corner (mirrored both) */}
      <FloralCorner className="absolute -bottom-6 -left-6 w-28 h-28 md:w-36 md:h-36 scale-x-[-1] scale-y-[-1] pointer-events-none" />
      {children}
    </div>
  );
}
