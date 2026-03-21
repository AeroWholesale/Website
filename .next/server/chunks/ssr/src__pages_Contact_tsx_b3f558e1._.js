module.exports=[90304,a=>{"use strict";var b=a.i(7997),c=a.i(717),d=a.i(47485);let e=`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');

  :root {
    --navy: #132347; --navy-mid: #1a2f5e; --navy-dark: #0c1730; --navy-deep: #08101f;
    --orange: #c2410c; --orange-lt: #d9480f;
    --steel: #334155; --steel-lt: #475569; --steel-dim: #64748b;
    --slate-bg: #f1f4f8; --white: #ffffff; --off-white: #f8fafc;
    --border: #e2e8f0; --text-dark: #0f172a;
  }

  .aw-contact-page { font-family: 'DM Sans', sans-serif; background: var(--off-white); color: var(--text-dark); -webkit-font-smoothing: antialiased; }

  /* ── HEADER ── */
  .aw-contact-header { background: var(--navy-dark); background-image: radial-gradient(ellipse 60% 80% at 100% 50%, rgba(194,65,12,0.08) 0%, transparent 60%), linear-gradient(160deg, var(--navy-dark) 0%, var(--navy-deep) 100%); padding: 36px 40px 40px; position: relative; overflow: hidden; }
  .aw-contact-header::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 80px); pointer-events: none; }
  .aw-contact-header-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
  .aw-contact-breadcrumb { font-size: 11px; font-weight: 600; color: #4e6480; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
  .aw-contact-breadcrumb span { color: #7b90b2; cursor: pointer; }
  .aw-contact-breadcrumb span:hover { color: #a8c0d8; }
  .aw-contact-page-title { font-size: 30px; font-weight: 900; color: #ffffff; letter-spacing: -0.03em; margin-bottom: 8px; line-height: 1.1; }
  .aw-contact-page-sub { font-size: 13.5px; color: #a8c0d8; font-weight: 500; max-width: 600px; line-height: 1.6; }

  /* ── CONTACT CONTENT ── */
  .aw-contact-section { padding: 64px 40px 80px; }
  .aw-contact-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }

  /* Left side */
  .aw-contact-eyebrow { font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--orange); margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
  .aw-contact-eyebrow::before { content: ''; width: 16px; height: 2px; background: var(--orange); border-radius: 1px; }
  .aw-contact-title { font-size: 28px; font-weight: 800; color: var(--navy); letter-spacing: -0.03em; margin-bottom: 14px; line-height: 1.2; }
  .aw-contact-desc { font-size: 14.5px; color: var(--steel-dim); line-height: 1.75; margin-bottom: 40px; }

  .aw-contact-cards { display: flex; flex-direction: column; gap: 16px; }
  .aw-contact-card { background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 28px; display: flex; align-items: flex-start; gap: 18px; transition: box-shadow 0.18s, transform 0.18s; }
  .aw-contact-card:hover { box-shadow: 0 8px 28px rgba(19,35,71,0.06); transform: translateY(-1px); }
  .aw-contact-card-icon { width: 44px; height: 44px; border-radius: 10px; background: var(--slate-bg); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .aw-contact-card-icon svg { width: 20px; height: 20px; color: var(--navy); }
  .aw-contact-card-label { font-size: 10px; font-weight: 700; color: var(--steel-dim); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
  .aw-contact-card-value { font-size: 16px; font-weight: 700; color: var(--navy); letter-spacing: -0.01em; }
  .aw-contact-card-sub { font-size: 12.5px; color: var(--steel-dim); margin-top: 4px; line-height: 1.4; }
  .aw-contact-card-link { color: var(--navy); text-decoration: none; }
  .aw-contact-card-link:hover { color: var(--orange); }

  /* Right side - form */
  .aw-contact-form-wrap { background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 40px; }
  .aw-contact-form-title { font-size: 20px; font-weight: 800; color: var(--navy); letter-spacing: -0.02em; margin-bottom: 8px; }
  .aw-contact-form-sub { font-size: 13px; color: var(--steel-dim); line-height: 1.6; margin-bottom: 28px; }
  .aw-contact-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .aw-contact-form-group { margin-bottom: 18px; }
  .aw-contact-form-label { display: block; font-size: 11px; font-weight: 700; color: var(--navy); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
  .aw-contact-form-input { width: 100%; height: 44px; padding: 0 14px; border: 1px solid var(--border); border-radius: 8px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: var(--text-dark); background: var(--off-white); outline: none; transition: border-color 0.15s, background 0.15s; }
  .aw-contact-form-input:focus { border-color: var(--navy-mid); background: #fff; }
  .aw-contact-form-textarea { width: 100%; min-height: 120px; padding: 12px 14px; border: 1px solid var(--border); border-radius: 8px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: var(--text-dark); background: var(--off-white); outline: none; resize: vertical; transition: border-color 0.15s, background 0.15s; }
  .aw-contact-form-textarea:focus { border-color: var(--navy-mid); background: #fff; }
  .aw-contact-form-submit { display: inline-flex; align-items: center; gap: 8px; background: var(--orange); color: #fff; font-size: 14px; font-weight: 700; padding: 14px 28px; border-radius: 7px; cursor: pointer; border: none; font-family: inherit; box-shadow: 0 4px 16px rgba(194,65,12,0.35); transition: background 0.15s; margin-top: 8px; width: 100%; justify-content: center; }
  .aw-contact-form-submit:hover { background: #a33509; }

  /* ── RESPONSE BAR ── */
  .aw-contact-response { background: var(--navy-dark); padding: 40px; text-align: center; }
  .aw-contact-response-inner { max-width: 600px; margin: 0 auto; }
  .aw-contact-response-text { font-size: 14px; color: #7b90b2; line-height: 1.6; }
  .aw-contact-response-text strong { color: #fff; font-weight: 700; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .aw-contact-inner { grid-template-columns: 1fr; gap: 40px; }
  }
  @media (max-width: 640px) {
    .aw-contact-header, .aw-contact-section, .aw-contact-response { padding-left: 20px; padding-right: 20px; }
    .aw-contact-page-title { font-size: 24px; }
    .aw-contact-form-row { grid-template-columns: 1fr; }
    .aw-contact-form-wrap { padding: 24px; }
  }
`,f=()=>(0,b.jsxs)("svg",{width:"20",height:"20",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",viewBox:"0 0 24 24",children:[(0,b.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,b.jsx)("polyline",{points:"22,6 12,13 2,6"})]}),g=()=>(0,b.jsxs)("svg",{width:"20",height:"20",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",viewBox:"0 0 24 24",children:[(0,b.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,b.jsx)("polyline",{points:"12 6 12 12 16 14"})]}),h=()=>(0,b.jsxs)("svg",{width:"20",height:"20",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",viewBox:"0 0 24 24",children:[(0,b.jsx)("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"}),(0,b.jsx)("circle",{cx:"12",cy:"10",r:"3"})]});function i(){let a=(0,d.useNavigate)(),[i,j]=(0,c.useState)({name:"",company:"",email:"",subject:"",message:""}),[k,l]=(0,c.useState)(!1),[m,n]=(0,c.useState)(!1),o=async a=>{a.preventDefault(),n(!0);try{(await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})).ok&&l(!0)}catch{l(!0)}finally{n(!1)}};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:e}),(0,b.jsxs)("div",{className:"aw-contact-page",children:[(0,b.jsx)("div",{className:"aw-contact-header",children:(0,b.jsxs)("div",{className:"aw-contact-header-inner",children:[(0,b.jsxs)("div",{className:"aw-contact-breadcrumb",children:[(0,b.jsx)("span",{onClick:()=>a("/"),children:"Home"})," › Contact"]}),(0,b.jsx)("div",{className:"aw-contact-page-title",children:"Get in Touch"}),(0,b.jsx)("div",{className:"aw-contact-page-sub",children:"Have a question about inventory, pricing, or wholesale accounts? We're here to help."})]})}),(0,b.jsx)("div",{className:"aw-contact-section",children:(0,b.jsxs)("div",{className:"aw-contact-inner",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"aw-contact-eyebrow",children:"Contact Us"}),(0,b.jsx)("div",{className:"aw-contact-title",children:"We'd Love to Hear from You"}),(0,b.jsx)("div",{className:"aw-contact-desc",children:"Whether you're looking to place your first wholesale order or have questions about our grading and inventory — reach out and we'll get back to you promptly."}),(0,b.jsxs)("div",{className:"aw-contact-cards",children:[(0,b.jsxs)("div",{className:"aw-contact-card",children:[(0,b.jsx)("div",{className:"aw-contact-card-icon",children:(0,b.jsx)(f,{})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"aw-contact-card-label",children:"Email"}),(0,b.jsx)("div",{className:"aw-contact-card-value",children:(0,b.jsx)("a",{className:"aw-contact-card-link",href:"mailto:sales@aerowholesale.com",children:"sales@aerowholesale.com"})}),(0,b.jsx)("div",{className:"aw-contact-card-sub",children:"For wholesale inquiries, quotes, and account questions"})]})]}),(0,b.jsxs)("div",{className:"aw-contact-card",children:[(0,b.jsx)("div",{className:"aw-contact-card-icon",children:(0,b.jsx)(g,{})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"aw-contact-card-label",children:"Business Hours"}),(0,b.jsx)("div",{className:"aw-contact-card-value",children:"Monday – Friday"}),(0,b.jsx)("div",{className:"aw-contact-card-sub",children:"9:00 AM – 5:00 PM EST"})]})]}),(0,b.jsxs)("div",{className:"aw-contact-card",children:[(0,b.jsx)("div",{className:"aw-contact-card-icon",children:(0,b.jsx)(h,{})}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"aw-contact-card-label",children:"Location"}),(0,b.jsx)("div",{className:"aw-contact-card-value",children:"Eatontown, New Jersey"}),(0,b.jsx)("div",{className:"aw-contact-card-sub",children:"Serving wholesale buyers nationwide"})]})]})]})]}),(0,b.jsx)("div",{className:"aw-contact-form-wrap",children:k?(0,b.jsxs)("div",{style:{textAlign:"center",padding:"40px 0"},children:[(0,b.jsx)("div",{style:{fontSize:28,fontWeight:800,color:"#132347",marginBottom:10},children:"Message Sent"}),(0,b.jsx)("div",{style:{fontSize:14,color:"#64748b",lineHeight:1.6},children:"Thanks for reaching out. We'll get back to you within one business day."})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:"aw-contact-form-title",children:"Send Us a Message"}),(0,b.jsx)("div",{className:"aw-contact-form-sub",children:"Fill out the form below and we'll get back to you within one business day."}),(0,b.jsxs)("form",{onSubmit:o,children:[(0,b.jsxs)("div",{className:"aw-contact-form-row",children:[(0,b.jsxs)("div",{className:"aw-contact-form-group",children:[(0,b.jsx)("label",{className:"aw-contact-form-label",children:"Name"}),(0,b.jsx)("input",{className:"aw-contact-form-input",type:"text",placeholder:"Your name",value:i.name,onChange:a=>j({...i,name:a.target.value}),required:!0})]}),(0,b.jsxs)("div",{className:"aw-contact-form-group",children:[(0,b.jsx)("label",{className:"aw-contact-form-label",children:"Company"}),(0,b.jsx)("input",{className:"aw-contact-form-input",type:"text",placeholder:"Company name",value:i.company,onChange:a=>j({...i,company:a.target.value})})]})]}),(0,b.jsxs)("div",{className:"aw-contact-form-group",children:[(0,b.jsx)("label",{className:"aw-contact-form-label",children:"Email"}),(0,b.jsx)("input",{className:"aw-contact-form-input",type:"email",placeholder:"you@company.com",value:i.email,onChange:a=>j({...i,email:a.target.value}),required:!0})]}),(0,b.jsxs)("div",{className:"aw-contact-form-group",children:[(0,b.jsx)("label",{className:"aw-contact-form-label",children:"Subject"}),(0,b.jsx)("input",{className:"aw-contact-form-input",type:"text",placeholder:"What's this about?",value:i.subject,onChange:a=>j({...i,subject:a.target.value}),required:!0})]}),(0,b.jsxs)("div",{className:"aw-contact-form-group",children:[(0,b.jsx)("label",{className:"aw-contact-form-label",children:"Message"}),(0,b.jsx)("textarea",{className:"aw-contact-form-textarea",placeholder:"Tell us how we can help...",value:i.message,onChange:a=>j({...i,message:a.target.value}),required:!0})]}),(0,b.jsx)("button",{className:"aw-contact-form-submit",type:"submit",disabled:m,children:m?"Sending...":"Send Message →"})]})]})})]})}),(0,b.jsx)("div",{className:"aw-contact-response",children:(0,b.jsx)("div",{className:"aw-contact-response-inner",children:(0,b.jsxs)("div",{className:"aw-contact-response-text",children:["We typically respond within ",(0,b.jsx)("strong",{children:"one business day"}),". For urgent inquiries, email us directly at ",(0,b.jsx)("strong",{children:"sales@aerowholesale.com"}),"."]})})})]})]})}a.s(["default",()=>i])}];

//# sourceMappingURL=src__pages_Contact_tsx_b3f558e1._.js.map