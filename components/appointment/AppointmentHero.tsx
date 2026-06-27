'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLoadingReady } from '../LoadingContext'
import { CLINIC } from '@/lib/clinicData'

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

const signals = [
  { label: 'Confirm by call', value: 'Same day' },
  { label: 'Clinic hours', value: '10 AM - 9:30 PM' },
  { label: 'Location', value: 'Shahdara' },
] as const

export default function AppointmentHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ready } = useLoadingReady()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const stageY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const watermarkY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section
      ref={sectionRef}
      id="appointment-hero"
      className="relative overflow-hidden bg-white"
      style={{
        minHeight: '96vh',
        background:
          'radial-gradient(ellipse at 17% 52%, rgba(39,98,200,0.045) 0%, transparent 50%),' +
          'radial-gradient(ellipse at 82% 18%, rgba(74,150,232,0.045) 0%, transparent 44%),' +
          '#ffffff',
      }}
    >
      <div className="h-[72px] md:h-[80px]" />

      <div
        className="absolute inset-x-0 top-[40%] hidden md:block h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(39,98,200,0.12), transparent)' }}
      />
      <div
        className="absolute left-[34%] top-[90px] bottom-[9%] hidden md:block w-px pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(39,98,200,0.10), transparent)' }}
      />

      <div className="max-w-[1380px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-12 xl:gap-20 items-center min-h-[calc(96vh-80px)] py-14 md:py-16">
          <div className="relative">
            <motion.p
              className="font-body text-[11px] font-semibold tracking-[0.28em] uppercase text-brand-blue mb-6"
              initial={{ opacity: 0, y: 14 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ delay: 0.08, duration: 0.85, ease }}
            >
              Appointment Request
            </motion.p>

            <h1
              className="font-display font-black text-navy"
              style={{ fontSize: 'clamp(2.55rem, 5vw, 5.15rem)', lineHeight: 0.92, letterSpacing: '-0.028em' }}
            >
              <span className="block">
                <HeadingWords text="Plan your visit" baseDelay={0} ready={ready} />
              </span>
              <span className="block">
                <HeadingWords text="without the" baseDelay={0.2} ready={ready} />
              </span>
              <span className="block">
                <HeadingWords text="back-and-forth" baseDelay={0.4} ready={ready} />
              </span>
            </h1>

            <motion.p
              className="text-navy/75 font-body font-semibold mt-7"
              style={{ maxWidth: 470, fontSize: 14.5, lineHeight: 1.68 }}
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.62, duration: 1, ease }}
            >
              Choose the treatment, date and preferred time. The clinic team will review the request and call you to confirm the final slot.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mt-8"
              initial={{ opacity: 0, y: 18 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ delay: 0.76, duration: 0.95, ease }}
            >
              <motion.a
                href="#book"
                className="inline-flex items-center gap-2.5 text-white font-body font-semibold rounded-full"
                style={{
                  paddingTop: 7,
                  paddingBottom: 7,
                  paddingLeft: 7,
                  paddingRight: 22,
                  fontSize: 'clamp(0.82rem, 1vw, 0.92rem)',
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
                Choose a time
              </motion.a>
              <motion.a
                href={`tel:${CLINIC.phonesRaw[0]}`}
                className="inline-flex items-center justify-center rounded-full border border-navy/16 bg-white/70 px-6 py-3 text-[13.5px] font-body font-semibold text-navy/70 hover:bg-brand-pale hover:text-navy transition-[background-color,color] duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Call the clinic
              </motion.a>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10 max-w-[590px]"
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.9, duration: 1, ease }}
            >
              {signals.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-[18px] border border-navy/10 bg-white/70 px-4 py-3"
                  style={{
                    boxShadow: '0 14px 42px rgba(26,58,110,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                >
                  <p className="font-body text-[9px] tracking-[0.18em] uppercase text-navy/36">{signal.label}</p>
                  <p className="font-display font-bold text-navy text-[1.02rem] leading-tight mt-1.5">{signal.value}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative"
            style={{ y: stageY }}
            initial={{ opacity: 0, x: 44, filter: 'blur(16px)' }}
            animate={ready ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.42, duration: 1.25, ease }}
          >
            <div
              className="absolute -inset-12 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 55% 48%, rgba(39,98,200,0.18) 0%, rgba(74,150,232,0.07) 44%, transparent 72%)',
              }}
            />

            <div
              className="relative min-h-[520px] rounded-[30px] overflow-hidden border border-brand-light/26"
              style={{
                boxShadow: '0 46px 110px rgba(26,58,110,0.20), 0 12px 36px rgba(26,58,110,0.10), inset 0 1px 0 rgba(255,255,255,0.8)',
              }}
            >
              <img
                src="/clinic-reception.jpeg"
                alt="Sona Dental reception area"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: 'center 48%', filter: 'saturate(1.04) contrast(1.02) brightness(0.98)' }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(5,14,42,0.62) 0%, rgba(8,22,58,0.24) 48%, rgba(255,255,255,0.10) 100%), linear-gradient(180deg, rgba(5,14,42,0.08) 0%, rgba(5,14,42,0.24) 52%, rgba(5,14,42,0.82) 100%)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.18]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)',
                  backgroundSize: '64px 64px',
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
                }}
              />

              <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-4">
                <div className="rounded-full border border-white/22 bg-white/14 px-3.5 py-2 backdrop-blur-md">
                  <p className="font-body text-[9px] tracking-[0.24em] uppercase" style={{ color: 'rgba(255,255,255,0.72)' }}>
                    Sona Dental
                  </p>
                </div>
                <a
                  href={CLINIC.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/24 bg-white/16 px-4 py-2 font-body text-[11.5px] font-semibold backdrop-blur-md hover:bg-white/22 transition-colors duration-300"
                  style={{ color: 'rgba(255,255,255,0.86)' }}
                >
                  Directions
                </a>
              </div>

              <div className="absolute left-5 right-5 bottom-5 grid grid-cols-1 md:grid-cols-[1fr_0.74fr] gap-4">
                <div
                  className="rounded-[24px] border border-white/16 bg-white/[0.12] p-5 backdrop-blur-[16px]"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16)' }}
                >
                  <p className="font-body text-[10px] tracking-[0.24em] uppercase mb-3" style={{ color: 'rgba(187,220,255,0.82)' }}>Appointment desk</p>
                  <h2 className="font-display font-extrabold text-white text-[clamp(1.45rem,2.2vw,2.15rem)] leading-[1.03]">
                    Pick a preferred slot. We confirm it personally.
                  </h2>
                  <p
                    className="font-body text-[13px] leading-[1.65] mt-3 max-w-[420px]"
                    style={{ color: 'rgba(255,255,255,0.64)' }}
                  >
                    Online requests are reviewed by the clinic team before confirmation, so your visit stays planned and realistic.
                  </p>
                </div>

                <div
                  className="rounded-[24px] border border-white/16 bg-white/[0.90] p-4"
                  style={{
                    boxShadow: '0 18px 54px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.96)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                  }}
                >
                  <p className="font-body text-[9px] tracking-[0.22em] uppercase text-brand-blue/72 mb-3">Today at a glance</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="rounded-[16px] border border-navy/10 bg-white/70 px-3.5 py-3">
                      <p className="font-body text-[9px] uppercase tracking-[0.18em] text-navy/36">Mon-Sat</p>
                      <p className="font-display font-bold text-navy text-[1.03rem] leading-tight mt-1">10-1:30</p>
                      <p className="font-body text-[11px] text-navy/52 leading-none mt-1">6-9:30</p>
                    </div>
                    <div className="rounded-[16px] border border-navy/10 bg-white/70 px-3.5 py-3">
                      <p className="font-body text-[9px] uppercase tracking-[0.18em] text-navy/36">Sunday</p>
                      <p className="font-display font-bold text-navy text-[1.03rem] leading-tight mt-1">10-1:30</p>
                      <p className="font-body text-[11px] text-navy/52 leading-none mt-1">Evening closed</p>
                    </div>
                  </div>
                  <p className="font-body text-[11px] leading-[1.55] text-navy/50 mt-3">
                    Address: Rama Block, Bhola Nath Nagar, Shahdara.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              className="absolute -top-4 -right-3 hidden md:flex rounded-full border border-brand-light/28 bg-navy px-4 py-2 items-center gap-2"
              style={{ boxShadow: '0 14px 36px rgba(26,58,110,0.30)' }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-light" />
              <span className="font-body text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.84)' }}>Prior appointment preferred</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

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
          Reserve - Relax - Restore
        </p>
      </motion.div>
    </section>
  )
}
