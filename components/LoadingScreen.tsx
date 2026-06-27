'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoadingReady } from './LoadingContext'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const { markReady } = useLoadingReady()

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1700)
    const readyTimer = setTimeout(markReady, 1700)
    return () => { clearTimeout(timer); clearTimeout(readyTimer) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #1a3a7e 0%, #0e2557 50%, #091840 100%)',
          }}
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="flex flex-col items-center gap-6 select-none"
            initial={{ opacity: 0, filter: 'blur(24px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            {/* Tooth SVG Logo */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <svg width="72" height="80" viewBox="0 0 72 80" fill="none">
                  <defs>
                    <linearGradient id="toothGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c8e4ff" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#8bbfef" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  {/* Left tooth shape */}
                  <path
                    d="M8 22C8 12 14 6 22 6C27 6 31 9 34 14C37 9 41 6 46 6C54 6 60 12 60 22C60 30 57 38 54 44C51 50 48 56 46 62C45 66 43 68 40 68C37 68 35 66 34 62C33 66 31 68 28 68C25 68 23 66 22 62C20 56 17 50 14 44C11 38 8 30 8 22Z"
                    fill="url(#toothGrad)"
                    stroke="rgba(200,228,255,0.4)"
                    strokeWidth="1"
                  />
                  {/* Sparkle */}
                  <path
                    d="M36 18L37.5 22.5L42 24L37.5 25.5L36 30L34.5 25.5L30 24L34.5 22.5Z"
                    fill="white"
                    opacity="0.9"
                  />
                </svg>
              </motion.div>
              {/* Glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(75,150,232,0.3) 0%, transparent 70%)',
                  transform: 'scale(2)',
                }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Clinic name */}
            <div className="text-center">
              <motion.p
                className="text-[rgba(180,210,255,0.7)] text-xs tracking-[0.25em] uppercase font-body mb-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Est. 1994 · Shahdara, Delhi
              </motion.p>
              <motion.h1
                className="font-display text-white text-3xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.9 }}
              >
                Sona Dental
              </motion.h1>
              <motion.p
                className="text-[rgba(180,210,255,0.65)] text-sm font-body mt-1 tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                &amp; Maxillofacial Clinic
              </motion.p>
            </div>

            {/* Loading bar */}
            <motion.div className="w-40 h-[2px] bg-white/10 rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-light to-brand-blue rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
