export const dynamic = 'force-dynamic'
'use client'
import dynamic from 'next/dynamic'
const Page = dynamic(() => import('../../_pages/Apply'), { ssr: false })
export default function P() { return <Page /> }
