import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { Pool } from '@neondatabase/serverless'
import https from 'https'
import http from 'http'
import { createHash } from 'crypto'

const DRY_RUN = process.argv.includes('--dry-run')
const MISSING_ONLY = process.argv.includes('--missing')

const IMAGE_MAP = [
  { match: 'iphone 16 pro max', url: 'https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-240909_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 16 pro',     url: 'https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-240909_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 16 plus',    url: 'https://www.apple.com/newsroom/images/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/article/Apple-iPhone-16-and-iPhone-16-Plus-hero-240909_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 16',         url: 'https://www.apple.com/newsroom/images/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/article/Apple-iPhone-16-and-iPhone-16-Plus-hero-240909_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 15 pro max', url: 'https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 15 pro',     url: 'https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 15 plus',    url: 'https://www.apple.com/newsroom/images/2023/09/apple-introduces-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-and-iPhone-15-Plus-hero-230912_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 15',         url: 'https://www.apple.com/newsroom/images/2023/09/apple-introduces-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-and-iPhone-15-Plus-hero-230912_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 14 pro max', url: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-hero-220907_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 14 pro',     url: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-hero-220907_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 14 plus',    url: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-and-Apple-iPhone-14-Plus-hero-220907_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 14',         url: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-and-Apple-iPhone-14-Plus-hero-220907_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 13 pro max', url: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_hero_09142021_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 13 pro',     url: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_hero_09142021_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 13 mini',    url: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13_09142021_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 13',         url: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13_09142021_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 12 pro max', url: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-12-Pro_Oct2020_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 12 pro',     url: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-12-Pro_Oct2020_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 12 mini',    url: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-12_Oct2020_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 12',         url: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-12_Oct2020_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone 11 pro max', url: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone11Pro_LandscapeSpaceGray_092019.jpg.large.jpg' },
  { match: 'iphone 11 pro',     url: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone11Pro_LandscapeSpaceGray_092019.jpg.large.jpg' },
  { match: 'iphone 11',         url: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone11_purple_092019_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone se 3',       url: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-SE-hero-220308_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'iphone se',         url: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-SE-hero-220308_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'ipad pro 13',       url: 'https://www.apple.com/newsroom/images/2024/05/apple-unveils-stunning-new-ipad-pro-with-m4-chip/article/Apple-iPad-Pro-hero-240507_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'ipad pro 12.9',     url: 'https://www.apple.com/newsroom/images/product/ipad/standard/Apple_iPad-Pro_4thGen_Hero_03252021_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'ipad pro 11',       url: 'https://www.apple.com/newsroom/images/2024/05/apple-unveils-stunning-new-ipad-pro-with-m4-chip/article/Apple-iPad-Pro-hero-240507_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'ipad air 13',       url: 'https://www.apple.com/newsroom/images/2024/03/apple-unveils-the-new-13-inch-ipad-air/article/Apple-iPad-Air-13-in-hero-240308_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'ipad air',          url: 'https://www.apple.com/newsroom/images/product/ipad/standard/Apple_iPad-Air_4thGen_Hero_10202020_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'ipad mini 7',       url: 'https://www.apple.com/newsroom/images/2024/10/apple-introduces-ipad-mini-with-apple-intelligence/article/Apple-iPad-mini-hero-241023_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'ipad mini 6',       url: 'https://www.apple.com/newsroom/images/product/ipad/standard/Apple_new-iPad-mini-wifi-cellular_09142021_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'ipad mini 5',       url: 'https://www.apple.com/newsroom/images/product/ipad/standard/Apple_New-iPad-mini_03182019_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'ipad mini',         url: 'https://www.apple.com/newsroom/images/product/ipad/standard/Apple_new-iPad-mini-wifi-cellular_09142021_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'ipad 10',           url: 'https://www.apple.com/newsroom/images/product/ipad/standard/Apple_iPad-10Gen-WiFi-Cellular_hero_10182022_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'ipad 9',            url: 'https://www.apple.com/newsroom/images/product/ipad/standard/Apple_iPad-9Gen_WiFi_09142021_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'ipad 8',            url: 'https://www.apple.com/newsroom/images/product/ipad/standard/Apple_iPad-8thGen_Silver_09152020_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'ipad 7',            url: 'https://www.apple.com/newsroom/images/product/ipad/standard/Apple_iPad-7Gen_SpaceGray_09102019_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'macbook pro 16',    url: 'https://www.apple.com/newsroom/images/2023/10/apple-unveils-new-macbook-pro-featuring-m3-chips/article/Apple-MacBook-Pro-hero-231030_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'macbook pro 14',    url: 'https://www.apple.com/newsroom/images/2023/10/apple-unveils-new-macbook-pro-featuring-m3-chips/article/Apple-MacBook-Pro-hero-231030_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'macbook pro 13',    url: 'https://www.apple.com/newsroom/images/product/mac/standard/Apple_MacBook-Pro_13in_hero_04202021_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'macbook pro',       url: 'https://www.apple.com/newsroom/images/2023/10/apple-unveils-new-macbook-pro-featuring-m3-chips/article/Apple-MacBook-Pro-hero-231030_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'macbook air 15',    url: 'https://www.apple.com/newsroom/images/2023/06/apple-introduces-15-inch-macbook-air/article/Apple-WWDC23-MacBook-Air-15-in-hero-230605_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'macbook air 13',    url: 'https://www.apple.com/newsroom/images/product/mac/standard/Apple_MacBook-Air-M2_hero_06062022_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'macbook air',       url: 'https://www.apple.com/newsroom/images/product/mac/standard/Apple_MacBook-Air-M2_hero_06062022_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'mac mini',          url: 'https://www.apple.com/newsroom/images/2025/01/apple-introduces-mac-mini-with-m4/article/Apple-Mac-mini-hero-240107_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'mac studio',        url: 'https://www.apple.com/newsroom/images/product/mac/standard/Apple-Mac-Studio-hero-220308_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'imac',              url: 'https://www.apple.com/newsroom/images/product/mac/standard/Apple_iMac-24in_M1_hero_04202021_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'apple watch ultra',   url: 'https://www.apple.com/newsroom/images/product/watch/standard/Apple-Watch-Ultra-2-hero-230912_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'apple watch series 9', url: 'https://www.apple.com/newsroom/images/product/watch/standard/Apple-Watch-Series-9-hero-230912_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'apple watch series 8', url: 'https://www.apple.com/newsroom/images/product/watch/standard/Apple-Watch-Series-8-hero-220907_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'apple watch series 7', url: 'https://www.apple.com/newsroom/images/product/watch/standard/Apple-Watch-Series-7-hero-09142021_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'apple watch se',     url: 'https://www.apple.com/newsroom/images/product/watch/standard/Apple-Watch-SE-hero-220907_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'apple watch',        url: 'https://www.apple.com/newsroom/images/product/watch/standard/Apple-Watch-Series-9-hero-230912_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'airpods pro',        url: 'https://www.apple.com/newsroom/images/product/airpods/standard/Apple-AirPods-Pro-2nd-gen-hero-220907_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'airpods max',        url: 'https://www.apple.com/newsroom/images/product/airpods/standard/Apple-AirPods-Max-hero-221018_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'airpods',            url: 'https://www.apple.com/newsroom/images/product/airpods/standard/Apple-AirPods-3rd-gen-hero-211018_Full-Bleed-Image.jpg.large.jpg' },
  { match: 'galaxy s24 ultra',   url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/07192023/galaxy-s24-ultra/02252024/gallery/01_S24U_Titanium_Black.jpg' },
  { match: 'galaxy s24+',        url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/07192023/galaxy-s24/02252024/gallery/01_S24_Cobalt_Violet.jpg' },
  { match: 'galaxy s24',         url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/07192023/galaxy-s24/02252024/gallery/01_S24_Cobalt_Violet.jpg' },
  { match: 'galaxy s23 ultra',   url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/02/01/2023/Galaxy_S23_Ultra_Hero_Image_Phantom_Black.jpg' },
  { match: 'galaxy s23+',        url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/02/01/2023/galaxy-s23/02012023/01_S23_Phantom_Black.jpg' },
  { match: 'galaxy s23',         url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/02/01/2023/galaxy-s23/02012023/01_S23_Phantom_Black.jpg' },
  { match: 'galaxy s22 ultra',   url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/02092022/02092022/GalaxyS22Ultra_PhantomBlack_Front.jpg' },
  { match: 'galaxy s22+',        url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/02092022/02092022/GalaxyS22Plus_PhantomBlack_Front.jpg' },
  { match: 'galaxy s22',         url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/02092022/02092022/GalaxyS22_PhantomBlack_Front.jpg' },
  { match: 'galaxy a55',         url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-a/all-galaxy-a/03062024/Galaxy_A55_5G_Iceblue.jpg' },
  { match: 'galaxy a54',         url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-a/all-galaxy-a/03172023/Galaxy_A54_5G_Awesome_Graphite.jpg' },
  { match: 'galaxy a53',         url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-a/all-galaxy-a/03172022/Galaxy_A53_5G_Awesome_Graphite.jpg' },
  { match: 'galaxy a34',         url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-a/all-galaxy-a/03172023/Galaxy_A34_5G_Awesome_Graphite.jpg' },
  { match: 'galaxy a32',         url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-a/all-galaxy-a/galaxy-a32/01122021/GalaxyA32_Awesome_Black.jpg' },
  { match: 'galaxy a15',         url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-a/all-galaxy-a/01242024/Galaxy_A15_5G_Blue_Black.jpg' },
  { match: 'galaxy tab s9 ultra', url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-s/08162023/Galaxy_Tab_S9_Ultra_Graphite.jpg' },
  { match: 'galaxy tab s9+',      url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-s/08162023/Galaxy_Tab_S9_Plus_Graphite.jpg' },
  { match: 'galaxy tab s9',       url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-s/08162023/Galaxy_Tab_S9_Graphite.jpg' },
  { match: 'galaxy tab s8 ultra', url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-s/02092022/GalaxyTabS8Ultra_Graphite.jpg' },
  { match: 'galaxy tab s8+',      url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-s/02092022/GalaxyTabS8Plus_Graphite.jpg' },
  { match: 'galaxy tab s8',       url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-s/02092022/GalaxyTabS8_Graphite.jpg' },
  { match: 'galaxy tab s7',       url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-s/05202021/GalaxyTabS7_Mystic_Black.jpg' },
  { match: 'galaxy tab a9',       url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-a/10032023/Galaxy_Tab_A9_Plus_Graphite.jpg' },
  { match: 'galaxy tab a8',       url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-a/01062022/GalaxyTabA8_Graphite.jpg' },
  { match: 'galaxy tab a7',       url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-a/galaxy-tab-a7/09182020/GalaxyTabA7_Gray.jpg' },
  { match: 'pixel 9 pro xl',     url: 'https://store.google.com/product/images/pixel_9_pro_xl.jpg' },
  { match: 'pixel 9 pro fold',   url: 'https://store.google.com/product/images/pixel_9_pro_fold.jpg' },
  { match: 'pixel 9 pro',        url: 'https://store.google.com/product/images/pixel_9_pro.jpg' },
  { match: 'pixel 9',            url: 'https://store.google.com/product/images/pixel_9.jpg' },
  { match: 'pixel 8 pro',        url: 'https://store.google.com/product/images/pixel_8_pro.jpg' },
  { match: 'pixel 8a',           url: 'https://store.google.com/product/images/pixel_8a.jpg' },
  { match: 'pixel 8',            url: 'https://store.google.com/product/images/pixel_8.jpg' },
  { match: 'pixel 7 pro',        url: 'https://store.google.com/product/images/pixel_7_pro.jpg' },
  { match: 'pixel 7a',           url: 'https://store.google.com/product/images/pixel_7a.jpg' },
  { match: 'pixel 7',            url: 'https://store.google.com/product/images/pixel_7.jpg' },
  { match: 'pixel 6 pro',        url: 'https://store.google.com/product/images/pixel_6_pro.jpg' },
  { match: 'pixel 6a',           url: 'https://store.google.com/product/images/pixel_6a.jpg' },
  { match: 'pixel 6',            url: 'https://store.google.com/product/images/pixel_6.jpg' },
]

function matchImage(name) {
  const lower = name.toLowerCase()
  for (const entry of IMAGE_MAP) {
    if (lower.includes(entry.match)) return entry.url
  }
  return null
}

function download(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    lib.get(url, { headers: { 'User-Agent': 'AeroWholesale-ImageBot/1.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`))
      const chunks = []
      res.on('data', c => chunks.push(c))
      res.on('end', () => resolve({ buffer: Buffer.concat(chunks), contentType: res.headers['content-type'] || 'image/jpeg' }))
      res.on('error', reject)
    }).on('error', reject)
  })
}

function extFromContentType(ct) {
  if (ct.includes('png'))  return '.png'
  if (ct.includes('webp')) return '.webp'
  if (ct.includes('gif'))  return '.gif'
  return '.jpg'
}

async function main() {
  const required = ['DATABASE_URL', 'R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET', 'R2_PUBLIC_URL']
  for (const k of required) {
    if (!DRY_RUN && !process.env[k]) { console.error(`Missing: ${k}`); process.exit(1) }
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const s3 = DRY_RUN ? null : new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY },
  })

  const whereClause = MISSING_ONLY ? `WHERE image_url IS NULL OR image_url = ''` : ''
  const { rows: families } = await pool.query(`SELECT model_code, name, image_url FROM product_families ${whereClause} ORDER BY name`)
  console.log(`\n📦 Found ${families.length} product families\n`)

  let matched = 0, skipped = 0, uploaded = 0, errors = 0

  for (const fam of families) {
    const pressUrl = matchImage(fam.name)
    if (!pressUrl) { console.log(`  ⬜ No match: ${fam.name}`); skipped++; continue }
    matched++
    if (DRY_RUN) { console.log(`  ✅ ${fam.name} → ${pressUrl}`); continue }

    const hash = createHash('md5').update(pressUrl).digest('hex').slice(0, 8)
    const slug = fam.model_code.toLowerCase().replace(/[^a-z0-9]/g, '-')
    try {
      const { buffer, contentType } = await download(pressUrl)
      const ext = extFromContentType(contentType)
      const key = `products/${slug}-${hash}${ext}`
      const publicUrl = `${process.env.R2_PUBLIC_URL.replace(/\/$/, '')}/${key}`
      let alreadyExists = false
      try { await s3.send(new HeadObjectCommand({ Bucket: process.env.R2_BUCKET, Key: key })); alreadyExists = true } catch {}
      if (!alreadyExists) {
        await s3.send(new PutObjectCommand({ Bucket: process.env.R2_BUCKET, Key: key, Body: buffer, ContentType: contentType, CacheControl: 'public, max-age=31536000' }))
      }
      await pool.query('UPDATE product_families SET image_url = $1 WHERE model_code = $2', [publicUrl, fam.model_code])
      uploaded++
      console.log(`  ✅ ${fam.name} → ${alreadyExists ? '(cached) ' : ''}${publicUrl}`)
    } catch (err) { errors++; console.error(`  ❌ ${fam.name}: ${err.message}`) }
  }

  console.log(`\n─────────────────────────────`)
  console.log(`  Matched:  ${matched}`)
  console.log(`  Skipped:  ${skipped}`)
  console.log(`  Uploaded: ${uploaded}`)
  console.log(`  Errors:   ${errors}`)
  console.log(`─────────────────────────────\n`)
  await pool.end()
}

main().catch(err => { console.error('Fatal:', err); process.exit(1) })