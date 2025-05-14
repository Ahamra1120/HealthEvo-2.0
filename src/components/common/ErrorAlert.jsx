import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

/**
 * ErrorAlert component to display error messages with a retry option
 * 
 * @param {Object} props Component props
 * @param {string} props.message Error message to display
 * @param {Function} props.onRetry Function to call when retry button is clicked
 * @param {Object} props.icon FontAwesome icon to display (optional)
 * @param {string} props.className Additional CSS classes (optional)
 */
const ErrorAlert = ({ message, onRetry, icon = faExclamationTriangle, className = '' }) => {
  return (
    <div className={`bg-red-50 border-l-4 border-red-500 p-4 rounded-md ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <FontAwesomeIcon icon={icon} className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{message}</p>
          {onRetry && (
            <div className="mt-2">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Coba lagi
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;