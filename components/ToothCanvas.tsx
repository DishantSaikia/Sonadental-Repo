'use client'

export default function ToothCanvas({
  size = 'clamp(220px, 30vw, 420px)',
}: {
  size?: string
}) {
  return (
    <div
      className="w-full h-full flex items-center justify-center relative select-none"
      aria-hidden="true"
      /* isolation:isolate keeps mix-blend-mode contained to this subtree */
      style={{ isolation: 'isolate' }}
    >

      {/* ── Environment: ambient light halo (behind tooth) ──────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-5%',
          background: [
            'radial-gradient(ellipse at 50% 46%, rgba(74,150,232,0.26) 0%, transparent 55%)',
            'radial-gradient(ellipse at 38% 28%, rgba(160,210,255,0.14) 0%, transparent 40%)',
          ].join(', '),
          filter: 'blur(22px)',
          zIndex: 0,
        }}
      />

      {/* Ground reflection pool */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '5%',
          left: '18%',
          right: '18%',
          height: '10%',
          background: 'radial-gradient(ellipse, rgba(74,150,232,0.20) 0%, transparent 70%)',
          filter: 'blur(14px)',
          zIndex: 0,
        }}
      />

      {/* ── Tooth ────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: size,
          height: size,
          animation: 'toothFloat 5.5s ease-in-out infinite',
        }}
      >
        {/*
          mix-blend-mode: multiply on a white page:
          • white pixels in image × white page = white  → invisible (seamless)
          • blue pixels  in image × white page = blue   → colour preserved exactly
          This completely removes the white background without any masking.
        */}
        <img
          src="/tooth.png"
          alt=""
          draggable={false}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            mixBlendMode: 'multiply',
            /* Nudge colour balance to match page's cool-blue palette */
            filter: 'saturate(1.18) contrast(1.06) brightness(1.04)',
            display: 'block',
          }}
        />
      </div>

      {/* ── Glow layer (on top, screen blend — adds luminosity without tinting) */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 2,
          width: size,
          height: size,
          animation: 'toothFloat 5.5s ease-in-out infinite',
          background:
            'radial-gradient(ellipse at 46% 38%, rgba(74,150,232,0.20) 0%, transparent 58%)',
          mixBlendMode: 'screen',
          borderRadius: '50%',
          filter: 'blur(8px)',
        }}
      />

      {/* ── Sparkles ─────────────────────────────────────────────── */}
      {[
        { top: '20%', right: '22%', size: 11, delay: '0s',   color: 'white' },
        { top: '42%', left:  '20%', size:  7, delay: '1.3s', color: 'rgba(74,150,232,0.9)' },
        { top: '15%', left:  '35%', size:  5, delay: '2.1s', color: 'rgba(180,220,255,0.8)' },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{ top: s.top, right: (s as any).right, left: (s as any).left, zIndex: 3 }}
        >
          <svg
            width={s.size}
            height={s.size}
            viewBox="0 0 24 24"
            style={{ animation: `sparkle 3s ease-in-out infinite`, animationDelay: s.delay }}
          >
            <path
              d="M12 2L13.6 9.4L21 11L13.6 12.6L12 20L10.4 12.6L3 11L10.4 9.4Z"
              fill={s.color}
            />
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes toothFloat {
          0%,100% { transform: translateY(0px)    rotate(-1.0deg) scale(1.00); }
          35%      { transform: translateY(-16px)  rotate( 0.6deg) scale(1.01); }
          68%      { transform: translateY(-7px)   rotate(-0.5deg) scale(0.99); }
        }
        @keyframes sparkle {
          0%,100% { opacity: 0.85; transform: scale(1)    rotate(0deg);  }
          50%      { opacity: 0.10; transform: scale(0.5)  rotate(45deg); }
        }
      `}</style>
    </div>
  )
}
