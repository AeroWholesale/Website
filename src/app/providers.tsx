'use client'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const BrowserRouter = dynamic(
  () => import('react-router-dom').then(m => m.BrowserRouter),
  { ssr: false }
)

export default function Providers({ children }: { children: ReactNode }) {
  return <BrowserRouter>{children}</BrowserRouter>
}
