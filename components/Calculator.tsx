'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const goals = [
  { id: 'straighter', label: 'Straighter teeth' },
  { id: 'implant', label: 'Replace missing tooth' },
  { id: 'whitening', label: 'Whiten smile' },
  { id: 'makeover', label: 'Complete makeover' },
  { id: 'maxillo', label: 'Jaw / facial treatment' },
]

const methods: Record<string, string[]> = {
  straighter: ['Aligners', 'Braces'],
  implant: ['Implants'],
  whitening: ['Laser', 'Trays'],
  makeover: ['Veneers', 'Implants', 'Aligners'],
  maxillo: ['Surgery'],
}

const loyaltyOptions = ['First-time patient', 'Returning patient']

interface Result {
  complexity: number
  time: string
  plan: string[]
  cost: string
  specialists: string[]
}

const results: Record<string, Result> = {
  straighter: {
    complexity: 42,
    time: '12–18 months',
    plan: ['Smile analysis & x-rays', 'Custom aligner / brace fitting', 'Regular adjustments', 'Retention phase'],
    cost: '₹40,000 – ₹1,20,000',
    specialists: ['Dr. Priya Sharma', 'Orthodontist'],
  },
  implant: {
    complexity: 68,
    time: '3–6 months',
    plan: ['3D CT scan & implant planning', 'Surgical implant placement', 'Healing period', 'Crown fitting'],
    cost: '₹25,000 – ₹60,000/tooth',
    specialists: ['Dr. Amit Verma', 'Implantologist'],
  },
  whitening: {
    complexity: 18,
    time: '1–3 sessions',
    plan: ['Shade assessment', 'Professional cleaning', 'Laser whitening', 'Take-home maintenance kit'],
    cost: '₹8,000 – ₹25,000',
    specialists: ['Dr. Neha Gupta', 'Aesthetic Dentist'],
  },
  makeover: {
    complexity: 85,
    time: '6–12 months',
    plan: ['Digital smile design', 'Veneers / composites', 'Implants if needed', 'Whitening & polish'],
    cost: '₹1,50,000 – ₹5,00,000',
    specialists: ['Dr. Shubham Agarwal', 'Dr. Neha Gupta'],
  },
  maxillo: {
    complexity: 90,
    time: '4–8 weeks',
    plan: ['3D facial scan', 'Pre-surgical planning', 'Surgical procedure', 'Rehabilitation & follow-up'],
    cost: '₹50,000 – ₹2,00,000',
    specialists: ['Dr. Shubham Agarwal', 'Maxillofacial Surgeon'],
  },
}

