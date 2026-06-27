'use client'

import {
  useState, useRef, useEffect, useLayoutEffect,
  forwardRef, useImperativeHandle,
} from 'react'

// ─── Public types ─────────────────────────────────────────────────────────────

export interface BoxState {
  x: number
  y: number
  w: number
  fontSize: number | null
  html: string | null
}

export interface RBoxHandle {
  getState(): BoxState
  restore(state: BoxState): void
}

// ─── Internal types ───────────────────────────────────────────────────────────

type Handle = 'nw' | 'ne' | 'sw' | 'se' | 'e' | 'w'

const HANDLES: { id: Handle; style: React.CSSProperties }[] = [
  { id: 'nw', style: { top: -5,    left: -5,  cursor: 'nw-resize' } },
  { id: 'ne', style: { top: -5,    right: -5, cursor: 'ne-resize' } },
  { id: 'sw', style: { bottom: -5, left: -5,  cursor: 'sw-resize' } },
  { id: 'se', style: { bottom: -5, right: -5, cursor: 'se-resize' } },
  { id: 'e',  style: { top: '50%', right: -5, transform: 'translateY(-50%)', cursor: 'e-resize' } },
  { id: 'w',  style: { top: '50%', left: -5,  transform: 'translateY(-50%)', cursor: 'w-resize' } },
]

interface Props {
  children: React.ReactNode
  initialX: number
  initialY: number
  initialWidth: number
  initialFontSize?: number | null
  zIndex?: number
  editable?: boolean
  imageBox?: boolean
  editMode?: boolean
}

// ─── Component ────────────────────────────────────────────────────────────────

