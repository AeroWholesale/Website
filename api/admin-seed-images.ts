/**
 * POST /api/admin-seed-images
 * Seeds product_families.image_url from press images → Cloudflare R2
 * Protected by ADMIN_SECRET env var (send as X-Admin-Secret header)
 *
 * Body: { missingOnly?: boolean }
 * Returns: { matched, uploaded, skipped, errors, details[] }
 */
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import https from 'https'
import http from 'http'
import { createHash } from 'crypto'

const IMAGE_MAP: Array<{ match: string; url: string }> = [
  { match: 'iphone 16 pro max', url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 16 pro',     url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 16 plus',    url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-16-plus-finish-select-202409-6-7inch-ultramarine?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 16',         url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 15 pro max', url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 15 pro',     url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 15 plus',    url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-15-plus-finish-select-202309-6-7inch-pink?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 15',         url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 14 pro max', url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 14 pro',     url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 14 plus',    url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-14-plus-finish-select-202209-6-7inch-midnight?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 14',         url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-midnight?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 13 pro max', url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-13-pro-finish-select-202207-6-7inch-sierrablue?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 13 pro',     url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-13-pro-finish-select-202207-6-1inch-sierrablue?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 13 mini',    url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-13-mini-finish-select-202207-5-4inch-midnight?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 13',         url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-13-finish-select-202207-6-1inch-midnight?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 12 pro max', url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-12-pro-max-gold-select-2020?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 12 pro',     url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-12-pro-gold-select-2020?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 12 mini',    url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-12-mini-blue-select-2020?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 12',         url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-12-blue-select-2020?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 11 pro max', url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-11-pro-max-select-2019?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 11 pro',     url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-11-pro-select-2019?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 11',         url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-11-purple-select-2019?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone se',         url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/iphone-se-starlight-select-202203?wid=400&hei=400&fmt=png-alpha' },
  { match: 'ipad pro 13',       url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/ipad-pro-13-select-wifi-spacegray-202405?wid=400&hei=400&fmt=png-alpha' },
  { match: 'ipad pro 12.9',     url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/ipad-pro-12-9-select-cell-spacegray-202104?wid=400&hei=400&fmt=png-alpha' },
  { match: 'ipad pro 11',       url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/ipad-pro-11-select-wifi-spacegray-202405?wid=400&hei=400&fmt=png-alpha' },
  { match: 'ipad air 13',       url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/ipad-air-13-select-wifi-blue-202405?wid=400&hei=400&fmt=png-alpha' },
  { match: 'ipad air',          url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/ipad-air-select-wifi-blue-202405?wid=400&hei=400&fmt=png-alpha' },
  { match: 'ipad mini',         url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/ipad-mini-select-wifi-blue-202410?wid=400&hei=400&fmt=png-alpha' },
  { match: 'ipad (10th',        url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-blue-wifi?wid=400&hei=400&fmt=png-alpha' },
  { match: 'ipad (9th',         url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/ipad-9th-gen-finish-select-202109-silver-wifi?wid=400&hei=400&fmt=png-alpha' },
  { match: 'ipad (8th',         url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/ipad-8th-gen-finish-select-202009-silver-wifi?wid=400&hei=400&fmt=png-alpha' },
  { match: 'ipad (7th',         url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/ipad-7th-gen-finish-select-201910-silver-wifi?wid=400&hei=400&fmt=png-alpha' },
  { match: 'ipad',              url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-blue-wifi?wid=400&hei=400&fmt=png-alpha' },
  { match: 'macbook pro (16',   url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/mbp16-spacegray-select-202310?wid=400&hei=400&fmt=png-alpha' },
  { match: 'macbook pro (14',   url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=400&hei=400&fmt=png-alpha' },
  { match: 'macbook pro (13',   url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/mbp13-spacegray-select-202108?wid=400&hei=400&fmt=png-alpha' },
  { match: 'macbook pro',       url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=400&hei=400&fmt=png-alpha' },
  { match: 'macbook air (15',   url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/mba15-midnight-select-202306?wid=400&hei=400&fmt=png-alpha' },
  { match: 'macbook air (13',   url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/mba13-midnight-select-202402?wid=400&hei=400&fmt=png-alpha' },
  { match: 'macbook air',       url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/mba13-midnight-select-202402?wid=400&hei=400&fmt=png-alpha' },
  { match: 'mac mini',          url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/mac-mini-select-202501?wid=400&hei=400&fmt=png-alpha' },
  { match: 'mac studio',        url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/mac-studio-select-202306?wid=400&hei=400&fmt=png-alpha' },
  { match: 'imac',              url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/imac-24-blue-selection-hero-202310?wid=400&hei=400&fmt=png-alpha' },
  { match: 'apple watch ultra',    url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/watch-ultra2-select-202309?wid=400&hei=400&fmt=png-alpha' },
  { match: 'apple watch series 9', url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/watch-s9-select-202309?wid=400&hei=400&fmt=png-alpha' },
  { match: 'apple watch series 8', url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/watch-s8-select-202209?wid=400&hei=400&fmt=png-alpha' },
  { match: 'apple watch series 7', url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/watch-s7-select-202109?wid=400&hei=400&fmt=png-alpha' },
  { match: 'apple watch series 6', url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/watch-s6-select-202009?wid=400&hei=400&fmt=png-alpha' },
  { match: 'apple watch se',       url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/watch-se-select-202209?wid=400&hei=400&fmt=png-alpha' },
  { match: 'apple watch',          url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/watch-s9-select-202309?wid=400&hei=400&fmt=png-alpha' },
  { match: 'airpods pro',       url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/airpods-pro-2-hero-select-202409?wid=400&hei=400&fmt=png-alpha' },
  { match: 'airpods max',       url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/airpods-max-hero-select-202409?wid=400&hei=400&fmt=png-alpha' },
  { match: 'airpods',           url: 'https://store.storeimages.cdn-apple.com/8567/as-images.apple.com/is/airpods-4-hero-select-202409?wid=400&hei=400&fmt=png-alpha' },
  { match: 'galaxy s24 ultra',   url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/07192023/galaxy-s24-ultra/02252024/gallery/01_S24U_Titanium_Black.jpg' },
  { match: 'galaxy s24+',        url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/07192023/galaxy-s24/02252024/gallery/01_S24Plus_Cobalt_Violet.jpg' },
  { match: 'galaxy s24',         url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/07192023/galaxy-s24/02252024/gallery/01_S24_Cobalt_Violet.jpg' },
  { match: 'galaxy s23 ultra',   url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/02/01/2023/Galaxy_S23_Ultra_Hero_Image_Phantom_Black.jpg' },
  { match: 'galaxy s23+',        url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/02/01/2023/galaxy-s23/02012023/01_S23_Phantom_Black.jpg' },
  { match: 'galaxy s23',         url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/02/01/2023/galaxy-s23/02012023/01_S23_Phantom_Black.jpg' },
  { match: 'galaxy a55',         url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-a/all-galaxy-a/03062024/Galaxy_A55_5G_Iceblue.jpg' },
  { match: 'galaxy a54',         url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-a/all-galaxy-a/03172023/Galaxy_A54_5G_Awesome_Graphite.jpg' },
  { match: 'galaxy a53',         url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-a/all-galaxy-a/03172022/Galaxy_A53_5G_Awesome_Graphite.jpg' },
  { match: 'galaxy tab s9 ultra', url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-s/08162023/Galaxy_Tab_S9_Ultra_Graphite.jpg' },
  { match: 'galaxy tab s9+',      url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-s/08162023/Galaxy_Tab_S9_Plus_Graphite.jpg' },
  { match: 'galaxy tab s9',       url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-s/08162023/Galaxy_Tab_S9_Graphite.jpg' },
  { match: 'galaxy tab s8',       url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-s/02092022/GalaxyTabS8_Graphite.jpg' },
  { match: 'galaxy tab a9',       url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-a/10032023/Galaxy_Tab_A9_Plus_Graphite.jpg' },
  { match: 'galaxy tab a8',       url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-a/01062022/GalaxyTabA8_Graphite.jpg' },
]

function matchImage(name: string): string | null {
  const lower = name.toLowerCase()
  for (const entry of IMAGE_MAP) {
    if (lower.includes(entry.match)) return entry.url
  }
  return null
}

function download(url: string): Promise<{ buffer: Buffer; contentType: string }> {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    lib.get(url, { headers: { 'User-Agent': 'AeroWholesale-ImageBot/1.0' } }, (res: any) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`))
      const chunks: Buffer[] = []
      res.on('data', (c: Buffer) => chunks.push(c))
      res.on('end', () => resolve({ buffer: Buffer.concat(chunks), contentType: res.headers['content-type'] || 'image/jpeg' }))
      res.on('error', reject)
    }).on('error', reject)
  })
}

function extFromContentType(ct: string): string {
  if (ct.includes('png'))  return '.png'
  if (ct.includes('webp')) return '.webp'
  return '.jpg'
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const secret = req.headers['x-admin-secret']
  if (process.env.ADMIN_SECRET && secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { missingOnly = true } = req.body || {}

  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  })

  const whereClause = missingOnly ? `WHERE image_url IS NULL OR image_url = ''` : ''
  const { rows: families } = await pool.query(
    `SELECT model_code, name FROM product_families ${whereClause} ORDER BY name`
  )

  const details: Array<{ name: string; status: string; url?: string; error?: string }> = []
  let matched = 0, uploaded = 0, skipped = 0, errors = 0

  for (const fam of families) {
    const pressUrl = matchImage(fam.name)
    if (!pressUrl) {
      skipped++
      details.push({ name: fam.name, status: 'no_match' })
      continue
    }
    matched++

    try {
      const { buffer, contentType } = await download(pressUrl)
      const ext = extFromContentType(contentType)
      const hash = createHash('md5').update(pressUrl).digest('hex').slice(0, 8)
      const slug = fam.model_code.toLowerCase().replace(/[^a-z0-9]/g, '-')
      const key = `products/${slug}-${hash}${ext}`
      const publicUrl = `${(process.env.R2_PUBLIC_URL || '').replace(/\/$/, '')}/${key}`

      let alreadyExists = false
      try {
        await s3.send(new HeadObjectCommand({ Bucket: process.env.R2_BUCKET!, Key: key }))
        alreadyExists = true
      } catch {}

      if (!alreadyExists) {
        await s3.send(new PutObjectCommand({
          Bucket: process.env.R2_BUCKET!,
          Key: key,
          Body: buffer,
          ContentType: contentType,
          CacheControl: 'public, max-age=31536000',
        }))
      }

      await pool.query(
        'UPDATE product_families SET image_url = $1 WHERE model_code = $2',
        [publicUrl, fam.model_code]
      )

      uploaded++
      details.push({ name: fam.name, status: alreadyExists ? 'cached' : 'uploaded', url: publicUrl })
    } catch (err: any) {
      errors++
      details.push({ name: fam.name, status: 'error', error: err.message })
    }
  }

  await pool.end()

  res.status(200).json({ total: families.length, matched, uploaded, skipped, errors, details })
}
