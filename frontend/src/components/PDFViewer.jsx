import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import { pdfAPI } from '../services/api';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ uploadedFile, selectedPages, onPageToggle }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [loadError, setLoadError] = useState(null);

  const pdfUrl = uploadedFile ? pdfAPI.getPDFFile(uploadedFile.filename) : null;

  // Handle document load success
  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setLoadError(null);
  }, []);

  // Handle document load error
  const onDocumentLoadError = useCallback((error) => {
    console.error('Error loading PDF:', error);
    setLoadError('Failed to load PDF. Please try uploading again.');
  }, []);

  // Navigation functions
  const goToPrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(numPages || 1, prev + 1));
  }, [numPages]);

  const goToPage = useCallback((pageNum) => {
    if (pageNum >= 1 && pageNum <= (numPages || 1)) {
      setCurrentPage(pageNum);
    }
  }, [numPages]);

  // Zoom functions
  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(3.0, prev + 0.2));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(0.5, prev - 0.2));
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1.0);
  }, []);

  // Rotation function
  const rotate = useCallback(() => {
    setRotation(prev => (prev + 90) % 360);
  }, []);

  if (!uploadedFile) {
    return null;
  }

  if (loadError) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="border border-red-200 bg-red-50 rounded-lg p-6 text-center">
          <p className="text-red-600">{loadError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">PDF Preview</h2>
        <p className="text-gray-600">
          Click on pages to select them for extraction. Selected pages: {selectedPages.length}
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Navigation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage <= 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Page</span>
              <input
                type="number"
                min="1"
                max={numPages || 1}
                value={currentPage}
                onChange={(e) => goToPage(parseInt(e.target.value))}
                className="w-16 px-2 py-1 text-sm border border-gray-300 rounded text-center"
              />
              <span className="text-sm text-gray-600">of {numPages || 0}</span>
            </div>
            
            <button
              onClick={goToNextPage}
              disabled={currentPage >= (numPages || 1)}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Zoom and Rotation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={zoomOut}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            
            <span className="text-sm text-gray-600 min-w-[4rem] text-center">
              {Math.round(scale * 100)}%
            </span>
            
            <button
              onClick={zoomIn}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            
            <button
              onClick={resetZoom}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Reset
            </button>
            
            <button
              onClick={rotate}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* PDF Document */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={<LoadingSpinner text="Loading PDF..." />}
          error={
            <div className="text-center py-8">
              <p className="text-red-600">Failed to load PDF</p>
            </div>
          }
        >
          {/* Single Page View */}
          <div className="flex justify-center">
            <div className="relative">
              <Page
                pageNumber={currentPage}
                scale={scale}
                rotate={rotation}
                loading={<LoadingSpinner size="small" text="Loading page..." />}
                className="shadow-lg"
              />
              
              {/* Page Selection Overlay */}
              <div
                className={`absolute inset-0 border-4 rounded cursor-pointer transition-all ${
                  selectedPages.includes(currentPage)
                    ? 'border-primary-500 bg-primary-100 bg-opacity-30'
                    : 'border-transparent hover:border-primary-300 hover:bg-primary-50 hover:bg-opacity-30'
                }`}
                onClick={() => onPageToggle(currentPage)}
              >
                {selectedPages.includes(currentPage) && (
                  <div className="absolute top-2 right-2 bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                )}
              </div>
            </div>
          </div>
        </Document>
      </div>

      {/* Page Grid View for Mobile */}
      <div className="mt-6 lg:hidden">
        <h3 className="text-lg font-medium text-gray-900 mb-4">All Pages</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {numPages && Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
            <div
              key={pageNum}
              className={`relative border-2 rounded-lg cursor-pointer transition-all ${
                selectedPages.includes(pageNum)
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
              onClick={() => onPageToggle(pageNum)}
            >
              <Document file={pdfUrl}>
                <Page
                  pageNumber={pageNum}
                  scale={0.3}
                  loading={<div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-500">Loading...</span>
                  </div>}
                />
              </Document>
              
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                Page {pageNum}
              </div>
              
              {selectedPages.includes(pageNum) && (
                <div className="absolute top-2 right-2 bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
