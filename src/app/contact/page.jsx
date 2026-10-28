'use client';

import React, { useState } from 'react';
import { Mail, HelpCircle, AlertTriangle, CheckCircle2, Send, Shield } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Support', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "Is it free for women to join and list their skills?",
      a: "Yes! The core directory is 100% free to join. Women can list their abilities, city, and sample photos without any upfront listing charge."
    },
    {
      q: "How do companies contact a woman for work or orders?",
      a: "Companies can either send a formal project enquiry specifying their budget and timeline, or start a direct in-app message discussion directly from the woman's profile."
    },
    {
      q: "Is my home address safe?",
      a: "Yes, privacy is designed into every layer. We never show your home address publicly—only your city/service area is visible to ensure your comfort and privacy."
    },
    {
      q: "How are profiles moderated?",
      a: "Every submission passes through an admin moderation queue to prevent spam, counterfeit claims, or unsafe links before appearing on the platform."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
          We&apos;re Here to Help
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-warm-900">
          Contact & Community Support
        </h1>
        <p className="text-xs sm:text-sm text-warm-600">
          Have questions about the platform, want to report a concern, or share feedback on our BBA startup project?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Form */}
        <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-warm-900 text-lg">Send an Enquiry or Feedback</h3>

          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-10 h-10 text-sage-600 mx-auto" />
              <h4 className="font-bold text-warm-900 text-base">Message Received!</h4>
              <p className="text-xs text-warm-600">
                Thank you for reaching out. We usually review and respond within 24–48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-warm-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aarti Desai"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-700 mb-1">Topic</label>
                <select
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                >
                  <option value="General Support">General Support / Question</option>
                  <option value="Partnership / College Feedback">BBA Project Feedback / Partnership</option>
                  <option value="Report Listing">Report a Listing or Suspicious User</option>
                  <option value="Technical Bug">Technical Issue</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you today?..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-warm-900 hover:bg-terracotta-600 text-white font-semibold text-xs transition shadow-sm"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-warm-900 text-lg flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-terracotta-600" />
            <span>Frequently Asked Questions</span>
          </h3>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-warm-200 p-4 space-y-1.5 shadow-2xs">
                <h4 className="font-bold text-warm-900 text-xs sm:text-sm">{f.q}</h4>
                <p className="text-xs text-warm-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="bg-sage-50 border border-sage-200 rounded-2xl p-4 text-xs text-sage-800 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-sage-600" />
              <span>Safety Tip:</span>
            </div>
            <p>
              Always keep communications clear and never transfer full payment upfront before approving samples or agreeing on delivery milestones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
