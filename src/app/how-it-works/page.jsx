'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Briefcase, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  HeartHandshake,
  Lock
} from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
          Clarity & Fair Expectations
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-warm-900 leading-tight">
          How HerHunar Works for Everyone
        </h1>
        <p className="text-sm sm:text-base text-warm-600">
          The first version is a discovery and enquiry platform—connecting female talent with verified businesses and families without heavy middleman commissions.
        </p>
      </div>

      {/* 3 Pillars: For Women, For Customers/Companies, For Platform */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* For Women */}
        <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-terracotta-600 uppercase tracking-wider">For Women</span>
            <h3 className="text-xl font-serif font-bold text-warm-900 mt-1">Showcase & Earn</h3>
          </div>
          <ol className="space-y-3 text-xs text-warm-700 leading-relaxed list-decimal list-inside">
            <li className="pl-1">
              <strong>Create Profile:</strong> Add abilities, photos of sample work, and starting rate.
            </li>
            <li className="pl-1">
              <strong>Add Service Details:</strong> Mention your city/area and delivery options.
            </li>
            <li className="pl-1">
              <strong>Review Inquiries:</strong> Receive order requests and budget proposals from companies.
            </li>
            <li className="pl-1">
              <strong>Direct Terms:</strong> Agree on price, advance, and delivery schedule directly.
            </li>
          </ol>
          <div className="pt-2">
            <Link
              href="/join"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta-600 hover:text-terracotta-700"
            >
              <span>Create Your Free Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* For Companies & Customers */}
        <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-warm-200 text-warm-800 flex items-center justify-center font-bold">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-warm-600 uppercase tracking-wider">For Companies</span>
            <h3 className="text-xl font-serif font-bold text-warm-900 mt-1">Search & Hire</h3>
          </div>
          <ol className="space-y-3 text-xs text-warm-700 leading-relaxed list-decimal list-inside">
            <li className="pl-1">
              <strong>Search by Ability:</strong> Browse by craft, culinary specialty, tutoring, or tailoring.
            </li>
            <li className="pl-1">
              <strong>Compare Profiles:</strong> Review portfolios, past reviews, and turnaround times.
            </li>
            <li className="pl-1">
              <strong>Send Direct Request:</strong> Specify quantity, timeline, and proposed budget.
            </li>
            <li className="pl-1">
              <strong>In-App Chat:</strong> Chat in real-time to finalize custom details and samples.
            </li>
          </ol>
          <div className="pt-2">
            <Link
              href="/company"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-warm-900 hover:text-terracotta-600"
            >
              <span>Explore Company Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* For the Platform */}
        <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-sage-700 uppercase tracking-wider">For The Platform</span>
            <h3 className="text-xl font-serif font-bold text-warm-900 mt-1">Trust & Safety</h3>
          </div>
          <ol className="space-y-3 text-xs text-warm-700 leading-relaxed list-decimal list-inside">
            <li className="pl-1">
              <strong>Keep Organized:</strong> Fair discovery algorithms without pay-to-win bias.
            </li>
            <li className="pl-1">
              <strong>Admin Moderation:</strong> Review listings to prevent spam or misleading claims.
            </li>
            <li className="pl-1">
              <strong>Privacy Protection:</strong> Never display residential home addresses publicly.
            </li>
            <li className="pl-1">
              <strong>Community Guidance:</strong> Transparent reporting mechanisms for suspect behavior.
            </li>
          </ol>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sage-700 hover:text-sage-800"
            >
              <span>Review Safety FAQs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Slide 11 Important Notice Box */}
      <div className="bg-warm-100 rounded-3xl p-6 sm:p-8 border border-warm-200/80 text-xs sm:text-sm text-warm-700 space-y-2">
        <h4 className="font-bold text-warm-900 text-base flex items-center gap-2">
          <Lock className="w-4 h-4 text-terracotta-600" />
          <span>Honest Expectations & Student Project Disclaimer</span>
        </h4>
        <p className="leading-relaxed">
          The early version of HerHunar is a discovery, portfolio showcase, and direct communication bridge. It is not an automated payment gateway or an employer of record. We empower women with independent pricing autonomy and encourage safe, respectful mutual collaboration.
        </p>
      </div>
    </div>
  );
}
