'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useLoadingReady } from './LoadingContext'
import { CLINIC, SERVICES, DOCTORS, TREATMENT_CATEGORIES } from '@/lib/clinicData'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredNav, setHoveredNav] = useState<number | null>(null)
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { ready } = useLoadingReady()
  const pathname = usePathname()

  function handleNavEnter(i: number) {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    setHoveredNav(i)
  }

  function handleNavLeave() {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setHoveredNav(null), 150)
  }
  const base = pathname.startsWith('/appointment') ? '/' : ''

  const accentMap: Record<string, string> = {
    general: '#2762C8',
    cosmetic: '#1E4080',
    implants: '#119C8D',
    surgery: '#1A3A6E',
    screening: '#4B96E8',
  }
  const doctorGradients = [
    'linear-gradient(135deg, #1a3a7e 0%, #0e2255 100%)',
    'linear-gradient(135deg, #1e4088 0%, #122860 100%)',
    'linear-gradient(135deg, #1c3c80 0%, #102358 100%)',
  ]

  const navLinks = [
    {
      label: 'About Us',
      href: `${base}#about`,
      kind: 'about' as const,
      feature: {
        eyebrow: 'Our story',
        stat: `Est. ${CLINIC.established}`,
        text: 'Serving generations with compassionate dental care since 1994.',
        cta: 'Read our story',
      },
      items: [
        { title: 'Generations of smiles', detail: 'One trusted dental team', icon: 'clock' as const },
        { title: 'Since 1994', detail: 'Compassionate dental care', icon: 'heart' as const },
        { title: 'Multidisciplinary team', detail: 'Family, specialist & surgical care', icon: 'users' as const },
      ],
    },
    {
      label: 'Services',
      href: `${base}#services`,
      kind: 'services' as const,
      feature: {
        eyebrow: 'What we offer',
        stat: '05',
        text: 'Comprehensive care across orthodontics, endodontics, prosthodontics, periodontics and oral surgery.',
        cta: 'View all services',
      },
      items: SERVICES.map((s, idx) => ({
        title: s.title,
        detail: s.tagline,
        number: String(idx + 1).padStart(2, '0'),
        color: accentMap[s.id],
      })),
    },
    {
      label: 'Specialists',
      href: `${base}#specialists`,
      kind: 'specialists' as const,
      feature: {
        eyebrow: 'Our team',
        stat: '03',
        text: 'Experienced dentists and modern oral surgical expertise under one roof.',
        cta: 'Meet the team',
      },
      items: DOCTORS.map((d, idx) => ({ title: d.name, detail: d.specialty, initials: d.initials, gradient: doctorGradients[idx] })),
    },
    {
      label: 'Treatments',
      href: `${base}#treatments`,
      kind: 'treatments' as const,
      feature: {
        eyebrow: 'Treatment map',
        stat: '+',
        text: 'Every concern mapped to a clear, guided treatment route.',
        cta: 'Explore treatments',
      },
      items: TREATMENT_CATEGORIES.map((c, idx) => ({
        title: c.label,
        detail: c.treatments.slice(0, 2).join(', '),
        number: String(idx + 1).padStart(2, '0'),
        color: accentMap[c.id],
      })),
    },
  ]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <motion.header
        className="fixed top-4 md:top-5 xl:top-7 left-0 right-0 z-50 px-4 md:px-5 xl:px-7"
        initial={{ opacity: 0, filter: 'blur(12px)', y: -8 }}
        animate={ready ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: 0, filter: 'blur(12px)', y: -8 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <motion.div
          className="relative max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10"
          animate={{ paddingTop: scrolled ? '12px' : '20px', paddingBottom: scrolled ? '12px' : '20px' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Scrolled backdrop — opacity-only crossfade so the blur radius itself never animates */}
          <motion.div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background: 'rgba(255,255,255,1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 4px 24px rgba(26,58,110,0.08), 0 1px 0 rgba(26,58,110,0.05)',
            }}
            initial={false}
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group" aria-label="Sona Dental home">
            <img
              src="/transparent_logo.png"
              alt="Sona Dental logo"
              className="w-10 h-10 shrink-0 object-contain"
            />
            <div>
              <span
                className="font-display font-bold text-navy leading-none text-[15px] block group-hover:text-brand-blue transition-colors duration-300"
                style={{ letterSpacing: '-0.01em' }}
              >
                Sona Dental
              </span>
              <span className="text-[10px] text-navy/50 font-body tracking-wider leading-none">
                &amp; Maxillofacial Clinic
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation" onMouseLeave={handleNavLeave}>
            {navLinks.map((link, i) => (
              <div
                key={link.label}
                className="relative isolate"
                onMouseEnter={() => handleNavEnter(i)}
              >
                <a
                  href={link.href}
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-body font-medium text-navy/70 hover:text-navy transition-colors duration-300 relative group"
                >
                  {link.label}
                  <svg
                    width="9" height="9" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className={`transition-transform duration-300 ${hoveredNav === i ? 'rotate-180' : ''}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-blue group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </a>

                <AnimatePresence>
                  {hoveredNav === i && (
                    <motion.div
                      className={`absolute top-full pt-3 w-[420px] z-50 ${i <= 1 ? 'left-0' : 'right-0'}`}
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
                      exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0 } }}
                      style={{ transformOrigin: 'top center', pointerEvents: 'none' }}
                    >
                      <div
                        className="rounded-[22px] grid grid-cols-[148px_1fr] overflow-hidden"
                        style={{ boxShadow: '0 28px 70px rgba(26,58,110,0.20), 0 6px 18px rgba(26,58,110,0.08)', transform: 'translateZ(0)', pointerEvents: 'auto' }}
                      >
                        {/* Feature panel */}
                        <div
                          className="relative p-5 flex flex-col justify-between overflow-hidden"
                          style={{ background: 'linear-gradient(160deg, #1A3A6E 0%, #0C1F4D 100%)' }}
                        >
                          <div
                            className="absolute -right-4 -bottom-6 font-display font-extrabold text-[5rem] leading-none text-white/[0.06] select-none"
                            aria-hidden="true"
                          >
                            {link.feature.stat}
                          </div>
                          <div className="relative z-10">
                            <p className="font-body text-[9.5px] font-semibold tracking-[0.2em] uppercase text-brand-light/70 mb-2.5">
                              {link.feature.eyebrow}
                            </p>
                            <p className="font-display font-extrabold text-white text-[1.6rem] leading-none">
                              {link.feature.stat}
                            </p>
                            <p className="font-body text-white/55 text-[11px] leading-[1.55] mt-3 max-w-[150px]">
                              {link.feature.text}
                            </p>
                          </div>
                          <a
                            href={link.href}
                            className="relative z-10 inline-flex items-center gap-1 text-white text-[10.5px] font-body font-semibold mt-4 group/cta"
                          >
                            {link.feature.cta}
                            <svg
                              width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                              strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                              className="transition-transform duration-300 group-hover/cta:translate-x-1"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </a>
                        </div>

                        {/* Items list */}
                        <div className="p-2.5 flex flex-col gap-0.5 bg-white">
                          {link.items.map((item: any, idx) => (
                            <motion.a
                              key={item.title}
                              href={link.href}
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-brand-pale transition-colors duration-200 group/item"
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.04 + idx * 0.045 }}
                            >
                              {link.kind === 'about' && (
                                <span className="w-8 h-8 rounded-full bg-brand-pale flex items-center justify-center shrink-0">
                                  {item.icon === 'clock' && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2762C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
                                    </svg>
                                  )}
                                  {item.icon === 'heart' && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2762C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                                    </svg>
                                  )}
                                  {item.icon === 'users' && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2762C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                  )}
                                </span>
                              )}
                              {link.kind === 'specialists' && (
                                <span
                                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white text-[10px] font-bold font-display"
                                  style={{ background: item.gradient }}
                                >
                                  {item.initials}
                                </span>
                              )}
                              {(link.kind === 'services' || link.kind === 'treatments') && (
                                <span
                                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[10.5px] font-bold font-display border"
                                  style={{ borderColor: `${item.color}55`, color: item.color, background: `${item.color}14` }}
                                >
                                  {item.number}
                                </span>
                              )}
                              <span className="flex flex-col min-w-0">
                                <span className="font-display font-bold text-navy text-[12.5px] leading-snug truncate">{item.title}</span>
                                <span className="font-body text-navy/45 text-[10.5px] leading-snug truncate">{item.detail}</span>
                              </span>
                              <svg
                                width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                                strokeLinecap="round" strokeLinejoin="round"
                                className="ml-auto shrink-0 text-brand-blue opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-250"
                              >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Book Now CTA */}
          <div className="flex items-center gap-3">
            <a
              href="/appointment"
              className="hidden lg:inline-flex items-center gap-2 text-[13.5px] font-body font-semibold text-navy border border-navy/20 rounded-full px-5 py-2 hover:bg-navy hover:text-white hover:border-navy transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              Consult Now
            </a>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-[5px] p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-px bg-navy rounded-full origin-center"
                transition={{ duration: 0.3 }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-px bg-navy rounded-full"
                transition={{ duration: 0.3 }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-px bg-navy rounded-full origin-center"
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-24 pb-10 px-8"
            style={{ background: 'rgba(10, 24, 64, 0.97)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 36px) 36px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 36px) 36px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 36px) 36px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col gap-6">
              {[...navLinks, { label: 'Consult Now', href: '/appointment' }].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display font-bold text-3xl text-white/90 hover:text-brand-light transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto text-white/30 text-sm font-body">
              Est. 1994 · Shahdara, Delhi
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
