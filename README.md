# World Cup 2026 — Live Score App

Live scores, squads, and player clubs powered by TheSportsDB.

## Project structure

```
├── index.html                  ← the whole frontend (no key inside)
├── netlify.toml                ← Netlify config
├── netlify/
│   └── functions/
│       └── scores.js           ← secret proxy (reads key from env var)
└── README.md
```

## How the API key stays secret

Your browser calls `/.netlify/functions/scores`, which is a tiny server
running on Netlify's infrastructure. That function reads `SPORTSDB_KEY`
from Netlify's environment variables and forwards the real request to
TheSportsDB with the `X-API-KEY` header. The key is **never sent to
the browser**.

## Deploy to Netlify (5 minutes)

### Step 1 — Push to GitHub

1. Go to https://github.com/new and create a repo (e.g. `worldcup2026`)
2. Upload all files keeping the folder structure intact:
   ```
   index.html
   netlify.toml
   netlify/functions/scores.js
   ```

### Step 2 — Connect to Netlify

1. Go to https://app.netlify.com → **Add new site → Import an existing project**
2. Choose **GitHub** and select your repo
3. Build settings (leave defaults — Netlify auto-detects):
   - Build command: *(leave empty)*
   - Publish directory: `.`
4. Click **Deploy site**

### Step 3 — Add your secret API key

1. In Netlify, go to **Site configuration → Environment variables**
2. Click **Add a variable**
3. Key: `SPORTSDB_KEY`
4. Value: `654760`  ← your TheSportsDB Patreon key
5. Click **Save**
6. Go to **Deploys → Trigger deploy → Deploy site**

Your app is now live at `https://your-site-name.netlify.app` 🎉

Share that URL with friends — they never see the key.

## Run locally (optional)

Install the Netlify CLI so the proxy function works on your machine:

```bash
npm install -g netlify-cli
netlify dev
```

Then open http://localhost:8888

---

API data from [TheSportsDB](https://www.thesportsdb.com) · Not affiliated with FIFA
