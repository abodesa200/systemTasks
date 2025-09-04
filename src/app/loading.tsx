import React from 'react';

const Loading = ({ showLoaderText }:{showLoaderText?:boolean}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        {/* Animated spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-[#00c4b4]/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#00c4b4] animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-[#00c4b4]/10"></div>
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-[#00c4b4] animate-spin-reverse"></div>

          {/* Checkmark icon in center */}
          <div className="absolute inset-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#00c4b4]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Loading text with animation */}
        {showLoaderText && (
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            جاري التحميل
            <span className="inline-block animate-bounce">.</span>
            <span className="inline-block animate-bounce delay-100">.</span>
            <span className="inline-block animate-bounce delay-200">.</span>
          </h2>
        )}
      </div>
    </div>
  );
};

export default Loading; 