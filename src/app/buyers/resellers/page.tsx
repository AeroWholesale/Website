export const dynamic = 'force-dynamic'
'use client'
import dynamic from 'next/dynamic'
const Page = dynamic(() => import('../../../_pages/buyers/Resellers'), { ssr: false })
export default function P() { return <Page /> }
