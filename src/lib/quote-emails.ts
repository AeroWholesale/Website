// lib/quote-emails.ts
// All quote-related email notifications for AeroWholesale.
// Uses RESEND_API_KEY already in Vercel — no new env vars needed.
// Sends from: sales@aerowholesale.com

const FROM = 'AeroWholesale <sales@aerowholesale.com>'

// Zack + Linda get notified when a new quote comes in
const INTERNAL_RECIPIENTS = [
  'zack@aerowholesale.com',
  'linda@aerowholesale.com',
]

function emailWrapper(body: string): string {
  return `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;">
      <div style="background:#132347;padding:24px 32px;border-radius:8px 8px 0 0;">
        <h2 style="color:#fff;margin:0;font-size:18px;font-weight:800;">AeroWholesale</h2>
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
      <td style="padding:10px 14px;border-bottom:1px solid #f1f4f8;font-size:13px;color:#132347;font-weight:600;">${item.name}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f4f8;font-size:12px;color:#64748b;">${item.grade}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f4f8;font-size:12px;color:#64748b;">${[item.storage, item.carrier, item.color].filter(Boolean).join(' · ')}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f4f8;font-size:13px;text-align:center;font-weight:700;color:#132347;">${item.qty}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f4f8;font-size:13px;text-align:right;font-weight:700;color:#132347;">$${(item.price * item.qty).toFixed(2)}</td>
    </tr>
  `).join('')
  return `
    <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin:16px 0;">
      <thead><tr style="background:#f8fafc;">
        <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #e2e8f0;">Product</th>
        <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #e2e8f0;">Grade</th>
        <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #e2e8f0;">Spec</th>
        <th style="padding:10px 14px;text-align:center;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #e2e8f0;">Qty</th>
        <th style="padding:10px 14px;text-align:right;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;border-bottom:1px solid #e2e8f0;">Total</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `
}

function refBadge(refNumber: string): string {
  return `<span style="font-family:monospace;background:#f1f4f8;border:1px solid #e2e8f0;padding:4px 10px;border-radius:5px;font-size:13px;font-weight:700;color:#132347;letter-spacing:0.05em;">${refNumber}</span>`
}

export interface QuoteItem {
  name: string; grade: string; storage?: string; carrier?: string; color?: string; qty: number; price: number
}
export interface QuoteEmailData {
  refNumber: string; dealerName: string; dealerEmail: string; companyName: string
  items: QuoteItem[]; notes?: string; totalUnits: number; totalValue: number
}

async function sendEmail(to: string | string[], subject: string, html: string): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to: Array.isArray(to) ? to : [to], subject, html }),
  })
  if (!res.ok) throw new Error(`Resend error: ${await res.text()}`)
}

