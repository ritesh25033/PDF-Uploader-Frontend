# PDF Manager Frontend

A modern, responsive React application for PDF file management with upload, viewing, and page extraction capabilities.

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Components](#components)
- [API Integration](#api-integration)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## ✨ Features

- **📤 PDF Upload**: Drag-and-drop or click to upload PDF files
- **👀 PDF Viewer**: Interactive PDF viewer with zoom, rotation, and navigation
- **📄 Page Selection**: Click to select/deselect individual pages
- **✂️ Page Extraction**: Extract selected pages to create new PDF documents
- **💾 Download**: Download extracted PDF files
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🎨 Modern UI**: Clean, intuitive interface with Tailwind CSS
- **⚡ Real-time Feedback**: Toast notifications and loading states
- **🔒 File Validation**: Client-side validation for file type and size
- **🌐 API Integration**: Seamless integration with backend services

## 🎯 Demo

### Desktop View
- Upload PDF files with drag-and-drop functionality
- View PDF pages with zoom and navigation controls
- Select multiple pages with visual feedback
- Extract and download selected pages

### Mobile View
- Touch-friendly interface
- Responsive PDF viewer
- Grid view for page selection
- Optimized for small screens

## 🔧 Prerequisites

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Modern web browser** with JavaScript enabled
- **Backend API** (PDF Manager Backend) running

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone 
cd pdf-manager-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Install Additional Dependencies

```bash
npm install axios react-pdf lucide-react react-toastify
npm install -D tailwindcss postcss autoprefixer
```

### 4. Setup Tailwind CSS

```bash
npx tailwindcss init -p
```

## ⚙️ Configuration

### Environment Variables

Create environment files in your project root:

#### `.env` (Development)
```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api/pdf
REACT_APP_HEALTH_URL=http://localhost:5000/health

# Debug Settings
REACT_APP_DEBUG=true
REACT_APP_ENABLE_LOGGING=true

# Optional: Alternative URLs
REACT_APP_DEV_API_URL=http://localhost:5000/api/pdf
REACT_APP_DEV_HEALTH_URL=http://localhost:5000/health
```

#### `.env.production` (Production)
```env
# Production API Configuration
REACT_APP_API_URL=https://your-backend-app.onrender.com/api/pdf
REACT_APP_HEALTH_URL=https://your-backend-app.onrender.com/health

# Production Settings
REACT_APP_DEBUG=false
REACT_APP_ENABLE_LOGGING=false

# Optional: Production URLs
REACT_APP_PROD_API_URL=https://your-backend-app.onrender.com/api/pdf
REACT_APP_PROD_HEALTH_URL=https://your-backend-app.onrender.com/health
```

#### `.env.local` (Local Overrides - Optional)
```env
# Local development overrides
REACT_APP_API_URL=http://localhost:5000/api/pdf
REACT_APP_CUSTOM_API_URL=http://localhost:8000/api/pdf
```


## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm start
# or
yarn start
```

The application will start at `http://localhost:3000`

### Production Build

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm install -g serve
serve -s build
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── FileUpload.jsx   # PDF file upload component
│   ├── PDFViewer.jsx    # PDF viewing and page selection
│   ├── PageSelector.jsx # Page extraction controls
│   ├── LoadingSpinner.jsx # Loading indicator
│   └── Toast.jsx        # Notification component
├── hooks/               # Custom React hooks
│   └── usePDFManager.js # PDF management logic
├── services/            # API services
│   └── api.js          # API client and methods
├── utils/              # Utility functions
│   └── constants.js    # Configuration constants
├── App.js              # Main application component
├── App.css             # Application styles
├── index.js            # Application entry point
└── index.css           # Global styles with Tailwind
```

## 🧩 Components

### FileUpload Component
- **Purpose**: Handle PDF file uploads
- **Features**: Drag-and-drop, file validation, progress indication
- **Props**: `onFileUpload`, `loading`, `uploadedFile`

### PDFViewer Component
- **Purpose**: Display PDF pages and handle selection
- **Features**: Zoom, rotation, navigation, page selection
- **Props**: `uploadedFile`, `selectedPages`, `onPageToggle`, `loading`

### PageSelector Component
- **Purpose**: Manage page extraction and download
- **Features**: Selection summary, extraction, download
- **Props**: `uploadedFile`, `selectedPages`, `onExtractPages`, `extractedPDF`

### LoadingSpinner Component
- **Purpose**: Show loading states
- **Features**: Customizable size and text
- **Props**: `size`, `text`

## 🔌 API Integration

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/upload` | Upload PDF file |
| `GET` | `/files` | Get all uploaded PDFs |
| `GET` | `/files/:filename` | View specific PDF |
| `POST` | `/extract/:filename` | Extract pages from PDF |
| `GET` | `/extracted` | Get extracted PDFs |
| `GET` | `/extracted/:filename` | Download extracted PDF |
| `GET` | `/health` | Health check |

### API Service Usage

```javascript
import { pdfAPI } from './services/api';

// Upload PDF
const uploadResult = await pdfAPI.uploadPDF(file);

// Extract pages
const extractResult = await pdfAPI.extractPages(filename, [1, 3, 5]);

// Get PDF URL for viewing
const pdfUrl = pdfAPI.getPDFFile(filename);
```

## 🌍 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:5000/api/pdf` |
| `REACT_APP_HEALTH_URL` | Health check endpoint | `http://localhost:5000/health` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_DEBUG` | Enable debug mode | `false` |
| `REACT_APP_ENABLE_LOGGING` | Enable console logging | `false` |
| `REACT_APP_CUSTOM_API_URL` | Custom API override | - |

### Environment Variable Rules

- All custom variables must start with `REACT_APP_`
- Variables are embedded at build time
- Restart development server after changes
- Use `.env.local` for local overrides (gitignored)

## 🚀 Deployment

### Deploy to Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Add environment variables in Netlify dashboard

3. **Environment Variables in Netlify**:
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com/api/pdf
   REACT_APP_HEALTH_URL=https://your-backend.onrender.com/health
   ```

### Deploy to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**:
   ```bash
   vercel env add REACT_APP_API_URL
   vercel env add REACT_APP_HEALTH_URL
   ```

### Deploy to GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**:
   ```json
   {
     "homepage": "https://yourusername.github.io/pdf-manager-frontend",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

## 🔧 Troubleshooting

### Common Issues

#### 1. "process is not defined" Error
**Problem**: Environment variables not properly configured
**Solution**: 
- Ensure all custom variables start with `REACT_APP_`
- Restart development server after adding variables
- Check constants.js file for proper environment handling

#### 2. PDF Not Loading
**Problem**: CORS or API connection issues
**Solution**:
- Verify backend is running and accessible
- Check API URL in environment variables
- Ensure CORS is properly configured in backend

#### 3. File Upload Fails
**Problem**: File validation or server issues
**Solution**:
- Check file size (max 10MB)
- Ensure file is a valid PDF
- Verify backend upload endpoint is working

#### 4. Page Selection Not Working
**Problem**: PDF viewer or selection logic issues
**Solution**:
- Check PDF.js worker URL in constants
- Verify PDF file is properly loaded
- Check browser console for errors

### Debug Mode

Enable debug mode to get detailed logging:

```env
REACT_APP_DEBUG=true
REACT_APP_ENABLE_LOGGING=true
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Upload PDF file via drag-and-drop
- [ ] Upload PDF file via file picker
- [ ] View PDF pages with navigation
- [ ] Zoom in/out functionality
- [ ] Rotate PDF pages
- [ ] Select/deselect individual pages
- [ ] Extract selected pages
- [ ] Download extracted PDF
- [ ] Test on mobile device
- [ ] Test with different PDF sizes
- [ ] Test error scenarios

### Test Files

Use these types of PDF files for testing:
- Small PDF (< 1MB)
- Large PDF (5-10MB)
- Multi-page PDF (10+ pages)
- Single-page PDF
- Password-protected PDF (should fail)
- Corrupted PDF (should fail)

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make changes and commit**:
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use Tailwind CSS for styling
- Add proper error handling
- Include loading states
- Write descriptive commit messages

