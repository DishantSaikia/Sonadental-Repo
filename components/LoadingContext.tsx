'use client'

import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface Ctx { ready: boolean; markReady: () => void }

const LoadingContext = createContext<Ctx>({ ready: false, markReady: () => {} })

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  return (
    <LoadingContext.Provider value={{ ready, markReady: () => setTimeout(() => setReady(true), 0) }}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoadingReady = () => useContext(LoadingContext)
