import React, { useCallback, useState } from 'react';
import { Upload, File, AlertCircle, CheckCircle } from 'lucide-react';
import { FILE_CONFIG } from '../utils/constants';

const FileUpload = ({ onFileUpload, loading, uploadedFile }) => {
  const [dragActive, setDragActive] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Validate file
  const validateFile = useCallback((file) => {
    // Check file type
    if (!FILE_CONFIG.ACCEPTED_TYPES.includes(file.type)) {
      return 'Please select a PDF file only.';
    }

    // Check file size
    if (file.size > FILE_CONFIG.MAX_FILE_SIZE) {
      return 'File size must be less than 10MB.';
    }

    // Check file extension
    const extension = '.' + file.name.split('.').pop().toLowerCase();
    if (!FILE_CONFIG.ACCEPTED_EXTENSIONS.includes(extension)) {
      return 'Invalid file extension. Only .pdf files are allowed.';
    }

    return null;
  }, []);

  // Handle file selection
  const handleFileSelect = useCallback((file) => {
    setValidationError('');
    
    const error = validateFile(file);
    if (error) {
      setValidationError(error);
      return;
    }

    onFileUpload(file);
  }, [validateFile, onFileUpload]);

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  // Handle drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, [handleFileSelect]);

  // Handle input change
  const handleInputChange = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  }, [handleFileSelect]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload PDF File</h2>
        <p className="text-gray-600">
          Select a PDF file to upload and extract pages from it.
        </p>
      </div>

      {!uploadedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-primary-500 bg-primary-50'
              : validationError
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleInputChange}
            disabled={loading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          
          <div className="flex flex-col items-center">
            <Upload className={`w-12 h-12 mb-4 ${
              validationError ? 'text-red-400' : 'text-gray-400'
            }`} />
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {dragActive ? 'Drop your PDF here' : 'Upload PDF File'}
            </h3>
            
            <p className="text-sm text-gray-500 mb-4">
              Drag and drop your PDF file here, or click to browse
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 text-xs text-gray-400">
              <span>• Maximum file size: 10MB</span>
              <span>• Supported format: PDF only</span>
            </div>
          </div>

          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
                <span className="text-sm text-gray-600">Uploading...</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="border border-green-200 bg-green-50 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-green-900 mb-2">
                File Uploaded Successfully
              </h3>
              <div className="space-y-2 text-sm text-green-700">
                <div className="flex items-center space-x-2">
                  <File className="w-4 h-4" />
                  <span className="font-medium">{uploadedFile.originalName}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <span>Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                  <span>Pages: {uploadedFile.pageCount}</span>
                  <span>Uploaded: {new Date(uploadedFile.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {validationError && (
        <div className="mt-4 flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{validationError}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
