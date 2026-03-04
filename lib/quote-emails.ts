// lib/quote-emails.ts
// Resend email notifications for the quote request flow.
// Uses RESEND_API_KEY already in Vercel env vars.

const FROM = 'AeroWholesale <sales@aerowholesale.com>'

const INTERNAL_RECIPIENTS = [
  'isaac@aerowholesale.com',
  'linda@aerowholesale.com',
]

// ── Shared HTML helpers ──────────────────────────────────────────────────────

function emailWrapper(body: string): string {
  return `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;">
      <div style="background:#132347;padding:24px 32px;border-radius:8px 8px 0 0;">
        <h2 style="color:#fff;margin:0;font-size:18px;font-weight:800;letter-spacing:-0.02em;">
          <span style="display:inline-block;width:8px;height:8px;background:#c2410c;border-radius:50%;margin-right:8px;vertical-align:middle;"></span>
          AeroWholesale
        </h2>
      </div>
      <div style="padding:32px;background:#fff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;">
        ${body}
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:28px 0 20px;">
        <p style="font-size:12px;color:#94a3b8;margin:0;line-height:1.6;">
          AeroWholesale &mdash; Refurbished Electronics Wholesale<br>
          Questions? Reply to this email or contact <a href="mailto:sales@aerowholesale.com" style="color:#c2410c;">sales@aerowholesale.com</a>
        </p>
      </div>
    </div>
  `
}

function lineItemsTable(items: QuoteItem[]): string {
  const rows = items.map(item => `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f4f8;font-size:13px;color:#132347;font-weight:600;">${item.productName || item.name || ''}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f4f8;font-size:12px;color:#64748b;">${item.grade || ''}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f4f8;font-size:12px;color:#64748b;">${[item.storage, item.carrier, item.color].filter(Boolean).join(' · ')}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f4f8;font-size:13px;text-align:center;font-weight:700;color:#132347;">${item.qty}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f4f8;font-size:13px;text-align:right;font-weight:700;color:#132347;">$${((item.price || 0) * item.qty).toFixed(2)}</td>
    </tr>
  `).join('')

  return `
    <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin:16px 0;">
      <thead>
        <tr style="background:#f8fafc;">
          <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #e2e8f0;">Product</th>
          <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #e2e8f0;">Grade</th>
          <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #e2e8f0;">Spec</th>
          <th style="padding:10px 14px;text-align:center;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #e2e8f0;">Qty</th>
          <th style="padding:10px 14px;text-align:right;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #e2e8f0;">Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `
}

function refBadge(refNumber: string): string {
  return `<span style="font-family:monospace;background:#f1f4f8;border:1px solid #e2e8f0;padding:4px 10px;border-radius:5px;font-size:13px;font-weight:700;color:#132347;letter-spacing:0.05em;">${refNumber}</span>`
}

function ctaButton(text: string, url: string): string {
  return `
    <div style="margin:24px 0;">
      <a href="${url}" style="display:inline-block;background:#c2410c;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:800;letter-spacing:-0.01em;">${text}</a>
    </div>
  `
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface QuoteItem {
  productName?: string
  name?: string
  grade: string
  storage?: string
  carrier?: string
  color?: string
  qty: number
  price: number
}

export interface QuoteEmailData {
  refNumber: string
  dealerName: string
  dealerEmail: string
  companyName: string
  items: QuoteItem[]
  notes?: string | null
  totalUnits: number
  totalValue: number
}

// ── Resend sender ─────────────────────────────────────────────────────────────

async function sendEmail(to: string | string[], subject: string, html: string): Promise<void> {
  const recipients = Array.isArray(to) ? to : [to]
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM, to: recipients, subject, html }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Resend error: ${err}`)
  }
}

// ── EMAIL 1: Internal alert — new quote received ──────────────────────────────

export async function sendInternalQuoteAlert(data: QuoteEmailData): Promise<void> {
  const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aerowholesale.com'}/admin?tab=quotes`

  const html = emailWrapper(`
    <div style="background:#fef9c3;border:1px solid #fde68a;border-radius:8px;padding:14px 18px;margin-bottom:24px;">
      <div style="font-size:13px;font-weight:800;color:#854d0e;">📋 New Quote Request</div>
      <div style="font-size:12px;color:#92400e;">Submitted just now — needs review</div>
    </div>

    <p style="font-size:15px;margin:0 0 6px;"><strong>${data.companyName}</strong> submitted a quote request.</p>
    <p style="font-size:13px;color:#64748b;margin:0 0 20px;">
      Contact: ${data.dealerName} &mdash; <a href="mailto:${data.dealerEmail}" style="color:#c2410c;">${data.dealerEmail}</a>
    </p>

    <div style="display:flex;gap:24px;margin-bottom:20px;">
      <div style="flex:1;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 18px;text-align:center;">
        <div style="font-size:22px;font-weight:900;color:#132347;">${data.totalUnits}</div>
        <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">Units</div>
      </div>
      <div style="flex:1;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 18px;text-align:center;">
        <div style="font-size:22px;font-weight:900;color:#c2410c;">$${data.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
        <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">Est. Value</div>
      </div>
      <div style="flex:1;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 18px;text-align:center;">
        <div style="font-size:22px;font-weight:900;color:#132347;">${data.items.length}</div>
        <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">Line Items</div>
      </div>
    </div>

    ${lineItemsTable(data.items)}

    ${data.notes ? `
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 18px;margin:0 0 20px;">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Dealer Notes</div>
        <div style="font-size:13px;color:#132347;line-height:1.6;">${data.notes}</div>
      </div>
    ` : ''}

    <p style="font-size:13px;color:#64748b;margin:0 0 4px;">Reference: ${refBadge(data.refNumber)}</p>
    ${ctaButton('Review in Admin Panel →', adminUrl)}
  `)

  await sendEmail(
    INTERNAL_RECIPIENTS,
    `📋 New Quote Request — ${data.refNumber} from ${data.companyName} (${data.totalUnits} units)`,
    html
  )
}

