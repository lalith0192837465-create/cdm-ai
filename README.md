# CDM — deal coordination without the handoff

CDM listens to Zoom sales calls, extracts non-standard deal terms, and routes the work to Engineering, Finance, and Legal with one human confirmation before downstream actions fire.

## Choose your path

- **Sales demo:** open `/demo` — no login, keys, or database required.
- **Run locally:** open `/run-local` in the website, or follow the commands below.
- **Customer cloud:** BYOC guides are in `infra/aws`, `infra/gcp`, and `infra/azure`; real Terraform stays deferred until a pilot confirms the customer environment.

## Run locally

Requires Node.js 18+.

```bash
git clone https://github.com/lalith0192837465-create/cdm-ai.git
cd cdm-ai
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Open http://localhost:3000. Copy `.env.example` to `.env` only when connecting live integrations.

## Deployment

The app is Next.js and can deploy to Vercel for demo use. Live integrations require the environment variables documented in `.env.example`. Never commit `.env`, database files, or API keys.
