import { useState } from 'react'

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQ[]
  title?: string
}

export default function FAQSection({
  faqs,
  title = 'Frequently Asked Questions',
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div style={{ padding: '60px 20px', background: 'white' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#132347',
          marginBottom: '40px',
          textAlign: 'center',
          fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
        }}>
          {title}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              overflow: 'hidden',
              background: openIndex === idx ? '#f8fafc' : 'white',
            }}>
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  textAlign: 'left',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (openIndex !== idx) {
                    e.currentTarget.style.background = '#f1f5f9'
                  }
                }}
                onMouseLeave={(e) => {
                  if (openIndex !== idx) {
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#132347',
                  margin: 0,
                }}>
                  {faq.question}
                </h3>
                <span style={{
                  fontSize: '20px',
                  color: '#94a3b8',
                  transition: 'transform 0.3s ease',
                  transform: openIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                  flexShrink: 0,
                  marginLeft: '12px',
                }}>
                  ▼
                </span>
              </button>

              {openIndex === idx && (
                <div style={{
                  padding: '16px 20px',
                  borderTop: '1px solid #e2e8f0',
                  color: '#475569',
                  lineHeight: '1.6',
                  fontSize: '15px',
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
