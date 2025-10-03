import React, { useState } from 'react';
import { DownloadButton } from './DownloadButton';
import { HelpModal } from './HelpModal';
import { HelpIcon } from './icons';

export const Header: React.FC = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h1 className="text-xl font-bold text-gray-900 ml-2">SweatSmart.guru</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
              <button 
                onClick={() => setIsHelpModalOpen(true)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100" 
                title="Help / How to Save"
              >
                <HelpIcon />
              </button>
              <DownloadButton />
              <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100" title="Share">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
              </button>
              <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100" title="More Options">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
              </button>
          </div>
        </div>
      </header>
      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </>
  );
};