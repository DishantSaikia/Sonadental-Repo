'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { CLINIC, HOURS } from '@/lib/clinicData'

const ease = [0.22, 1, 0.36, 1] as const

const contactMethods = [
  {
    label: 'Call',
    value: CLINIC.phones[0],
    href: `tel:${CLINIC.phonesRaw[0]}`,
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
    ),
  },
  {
    label: 'Alternate',
    value: CLINIC.phones[1],
    href: `tel:${CLINIC.phonesRaw[1]}`,
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
    ),
  },
  {
    label: 'Email',
    value: CLINIC.email,
    href: `mailto:${CLINIC.email}`,
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 5L2 7" />
      </>
    ),
  },
] as const

const visitSteps = [
  { label: '01', title: 'Choose your route', detail: 'Call, book online, or open directions.' },
  { label: '02', title: 'Reach Shahdara', detail: 'Use the clinic address for navigation.' },
  { label: '03', title: 'Confirm your slot', detail: 'Prior appointment is preferred.' },
] as const

const clinicPhotos = [
  {
    src: '/clinic-reception.jpeg',
    alt: 'Sona Dental reception and waiting area',
    title: 'A calm welcome before every visit',
    detail: 'Reception lounge, Rama Block',
    objectPosition: 'center',
  },
  {
    src: '/clinic-operatory-yellow.jpeg',
    alt: 'Sona Dental operatory with dental chair and imaging screens',
    title: 'Digital diagnostics, close at hand',
    detail: 'Treatment suite with RVG support',
    objectPosition: 'center',
  },
  {
    src: '/clinic-interior-wide.jpeg',
    alt: 'Sona Dental consultation room and treatment chair',
    title: 'Chairside care in a refined setup',
    detail: 'Consultation and treatment suite',
    objectPosition: 'center',
  },
  {
    src: '/clinic-interior-chair.jpeg',
    alt: 'Sona Dental consultation desk and treatment room',
    title: 'Consultation and care, together',
    detail: 'Doctor desk and operatory view',
    objectPosition: 'center',
  },
] as const

