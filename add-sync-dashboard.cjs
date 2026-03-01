const fs = require('fs');

let admin = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

// 1. Add 'sync' to the page state type
admin = admin.replace(
  `const [page, setPage] = useState<'applications' | 'messages'>('applications')`,
  `const [page, setPage] = useState<'applications' | 'messages' | 'sync'>('applications')`
);

// 2. Add sync state variables after the toast state
admin = admin.replace(
  `const [toast, setToast] = useState<{ text: string; error?: boolean } | null>(null)`,
  `const [toast, setToast] = useState<{ text: string; error?: boolean } | null>(null)

  // Sync Dashboard state
  const [syncStatus, setSyncStatus] = useState<any>(null)
  const [syncLoading, setSyncLoading] = useState(false)
  const [catalogData, setCatalogData] = useState<any>(null)
  const [inventoryData, setInventoryData] = useState<any>(null)
  const [syncSearch, setSyncSearch] = useState('')
  const [syncSearching, setSyncSearching] = useState(false)
  const [syncTab, setSyncTab] = useState<'overview' | 'catalog' | 'inventory'>('overview')

  const testSCAuth = async () => {
    setSyncLoading(true)
    try {
      const res = await fetch('/api/sc/auth')
      setSyncStatus(await res.json())
    } catch (err) {
      setSyncStatus({ error: String(err) })
    } finally {
      setSyncLoading(false)
    }
  }

  const fetchSCCatalog = async (keyword?: string) => {
    setSyncSearching(true)
    try {
      const url = keyword ? \`/api/sc/catalog?size=20&active=false&keyword=\${encodeURIComponent(keyword)}\` : '/api/sc/catalog?size=20&active=false'
      const res = await fetch(url)
      setCatalogData(await res.json())
    } catch (err) {
      setCatalogData({ error: String(err) })
    } finally {
      setSyncSearching(false)
    }
  }

  const fetchSCInventory = async (keyword?: string) => {
    setSyncSearching(true)
    try {
      const url = keyword ? \`/api/sc/inventory?size=20&inStockOnly=true&keyword=\${encodeURIComponent(keyword)}\` : '/api/sc/inventory?size=20&inStockOnly=true'
      const res = await fetch(url)
      setInventoryData(await res.json())
    } catch (err) {
      setInventoryData({ error: String(err) })
    } finally {
      setSyncSearching(false)
    }
  }

  useEffect(() => {
    if (page === 'sync' && !syncStatus) testSCAuth()
  }, [page])`
);

// 3. Make the Sync Dashboard sidebar item clickable
admin = admin.replace(
  `<div className="aw-admin-sb-item" style={{ opacity: 0.4, cursor: 'default' }}><span>\u{1F504}</span> Sync Dashboard</div>`,
  `<div className={\`aw-admin-sb-item\${page === 'sync' ? ' active' : ''}\`} onClick={() => setPage('sync')}><span>\u{1F504}</span> Sync Dashboard</div>`
);

// 4. Update the topbar title to include sync
admin = admin.replace(
  `<div className="aw-admin-topbar-title">{page === 'applications' ? 'Account Applications' : 'Contact Messages'}</div>`,
  `<div className="aw-admin-topbar-title">{page === 'applications' ? 'Account Applications' : page === 'messages' ? 'Contact Messages' : 'SellerCloud Sync'}</div>`
);

