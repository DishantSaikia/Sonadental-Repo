'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLoadingReady } from './LoadingContext'
import ResizableTextBox, { type RBoxHandle } from './ResizableTextBox'

const STORAGE_KEY = 'hero-layout-v2'

// ─── Toggle this to enable/disable the drag/resize/font-size edit mode ────────
const EDIT_MODE = false

const ease = [0.22, 1, 0.36, 1] as const

function HeadingWords({ text, baseDelay = 0, ready }: { text: string; baseDelay?: number; ready: boolean }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ marginRight: '0.26em' }}
          initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
          animate={ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 28, filter: 'blur(12px)' }}
          transition={{ delay: baseDelay + i * 0.07, duration: 1.1, ease }}
        >
          {word}
        </motion.span>
      ))}
    </>
  )
}

// ─── Shared content blocks (rendered in both desktop and mobile) ─────────────

function HeroBlueprintLines({ ready }: { ready: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 hidden md:block pointer-events-none"
      style={{ zIndex: 2 }}
      initial={{ opacity: 0 }}
      animate={ready ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: 0.45, duration: 1.2, ease }}
    >
      <div
        className="absolute"
        style={{
          left: 472,
          top: 78,
          width: 1,
          height: 538,
          background: 'linear-gradient(180deg, transparent, rgba(26,58,110,0.16), transparent)',
        }}
      />
      <div
        className="absolute"
        style={{
          left: 84,
          right: 94,
          top: 248,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(26,58,110,0.12), rgba(74,150,232,0.16), transparent)',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          left: 438,
          top: 214,
          width: 8,
          height: 8,
          border: '1px solid rgba(39,98,200,0.22)',
          background: 'rgba(255,255,255,0.75)',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          left: 978,
          top: 214,
          width: 8,
          height: 8,
          border: '1px solid rgba(39,98,200,0.22)',
          background: 'rgba(255,255,255,0.75)',
        }}
      />
    </motion.div>
  )
}

function ToothStage({ ready }: { ready: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute hidden md:block pointer-events-none"
      style={{ left: 411, top: 50, width: 646, height: 604, zIndex: 1 }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{ delay: 0.2, duration: 1.3, ease }}
    >
      <div
        className="absolute inset-0"
        style={{
          borderRadius: '44% 56% 48% 52% / 50% 42% 58% 50%',
          background:
            'radial-gradient(circle at 52% 43%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.58) 42%, rgba(232,243,255,0.36) 72%, transparent 100%)',
          border: '1px solid rgba(187,220,255,0.46)',
          boxShadow:
            '0 42px 120px rgba(26,58,110,0.10), inset 0 1px 0 rgba(255,255,255,0.92), inset 0 -1px 0 rgba(39,98,200,0.08)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      />
      <div
        className="absolute"
        style={{
          inset: '11%',
          borderRadius: '42% 58% 46% 54% / 52% 45% 55% 48%',
          border: '1px solid rgba(39,98,200,0.09)',
        }}
      />
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '-4%',
          bottom: '-2%',
          width: 1,
          background: 'linear-gradient(180deg, transparent, rgba(39,98,200,0.10), transparent)',
        }}
      />
      <div
        className="absolute"
        style={{
          left: '5%',
          right: '5%',
          top: '52%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(39,98,200,0.10), transparent)',
        }}
      />
    </motion.div>
  )
}

function FloatingHeroTags({ ready }: { ready: boolean }) {
  const tags = [
    { label: 'Family dentistry', left: 552, top: 574, delay: 0.92 },
  ] as const

  return (
    <div aria-hidden="true" className="absolute inset-0 hidden md:block pointer-events-none" style={{ zIndex: 24 }}>
      {tags.map((tag) => (
        <motion.div
          key={tag.label}
          className="absolute rounded-full border border-brand-light/[0.34] bg-white/[0.74] px-3.5 py-2 font-body text-[10px] font-semibold uppercase text-navy/[0.62]"
          style={{
            left: tag.left,
            top: tag.top,
            letterSpacing: '0.16em',
            boxShadow: '0 12px 34px rgba(26,58,110,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
          initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
          animate={ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 12, filter: 'blur(8px)' }}
          transition={{ delay: tag.delay, duration: 0.9, ease }}
        >
          {tag.label}
        </motion.div>
      ))}
    </div>
  )
}

function LeftContent({ ready }: { ready: boolean }) {
  return (
    <>
      <h1
        className="font-display font-black text-navy"
        style={{ fontSize: 'var(--rbox-fs, clamp(2.4rem, 4.6vw, 4.75rem))', lineHeight: 0.92 }}
      >
        <span className="block">
          <HeadingWords text="Your smile deserves" baseDelay={0} ready={ready} />
        </span>
        <span className="block">
          <HeadingWords text="more than just" baseDelay={0.21} ready={ready} />
        </span>
        <span className="block">
          <HeadingWords text="a quick fix" baseDelay={0.42} ready={ready} />
        </span>
      </h1>

      <motion.p
        className="text-navy/80 font-body font-semibold"
        style={{ maxWidth: 330, marginTop: 28, fontSize: 14, lineHeight: 1.45 }}
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ delay: 0.6, duration: 1, ease }}
      >
        Since 1994, Sona Dental &amp; Maxillofacial Clinic in Shahdara has provided thoughtful family dentistry, restorative care, dental implants and specialised oral and maxillofacial treatment across two generations.
      </motion.p>
      <motion.p
        className="font-body font-semibold text-navy/35"
        style={{ fontSize: 10.5, letterSpacing: '0.18em', marginTop: 16 }}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.75, duration: 1, ease }}
      >
        EST. 1994 &middot; SHAHDARA, DELHI
      </motion.p>
    </>
  )
}