function IconFrame({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-10 h-10 rounded-full border border-brand-blue/20 bg-brand-pale flex items-center justify-center shrink-0 text-brand-blue">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </span>
  )
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = window.setInterval(() => {
      setActivePhotoIndex((current) => (current + 1) % clinicPhotos.length)
    }, 4800)

    return () => window.clearInterval(interval)
  }, [inView])

  const activeClinicPhoto = clinicPhotos[activePhotoIndex] ?? clinicPhotos[0]
  const showPreviousPhoto = () => {
    setActivePhotoIndex((current) => (current - 1 + clinicPhotos.length) % clinicPhotos.length)
  }
  const showNextPhoto = () => {
    setActivePhotoIndex((current) => (current + 1) % clinicPhotos.length)
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 md:py-36 relative overflow-hidden text-navy"
      style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f7fbff 48%, #ffffff 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.46]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(39,98,200,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(39,98,200,0.08) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 78% 28%, rgba(75,150,232,0.18) 0%, transparent 30%), radial-gradient(circle at 18% 85%, rgba(120,224,212,0.12) 0%, transparent 24%), linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.70) 44%, rgba(235,244,255,0.58) 100%)',
        }}
      />

      <div className="absolute right-6 top-12 hidden lg:block font-body text-[10px] tracking-[0.32em] uppercase text-navy/25 [writing-mode:vertical-rl]">
        Visit / Book
      </div>
      <div
        className="absolute -right-8 bottom-0 hidden md:block font-display font-extrabold text-[15vw] leading-none text-navy/[0.035] select-none"
        aria-hidden="true"
      >
        VISIT
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start">
          <motion.div
            className="lg:pt-6"
            initial={{ opacity: 0, y: 34 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.05, ease }}
          >
            <p className="text-[11px] font-body font-semibold tracking-[0.28em] uppercase text-brand-blue mb-4">
              Contact
            </p>
            <h2
              className="font-display font-extrabold text-navy text-[clamp(2.5rem,5.6vw,5.4rem)] leading-[0.96] max-w-[680px]"
              style={{ letterSpacing: '-0.03em' }}
            >
              Plan your visit without the back-and-forth.
            </h2>
            <p className="text-navy/56 font-body text-[15px] leading-[1.82] max-w-[500px] mt-6">
              Call the clinic, open directions, or request an appointment online. We will confirm your preferred slot before the visit.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <motion.a
                href="/appointment"
                className="inline-flex items-center justify-center gap-2 bg-brand-blue text-white font-body font-semibold text-[13.5px] rounded-full px-6 py-3.5 hover:bg-[#1d52b0] shadow-blue transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-light active:scale-[0.97]"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                Book online
              </motion.a>
              <motion.a
                href={CLINIC.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-navy/16 bg-white/80 text-navy font-body font-semibold text-[13.5px] rounded-full px-6 py-3.5 hover:bg-brand-pale transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue active:scale-[0.97]"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Open directions
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-[28px] border border-navy/10 p-5 md:p-7 overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.72)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              boxShadow: '0 22px 70px rgba(26,58,110,0.10), inset 0 1px 0 rgba(255,255,255,0.90)',
            }}
            initial={{ opacity: 0, y: 34 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.05, ease, delay: 0.16 }}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 relative">
              <div className="max-w-[470px]">
                <p className="font-body text-[10px] tracking-[0.24em] uppercase text-brand-blue/70 mb-3">
                  Shahdara / Delhi
                </p>
                <h3 className="font-display font-bold text-navy text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.06]">
                  {CLINIC.name}
                </h3>
                <p className="text-navy/60 font-body text-[13.5px] leading-[1.78] mt-4">
                  {CLINIC.address}
                </p>
              </div>
              <div className="rounded-full border border-brand-blue/20 bg-brand-pale px-4 py-2 text-brand-blue font-body text-[11px] tracking-[0.18em] uppercase w-fit">
                Est. {CLINIC.established}
              </div>
            </div>

            <div className="relative h-[300px] md:h-[360px] mt-8 rounded-[22px] border border-navy/10 overflow-hidden bg-brand-pale/55">
              <AnimatePresence initial={false}>
                <motion.img
                  key={activeClinicPhoto.src}
                  src={activeClinicPhoto.src}
                  alt={activeClinicPhoto.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    objectPosition: activeClinicPhoto.objectPosition,
                    filter: 'saturate(0.86) contrast(1.04) brightness(0.96)',
                  }}
                  initial={{ opacity: 0, scale: 1.035 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.015 }}
                  transition={{ duration: 0.75, ease }}
                />
              </AnimatePresence>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(12,36,90,0.06) 40%, rgba(8,24,62,0.60) 100%), linear-gradient(90deg, rgba(39,98,200,0.24) 0%, rgba(255,255,255,0.02) 58%)',
                }}
              />

              <div className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/78 px-4 py-2 text-brand-blue font-body text-[10px] tracking-[0.2em] uppercase backdrop-blur-md">
                Inside the clinic
              </div>

              <div className="absolute right-4 top-4 flex gap-2">
                <motion.button
                  type="button"
                  aria-label="Previous clinic photo"
                  onClick={showPreviousPhoto}
                  className="w-9 h-9 rounded-full border border-white/45 bg-white/75 text-navy flex items-center justify-center backdrop-blur-md hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-light focus-visible:outline-offset-2 active:scale-[0.96] transition-colors duration-300"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </motion.button>
                <motion.button
                  type="button"
                  aria-label="Next clinic photo"
                  onClick={showNextPhoto}
                  className="w-9 h-9 rounded-full border border-white/45 bg-white/75 text-navy flex items-center justify-center backdrop-blur-md hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-light focus-visible:outline-offset-2 active:scale-[0.96] transition-colors duration-300"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </motion.button>
              </div>

              <div className="absolute left-4 right-4 bottom-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <p className="hidden sm:block font-body text-[10px] tracking-[0.24em] uppercase text-white/62 mb-1">
                    Sona Dental
                  </p>
                  <p className="font-display font-bold text-white text-[1.15rem] md:text-[1.35rem] leading-tight">
                    {activeClinicPhoto.title}
                  </p>
                  <p className="hidden sm:block font-body text-white/68 text-[12.5px] mt-1">{activeClinicPhoto.detail}</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/28 bg-white/18 px-3 py-2 backdrop-blur-md w-fit">
                  {clinicPhotos.map((photo, index) => (
                    <button
                      key={photo.src}
                      type="button"
                      aria-label={`Show clinic photo ${index + 1}`}
                      aria-current={index === activePhotoIndex}
                      onClick={() => setActivePhotoIndex(index)}
                      className={`h-1.5 rounded-full transition-[width,background-color,opacity] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-light focus-visible:outline-offset-2 ${
                        index === activePhotoIndex ? 'w-7 bg-white opacity-100' : 'w-1.5 bg-white/70 opacity-75 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 mt-5">
          <motion.div
            className="lg:col-span-4 rounded-[24px] border border-navy/10 p-6 md:p-7 relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.72)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 18px 60px rgba(26,58,110,0.08), inset 0 1px 0 rgba(255,255,255,0.90)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, ease, delay: 0.3 }}
          >
            <p className="font-body text-[10px] tracking-[0.24em] uppercase text-navy/38 mb-5">Clinic hours</p>
            <div className="flex flex-col gap-4">
              {HOURS.map((h) => (
                <div key={h.day} className="border-b border-navy/10 pb-4 last:border-b-0 last:pb-0">
                  <p className="font-display font-bold text-navy text-[1rem]">{h.day}</p>
                  <p className="font-body text-[13px] leading-[1.65] text-navy/58 mt-1">
                    {h.morning}
                    <br />
                    {h.evening !== 'Closed' ? h.evening : <span className="text-brand-blue/70">Evening closed</span>}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 rounded-[24px] border border-navy/10 p-6 md:p-7 relative overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.72)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 18px 60px rgba(26,58,110,0.08), inset 0 1px 0 rgba(255,255,255,0.90)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, ease, delay: 0.4 }}
          >
            <p className="font-body text-[10px] tracking-[0.24em] uppercase text-navy/38 mb-5">Direct contact</p>
            <div className="flex flex-col gap-3">
              {contactMethods.map((item) => (
                <a key={item.label} href={item.href} className="group flex items-center gap-4 rounded-[17px] border border-navy/8 bg-white/70 px-4 py-3 hover:bg-brand-pale/70 transition-colors duration-300">
                  <IconFrame>{item.icon}</IconFrame>
                  <span className="min-w-0">
                    <span className="block font-body text-[10px] tracking-[0.18em] uppercase text-navy/35">{item.label}</span>
                    <span className="block font-body text-[13.5px] leading-snug text-navy/72 group-hover:text-navy transition-colors duration-300 break-words">{item.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3 rounded-[24px] border border-navy/10 p-6 md:p-7 relative overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.84) 0%, rgba(235,244,255,0.62) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 18px 60px rgba(26,58,110,0.08), inset 0 1px 0 rgba(255,255,255,0.90)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.95, ease, delay: 0.5 }}
          >
            <div className="absolute right-5 bottom-3 font-display font-extrabold text-[4.2rem] leading-none text-brand-blue/[0.12]" aria-hidden="true">
              +
            </div>
            <p className="font-body text-[10px] tracking-[0.24em] uppercase text-navy/38 mb-5">Visit rhythm</p>
            <div className="flex flex-col gap-4">
              {visitSteps.map((step) => (
                <div key={step.label} className="flex gap-3">
                  <span className="font-display font-extrabold text-brand-blue/70 text-[1rem] leading-none pt-1">{step.label}</span>
                  <span>
                    <span className="block font-display font-bold text-navy text-[14px] leading-snug">{step.title}</span>
                    <span className="block font-body text-[12.5px] leading-[1.55] text-navy/50 mt-1">{step.detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
