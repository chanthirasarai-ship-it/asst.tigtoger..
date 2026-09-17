# Asst.tigtoger

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000.

## API endpoints

- `GET /api/health`
- `GET /api/health/database`
- `GET /api/trends`
- `GET /api/auth/tiktok/status`
- `GET /api/auth/tiktok/start`
- `GET /api/payments/status`

## Optional environment variables

Copy `.env.example` to your deployment environment. Never commit real secrets.

```text
TIKTOK_CLIENT_KEY=your_key
TIKTOK_CLIENT_SECRET=your_secret
TIKTOK_REDIRECT_URL=https://your-domain.example/auth/tiktok/callback
STRIPE_SECRET_KEY=your_stripe_secret
```

TikTok OAuth callback and payment webhook still require provider credentials and secure server-side implementation before enabling real accounts or payments.
