import { useState, useCallback } from 'react';
import { pdfAPI } from '../services/api';
import { toast } from 'react-toastify';

export const usePDFManager = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [extractedPDF, setExtractedPDF] = useState(null);
  const [allPDFs, setAllPDFs] = useState([]);

  // Upload PDF file
  const uploadPDF = useCallback(async (file) => {
    try {
      setLoading(true);
      const response = await pdfAPI.uploadPDF(file);
      
      if (response.success) {
        setUploadedFile(response.data);
        toast.success('PDF uploaded successfully!');
        return response.data;
      } else {
        throw new Error(response.message || 'Upload failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Upload failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get all PDFs
  const fetchAllPDFs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await pdfAPI.getAllPDFs();
      
      if (response.success) {
        setAllPDFs(response.data);
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch PDFs';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Extract pages
  const extractPages = useCallback(async (filename, pages) => {
    try {
      setLoading(true);
      const response = await pdfAPI.extractPages(filename, pages);
      
      if (response.success) {
        setExtractedPDF(response.data);
        toast.success(`Successfully extracted ${pages.length} pages!`);
        return response.data;
      } else {
        throw new Error(response.message || 'Extraction failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Extraction failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Toggle page selection
  const togglePageSelection = useCallback((pageNumber) => {
    setSelectedPages(prev => {
      if (prev.includes(pageNumber)) {
        return prev.filter(p => p !== pageNumber);
      } else {
        return [...prev, pageNumber].sort((a, b) => a - b);
      }
    });
  }, []);

  // Clear selections
  const clearSelections = useCallback(() => {
    setSelectedPages([]);
    setExtractedPDF(null);
  }, []);

  // Reset all state
  const resetState = useCallback(() => {
    setUploadedFile(null);
    setSelectedPages([]);
    setExtractedPDF(null);
    setAllPDFs([]);
  }, []);

  return {
    // State
    loading,
    uploadedFile,
    selectedPages,
    extractedPDF,
    allPDFs,
    
    // Actions
    uploadPDF,
    fetchAllPDFs,
    extractPages,
    togglePageSelection,
    clearSelections,
    resetState,
    
    // Utilities
    setUploadedFile,
    setSelectedPages
  };
};
