'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Script from 'next/script'

const ease = [0.22, 1, 0.36, 1] as const

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="testimonials" ref={ref} className="py-24 md:py-36 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 10% 60%, rgba(39,98,200,0.04) 0%, transparent 55%),' +
            'radial-gradient(ellipse at 90% 20%, rgba(74,150,232,0.03) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-[1320px] mx-auto px-6 md:px-10 relative">
        <div className="mb-14">
          <motion.p
            className="text-[11px] font-body font-semibold tracking-[0.22em] uppercase text-brand-blue mb-3"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            Patient Reviews
          </motion.p>
          <motion.h2
            className="font-display font-extrabold text-navy text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.08]"
            style={{ letterSpacing: '-0.022em' }}
            initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.1, ease, delay: 0.1 }}
          >
            What our patients say
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 0.25 }}
        >
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
          <div className="elfsight-app-23f2794c-d217-4e50-ad89-e609505c65ee" data-elfsight-app-lazy />
        </motion.div>
      </div>

      <div className="-mt-[42px] px-4 md:px-5 xl:px-7 relative z-20" aria-hidden="true">
        <div className="h-20 max-w-[1400px] mx-auto bg-white" />
      </div>
    </section>
  )
}
