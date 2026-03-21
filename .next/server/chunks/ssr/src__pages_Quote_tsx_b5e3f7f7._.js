module.exports=[52682,a=>{"use strict";var b=a.i(7997),c=a.i(717),d=a.i(47485);let e=`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');

  .qc-page { font-family: 'DM Sans', sans-serif; background: #f8fafc; min-height: 100vh; -webkit-font-smoothing: antialiased; }

  /* HEADER */
  .qc-header { background: #0c1730; background-image: radial-gradient(ellipse 60% 80% at 100% 50%, rgba(194,65,12,0.08) 0%, transparent 60%), linear-gradient(160deg, #0c1730 0%, #08101f 100%); padding: 28px 40px; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .qc-header-inner { max-width: 1000px; margin: 0 auto; }
  .qc-breadcrumb { font-size: 11px; font-weight: 600; color: #4e6480; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
  .qc-breadcrumb span { color: #7b90b2; cursor: pointer; }
  .qc-breadcrumb span:hover { color: #a8c0d8; }
  .qc-breadcrumb-sep { color: #2d4a6e; }
  .qc-header-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; }
  .qc-title { font-size: 26px; font-weight: 900; color: #fff; letter-spacing: -0.03em; }
  .qc-subtitle { font-size: 13px; color: #a8c0d8; font-weight: 500; margin-top: 3px; }
  .qc-header-actions { display: flex; gap: 8px; align-items: center; flex-shrink: 0; }
  .qc-btn-ghost { background: transparent; border: 1.5px solid rgba(255,255,255,0.12); color: #a8c0d8; padding: 8px 16px; border-radius: 7px; font-size: 12px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.12s; }
  .qc-btn-ghost:hover { border-color: rgba(255,255,255,0.25); color: #fff; }
  .qc-btn-danger { background: transparent; border: 1.5px solid rgba(239,68,68,0.35); color: #ef4444; padding: 8px 16px; border-radius: 7px; font-size: 12px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.12s; }
  .qc-btn-danger:hover { background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.6); }

  /* BODY */
  .qc-body { max-width: 1000px; margin: 0 auto; padding: 28px 40px 60px; }

  /* EMPTY */
  .qc-empty { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 64px 32px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .qc-empty-icon { font-size: 44px; margin-bottom: 16px; }
  .qc-empty-title { font-size: 18px; font-weight: 800; color: #132347; margin-bottom: 6px; }
  .qc-empty-sub { font-size: 14px; color: #64748b; margin-bottom: 24px; }
  .qc-btn-primary { background: #132347; color: #fff; border: none; border-radius: 8px; padding: 11px 24px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.12s; }
  .qc-btn-primary:hover { background: #1a2f5e; }
  .qc-btn-orange { background: #c2410c; color: #fff; border: none; border-radius: 8px; padding: 11px 24px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.12s; }
  .qc-btn-orange:hover { background: #a33509; }
  .qc-btn-orange:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ITEMS */
  .qc-items { margin-bottom: 24px; }
  .qc-item { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 16px 20px; margin-bottom: 10px; display: flex; align-items: center; gap: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: border-color 0.12s; }
  .qc-item:hover { border-color: #bfdbfe; }
  .qc-item-image { width: 52px; height: 52px; background: #f1f4f8; border-radius: 7px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid #e2e8f0; overflow: hidden; }
  .qc-item-image img { max-width: 44px; max-height: 44px; object-fit: contain; }
  .qc-item-image-ph { font-size: 22px; }
  .qc-item-info { flex: 1; min-width: 0; }
  .qc-item-name { font-size: 14px; font-weight: 700; color: #132347; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .qc-item-specs { display: flex; gap: 5px; flex-wrap: wrap; }
  .qc-spec-tag { font-size: 11px; font-weight: 600; color: #475569; background: #f1f4f8; padding: 2px 7px; border-radius: 3px; border: 1px solid #e2e8f0; }
  .qc-grade-tag { font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 3px; }
  .qc-gt-blue { background: #eff6ff; color: #1d4ed8; }
  .qc-gt-green { background: #ecfdf5; color: #047857; }
  .qc-gt-purple { background: #f5f3ff; color: #6d28d9; }
  .qc-gt-yellow { background: #fefce8; color: #854d0e; }
  .qc-gt-orange { background: #fff7ed; color: #9a3412; }
  .qc-gt-gray { background: #f8fafc; color: #475569; border: 1px solid #e2e8f0; }

  .qc-item-price { font-size: 17px; font-weight: 800; color: #132347; flex-shrink: 0; width: 90px; text-align: right; }
  .qc-item-qty { display: flex; align-items: center; gap: 0; flex-shrink: 0; border: 1.5px solid #e2e8f0; border-radius: 7px; overflow: hidden; }
  .qc-qty-btn { width: 30px; height: 30px; background: #f8fafc; border: none; color: #132347; font-size: 16px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.1s; flex-shrink: 0; }
  .qc-qty-btn:hover { background: #e2e8f0; }
  .qc-qty-val { width: 36px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #132347; border-left: 1.5px solid #e2e8f0; border-right: 1.5px solid #e2e8f0; }
  .qc-item-subtotal { font-size: 14px; font-weight: 800; color: #132347; flex-shrink: 0; width: 82px; text-align: right; }
  .qc-item-remove { color: #94a3b8; background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px; border-radius: 4px; transition: color 0.12s; flex-shrink: 0; }
  .qc-item-remove:hover { color: #ef4444; }

  /* SUMMARY + FORM */
  .qc-bottom { display: grid; grid-template-columns: 1fr 360px; gap: 20px; align-items: start; }
  .qc-form-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .qc-form-title { font-size: 15px; font-weight: 800; color: #132347; margin-bottom: 16px; }
  .qc-field { margin-bottom: 14px; }
  .qc-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.07em; display: block; margin-bottom: 5px; }
  .qc-input { width: 100%; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 7px; font-size: 13px; font-weight: 500; color: #132347; font-family: 'DM Sans', sans-serif; outline: none; box-sizing: border-box; transition: border-color 0.12s; background: #fafbfc; }
  .qc-input:focus { border-color: #132347; background: #fff; }
  .qc-textarea { width: 100%; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 7px; font-size: 13px; font-weight: 500; color: #132347; font-family: 'DM Sans', sans-serif; outline: none; box-sizing: border-box; resize: vertical; min-height: 80px; transition: border-color 0.12s; background: #fafbfc; }
  .qc-textarea:focus { border-color: #132347; background: #fff; }
  .qc-submit-btn { width: 100%; background: #c2410c; color: #fff; border: none; border-radius: 8px; padding: 13px; font-size: 14px; font-weight: 800; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.12s; margin-top: 4px; letter-spacing: -0.01em; }
  .qc-submit-btn:hover { background: #a33509; }
  .qc-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  /* SUMMARY CARD */
  .qc-summary-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .qc-summary-title { font-size: 15px; font-weight: 800; color: #132347; margin-bottom: 16px; }
  .qc-summary-row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #64748b; margin-bottom: 10px; }
  .qc-summary-row-bold { display: flex; justify-content: space-between; align-items: center; font-size: 15px; font-weight: 800; color: #132347; padding-top: 12px; border-top: 1.5px solid #e2e8f0; margin-top: 4px; }
  .qc-summary-val { font-weight: 600; color: #132347; }

  /* SUCCESS */
  .qc-success { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 64px 32px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .qc-success-icon { font-size: 52px; margin-bottom: 16px; }
  .qc-success-title { font-size: 22px; font-weight: 900; color: #132347; letter-spacing: -0.02em; margin-bottom: 8px; }
  .qc-success-sub { font-size: 14px; color: #64748b; margin-bottom: 6px; max-width: 420px; margin-left: auto; margin-right: auto; line-height: 1.6; }
  .qc-success-ref { font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 28px; font-family: monospace; }
  .qc-success-actions { display: flex; gap: 10px; justify-content: center; }

  @media (max-width: 768px) {
    .qc-header { padding: 20px; }
    .qc-body { padding: 16px 16px 48px; }
    .qc-bottom { grid-template-columns: 1fr; }
    .qc-header-row { flex-direction: column; align-items: flex-start; }
    .qc-item { flex-wrap: wrap; }
    .qc-item-price { display: none; }
  }
`,f={CAP1:"green",NE:"green",CAP:"blue","CA+":"purple",CA:"yellow",CAB:"orange",SD:"gray","SD-":"gray",SDB:"gray"};function g(){let a=(0,d.useNavigate)(),[g,h]=(0,c.useState)([]),[i,j]=(0,c.useState)(""),[k,l]=(0,c.useState)(!1),[m,n]=(0,c.useState)(!1),[o,p]=(0,c.useState)(""),q=(()=>{try{return JSON.parse(localStorage.getItem("aw-user")||"")}catch{return null}})(),r=localStorage.getItem("aw-token"),[s,t]=(0,c.useState)(q?.companyName||""),[u,v]=(0,c.useState)(q?`${q.firstName||""} ${q.lastName||""}`.trim():""),[w,x]=(0,c.useState)(q?.email||"");(0,c.useEffect)(()=>{try{let a=localStorage.getItem("aw-quote-cart");h(a?JSON.parse(a):[])}catch{h([])}},[]);let y=a=>{h(a),localStorage.setItem("aw-quote-cart",JSON.stringify(a))},z=(a,b)=>{y(g.map(c=>{if(c.sku!==a)return c;let d=Math.max(1,c.qty+b);return{...c,qty:d}}))},A=g.reduce((a,b)=>a+b.qty,0),B=g.reduce((a,b)=>a+(b.price||0)*b.qty,0),C=async()=>{if(g.length){l(!0);try{let a={"Content-Type":"application/json"};r&&(a.Authorization=`Bearer ${r}`);let b=await fetch("/api/submit-quote",{method:"POST",headers:a,body:JSON.stringify({items:g,notes:i,dealerEmail:w,dealerName:u,companyName:s})}),c=await b.json();b.ok&&c.refNumber?(p(c.refNumber),n(!0),localStorage.removeItem("aw-quote-cart")):alert(c.error||"Failed to submit quote. Please try again.")}catch(a){alert("Submit failed: "+String(a))}finally{l(!1)}}};return(0,b.jsxs)("div",{className:"qc-page",children:[(0,b.jsx)("style",{children:e}),(0,b.jsx)("div",{className:"qc-header",children:(0,b.jsxs)("div",{className:"qc-header-inner",children:[(0,b.jsxs)("div",{className:"qc-breadcrumb",children:[(0,b.jsx)("span",{onClick:()=>a("/"),children:"Home"}),(0,b.jsx)("span",{className:"qc-breadcrumb-sep",children:"›"}),(0,b.jsx)("span",{onClick:()=>a("/catalog"),children:"Catalog"}),(0,b.jsx)("span",{className:"qc-breadcrumb-sep",children:"›"}),(0,b.jsx)("span",{style:{color:"#a8c0d8",cursor:"default"},children:"Quote Cart"})]}),(0,b.jsxs)("div",{className:"qc-header-row",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"qc-title",children:"Quote Cart"}),(0,b.jsx)("div",{className:"qc-subtitle",children:m?"Quote submitted successfully":0===g.length?"Your cart is empty":`${g.length} line${1!==g.length?"s":""} \xb7 ${A} unit${1!==A?"s":""}`})]}),!m&&g.length>0&&(0,b.jsxs)("div",{className:"qc-header-actions",children:[(0,b.jsx)("button",{className:"qc-btn-ghost",onClick:()=>a("/catalog"),children:"← Continue Browsing"}),(0,b.jsx)("button",{className:"qc-btn-danger",onClick:()=>{y([])},children:"Clear Cart"})]})]})]})}),(0,b.jsx)("div",{className:"qc-body",children:m?(0,b.jsxs)("div",{className:"qc-success",children:[(0,b.jsx)("div",{className:"qc-success-icon",children:"✅"}),(0,b.jsx)("div",{className:"qc-success-title",children:"Quote Request Received"}),(0,b.jsx)("div",{className:"qc-success-sub",children:"We've received your quote request and will follow up with pricing confirmation and availability within 1 business day."}),(0,b.jsxs)("div",{className:"qc-success-ref",children:["Ref: ",o]}),(0,b.jsxs)("div",{className:"qc-success-actions",children:[(0,b.jsx)("button",{className:"qc-btn-primary",onClick:()=>a("/catalog"),children:"Browse More Products"}),(0,b.jsx)("button",{className:"qc-btn-ghost",style:{background:"#fff",border:"1.5px solid #e2e8f0",color:"#132347",padding:"11px 24px",borderRadius:8,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"DM Sans, sans-serif"},onClick:()=>a("/portal"),children:"View My Quotes"})]})]}):0===g.length?(0,b.jsxs)("div",{className:"qc-empty",children:[(0,b.jsx)("div",{className:"qc-empty-icon",children:"🛒"}),(0,b.jsx)("div",{className:"qc-empty-title",children:"Your cart is empty"}),(0,b.jsx)("div",{className:"qc-empty-sub",children:'Browse the catalog and click "Add to Quote" on any variant to get started.'}),(0,b.jsx)("button",{className:"qc-btn-primary",onClick:()=>a("/catalog"),children:"Browse Catalog"})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:"qc-items",children:g.map(a=>{let c=`qc-gt-${f[a.grade]||"gray"}`,d=(a.price||0)*a.qty;return(0,b.jsxs)("div",{className:"qc-item",children:[(0,b.jsx)("div",{className:"qc-item-image",children:a.image?(0,b.jsx)("img",{src:a.image,alt:a.productName}):(0,b.jsx)("span",{className:"qc-item-image-ph",children:"📱"})}),(0,b.jsxs)("div",{className:"qc-item-info",children:[(0,b.jsx)("div",{className:"qc-item-name",children:a.productName}),(0,b.jsxs)("div",{className:"qc-item-specs",children:[(0,b.jsx)("span",{className:`qc-grade-tag ${c}`,children:a.gradeLabel||a.grade}),a.storage&&(0,b.jsx)("span",{className:"qc-spec-tag",children:a.storage}),a.carrier&&(0,b.jsx)("span",{className:"qc-spec-tag",children:a.carrier}),a.color&&(0,b.jsx)("span",{className:"qc-spec-tag",children:a.color})]})]}),(0,b.jsx)("div",{className:"qc-item-price",children:a.price?`$${a.price.toFixed(2)}`:(0,b.jsx)("span",{style:{fontSize:12,color:"#94a3b8"},children:"TBD"})}),(0,b.jsxs)("div",{className:"qc-item-qty",children:[(0,b.jsx)("button",{className:"qc-qty-btn",onClick:()=>z(a.sku,-1),children:"−"}),(0,b.jsx)("div",{className:"qc-qty-val",children:a.qty}),(0,b.jsx)("button",{className:"qc-qty-btn",onClick:()=>z(a.sku,1),children:"+"})]}),(0,b.jsx)("div",{className:"qc-item-subtotal",children:a.price?`$${d.toFixed(2)}`:"—"}),(0,b.jsx)("button",{className:"qc-item-remove",onClick:()=>{var b;return b=a.sku,void y(g.filter(a=>a.sku!==b))},title:"Remove",children:"✕"})]},a.sku)})}),(0,b.jsxs)("div",{className:"qc-bottom",children:[(0,b.jsxs)("div",{className:"qc-form-card",children:[(0,b.jsx)("div",{className:"qc-form-title",children:"Quote Details"}),(0,b.jsxs)("div",{className:"qc-field",children:[(0,b.jsx)("label",{className:"qc-label",children:"Company"}),(0,b.jsx)("input",{className:"qc-input",value:s,readOnly:!0,style:{background:"#f1f4f8",color:"#475569",cursor:"default"}})]}),(0,b.jsxs)("div",{className:"qc-field",children:[(0,b.jsx)("label",{className:"qc-label",children:"Contact Name"}),(0,b.jsx)("input",{className:"qc-input",value:u,readOnly:!0,style:{background:"#f1f4f8",color:"#475569",cursor:"default"}})]}),(0,b.jsxs)("div",{className:"qc-field",children:[(0,b.jsx)("label",{className:"qc-label",children:"Email"}),(0,b.jsx)("input",{className:"qc-input",value:w,readOnly:!0,style:{background:"#f1f4f8",color:"#475569",cursor:"default"}})]}),(0,b.jsxs)("div",{className:"qc-field",children:[(0,b.jsx)("label",{className:"qc-label",children:"Notes / Special Requirements"}),(0,b.jsx)("textarea",{className:"qc-textarea",placeholder:"e.g. Need all units within 5 days, prefer bulk discount on 50+ units, specific carrier or color requirements...",value:i,onChange:a=>j(a.target.value)})]}),(0,b.jsx)("button",{className:"qc-submit-btn",onClick:C,disabled:k||0===g.length,children:k?"Submitting...":`Submit Quote Request (${A} unit${1!==A?"s":""})`})]}),(0,b.jsxs)("div",{className:"qc-summary-card",children:[(0,b.jsx)("div",{className:"qc-summary-title",children:"Order Summary"}),g.map(a=>(0,b.jsxs)("div",{className:"qc-summary-row",children:[(0,b.jsxs)("span",{style:{maxWidth:180,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:[a.productName," ",(0,b.jsxs)("span",{style:{color:"#94a3b8",fontSize:11},children:["×",a.qty]})]}),(0,b.jsx)("span",{className:"qc-summary-val",children:a.price?`$${(a.price*a.qty).toFixed(2)}`:"—"})]},a.sku)),(0,b.jsxs)("div",{className:"qc-summary-row",style:{marginTop:12},children:[(0,b.jsx)("span",{children:"Total Units"}),(0,b.jsx)("span",{className:"qc-summary-val",children:A})]}),(0,b.jsxs)("div",{className:"qc-summary-row-bold",children:[(0,b.jsx)("span",{children:"Estimated Total"}),(0,b.jsx)("span",{style:{color:"#c2410c"},children:B>0?`$${B.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`:"TBD"})]}),(0,b.jsx)("div",{style:{marginTop:14,padding:"10px 12px",background:"#f8fafc",borderRadius:7,border:"1px solid #e2e8f0",fontSize:11,color:"#64748b",lineHeight:1.6},children:"Final pricing subject to availability at time of fulfillment. Our team will confirm within 1 business day."})]})]})]})})]})}a.s(["default",()=>g])}];

//# sourceMappingURL=src__pages_Quote_tsx_b5e3f7f7._.js.map