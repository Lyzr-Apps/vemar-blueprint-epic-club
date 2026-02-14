# Vercel Deployment Guide

This guide will help you deploy your VEMAR.AI application to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Git repository with your code (GitHub, GitLab, or Bitbucket)
3. OpenAI API key (optional, for TTS and text model features)

## Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to a Git repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import your project to Vercel**
   - Go to https://vercel.com/dashboard
   - Click "Add New Project"
   - Import your Git repository
   - Select your repository from the list

3. **Configure your project**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

4. **Set Environment Variables**
   - Click "Environment Variables"
   - Add the following variables:
     ```
     OPENAI_API_KEY=your_actual_api_key
     NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)
   - Your app will be live at `https://your-project-name.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**
   ```bash
   cd /app/nextjs-project
   vercel
   ```

4. **Follow the prompts**
   - Set up and deploy? Yes
   - Which scope? Select your account
   - Link to existing project? No
   - Project name? (accept default or choose custom)
   - Directory? `./`
   - Override settings? No

5. **Set environment variables**
   ```bash
   vercel env add OPENAI_API_KEY
   vercel env add NEXT_PUBLIC_APP_URL
   ```

6. **Deploy to production**
   ```bash
   vercel --prod
   ```

## Post-Deployment Configuration

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `NEXT_PUBLIC_APP_URL` environment variable

### Environment Variables

If you need to add or update environment variables after deployment:

1. Go to your project in Vercel Dashboard
2. Navigate to Settings → Environment Variables
3. Add/Edit variables
4. Redeploy your application for changes to take effect

## Important Notes

1. **API Keys**: Never commit `.env` files to Git. Use `.env.example` as a template.

2. **Build Optimization**: The app is configured with:
   - Image optimization disabled (`unoptimized: true`) for faster builds
   - TypeScript error checking enabled
   - Static asset optimization

3. **Port Configuration**: Vercel automatically handles port configuration in production.

4. **Automatic Deployments**:
   - Every push to `main` branch triggers a production deployment
   - Every push to other branches creates a preview deployment

5. **Build Time**: First deployment may take 3-5 minutes. Subsequent deployments are faster.

## Troubleshooting

### Build Fails

1. Check build logs in Vercel Dashboard
2. Ensure all dependencies are in `package.json`
3. Verify TypeScript errors locally: `npm run build`

### Environment Variables Not Working

1. Ensure variables are set in Vercel Dashboard
2. Redeploy after adding/updating variables
3. Check variable names match exactly (case-sensitive)

### Images Not Loading

1. Ensure images are in `/public` folder
2. Check image paths are correct
3. Verify `next.config.js` image settings

### API Routes Not Working

1. Check API route file structure: `app/api/[route]/route.ts`
2. Verify exports are named `GET`, `POST`, etc.
3. Check for CORS issues in browser console

## Monitoring and Analytics

### Vercel Analytics (Optional)

1. Go to your project in Vercel
2. Navigate to Analytics tab
3. Enable Vercel Analytics
4. Install package: `npm install @vercel/analytics`
5. Add to `app/layout.tsx`:
   ```typescript
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

## Useful Commands

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel remove [deployment-url]
```

## Support

- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Vercel Support: https://vercel.com/support

## Deployment Checklist

- [ ] Code pushed to Git repository
- [ ] Project imported to Vercel
- [ ] Environment variables configured
- [ ] First deployment successful
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic)
- [ ] All pages loading correctly
- [ ] API routes working
- [ ] Images displaying properly
- [ ] Navigation working
- [ ] Chat widget functional
- [ ] Analytics enabled (optional)

Your VEMAR.AI application is now live and ready to use!
