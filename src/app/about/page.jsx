'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, Globe, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
          BBA Startup Project Concept
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-warm-900 leading-tight">
          Her Skills. Her Income. Her Independence.
        </h1>
        <p className="text-sm sm:text-base text-warm-600 leading-relaxed">
          HerHunar was created to answer one core challenge: In India and across developing communities, talent and skill alone do not guarantee visibility or access to paying customers.
        </p>
      </div>

      {/* The Problem & Solution Cards (Slide 01 & 02) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 space-y-3 shadow-2xs">
          <span className="text-xs font-bold text-warm-400 uppercase tracking-wider">The Reality</span>
          <h3 className="text-xl font-serif font-bold text-warm-900">The Problem We Solve</h3>
          <ul className="text-xs text-warm-600 space-y-2.5 leading-relaxed">
            <li><strong>Low Visibility:</strong> Talented women often sell only to a narrow personal circle or family friends.</li>
            <li><strong>Trust Gap:</strong> Potential buyers and businesses do not know where to find authentic local artisans.</li>
            <li><strong>Digital Barrier:</strong> Many women do not have the technical resources to code personal websites or run expensive ad campaigns.</li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl border border-terracotta-200 p-6 sm:p-8 space-y-3 shadow-2xs bg-gradient-to-br from-white to-warm-50">
          <span className="text-xs font-bold text-terracotta-600 uppercase tracking-wider">The Concept</span>
          <h3 className="text-xl font-serif font-bold text-warm-900">The HerHunar Solution</h3>
          <ul className="text-xs text-warm-700 space-y-2.5 leading-relaxed">
            <li><strong>Free Directory:</strong> A free-to-start, mobile-friendly showcase where women list real abilities.</li>
            <li><strong>Direct Company Inquiries:</strong> Businesses source bulk gifting, tailoring, and catering directly.</li>
            <li><strong>Privacy by Design:</strong> Zero public exposure of home addresses; only city and service area shown.</li>
          </ul>
        </div>
      </div>

      {/* Slide 12 - Inclusion & Language commitment */}
      <div className="bg-warm-100 rounded-3xl p-6 sm:p-10 border border-warm-200 space-y-4">
        <div className="flex items-center gap-2 text-terracotta-700 font-bold text-xs uppercase tracking-wider">
          <Globe className="w-4 h-4" />
          <span>Inclusion & Multilingual Access</span>
        </div>
        <h3 className="text-2xl font-serif font-bold text-warm-900">
          Every Language. More Opportunities.
        </h3>
        <p className="text-xs sm:text-sm text-warm-700 leading-relaxed">
          True social empowerment requires removing language barriers. HerHunar supports bilingual browsing in English and Hindi, with clean typography, fast mobile page speeds for low-data devices, and respectful terms.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-xs sm:text-sm transition shadow-sm"
        >
          <span>Explore Talent Profiles</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
