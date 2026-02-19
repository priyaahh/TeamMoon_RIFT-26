# Deployment Guide - PharmaGuard Frontend

This guide covers deploying the PharmaGuard frontend to production.

## Supported Platforms

- **Vercel** (Recommended)
- **Netlify**
- **AWS** (S3 + CloudFront)
- **Azure** (Static Web Apps)
- **Docker** (Self-hosted)

## Prerequisites

- Frontend code ready
- Backend API deployed and running
- Environment variables configured

## Before Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Test production build locally**
   ```bash
   npm run preview
   ```

3. **Update environment variables**
   ```bash
   # Update API URL to production backend
   VITE_API_URL=https://api.your-domain.com/api
   ```

## Vercel Deployment (Recommended)

### Easiest Option - Git Integration

1. **Push code to GitHub/GitLab/Bitbucket**
   ```bash
   git push origin main
   ```

2. **Link Vercel to repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select repository
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm ci`

3. **Add environment variables**
   - Go to Project Settings → Environment Variables
   - Add `VITE_API_URL` with production API URL
   - Redeploy

4. **Deploy**
   ```bash
   vercel deploy --prod
   ```

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# You'll be prompted to configure project
```

## Netlify Deployment

### Method 1: Git Integration (Recommended)

1. **Create `netlify.toml`**
   ```toml
   [build]
   command = "npm run build"
   publish = "dist"
   
   [[redirects]]
   from = "/*"
   to = "/index.html"
   status = 200
   
   [build.environment]
   NODE_VERSION = "18"
   ```

2. **Connect on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - Netlify automatically detects React configuration

3. **Add environment variables**
   - Site settings → Build & deploy → Environment
   - Add `VITE_API_URL`

### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

## AWS S3 + CloudFront

### Step 1: Create S3 Bucket

```bash
aws s3 mb s3://pharmaguard-frontend \
  --region us-east-1
```

### Step 2: Build and Upload

```bash
npm run build

aws s3 sync dist/ s3://pharmaguard-frontend \
  --delete \
  --cache-control "max-age=3600"

# Upload index.html with no cache
aws s3 cp dist/index.html s3://pharmaguard-frontend/index.html \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html"
```

### Step 3: Create CloudFront Distribution

```bash
# Using AWS Console or:
aws cloudfront create-distribution \
  --distribution-config file://distribution-config.json
```

### Step 4: Configure Environment

```bash
# Add to .env or deployment
VITE_API_URL=https://api.your-domain.com/api
```

## Azure Static Web Apps

### Step 1: Create Static Web App

```bash
az staticwebapp create \
  --name pharmaguard-frontend \
  --resource-group my-rg \
  --source https://github.com/your-repo/url \
  --branch main
```

### Step 2: Configure Build

In `azure-pipelines.yml`:
```yaml
- task: NodeTool@0
  inputs:
    versionSpec: '18'

- script: |
    npm install
    npm run build
  displayName: 'Build'

- task: CopyFiles@2
  inputs:
    sourceFolder: '$(Build.SourcesDirectory)/dist'
    targetFolder: '$(Build.ArtifactStagingDirectory)'
```

## Docker Deployment

### Create Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app
RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Build and Run

```bash
# Build image
docker build -t pharmaguard-frontend .

# Run container
docker run -p 3000:3000 \
  -e VITE_API_URL=https://api.your-domain.com/api \
  pharmaguard-frontend

# Deploy to container registry
docker tag pharmaguard-frontend your-registry/pharmaguard-frontend:latest
docker push your-registry/pharmaguard-frontend:latest
```

## Environment Variables for Production

```env
# .env.production
VITE_API_URL=https://api.your-domain.com/api
VITE_LLM_API_KEY=your_production_key_here
```

## Post-Deployment Checklist

- [ ] API endpoint is accessible from deployed URL
- [ ] CORS is properly configured on backend
- [ ] File upload works (test with sample VCF)
- [ ] Results display correctly
- [ ] JSON export works
- [ ] Performance is acceptable (< 3s load time)
- [ ] No console errors
- [ ] Mobile view is responsive
- [ ] Analytics/monitoring is set up
- [ ] SSL certificate is valid

## Monitoring & Maintenance

### Add Analytics

```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Monitor Performance

- Use Vercel/Netlify analytics
- Set up error tracking (Sentry)
- Monitor API latency
- Track user engagement

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Major updates (test first)
npm install package@latest
```

## Troubleshooting

### Blank Page After Deploy

```bash
# Check:
1. Build output exists (dist/)
2. index.html in dist/
3. API endpoint is accessible
4. Browser cache cleared
5. Console for JavaScript errors
```

### Image/Asset 404 Errors

```bash
# Verify public assets copied:
# In vite.config.js:
export default {
  assetsInclude: ['**/*.ico', '**/*.png'],
}
```

### CORS Errors

```javascript
// Backend needs to allow frontend origin
CORS_ORIGINS=https://your-frontend-url
```

### Environment Variables Not Loading

```bash
# Verify:
1. Variable names prefixed with VITE_
2. Redeployed after adding variables
3. Browser cache cleared
```

## Rollback Procedure

### Vercel
```bash
vercel rollback
```

### Netlify
- Site settings → Deploys
- Select previous deployment
- Click "Publish deploy"

### AWS/Azure
- Keep previous releases available
- Update DNS/CDN to point to previous version

## Performance Optimization

### Recommended Optimizations

1. **Enable Brotli compression**
   - Vercel: Automatic
   - Netlify: Enabled by default

2. **Image optimization**
   ```bash
   npm install sharp
   # Optimize images in build
   ```

3. **Code splitting**
   - Already configured in Vite

4. **CDN caching**
   - Cache busting: Vite automatically adds hashes

## Support & Debugging

- Check deployment logs
- Monitor error tracking service
- Use browser DevTools Network tab
- Check API response times

---

**Need help?** See main README.md or create an issue.