function ArcGauge({ value }: { value: number }) {
  const r = 40
  const circ = Math.PI * r
  const dash = (value / 100) * circ

  return (
    <svg viewBox="0 0 100 60" className="w-full max-w-[160px]">
      <path
        d={`M 10,50 A ${r},${r} 0 0,1 90,50`}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <motion.path
        d={`M 10,50 A ${r},${r} 0 0,1 90,50`}
        fill="none"
        stroke="#4B96E8"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${circ}`}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      />
      <text x="50" y="48" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="sans-serif">
        {value}%
      </text>
    </svg>
  )
}

function TimeBar({ time }: { time: string }) {
  const weeks = parseInt(time) || 4
  const total = 24
  return (
    <div className="flex gap-1 flex-wrap">
      {Array.from({ length: Math.min(total, 20) }, (_, i) => (
        <motion.div
          key={i}
          className={`h-2 rounded-sm flex-1 min-w-[8px] max-w-[14px] ${i < weeks ? 'bg-brand-light' : 'bg-white/10'}`}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: i * 0.025, duration: 0.4 }}
        />
      ))}
    </div>
  )
}

// Simplified 2D interactive tooth diagram
function ToothDiagram({ selected, onSelect }: { selected: number | null; onSelect: (i: number) => void }) {
  const teeth = [
    { x: 25, y: 38, r: 10 }, { x: 40, y: 32, r: 11 }, { x: 58, y: 32, r: 11 }, { x: 74, y: 38, r: 10 },
    { x: 84, y: 50, r: 9 }, { x: 84, y: 65, r: 9 }, { x: 74, y: 76, r: 10 }, { x: 58, y: 80, r: 11 },
    { x: 40, y: 80, r: 11 }, { x: 25, y: 76, r: 10 }, { x: 15, y: 65, r: 9 }, { x: 15, y: 50, r: 9 },
  ]
  return (
    <svg viewBox="0 0 100 115" className="w-full max-w-[260px] mx-auto">
      <defs>
        <radialGradient id="toothBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3a7fcc" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1a3880" stopOpacity="0.05" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="57" rx="45" ry="52" fill="url(#toothBg)" />
      {teeth.map((t, i) => (
        <g key={i} onClick={() => onSelect(i)} style={{ cursor: 'pointer' }}>
          <motion.circle
            cx={t.x}
            cy={t.y}
            r={t.r}
            fill={selected === i ? 'rgba(74,150,232,0.5)' : 'rgba(144,200,255,0.18)'}
            stroke={selected === i ? '#4B96E8' : 'rgba(144,200,255,0.4)'}
            strokeWidth="1.2"
            whileHover={{ scale: 1.12, fill: 'rgba(74,150,232,0.35)' }}
            animate={{ scale: selected === i ? 1.08 : 1 }}
            transition={{ duration: 0.3 }}
          />
          {selected === i && (
            <motion.circle
              cx={t.x}
              cy={t.y}
              r={t.r + 3}
              fill="none"
              stroke="#4B96E8"
              strokeWidth="1"
              strokeDasharray="3 2"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: `${t.x}px ${t.y}px` }}
            />
          )}
        </g>
      ))}
      <text x="50" y="108" textAnchor="middle" fill="rgba(144,200,255,0.45)" fontSize="5" fontFamily="sans-serif">
        360° · Click a tooth
      </text>
    </svg>
  )
}

export default function Calculator() {
  const [goal, setGoal] = useState('implant')
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [loyalty, setLoyalty] = useState('First-time patient')
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const result = results[goal]
  const availableMethods = methods[goal] || []

  return (
    <section id="calculator" ref={ref} className="py-24 md:py-36 bg-white">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-14 flex flex-col items-center gap-4">
          <motion.p
            className="text-[11px] text-brand-blue font-body font-semibold tracking-[0.22em] uppercase"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            Treatment Calculator
          </motion.p>
          <motion.h2
            className="font-display font-extrabold text-navy text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.08]"
            style={{ letterSpacing: '-0.022em' }}
            initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.1, ease, delay: 0.1 }}
          >
            Plan your smile journey
          </motion.h2>
          <motion.p
            className="text-navy/50 font-body text-[15px] max-w-[440px] leading-[1.7]"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
          >
            Estimate costs and treatment time based on your smile goals.
            Interactive. Free. Personalised.
          </motion.p>
        </div>

        {/* Three-column calculator */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr_1fr] gap-4"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 0.3 }}
        >
          {/* LEFT — Options */}
          <div className="flex flex-col gap-4">
            {/* Goals */}
            <div
              className="rounded-[20px] p-6"
              style={{ background: 'linear-gradient(145deg, #1e3a7e 0%, #132660 100%)' }}
            >
              <p className="text-white/50 text-[11px] font-body tracking-widest uppercase mb-4">
                01. Select goals
              </p>
              <div className="flex flex-col gap-3">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => { setGoal(g.id); setSelectedMethod(null) }}
                    className={`flex items-center gap-3 text-left text-[13.5px] font-body transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-light rounded-lg px-1 py-0.5 ${
                      goal === g.id ? 'text-white font-semibold' : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    <motion.span
                      className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
                      animate={{
                        borderColor: goal === g.id ? '#4B96E8' : 'rgba(255,255,255,0.25)',
                        backgroundColor: goal === g.id ? '#4B96E8' : 'transparent',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {goal === g.id && (
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-white"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.span>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Method */}
            <div
              className="rounded-[20px] p-6"
              style={{ background: 'linear-gradient(145deg, #1e3a7e 0%, #132660 100%)' }}
            >
              <p className="text-white/50 text-[11px] font-body tracking-widest uppercase mb-4">
                02. Preferred method
              </p>
              <div className="flex flex-wrap gap-2">
                {availableMethods.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMethod(m === selectedMethod ? null : m)}
                    className={`rounded-full px-4 py-1.5 text-[12.5px] font-body font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-light ${
                      selectedMethod === m
                        ? 'bg-brand-blue text-white'
                        : 'border border-white/25 text-white/60 hover:border-white/50 hover:text-white/90'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Loyalty */}
            <div
              className="rounded-[20px] p-6"
              style={{ background: 'linear-gradient(145deg, #1e3a7e 0%, #132660 100%)' }}
            >
              <p className="text-white/50 text-[11px] font-body tracking-widest uppercase mb-4">
                03. Patient status
              </p>
              <div className="flex flex-col gap-2.5">
                {loyaltyOptions.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLoyalty(l)}
                    className={`flex items-center gap-3 text-[13.5px] font-body text-left transition-all duration-300 ${
                      loyalty === l ? 'text-white font-semibold' : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    <motion.span
                      className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
                      animate={{
                        borderColor: loyalty === l ? '#4B96E8' : 'rgba(255,255,255,0.25)',
                        backgroundColor: loyalty === l ? '#4B96E8' : 'transparent',
                      }}
                    >
                      {loyalty === l && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </motion.span>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER — Tooth diagram */}
          <div className="rounded-[20px] p-6 flex flex-col items-center justify-between gap-6" style={{
            background: 'linear-gradient(145deg, #f0f6ff 0%, #e4effe 100%)',
            border: '1px solid rgba(39,98,200,0.1)',
          }}>
            <div className="w-full flex items-center justify-between">
              <p className="text-navy/60 text-[11px] font-body tracking-widest uppercase">
                04. Select tooth
              </p>
              <button
                onClick={() => setSelectedTooth(null)}
                className="text-[11px] font-body text-brand-blue/70 hover:text-brand-blue flex items-center gap-1"
              >
                <span className="w-3 h-3 border border-brand-blue/40 rounded-sm" /> All
              </button>
            </div>

            <ToothDiagram selected={selectedTooth} onSelect={setSelectedTooth} />

            <p className="text-navy/35 text-[11.5px] font-body text-center">
              {selectedTooth !== null
                ? `Tooth #${selectedTooth + 1} selected`
                : 'Tap any tooth to select a specific area'}
            </p>
          </div>

          {/* RIGHT — Results */}
          <div className="flex flex-col gap-4">
            <div
              className="rounded-[20px] p-5 flex flex-col gap-4"
              style={{ background: 'linear-gradient(145deg, #1e3a7e 0%, #132660 100%)' }}
            >
              <p className="text-white font-display font-bold text-[15px]">Result</p>

              {/* Complexity */}
              <div className="bg-white/8 rounded-[14px] p-4">
                <p className="text-white/50 text-[11px] tracking-widest uppercase mb-3">
                  Treatment complexity
                </p>
                <ArcGauge key={goal} value={result.complexity} />
                <p className="text-white/35 text-[10.5px] text-center mt-1">Estimation only</p>
              </div>

              {/* Time */}
              <div className="bg-white/8 rounded-[14px] p-4">
                <p className="text-white/50 text-[11px] tracking-widest uppercase mb-2">
                  Treatment time (est.)
                </p>
                <TimeBar key={goal} time={result.time} />
                <div className="flex justify-between mt-1.5">
                  <p className="text-white font-semibold font-body text-[13px]">{result.time}</p>
                  <p className="text-white/35 text-[10px]">Subject to consultation</p>
                </div>
              </div>

              {/* Specialists */}
              <div className="bg-white/8 rounded-[14px] p-4">
                <p className="text-white/50 text-[11px] tracking-widest uppercase mb-3">
                  Recommended specialists
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/50 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                    {result.specialists[0].split(' ').map(w => w[0]).slice(1).join('')}
                  </div>
                  <div>
                    <p className="text-white text-[12px] font-semibold font-body">{result.specialists[0]}</p>
                    <p className="text-white/45 text-[10.5px] font-body">{result.specialists[1]}</p>
                  </div>
                </div>
              </div>

              {/* Plan */}
              <div className="bg-white/8 rounded-[14px] p-4">
                <p className="text-white/50 text-[11px] tracking-widest uppercase mb-2">
                  Recommended plan
                </p>
                <ul className="flex flex-col gap-1.5">
                  {result.plan.map((step) => (
                    <li key={step} className="flex items-start gap-2 text-white/70 text-[12px] font-body">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-light mt-1.5 shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cost */}
              <div className="bg-white/8 rounded-[14px] p-4">
                <p className="text-white/50 text-[11px] tracking-widest uppercase mb-2">
                  Estimated cost range
                </p>
                <div className="flex gap-2 mb-1.5">
                  <div className="flex-1 h-1.5 rounded-full bg-brand-blue/60" />
                  <div className="flex-1 h-1.5 rounded-full bg-white/10" />
                </div>
                <p className="text-white font-bold font-display text-[14px]">{result.cost}</p>
                <p className="text-white/30 text-[10px] mt-0.5">*Estimate only. Final cost at clinic.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