// ── EMAIL 2: Dealer confirmation ──────────────────────────────────────────────

export async function sendQuoteConfirmedEmail(data: QuoteEmailData): Promise<void> {
  const html = emailWrapper(`
    <p style="font-size:15px;margin:0 0 6px;">Hi ${data.dealerName.split(' ')[0]},</p>
    <p style="font-size:15px;line-height:1.6;margin:0 0 20px;">
      Great news — your quote request has been <strong style="color:#166534;">confirmed</strong>. Our team has reviewed availability and pricing and is ready to proceed.
    </p>

    <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:14px 18px;margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">Quote Reference</div>
      ${refBadge(data.refNumber)}
    </div>

    ${lineItemsTable(data.items)}

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 18px;margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:800;color:#132347;">
        <span>Estimated Total (${data.totalUnits} units)</span>
        <span style="color:#c2410c;">$${data.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
      </div>
      <p style="font-size:12px;color:#94a3b8;margin:8px 0 0;line-height:1.5;">Final pricing confirmed at time of fulfillment. Subject to availability.</p>
    </div>

    <p style="font-size:14px;line-height:1.6;margin:0 0 8px;color:#475569;">
      A member of our team will reach out shortly with next steps for payment and shipping. If you have any questions, reply directly to this email.
    </p>
  `)

  await sendEmail(
    data.dealerEmail,
    `✓ Quote Confirmed — ${data.refNumber} | AeroWholesale`,
    html
  )
}

// ── EMAIL 3: Processing notification ─────────────────────────────────────────

export async function sendQuoteProcessingEmail(data: QuoteEmailData): Promise<void> {
  const html = emailWrapper(`
    <p style="font-size:15px;margin:0 0 6px;">Hi ${data.dealerName.split(' ')[0]},</p>
    <p style="font-size:15px;line-height:1.6;margin:0 0 20px;">
      We're currently processing your quote request. Our team is working on confirming stock availability and finalizing pricing.
    </p>

    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px 18px;margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;color:#1e40af;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">Quote Reference</div>
      ${refBadge(data.refNumber)}
      <div style="font-size:13px;color:#3b82f6;margin-top:8px;font-weight:600;">⟳ Processing — expect an update within 24 hours</div>
    </div>

    <p style="font-size:13px;color:#64748b;line-height:1.6;margin:0;">
      Your quote covers <strong>${data.totalUnits} units</strong> across <strong>${data.items.length} line item${data.items.length !== 1 ? 's' : ''}</strong>.
      We'll follow up via email as soon as we have confirmation. Questions? Reply to this email anytime.
    </p>
  `)

  await sendEmail(
    data.dealerEmail,
    `⟳ Your Quote is Being Processed — ${data.refNumber} | AeroWholesale`,
    html
  )
}

// ── EMAIL 4: Decline notification ─────────────────────────────────────────────

export const DECLINE_REASONS: Record<string, string> = {
  no_stock:         'No stock available for requested items',
  pricing_mismatch: 'Pricing requirements could not be met',
  min_order:        'Minimum order quantity not met',
  discontinued:     'One or more items have been discontinued',
  duplicate:        'Duplicate of an existing active quote',
  other:            'Unable to fulfill at this time',
}

export async function sendQuoteDeclinedEmail(data: QuoteEmailData, reasonKey: string): Promise<void> {
  const reasonText = DECLINE_REASONS[reasonKey] || DECLINE_REASONS.other

  const html = emailWrapper(`
    <p style="font-size:15px;margin:0 0 6px;">Hi ${data.dealerName.split(' ')[0]},</p>
    <p style="font-size:15px;line-height:1.6;margin:0 0 20px;">
      Thank you for your quote request. Unfortunately, we're unable to fulfill this request at this time.
    </p>

    <div style="background:#fff1f2;border:1px solid #fecdd3;border-radius:8px;padding:14px 18px;margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;color:#9f1239;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Quote Reference</div>
      ${refBadge(data.refNumber)}
      <div style="font-size:13px;color:#dc2626;margin-top:10px;font-weight:600;">Reason: ${reasonText}</div>
    </div>

    <p style="font-size:14px;line-height:1.6;color:#475569;margin:0 0 16px;">
      We apologize for any inconvenience. If you'd like to discuss alternatives or adjust your request, our team is happy to help.
      Simply reply to this email and we'll get back to you promptly.
    </p>

    <p style="font-size:14px;line-height:1.6;color:#475569;margin:0;">
      You're also welcome to browse our current catalog for available inventory.
    </p>
  `)

  await sendEmail(
    data.dealerEmail,
    `Quote Request Update — ${data.refNumber} | AeroWholesale`,
    html
  )
}