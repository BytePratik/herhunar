'use client';

import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';

export default function ReportModal({ talent, isOpen, onClose }) {
  const [reason, setReason] = useState('');
  const [reportedBy, setReportedBy] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen || !talent) return null;

  const handleReport = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app or DB call, we could send to /api/admin or similar
      // For now simulate report submission
      await new Promise(r => setTimeout(r, 600));
      setSubmitted(true);
    } catch (err) {
      alert('Error submitting report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-warm-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-warm-400 hover:text-warm-700 hover:bg-warm-100"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 bg-sage-50 text-sage-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-warm-900 text-lg">Report Received</h3>
            <p className="text-xs text-warm-600">
              Thank you for keeping HerHunar safe. Our admin moderation team reviews flagged listings within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-warm-900 text-white text-xs font-semibold rounded-lg"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleReport} className="space-y-4">
            <div className="flex items-center gap-2 text-terracotta-700">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-bold text-base">Report Listing</h3>
            </div>
            <p className="text-xs text-warm-600">
              Flagging profile of <span className="font-semibold">{talent.name}</span>. Please specify the issue.
            </p>

            <div>
              <label className="block text-xs font-semibold text-warm-700 mb-1">
                Your Email / Contact (Optional)
              </label>
              <input
                type="text"
                value={reportedBy}
                onChange={e => setReportedBy(e.target.value)}
                placeholder="community@example.com"
                className="w-full text-xs px-3 py-2 rounded-lg border border-warm-300 focus:outline-hidden focus:border-terracotta-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-warm-700 mb-1">
                Reason for reporting
              </label>
              <textarea
                required
                rows={3}
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="Misleading pricing, copyright infringement, inappropriate content, etc."
                className="w-full text-xs px-3 py-2 rounded-lg border border-warm-300 focus:outline-hidden focus:border-terracotta-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-warm-600 hover:bg-warm-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-1.5 text-xs font-semibold bg-terracotta-600 text-white rounded-lg hover:bg-terracotta-700"
              >
                {loading ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
