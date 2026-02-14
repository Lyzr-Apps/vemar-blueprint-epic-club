# Production Deployment Guide - VEMAR.AI

## Quick Start - Deploy to Vercel Now

### Option 1: Vercel Dashboard (Recommended - 5 minutes)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - VEMAR.AI production ready"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com/new
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Add Environment Variables** (Optional)
   - In Vercel Dashboard: Settings > Environment Variables
   - Add: `OPENAI_API_KEY` (if using TTS/Text features)
   - Add: `NEXT_PUBLIC_APP_URL` = your-app.vercel.app
   - Redeploy to apply changes

4. **Done!**
   - Your app is live at: `https://your-project.vercel.app`
   - Auto-deploys on every git push

### Option 2: Vercel CLI (For Developers - 3 minutes)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## Pre-Deployment Checklist

### 1. Verify Build Locally
```bash
# Test production build
npm run build

# Expected output:
# ✓ Creating an optimized production build
# ✓ Compiled successfully
# Route (app)              Size
# └ ○ /                    [X] kB
```

### 2. Environment Variables
Create `.env.production` (gitignored):
```env
# Optional - Only if using OpenAI features
OPENAI_API_KEY=sk-...

# Will be auto-set by Vercel
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 3. Update Configuration
Already configured in `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

---

## Production Features

### What's Included
- Text-to-Speech (6 AI voices)
- Text Processing (summarize, translate, etc.)
- RAG Chat Widget
- Deepfake Detection pages
- Analytics Dashboard
- Investor Pitch
- API Security docs
- Pricing page

### Performance Optimizations
- Static page generation
- Image optimization (configured)
- Code splitting (automatic)
- Edge network delivery
- Gzip compression (automatic)

---

## Post-Deployment Tasks

### 1. Verify All Pages Load
Test these URLs after deployment:
- `/` - Home page
- `/ai-models` - AI Models Studio
- `/analytics` - Analytics Dashboard
- `/deepfake-detection` - Deepfake Detection
- `/api-security` - API Security
- `/pricing` - Pricing
- `/investor-pitch` - Investor Pitch
- `/demo` - Product Demo

### 2. Test API Endpoints
```bash
# Test chat API
curl -X POST https://your-app.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'

# Expected: { "success": true, "message": "..." }
```

### 3. Check Chat Widget
- Open any page
- Click chat widget (bottom-right or top-right)
- Send a message
- Verify response with sources

### 4. Monitor Performance
- Vercel Analytics: https://vercel.com/dashboard/analytics
- Check build times, response times
- Monitor error rates

---

## Custom Domain Setup

### 1. Add Domain in Vercel
- Dashboard > Settings > Domains
- Enter your domain: `www.vemar.ai`
- Vercel provides DNS records

### 2. Update DNS
Add these records at your DNS provider:
```
Type  Name  Value
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

### 3. Update Environment Variable
```env
NEXT_PUBLIC_APP_URL=https://www.vemar.ai
```

### 4. Wait for SSL
- Auto-provisioned in 5-10 minutes
- HTTPS enforced automatically

---

## Scaling & Performance

### Auto-Scaling
- Vercel auto-scales based on traffic
- No configuration needed
- Handles 0 to millions of requests

### Edge Network
- Deployed to global CDN
- <100ms latency worldwide
- Automatic failover

### Cost Optimization
- **Free Tier**: 100GB bandwidth, 100 serverless functions
- **Pro**: $20/month - 1TB bandwidth, unlimited functions
- **Enterprise**: Custom pricing

---

## Monitoring & Alerts

### Built-in Vercel Analytics
```javascript
// Already configured in app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Set Up Alerts
1. Dashboard > Settings > Notifications
2. Enable:
   - Deployment failures
   - Build errors
   - Domain issues
3. Add email/Slack webhook

---

## Security Best Practices

### 1. Environment Variables
- Never commit `.env` files
- Use Vercel Dashboard for secrets
- Rotate API keys quarterly

### 2. API Rate Limiting
Add to API routes:
```typescript
// Example: /app/api/chat/route.ts
const rateLimiter = new Map()

export async function POST(request: NextRequest) {
  const ip = request.ip || 'unknown'
  const now = Date.now()
  const windowMs = 60000 // 1 minute
  const max = 10 // 10 requests per minute

  // Rate limiting logic
  // ...
}
```

### 3. CORS Configuration
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://your-domain.com' },
        ],
      },
    ]
  },
}
```

---

## Troubleshooting

### Build Fails
**Issue**: TypeScript errors
```bash
# Fix locally first
npm run build

