'use client'

import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { CLINIC, SERVICES, TREATMENT_CATEGORIES } from '@/lib/clinicData'

const ease = [0.22, 1, 0.36, 1] as const

const treatmentMap = Object.fromEntries(
  TREATMENT_CATEGORIES.map((c) => [c.id, c.treatments])
) as Record<string, readonly string[]>

const serviceMeta: Record<
  string,
  {
    eyebrow: string
    cue: string
    accent: string
  }
> = {
  general: {
    eyebrow: 'Diagnosis / relief',
    cue: 'Everyday care',
    accent: '#8FD0FF',
  },
  cosmetic: {
    eyebrow: 'Smile refinement',
    cue: 'Aesthetic planning',
    accent: '#BBDCFF',
  },
  implants: {
    eyebrow: 'Replacement / function',
    cue: 'Implant-led care',
    accent: '#78E0D4',
  },
  surgery: {
    eyebrow: 'Oral surgery',
    cue: 'Specialist support',
    accent: '#9CC7FF',
  },
  screening: {
    eyebrow: 'Early assessment',
    cue: 'Jaw & oral checks',
    accent: '#D5ECFF',
  },
}

const clinicSignals = [
  { label: 'Established', value: String(CLINIC.established) },
  { label: 'Location', value: 'Shahdara' },
  { label: 'Diagnostics', value: 'RVG' },
] as const

type Service = (typeof SERVICES)[number]
type ServiceMeta = (typeof serviceMeta)[string]

