'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Stat {
  value: number
  suffix: string
  label: string
  decimals?: boolean
}

const stats: Stat[] = [
  { value: 30, suffix: '+', label: 'Years of trusted care' },
  { value: 3, suffix: '', label: 'Dental professionals' },
  { value: 2, suffix: '', label: 'Generations of care' },
  { value: 1994, suffix: '', label: 'Established' },
]

function Counter({ value, suffix, start, duration = 2.2 }: { value: number; suffix: string; start: boolean; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    const startTime = performance.now()
    const update = (now: number) => {
      const elapsed = (now - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      // Ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }, [start, value, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

const ease = [0.22, 1, 0.36, 1] as const

export default function Stats() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      id="stats"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0e2050 0%, #152b6a 50%, #0d1f50 100%)',
      }}
    >
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.9, ease }}
            >
              {/* Divider line */}
              <motion.div
                className="w-full h-px bg-white/10 mb-4"
                initial={{ scaleX: 0, originX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: i * 0.12 + 0.2, duration: 1.0, ease }}
              />
              <span className="font-display font-extrabold text-white text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-tight">
                <Counter value={stat.value} suffix={stat.suffix} start={inView} />
              </span>
              <span className="text-white/50 text-[13px] font-body leading-snug tracking-wide">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
