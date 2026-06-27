'use client'

import { CLINIC } from '@/lib/clinicData'

const navLinks = [
  { label: 'About us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Specialists', href: '#specialists' },
  { label: 'Treatments', href: '#treatments' },
]

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #0a1e50 0%, #132660 50%, #0d1f50 100%)',
      }}
    >
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 py-16 md:py-20">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 md:gap-8 border-b border-white/10 pb-12 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div>
                <span className="font-display font-bold text-white text-[15px] block">Sona Dental</span>
                <span className="font-display font-bold text-white text-[15px] block">&amp; Maxillofacial</span>
              </div>
            </div>
            <p className="text-white/40 font-body text-[13px] leading-[1.7] max-w-[260px]">
              Thoughtful dental and maxillofacial care for families across Shahdara and Delhi since 1994.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-white/30 text-[10.5px] font-body tracking-[0.18em] uppercase mb-4">Navigation</p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/55 hover:text-white font-body text-[13.5px] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/30 text-[10.5px] font-body tracking-[0.18em] uppercase mb-4">Contact Us</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href={`tel:${CLINIC.phonesRaw[0]}`} className="text-white/55 hover:text-white font-body text-[13.5px] transition-colors duration-300">
                  {CLINIC.phones[0]}
                </a>
              </li>
              <li>
                <a href={`tel:${CLINIC.phonesRaw[1]}`} className="text-white/55 hover:text-white font-body text-[13.5px] transition-colors duration-300">
                  {CLINIC.phones[1]}
                </a>
              </li>
              <li>
                <a href={`mailto:${CLINIC.email}`} className="text-white/55 hover:text-white font-body text-[13.5px] transition-colors duration-300">
                  {CLINIC.email}
                </a>
              </li>
              <li className="text-white/55 font-body text-[13.5px]">Shahdara, Delhi</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <p className="text-white/30 text-[10.5px] font-body tracking-[0.18em] uppercase mb-4">Visit Hours</p>
            <ul className="flex flex-col gap-3">
              <li className="flex flex-col">
                <span className="text-white/70 font-body text-[13px] font-medium">Mon–Sat</span>
                <span className="text-white/40 font-body text-[12.5px]">10:00 AM – 1:30 PM</span>
                <span className="text-white/40 font-body text-[12.5px]">6:00 PM – 9:30 PM</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white/70 font-body text-[13px] font-medium">Sunday</span>
                <span className="text-white/40 font-body text-[12.5px]">10:00 AM – 1:30 PM</span>
                <span className="text-white/40 font-body text-[12.5px]">Evening closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-white/25 font-body text-[12px]">
            &copy; {new Date().getFullYear()} Sona Dental &amp; Maxillofacial Clinic. All rights reserved.
          </p>
          <p className="text-white/20 font-body text-[11px]">
            Prior appointment preferred
          </p>
        </div>
      </div>
    </footer>
  )
}
