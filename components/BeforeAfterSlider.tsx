'use client'

import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface BeforeAfterSliderProps {
  beforeLabel?: string
  afterLabel?: string
}

export default function BeforeAfterSlider({ beforeLabel = 'Before', afterLabel = 'After' }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    const onMove = (e: MouseEvent) => updatePosition(e.clientX)
    const onUp = () => {
      setIsDragging(false)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    const onMove = (e: TouchEvent) => updatePosition(e.touches[0].clientX)
    const onEnd = () => {
      setIsDragging(false)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onEnd)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-[18px] select-none"
      style={{ cursor: isDragging ? 'ew-resize' : 'col-resize' }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* BEFORE — left side (discoloured/before) */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full"
          style={{
            background:
              'linear-gradient(135deg, #e8c8a0 0%, #d4a870 40%, #c89060 70%, #b07840 100%)',
          }}
        >
          {/* Mock teeth "before" pattern */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 200 80" className="w-full max-w-[280px] opacity-40">
              {[15, 45, 75, 105, 130].map((x, i) => (
                <rect
                  key={i}
                  x={x}
                  y={i % 2 === 0 ? 10 : 18}
                  width={i === 2 ? 28 : 22}
                  height={i % 2 === 0 ? 52 : 44}
                  rx="5"
                  fill="#c8a060"
                  stroke="#b08040"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* AFTER — right side clipped (bright white teeth) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <div
          className="w-full h-full"
          style={{
            background:
              'linear-gradient(135deg, #f0f6ff 0%, #e0eeff 40%, #d0e8ff 70%, #c0dcff 100%)',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 200 80" className="w-full max-w-[280px] opacity-60">
              {[15, 45, 75, 105, 130].map((x, i) => (
                <rect
                  key={i}
                  x={x}
                  y={i % 2 === 0 ? 10 : 18}
                  width={i === 2 ? 28 : 22}
                  height={i % 2 === 0 ? 52 : 44}
                  rx="5"
                  fill="#f5faff"
                  stroke="#c0d8f8"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/90 z-10"
        style={{ left: `${position}%` }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 z-20 -translate-y-1/2 -translate-x-1/2"
        style={{ left: `${position}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <motion.div
          className="w-9 h-9 rounded-full bg-white shadow-glass flex items-center justify-center cursor-ew-resize"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M8 12h8M5 9l-3 3 3 3M19 9l3 3-3 3" stroke="#2762C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <p className="text-white text-[9px] font-body text-center mt-1 tracking-wide select-none opacity-70">
          Drag
        </p>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-black/30 text-white text-[10px] font-body font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-3 right-3 z-10">
        <span className="bg-black/30 text-white text-[10px] font-body font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
          {afterLabel}
        </span>
      </div>
    </div>
  )
}
