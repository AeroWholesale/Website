import type { Metadata } from 'next'
import '../index.css'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'AeroWholesale | B2B Refurbished Electronics',
  description: 'Wholesale refurbished iPhones, iPads, MacBooks and Samsung devices for businesses.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PNWMB234MP"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PNWMB234MP');
            `,
          }}
        />
      </head>
      <body><Providers>{children}</Providers></body>
    </html>
  )
}