'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Shield, Sparkles, HelpCircle, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-warm-100 border-t border-warm-200 mt-20 text-warm-700">
      {/* Human Mission Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-b border-warm-200/80">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-terracotta-600 text-white flex items-center justify-center font-serif font-bold text-lg">
                H
              </div>
              <span className="text-xl font-bold font-serif text-warm-900">HerHunar</span>
              <span className="text-xs bg-warm-200 text-warm-800 px-2 py-0.5 rounded-full font-medium">BBA Startup Project</span>
            </div>
            <p className="text-sm text-warm-600 max-w-md leading-relaxed">
              A community-first directory connecting talented women—home bakers, artisans, tutors, and master tailors—with real opportunities from businesses and local customers.
            </p>
            <div className="text-xs text-warm-500 flex items-center gap-1.5 pt-1">
              <span>Made with care for female entrepreneurship</span>
              <Heart className="w-3.5 h-3.5 text-terracotta-500 fill-terracotta-500" />
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-warm-900 mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/explore" className="hover:text-terracotta-600 transition">
                  Explore Skills Directory
                </Link>
              </li>
              <li>
                <Link href="/join" className="hover:text-terracotta-600 transition">
                  Join as a Woman Service Provider
                </Link>
              </li>
              <li>
                <Link href="/company" className="hover:text-terracotta-600 transition">
                  Company & Recruiter Hub
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-terracotta-600 transition">
                  How It Works & Fair Discovery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-warm-900 mb-3">Safety & Governance</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-terracotta-600 transition">
                  Social Impact Mission
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-terracotta-600 transition">
                  Report a Concern / Listing
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-terracotta-600 transition flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-sage-600" />
                  <span>Admin Review Desk</span>
                </Link>
              </li>
              <li className="pt-2 text-xs text-warm-500 leading-tight">
                Privacy by design: Never publicizes exact home addresses. City / Service area only.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-warm-500 gap-3">
        <div>
          © {new Date().getFullYear()} HerHunar (BBA Social Enterprise Project). Built with Node.js & React.
        </div>
        <div className="flex items-center gap-4">
          <span>Non-commercial Academic Prototype</span>
          <span>•</span>
          <Link href="/contact" className="hover:underline">Support & FAQs</Link>
        </div>
      </div>
    </footer>
  );
}