# Check errors
npx tsc --noEmit
```

**Issue**: Missing dependencies
```bash
# Ensure all deps in package.json
npm install
```

### Runtime Errors
**Issue**: API routes not working
- Check function logs in Vercel Dashboard
- Verify environment variables are set
- Test locally with `npm run build && npm start`

**Issue**: Images not loading
- Ensure images in `/public` folder
- Check `next.config.js` image config
- Verify image paths (use `/image.png` not `./image.png`)

### Performance Issues
**Issue**: Slow page load
- Enable Vercel Analytics
- Check bundle size: `npm run build` shows route sizes
- Use Next.js Image component for optimization

---

## CI/CD Pipeline

### GitHub Actions (Optional)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
          vercel-args: '--prod'
```

### Automated Testing
```bash
# Add to package.json
"scripts": {
  "test": "jest",
  "test:e2e": "playwright test",
  "lint": "next lint",
  "type-check": "tsc --noEmit"
}
```

---

## Rollback Procedure

### Quick Rollback
1. Go to Vercel Dashboard
2. Deployments tab
3. Find previous working deployment
4. Click "Promote to Production"
5. Instant rollback (<30 seconds)

### Git Rollback
```bash
# Revert to previous commit
git revert HEAD
git push

# Auto-deploys reverted version
```

---

## Backup & Disaster Recovery

### Database Backup (If using)
```bash
# If using Vercel Postgres
vercel env pull .env.local
# Backup connection string

# If using external DB
# Set up automated backups per provider
```

### Code Backup
- GitHub is primary backup
- Download deployment artifacts from Vercel
- Keep local `.env.example` updated

---

## Cost Estimation

### Vercel Pricing
**Free Tier** (Good for MVP):
- 100GB bandwidth
- 100 serverless function executions
- 1 commercial team member

**Pro Tier** ($20/month - Recommended):
- 1TB bandwidth
- Unlimited serverless executions
- Custom domains
- Analytics
- Support

**Enterprise** (Contact sales):
- 99.99% SLA
- Dedicated support
- Advanced security
- SSO/SAML

### External Costs
- **OpenAI API** (if enabled):
  - TTS: $15/1M characters
  - GPT-4: $30/1M tokens input
  - Estimate: $50-200/month at moderate usage

- **Domain**: $12/year
- **Email**: $6/user/month (optional)

**Total Monthly Cost**: $20-250 (depending on usage)

---

## Investor Demo Preparation

### 1. Set Up Demo Account
```bash
# Use demo environment variables
OPENAI_API_KEY=<demo-key-with-limits>
NEXT_PUBLIC_APP_URL=https://demo.vemar.ai
```

### 2. Pre-load Demo Data
- Prepare demo chat conversations
- Set up analytics with sample data
- Create test API keys

### 3. Demo Script
Follow INVESTOR_QA.md demo flow (2-3 minutes):
1. Home page (10s) - Show branding
2. AI Models (45s) - Live TTS demo
3. RAG Chat (45s) - Show intelligent responses
4. Deepfake Detection (30s) - BFSI use case
5. Analytics (30s) - Show metrics

### 4. Backup Plan
- Record screen recording
- Have screenshots ready
- Prepare offline demo (localhost)

---

## Next Steps After Deployment

1. **Week 1: Monitoring**
   - Check error rates daily
   - Monitor API usage
   - Gather user feedback

2. **Week 2: Optimization**
   - Analyze performance metrics
   - Optimize slow pages
   - Add caching if needed

3. **Week 3: Feature Iteration**
   - Based on user feedback
   - A/B test key features
   - Improve conversion

4. **Month 2: Scale**
   - Upgrade to Pro if needed
   - Add custom domain
   - Enable advanced analytics

---

## Support & Resources

### Vercel
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support
- Status: https://www.vercel-status.com

### Next.js
- Docs: https://nextjs.org/docs
- GitHub: https://github.com/vercel/next.js
- Discord: https://discord.gg/nextjs

### VEMAR.AI
- See: README.md for full documentation
- See: INVESTOR_QA.md for business questions
- See: DEPLOYMENT.md for detailed deployment guide

---

## Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm start                # Run production server locally

# Deployment
vercel                   # Deploy preview
vercel --prod            # Deploy to production
vercel env add           # Add environment variable
vercel domains add       # Add custom domain

# Debugging
vercel logs              # View function logs
vercel inspect           # Debug deployment

# Rollback
vercel rollback          # Rollback to previous
```

---

**Production Checklist:**
- [ ] Code pushed to GitHub
- [ ] Project imported to Vercel
- [ ] Environment variables set
- [ ] Production build successful
- [ ] All pages loading correctly
- [ ] API endpoints working
- [ ] Chat widget functional
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Analytics enabled
- [ ] Monitoring/alerts set up
- [ ] Demo prepared for investors

Your VEMAR.AI application is production-ready!

---

*Last Updated: February 14, 2026*
*Built by the team at Lyzr*
