import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FileUpload from './components/FileUpload';
import PDFViewer from './components/PDFViewer';
import PageSelector from './components/PageSelector';
import LoadingSpinner from './components/LoadingSpinner';
import { usePDFManager } from './hooks/usePDFManager';
import { pdfAPI } from './services/api';

function App() {
  const {
    loading,
    uploadedFile,
    selectedPages,
    extractedPDF,
    uploadPDF,
    extractPages,
    togglePageSelection,
    clearSelections,
    resetState
  } = usePDFManager();

  // Test API connection on app load
  useEffect(() => {
    const testConnection = async () => {
      try {
        await pdfAPI.healthCheck();
        console.log('API connection successful');
      } catch (error) {
        console.error('API connection failed:', error);
        toast.error('Failed to connect to server. Please check if the backend is running.');
      }
    };

    testConnection();
  }, []);

  // Handle file upload
  const handleFileUpload = async (file) => {
    try {
      await uploadPDF(file);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  // Handle page extraction
  const handleExtractPages = async (filename, pages) => {
    try {
      await extractPages(filename, pages);
    } catch (error) {
      console.error('Extraction failed:', error);
    }
  };

  // Handle new upload (reset state)
  const handleNewUpload = () => {
    resetState();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PDF Manager</h1>
              <p className="text-sm text-gray-600">Upload, view, and extract pages from PDF files</p>
            </div>
            {uploadedFile && (
              <button
                onClick={handleNewUpload}
                className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 border border-primary-200 rounded-lg hover:bg-primary-100 transition-colors"
              >
                Upload New File
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* File Upload Section */}
        <FileUpload
          onFileUpload={handleFileUpload}
          loading={loading}
          uploadedFile={uploadedFile}
        />

        {/* PDF Viewer Section */}
        {uploadedFile && (
          <PDFViewer
            uploadedFile={uploadedFile}
            selectedPages={selectedPages}
            onPageToggle={togglePageSelection}
            loading={loading}
          />
        )}

        {/* Page Selector Section */}
        {uploadedFile && (
          <PageSelector
            uploadedFile={uploadedFile}
            selectedPages={selectedPages}
            onExtractPages={handleExtractPages}
            onClearSelection={clearSelections}
            extractedPDF={extractedPDF}
            loading={loading}
          />
        )}

        {/* Global Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6">
              <LoadingSpinner text="Processing..." />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>PDF Manager - Built with React and Node.js</p>
          </div>
        </div>
      </footer>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
