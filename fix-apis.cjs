const fs = require('fs');

// Fix Upload.tsx - move @import to a link tag instead of inside template literal
let upload = fs.readFileSync('src/pages/Upload.tsx', 'utf8');
upload = upload.replace(
  /@import url\([^)]+\);\n/,
  ''
);
// Add the font link via a different method - prepend to the component
upload = upload.replace(
  '<><style>{css}</style>',
  '<><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap" rel="stylesheet" /><style>{css}</style>'
);
fs.writeFileSync('src/pages/Upload.tsx', upload);
console.log('Upload.tsx fixed - ' + upload.split('\n').length + ' lines');