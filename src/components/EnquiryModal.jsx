'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, Briefcase, Calendar, DollarSign, MessageSquare } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function EnquiryModal({ talent, isOpen, onClose, onSuccess }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: user?.name || '',
    companyEmail: user?.email || '',
    companyPhone: '',
    serviceNeeded: '',
    budget: '',
    deadline: '',
    message: ''
  });

  if (!isOpen || !talent) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        talentId: talent.id,
        companyId: user?.id || `guest-${Date.now()}`,
        companyName: formData.companyName || user?.name || "Interested Client",
        companyEmail: formData.companyEmail || user?.email || "client@example.com",
        companyPhone: formData.companyPhone,
        serviceNeeded: formData.serviceNeeded,
        budget: formData.budget,
        deadline: formData.deadline,
        message: formData.message,
      };

      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        if (onSuccess) onSuccess(data.data);
      } else {
        alert(data.error || 'Failed to submit enquiry');
      }
    } catch (err) {
      alert('Error submitting enquiry: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-warm-200 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-warm-400 hover:text-warm-700 hover:bg-warm-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-sage-50 text-sage-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-serif text-warm-900">Enquiry Sent Successfully!</h3>
            <p className="text-sm text-warm-600 max-w-sm mx-auto">
              Your message and project requirements have been delivered to <span className="font-semibold text-warm-900">{talent.name}</span>.
              A direct conversation thread has been opened in your Messages tab.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <a
                href="/messages"
                className="px-5 py-2.5 rounded-xl bg-terracotta-600 text-white font-medium text-sm hover:bg-terracotta-700 transition shadow-sm"
              >
                Go to Messages & Chat
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-warm-300 text-warm-700 font-medium text-sm hover:bg-warm-50 transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-5 border-b border-warm-100 pb-4">
              <img
                src={talent.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"}
                alt={talent.name}
                className="w-12 h-12 rounded-full object-cover border border-warm-200"
              />
              <div>
                <span className="text-xs text-terracotta-600 font-semibold uppercase tracking-wider">
                  Contact / Hire Request
                </span>
                <h3 className="text-lg font-bold text-warm-900 leading-tight">
                  Connect with {talent.displayName || talent.name}
                </h3>
                <p className="text-xs text-warm-500">{talent.title} • {talent.city}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-warm-700 mb-1">
                    Your Name / Company
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. FabCraft Retailers"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-warm-700 mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.companyEmail}
                    onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-700 mb-1">
                  What specific skill or service do you need?
                </label>
                <input
                  type="text"
                  required
                  value={formData.serviceNeeded}
                  onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                  placeholder="e.g. 50 custom terracotta jewellery sets for Diwali gifting"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-warm-700 mb-1">
                    Estimated Budget
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g. ₹15,000 - ₹20,000"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-warm-700 mb-1">
                    Timeline / Deadline
                  </label>
                  <input
                    type="text"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    placeholder="e.g. Next 2 weeks"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-700 mb-1">
                  Detailed Message or Requirements
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about quantity, customization requirements, design preference..."
                  className="w-full text-xs px-3 py-2 rounded-lg border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-warm-700 hover:bg-warm-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-xs font-semibold bg-terracotta-600 text-white hover:bg-terracotta-700 rounded-lg transition flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Enquiry & Open Chat</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
