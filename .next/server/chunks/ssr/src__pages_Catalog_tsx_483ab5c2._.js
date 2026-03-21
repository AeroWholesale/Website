module.exports=[80561,a=>{"use strict";var b=a.i(7997),c=a.i(717),d=a.i(47485);let e=`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');

  .aw-cat-page { font-family: 'DM Sans', sans-serif; background: #f8fafc; color: #0f172a; -webkit-font-smoothing: antialiased; min-height: 100vh; }

  .aw-cat-header { background: #0c1730; background-image: radial-gradient(ellipse 60% 80% at 100% 50%, rgba(194,65,12,0.08) 0%, transparent 60%), linear-gradient(160deg, #0c1730 0%, #08101f 100%); padding: 36px 40px; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .aw-cat-header-inner { max-width: 1400px; margin: 0 auto; }
  .aw-cat-breadcrumb { font-size: 11px; font-weight: 600; color: #4e6480; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
  .aw-cat-breadcrumb span { color: #7b90b2; cursor: pointer; }
  .aw-cat-breadcrumb span:hover { color: #a8c0d8; }
  .aw-cat-title { font-size: 30px; font-weight: 900; color: #ffffff; letter-spacing: -0.03em; margin-bottom: 8px; line-height: 1.1; }
  .aw-cat-subtitle { font-size: 13.5px; color: #a8c0d8; font-weight: 500; }

  .aw-search-bar { background: #ffffff; border-bottom: 1px solid #e2e8f0; padding: 14px 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .aw-search-inner { max-width: 1400px; margin: 0 auto; display: flex; align-items: center; gap: 12px; }
  .aw-search-wrap { flex: 1; position: relative; min-width: 0; }
  .aw-search-wrap svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #64748b; width: 16px; height: 16px; pointer-events: none; }
  .aw-search-input { width: 100%; height: 42px; padding: 0 14px 0 42px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #0f172a; background: #f8fafc; outline: none; transition: border-color 0.15s, background 0.15s; }
  .aw-search-input::placeholder { color: #94a3b8; }
  .aw-search-input:focus { border-color: #132347; background: #ffffff; }
  .aw-sort-wrap { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #334155; white-space: nowrap; flex-shrink: 0; }
  .aw-sort-wrap select { font-size: 13px; font-family: 'DM Sans', sans-serif; color: #334155; border: 1px solid #e2e8f0; border-radius: 6px; padding: 9px 12px; background: #ffffff; cursor: pointer; outline: none; }
  .aw-results-count { font-size: 12px; color: #64748b; white-space: nowrap; font-weight: 500; }

  /* Mobile filter toggle button */
  .aw-filter-toggle-btn { display: none; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: #132347; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 9px 16px; cursor: pointer; font-family: 'DM Sans', sans-serif; white-space: nowrap; flex-shrink: 0; }
  .aw-filter-toggle-btn svg { width: 15px; height: 15px; }
  .aw-filter-badge { background: #132347; color: #fff; border-radius: 10px; font-size: 10px; font-weight: 800; padding: 1px 6px; }

  .aw-cat-layout { max-width: 1400px; margin: 0 auto; padding: 28px 40px 60px; display: grid; grid-template-columns: 240px 1fr; gap: 28px; align-items: start; }

  /* Desktop sidebar */
  .aw-sidebar { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; position: sticky; top: 88px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
  .aw-sidebar-header { padding: 14px 18px; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; background: #f8fafc; }
  .aw-sidebar-title { font-size: 11px; font-weight: 800; color: #132347; text-transform: uppercase; letter-spacing: 0.12em; }
  .aw-sidebar-clear { font-size: 11px; font-weight: 700; color: #c2410c; cursor: pointer; background: none; border: none; font-family: 'DM Sans', sans-serif; }
  .aw-filter-group { border-bottom: 1px solid #e2e8f0; }
  .aw-filter-group:last-child { border-bottom: none; }
  .aw-filter-group-header { padding: 13px 18px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; user-select: none; transition: background 0.1s; }
  .aw-filter-group-header:hover { background: #f8fafc; }
  .aw-filter-group-title { font-size: 12px; font-weight: 700; color: #132347; text-transform: uppercase; letter-spacing: 0.08em; }
  .aw-filter-toggle { color: #64748b; font-size: 18px; font-weight: 300; line-height: 1; width: 18px; text-align: center; }
  .aw-filter-options { padding: 2px 18px 14px; }
  .aw-filter-option { display: flex; align-items: center; gap: 9px; padding: 5px 0; cursor: pointer; }
  .aw-filter-option:hover .aw-filter-label { color: #132347; }
  .aw-filter-checkbox { width: 15px; height: 15px; border: 1.5px solid #cbd5e1; border-radius: 3px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all 0.1s; }
  .aw-filter-checkbox.checked { background: #132347; border-color: #132347; }
  .aw-filter-label { font-size: 13px; color: #334155; font-weight: 500; }

  /* Mobile filter drawer overlay */
  .aw-filter-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 200; }
  .aw-filter-overlay.open { display: block; }
  .aw-filter-drawer { position: fixed; top: 0; left: 0; bottom: 0; width: min(320px, 90vw); background: #fff; z-index: 201; overflow-y: auto; transform: translateX(-100%); transition: transform 0.25s ease; box-shadow: 4px 0 24px rgba(0,0,0,0.15); }
  .aw-filter-drawer.open { transform: translateX(0); }
  .aw-filter-drawer-header { padding: 16px 18px; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; background: #fff; z-index: 1; }
  .aw-filter-drawer-title { font-size: 14px; font-weight: 800; color: #132347; }
  .aw-filter-drawer-close { background: none; border: none; font-size: 22px; color: #64748b; cursor: pointer; line-height: 1; padding: 0; font-family: inherit; }
  .aw-filter-drawer-footer { padding: 16px 18px; border-top: 1px solid #e2e8f0; position: sticky; bottom: 0; background: #fff; }
  .aw-filter-apply-btn { width: 100%; padding: 12px; background: #132347; color: #fff; font-size: 14px; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; font-family: 'DM Sans', sans-serif; }

  .aw-active-filters { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin-bottom: 16px; min-height: 28px; }
  .aw-filter-pill { display: flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 600; color: #132347; background: #eff6ff; border: 1px solid #bfdbfe; padding: 4px 10px; border-radius: 20px; }
  .aw-filter-pill button { background: none; border: none; color: #64748b; cursor: pointer; font-size: 14px; line-height: 1; padding: 0; margin-left: 1px; font-family: inherit; }

  .aw-products-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

  .aw-product-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; cursor: pointer; transition: box-shadow 0.15s, transform 0.15s; box-shadow: 0 1px 3px rgba(0,0,0,0.04); display: flex; flex-direction: column; }
  .aw-product-card:hover { box-shadow: 0 8px 28px rgba(19,35,71,0.12); transform: translateY(-2px); }
  .aw-card-img { height: 160px; background: #f1f4f8; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #e2e8f0; position: relative; overflow: hidden; }
  .aw-card-img img { max-height: 140px; max-width: 140px; object-fit: contain; }
  .aw-card-img svg { width: 56px; height: 56px; color: #94a3b8; opacity: 0.5; }
  .aw-card-badge { position: absolute; top: 10px; right: 10px; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 4px; background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
  .aw-card-body { padding: 14px; flex: 1; display: flex; flex-direction: column; }
  .aw-card-brand { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
  .aw-card-name { font-size: 15px; font-weight: 700; color: #132347; margin-bottom: 8px; letter-spacing: -0.01em; line-height: 1.3; }
  .aw-card-specs { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 10px; }
  .aw-card-spec { font-size: 10px; font-weight: 600; color: #475569; background: #f1f4f8; padding: 2px 7px; border-radius: 3px; border: 1px solid #e2e8f0; }
  .aw-card-grades { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 12px; }
  .aw-grade-pill { font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 3px; }
  .aw-gp-green { background: #ecfdf5; color: #047857; }
  .aw-gp-blue { background: #eff6ff; color: #1d4ed8; }
  .aw-gp-purple { background: #f5f3ff; color: #6d28d9; }
  .aw-gp-yellow { background: #fefce8; color: #854d0e; }
  .aw-gp-orange { background: #fff7ed; color: #9a3412; }
  .aw-gp-gray { background: #f8fafc; color: #475569; }
  .aw-card-footer { border-top: 1px solid #e2e8f0; padding-top: 12px; margin-top: auto; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .aw-stock-label { font-size: 11px; font-weight: 600; color: #64748b; }
  .aw-stock-label b { color: #132347; }
  .aw-view-btn { font-size: 12px; font-weight: 700; color: #ffffff; background: #132347; padding: 7px 16px; border-radius: 6px; cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; transition: background 0.12s; white-space: nowrap; }
  .aw-view-btn:hover { background: #1a2f5e; }

  .aw-pagination { display: flex; align-items: center; justify-content: center; gap: 4px; margin-top: 40px; flex-wrap: wrap; }
  .aw-page-btn { width: 36px; height: 36px; border-radius: 7px; border: 1px solid #e2e8f0; background: #ffffff; font-size: 13px; font-weight: 600; color: #334155; cursor: pointer; display: flex; align-items: center; justify-content: center; font-family: 'DM Sans', sans-serif; transition: all 0.12s; }
  .aw-page-btn:hover { border-color: #132347; color: #132347; }
  .aw-page-btn.active { background: #132347; color: #ffffff; border-color: #132347; }

  .aw-loading { display: flex; align-items: center; justify-content: center; padding: 80px 20px; }
  .aw-spinner { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #132347; border-radius: 50%; animation: aw-spin 0.6s linear infinite; }
  @keyframes aw-spin { to { transform: rotate(360deg); } }

  .aw-empty-state { text-align: center; padding: 60px 20px; }
  .aw-empty-title { font-size: 16px; font-weight: 700; color: #132347; margin-bottom: 6px; }
  .aw-empty-sub { font-size: 13px; color: #64748b; }

  .aw-login-banner { background: linear-gradient(135deg, #132347 0%, #08101f 100%); padding: 24px 40px; border-top: 3px solid #c2410c; }
  .aw-login-banner-inner { max-width: 1400px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
  .aw-banner-title { font-size: 15px; font-weight: 700; color: #ffffff; margin-bottom: 2px; }
  .aw-banner-sub { font-size: 13px; color: #4e6480; }
  .aw-banner-btns { display: flex; gap: 10px; flex-shrink: 0; flex-wrap: wrap; }
  .aw-banner-btn-primary { background: #c2410c; color: #fff; font-size: 13px; font-weight: 700; padding: 10px 22px; border-radius: 6px; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; }
  .aw-banner-btn-primary:hover { background: #a33509; }
  .aw-banner-btn-ghost { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.8); font-size: 13px; font-weight: 600; padding: 10px 20px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.12); cursor: pointer; font-family: 'DM Sans', sans-serif; }

  /* ── TABLET (≤1024px) ── */
  @media (max-width: 1024px) {
    .aw-cat-layout { grid-template-columns: 1fr; padding: 20px 20px 48px; gap: 0; }
    .aw-sidebar { display: none; }
    .aw-filter-toggle-btn { display: flex; }
    .aw-products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .aw-cat-header, .aw-search-bar, .aw-login-banner { padding-left: 20px; padding-right: 20px; }
    .aw-search-inner { gap: 8px; }
    .aw-results-count { display: none; }
  }

  /* ── MOBILE (≤640px) ── */
  @media (max-width: 640px) {
    .aw-cat-header { padding: 24px 16px; }
    .aw-cat-title { font-size: 22px; }
    .aw-cat-subtitle { font-size: 12px; }
    .aw-search-bar { padding: 10px 16px; }
    .aw-search-input { font-size: 13px; }
    .aw-sort-wrap span { display: none; }
    .aw-sort-wrap select { font-size: 12px; padding: 8px 10px; }
    .aw-cat-layout { padding: 16px 16px 48px; }
    .aw-products-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .aw-card-img { height: 130px; }
    .aw-card-img img { max-height: 110px; max-width: 110px; }
    .aw-card-body { padding: 10px; }
    .aw-card-name { font-size: 13px; }
    .aw-card-specs { display: none; }
    .aw-card-footer { flex-wrap: wrap; }
    .aw-view-btn { width: 100%; text-align: center; margin-top: 4px; }
    .aw-active-filters { margin-bottom: 12px; }
    .aw-login-banner { padding: 20px 16px; }
    .aw-banner-btns { width: 100%; }
    .aw-banner-btn-primary, .aw-banner-btn-ghost { flex: 1; text-align: center; }
  }
`,f={CAP1:"Premium 100%",CAP:"Premium",NE:"New","CA+":"Excellent",CA:"Good",CAB:"Good (Batt<80%)",SD:"B-Grade","SD-":"C-Grade",SDB:"B/C (Batt<80%)"},g={CAP1:"green",NE:"green",CAP:"blue","CA+":"purple",CA:"yellow",CAB:"orange",SD:"gray","SD-":"gray",SDB:"gray"},h=["CAP1","NE","CAP","CA+","CA","CAB","SD","SD-","SDB"],i=()=>(0,b.jsxs)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"2",viewBox:"0 0 24 24",children:[(0,b.jsx)("circle",{cx:"11",cy:"11",r:"8"}),(0,b.jsx)("path",{d:"M21 21l-4.35-4.35"})]}),j=()=>(0,b.jsx)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"2",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M3 6h18M7 12h10M11 18h2"})}),k=()=>(0,b.jsxs)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.2",viewBox:"0 0 24 24",children:[(0,b.jsx)("rect",{x:"5",y:"2",width:"14",height:"20",rx:"2"}),(0,b.jsx)("circle",{cx:"12",cy:"17",r:"0.8",fill:"currentColor"})]}),l=()=>(0,b.jsxs)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.2",viewBox:"0 0 24 24",children:[(0,b.jsx)("rect",{x:"3",y:"2",width:"18",height:"20",rx:"2"}),(0,b.jsx)("circle",{cx:"12",cy:"18",r:"0.8",fill:"currentColor"})]}),m=()=>(0,b.jsxs)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.2",viewBox:"0 0 24 24",children:[(0,b.jsx)("rect",{x:"3",y:"4",width:"18",height:"12",rx:"1.5"}),(0,b.jsx)("path",{d:"M1 18h22",strokeLinecap:"round"})]}),n=()=>(0,b.jsxs)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.2",viewBox:"0 0 24 24",children:[(0,b.jsx)("rect",{x:"6",y:"6",width:"12",height:"12",rx:"3"}),(0,b.jsx)("path",{d:"M9 6V3h6v3M9 18v3h6v-3"})]}),o=({category:a})=>"Tablets"===a?(0,b.jsx)(l,{}):"Laptops"===a?(0,b.jsx)(m,{}):"Wearables"===a?(0,b.jsx)(n,{}):(0,b.jsx)(k,{});function p(){let a=(0,d.useNavigate)(),[k,l]=(0,c.useState)(null),[m,n]=(0,c.useState)(!0),[p,r]=(0,c.useState)(""),[s,t]=(0,c.useState)(!1),[u,v]=(0,c.useState)(""),[w,x]=(0,c.useState)(""),[y,z]=(0,c.useState)(()=>new URLSearchParams(window.location.search).get("category")||""),[A,B]=(0,c.useState)([]),[C,D]=(0,c.useState)([]),[E,F]=(0,c.useState)([]),[G,H]=(0,c.useState)([]),[I,J]=(0,c.useState)("name"),[K,L]=(0,c.useState)(1),[M,N]=(0,c.useState)({category:!0,brand:!0,grade:!0,storage:!1,carrier:!1}),O=localStorage.getItem("aw-token"),P=(()=>{try{return JSON.parse(localStorage.getItem("aw-user")||"")}catch{return null}})(),Q=a=>N(b=>({...b,[a]:!b[a]}));(0,c.useEffect)(()=>(s?document.body.style.overflow="hidden":document.body.style.overflow="",()=>{document.body.style.overflow=""}),[s]);let R=(0,c.useCallback)(async()=>{n(!0);try{let a=new URLSearchParams;w&&a.set("search",w),y&&a.set("category",y),A.length&&a.set("brand",A.join(",")),C.length&&a.set("grade",C.join(",")),E.length&&a.set("storage",E.join(",")),G.length&&a.set("carrier",G.join(",")),a.set("sort",I),a.set("page",String(K)),a.set("size","24");let b={},c=localStorage.getItem("aw-token");c&&(b.Authorization=`Bearer ${c}`);let d=await fetch(`/api/catalog-public?${a}`,{headers:b});if(!d.ok)throw Error(`API error: ${d.status}`);l(await d.json()),r("")}catch(a){r(String(a))}finally{n(!1)}},[w,y,A,C,E,G,I,K]);(0,c.useEffect)(()=>{R()},[R]),(0,c.useEffect)(()=>{let a=setTimeout(()=>{x(u),L(1)},400);return()=>clearTimeout(a)},[u]);let S=(a,b,c)=>{b(a.includes(c)?a.filter(a=>a!==c):[...a,c]),L(1)},T=()=>{z(""),B([]),D([]),F([]),H([]),v(""),x(""),L(1)},U=y||A.length||C.length||E.length||G.length||w,V=+!!y+A.length+C.length+E.length+G.length+ +!!w,W=a=>[...a].sort((a,b)=>{let c=h.indexOf(a),d=h.indexOf(b);return(-1===c?99:c)-(-1===d?99:d)}),X=b=>a(`/catalog/${encodeURIComponent(b)}`),Y=()=>(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(q,{title:"Category",open:M.category,onToggle:()=>Q("category"),children:(0,b.jsx)("div",{className:"aw-filter-options",children:(k?.filterOptions.categories||[]).map(a=>(0,b.jsxs)("div",{className:"aw-filter-option",onClick:()=>{z(y===a?"":a),L(1)},children:[(0,b.jsx)("div",{className:`aw-filter-checkbox${y===a?" checked":""}`,children:y===a&&(0,b.jsx)("span",{style:{color:"#fff",fontSize:9,fontWeight:900},children:"✓"})}),(0,b.jsx)("div",{className:"aw-filter-label",children:a})]},a))})}),(0,b.jsx)(q,{title:"Brand",open:M.brand,onToggle:()=>Q("brand"),children:(0,b.jsx)("div",{className:"aw-filter-options",children:(k?.filterOptions.brands||[]).map(a=>(0,b.jsxs)("div",{className:"aw-filter-option",onClick:()=>S(A,B,a),children:[(0,b.jsx)("div",{className:`aw-filter-checkbox${A.includes(a)?" checked":""}`,children:A.includes(a)&&(0,b.jsx)("span",{style:{color:"#fff",fontSize:9,fontWeight:900},children:"✓"})}),(0,b.jsx)("div",{className:"aw-filter-label",children:a})]},a))})}),(0,b.jsx)(q,{title:"Condition",open:M.grade,onToggle:()=>Q("grade"),children:(0,b.jsx)("div",{className:"aw-filter-options",children:W(k?.filterOptions.grades||[]).map(a=>(0,b.jsxs)("div",{className:"aw-filter-option",onClick:()=>S(C,D,a),children:[(0,b.jsx)("div",{className:`aw-filter-checkbox${C.includes(a)?" checked":""}`,children:C.includes(a)&&(0,b.jsx)("span",{style:{color:"#fff",fontSize:9,fontWeight:900},children:"✓"})}),(0,b.jsx)("div",{className:"aw-filter-label",children:f[a]||a})]},a))})}),(0,b.jsx)(q,{title:"Storage",open:M.storage,onToggle:()=>Q("storage"),children:(0,b.jsx)("div",{className:"aw-filter-options",children:(k?.filterOptions.storages||[]).map(a=>(0,b.jsxs)("div",{className:"aw-filter-option",onClick:()=>S(E,F,a),children:[(0,b.jsx)("div",{className:`aw-filter-checkbox${E.includes(a)?" checked":""}`,children:E.includes(a)&&(0,b.jsx)("span",{style:{color:"#fff",fontSize:9,fontWeight:900},children:"✓"})}),(0,b.jsx)("div",{className:"aw-filter-label",children:a})]},a))})}),(0,b.jsx)(q,{title:"Carrier",open:M.carrier,onToggle:()=>Q("carrier"),children:(0,b.jsx)("div",{className:"aw-filter-options",children:(k?.filterOptions.carriers||[]).map(a=>(0,b.jsxs)("div",{className:"aw-filter-option",onClick:()=>S(G,H,a),children:[(0,b.jsx)("div",{className:`aw-filter-checkbox${G.includes(a)?" checked":""}`,children:G.includes(a)&&(0,b.jsx)("span",{style:{color:"#fff",fontSize:9,fontWeight:900},children:"✓"})}),(0,b.jsx)("div",{className:"aw-filter-label",children:a})]},a))})})]});return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:e}),(0,b.jsxs)("div",{className:"aw-cat-page",children:[(0,b.jsx)("div",{className:"aw-cat-header",children:(0,b.jsxs)("div",{className:"aw-cat-header-inner",children:[(0,b.jsxs)("div",{className:"aw-cat-breadcrumb",children:[(0,b.jsx)("span",{onClick:()=>a("/"),children:"Home"})," ›"," ",y?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("span",{onClick:()=>z(""),children:"Catalog"})," › ",y]}):"Catalog"]}),(0,b.jsx)("div",{className:"aw-cat-title",children:y||"Product Catalog"}),(0,b.jsx)("div",{className:"aw-cat-subtitle",children:k?`${k.total} products in stock \xb7 Updated hourly from live inventory`:"Loading inventory..."})]})}),(0,b.jsx)("div",{className:"aw-search-bar",children:(0,b.jsxs)("div",{className:"aw-search-inner",children:[(0,b.jsxs)("button",{className:"aw-filter-toggle-btn",onClick:()=>t(!0),children:[(0,b.jsx)(j,{}),"Filters",V>0&&(0,b.jsx)("span",{className:"aw-filter-badge",children:V})]}),(0,b.jsxs)("div",{className:"aw-search-wrap",children:[(0,b.jsx)(i,{}),(0,b.jsx)("input",{className:"aw-search-input",placeholder:"Search by model, SKU, brand...",value:u,onChange:a=>v(a.target.value)})]}),(0,b.jsxs)("div",{className:"aw-sort-wrap",children:[(0,b.jsx)("span",{children:"Sort"}),(0,b.jsxs)("select",{value:I,onChange:a=>{J(a.target.value),L(1)},children:[(0,b.jsx)("option",{value:"name",children:"Name A-Z"}),(0,b.jsx)("option",{value:"stock",children:"Most Stock"})]})]}),(0,b.jsxs)("div",{className:"aw-results-count",children:[k?.total||0," results"]})]})}),(0,b.jsx)("div",{className:`aw-filter-overlay${s?" open":""}`,onClick:()=>t(!1)}),(0,b.jsxs)("div",{className:`aw-filter-drawer${s?" open":""}`,children:[(0,b.jsxs)("div",{className:"aw-filter-drawer-header",children:[(0,b.jsxs)("div",{className:"aw-filter-drawer-title",children:["Filters ",V>0&&(0,b.jsx)("span",{className:"aw-filter-badge",style:{marginLeft:6},children:V})]}),(0,b.jsxs)("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[U&&(0,b.jsx)("button",{className:"aw-sidebar-clear",onClick:T,children:"Clear all"}),(0,b.jsx)("button",{className:"aw-filter-drawer-close",onClick:()=>t(!1),children:"×"})]})]}),(0,b.jsx)(Y,{}),(0,b.jsx)("div",{className:"aw-filter-drawer-footer",children:(0,b.jsx)("button",{className:"aw-filter-apply-btn",onClick:()=>t(!1),children:k?`Show ${k.total} results`:"Apply Filters"})})]}),(0,b.jsxs)("div",{className:"aw-cat-layout",children:[(0,b.jsxs)("div",{className:"aw-sidebar",children:[(0,b.jsxs)("div",{className:"aw-sidebar-header",children:[(0,b.jsx)("div",{className:"aw-sidebar-title",children:"Filters"}),U?(0,b.jsx)("button",{className:"aw-sidebar-clear",onClick:T,children:"Clear all"}):null]}),(0,b.jsx)(Y,{})]}),(0,b.jsxs)("div",{children:[U&&(0,b.jsxs)("div",{className:"aw-active-filters",children:[y&&(0,b.jsxs)("div",{className:"aw-filter-pill",children:[y,(0,b.jsx)("button",{onClick:()=>{z(""),L(1)},children:"×"})]}),A.map(a=>(0,b.jsxs)("div",{className:"aw-filter-pill",children:[a,(0,b.jsx)("button",{onClick:()=>S(A,B,a),children:"×"})]},a)),C.map(a=>(0,b.jsxs)("div",{className:"aw-filter-pill",children:[f[a]||a,(0,b.jsx)("button",{onClick:()=>S(C,D,a),children:"×"})]},a)),E.map(a=>(0,b.jsxs)("div",{className:"aw-filter-pill",children:[a,(0,b.jsx)("button",{onClick:()=>S(E,F,a),children:"×"})]},a)),G.map(a=>(0,b.jsxs)("div",{className:"aw-filter-pill",children:[a,(0,b.jsx)("button",{onClick:()=>S(G,H,a),children:"×"})]},a)),w&&(0,b.jsxs)("div",{className:"aw-filter-pill",children:['"',w,'"',(0,b.jsx)("button",{onClick:()=>{v(""),x(""),L(1)},children:"×"})]})]}),m?(0,b.jsx)("div",{className:"aw-loading",children:(0,b.jsx)("div",{className:"aw-spinner"})}):p?(0,b.jsxs)("div",{className:"aw-empty-state",children:[(0,b.jsx)("div",{className:"aw-empty-title",children:"Failed to load catalog"}),(0,b.jsx)("div",{className:"aw-empty-sub",children:p})]}):k?.products.length?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:"aw-products-grid",children:k.products.map(a=>(0,b.jsxs)("div",{className:"aw-product-card",onClick:()=>X(a.modelCode),children:[(0,b.jsxs)("div",{className:"aw-card-img",children:[a.image?(0,b.jsx)("img",{src:a.image,alt:a.name}):(0,b.jsx)(o,{category:a.category}),a.totalStock>=10&&(0,b.jsxs)("div",{className:"aw-card-badge",children:[a.totalStock," in stock"]})]}),(0,b.jsxs)("div",{className:"aw-card-body",children:[(0,b.jsx)("div",{className:"aw-card-brand",children:a.brand}),(0,b.jsx)("div",{className:"aw-card-name",children:a.name}),(0,b.jsxs)("div",{className:"aw-card-specs",children:[a.storages.slice(0,3).map(a=>(0,b.jsx)("span",{className:"aw-card-spec",children:a},a)),a.carriers.slice(0,2).map(a=>(0,b.jsx)("span",{className:"aw-card-spec",children:a},a)),a.colors.length>0&&(0,b.jsxs)("span",{className:"aw-card-spec",children:[a.colors.length," color",a.colors.length>1?"s":""]})]}),(0,b.jsx)("div",{className:"aw-card-grades",children:W(a.grades).map(a=>(0,b.jsx)("span",{className:`aw-grade-pill aw-gp-${g[a]||"gray"}`,children:f[a]||a},a))}),(0,b.jsxs)("div",{className:"aw-card-footer",children:[a.lowestPrice?(0,b.jsxs)("div",{style:{fontSize:13,fontWeight:700,color:"#132347"},children:["From ",(0,b.jsxs)("span",{style:{fontSize:16,fontWeight:800},children:["$",a.lowestPrice.toFixed(2)]}),a.highestPrice&&a.highestPrice!==a.lowestPrice&&(0,b.jsxs)("span",{style:{fontSize:11,color:"#64748b",fontWeight:500},children:[" – $",a.highestPrice.toFixed(2)]})]}):(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:5,color:"#64748b",fontSize:11,fontWeight:600},children:[(0,b.jsxs)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"2",viewBox:"0 0 24 24",style:{width:13,height:13},children:[(0,b.jsx)("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2"}),(0,b.jsx)("path",{d:"M7 11V7a5 5 0 0110 0v4"})]}),"Login for pricing"]}),(0,b.jsxs)("div",{style:{textAlign:"right",flexShrink:0},children:[(0,b.jsxs)("div",{className:"aw-stock-label",children:[(0,b.jsx)("b",{children:a.totalStock})," units"]}),(0,b.jsx)("button",{className:"aw-view-btn",style:{marginTop:4},onClick:b=>{b.stopPropagation(),X(a.modelCode)},children:"View"})]})]})]})]},a.modelCode))}),k.totalPages>1&&(0,b.jsxs)("div",{className:"aw-pagination",children:[(0,b.jsx)("div",{className:"aw-page-btn",onClick:()=>L(a=>Math.max(1,a-1)),children:"‹"}),Array.from({length:Math.min(k.totalPages,7)},(a,b)=>b+1).map(a=>(0,b.jsx)("div",{className:`aw-page-btn${K===a?" active":""}`,onClick:()=>L(a),children:a},a)),(0,b.jsx)("div",{className:"aw-page-btn",onClick:()=>L(a=>Math.min(k.totalPages,a+1)),children:"›"})]})]}):(0,b.jsxs)("div",{className:"aw-empty-state",children:[(0,b.jsx)("div",{className:"aw-empty-title",children:"No products match your filters"}),(0,b.jsx)("div",{className:"aw-empty-sub",children:"Try adjusting your search or clearing some filters"})]})]})]}),O?(0,b.jsx)("div",{className:"aw-login-banner",children:(0,b.jsxs)("div",{className:"aw-login-banner-inner",children:[(0,b.jsxs)("div",{children:[(0,b.jsxs)("div",{className:"aw-banner-title",children:["Logged in as ",P?.companyName||"Dealer"]}),(0,b.jsxs)("div",{className:"aw-banner-sub",children:["You are viewing wholesale prices. ",(0,b.jsx)("a",{href:"/portal",style:{color:"#ea580c",textDecoration:"none",fontWeight:700},children:"Go to portal →"})]})]}),(0,b.jsx)("div",{className:"aw-banner-btns",children:(0,b.jsx)("button",{className:"aw-banner-btn-ghost",onClick:()=>{localStorage.removeItem("aw-token"),localStorage.removeItem("aw-user"),window.location.reload()},children:"Sign Out"})})]})}):(0,b.jsx)("div",{className:"aw-login-banner",children:(0,b.jsxs)("div",{className:"aw-login-banner-inner",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"aw-banner-title",children:"Ready to buy? Apply for wholesale access"}),(0,b.jsx)("div",{className:"aw-banner-sub",children:"Get access to bulk pricing and place orders directly"})]}),(0,b.jsxs)("div",{className:"aw-banner-btns",children:[(0,b.jsx)("button",{className:"aw-banner-btn-primary",onClick:()=>a("/apply"),children:"Apply for Access"}),(0,b.jsx)("button",{className:"aw-banner-btn-ghost",onClick:()=>a("/login"),children:"Login"})]})]})})]})]})}function q({title:a,open:c,onToggle:d,children:e}){return(0,b.jsxs)("div",{className:"aw-filter-group",children:[(0,b.jsxs)("div",{className:"aw-filter-group-header",onClick:d,children:[(0,b.jsx)("div",{className:"aw-filter-group-title",children:a}),(0,b.jsx)("div",{className:"aw-filter-toggle",children:c?"−":"+"})]}),c&&e]})}a.s(["default",()=>p])}];

//# sourceMappingURL=src__pages_Catalog_tsx_483ab5c2._.js.map