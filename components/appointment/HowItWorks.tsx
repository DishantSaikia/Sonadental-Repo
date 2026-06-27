'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const steps = [
  {
    n: '01',
    title: 'Choose your treatment',
    body: 'Tell us what you need — from a routine check-up to implants or maxillofacial surgery. Not sure? Select “General consultation”.',
    icon: (
      <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    ),
  },
  {
    n: '02',
    title: 'Pick a date & time',
    body: 'Select your preferred date and time from available morning or evening slots. Sunday mornings are also available.',
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4" />
      </>
    ),
  },
  {
    n: '03',
    title: 'Confirm & relax',
    body: "Leave your name and phone number and submit your request. Our team will call to confirm your slot at the earliest.",
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
    ),
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 30%, rgba(39,98,200,0.035) 0%, transparent 55%)' }}
      />
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 relative">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 gap-4">
          <motion.p
            className="text-[11px] font-body font-semibold tracking-[0.22em] uppercase text-brand-blue"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            How it works
          </motion.p>
          <motion.h2
            className="font-display font-extrabold text-navy text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.08]"
            style={{ letterSpacing: '-0.022em' }}
            initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.1, ease, delay: 0.1 }}
          >
            Three steps to a brighter smile
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              className="group relative rounded-[24px] border border-navy/8 bg-white p-8 md:p-9"
              style={{ boxShadow: '0 4px 32px rgba(26,58,110,0.06), 0 1px 4px rgba(26,58,110,0.04)' }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, ease, delay: 0.2 + i * 0.13 }}
              whileHover={{ y: -6 }}
            >
              <span
                className="absolute top-7 right-8 font-display font-black text-navy/[0.06] select-none"
                style={{ fontSize: '3.2rem', lineHeight: 1 }}
              >
                {s.n}
              </span>
              <div
                className="w-13 h-13 rounded-2xl flex items-center justify-center mb-7"
                style={{
                  width: 56,
                  height: 56,
                  backgroundImage: 'linear-gradient(135deg, #EBF4FF 0%, #d9e9ff 100%)',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2762C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {s.icon}
                </svg>
              </div>
              <h3 className="font-display font-bold text-navy text-[1.25rem] leading-snug mb-3">{s.title}</h3>
              <p className="text-navy/55 font-body text-[14px] leading-[1.72]">{s.body}</p>
              {/* Connector dot on hover accent */}
              <div className="absolute left-0 top-9 bottom-9 w-[3px] rounded-full bg-brand-blue/0 group-hover:bg-brand-blue/70 transition-colors duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
