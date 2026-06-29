'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import BeforeAfterSlider from './BeforeAfterSlider'

const ease = [0.22, 1, 0.36, 1] as const

interface ImagePair {
  slug: string
  label: string
  before: string
  after: string
}

function CaseCard({ pair, index, inView }: { pair: ImagePair; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease, delay: 0.15 + index * 0.08 }}
      className="flex flex-col gap-3"
    >
      <div className="flex items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-body text-[11px] font-semibold tracking-[0.14em] uppercase text-brand-blue"
          style={{ background: 'rgba(39,98,200,0.07)', border: '1px solid rgba(39,98,200,0.14)' }}
        >
          <span className="w-1 h-1 rounded-full bg-brand-blue" />
          {pair.label}
        </span>
      </div>

      <div
        className="w-full rounded-[20px] overflow-hidden"
        style={{
          height: 280,
          boxShadow: '0 20px 50px rgba(26,58,110,0.12), 0 4px 16px rgba(26,58,110,0.07)',
        }}
      >
        <BeforeAfterSlider beforeSrc={pair.before} afterSrc={pair.after} />
      </div>
    </motion.div>
  )
}


export default function BeforeAfter() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [pairs, setPairs] = useState<ImagePair[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/before-after')
      .then(r => r.json())
      .then(data => { setPairs(data); setLoaded(true) })
      .catch(() => setLoaded(true))
  }, [])

  if (!loaded || pairs.length === 0) return null

  return (
    <section
      ref={ref}
      id="results"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 12% 30%, rgba(39,98,200,0.04) 0%, transparent 50%),' +
          'radial-gradient(ellipse at 88% 70%, rgba(74,150,232,0.03) 0%, transparent 50%),' +
          '#ffffff',
      }}
    >
      <div className="max-w-[1380px] mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-end mb-14">
          <div>
            <motion.p
              className="text-[11px] font-body font-semibold tracking-[0.22em] uppercase text-brand-blue mb-4"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
            >
              Results
            </motion.p>
            <motion.h2
              className="font-display font-extrabold text-navy leading-[0.96]"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', letterSpacing: '-0.025em' }}
              initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1.1, ease, delay: 0.08 }}
            >
              Real smiles,<br />real change.
            </motion.h2>
            <motion.p
              className="text-navy/55 font-body text-[14.5px] leading-[1.7] mt-5 max-w-[480px]"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease, delay: 0.18 }}
            >
              Drag the handle across each photo to see the transformation. Every result below was achieved at Sona Dental &amp; Maxillofacial Clinic.
            </motion.p>
          </div>

          {pairs.length > 0 && (
            <motion.div
              className="hidden lg:flex items-center gap-3 self-end mb-1"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, ease, delay: 0.4 }}
            >
              <div
                className="flex items-center gap-2 rounded-full px-4 py-2 font-body text-[12px] font-semibold text-brand-blue"
                style={{ background: 'rgba(39,98,200,0.06)', border: '1px solid rgba(39,98,200,0.12)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 12h8M5 9l-3 3 3 3M19 9l3 3-3 3" />
                </svg>
                Drag to reveal
              </div>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pairs.map((pair, i) => (
            <CaseCard key={pair.slug} pair={pair} index={i} inView={inView} />
          ))}
        </div>

        <motion.p
          className="mt-10 text-center font-body text-[11.5px] text-navy/30 max-w-[560px] mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease, delay: 0.6 }}
        >
          Results vary by individual. Photos are of actual patients treated at Sona Dental &amp; Maxillofacial Clinic and are shared with consent.
        </motion.p>

      </div>
    </section>
  )
}
