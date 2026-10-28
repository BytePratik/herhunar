'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Briefcase, 
  Search, 
  CheckCircle2, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Users,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function CompanyHubPage() {
  const router = useRouter();
  const { user, loginCustom, loginAs } = useAuth();

  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    industry: 'Handicrafts & Lifestyle Retail',
    city: 'Jaipur / Delhi',
    website: '',
    about: ''
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const newCompany = {
      id: `comp-${Date.now()}`,
      name: formData.name,
      contactPerson: formData.contactPerson || formData.name,
      email: formData.email,
      role: 'company',
      industry: formData.industry,
      city: formData.city,
      website: formData.website,
      avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80',
      about: formData.about
    };

    loginCustom(newCompany);
    router.push('/explore');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Hero Banner for Companies */}
      <div className="bg-gradient-to-r from-warm-900 via-warm-800 to-terracotta-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="max-w-2xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-warm-200 font-medium">
            <Building2 className="w-3.5 h-3.5 text-terracotta-300" />
            <span>Company & Recruiter Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
            Source Authentic Talent & Ethical Handcrafted Services.
          </h1>

          <p className="text-sm text-warm-200 leading-relaxed">
            Need customized corporate gifts, artisan festive hampers, boutique tailoring for your fashion label, or event catering? HerHunar lets you choose skilled women directly and discuss terms in real-time.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/explore"
              className="px-6 py-3 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-2 shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>Browse All Talents & Hire</span>
            </Link>

            <button
              onClick={() => loginAs('company')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm transition flex items-center gap-1.5"
            >
              <span>Instant Demo: Login as FabCraft Retailers</span>
            </button>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-terracotta-500/20 to-transparent pointer-events-none"></div>
      </div>

      {/* 3 Core Value Pillars for Companies */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-warm-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-terracotta-50 text-terracotta-600 flex items-center justify-center font-bold">
            1
          </div>
          <h3 className="font-bold text-warm-900 text-base">Direct Negotiation</h3>
          <p className="text-xs text-warm-600 leading-relaxed">
            No middleman margins or hidden fees. Send your project quantity and budget directly to the artisan.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-warm-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sage-50 text-sage-600 flex items-center justify-center font-bold">
            2
          </div>
          <h3 className="font-bold text-warm-900 text-base">Measurable Social Impact</h3>
          <p className="text-xs text-warm-600 leading-relaxed">
            Fulfill your organization&apos;s diversity and CSR commitments by supporting women-led micro-enterprises directly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-warm-200 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            3
          </div>
          <h3 className="font-bold text-warm-900 text-base">Rich Portfolio Discovery</h3>
          <p className="text-xs text-warm-600 leading-relaxed">
            Inspect real work samples, ratings from past clients, and clear turnaround preferences before sending an enquiry.
          </p>
        </div>
      </div>

      {/* Company Registration / Account Section */}
      <div className="bg-white rounded-3xl border border-warm-200/90 shadow-sm p-6 sm:p-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-serif font-bold text-warm-900">
              {user?.role === 'company' ? `Signed in as ${user.name}` : 'Create Your Company / Recruiter Account'}
            </h2>
            <p className="text-xs text-warm-600">
              {user?.role === 'company' 
                ? 'Your company account is active. You can browse talents, send formal enquiries, and chat directly.'
                : 'Join companies like FabCraft and Zest Events in discovering authentic female talent.'}
            </p>
          </div>

          {user?.role === 'company' ? (
            <div className="bg-warm-50 rounded-2xl border border-warm-200 p-6 space-y-4 text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-terracotta-600 font-bold">
                ✓
              </div>
              <div>
                <h4 className="font-bold text-warm-900 text-base">{user.name}</h4>
                <p className="text-xs text-warm-500">{user.email} • {user.industry || 'Business Client'}</p>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/dashboard/company"
                  className="px-5 py-2.5 rounded-xl bg-warm-900 text-white text-xs font-semibold hover:bg-warm-800 transition"
                >
                  View Sent Enquiries & Dashboard
                </Link>
                <Link
                  href="/messages"
                  className="px-5 py-2.5 rounded-xl bg-terracotta-600 text-white text-xs font-semibold hover:bg-terracotta-700 transition"
                >
                  Go to Messages
                </Link>
                <Link
                  href="/explore"
                  className="px-5 py-2.5 rounded-xl border border-warm-300 text-warm-700 text-xs font-medium hover:bg-warm-100 transition"
                >
                  Choose More Talents
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-warm-700 mb-1">
                    Company / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. FabCraft Retailers"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-warm-700 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g. Rajiv Singhania"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-warm-700 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@company.com"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-warm-700 mb-1">
                    Industry / Category
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                  >
                    <option value="Handicrafts & Lifestyle Retail">Handicrafts & Lifestyle Retail</option>
                    <option value="Hospitality & Event Catering">Hospitality & Event Catering</option>
                    <option value="Fashion & Apparel Boutique">Fashion & Apparel Boutique</option>
                    <option value="Corporate Gifting & Merchandising">Corporate Gifting & Merchandising</option>
                    <option value="Education & Private Tutoring">Education & Private Tutoring</option>
                    <option value="Individual Conscious Customer">Individual Conscious Customer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-700 mb-1">
                  What kind of skills/work are you looking for?
                </label>
                <textarea
                  rows={2}
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  placeholder="e.g. We need bulk handmade jewellery for festive hampers and artisanal packaging..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-xs sm:text-sm transition shadow-sm"
              >
                Register Company Account & Start Hiring
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
