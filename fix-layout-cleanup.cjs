const fs = require('fs');

// === FIX 1: Layout bleed - Messages showing on Sync page ===
let admin = fs.readFileSync('src/pages/Admin.tsx', 'utf8');

// Change the else branch to explicitly check for 'messages'
admin = admin.replace(
  `            ) : (
              <>
                {/* MESSAGES */}`,
  `            ) : page === 'messages' ? (
              <>
                {/* MESSAGES */}`
);

// Close the ternary properly - change the closing after messages
admin = admin.replace(
  `              ))
                )}
              </>
            )}
          </div>
        </div>

        {/* APPLICATION DETAIL MODAL */}`,
  `              ))
                )}
              </>
            ) : null}
          </div>
        </div>

        {/* APPLICATION DETAIL MODAL */}`
);

fs.writeFileSync('src/pages/Admin.tsx', admin);
console.log('Fixed: Messages layout bleed');

// === FIX 2: Delete junk files ===
const junk = [
  'fix-apis.cjs',
  'add-sync-dashboard.cjs',
  'api/catalog.ts',
  'api/inventory.ts',
  'api/api/sc/fix-sc.cjs',
];

junk.forEach(f => {
  try {
    fs.unlinkSync(f);
    console.log('Deleted: ' + f);
  } catch (e) {
    console.log('Skip (not found): ' + f);
  }
});

// Remove empty api/api/sc and api/api directories
try { fs.rmdirSync('api/api/sc'); console.log('Deleted: api/api/sc/'); } catch {}
try { fs.rmdirSync('api/api'); console.log('Deleted: api/api/'); } catch {}

console.log('DONE - layout fixed and junk cleaned up');
