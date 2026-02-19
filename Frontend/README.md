# PharmaGuard - Frontend

> Pharmacogenomic Risk Prediction System | RIFT 2026 Hackathon

A modern, responsive web application for analyzing patient genetic data (VCF files) to predict personalized pharmacogenomic risks with AI-powered clinical explanations.

## Features

- 🧬 **VCF File Upload** - Drag-and-drop support for genetic variant files (up to 5MB)
- 💊 **Multi-drug Analysis** - Analyze multiple drugs simultaneously
- 🎯 **Risk Assessment** - Predicts drug-specific risks (Safe, Adjust Dosage, Toxic, Ineffective)
- 🤖 **AI Explanations** - LLM-generated clinical recommendations with variant citations
- 📊 **Interactive Results** - Expandable sections for detailed analysis
- 📋 **CPIC Guidelines** - Dosing recommendations aligned with clinical guidelines
- 💾 **Export Functionality** - Download results as JSON or copy to clipboard

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool (lightning-fast)
- **Axios** - HTTP client
- **React Icons** - Icon library
- **CSS3** - Custom styling with CSS variables

## Project Structure

```
src/
├── components/           # React components
│   ├── Navbar.jsx       # Navigation bar
│   ├── FileUpload.jsx   # VCF file upload
│   ├── DrugInput.jsx    # Drug selection
│   ├── ResultCard.jsx   # Results display
│   ├── JsonViewer.jsx   # JSON output viewer
│   ├── Loader.jsx       # Loading spinner
│   ├── ErrorMessage.jsx # Error display
│   └── [*.css]          # Component styles
│
├── pages/               # Page components (optional)
│   ├── Home.jsx
│   └── About.jsx
│
├── utils/               # Utility functions
│   ├── api.js          # API client
│   ├── validateVCF.js  # VCF validation
│   └── formatJSON.js   # JSON formatting
│
├── styles/              # Global styles
│   ├── globals.css     # Global CSS
│   └── theme.css       # Design system
│
├── App.jsx             # Main app component
└── main.jsx            # React entry point
```

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Backend API running on `http://localhost:8000`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/pharmaguard-frontend.git
   cd PharmaguardFrontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API endpoint
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Application will be available at `http://localhost:5173`

## Usage

### Development Server

```bash
npm run dev
```

Starts development server with hot module replacement.

### Build for Production

```bash
npm run build
```

Creates optimized production build in `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

## API Integration

The frontend communicates with the backend API at `http://localhost:8000/api`.

### Endpoints

- `POST /analyze` - Analyze VCF file and drugs
- `GET /drugs` - Get list of supported drugs
- `POST /validate-vcf` - Validate VCF file
- `GET /health` - API health check

### Request Example

```javascript
import { analyzePharmacogenomics } from './utils/api'

// Analyze VCF and drugs
const result = await analyzePharmacogenomics(vcfFile, ['CODEINE', 'WARFARIN'])
```

## Features

### VCF File Upload

- Drag & drop interface
- File size validation (max 5MB)
- Format validation
- File status display

### Drug Selection

- Search/filter supported drugs
- Add multiple drugs
- Autocomplete suggestions
- Easy removal with one-click delete

### Results Display

- **Risk Assessment** - Quick view of risk level and confidence
- **Pharmagenomics Profile** - Gene, diplotype, and phenotype information
- **Detected Variants** - List of identified genetic variants
- **Clinical Recommendation** - Dosing and monitoring advice
- **AI Explanation** - LLM-generated clinical interpretation
- **Quality Metrics** - VCF parsing and analysis quality

### Export Options

- Copy entire result to clipboard
- Download as JSON file
- Individual result downloads per drug

## Environment Variables

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:8000/api
VITE_LLM_API_KEY=your_api_key_here
```

## Styling & Theme

The application uses a comprehensive CSS variable system for consistent theming:

- **Primary Colors**: Teal (healthcare/trust)
- **Secondary Colors**: Blue (professionalism)
- **Risk Levels**: Green (safe) → Red (toxic)
- **Neutral**: Grays for backgrounds and text

### CSS Variables

```css
--color-primary-600: #0d9488      /* Main teal */
--color-safe: #10b981             /* Green for safe */
--color-adjust: #f59e0b           /* Amber for caution */
--color-toxic: #ef4444            /* Red for toxic */
--color-ineffective: #f97316      /* Orange for ineffective */
```

## Responsive Design

- Mobile-first approach
- Breakpoint at 768px
- Touch-friendly UI
- Optimized for all screen sizes

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

- Lazy loading components
- Optimized CSS transitions
- Efficient re-renders with React
- Fast build with Vite

## Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

### Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Components

### Navbar

Navigation bar with branding and social links.

```jsx
<Navbar />
```

### FileUpload

VCF file upload with validation.

```jsx
<FileUpload onFileSelect={handleFileSelect} disabled={isLoading} />
```

### DrugInput

Drug selection with autocomplete.

```jsx
<DrugInput 
  onDrugSelect={handleDrugSelect}
  supportedDrugs={drugList}
  disabled={isLoading}
/>
```

### ResultCard

Expandable results display.

```jsx
<ResultCard data={analysisResult} />
```

### Loader

Loading indicator with message.

```jsx
<Loader message="Analyzing..." fullScreen />
```

### ErrorMessage

Error/success message display.

```jsx
<ErrorMessage 
  type="error"
  title="Error Title"
  message="Error message"
  onClose={handleClose}
/>
```

## Utilities

### API Client (`utils/api.js`)

```javascript
// Analyze pharmacogenomics
const result = await analyzePharmacogenomics(vcfFile, drugs)

// Get supported drugs
const drugs = await getSupportedDrugs()

// Validate VCF
const validation = await validateVCFFile(vcfFile)
```

### VCF Validation (`utils/validateVCF.js`)

```javascript
// Validate file
const validation = validateVCFFile(file)

// Validate drug names
const validation = validateDrugInput(drugs, supportedDrugs)

// Parse VCF content
const parsed = parseVCFContent(vcfFileContent)
```

### JSON Formatting (`utils/formatJSON.js`)

```javascript
// Format JSON
const formatted = formatJSON(data, 2)

// Get risk color
const color = getRiskColor('Toxic')

// Format confidence
const conf = formatConfidence(0.95)

// Download JSON
downloadJSON(data, 'results.json')

// Copy to clipboard
await copyToClipboard(data)
```

## State Management

Uses React hooks for state management:
- `useState` - Local component state
- `useEffect` - Side effects
- `useRef` - DOM references

Future: Consider Redux or Zustand for complex state.

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Screen reader support

## Performance Optimization

- Code splitting
- Image optimization
- CSS minification
- JavaScript minification
- Lazy component loading

## Testing

Currently no automated tests. Recommend:
- Jest for unit tests
- Vitest for component tests
- Cypress for E2E tests

## Troubleshooting

### API Connection Issues

```javascript
// Check if API is running
fetch('http://localhost:8000/api/health')
  .then(r => r.json())
  .then(console.log)
```

### File Upload Fails

- Verify file is valid VCF format
- Check file size (max 5MB)
- Ensure proper .vcf extension

### Missing Styles

- Clear browser cache
- Rebuild: `npm run build`
- Check CSS file imports

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is part of RIFT 2026 Hackathon. See LICENSE file for details.

## Support

For issues and questions:
- Create GitHub issue
- Email: support@pharmaguard.dev
- Check documentation: [GitHub Wiki]

## Acknowledgments

- RIFT 2026 Organizing Team
- React Community
- Contributors and team members

---

**Made with ❤️ for Precision Medicine** | RIFT 2026 Hackathon
