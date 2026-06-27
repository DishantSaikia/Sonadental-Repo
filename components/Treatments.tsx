'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { TREATMENT_CATEGORIES } from '@/lib/clinicData'

const ease = [0.22, 1, 0.36, 1] as const

const treatmentMeta: Record<
  string,
  {
    eyebrow: string
    summary: string
    accent: string
    layout: string
  }
> = {
  general: {
    eyebrow: 'Pain / prevention',
    summary: 'Everyday dental care arranged around comfort, clarity and long-term maintenance.',
    accent: '#8FD0FF',
    layout: 'lg:col-span-7',
  },
  cosmetic: {
    eyebrow: 'Smile refinement',
    summary: 'Thoughtful aesthetic planning for smiles that feel bright, balanced and natural.',
    accent: '#BBDCFF',
    layout: 'lg:col-span-5',
  },
  implants: {
    eyebrow: 'Missing teeth',
    summary: 'Replacement routes chosen around chewing comfort, stability and lasting function.',
    accent: '#78E0D4',
    layout: 'lg:col-span-4',
  },
  surgery: {
    eyebrow: 'Surgical care',
    summary: 'Specialist guidance for complex concerns where precision and recovery matter.',
    accent: '#9CC7FF',
    layout: 'lg:col-span-4',
  },
  screening: {
    eyebrow: 'Jaw / screening',
    summary: 'Preventive checks that help identify oral and jaw concerns before they progress.',
    accent: '#D5ECFF',
    layout: 'lg:col-span-4',
  },
}

const concernRoutes = [
  { concern: 'Tooth pain', route: 'Exam -> RVG -> Relief plan' },
  { concern: 'Missing tooth', route: 'Implant / bridge / denture' },
  { concern: 'Wisdom tooth', route: 'Surgical assessment' },
  { concern: 'Smile alignment', route: 'Braces / aligners' },
  { concern: 'Jaw discomfort', route: 'TMJ / OSMF screening' },
] as const

export default function Treatments() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="treatments"
      ref={ref}
      className="py-24 md:py-36 relative overflow-hidden text-white"
      style={{ background: 'linear-gradient(135deg, #06133A 0%, #102A67 48%, #07123A 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.22]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)',
          backgroundSize: '68px 68px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(6,19,58,0.98) 0%, rgba(6,19,58,0.68) 38%, rgba(16,42,103,0.40) 100%)',
        }}
      />

      <div className="absolute right-6 top-12 hidden lg:block font-body text-[10px] tracking-[0.32em] uppercase text-white/30 [writing-mode:vertical-rl]">
        Treatment Map
      </div>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-end mb-16">
          <div>
            <motion.p
              className="text-[11px] font-body font-semibold tracking-[0.28em] uppercase text-brand-light/75 mb-4"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
            >
              Treatments
            </motion.p>
            <motion.h2
              className="font-display font-extrabold text-white text-[clamp(2.4rem,5.6vw,5.4rem)] leading-[0.96] max-w-[720px]"
              style={{ letterSpacing: '-0.028em' }}
              initial={{ opacity: 0, y: 30, filter: 'blur(14px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1.1, ease, delay: 0.08 }}
            >
              A care index, not a checklist.
            </motion.h2>
            <motion.p
              className="text-white/58 font-body text-[15px] leading-[1.8] max-w-[520px] mt-6"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
            >
              Every treatment starts with understanding the concern first. Explore the routes patients usually take,
              from routine relief to surgical and reconstructive care.
            </motion.p>
          </div>

          <motion.div
            className="relative rounded-[24px] border border-brand-light/30 p-5 md:p-6 overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.16)',
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease, delay: 0.28 }}
          >
            <p className="font-body text-[10px] tracking-[0.24em] uppercase text-brand-light/70 mb-5">
              Find care by concern
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {concernRoutes.map((item, i) => (
                <motion.div
                  key={item.concern}
                  className="rounded-[16px] border border-brand-light/20 bg-white/[0.055] px-4 py-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.75, ease, delay: 0.38 + i * 0.06 }}
                >
                  <p className="font-display font-bold text-white text-[14px] leading-snug">{item.concern}</p>
                  <p className="font-body text-[12px] text-white/48 leading-snug mt-1">{item.route}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
          {TREATMENT_CATEGORIES.map((cat, i) => {
            const meta = treatmentMeta[cat.id]

            return (
              <motion.article
                key={cat.id}
                className={`${meta.layout} min-h-[280px] rounded-[24px] border border-brand-light/30 relative overflow-hidden p-6 md:p-7 flex flex-col justify-between group`}
                style={{
                  background:
                    i === 0
                      ? 'linear-gradient(145deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.07) 52%, rgba(255,255,255,0.04) 100%)'
                      : 'rgba(255,255,255,0.075)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 18px 70px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.14)',
                }}
                initial={{ opacity: 0, y: 38 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  opacity: { duration: 0.9, ease, delay: 0.42 + i * 0.08 },
                  y: { duration: 0.2, ease },
                }}
                whileHover={{ y: -5 }}
              >
                <div>
                  <div className="max-w-[520px]">
                    <div>
                      <p className="font-body text-[10px] tracking-[0.22em] uppercase text-white/42 mb-3">
                        {meta.eyebrow}
                      </p>
                      <h3 className="font-display font-bold text-white text-[clamp(1.25rem,2vw,1.65rem)] leading-[1.08]">
                        {cat.label}
                      </h3>
                    </div>
                  </div>

                  <p className="text-white/55 font-body text-[13.5px] leading-[1.72] max-w-[470px] mt-5">
                    {meta.summary}
                  </p>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 mt-8 border-t border-brand-light/20 pt-5">
                  {cat.treatments.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 py-2 border-b border-brand-light/20 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                        style={{ background: meta.accent }}
                      />
                      <span className="font-body text-[13px] leading-snug text-white/70">{t}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}

          <motion.div
            className="lg:col-span-12 rounded-[24px] border border-brand-light/30 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.10)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16)',
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.82 }}
          >
            <div className="flex items-start gap-4">
              <div className="max-w-[620px]">
                <p className="font-body text-[10px] tracking-[0.24em] uppercase text-white/40 mb-1.5">
                  Prior appointment preferred
                </p>
                <h3 className="font-display font-bold text-white text-[1.2rem] leading-snug">
                  Not sure which route fits your concern?
                </h3>
                <p className="text-white/52 font-body text-[13.5px] leading-[1.7] mt-1 max-w-[560px]">
                  Book a general consultation and the clinic team will guide you to the right treatment path.
                </p>
              </div>
            </div>
            <a
              href="/appointment"
              className="inline-flex items-center justify-center gap-2 bg-white text-navy font-body font-semibold text-[13.5px] rounded-full px-6 py-3 w-fit hover:bg-brand-pale transition-colors duration-300"
            >
              Book a consultation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
