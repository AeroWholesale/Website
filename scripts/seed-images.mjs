const IMAGE_MAP = [
  // ── iPhone 16 series ────────────────────────────────────────────────────────
  { match: 'iphone 16 pro max', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-deserttitanium?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 16 pro',     url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 16 plus',    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-plus-finish-select-202409-6-7inch-ultramarine?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 16',         url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-1inch-ultramarine?wid=400&hei=400&fmt=png-alpha' },
  // ── iPhone 15 series ────────────────────────────────────────────────────────
  { match: 'iphone 15 pro max', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 15 pro',     url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 15 plus',    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-finish-select-202309-6-7inch-pink?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 15',         url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=400&hei=400&fmt=png-alpha' },
  // ── iPhone 14 series ────────────────────────────────────────────────────────
  { match: 'iphone 14 pro max', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 14 pro',     url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 14 plus',    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-plus-finish-select-202209-6-7inch-midnight?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 14',         url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-midnight?wid=400&hei=400&fmt=png-alpha' },
  // ── iPhone 13 series ────────────────────────────────────────────────────────
  { match: 'iphone 13 pro max', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-finish-select-202207-6-7inch-sierrablue?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 13 pro',     url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-finish-select-202207-6-1inch-sierrablue?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 13 mini',    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-mini-finish-select-202207-5-4inch-midnight?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 13',         url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-6-1inch-midnight?wid=400&hei=400&fmt=png-alpha' },
  // ── iPhone 12 series ────────────────────────────────────────────────────────
  { match: 'iphone 12 pro max', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-max-gold-select-2020?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 12 pro',     url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-gold-select-2020?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 12 mini',    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-mini-blue-select-2020?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 12',         url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-blue-select-2020?wid=400&hei=400&fmt=png-alpha' },
  // ── iPhone 11 series ────────────────────────────────────────────────────────
  { match: 'iphone 11 pro max', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-max-select-2019?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 11 pro',     url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-pro-select-2019?wid=400&hei=400&fmt=png-alpha' },
  { match: 'iphone 11',         url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-11-purple-select-2019?wid=400&hei=400&fmt=png-alpha' },
  // ── iPhone SE ────────────────────────────────────────────────────────────────
  { match: 'iphone se',         url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-starlight-select-202203?wid=400&hei=400&fmt=png-alpha' },
  // ── iPad Pro ─────────────────────────────────────────────────────────────────
  { match: 'ipad pro 13',       url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-select-wifi-spacegray-202405?wid=400&hei=400&fmt=png-alpha' },
  { match: 'ipad pro 12.9',     url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-9-select-cell-spacegray-202104?wid=400&hei=400&fmt=png-alpha' },
  { match: 'ipad pro 11',       url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-select-wifi-spacegray-202405?wid=400&hei=400&fmt=png-alpha' },
  // ── iPad Air ─────────────────────────────────────────────────────────────────
  { match: 'ipad air 13',       url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-13-select-wifi-blue-202405?wid=400&hei=400&fmt=png-alpha' },
  { match: 'ipad air',          url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202405?wid=400&hei=400&fmt=png-alpha' },
  // ── iPad mini ────────────────────────────────────────────────────────────────
  { match: 'ipad mini 7',       url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-select-wifi-blue-202410?wid=400&hei=400&fmt=png-alpha' },
  { match: 'ipad mini 6',       url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-select-wifi-purple-202109?wid=400&hei=400&fmt=png-alpha' },
  { match: 'ipad mini',         url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-select-wifi-blue-202410?wid=400&hei=400&fmt=png-alpha' },
  // ── iPad (standard) ──────────────────────────────────────────────────────────
  { match: 'ipad 10',           url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-blue-wifi?wid=400&hei=400&fmt=png-alpha' },
  { match: 'ipad 9',            url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-9th-gen-finish-select-202109-silver-wifi?wid=400&hei=400&fmt=png-alpha' },
  { match: 'ipad',              url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-blue-wifi?wid=400&hei=400&fmt=png-alpha' },
  // ── MacBook Pro ─────────────────────────────────────────────────────────────
  { match: 'macbook pro 16',    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202310?wid=400&hei=400&fmt=png-alpha' },
  { match: 'macbook pro 14',    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=400&hei=400&fmt=png-alpha' },
  { match: 'macbook pro 13',    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp13-spacegray-select-202108?wid=400&hei=400&fmt=png-alpha' },
  { match: 'macbook pro',       url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=400&hei=400&fmt=png-alpha' },
  // ── MacBook Air ─────────────────────────────────────────────────────────────
  { match: 'macbook air 15',    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202306?wid=400&hei=400&fmt=png-alpha' },
  { match: 'macbook air 13',    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=400&hei=400&fmt=png-alpha' },
  { match: 'macbook air',       url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=400&hei=400&fmt=png-alpha' },
  // ── Mac Mini / Mac Studio / iMac ────────────────────────────────────────────
  { match: 'mac mini',          url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-mini-select-202501?wid=400&hei=400&fmt=png-alpha' },
  { match: 'mac studio',        url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-studio-select-202306?wid=400&hei=400&fmt=png-alpha' },
  { match: 'imac',              url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202310?wid=400&hei=400&fmt=png-alpha' },
  // ── Apple Watch ─────────────────────────────────────────────────────────────
  { match: 'apple watch ultra',    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra2-select-202309?wid=400&hei=400&fmt=png-alpha' },
  { match: 'apple watch series 9', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-select-202309?wid=400&hei=400&fmt=png-alpha' },
  { match: 'apple watch series 8', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s8-select-202209?wid=400&hei=400&fmt=png-alpha' },
  { match: 'apple watch series 7', url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s7-select-202109?wid=400&hei=400&fmt=png-alpha' },
  { match: 'apple watch se',       url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-se-select-202209?wid=400&hei=400&fmt=png-alpha' },
  { match: 'apple watch',          url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-select-202309?wid=400&hei=400&fmt=png-alpha' },
  // ── AirPods ──────────────────────────────────────────────────────────────────
  { match: 'airpods pro',       url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2-hero-select-202409?wid=400&hei=400&fmt=png-alpha' },
  { match: 'airpods max',       url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-hero-select-202409?wid=400&hei=400&fmt=png-alpha' },
  { match: 'airpods',           url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-hero-select-202409?wid=400&hei=400&fmt=png-alpha' },
  // ── Samsung Galaxy S ─────────────────────────────────────────────────────────
  { match: 'galaxy s24 ultra',  url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/07192023/galaxy-s24-ultra/02252024/gallery/01_S24U_Titanium_Black.jpg' },
  { match: 'galaxy s24+',       url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/07192023/galaxy-s24/02252024/gallery/01_S24_Cobalt_Violet.jpg' },
  { match: 'galaxy s24',        url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/07192023/galaxy-s24/02252024/gallery/01_S24_Cobalt_Violet.jpg' },
  { match: 'galaxy s23 ultra',  url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/02/01/2023/Galaxy_S23_Ultra_Hero_Image_Phantom_Black.jpg' },
  { match: 'galaxy s23+',       url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/02/01/2023/galaxy-s23/02012023/01_S23_Phantom_Black.jpg' },
  { match: 'galaxy s23',        url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/02/01/2023/galaxy-s23/02012023/01_S23_Phantom_Black.jpg' },
  { match: 'galaxy s22 ultra',  url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/02092022/02092022/GalaxyS22Ultra_PhantomBlack_Front.jpg' },
  { match: 'galaxy s22+',       url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/02092022/02092022/GalaxyS22Plus_PhantomBlack_Front.jpg' },
  { match: 'galaxy s22',        url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-s/buy/02092022/02092022/GalaxyS22_PhantomBlack_Front.jpg' },
  { match: 'galaxy a55',        url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-a/all-galaxy-a/03062024/Galaxy_A55_5G_Iceblue.jpg' },
  { match: 'galaxy a54',        url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-a/all-galaxy-a/03172023/Galaxy_A54_5G_Awesome_Graphite.jpg' },
  { match: 'galaxy a53',        url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-a/all-galaxy-a/03172022/Galaxy_A53_5G_Awesome_Graphite.jpg' },
  { match: 'galaxy a34',        url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-a/all-galaxy-a/03172023/Galaxy_A34_5G_Awesome_Graphite.jpg' },
  { match: 'galaxy a15',        url: 'https://image-us.samsung.com/SamsungUS/home/mobile/galaxy-a/all-galaxy-a/01242024/Galaxy_A15_5G_Blue_Black.jpg' },
  { match: 'galaxy tab s9 ultra', url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-s/08162023/Galaxy_Tab_S9_Ultra_Graphite.jpg' },
  { match: 'galaxy tab s9+',    url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-s/08162023/Galaxy_Tab_S9_Plus_Graphite.jpg' },
  { match: 'galaxy tab s9',     url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-s/08162023/Galaxy_Tab_S9_Graphite.jpg' },
  { match: 'galaxy tab s8',     url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-s/02092022/GalaxyTabS8_Graphite.jpg' },
  { match: 'galaxy tab a9',     url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-a/10032023/Galaxy_Tab_A9_Plus_Graphite.jpg' },
  { match: 'galaxy tab a8',     url: 'https://image-us.samsung.com/SamsungUS/home/mobile/tablets/galaxy-tab-a/01062022/GalaxyTabA8_Graphite.jpg' },
  { match: 'pixel 9 pro xl',    url: 'https://lh3.googleusercontent.com/6GI3ORrSb5sZMRuFwZwI3OoJXRSMoUn0SqYGN6pKGzTBLqELwJZKNERLdXXWBqxnpVjJYR8kqSiO' },
  { match: 'pixel 9 pro',       url: 'https://lh3.googleusercontent.com/Nu0U0j2oKEZQ5J5MPXF7BqjOLOULZJH0zzB2I5LZMLS5MNVVvqjcR0_dCfOhpHGCPPjdSHTnRJbQ' },
  { match: 'pixel 9',           url: 'https://lh3.googleusercontent.com/lJR45NQTL8EVPIZ_tNZBL7Ybpb0T00m0A83zw0_o_q6CRFgBCVJcM6N0aN47oDVLU9YjqHdRjBl4' },
  { match: 'pixel 8 pro',       url: 'https://lh3.googleusercontent.com/DR71KSGhLDl7e2BDXQX7MDsaFkFHrK6sKXTH_JyRzrH56qGb87wfq0j3h_8R1v9f4yI0AxZ7WJrc' },
  { match: 'pixel 8',           url: 'https://lh3.googleusercontent.com/vZhNxJSzNhkLWrJqhOo4DjDnvMtGzZXAR5KQhIrPiYuqvZjfGe1yFGnH3yAy3-YKHb1UPQ4mW1Y' },
  { match: 'pixel 7 pro',       url: 'https://lh3.googleusercontent.com/CKhVe6qAVhTSYn0TFXjZPx4RBNGLMbHOv4QT3YV5NDe1IaY0GVlqAVVPlCvwWADU5Y0vS9xJg1Y' },
  { match: 'pixel 7',           url: 'https://lh3.googleusercontent.com/JKzVNHqNdTjVfYZlJmKfMVK5BzL3UPRuDUgkXzVzVEKpkDGiFZzO9Tn4B_RrNbWEZQ0vSEHOAEp' },
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
      if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode))
      const chunks = []
      res.on('data', c => chunks.push(c))
      res.on('end', () => resolve({ buffer: Buffer.concat(chunks), contentType: res.headers['content-type'] || 'image/jpeg' }))
      res.on('error', reject)
    }).on('error', reject)
  })
}

function extFromContentType(ct) {
  if (ct.includes('png')) return '.png'
  if (ct.includes('webp')) return '.webp'
  return '.jpg'
}

async function main() {
  const required = ['DATABASE_URL','R2_ACCOUNT_ID','R2_ACCESS_KEY_ID','R2_SECRET_ACCESS_KEY','R2_BUCKET','R2_PUBLIC_URL']
  for (const k of required) {
    if (!DRY_RUN && !process.env[k]) { console.error('Missing: ' + k); process.exit(1) }
  }
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const s3 = DRY_RUN ? null : new S3Client({
    region: 'auto',
    endpoint: 'https://' + process.env.R2_ACCOUNT_ID + '.r2.cloudflarestorage.com',
    credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY },
  })
  const where = MISSING_ONLY ? "WHERE image_url IS NULL OR image_url = ''" : ''
  const { rows } = await pool.query('SELECT model_code, name FROM product_families ' + where + ' ORDER BY name')
  console.log('\n Found ' + rows.length + ' families\n')
  let matched = 0, skipped = 0, uploaded = 0, errors = 0
  for (const fam of rows) {
    const src = matchImage(fam.name)
    if (!src) { console.log('  -- No match: ' + fam.name); skipped++; continue }
    matched++
    if (DRY_RUN) { console.log('  OK ' + fam.name + ' -> ' + src); continue }
    const hash = createHash('md5').update(src).digest('hex').slice(0,8)
    const slug = fam.model_code.toLowerCase().replace(/[^a-z0-9]/g,'-')
    try {
      const { buffer, contentType } = await download(src)
      const key = 'products/' + slug + '-' + hash + extFromContentType(contentType)
      const pub = process.env.R2_PUBLIC_URL.replace(/\/$/,'') + '/' + key
      let exists = false
      try { await s3.send(new HeadObjectCommand({ Bucket: process.env.R2_BUCKET, Key: key })); exists = true } catch {}
      if (!exists) await s3.send(new PutObjectCommand({ Bucket: process.env.R2_BUCKET, Key: key, Body: buffer, ContentType: contentType, CacheControl: 'public, max-age=31536000' }))
      await pool.query('UPDATE product_families SET image_url = $1 WHERE model_code = $2', [pub, fam.model_code])
      uploaded++
      console.log('  OK ' + fam.name + (exists ? ' (cached)' : ''))
    } catch(e) { errors++; console.error('  ERR ' + fam.name + ': ' + e.message) }
  }
  console.log('\nMatched: ' + matched + '  Skipped: ' + skipped + '  Uploaded: ' + uploaded + '  Errors: ' + errors + '\n')
  await pool.end()
}

main().catch(e => { console.error(e); process.exit(1) })