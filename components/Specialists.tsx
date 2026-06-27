'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { DOCTORS } from '@/lib/clinicData'

const ease = [0.22, 1, 0.36, 1] as const
const specialistDoctors = (['shalini', 'rajesh', 'shubham'] as const)
  .map((id) => DOCTORS.find((doctor) => doctor.id === id))
  .filter((doctor): doctor is (typeof DOCTORS)[number] => Boolean(doctor))

const doctorGradients: Record<string, string> = {
  rajesh: 'linear-gradient(180deg, #1a3a7e 0%, #0e2255 100%)',
  shalini: 'linear-gradient(180deg, #1e4088 0%, #122860 100%)',
  shubham: 'linear-gradient(180deg, #1c3c80 0%, #102358 100%)',
}

const doctorAvatarGradients: Record<string, string> = {
  rajesh: 'linear-gradient(135deg, #1a3a7e 0%, #0e2255 100%)',
  shalini: 'linear-gradient(135deg, #1e4088 0%, #122860 100%)',
  shubham: 'linear-gradient(135deg, #1c3c80 0%, #102358 100%)',
}

export default function Specialists() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="specialists" ref={ref} className="py-24 md:py-36 bg-white">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.55fr] gap-12 lg:gap-16 items-start">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <motion.p
              className="text-[11px] text-brand-blue font-body font-semibold tracking-[0.22em] uppercase"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
            >
              Specialists
            </motion.p>

            <div className="flex flex-col gap-4">
              <motion.div
                className="inline-flex -space-x-2"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease, delay: 0.08 }}
              >
                {specialistDoctors.map((d) => (
                  <span
                    key={d.initials}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold font-display overflow-hidden bg-navy"
                    style={{
                      background: doctorAvatarGradients[d.id],
                    }}
                  >
                    <img
                      src={d.image}
                      alt=""
                      className="w-full h-full object-cover"
                      style={{ objectPosition: d.imagePosition }}
                    />
                  </span>
                ))}
              </motion.div>
              <motion.h2
                className="font-display font-extrabold text-navy leading-[1.08] text-[clamp(2rem,4vw,3.5rem)]"
                style={{ letterSpacing: '-0.022em' }}
                initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
                animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 1.1, ease, delay: 0.1 }}
              >
                Where experience
                <br />
                meets modern dental care
              </motion.h2>
            </div>

            <motion.p
              className="text-navy/50 font-body text-[15px] leading-[1.74] max-w-[380px]"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease, delay: 0.25 }}
            >
              Dr. Rajesh Aggarwal and Dr. Shalini Aggarwal bring over 30 years of trusted care,
              while Dr. Shubham Aggarwal adds advanced MDS training in oral and maxillofacial surgery.
            </motion.p>

            <motion.a
              href="/appointment"
              className="inline-flex items-center gap-2 border border-navy/20 text-navy/70 font-body text-[13.5px] font-medium rounded-full px-5 py-2.5 w-fit hover:bg-navy hover:text-white hover:border-navy transition-[background-color,color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.38 }}
            >
              Book a consultation →
            </motion.a>
          </div>

          {/* Right: Cards */}
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {specialistDoctors.map((doc, i) => {
                const isExpanded = expanded === doc.id
                return (
                  <motion.div
                    key={doc.id}
                    className="rounded-[24px] overflow-hidden flex flex-col relative border border-white/10"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.65, ease, delay: i * 0.08 }}
                    style={{
                      minHeight: 460,
                      background: doctorGradients[doc.id],
                      boxShadow: '0 24px 70px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.16)',
                    }}
                  >
                    {doc.image && (
                      <>
                        <img
                          src={doc.image}
                          alt={doc.imageAlt}
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{
                            objectPosition: doc.imagePosition,
                          }}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/90 via-black/56 to-transparent pointer-events-none z-[1]" />
                      </>
                    )}

                    {/* Specialty badge */}
                    <div className="p-4 shrink-0 relative z-10">
                      <span className="bg-white/14 border border-white/18 text-white/78 text-[10px] font-body tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-md">
                        {doc.specialty}
                      </span>
                    </div>

                    {/* Avatar */}
                    <div className="flex-1 flex items-center justify-center py-4 relative z-10">
                    </div>

                    {doc.image && (
                      <div className="absolute right-4 top-[4.25rem] z-10 hidden xl:block">
                        <div className="h-14 w-[1px] bg-white/28 mx-auto mb-2" />
                        <p className="font-body text-[9px] tracking-[0.24em] uppercase text-white/54 [writing-mode:vertical-rl]">
                          Sona Dental
                        </p>
                      </div>
                    )}

                    {/* Info */}
                    <div className="p-5 shrink-0 relative z-10">
                      <p className="font-display font-bold text-white text-[15px] leading-snug">{doc.name}</p>
                      <p className="text-white/60 text-[12px] font-body mt-0.5">{doc.qualifications}</p>
                      {doc.since && (
                        <p className="text-white/35 text-[11px] font-body mt-1 tracking-wide">
                          Practising since {doc.since}
                        </p>
                      )}
                      <p
                        className="!text-white text-[11.2px] font-body leading-[1.5] mt-2 [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden"
                        style={{ color: '#ffffff', opacity: 0.72 }}
                      >
                        {doc.bio}
                      </p>

                      {/* Expand toggle */}
                      <button
                        onClick={() => setExpanded(isExpanded ? null : doc.id)}
                        className="mt-3 flex items-center gap-1.5 text-white/55 hover:text-white text-[11px] font-body font-medium tracking-wide transition-colors duration-300 focus-visible:outline-none"
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? 'Hide' : 'Focus areas'}
                        <motion.svg
                          width="11" height="11" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5"
                          strokeLinecap="round" strokeLinejoin="round"
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3, ease }}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </motion.svg>
                      </button>

                      {/* Focus areas */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.ul
                            className="mt-3 flex flex-col gap-1.5"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease }}
                          >
                            {doc.focus.map((f) => (
                              <li key={f} className="flex items-start gap-2 text-white/65 text-[11.5px] font-body">
                                <span className="w-1 h-1 rounded-full bg-brand-light mt-1.5 shrink-0" />
                                {f}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
