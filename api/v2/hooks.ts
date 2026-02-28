import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const payload = req.body

    console.log('SC Webhook received:', JSON.stringify(payload).slice(0, 500))

    // TODO: Process the SellerCloud cart/order data here

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