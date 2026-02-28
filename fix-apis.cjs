const fs = require('fs');

// Completely rewrite Upload.tsx CSS to use a regular string
let upload = fs.readFileSync('src/pages/Upload.tsx', 'utf8');

// Replace the template literal css with a regular string
const cssStart = upload.indexOf('const css =');
const cssEnd = upload.indexOf('const DOC_LABELS');

if (cssStart > -1 && cssEnd > -1) {
  const before = upload.substring(0, cssStart);
  const after = upload.substring(cssEnd);

  const newCss = `const css = ".aw-upload{font-family:DM Sans,sans-serif;background:#f8fafc;min-height:100vh}" +
".aw-upload-header{background:#132347;padding:32px 40px;text-align:center}" +
".aw-upload-logo{font-size:18px;font-weight:800;color:#fff;margin-bottom:4px}" +
".aw-upload-header-sub{font-size:13px;color:#a8c0d8}" +
".aw-upload-main{max-width:640px;margin:0 auto;padding:40px 20px 80px}" +
".aw-upload-card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden}" +
".aw-upload-card-header{padding:24px 28px;border-bottom:1px solid #f1f4f8}" +
".aw-upload-title{font-size:20px;font-weight:800;color:#132347;margin-bottom:4px}" +
".aw-upload-sub{font-size:13px;color:#64748b}" +
".aw-upload-list{padding:8px 28px 20px}" +
".aw-upload-item{display:flex;align-items:center;gap:14px;padding:16px 0;border-bottom:1px solid #f1f4f8}" +
".aw-upload-item:last-child{border-bottom:none}" +
".aw-upload-item-icon{width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}" +
".aw-upload-item-icon.pending{background:#fef3c7}" +
".aw-upload-item-icon.done{background:#d1fae5}" +
".aw-upload-item-info{flex:1}" +
".aw-upload-item-name{font-size:14px;font-weight:700;color:#132347}" +
".aw-upload-item-status{font-size:12px;color:#64748b;margin-top:2px}" +
".aw-upload-item-status.done{color:#16a34a;font-weight:600}" +
".aw-upload-item-btn{position:relative;overflow:hidden}" +
".aw-upload-item-btn button{background:#132347;color:#fff;font-size:12px;font-weight:700;padding:8px 16px;border-radius:6px;border:none;cursor:pointer;font-family:DM Sans,sans-serif}" +
".aw-upload-item-btn button:disabled{opacity:0.6;cursor:not-allowed}" +
".aw-upload-item-btn input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer}" +
".aw-upload-done{text-align:center;padding:48px 28px}" +
".aw-upload-done-icon{font-size:56px;margin-bottom:12px}" +
".aw-upload-done-title{font-size:20px;font-weight:800;color:#132347;margin-bottom:8px}" +
".aw-upload-done-sub{font-size:14px;color:#64748b;line-height:1.6}" +
".aw-upload-loading{text-align:center;padding:80px 20px;font-size:14px;color:#64748b}" +
".aw-upload-error{text-align:center;padding:80px 20px}" +
".aw-upload-error-title{font-size:20px;font-weight:800;color:#132347;margin-bottom:8px}" +
".aw-upload-error-sub{font-size:14px;color:#64748b}" +
".aw-upload-footer{text-align:center;padding:20px}" +
".aw-upload-footer-text{font-size:12px;color:#94a3b8}"

`;

  upload = before + newCss + after;
}

fs.writeFileSync('src/pages/Upload.tsx', upload);
console.log('Upload.tsx fixed - ' + upload.split('\n').length + ' lines');