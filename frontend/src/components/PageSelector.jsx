// import React, { useState, useCallback } from 'react';
// import { Download, Trash2, FileText, AlertCircle } from 'lucide-react';
// import LoadingSpinner from './LoadingSpinner';
// // import { API_CONFIG } from '../utils/constants';

// const PageSelector = ({ 
//   uploadedFile, 
//   selectedPages, 
//   onExtractPages, 
//   onClearSelection, 
//   extractedPDF, 
//   loading 
// }) => {
//   const [extracting, setExtracting] = useState(false);

//   const handleExtract = useCallback(async () => {
//     if (!uploadedFile || selectedPages.length === 0) return;
    
//     try {
//       setExtracting(true);
//       await onExtractPages(uploadedFile.filename, selectedPages);
//     } catch (error) {
//       console.error('Extraction failed:', error);
//     } finally {
//       setExtracting(false);
//     }
//   }, [uploadedFile, selectedPages, onExtractPages]);

//   const handleDownload = useCallback(() => {
//     if (extractedPDF) {
//       const downloadUrl = `${process.env.NODE_ENV === 'production' 
//         ? 'https://your-app-name.onrender.com/api/pdf'
//         : 'http://localhost:5000/api/pdf'
//       }/extracted/${extractedPDF.extractedFile}`;
      
//       // Create a temporary link and trigger download
//       const link = document.createElement('a');
//       link.href = downloadUrl;
//       link.download = extractedPDF.extractedFile;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   }, [extractedPDF]);

//   if (!uploadedFile) {
//     return null;
//   }

//   return (
//     <div className="w-full max-w-4xl mx-auto mt-8">
//       <div className="bg-white border border-gray-200 rounded-lg p-6">
//         <h3 className="text-xl font-bold text-gray-900 mb-4">Page Selection</h3>
        
//         {/* Selection Summary */}
//         <div className="mb-6">
//           <div className="flex flex-wrap items-center gap-4 mb-4">
//             <div className="flex items-center space-x-2">
//               <FileText className="w-5 h-5 text-gray-500" />
//               <span className="text-sm text-gray-600">
//                 Total Pages: <span className="font-medium">{uploadedFile.pageCount}</span>
//               </span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <span className="text-sm text-gray-600">
//                 Selected: <span className="font-medium text-primary-600">{selectedPages.length}</span>
//               </span>
//             </div>
//           </div>

//           {/* Selected Pages Display */}
//           {selectedPages.length > 0 && (
//             <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
//               <p className="text-sm text-primary-700 mb-2">Selected pages:</p>
//               <div className="flex flex-wrap gap-2">
//                 {selectedPages.map((pageNum) => (
//                   <span
//                     key={pageNum}
//                     className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
//                   >
//                     Page {pageNum}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <button
//             onClick={handleExtract}
//             disabled={selectedPages.length === 0 || extracting || loading}
//             className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             {extracting ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                 <span>Extracting...</span>
//               </>
//             ) : (
//               <>
//                 <FileText className="w-4 h-4" />
//                 <span>Extract Selected Pages</span>
//               </>
//             )}
//           </button>

//           <button
//             onClick={onClearSelection}
//             disabled={selectedPages.length === 0 || extracting || loading}
//             className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             <Trash2 className="w-4 h-4" />
//             <span>Clear Selection</span>
//           </button>
//         </div>

