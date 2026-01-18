import React from 'react';
import { X } from 'lucide-react';

const InterviewFeedbackModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
    <div className="w-full max-w-lg rounded-xl bg-dark-900 border border-dark-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Interview Feedback</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={18} />
        </button>
      </div>
      <p className="text-sm text-gray-400">
        Interview feedback is not enabled in this SPC build. Please use the main HRMS portal.
      </p>
      <div className="mt-6 flex justify-end">
        <button onClick={onClose} className="btn-primary">
          Close
        </button>
      </div>
    </div>
  </div>
);

export default InterviewFeedbackModal;
