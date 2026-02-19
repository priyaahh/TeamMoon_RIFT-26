# Quick Start Guide - PharmaGuard Frontend

Get the PharmaGuard frontend running in 5 minutes!

## Prerequisites

- Node.js 16+ ([Download](https://nodejs.org/))
- npm 7+ (comes with Node.js)
- Backend API running on `http://localhost:8000`

## Installation (1 minute)

```bash
# Navigate to frontend directory
cd Frontend

# Install all dependencies
npm install

# This installs:
# - React 18
# - Vite (build tool)
# - Axios (HTTP client)
# - React Icons
# - Dev dependencies for linting
```

## Configuration (1 minute)

```bash
# Copy environment template
cp .env.example .env.local

# Open .env.local and update if needed
VITE_API_URL=http://localhost:8000/api
```

## Run Development Server (30 seconds)

```bash
npm run dev
```

You should see:
```
VITE v5.0.0  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

**Open** `http://localhost:5173` in your browser! 🎉

## Test the Application (2 minutes)

1. **Upload VCF File**
   - Click "Drag & Drop Your VCF File"
   - Select a test VCF file (5MB max)
   - Should show ✓ Valid VCF File

2. **Select Drugs**
   - Type drug name (e.g., "CODEINE")
   - Click "Add" or press Enter
   - See it appear in Selected Drugs

3. **Analyze**
   - Click "Analyze Pharmacogenomics"
   - Wait for processing...
   - View results with expandable sections

4. **Export**
   - Click "Copy" to copy JSON
   - Click "Download" to save as file

## File Structure

```
Frontend/
├── src/
│   ├── components/      # React components
│   ├── utils/          # Helper functions
│   ├── styles/         # CSS files
│   ├── App.jsx         # Main component
│   └── main.jsx        # React entry point
├── public/
│   └── index.html      # HTML template
├── package.json        # Dependencies
├── vite.config.js      # Build config
└── README.md           # Full documentation
```

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Troubleshooting

### Cannot Find Module Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Port 5173 Already in Use

```bash
# Use different port
npm run dev -- --port 5174
```

### CORS/API Connection Errors

1. Verify backend is running: `http://localhost:8000/health`
2. Check `.env.local` API URL matches backend
3. Ensure backend allows CORS from `http://localhost:5173`

### Blank Page After Upload

1. Check browser console for errors (F12)
2. Verify API endpoint is accessible
3. Try clearing cache and reload

## API Integration

The app expects the backend API at `http://localhost:8000/api`.

**Required Endpoints:**
- `POST /analyze` - Process VCF and drugs
- `GET /drugs` - List supported drugs
- `GET /health` - Health check

**Backend Expected Response:**
```json
{
  "patient_id": "PATIENT_XXX",
  "drug": "DRUG_NAME",
  "risk_assessment": {...},
  "pharmacogenomic_profile": {...},
  "clinical_recommendation": {...},
  "llm_generated_explanation": {...},
  "quality_metrics": {...}
}
```

See [API documentation](#) for details.

## Customization

### Change Colors

Edit `src/styles/theme.css`:

```css
:root {
  --color-primary-600: #0d9488;  /* Change this */
  --color-safe: #10b981;         /* Or this */
}
```

### Add New Component

1. Create `src/components/MyComponent.jsx`
2. Create `src/components/MyComponent.css`
3. Import and use in `App.jsx`

### Update API Endpoint

Edit `src/utils/api.js` or `.env.local`:

```env
VITE_API_URL=https://your-api-url.com/api
```

## Next Steps

1. ✅ Frontend running locally
2. 📦 [Install and run backend](../Backend/README.md)
3. 🔗 Test end-to-end workflow
4. 🎨 Customize styling
5. 💾 Build for production
6. 🌐 Deploy to hosting
7. 📹 Create demo video
8. 📤 Submit project

## Project Structure

```
Teams/
└── TeamMoon_RIFT-26/
    ├── Frontend/               ← You are here
    │   ├── src/
    │   ├── package.json
    │   └── README.md
    │
    └── Backend/                ← Python FastAPI
        ├── app/
        ├── requirements.txt
        └── README.md
```

## Key Features

| Feature | Status | Test |
|---------|--------|------|
| VCF Upload | ✅ | Drag file to upload area |
| Drug Selection | ✅ | Type and add drugs |
| Analysis | ✅ | Click "Analyze Pharmacogenomics" |
| Results Display | ✅ | View expandable sections |
| JSON Export | ✅ | Click Download/Copy buttons |
| Responsive Design | ✅ | Resize browser window |

## Tech Stack Quick Reference

| Tool | Purpose | Version |
|------|---------|---------|
| React | UI Framework | 18.2.0 |
| Vite | Build Tool | 5.0.0 |
| Axios | HTTP Client | 1.6.0 |
| React Icons | Icons | 5.0.0 |
| CSS3 | Styling | Latest |

## Documentation

- **README.md** - Full documentation
- **ARCHITECTURE.md** - System design
- **DEPLOYMENT.md** - Production deployment
- **FILES_CREATED.md** - File inventory

## Support

### Common Issues

**Q: Port 5173 already in use**
```bash
npm run dev -- --port 5174
```

**Q: CORS errors from API**
```
Check backend CORS configuration
Ensure API_URL in .env matches backend
```

**Q: Cannot read property of undefined**
```bash
Clear cache: npm cache clean --force
Reinstall: rm -rf node_modules && npm install
```

### Getting Help

1. Check documentation files
2. Review browser console errors (F12)
3. Check backend logs
4. Create GitHub issue

## Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Axios Documentation](https://axios-http.com)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

## Deployment Checklist

Before deploying, ensure:

- [ ] `npm run build` succeeds
- [ ] No console errors
- [ ] All features tested locally
- [ ] Backend API deployed
- [ ] Environment variables set
- [ ] CORS configured on backend

## Production Build

```bash
# Build optimized version
npm run build

# Creates dist/ folder ready to deploy
# Upload dist/ to hosting service
```

---

**Estimated Time**: 5 minutes  
**Difficulty**: Beginner-friendly  
**Status**: Ready to code!

Have fun building PharmaGuard! 🚀 Let me know if you need help with anything!
