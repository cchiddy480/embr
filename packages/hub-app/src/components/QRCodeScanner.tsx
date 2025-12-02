import React, { useState } from 'react';
import { useZxing } from 'react-zxing';

interface QRCodeScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

export function QRCodeScanner({ onScan, onClose }: QRCodeScannerProps) {
  const [isScanning, setIsScanning] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { ref } = useZxing({
    onDecodeResult(result) {
      setIsScanning(false);
      onScan(result.getText());
    },
    onError(error) {
      console.error('QR scanning error:', error);
      setError('Camera access denied or QR scanner failed to start. Please check your camera permissions.');
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
    <div className="rounded-2xl p-6 shadow-2xl max-w-md w-full relative border border-[#2d3c5a]" style={{ backgroundColor: 'var(--embr-surface)' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white font-sans">Scan QR Code</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors duration-200 p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scanner Area */}
        <div className="relative mb-6">
          <div className="relative overflow-hidden rounded-xl bg-black">
            <video 
              ref={ref as React.RefObject<HTMLVideoElement>} 
              className="w-full h-64 object-cover"
              autoPlay
              playsInline
              muted
            />
            
            {/* Scanning Overlay */}
            {isScanning && !error && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Scanning Frame */}
                  <div className="w-48 h-48 border-2 border-[#38F9E4] rounded-lg relative">
                    {/* Corner Indicators */}
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#38F9E4] rounded-tl-lg"></div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#38F9E4] rounded-tr-lg"></div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#38F9E4] rounded-bl-lg"></div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#38F9E4] rounded-br-lg"></div>
                  </div>
                  
                  {/* Scanning Animation */}
                  <div className="absolute inset-0 w-48 h-48">
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#38F9E4] to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mb-6">
          {error ? (
            <div className="text-red-400 text-sm mb-4">
              {error}
            </div>
          ) : (
            <p className="text-gray-300 text-sm font-sans">
              Position the QR code within the frame to scan
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-transparent hover:bg-[#22304a] text-white font-semibold py-3 px-4 rounded-xl border border-[#2d3c5a] transition-colors duration-200 font-sans"
          >
            Cancel
          </button>
          {error && (
            <button
              onClick={() => {
                setError(null);
                setIsScanning(true);
                // Force re-initialization of the scanner
                window.location.reload();
              }}
              className="flex-1 bg-[#0F766E] hover:bg-[#13a89a] text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 font-sans"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 