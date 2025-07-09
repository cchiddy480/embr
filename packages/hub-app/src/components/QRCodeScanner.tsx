import React, { useCallback } from 'react';
import { useZxing } from 'react-zxing';

interface QRCodeScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
}

export function QRCodeScanner({ onScan, onClose }: QRCodeScannerProps) {
  const { ref } = useZxing({
    onDecodeResult(result) {
      onScan(result.getText());
    },
    onError(error) {
      console.error('QR scanning error:', error);
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✕</button>
        <h2 className="text-lg font-bold mb-4">Scan QR Code</h2>
        <video ref={ref as React.RefObject<HTMLVideoElement>} style={{ width: '100%' }} />
      </div>
    </div>
  );
} 