function DesktopServiceCard({
  service,
  meta,
  treatments,
  index,
  inView,
}: {
  service: Service
  meta: ServiceMeta
  treatments: readonly string[]
  index: number
  inView: boolean
}) {
  const magneticX = useMotionValue(0)
  const magneticY = useMotionValue(0)
  const x = useSpring(magneticX, { stiffness: 230, damping: 24, mass: 0.35 })
  const y = useSpring(magneticY, { stiffness: 230, damping: 24, mass: 0.35 })

  const resetMagnet = () => {
    magneticX.set(0)
    magneticY.set(0)
  }

  return (
    <motion.article
      key={service.id}
      tabIndex={0}
      onMouseEnter={() => {
        magneticY.set(-7)
      }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const relX = event.clientX - rect.left - rect.width / 2
        const relY = event.clientY - rect.top - rect.height / 2
        magneticX.set((relX / rect.width) * 12)
        magneticY.set(-7 + (relY / rect.height) * 8)
      }}
      onMouseLeave={resetMagnet}
      onFocus={() => {
        magneticY.set(-7)
      }}
      onBlur={resetMagnet}
      className="basis-0 flex-1 min-w-0 h-full rounded-[22px] border border-brand-light/24 relative overflow-hidden group focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-light focus-visible:outline-offset-4"
      style={{
        x,
        y,
        background: 'rgba(255,255,255,0.055)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14)',
      }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.85, ease, delay: 0.38 + index * 0.05 }}
    >
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(4,12,36,0.08) 0%, rgba(4,12,36,0.28) 42%, rgba(4,12,36,0.88) 100%)',
        }}
      />
      <div className="absolute inset-0 flex flex-col p-4 xl:p-5">
        <div className="relative z-10 flex min-h-[54px] flex-wrap content-start items-start gap-2">
          <span className="rounded-full border border-white/18 bg-white/[0.10] px-2.5 py-1.5 font-body text-[8.5px] tracking-[0.18em] uppercase text-white/66 backdrop-blur-md">
            {meta.eyebrow}
          </span>
          <span
            className="rounded-full px-2.5 py-1.5 font-body text-[8.5px] tracking-[0.15em] uppercase backdrop-blur-md"
            style={{ color: meta.accent, background: `${meta.accent}18`, border: `1px solid ${meta.accent}46` }}
          >
            {meta.cue}
          </span>
        </div>
        <div className="relative z-10 mt-auto pt-3">
          <h3 className="font-display font-bold text-white text-[clamp(1.18rem,1.55vw,1.55rem)] leading-[1.04]">
            {service.title}
          </h3>
          <p className="font-body text-[12px] leading-[1.52] text-white/70 mt-2.5 [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden">
            {service.description}
          </p>

          <ul className="mt-3 grid grid-cols-1 gap-y-1 border-t border-brand-light/20 pt-3">
            {treatments.map((treatment) => (
              <li key={treatment} className="flex items-start gap-2.5">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                  style={{ background: meta.accent }}
                />
                <span className="font-body text-[11px] leading-snug text-white/76">
                  {treatment}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  )
}

export default function Services() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="services"
      ref={ref}
      className="py-16 md:py-20 scroll-mt-28 relative overflow-hidden text-white bg-navy-dark"
    >
      <img
        src="/clinic-reception.jpeg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: 'center 45%',
          filter: 'saturate(1.02) contrast(1.01) brightness(0.96)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(4,12,36,0.68) 0%, rgba(7,19,58,0.46) 34%, rgba(7,19,58,0.16) 62%, rgba(4,12,36,0.50) 100%), linear-gradient(180deg, rgba(4,12,36,0.30) 0%, rgba(4,12,36,0.04) 46%, rgba(4,12,36,0.56) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 16%, rgba(75,150,232,0.16) 0%, transparent 26%), radial-gradient(circle at 78% 78%, rgba(120,224,212,0.10) 0%, transparent 24%)',
        }}
      />

      <div className="absolute right-6 top-12 hidden lg:block font-body text-[10px] tracking-[0.32em] uppercase text-white/28 [writing-mode:vertical-rl]">
        Services / Clinic
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-7 lg:gap-10 items-end mb-7 md:mb-8">
          <div>
            <motion.p
              className="text-[11px] font-body font-semibold tracking-[0.28em] uppercase text-brand-light/80 mb-4"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
            >
              Services
            </motion.p>
            <motion.h2
              className="font-display font-extrabold text-white text-[clamp(2.15rem,4.45vw,4.15rem)] leading-[0.96] max-w-[690px]"
              style={{ letterSpacing: '-0.03em' }}
              initial={{ opacity: 0, y: 30, filter: 'blur(14px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1.1, ease, delay: 0.08 }}
            >
              Comprehensive dental care, under one roof.
            </motion.h2>
            <motion.p
              className="text-white/68 font-body text-[14px] leading-[1.72] max-w-[530px] mt-4"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
            >
              At Sona Dental &amp; Maxillofacial Clinic, a multidisciplinary team brings together orthodontics,
              pediatric dentistry, endodontics, prosthodontics, periodontics and oral and maxillofacial surgery
              to create personalised treatment plans for patients of all ages.
            </motion.p>
          </div>

          <motion.div
            className="rounded-[24px] border border-brand-light/24 p-4 md:p-5 relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.09)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              boxShadow: '0 18px 60px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.16)',
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease, delay: 0.28 }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-80"
              style={{
                background:
                  'linear-gradient(135deg, rgba(75,150,232,0.18) 0%, transparent 46%), radial-gradient(circle at 88% 12%, rgba(255,255,255,0.12) 0%, transparent 26%)',
              }}
            />
            <p className="relative font-body text-[10px] tracking-[0.24em] uppercase text-brand-light/74 mb-4">
              Clinic-led planning
            </p>
            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3">
              {clinicSignals.map((signal, i) => (
                <motion.div
                  key={signal.label}
                  className="rounded-[16px] border border-white/14 bg-white/[0.07] px-4 py-3 min-h-[72px] sm:min-h-[80px] flex flex-col justify-between"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.75, ease, delay: 0.4 + i * 0.06 }}
                >
                  <span className="font-body text-[9px] tracking-[0.2em] uppercase text-white/38">
                    {signal.label}
                  </span>
                  <span className="font-display font-bold text-white text-[1.2rem] leading-none">
                    {signal.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="hidden lg:flex h-[350px] gap-3">
          {SERVICES.map((service, i) => {
            const meta = serviceMeta[service.id]
            const treatments = treatmentMap[service.id] ?? []

            return (
              <DesktopServiceCard
                key={service.id}
                service={service}
                meta={meta}
                treatments={treatments}
                index={i}
                inView={inView}
              />
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4 md:gap-5">
          {SERVICES.map((service, i) => {
            const meta = serviceMeta[service.id]
            const treatments = treatmentMap[service.id] ?? []

            return (
              <motion.article
                key={service.id}
                className="min-h-[350px] rounded-[22px] border border-brand-light/24 relative overflow-hidden group"
                style={{
                  background: 'rgba(255,255,255,0.065)',
                  backdropFilter: 'blur(9px)',
                  WebkitBackdropFilter: 'blur(9px)',
                  boxShadow: '0 16px 52px rgba(0,0,0,0.17), inset 0 1px 0 rgba(255,255,255,0.13)',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, ease, delay: 0.38 + i * 0.05 }}
              >
                <div className="relative h-32 md:h-36 overflow-hidden border-b border-brand-light/18 bg-navy-dark/40">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(5,15,42,0.02) 0%, rgba(5,15,42,0.30) 100%), linear-gradient(90deg, rgba(7,19,58,0.34) 0%, rgba(7,19,58,0.02) 62%)',
                    }}
                  />
                  <div className="absolute left-4 bottom-4 rounded-full border border-white/26 bg-white/15 px-3 py-1.5 font-body text-[9px] tracking-[0.2em] uppercase text-white/78 backdrop-blur-md">
                    {service.tagline}
                  </div>
                </div>

                <div className="relative flex flex-col gap-5 p-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="rounded-full border border-white/16 bg-white/[0.075] px-3 py-1.5 font-body text-[9px] tracking-[0.2em] uppercase text-white/56">
                        {meta.eyebrow}
                      </span>
                      <span
                        className="rounded-full px-3 py-1.5 font-body text-[9.5px] tracking-[0.15em] uppercase"
                        style={{ color: meta.accent, background: `${meta.accent}16`, border: `1px solid ${meta.accent}44` }}
                      >
                        {meta.cue}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-white text-[1.45rem] leading-[1.04]">
                      {service.title}
                    </h3>
                    <p className="font-body text-[13px] leading-[1.62] text-white/66 mt-3">
                      {service.description}
                    </p>
                  </div>

                  <ul className="grid grid-cols-1 gap-y-2 border-t border-brand-light/18 pt-4">
                    {treatments.map((treatment) => (
                      <li key={treatment} className="flex items-start gap-2.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                          style={{ background: meta.accent }}
                        />
                        <span className="font-body text-[12.5px] leading-snug text-white/72">
                          {treatment}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          className="mt-3 md:mt-4 rounded-[22px] border border-white/16 p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.105)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16)',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.76 }}
        >
          <div>
            <p className="font-body text-[10px] tracking-[0.24em] uppercase text-white/44 mb-1.5">
              Not sure where to begin?
            </p>
            <h3 className="font-display font-bold text-white text-[1.15rem] leading-snug">
              Start with a consultation and let the team plan precise, personalised care.
            </h3>
          </div>
          <a
            href="/appointment"
            className="inline-flex items-center justify-center gap-2 bg-white text-navy font-body font-semibold text-[13.5px] rounded-full px-6 py-3 w-fit hover:bg-brand-pale transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-light focus-visible:outline-offset-2 active:scale-[0.97]"
          >
            Request an appointment
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
