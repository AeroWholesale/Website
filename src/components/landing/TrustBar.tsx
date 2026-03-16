interface TrustItem {
  icon: string
  label: string
}

interface TrustBarProps {
  items?: TrustItem[]
}

const defaultItems: TrustItem[] = [
  { icon: '✓', label: 'Verified Quality' },
  { icon: '⚡', label: 'Same-Day Shipping' },
  { icon: '🔒', label: 'Secure Checkout' },
  { icon: '📦', label: 'Full Warranty' },
]

export default function TrustBar({ items = defaultItems }: TrustBarProps) {
  return (
    <div style={{
      padding: '30px 20px',
      background: '#f8fafc',
      borderTop: '1px solid #e2e8f0',
      borderBottom: '1px solid #e2e8f0',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '20px',
        textAlign: 'center',
      }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>{item.icon}</span>
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#475569',
              fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