// 5. Add the sync page content before the closing toast section
// Find the pattern where the messages section ends and toast begins
admin = admin.replace(
  `        {/* TOAST */}`,
  `        {/* SYNC DASHBOARD */}
        {page === 'sync' && (
          <div className="aw-admin-page">
            <div className="aw-admin-page-title">SellerCloud Integration</div>
            <div className="aw-admin-page-sub">Real-time connection to your SellerCloud inventory</div>

            {/* Connection Status */}
            <div className="aw-admin-stats">
              <div className="aw-admin-stat">
                <div className="aw-admin-stat-label">Connection</div>
                <div className="aw-admin-stat-val" style={{ fontSize: 16 }}>
                  {syncLoading ? '...' : syncStatus?.success ? <span style={{color:'#22c55e'}}>Connected</span> : <span style={{color:'#ef4444'}}>Error</span>}
                </div>
              </div>
              <div className="aw-admin-stat">
                <div className="aw-admin-stat-label">API Endpoint</div>
                <div className="aw-admin-stat-val" style={{ fontSize: 12, color: '#94a3b8' }}>bi.api.sellercloud.com</div>
              </div>
              <div className="aw-admin-stat">
                <div className="aw-admin-stat-label">Catalog Products</div>
                <div className="aw-admin-stat-val">{catalogData?.total?.toLocaleString() || '—'}</div>
              </div>
              <div className="aw-admin-stat">
                <div className="aw-admin-stat-label">In-Stock SKUs</div>
                <div className="aw-admin-stat-val">{inventoryData?.total?.toLocaleString() || '—'}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <button className="aw-admin-btn aw-admin-btn-primary" onClick={testSCAuth} disabled={syncLoading}>
                {syncLoading ? 'Testing...' : '\\u{1F504} Test Connection'}
              </button>
              <button className="aw-admin-btn aw-admin-btn-view" onClick={() => fetchSCCatalog()} disabled={syncSearching}>
                {syncSearching ? 'Loading...' : '\\u{1F4E6} Load Catalog'}
              </button>
              <button className="aw-admin-btn aw-admin-btn-docs" onClick={() => fetchSCInventory()} disabled={syncSearching}>
                {syncSearching ? 'Loading...' : '\\u{1F4CA} Load Inventory'}
              </button>
            </div>

            {syncStatus?.error && (
              <div style={{ background: '#1c0606', border: '1px solid #7f1d1d', borderRadius: 8, padding: 16, marginBottom: 20, fontSize: 13, color: '#ef4444' }}>
                {syncStatus.error}
              </div>
            )}

            {/* Search */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  style={{ flex: 1, padding: '10px 14px', background: '#0a0f1a', border: '1px solid #1e2d4a', borderRadius: 8, fontSize: 13, color: '#e2e8f0', fontFamily: "'DM Sans', sans-serif", outline: 'none' }}
                  placeholder="Search products (e.g. iPhone, iPad, Samsung)..."
                  value={syncSearch}
                  onChange={e => setSyncSearch(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && syncSearch.trim()) { fetchSCCatalog(syncSearch); fetchSCInventory(syncSearch) } }}
                />
                <button className="aw-admin-btn aw-admin-btn-primary" onClick={() => { fetchSCCatalog(syncSearch); fetchSCInventory(syncSearch) }} disabled={syncSearching || !syncSearch.trim()}>
                  Search
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="aw-admin-tabs">
              <div className={\`aw-admin-tab\${syncTab === 'overview' ? ' active' : ''}\`} onClick={() => setSyncTab('overview')}>Overview</div>
              <div className={\`aw-admin-tab\${syncTab === 'catalog' ? ' active' : ''}\`} onClick={() => setSyncTab('catalog')}>
                Catalog {catalogData?.total ? \`(\${catalogData.total})\` : ''}
              </div>
              <div className={\`aw-admin-tab\${syncTab === 'inventory' ? ' active' : ''}\`} onClick={() => setSyncTab('inventory')}>
                Inventory {inventoryData?.total ? \`(\${inventoryData.total})\` : ''}
              </div>
            </div>

            {/* Overview Tab */}
            {syncTab === 'overview' && (
              <div className="aw-admin-table-card">
                <div className="aw-admin-table-header">
                  <div className="aw-admin-table-title">Integration Status</div>
                </div>
                <table className="aw-admin-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="aw-admin-td-bold">API Authentication</td>
                      <td><span className={\`aw-admin-badge \${syncStatus?.success ? 'aw-admin-badge-green' : 'aw-admin-badge-red'}\`}>{syncStatus?.success ? 'Active' : 'Not Connected'}</span></td>
                      <td>{syncStatus?.success ? \`Token expires in \${syncStatus.expiresIn}\` : syncStatus?.error || 'Click Test Connection'}</td>
                    </tr>
                    <tr>
                      <td className="aw-admin-td-bold">Catalog Sync</td>
                      <td><span className={\`aw-admin-badge \${catalogData?.total > 0 ? 'aw-admin-badge-green' : 'aw-admin-badge-yellow'}\`}>{catalogData?.total > 0 ? 'Data Available' : 'Not Loaded'}</span></td>
                      <td>{catalogData?.total ? \`\${catalogData.total.toLocaleString()} products\` : 'Click Load Catalog'}</td>
                    </tr>
                    <tr>
                      <td className="aw-admin-td-bold">Inventory Sync</td>
                      <td><span className={\`aw-admin-badge \${inventoryData?.total > 0 ? 'aw-admin-badge-green' : 'aw-admin-badge-yellow'}\`}>{inventoryData?.total > 0 ? 'Data Available' : 'Not Loaded'}</span></td>
                      <td>{inventoryData?.total ? \`\${inventoryData.total.toLocaleString()} in-stock SKUs\` : 'Click Load Inventory'}</td>
                    </tr>
                    <tr>
                      <td className="aw-admin-td-bold">Website Catalog</td>
                      <td><span className="aw-admin-badge aw-admin-badge-yellow">Pending</span></td>
                      <td>Not yet wired to live data</td>
                    </tr>
                    <tr>
                      <td className="aw-admin-td-bold">Auto-Sync Schedule</td>
                      <td><span className="aw-admin-badge aw-admin-badge-gray">Not Set</span></td>
                      <td>Manual sync only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Catalog Tab */}
            {syncTab === 'catalog' && catalogData?.items && (
              <div className="aw-admin-table-card">
                <div className="aw-admin-table-header">
                  <div className="aw-admin-table-title">SellerCloud Catalog ({catalogData.total?.toLocaleString()} products)</div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="aw-admin-table">
                    <thead>
                      <tr>
                        <th>SKU</th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Avg Cost</th>
                        <th>Sold 30d</th>
                        <th>Sold 90d</th>
                        <th>Channels</th>
                      </tr>
                    </thead>
                    <tbody>
                      {catalogData.items.map((item: any, i: number) => (
                        <tr key={i}>
                          <td><span className="aw-admin-td-bold" style={{ fontSize: 11, fontFamily: 'monospace' }}>{item.sku}</span></td>
                          <td>
                            <div className="aw-admin-td-bold">{item.name}</div>
                            {item.parsed && <div className="aw-admin-td-sub">{item.parsed.deviceType} · {item.parsed.manufacturer} · {item.parsed.gradeDescription}</div>}
                          </td>
                          <td style={{ color: item.physicalQty > 0 ? '#22c55e' : '#ef4444', fontWeight: 700 }}>{item.physicalQty}</td>
                          <td>{item.avgCost > 0 ? \`$\${item.avgCost.toFixed(2)}\` : '—'}</td>
                          <td>{item.sold30 || '—'}</td>
                          <td>{item.sold90 || '—'}</td>
                          <td style={{ fontSize: 11 }}>
                            {[item.backMarketEnabled && 'BM', item.ebayEnabled && 'eBay', item.walmartEnabled && 'WM', item.amazonEnabled && 'AMZ'].filter(Boolean).join(', ') || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {syncTab === 'catalog' && !catalogData?.items && (
              <div className="aw-admin-empty">
                <div className="aw-admin-empty-icon">{'\u{1F4E6}'}</div>
                <div className="aw-admin-empty-text">Click "Load Catalog" or search to see products</div>
              </div>
            )}

            {/* Inventory Tab */}
            {syncTab === 'inventory' && inventoryData?.items && (
              <div className="aw-admin-table-card">
                <div className="aw-admin-table-header">
                  <div className="aw-admin-table-title">SellerCloud Inventory ({inventoryData.total?.toLocaleString()} in-stock SKUs)</div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="aw-admin-table">
                    <thead>
                      <tr>
                        <th>SKU</th>
                        <th>Product</th>
                        <th>Physical</th>
                        <th>Available</th>
                        <th>Reserved</th>
                        <th>Avg Cost</th>
                        <th>Warehouse</th>
                        <th>Velocity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryData.items.map((item: any, i: number) => (
                        <tr key={i}>
                          <td><span className="aw-admin-td-bold" style={{ fontSize: 11, fontFamily: 'monospace' }}>{item.sku}</span></td>
                          <td className="aw-admin-td-bold">{item.name}</td>
                          <td style={{ color: '#22c55e', fontWeight: 700 }}>{item.physicalQty}</td>
                          <td>{item.availableQty}</td>
                          <td>{item.reservedQty || '—'}</td>
                          <td>{item.avgCost > 0 ? \`$\${item.avgCost.toFixed(2)}\` : '—'}</td>
                          <td style={{ fontSize: 11 }}>{item.warehouseName || '—'}</td>
                          <td style={{ fontSize: 11 }}>{item.sold30 > 0 ? \`\${item.sold30}/30d\` : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {syncTab === 'inventory' && !inventoryData?.items && (
              <div className="aw-admin-empty">
                <div className="aw-admin-empty-icon">{'\u{1F4CA}'}</div>
                <div className="aw-admin-empty-text">Click "Load Inventory" or search to see stock levels</div>
              </div>
            )}
          </div>
        )}

        {/* TOAST */}`
);

fs.writeFileSync('src/pages/Admin.tsx', admin);
console.log('DONE - Sync Dashboard added to Admin.tsx');
