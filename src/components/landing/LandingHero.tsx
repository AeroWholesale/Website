import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'

interface LandingHeroProps {
  title: string
  subtitle: string
  ctaText?: string
  ctaAction?: () => void
  backgroundGradient?: string
}

export default function LandingHero({
  title,
  subtitle,
  ctaText = 'Get Started',
  ctaAction,
  backgroundGradient = 'from-[#132347] to-[#1a3a5f]',
}: LandingHeroProps) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #132347 0%, #1a3a5f 100%)',
      padding: '80px 20px',
      textAlign: 'center',
      color: 'white',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 'bold',
          marginBottom: '20px',
          fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
          letterSpacing: '-0.02em',
        }}>
          {title}
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: '#cbd5e1',
          marginBottom: '40px',
          lineHeight: '1.6',
          fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
        }}>
          {subtitle}
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={ctaAction}
            style={{
              background: '#c2410c',
              color: 'white',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#a01e09')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#c2410c')}
          >
            {ctaText} →
          </button>
          <a
            href="/catalog"
            style={{
              background: 'transparent',
              color: 'white',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: 'bold',
              border: '2px solid white',
              borderRadius: '8px',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.color = '#132347'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'white'
            }}
          >
            Browse Inventory
          </a>
        </div>
      </div>
    </div>
  )
}
