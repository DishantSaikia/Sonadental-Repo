'use client'

import { useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// ─── Data ──────────────────────────────────────────────────────────────────
const services = [
  { id: 'consult', label: 'General Consultation', sub: 'Check-up & general advice', img: '/transparent_logo_smoked.png' },
  { id: 'general', label: 'General & Restorative', sub: 'Fillings, RCT, scaling', img: '/aesthetic_dentistry.png' },
  { id: 'cosmetic', label: 'Cosmetic & Orthodontic', sub: 'Whitening, braces, aligners', img: '/orthodontics.png' },
  { id: 'implants', label: 'Implants & Replacement', sub: 'Implants, dentures, crowns', img: '/implantology.png' },
  { id: 'surgery', label: 'Oral & Maxillofacial Surgery', sub: 'Wisdom teeth, jaw surgery', img: '/surgical_dentistry.png' },
  { id: 'screening', label: 'Oral Screening & Jaw Care', sub: 'Cancer screening, TMJ', img: '/teeth_whitening.png' },
]

const morningSlots = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM']
const eveningSlots = ['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM']

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

interface Day {
  key: string
  dow: number
  dayName: string
  date: number
  month: string
}

function buildDays(count: number): Day[] {
  const out: Day[] = []
  const d = new Date()
  d.setDate(d.getDate() + 1)
  while (out.length < count) {
    const dow = d.getDay()
    out.push({
      key: d.toISOString().slice(0, 10),
      dow,
      dayName: DAY_NAMES[dow],
      date: d.getDate(),
      month: MONTHS[d.getMonth()],
    })
    d.setDate(d.getDate() + 1)
  }
  return out
}

const stepLabels = ['Treatment', 'Date & time', 'Your details']

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 46 : -46 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -46 : 46 }),
}

