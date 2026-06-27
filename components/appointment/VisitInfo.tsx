'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { CLINIC, HOURS } from '@/lib/clinicData'

const ease = [0.22, 1, 0.36, 1] as const

const cleanAddress = '4/1724-A, Rama Block, Bhola Nath Nagar, Shahdara, Delhi - 110032'
const MAP_SRC =
  'https://maps.google.com/maps?q=Sona+Dental+Maxillofacial+Clinic+Bhola+Nath+Nagar+Shahdara+Delhi+110032&output=embed&z=16'

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

const actionCards = [
  {
    label: 'Call',
    value: CLINIC.phones[0],
    href: `tel:${CLINIC.phonesRaw[0]}`,
    external: false,
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.4a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
    ),
  },
  {
    label: 'Email',
    value: CLINIC.email,
    href: `mailto:${CLINIC.email}`,
    external: false,
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 5L2 7" />
      </>
    ),
  },
  {
    label: 'Directions',
    value: 'Open map',
    href: CLINIC.mapsUrl,
    external: true,
    icon: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
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

export default function VisitInfo() {
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
            'radial-gradient(circle at 78% 28%, rgba(75,150,232,0.16) 0%, transparent 30%), radial-gradient(circle at 18% 85%, rgba(120,224,212,0.10) 0%, transparent 24%), linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.72) 44%, rgba(235,244,255,0.58) 100%)',
        }}
      />
      <div className="absolute right-6 top-12 hidden lg:block font-body text-[10px] tracking-[0.32em] uppercase text-navy/25 [writing-mode:vertical-rl]">
        Visit / Details
      </div>
      <div
        className="absolute -right-8 bottom-0 hidden md:block font-display font-extrabold text-[15vw] leading-none text-navy/[0.035] select-none"
        aria-hidden="true"
      >
        VISIT
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-18 items-start">
          <motion.div
            className="relative rounded-[30px] border border-navy/10 p-4 md:p-5 overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.74)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              boxShadow: '0 24px 80px rgba(26,58,110,0.12), inset 0 1px 0 rgba(255,255,255,0.92)',
            }}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.05, ease }}
          >
            <div className="relative h-[520px] rounded-[24px] overflow-hidden bg-navy-dark">
              <AnimatePresence initial={false}>
                <motion.img
                  key={activeClinicPhoto.src}
                  src={activeClinicPhoto.src}
                  alt={activeClinicPhoto.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    objectPosition: activeClinicPhoto.objectPosition,
                    filter: 'saturate(1.02) contrast(1.02) brightness(0.98)',
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
                    'linear-gradient(90deg, rgba(4,12,36,0.58) 0%, rgba(4,12,36,0.16) 48%, rgba(4,12,36,0.30) 100%), linear-gradient(180deg, rgba(4,12,36,0.08) 0%, rgba(4,12,36,0.12) 52%, rgba(4,12,36,0.82) 100%)',
                }}
              />
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-3">
                <span
                  className="rounded-full border border-white/22 bg-white/14 px-3.5 py-2 font-body text-[9px] tracking-[0.24em] uppercase backdrop-blur-md"
                  style={{ color: 'rgba(255,255,255,0.76)' }}
                >
                  Inside the clinic
                </span>
                <div className="flex gap-2">
                  <motion.button
                    type="button"
                    aria-label="Previous clinic photo"
                    onClick={showPreviousPhoto}
                    className="w-9 h-9 rounded-full border border-white/28 bg-white/16 flex items-center justify-center backdrop-blur-md hover:bg-white/24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-light focus-visible:outline-offset-2 active:scale-[0.96] transition-colors duration-300"
                    style={{ color: 'rgba(255,255,255,0.86)' }}
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
                    className="w-9 h-9 rounded-full border border-white/28 bg-white/16 flex items-center justify-center backdrop-blur-md hover:bg-white/24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-light focus-visible:outline-offset-2 active:scale-[0.96] transition-colors duration-300"
                    style={{ color: 'rgba(255,255,255,0.86)' }}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </motion.button>
                </div>
              </div>
              <div className="absolute left-5 right-5 bottom-5">
                <div
                  className="rounded-[24px] border border-white/16 bg-white/[0.12] p-5 md:p-6 backdrop-blur-[16px]"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16)' }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                      <p className="font-body text-[10px] tracking-[0.24em] uppercase mb-3" style={{ color: 'rgba(187,220,255,0.82)' }}>
                        Your visit
                      </p>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeClinicPhoto.src}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.35, ease }}
                        >
                          <h2 className="font-display font-extrabold text-white text-[clamp(1.45rem,2.8vw,2.55rem)] leading-[1.03] max-w-[560px]">
                            {activeClinicPhoto.title}
                          </h2>
                          <p
                            className="font-body text-[13.5px] leading-[1.72] mt-3 max-w-[520px]"
                            style={{ color: 'rgba(255,255,255,0.66)' }}
                          >
                            {activeClinicPhoto.detail}
                          </p>
                        </motion.div>
                      </AnimatePresence>
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
              </div>
            </div>
          </motion.div>

          <div className="lg:pt-5">
            <motion.p
              className="text-[11px] font-body font-semibold tracking-[0.28em] uppercase text-brand-blue mb-4"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
            >
              Visit details
            </motion.p>
            <motion.h2
              className="font-display font-extrabold text-navy text-[clamp(2.25rem,4.8vw,4.25rem)] leading-[0.98] max-w-[620px]"
              style={{ letterSpacing: '-0.03em' }}
              initial={{ opacity: 0, y: 26, filter: 'blur(12px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1.05, ease, delay: 0.08 }}
            >
              Everything ready before you arrive.
            </motion.h2>
            <motion.p
              className="text-navy/56 font-body text-[15px] leading-[1.82] max-w-[540px] mt-5"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease, delay: 0.18 }}
            >
              The clinic is located in Rama Block, Bhola Nath Nagar, Shahdara. Prior appointment is preferred so the team can plan your visit properly.
            </motion.p>

            <motion.div
              className="mt-8 rounded-[24px] border border-navy/10 p-5 md:p-6 overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.82)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                boxShadow: '0 20px 60px rgba(26,58,110,0.09), inset 0 1px 0 rgba(255,255,255,0.92)',
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.95, ease, delay: 0.28 }}
            >
              <p className="font-body text-[10px] tracking-[0.24em] uppercase text-brand-blue/72 mb-4">
                Clinic hours
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HOURS.map((h) => (
                  <div key={h.day} className="rounded-[18px] border border-navy/10 bg-white/72 px-4 py-4">
                    <p className="font-body text-[10px] tracking-[0.18em] uppercase text-navy/38">{h.day}</p>
                    <p className="font-display font-bold text-navy text-[1.2rem] leading-tight mt-2">{h.morning}</p>
                    <p className="font-body text-[12px] text-brand-blue mt-1">
                      {h.evening === 'Closed' ? 'Evening closed' : h.evening}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {actionCards.map((card, i) => (
                <motion.a
                  key={card.label}
                  href={card.href}
                  target={card.external ? '_blank' : undefined}
                  rel={card.external ? 'noopener noreferrer' : undefined}
                  className="rounded-[20px] border border-navy/10 bg-white/78 p-4 flex flex-col gap-3 hover:bg-brand-pale transition-colors duration-300"
                  style={{ boxShadow: '0 12px 36px rgba(26,58,110,0.06)' }}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, ease, delay: 0.38 + i * 0.06 }}
                >
                  <IconFrame>{card.icon}</IconFrame>
                  <span>
                    <span className="block font-body text-[10px] tracking-[0.18em] uppercase text-navy/38">{card.label}</span>
                    <span className="block font-display font-bold text-navy text-[13.5px] leading-snug mt-1">{card.value}</span>
                  </span>
                </motion.a>
              ))}
            </div>

            <motion.div
              className="mt-4 rounded-[24px] border border-navy/10 overflow-hidden bg-white/82"
              style={{
                boxShadow: '0 20px 60px rgba(26,58,110,0.10), inset 0 1px 0 rgba(255,255,255,0.92)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
              }}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease, delay: 0.56 }}
            >
              <div className="h-[210px] relative overflow-hidden bg-brand-pale">
                <iframe
                  src={MAP_SRC}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block', filter: 'grayscale(0.2) brightness(0.96) contrast(1.04)' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sona Dental & Maxillofacial Clinic location"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'rgba(20,48,98,0.30)', mixBlendMode: 'color' }}
                />
              </div>
              <div className="p-5 flex items-start gap-4">
                <IconFrame>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </IconFrame>
                <div>
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-navy/38">Location</p>
                  <a
                    href={CLINIC.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-body text-[13.5px] leading-[1.55] text-navy/72 hover:text-brand-blue transition-colors duration-300 mt-1"
                  >
                    {cleanAddress}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