const ResizableTextBox = forwardRef<RBoxHandle, Props>(function ResizableTextBox(
  { children, initialX, initialY, initialWidth, initialFontSize = null, zIndex = 10, editable = false, imageBox = false, editMode = true },
  ref,
) {
  const [x, setX] = useState(initialX)
  const [y, setY] = useState(initialY)
  const [w, setW] = useState(initialWidth)
  const [fontSize, setFontSize] = useState<number | null>(initialFontSize)
  const [selected, setSelected] = useState(false)
  const [hovered,  setHovered]  = useState(false)
  const [textEditMode, setTextEditMode] = useState(false)
  // Saved HTML for text-edit persistence — set via useLayoutEffect, NOT dangerouslySetInnerHTML
  const [savedHtml, setSavedHtml] = useState<string | null>(null)

  const boxRef     = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  // Ref so the document-level listener always sees current textEditMode without stale closure
  const textEditModeRef = useRef(false)
  textEditModeRef.current = textEditMode

  const drag = useRef<{
    mode: 'move' | Handle
    mx0: number; my0: number
    x0: number; y0: number; w0: number
  } | null>(null)

  const posRef = useRef({ x, y, w })
  posRef.current = { x, y, w }

  // ── Apply savedHtml to DOM directly — avoids dangerouslySetInnerHTML entirely ──
  // React renders {null} for children when savedHtml is set, so React never
  // tries to reconcile the nodes we set here. They persist across re-renders.
  useLayoutEffect(() => {
    if (savedHtml !== null && contentRef.current) {
      contentRef.current.innerHTML = savedHtml
    }
  }, [savedHtml])

  // ── Imperative handle ──────────────────────────────────────────────────────
  useImperativeHandle(ref, () => ({
    getState: () => ({
      x, y, w, fontSize,
      html: editable ? (contentRef.current?.innerHTML ?? null) : null,
    }),
    restore: (s: BoxState) => {
      setX(s.x); setY(s.y); setW(s.w); setFontSize(s.fontSize)
      if (editable && s.html) setSavedHtml(s.html)
    },
  }), [x, y, w, fontSize, editable])

  // ── Handle resize drag ─────────────────────────────────────────────────────
  function onHandleDown(e: React.MouseEvent, id: Handle) {
    e.preventDefault(); e.stopPropagation()
    const { x: cx, y: cy, w: cw } = posRef.current
    drag.current = { mode: id, mx0: e.clientX, my0: e.clientY, x0: cx, y0: cy, w0: cw }
  }

  // ── Overlay mousedown — drag is captured here, never reaches contentEditable ─
  function onOverlayMouseDown(e: React.MouseEvent) {
    e.preventDefault()
    const { x: cx, y: cy, w: cw } = posRef.current
    drag.current = { mode: 'move', mx0: e.clientX, my0: e.clientY, x0: cx, y0: cy, w0: cw }
    setSelected(true)
  }

  function adjustFontSize(delta: number) {
    setFontSize(prev => Math.max(10, Math.min(200, (prev ?? 66) + delta)))
  }

  // ── Mouse-move / up / click-outside ───────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!drag.current) return
      const { mode, mx0, my0, x0, y0, w0 } = drag.current
      const dx = e.clientX - mx0, dy = e.clientY - my0
      const MIN = 80
      if (mode === 'move') { setX(x0 + dx); setY(y0 + dy); return }
      if (mode === 'e' || mode === 'ne' || mode === 'se') setW(Math.max(MIN, w0 + dx))
      if (mode === 'w' || mode === 'nw' || mode === 'sw') {
        const nw = Math.max(MIN, w0 - dx); setX(x0 + w0 - nw); setW(nw)
      }
      if (mode === 'nw' || mode === 'ne') setY(y0 + dy)
    }
    const onUp = () => { drag.current = null }
    const onOut = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        // Capture any in-progress text edits before leaving text-edit mode
        if (editable && textEditModeRef.current && contentRef.current) {
          setSavedHtml(contentRef.current.innerHTML)
        }
        setSelected(false)
        setTextEditMode(false)
        setHovered(false)
      }
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup',   onUp)
    document.addEventListener('mousedown', onOut)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup',   onUp)
      document.removeEventListener('mousedown', onOut)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editable])

  // ── Double-click enters text-edit mode ────────────────────────────────────
  function onDoubleClick() {
    if (editMode && editable) {
      setTextEditMode(true)
      setTimeout(() => contentRef.current?.focus(), 0)
    }
  }

  const cssVars     = fontSize ? ({ '--rbox-fs': `${fontSize}px` } as React.CSSProperties) : {}
  const showOutline = editMode && (selected || hovered)
  const isEditable  = editMode && editable && textEditMode

  return (
    <div
      ref={boxRef}
      onMouseEnter={editMode ? () => setHovered(true)  : undefined}
      onMouseLeave={editMode ? () => setHovered(false) : undefined}
      onDoubleClick={onDoubleClick}
      style={{
        position: 'absolute', left: x, top: y, width: w, zIndex,
        cursor: editMode ? (textEditMode ? 'text' : selected ? 'grab' : 'default') : undefined,
      }}
    >
      {/* Selection / hover outline */}
      {showOutline && (
        <div aria-hidden style={{
          position: 'absolute', inset: -1,
          border: selected ? '1.5px solid #2762C8' : '1.5px dashed rgba(39,98,200,0.35)',
          pointerEvents: 'none', zIndex: 0,
        }} />
      )}

      {/* "Double-click to edit" hint */}
      {editMode && selected && editable && !textEditMode && !imageBox && (
        <div aria-hidden style={{
          position: 'absolute', top: -26, left: '50%', transform: 'translateX(-50%)',
          background: '#1A3A6E', color: 'rgba(255,255,255,0.7)',
          fontSize: 9, fontFamily: 'sans-serif', padding: '2px 8px', borderRadius: 4,
          whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 20,
        }}>
          Double-click to edit text
        </div>
      )}

      {/* Font-size toolbar */}
      {editMode && selected && !imageBox && (
        <div
          data-toolbar="1"
          onMouseDown={e => e.stopPropagation()}
          style={{
            position: 'absolute', top: -38, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: 2,
            background: '#1A3A6E', borderRadius: 8, padding: '4px 8px',
            zIndex: 20, boxShadow: '0 4px 16px rgba(26,58,110,0.25)', whiteSpace: 'nowrap',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, marginRight: 4 }}>Font</span>
          <button onClick={() => adjustFontSize(-2)} style={btnStyle}>−</button>
          <span style={{ color: '#fff', fontSize: 12, minWidth: 32, textAlign: 'center' }}>
            {fontSize ?? '—'}
          </span>
          <button onClick={() => adjustFontSize(2)} style={btnStyle}>+</button>
          <button onClick={() => setFontSize(null)} title="Reset" style={{ ...btnStyle, padding: '0 6px', fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>↺</button>
        </div>
      )}

      {/* Content — children rendered by React; savedHtml applied via useLayoutEffect */}
      <div
        ref={contentRef}
        contentEditable={isEditable || undefined}
        suppressContentEditableWarning={isEditable}
        style={{ width: '100%', outline: 'none', ...cssVars, userSelect: isEditable ? 'text' : 'none' }}
      >
        {/* When savedHtml is set, render nothing here — useLayoutEffect sets innerHTML directly.
            React won't touch DOM nodes it didn't create, so they persist across re-renders. */}
        {savedHtml !== null ? null : children}
      </div>

      {/* Transparent overlay — sits above content in z-order, intercepts all clicks.
          Removed only in text-edit mode so the user can type directly. */}
      {editMode && !textEditMode && (
        <div
          onMouseDown={onOverlayMouseDown}
          style={{
            position: 'absolute', inset: 0,
            zIndex: 5,
            cursor: selected ? 'grab' : 'default',
          }}
        />
      )}

      {/* Resize handles — zIndex 11, above overlay */}
      {editMode && selected && HANDLES.map(({ id, style }) => (
        <div
          key={id}
          data-handle={id}
          onMouseDown={e => onHandleDown(e, id)}
          style={{
            position: 'absolute', width: 9, height: 9,
            background: '#fff', border: '1.5px solid #2762C8',
            borderRadius: 2, zIndex: 11, ...style,
          }}
        />
      ))}
    </div>
  )
})

const btnStyle: React.CSSProperties = {
  width: 22, height: 22, borderRadius: 4,
  border: 'none', background: 'rgba(255,255,255,0.1)',
  color: '#fff', cursor: 'pointer', fontSize: 14, lineHeight: '1',
}

export default ResizableTextBox