//         {/* Extraction Result */}
//         {extractedPDF && (
//           <div className="mt-6 border border-green-200 bg-green-50 rounded-lg p-4">
//             <div className="flex items-start space-x-3">
//               <div className="flex-shrink-0">
//                 <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
//                   <FileText className="w-4 h-4 text-white" />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <h4 className="text-lg font-medium text-green-900 mb-2">
//                   Pages Extracted Successfully!
//                 </h4>
//                 <div className="space-y-2 text-sm text-green-700">
//                   <p>
//                     <span className="font-medium">File:</span> {extractedPDF.extractedFile}
//                   </p>
//                   <p>
//                     <span className="font-medium">Pages extracted:</span> {extractedPDF.extractedPages.join(', ')}
//                   </p>
//                   <p>
//                     <span className="font-medium">Size:</span> {(extractedPDF.size / 1024 / 1024).toFixed(2)} MB
//                   </p>
//                 </div>
//                 <button
//                   onClick={handleDownload}
//                   className="mt-4 flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                 >
//                   <Download className="w-4 h-4" />
//                   <span>Download Extracted PDF</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Instructions */}
//         {selectedPages.length === 0 && (
//           <div className="mt-6 flex items-start space-x-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
//             <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
//             <div>
//               <p className="font-medium mb-1">How to select pages:</p>
//               <ul className="space-y-1 text-gray-500">
//                 <li>• Click on any page in the PDF viewer to select it</li>
//                 <li>• Selected pages will be highlighted with a blue border</li>
//                 <li>• You can select multiple pages by clicking on different pages</li>
//                 <li>• Click "Extract Selected Pages" when you're ready</li>
//               </ul>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PageSelector;



import React, { useState, useCallback } from 'react';
import { Download, Trash2, FileText, AlertCircle } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import { API_CONFIG } from '../utils/constants'; // Import your API config

const PageSelector = ({ 
  uploadedFile, 
  selectedPages, 
  onExtractPages, 
  onClearSelection, 
  extractedPDF, 
  loading 
}) => {
  const [extracting, setExtracting] = useState(false);

  const handleExtract = useCallback(async () => {
    if (!uploadedFile || selectedPages.length === 0) return;
    
    try {
      setExtracting(true);
      await onExtractPages(uploadedFile.filename, selectedPages);
    } catch (error) {
      console.error('Extraction failed:', error);
    } finally {
      setExtracting(false);
    }
  }, [uploadedFile, selectedPages, onExtractPages]);

  const handleDownload = useCallback(() => {
    if (extractedPDF) {
      // Use the API_CONFIG from constants instead of process.env
      const downloadUrl = `${API_CONFIG.BASE_URL}/extracted/${extractedPDF.extractedFile}`;
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = extractedPDF.extractedFile;
      link.setAttribute('target', '_blank'); // Open in new tab for better compatibility
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [extractedPDF]);

  // Rest of your component remains the same...
  if (!uploadedFile) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Page Selection</h3>
        
        {/* Selection Summary */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">
                Total Pages: <span className="font-medium">{uploadedFile.pageCount}</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                Selected: <span className="font-medium text-primary-600">{selectedPages.length}</span>
              </span>
            </div>
          </div>

          {/* Selected Pages Display */}
          {selectedPages.length > 0 && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <p className="text-sm text-primary-700 mb-2">Selected pages:</p>
              <div className="flex flex-wrap gap-2">
                {selectedPages.map((pageNum) => (
                  <span
                    key={pageNum}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                  >
                    Page {pageNum}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleExtract}
            disabled={selectedPages.length === 0 || extracting || loading}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {extracting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Extracting...</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                <span>Extract Selected Pages</span>
              </>
            )}
          </button>

          <button
            onClick={onClearSelection}
            disabled={selectedPages.length === 0 || extracting || loading}
            className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Selection</span>
          </button>
        </div>

        {/* Extraction Result */}
        {extractedPDF && (
          <div className="mt-6 border border-green-200 bg-green-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-medium text-green-900 mb-2">
                  Pages Extracted Successfully!
                </h4>
                <div className="space-y-2 text-sm text-green-700">
                  <p>
                    <span className="font-medium">File:</span> {extractedPDF.extractedFile}
                  </p>
                  <p>
                    <span className="font-medium">Pages extracted:</span> {extractedPDF.extractedPages.join(', ')}
                  </p>
                  <p>
                    <span className="font-medium">Size:</span> {(extractedPDF.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={handleDownload}
                  className="mt-4 flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Extracted PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {selectedPages.length === 0 && (
          <div className="mt-6 flex items-start space-x-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
            <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium mb-1">How to select pages:</p>
              <ul className="space-y-1 text-gray-500">
                <li>• Click on any page in the PDF viewer to select it</li>
                <li>• Selected pages will be highlighted with a blue border</li>
                <li>• You can select multiple pages by clicking on different pages</li>
                <li>• Click "Extract Selected Pages" when you're ready</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageSelector;