function SlotGroup({ label, slots, selected, onSelect }: {
  label: string
  slots: string[]
  selected: string | null
  onSelect: (t: string) => void
}) {
  return (
    <div>
      <p className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/40 mb-2.5">{label}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
        {slots.map((t) => {
          const sel = selected === t
          return (
            <motion.button
              key={t}
              onClick={() => onSelect(t)}
              className="rounded-xl py-3 font-body font-semibold text-[13px]"
              style={{
                border: `1.5px solid ${sel ? '#2762C8' : 'rgba(26,58,110,0.1)'}`,
                backgroundColor: sel ? 'rgba(39,98,200,0.06)' : '#ffffff',
                color: sel ? '#2762C8' : 'rgba(26,58,110,0.75)',
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.28, ease }}
            >
              {t}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default function BookingFlow() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const days = useMemo(() => buildDays(14), [])

  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [service, setService] = useState<string | null>(null)
  const [day, setDay] = useState<string | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const selectedDay = days.find((d) => d.key === day)
  const isSunday = selectedDay?.dow === 0
  const selectedService = services.find((s) => s.id === service)

  const canContinue = step === 0 ? !!service : step === 1 ? !!day && !!time : false
  const canSubmit = form.name.trim() && form.phone.trim()

  async function handleSubmit() {
    if (!canSubmit || sending) return
    setSending(true)
    setSubmitError(false)
    try {
      await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          notes: form.notes,
          service: selectedService?.label ?? service,
          date: selectedDay ? `${selectedDay.dayName}, ${selectedDay.month} ${selectedDay.date}` : day,
          time,
        }),
      })
      setSubmitted(true)
    } catch {
      setSubmitError(true)
    } finally {
      setSending(false)
    }
  }

  const go = (next: number) => {
    setDir(next > step ? 1 : -1)
    setStep(next)
  }

  const inputClass =
    'w-full bg-transparent border-b border-navy/15 py-3 text-navy font-body text-[14.5px] placeholder:text-navy/35 focus:outline-none focus:border-brand-blue transition-colors duration-300'

  return (
    <section id="book" ref={ref} className="py-20 md:py-24 relative overflow-hidden text-white bg-navy-dark scroll-mt-24">
      <img
        src="/clinic-interior-wide.jpeg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: 'center 46%',
          filter: 'saturate(1.02) contrast(1.02) brightness(0.94)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(4,12,36,0.78) 0%, rgba(7,19,58,0.58) 36%, rgba(7,19,58,0.28) 66%, rgba(4,12,36,0.62) 100%), linear-gradient(180deg, rgba(4,12,36,0.36) 0%, rgba(4,12,36,0.10) 46%, rgba(4,12,36,0.68) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          opacity: 0.12,
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

      <div className="absolute right-6 top-12 hidden lg:block font-body text-[10px] tracking-[0.32em] uppercase text-white/30 [writing-mode:vertical-rl]">
        Booking / Request
      </div>

      <div className="max-w-[1180px] mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_0.85fr] gap-7 lg:gap-10 items-end mb-8 md:mb-10">
          <div>
          <motion.p
            className="text-[11px] font-body font-semibold tracking-[0.28em] uppercase text-brand-light/80 mb-4"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            Appointment
          </motion.p>
          <motion.h2
            className="font-display font-extrabold text-white text-[clamp(2.25rem,4.7vw,4.3rem)] leading-[0.96] max-w-[760px]"
            style={{ letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.1, ease, delay: 0.1 }}
          >
            Request an appointment, without losing the calm.
          </motion.h2>
          <motion.p
            className="text-white/68 font-body text-[14px] leading-[1.72] max-w-[560px] mt-4"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
          >
            Select your preferred treatment and time. Our team will call to confirm your slot.
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
              How it works
            </p>
            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                ['01', 'Choose care'],
                ['02', 'Pick time'],
                ['03', 'We confirm'],
              ].map(([number, label]) => (
                <div
                  key={number}
                  className="rounded-[16px] border border-white/14 bg-white/[0.07] px-4 py-3 min-h-[72px] flex flex-col justify-between"
                >
                  <span className="font-body text-[9px] tracking-[0.2em] uppercase text-white/38">{number}</span>
                  <span className="font-display font-bold text-white text-[1.08rem] leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Card */}
        <motion.div
          className="relative rounded-[28px] overflow-hidden"
          style={{
            border: '1px solid rgba(187,220,255,0.26)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(243,248,255,0.94) 100%)',
            boxShadow: '0 32px 90px rgba(0,0,0,0.24), 0 10px 30px rgba(26,58,110,0.14), inset 0 1px 0 rgba(255,255,255,0.96)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
          initial={{ opacity: 0, y: 44 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, ease, delay: 0.25 }}
        >
          {/* Progress rail */}
          <div className="px-7 md:px-11 pt-8 md:pt-10">
            <div className="flex items-center gap-3 md:gap-5">
              {stepLabels.map((label, i) => {
                const active = i === step
                const done = i < step || submitted
                return (
                  <div key={label} className="flex items-center gap-3 md:gap-5 flex-1 last:flex-none">
                    <div className="flex items-center gap-2.5 shrink-0">
                      <motion.div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[12.5px] font-body font-bold shrink-0"
                        animate={{
                          backgroundColor: done ? '#2762C8' : active ? '#1A3A6E' : 'rgba(26,58,110,0.07)',
                          color: done || active ? '#ffffff' : 'rgba(26,58,110,0.45)',
                        }}
                        transition={{ duration: 0.4, ease }}
                      >
                        {done ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        ) : (
                          i + 1
                        )}
                      </motion.div>
                      <span
                        className={`hidden sm:block font-body text-[13px] font-semibold transition-colors duration-300 ${
                          active ? 'text-navy' : 'text-navy/40'
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {i < stepLabels.length - 1 && (
                      <div className="flex-1 h-px bg-navy/10 relative overflow-hidden rounded-full min-w-[16px]">
                        <motion.div
                          className="absolute inset-0 bg-brand-blue origin-left"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: i < step || submitted ? 1 : 0 }}
                          transition={{ duration: 0.6, ease }}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="h-px bg-navy/8 mt-8" />

          {/* Body */}
          <div className="px-7 md:px-11 py-9 md:py-11 min-h-[420px]">
            <AnimatePresence mode="wait" custom={dir}>
              {submitted ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center text-center justify-center gap-5 py-10"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-brand-blue flex items-center justify-center"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, ease, delay: 0.1 }}
                    style={{ boxShadow: '0 16px 40px rgba(39,98,200,0.32)' }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.div>
                  <h3 className="font-display font-extrabold text-navy text-[clamp(1.5rem,3vw,2.1rem)]">
                    Appointment request received
                  </h3>
                  <p className="text-navy/55 font-body text-[14.5px] leading-[1.72] max-w-[440px]">
                    Thank you, {form.name || 'there'}. We&apos;ve received your request for{' '}
                    <span className="text-navy font-semibold">{selectedService?.label}</span> on{' '}
                    <span className="text-navy font-semibold">
                      {selectedDay?.dayName}, {selectedDay?.month} {selectedDay?.date}
                    </span>{' '}
                    at <span className="text-navy font-semibold">{time}</span>. Our team will call {form.phone} to confirm your slot.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setStep(0)
                      setService(null)
                      setDay(null)
                      setTime(null)
                      setForm({ name: '', phone: '', email: '', notes: '' })
                    }}
                    className="mt-2 text-[13.5px] font-body font-semibold text-brand-blue hover:text-navy transition-colors duration-300"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  custom={dir}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease }}
                >
                  {/* STEP 1 — Service */}
                  {step === 0 && (
                    <div>
                      <h3 className="font-display font-bold text-navy text-[1.4rem] mb-1.5">
                        What brings you in?
                      </h3>
                      <p className="text-navy/50 font-body text-[13.5px] mb-7">
                        Select the treatment you&apos;d like to request. Not sure? Choose General Consultation.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                        {services.map((s) => {
                          const sel = service === s.id
                          return (
                            <motion.button
                              key={s.id}
                              onClick={() => setService(s.id)}
                              className="relative text-left rounded-[18px] p-4 overflow-hidden"
                              style={{
                                border: `1.5px solid ${sel ? '#2762C8' : 'rgba(26,58,110,0.1)'}`,
                                backgroundColor: sel ? 'rgba(39,98,200,0.04)' : '#ffffff',
                                boxShadow: sel ? '0 10px 30px rgba(39,98,200,0.14)' : 'none',
                              }}
                              whileHover={{ y: -3 }}
                              whileTap={{ scale: 0.98 }}
                              transition={{ duration: 0.35, ease }}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-11 h-11 rounded-xl shrink-0 overflow-hidden flex items-center justify-center"
                                  style={{ backgroundImage: 'linear-gradient(135deg, #EBF4FF 0%, #d9e9ff 100%)' }}
                                >
                                  <img src={s.img} alt="" className="w-full h-full object-cover" style={{ mixBlendMode: 'multiply' }} />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-display font-bold text-navy text-[13.5px] leading-tight">{s.label}</p>
                                  <p className="text-navy/45 font-body text-[12px] mt-0.5">{s.sub}</p>
                                </div>
                              </div>
                              <AnimatePresence>
                                {sel && (
                                  <motion.span
                                    className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-blue flex items-center justify-center"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease }}
                                  >
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 2 — Date & time */}
                  {step === 1 && (
                    <div>
                      <h3 className="font-display font-bold text-navy text-[1.4rem] mb-1.5">Select your preferred time</h3>
                      <p className="text-navy/50 font-body text-[13.5px] mb-6">
                        Choose a date and a time that works for you. We&apos;ll confirm availability when we call.
                      </p>

                      {/* Day strip */}
                      <div className="flex gap-2.5 overflow-x-auto pb-3 -mx-1 px-1" data-lenis-prevent>
                        {days.map((d) => {
                          const sel = day === d.key
                          return (
                            <motion.button
                              key={d.key}
                              onClick={() => {
                                setDay(d.key)
                                setTime(null)
                              }}
                              className="shrink-0 w-[64px] rounded-2xl py-3.5 flex flex-col items-center gap-1"
                              style={{
                                border: `1.5px solid ${sel ? '#2762C8' : 'rgba(26,58,110,0.1)'}`,
                                backgroundColor: sel ? '#2762C8' : '#ffffff',
                                boxShadow: sel ? '0 10px 26px rgba(39,98,200,0.22)' : 'none',
                              }}
                              whileHover={{ y: -3 }}
                              whileTap={{ scale: 0.97 }}
                              transition={{ duration: 0.3, ease }}
                            >
                              <span className={`font-body text-[11px] font-semibold uppercase tracking-wider ${sel ? 'text-white/70' : 'text-navy/40'}`}>
                                {d.dayName}
                              </span>
                              <span className={`font-display font-extrabold text-[19px] leading-none ${sel ? 'text-white' : 'text-navy'}`}>
                                {d.date}
                              </span>
                              <span className={`font-body text-[10.5px] ${sel ? 'text-white/70' : 'text-navy/40'}`}>
                                {d.month}
                              </span>
                            </motion.button>
                          )
                        })}
                      </div>

                      {/* Time slots */}
                      <div className="mt-7">
                        <AnimatePresence mode="wait">
                          {day ? (
                            <motion.div
                              key={day}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.4, ease }}
                            >
                              <SlotGroup
                                label="Morning · 10:00 AM – 1:30 PM"
                                slots={morningSlots}
                                selected={time}
                                onSelect={setTime}
                              />
                              {!isSunday && (
                                <SlotGroup
                                  label="Evening · 6:00 PM – 9:30 PM"
                                  slots={eveningSlots}
                                  selected={time}
                                  onSelect={setTime}
                                />
                              )}
                            </motion.div>
                          ) : (
                            <motion.p
                              key="empty"
                              className="text-navy/35 font-body text-[13.5px] py-6 text-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              Select a day to see available times.
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 — Details */}
                  {step === 2 && (
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-9">
                      <div>
                        <h3 className="font-display font-bold text-navy text-[1.4rem] mb-1.5">Your details</h3>
                        <p className="text-navy/50 font-body text-[13.5px] mb-7">
                          We&apos;ll use these to confirm your appointment request.
                        </p>
                        <div className="flex flex-col gap-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <input
                              type="text"
                              placeholder="Full name"
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              className={inputClass}
                            />
                            <input
                              type="tel"
                              placeholder="Phone number"
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                              className={inputClass}
                            />
                          </div>
                          <input
                            type="email"
                            placeholder="Email (optional)"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className={inputClass}
                          />
                          <textarea
                            placeholder="Anything we should know? (optional)"
                            value={form.notes}
                            onChange={(e) => setForm({ ...form, notes: e.target.value })}
                            rows={3}
                            className={`${inputClass} resize-none`}
                          />
                        </div>
                      </div>

                      {/* Summary panel */}
                      <div
                        className="rounded-[20px] p-6 relative overflow-hidden"
                        style={{ background: 'linear-gradient(160deg, #1e3a7e 0%, #162d65 60%, #0e2050 100%)' }}
                      >
                        <p className="font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-light/80 mb-5">
                          Your request
                        </p>
                        <div className="flex flex-col gap-4">
                          {[
                            { k: 'Treatment', v: selectedService?.label ?? '—' },
                            {
                              k: 'Date',
                              v: selectedDay ? `${selectedDay.dayName}, ${selectedDay.month} ${selectedDay.date}` : '—',
                            },
                            { k: 'Preferred time', v: time ?? '—' },
                          ].map((row) => (
                            <div key={row.k} className="flex flex-col gap-1 border-b border-white/10 pb-3.5 last:border-0">
                              <span className="font-body text-[11px] uppercase tracking-wider text-white/40">{row.k}</span>
                              <span className="font-display font-bold text-white text-[15px] leading-snug">{row.v}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-start gap-2 mt-6 text-white/55 font-body text-[12px] leading-relaxed">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7db4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4M12 8h.01" />
                          </svg>
                          This is a request, not a confirmed booking. Our team will call to confirm your slot.
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer nav */}
          {!submitted && (
            <div className="px-7 md:px-11 py-6 border-t border-navy/8 flex items-center justify-between gap-4">
              <button
                onClick={() => go(Math.max(0, step - 1))}
                className={`inline-flex items-center gap-2 font-body font-semibold text-[13.5px] rounded-full px-5 py-3 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  step === 0
                    ? 'opacity-0 pointer-events-none'
                    : 'text-navy/70 hover:text-navy hover:bg-navy/[0.04]'
                }`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              {step < 2 ? (
                <motion.button
                  onClick={() => canContinue && go(step + 1)}
                  disabled={!canContinue}
                  className="inline-flex items-center gap-2 text-white font-body font-semibold text-[13.5px] rounded-full pl-6 pr-5 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #2762C8 0%, #1A3A6E 100%)',
                    boxShadow: canContinue ? '0 14px 36px rgba(39,98,200,0.28)' : 'none',
                  }}
                  whileHover={canContinue ? { y: -2 } : {}}
                  whileTap={canContinue ? { scale: 0.97 } : {}}
                  transition={{ duration: 0.3, ease }}
                >
                  Continue
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.button>
              ) : (
                <div className="flex flex-col items-end gap-2">
                  {submitError && (
                    <p className="text-red-500 font-body text-[12px]">Something went wrong — please try again.</p>
                  )}
                  <motion.button
                    onClick={handleSubmit}
                    disabled={!canSubmit || sending}
                    className="inline-flex items-center gap-2 text-white font-body font-semibold text-[13.5px] rounded-full pl-6 pr-5 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #2762C8 0%, #1A3A6E 100%)',
                      boxShadow: canSubmit ? '0 14px 36px rgba(39,98,200,0.28)' : 'none',
                    }}
                    whileHover={canSubmit && !sending ? { y: -2 } : {}}
                    whileTap={canSubmit && !sending ? { scale: 0.97 } : {}}
                    transition={{ duration: 0.3, ease }}
                  >
                    {sending ? 'Sending…' : 'Send request'}
                    {!sending && (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </motion.button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
