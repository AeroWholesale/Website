import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const payload = req.body

    if (req.method === 'POST') {
      console.log('SC Webhook received:', JSON.stringify(payload).slice(0, 500))
    }

    res.status(200).json({
      data: {
        id: 1,
        scope: "store/cart/converted",
        destination: "https://bi.delta.sellercloud.com/WebSiteCartWebHookReceiver.aspx",
        is_active: true
      },
      meta: {}
    })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
}