# PharmaGuard Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                   User Browser                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         PharmaGuard Frontend (React/Vite)           │   │
│  │  ┌────────────────────────────────────────────────┐ │   │
│  │  │  Components Layer                              │ │   │
│  │  │  - Navbar, FileUpload, DrugInput               │ │   │
│  │  │  - ResultCard, JsonViewer, Loader              │ │   │
│  │  └────────────────────────────────────────────────┘ │   │
│  │  ┌────────────────────────────────────────────────┐ │   │
│  │  │  State & Logic Layer                           │ │   │
│  │  │  - App.jsx (main state management)             │ │   │
│  │  │  - React Hooks (useState, useEffect)           │ │   │
│  │  └────────────────────────────────────────────────┘ │   │
│  │  ┌────────────────────────────────────────────────┐ │   │
│  │  │  Utility Layer                                 │ │   │
│  │  │  - API client (Axios)                          │ │   │
│  │  │  - VCF validation                              │ │   │
│  │  │  - JSON formatting                             │ │   │
│  │  └────────────────────────────────────────────────┘ │   │
│  │  ┌────────────────────────────────────────────────┐ │   │
│  │  │  Styling Layer                                 │ │   │
│  │  │  - CSS Variables (theme system)                │ │   │
│  │  │  - Component-scoped styles                     │ │   │
│  │  └────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          ↓ HTTP/REST
┌─────────────────────────────────────────────────────────────┐
│          FastAPI Backend (Python)                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  - VCF parsing & validation                         │   │
│  │  - Pharmacogenomic analysis                         │   │
│  │  - Drug-gene interaction prediction                 │   │
│  │  - LLM integration for explanations                 │   │
│  │  - CPIC guideline alignment                         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Hierarchy

```
App (Root)
├── Navbar
└── Main Content
    ├── Hero Section
    ├── Analysis Section
    │   ├── InputForm
    │   │   ├── FileUpload
    │   │   ├── DrugInput
    │   │   └── AnalyzeButton
    │   ├── Loader (when loading)
    │   ├── ResultsDisplay (when done)
    │   │   ├── ResultCard (collapsible sections)
    │   │   └── JsonViewer
    │   └── ErrorMessage (if errors)
    └── InfoSection
```

## Data Flow

### User Session Flow

```
1. User uploads VCF file
   ↓
   FileUpload validates:
   - File extension (.vcf)
   - File size (< 5MB)
   ↓

2. User selects drug(s)
   ↓
   DrugInput validates:
   - Non-empty
   - Against supported drugs
   ↓

3. User clicks "Analyze"
   ↓
   App sends API request:
   - formData with file
   - Selected drugs
   ↓

4. Backend processes
   ↓
   Backend returns JSON matching:
   {
     patient_id,
     drug,
     risk_assessment,
     pharmacogenomic_profile,
     clinical_recommendation,
     llm_generated_explanation,
     quality_metrics
   }
   ↓

5. Frontend displays results
   ↓
   User can:
   - View detailed results (expandable)
   - View raw JSON
   - Download results
   - Copy to clipboard
```

## State Management

### Current Approach (React Hooks)

```javascript
// Using useState for local state
const [vcfFile, setVcfFile] = useState(null)
const [drugs, setDrugs] = useState([])
const [results, setResults] = useState(null)
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState(null)
```

**Pros:**
- Simple and lightweight
- No external dependencies
- Good for small to medium apps
- Built into React

**Cons:**
- Prop drilling for deeply nested components
- State scattered across components
- Difficult to debug in large apps

**Future Consideration:**
- Redux for complex global state
- Zustand for lightweight state management
- Recoil for atom-based state

## API Contract

### Request: POST /analyze

```http
Content-Type: multipart/form-data

{
  vcf_file: File,           // VCF file
  drugs: string[]           // Drug names
}
```

### Response: Success (200)

```json
{
  "patient_id": "PATIENT_001",
  "drug": "CODEINE",
  "timestamp": "2026-02-19T10:30:00Z",
  "risk_assessment": {
    "risk_label": "Adjust Dosage",
    "confidence_score": 0.92,
    "severity": "moderate"
  },
  "pharmacogenomic_profile": {
    "primary_gene": "CYP2D6",
    "diplotype": "*1/*2",
    "phenotype": "IM",
    "detected_variants": [
      {
        "rsid": "rs3892097",
        "gene": "CYP2D6",
        "impact": "moderate"
      }
    ]
  },
  "clinical_recommendation": {
    "dosing": "Consider 75% of standard dose",
    "rationale": "Patient is intermediate metabolizer",
    "monitoring": "Monitor effectiveness and side effects"
  },
  "llm_generated_explanation": {
    "summary": "CYP2D6 IM leads to slower metabolism",
    "mechanism": "Reduced enzyme activity...",
    "citations": ["CPIC Guideline...", "PharmGKB..."]
  },
  "quality_metrics": {
    "vcf_parsing_success": true,
    "variants_identified": 5
  }
}
```

### Response: Error (400+)

```json
{
  "detail": "Error message",
  "status": 400
}
```

## Styling System

