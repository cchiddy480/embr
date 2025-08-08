import React, { useState } from 'react';

interface AccessCodeEntryProps {
  onSubmit: (code: string, setError: (msg: string) => void, setLoading: (loading: boolean) => void) => void;
  onClose: () => void;
}

export function AccessCodeEntry({ onSubmit, onClose }: AccessCodeEntryProps) {
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() && !isSubmitting) {
      setError('');
      setIsSubmitting(true);
      try {
        await onSubmit(code.trim(), setError, setIsSubmitting);
      } catch (error) {
        setIsSubmitting(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // Allow only alphanumeric characters, hyphens, and underscores
    const allowedChars = /[a-zA-Z0-9\-_]/;
    if (!allowedChars.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
      e.preventDefault();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-[#101926] rounded-2xl p-6 shadow-2xl max-w-md w-full relative border border-[#2d3c5a]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-400 font-sans">Enter Access Code</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors duration-200 p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-xl text-red-200 text-center text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="accessCode" className="block text-sm font-medium text-gray-400 mb-2 font-sans">
              Access Code
            </label>
            <input
              id="accessCode"
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-[#22304a] border border-[#2d3c5a] rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38F9E4] focus:border-transparent font-sans text-lg"
              placeholder="Enter your access code..."
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              maxLength={50}
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-400 mt-2 font-sans">
              Enter the code provided by your event organizer
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 bg-transparent hover:bg-[#22304a] text-white font-semibold py-3 px-4 rounded-xl border border-[#2d3c5a] transition-colors duration-200 font-sans disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!code.trim() || isSubmitting}
              className="flex-1 bg-[#0F766E] hover:bg-[#13a89a] disabled:bg-[#0F766E]/50 text-white font-semibold py-3 px-4 rounded-xl shadow transition-colors duration-200 font-sans disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-6 pt-4 border-t border-[#2d3c5a]">
          <p className="text-xs text-gray-200 text-center font-sans">
            Don't have an access code? Contact your event organizer.
          </p>
        </div>
      </div>
    </div>
  );
} 