function RightContent({ ready }: { ready: boolean }) {
  return (
    <>
      <h2
        className="font-display font-black text-navy"
        style={{ fontSize: 'var(--rbox-fs, clamp(2.3rem, 4.2vw, 4.6rem))', lineHeight: 0.95 }}
      >
        <span className="block">
          <HeadingWords text="Gentle Care" baseDelay={0.1} ready={ready} />
        </span>
        <span className="block">
          <HeadingWords text="Made for" baseDelay={0.24} ready={ready} />
        </span>
        <span className="block">
          <HeadingWords text="You" baseDelay={0.38} ready={ready} />
        </span>
      </h2>

      <motion.div
        className="relative mt-7 w-fit max-w-[390px] rounded-[26px] border border-brand-light/30 bg-white/[0.74] p-4"
        style={{
          boxShadow: '0 22px 58px rgba(26,58,110,0.12), inset 0 1px 0 rgba(255,255,255,0.92)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.7, duration: 1, ease }}
      >
        <div
          className="absolute inset-0 pointer-events-none rounded-[26px]"
          style={{
            background:
              'linear-gradient(135deg, rgba(75,150,232,0.12) 0%, transparent 48%), radial-gradient(circle at 92% 12%, rgba(187,220,255,0.30) 0%, transparent 34%)',
          }}
        />
        <div className="relative">
          <p className="font-body text-[10px] font-semibold uppercase text-brand-blue/[0.72]" style={{ letterSpacing: '0.22em' }}>
            Consultation desk
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <div className="rounded-[18px] border border-navy/10 bg-white/[0.55] px-3.5 py-3">
              <p className="font-body text-[9px] uppercase text-navy/[0.36]" style={{ letterSpacing: '0.18em' }}>
                Mon-Sat
              </p>
              <p className="font-display font-bold text-navy text-[1.05rem] leading-tight mt-1">
                10-1:30
              </p>
              <p className="font-body text-[11px] text-navy/[0.52] leading-none mt-1">
                6-9:30
              </p>
            </div>
            <div className="rounded-[18px] border border-navy/10 bg-white/[0.55] px-3.5 py-3">
              <p className="font-body text-[9px] uppercase text-navy/[0.36]" style={{ letterSpacing: '0.18em' }}>
                Sunday
              </p>
              <p className="font-display font-bold text-navy text-[1.05rem] leading-tight mt-1">
                10-1:30
              </p>
              <p className="font-body text-[11px] text-navy/[0.52] leading-none mt-1">
                Evening closed
              </p>
            </div>
          </div>

          <motion.a
            href="/appointment"
            className="mt-3.5 inline-flex items-center gap-2.5 text-white font-body font-semibold rounded-full w-fit"
            style={{
              paddingTop: 7,
              paddingBottom: 7,
              paddingLeft: 7,
              paddingRight: 22,
              fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
              backgroundImage: 'linear-gradient(135deg, #2762C8 0%, #1A3A6E 100%)',
              boxShadow: '0 12px 36px rgba(39,98,200,0.30), 0 4px 12px rgba(39,98,200,0.20)',
            }}
            whileHover={{ y: -2, boxShadow: '0 20px 48px rgba(39,98,200,0.38)' }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </span>
            Schedule a visit
          </motion.a>
        </div>
      </motion.div>
    </>
  )
}

// ─── Tooth (shared) ───────────────────────────────────────────────────────────

function ToothImage({ ready, toothY, fillWidth }: { ready: boolean; toothY: any; fillWidth?: boolean }) {
  return (
    <motion.div
      className="relative"
      style={{ y: toothY }}
      initial={{ opacity: 0, scale: 0.93, filter: 'blur(24px)' }}
      animate={ready ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 0.93, filter: 'blur(24px)' }}
      transition={{ duration: 2.0, ease, delay: 0 }}
    >
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(74,150,232,0.45) 0%, rgba(39,98,200,0.20) 45%, transparent 72%)',
          transform: 'scale(1.5)',
          filter: 'blur(32px)',
        }}
        aria-hidden="true"
      />
      <motion.img
        src="/transparent_output.png"
        alt=""
        animate={ready ? { y: [0, -7, 0], rotateZ: [0, 0.84, 0], scale: [1, 1.013, 1] } : { y: 0, rotateZ: 0, scale: 1 }}
        transition={ready ? { duration: 11, ease: 'easeInOut', repeat: Infinity } : {}}
        style={{
          width: fillWidth ? '100%' : 'clamp(186px, 59vw, 254px)',
          maxHeight: fillWidth ? undefined : 282,
          height: 'auto',
          objectFit: 'contain',
          display: 'block',
          willChange: 'transform',
        }}
      />
    </motion.div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function ResponsiveToothPanel({ ready, toothY }: { ready: boolean; toothY: any }) {
  return (
    <motion.div
      className="relative mx-auto flex h-[360px] w-full max-w-[430px] items-center justify-center overflow-hidden rounded-[42px] border border-brand-light/30 bg-white/55 lg:h-[390px]"
      style={{
        boxShadow: '0 28px 80px rgba(26,58,110,0.10), inset 0 1px 0 rgba(255,255,255,0.92)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
      initial={{ opacity: 0, y: 18, filter: 'blur(12px)' }}
      animate={ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 18, filter: 'blur(12px)' }}
      transition={{ delay: 0.32, duration: 1.1, ease }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-[7%]"
        style={{
          borderRadius: '44% 56% 48% 52% / 50% 42% 58% 50%',
          background:
            'radial-gradient(circle at 52% 43%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.60) 42%, rgba(232,243,255,0.40) 72%, transparent 100%)',
          border: '1px solid rgba(187,220,255,0.48)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-[50%] top-[10%] h-[78%] w-px"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(39,98,200,0.12), transparent)' }}
      />
      <div
        aria-hidden="true"
        className="absolute left-[10%] top-[52%] h-px w-[80%]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(39,98,200,0.12), transparent)' }}
      />
      <div className="relative z-10 w-[min(62%,280px)]">
        <ToothImage ready={ready} toothY={toothY} fillWidth />
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-brand-light/[0.34] bg-white/[0.78] px-3.5 py-2 font-body text-[10px] font-semibold uppercase text-navy/[0.62]"
        style={{
          letterSpacing: '0.16em',
          boxShadow: '0 12px 34px rgba(26,58,110,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
      >
        Family dentistry
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ready } = useLoadingReady()

  // ── Refs to every resizable box so we can read their state on save ─────────
  const line1Ref   = useRef<RBoxHandle>(null)
  const line2Ref   = useRef<RBoxHandle>(null)
  const line3Ref   = useRef<RBoxHandle>(null)
  const subtextRef = useRef<RBoxHandle>(null)
  const toothRef     = useRef<RBoxHandle>(null)
  const rightRef     = useRef<RBoxHandle>(null)
  const signatureRef = useRef<RBoxHandle>(null)

  const allRefs = { line1: line1Ref, line2: line2Ref, line3: line3Ref, subtext: subtextRef, tooth: toothRef, right: rightRef, signature: signatureRef }

  // ── Load saved layout after mount (only in edit mode) ────────────────────
  useEffect(() => {
    if (!EDIT_MODE) return
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    try {
      const saved = JSON.parse(raw) as Record<string, any>
      for (const [key, ref] of Object.entries(allRefs)) {
        if (saved[key] && ref.current) ref.current.restore(saved[key])
      }
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Save ──────────────────────────────────────────────────────────────────
  const [saveState, setSaveState] = useState<'idle' | 'done'>('idle')

  function handleSave() {
    const layout: Record<string, any> = {}
    for (const [key, ref] of Object.entries(allRefs)) {
      if (ref.current) layout[key] = ref.current.getState()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout))
    setSaveState('done')
    setTimeout(() => setSaveState('idle'), 2200)
  }

  function handleReset() {
    localStorage.removeItem(STORAGE_KEY)
    window.location.reload()
  }

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const watermarkY       = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const toothY           = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden bg-white"
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(ellipse at 18% 55%, rgba(39,98,200,0.04) 0%, transparent 50%),' +
          'radial-gradient(ellipse at 82% 22%, rgba(74,150,232,0.03) 0%, transparent 45%),' +
          '#ffffff',
      }}
    >
      <div className="h-[72px] md:h-[80px]" />

      {/* ─── DESKTOP: ResizableTextBox overlays ──────────────────────────── */}
      <div
        className="hidden min-[1420px]:block relative max-w-[1380px] mx-auto"
        style={{ minHeight: 'max(690px, calc(100vh - 80px))' }}
      >
        <ToothStage ready={ready} />
        <HeroBlueprintLines ready={ready} />
        <FloatingHeroTags ready={ready} />

        {/*
          Text boxes: coordinates relative to the 1380px container.
          Tooth box: centered, image fills its width (width: 100%).
          All boxes are freely draggable and resizable.
          Text boxes are editable — click and type to change content.
          Font size toolbar appears above the box when selected.
        */}

        {/* ── Left: 3 individual line boxes ── */}
        <ResizableTextBox ref={line1Ref} initialX={84} initialY={12} initialWidth={724} editable zIndex={10} editMode={EDIT_MODE}>
          <h1 className="font-display font-black text-navy" style={{ fontSize: 'var(--rbox-fs, clamp(2.4rem, 4.6vw, 4.75rem))', lineHeight: 0.92 }}>
            <HeadingWords text="Your smile deserves" baseDelay={0} ready={ready} />
          </h1>
        </ResizableTextBox>

        <ResizableTextBox ref={line2Ref} initialX={12} initialY={85} initialWidth={595} editable zIndex={10} editMode={EDIT_MODE}>
          <h1 className="font-display font-black text-navy" style={{ fontSize: 'var(--rbox-fs, clamp(2.4rem, 4.6vw, 4.75rem))', lineHeight: 0.92 }}>
            <HeadingWords text="more than just" baseDelay={0.21} ready={ready} />
          </h1>
        </ResizableTextBox>

        <ResizableTextBox ref={line3Ref} initialX={14} initialY={160} initialWidth={400} editable zIndex={10} editMode={EDIT_MODE}>
          <h1 className="font-display font-black text-navy" style={{ fontSize: 'var(--rbox-fs, clamp(2.4rem, 4.6vw, 4.75rem))', lineHeight: 0.92 }}>
            <HeadingWords text="a quick fix" baseDelay={0.42} ready={ready} />
          </h1>
        </ResizableTextBox>

        {/* ── Left: subtext ── */}
        <ResizableTextBox ref={subtextRef} initialX={18} initialY={275} initialWidth={386} editable zIndex={10} editMode={EDIT_MODE}>
          <motion.p
            className="text-navy/80 font-body font-semibold"
            style={{ fontSize: 14, lineHeight: 1.45 }}
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 0.6, duration: 1, ease }}
          >
            Since 1994, Sona Dental &amp; Maxillofacial Clinic in Shahdara has provided thoughtful family dentistry, restorative care, dental implants and specialised oral and maxillofacial treatment across two generations.
          </motion.p>
          <motion.p
            className="font-body font-semibold text-navy/35"
            style={{ fontSize: 10.5, letterSpacing: '0.18em', marginTop: 14 }}
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.75, duration: 1, ease }}
          >
            EST. 1994 &middot; SHAHDARA, DELHI
          </motion.p>
        </ResizableTextBox>

        {/* ── Tooth — layer ABOVE the text boxes ── */}
        <ResizableTextBox ref={toothRef} initialX={548} initialY={92} initialWidth={398} imageBox zIndex={20} editMode={EDIT_MODE}>
          <ToothImage ready={ready} toothY={toothY} fillWidth />
        </ResizableTextBox>

        {/* ── Lower-left signature ── */}
        <ResizableTextBox ref={signatureRef} initialX={10} initialY={430} initialWidth={340} editable zIndex={10} editMode={EDIT_MODE}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ delay: 0.9, duration: 1.2, ease }}
          >
            <p
              style={{
                fontFamily: 'var(--font-signature)',
                fontSize: 'clamp(2.4rem, 3.8vw, 3.6rem)',
                color: '#1A3A6E',
                opacity: 0.45,
                lineHeight: 1.1,
                letterSpacing: '0.01em',
              }}
            >
              Sona Dental
              <br />
              <span style={{ fontSize: '62%', letterSpacing: '0.02em' }}>&amp; Maxillofacial Clinic</span>
            </p>
            <div style={{ width: 56, height: 1, background: '#1A3A6E', opacity: 0.25, marginTop: 4 }} />
          </motion.div>
        </ResizableTextBox>

        {/* ── Right text box ── */}
        <ResizableTextBox ref={rightRef} initialX={958} initialY={105} initialWidth={390} initialFontSize={58} editable zIndex={10} editMode={EDIT_MODE}>
          <RightContent ready={ready} />
        </ResizableTextBox>
      </div>

      {/* ─── MOBILE: simple stacked layout ───────────────────────────────── */}
      <div
        className="hidden md:block min-[1420px]:hidden px-8 lg:px-10"
        style={{ minHeight: 'calc(100vh - 80px)' }}
      >
        <div className="relative mx-auto max-w-[1180px] py-10 lg:py-12">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[38%] hidden h-px bg-gradient-to-r from-transparent via-brand-light/25 to-transparent lg:block"
          />
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,430px)] lg:gap-10">
            <div className="relative z-10 max-w-[680px]">
              <LeftContent ready={ready} />
            </div>
            <ResponsiveToothPanel ready={ready} toothY={toothY} />
          </div>
          <div className="mt-8 grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,430px)]">
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, y: 14 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ delay: 0.86, duration: 1.1, ease }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-signature)',
                  fontSize: 'clamp(2.2rem, 3.4vw, 3.35rem)',
                  color: '#1A3A6E',
                  opacity: 0.36,
                  lineHeight: 1.1,
                  letterSpacing: '0.01em',
                }}
              >
                Sona Dental
                <br />
                <span style={{ fontSize: '62%', letterSpacing: '0.02em' }}>&amp; Maxillofacial Clinic</span>
              </p>
              <div style={{ width: 56, height: 1, background: '#1A3A6E', opacity: 0.20, marginTop: 4 }} />
            </motion.div>
            <div className="relative z-10 max-w-[430px]">
              <RightContent ready={ready} />
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden flex flex-col px-6" style={{ minHeight: 'calc(100vh - 80px)' }}>
        {/* Left heading */}
        <div className="pt-10 pb-6">
          <LeftContent ready={ready} />
        </div>

        {/* Tooth */}
        <div className="relative flex w-full items-center justify-center py-2">
          <div
            className="relative flex aspect-square w-full max-w-[334px] items-center justify-center overflow-hidden rounded-[38px] border border-brand-light/30 bg-white/60"
            style={{
              boxShadow: '0 24px 70px rgba(26,58,110,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <div
              className="relative z-10 flex items-center justify-center"
              style={{ height: 'calc(100% - 24px)', aspectRatio: '928 / 1144' }}
            >
              <ToothImage ready={ready} toothY={toothY} fillWidth />
            </div>
          </div>
        </div>

        {/* Right heading + CTA */}
        <div className="pt-6 pb-12">
          <RightContent ready={ready} />
        </div>
      </div>

      {/* ─── Save button (desktop only, visible in edit mode only) ─────── */}
      {EDIT_MODE && <div className="hidden md:flex fixed bottom-6 right-6 z-[9000] items-center gap-2">
        {/* Reset — clears localStorage and reloads */}
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 font-body text-sm font-medium rounded-full px-4 py-2.5 transition-all duration-200"
          style={{ background: 'rgba(26,58,110,0.12)', color: '#1A3A6E', boxShadow: '0 4px 12px rgba(26,58,110,0.12)' }}
          title="Clear saved layout and reset to defaults"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3"/></svg>
          Reset
        </button>

        {/* Save */}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 font-body font-semibold text-sm rounded-full px-5 py-2.5 transition-all duration-300"
          style={{
            background: saveState === 'done' ? '#16a34a' : '#1A3A6E',
            color: '#fff',
            boxShadow: '0 8px 24px rgba(26,58,110,0.30)',
          }}
        >
          {saveState === 'done' ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Saved!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              Save Layout
            </>
          )}
        </button>
      </div>}

      {/* ─── Watermark ───────────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
        style={{ y: watermarkY, opacity: watermarkOpacity }}
        aria-hidden="true"
      >
        <p
          className="font-display font-black text-center text-navy whitespace-nowrap"
          style={{
            fontSize: 'clamp(90px, 12vw, 180px)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            opacity: 0.025,
            transform: 'translateY(28%)',
          }}
        >
          Sona Dental — Soft. Defined.
        </p>
      </motion.div>
    </section>
  )
}