### CSS Architecture

```
globals.css
├── Universal resets
├── Body defaults
├── Scrollbar styles
└── Selection styles

theme.css
├── CSS Variables
│   ├── Colors (primary, secondary, risks)
│   ├── Neutral colors (grays)
│   ├── Spacing
│   ├── Border radius
│   └── Shadows
├── Component styles
│   ├── .btn, .btn-primary, etc.
│   ├── .card
│   ├── .input-group, .input-field
│   ├── .badge
│   ├── .alert
│   └── .grid
└── Animations
    ├── fade-in
    ├── slide-up
    └── spin

Component-scoped CSS
├── Navbar.css
├── FileUpload.css
├── DrugInput.css
├── ResultCard.css
├── etc.
```

### Color System

```
Primary (Healthcare/Trust):
  --color-primary-50: #f0fdfa
  --color-primary-600: #0d9488  ← Main
  --color-primary-700: #0f766e
  
Secondary (Professionalism):
  --color-secondary-600: #2563eb

Risk Levels:
  --color-safe: #10b981        ← Green
  --color-adjust: #f59e0b      ← Amber
  --color-toxic: #ef4444       ← Red
  --color-ineffective: #f97316 ← Orange
  --color-unknown: #8b5cf6     ← Purple

Neutral:
  --color-gray-50 through --color-gray-900
```

## Component Details

### FileUpload
- Accepts dropped files
- Validates format and size
- Shows file info
- Clear functionality

### DrugInput
- Autocomplete suggestions
- Add/remove drugs
- Validation warnings
- Supported drugs list display

### ResultCard
- Collapsible sections (6 types)
- Risk assessment badge
- Phenotype interpretation
- Variant listing
- Clinical recommendations
- AI explanations
- Quality metrics

### JsonViewer
- Expand/collapse JSON
- Copy to clipboard
- Syntax highlighting ready
- Pretty formatting

## Performance Considerations

### Current Optimizations
1. CSS variables avoid recalculation
2. Component-scoped styles prevent global pollution
3. Lazy state updates
4. Event delegation

### Possible Improvements
1. Code splitting with React.lazy()
2. Memoization with React.memo()
3. useMemo/useCallback hooks
4. Virtual scrolling for large lists
5. Image optimization

### Bundle Analysis
```bash
npm run build
# Check dist/ size
# Current target: < 300KB gzipped
```

## Error Handling

### Client-side Validation
1. VCF file validation
2. Drug input validation
3. Empty state checks

### API Error Handling
1. Axios interceptors
2. Try-catch blocks
3. User-friendly error messages

### Recovery Strategies
1. Retry on network error
2. Clear cache and retry
3. Fallback to defaults
4. Graceful degradation

## Testing Strategy

### Unit Tests (Recommended)
- Utility functions
- Validation logic
- Formatting functions

### Component Tests
- User interactions
- State changes
- Prop handling

### E2E Tests
- Full workflow
- API integration
- Deployment validation

## Security Considerations

### Frontend Security
1. Input validation (client-side backup)
2. No sensitive data in localStorage
3. CORS headers respected
4. XSS protection via React escaping
5. CSP headers (backend configured)

### Data Handling
1. File upload validation
2. No data persistence
3. Results cleared on reset
4. Secure API communication (HTTPS)

## Browser Compatibility

### Supported
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (same versions)

### Polyfills Needed
- None (modern JavaScript only)

## Accessibility (A11y)

### Features
- Semantic HTML (`<button>`, `<label>`, etc.)
- ARIA labels on interactive elements
- Keyboard navigation support
- Color-not-only information
- Focus management
- Screen reader support

### WCAG 2.1 Level AA Target

## Internationalization (i18n)

### Current
- English only
- Easy to implement later

### Future Plan
1. Extract strings to i18n files
2. Use react-i18next
3. Support multiple languages

## Monitoring & Analytics

### Recommended Setup
```javascript
// Error tracking
Sentry.init({ dsn: 'your-dsn' })

// Page analytics
gtag('config', 'GA_ID')

// Performance monitoring
web-vitals for Core Web Vitals
```

## Deployment Considerations

### Dev Environment
```
npm run dev
http://localhost:5173
Hot reload enabled
Source maps enabled
```

### Production Build
```
npm run build
→ Optimized bundle in dist/
→ Minified CSS/JS
→ Source maps stripped
→ Ready for deployment
```

### CI/CD Pipeline
```
Git push
  ↓
GitHub Actions / GitLab CI
  ↓
npm ci && npm run build
  ↓
Run tests
  ↓
Deploy to Vercel/Netlify
  ↓
Smoke tests
```

## Future Enhancements

1. **User Accounts**
   - Save analysis history
   - User authentication

2. **Advanced Features**
   - Batch processing
   - Scheduled analysis
   - Report generation (PDF)

3. **Collaboration**
   - Share results
   - Comments/annotations
   - Multi-user projects

4. **Integration**
   - EHR system integration
   - Lab system integration

---

**Architecture Version**: 1.0  
**Last Updated**: February 2026  
**Maintainer**: Team Moon
