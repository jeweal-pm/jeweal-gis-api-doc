# Advanced level functionality

Optional power-user features for GIS API Explorer. **Fully isolated** — safe to remove without touching core docs.

## To remove later

Tell the agent: **"remove advanced level functionality"**

Or manually:

1. Delete the entire `src/advanced/` folder (this file included).
2. In `src/App.js`, remove the block between `=== ADVANCED LEVEL START ===` and `=== ADVANCED LEVEL END ===` (import + `<AdvancedFeatures />`).

Nothing else needs to change.

## Features

- **Ctrl+K / Cmd+K** — global endpoint search (path, title, method, section)
- **Method filter** — type `post: inventory` or `get: customer` in search
- **Recent endpoints** — last 12 visited (localStorage)
- **Bookmarks** — star endpoints to save (localStorage)
- **Auth tokens** — save JWT and Pos-Authorization for copy-with-token cURL
- **Developer tools** (wrench icon / Ctrl+Shift+D) — share links, fetch/axios/Python/cURL snippets, private notes, export bookmarks
- **Share links** — URL hash deep links (e.g. `#/auth/auth-web/store-login`); Ctrl+Shift+L to copy
- **?** — keyboard shortcuts reference