// ── INBOUND: Internal alert to Zack + Linda ───────────────────────────────
export async function sendInternalQuoteAlert(data: QuoteEmailData): Promise<void> {
  const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aerowholesale.com'}/admin`
  const html = emailWrapper(`
    <div style="background:#fef9c3;border:1px solid #fde68a;border-radius:8px;padding:14px 18px;margin-bottom:24px;">
      <strong style="color:#854d0e;font-size:14px;">📋 New Quote Request — needs review</strong>
    </div>
    <p style="font-size:15px;margin:0 0 6px;"><strong>${data.companyName}</strong> submitted a quote request.</p>
    <p style="font-size:13px;color:#64748b;margin:0 0 20px;">Contact: ${data.dealerName} &mdash; <a href="mailto:${data.dealerEmail}" style="color:#c2410c;">${data.dealerEmail}</a></p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;"><tr>
      <td style="padding:12px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;text-align:center;">
        <div style="font-size:22px;font-weight:900;color:#132347;">${data.totalUnits}</div>
        <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Units</div>
      </td>
      <td style="width:12px;"></td>
      <td style="padding:12px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;text-align:center;">
        <div style="font-size:22px;font-weight:900;color:#c2410c;">$${data.totalValue.toLocaleString('en-US',{minimumFractionDigits:2})}</div>
        <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Est. Value</div>
      </td>
      <td style="width:12px;"></td>
      <td style="padding:12px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;text-align:center;">
        <div style="font-size:22px;font-weight:900;color:#132347;">${data.items.length}</div>
        <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Lines</div>
      </td>
    </tr></table>
    ${lineItemsTable(data.items)}
    ${data.notes ? `<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 18px;margin:0 0 20px;"><div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Dealer Notes</div><div style="font-size:13px;color:#132347;line-height:1.6;">${data.notes}</div></div>` : ''}
    <p style="font-size:13px;color:#64748b;margin:0 0 16px;">Reference: ${refBadge(data.refNumber)}</p>
    <a href="${adminUrl}" style="display:inline-block;background:#c2410c;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:800;">Review in Admin Panel →</a>
  `)
  await sendEmail(INTERNAL_RECIPIENTS, `📋 New Quote — ${data.refNumber} from ${data.companyName} (${data.totalUnits} units)`, html)
}

// ── OUTBOUND: Quote confirmed → dealer only ───────────────────────────────
export async function sendQuoteConfirmedEmail(data: QuoteEmailData): Promise<void> {
  const html = emailWrapper(`
    <p style="font-size:15px;margin:0 0 6px;">Hi ${data.dealerName.split(' ')[0]},</p>
    <p style="font-size:15px;line-height:1.6;margin:0 0 20px;">Great news — your quote has been <strong style="color:#166534;">confirmed</strong>. Our team has reviewed availability and is ready to proceed.</p>
    <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:14px 18px;margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Quote Reference</div>
      ${refBadge(data.refNumber)}
    </div>
    ${lineItemsTable(data.items)}
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 18px;margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:800;color:#132347;">
        <span>Estimated Total (${data.totalUnits} units)</span>
        <span style="color:#c2410c;">$${data.totalValue.toLocaleString('en-US',{minimumFractionDigits:2})}</span>
      </div>
      <p style="font-size:12px;color:#94a3b8;margin:8px 0 0;">Final pricing confirmed at fulfillment. Subject to availability.</p>
    </div>
    <p style="font-size:14px;line-height:1.6;color:#475569;margin:0;">A member of our team will reach out shortly with next steps. Questions? Reply to this email.</p>
  `)
  await sendEmail(data.dealerEmail, `✓ Quote Confirmed — ${data.refNumber} | AeroWholesale`, html)
}

// ── OUTBOUND: Quote processing → dealer only ──────────────────────────────
export async function sendQuoteProcessingEmail(data: QuoteEmailData): Promise<void> {
  const html = emailWrapper(`
    <p style="font-size:15px;margin:0 0 6px;">Hi ${data.dealerName.split(' ')[0]},</p>
    <p style="font-size:15px;line-height:1.6;margin:0 0 20px;">We're processing your quote request and confirming stock availability and final pricing.</p>
    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px 18px;margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;color:#1e40af;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Quote Reference</div>
      ${refBadge(data.refNumber)}
      <div style="font-size:13px;color:#3b82f6;margin-top:10px;font-weight:600;">⟳ Processing — expect an update within 24 hours</div>
    </div>
    <p style="font-size:13px;color:#64748b;line-height:1.6;margin:0;">Your quote covers <strong>${data.totalUnits} units</strong> across <strong>${data.items.length} line item${data.items.length !== 1 ? 's' : ''}</strong>. We'll follow up as soon as confirmed. Questions? Reply anytime.</p>
  `)
  await sendEmail(data.dealerEmail, `⟳ Your Quote is Being Processed — ${data.refNumber} | AeroWholesale`, html)
}

// ── OUTBOUND: Quote declined → dealer only ────────────────────────────────
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
    <p style="font-size:15px;line-height:1.6;margin:0 0 20px;">Thank you for your quote request. Unfortunately we're unable to fulfill this request at this time.</p>
    <div style="background:#fff1f2;border:1px solid #fecdd3;border-radius:8px;padding:14px 18px;margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;color:#9f1239;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Quote Reference</div>
      ${refBadge(data.refNumber)}
      <div style="font-size:13px;color:#dc2626;margin-top:10px;font-weight:600;">Reason: ${reasonText}</div>
    </div>
    <p style="font-size:14px;line-height:1.6;color:#475569;margin:0;">If you'd like to discuss alternatives or adjust your request, simply reply to this email and we'll get back to you promptly.</p>
  `)
  await sendEmail(data.dealerEmail, `Quote Request Update — ${data.refNumber} | AeroWholesale`, html)
}