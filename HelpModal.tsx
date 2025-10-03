import React from 'react';
import { CloseIcon } from './icons';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Save & Share on GitHub</h2>
          <p className="text-gray-600 mb-6">
            This is a temporary development environment. To save your work permanently and share it, follow these steps to create a GitHub repository.
          </p>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-800">Download Your Project</h3>
                <p className="text-gray-600 text-sm">Click the "Download Project" button in the header (the arrow pointing down) to save all the code as a single <code className="bg-gray-100 text-red-500 px-1 rounded">.zip</code> file to your computer.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-800">Unzip the Files</h3>
                <p className="text-gray-600 text-sm">Find the downloaded file (e.g., <code className="bg-gray-100 text-red-500 px-1 rounded">SweatSmart-Project.zip</code>) and extract its contents into a new, empty folder on your computer.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-800">Upload to GitHub</h3>
                <p className="text-gray-600 text-sm">
                  Go to <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">GitHub.com/new</a> to create a new repository. Then, follow their instructions to "push an existing repository from the command line" using the folder you just created.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl text-right">
            <button 
                onClick={onClose}
                className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition"
            >
                Got it!
            </button>
        </div>
      </div>
    </div>
  );
};