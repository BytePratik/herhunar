'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Heart, 
  Users, 
  Briefcase, 
  Scissors, 
  Cake, 
  Palette, 
  GraduationCap, 
  Laptop, 
  Sparkle,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';
import TalentCard from '@/components/TalentCard';
import EnquiryModal from '@/components/EnquiryModal';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTalentForEnquiry, setSelectedTalentForEnquiry] = useState(null);

  useEffect(() => {
    fetchTalents();
  }, [selectedCategory]);

  const fetchTalents = async () => {
    setLoading(true);
    try {
      const url = selectedCategory === 'All' 
        ? '/api/talents' 
        : `/api/talents?category=${encodeURIComponent(selectedCategory)}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        setTalents(json.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'All', icon: Sparkles, count: 'All' },
    { name: 'Art & Crafts', icon: Palette, count: 'Jewellery, Macrame, Clay' },
    { name: 'Baking & Food', icon: Cake, count: 'Cakes, Bakes, Catering' },
    { name: 'Stitching & Tailoring', icon: Scissors, count: 'Boutique, Blouse, Alterations' },
    { name: 'Tutoring & Education', icon: GraduationCap, count: 'Math, Languages, Mentoring' },
    { name: 'Digital & Design', icon: Laptop, count: 'Graphic Design, Social Media' },
    { name: 'Beauty & Wellness', icon: Sparkle, count: 'Henna, Herbal Care, Skincare' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-12 sm:pb-20 bg-gradient-to-b from-warm-100/70 via-warm-50 to-warm-50 border-b border-warm-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta-100 text-terracotta-800 text-xs font-semibold tracking-wide border border-terracotta-200/60 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-600" />
              <span>{t('brand_tagline')}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-warm-900 tracking-tight leading-[1.15]">
              {t('hero_title')}
            </h1>

            <p className="text-base sm:text-lg text-warm-600 font-normal leading-relaxed max-w-2xl mx-auto">
              {t('hero_sub')}
            </p>

            {/* Main Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/explore"
                className="px-6 py-3.5 rounded-xl bg-terracotta-600 text-white font-semibold text-sm hover:bg-terracotta-700 transition shadow-md shadow-terracotta-600/20 flex items-center gap-2"
              >
                <span>{t('explore_btn')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/join"
                className="px-6 py-3.5 rounded-xl bg-white border border-warm-300 text-warm-800 font-semibold text-sm hover:bg-warm-100 transition shadow-2xs flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-warm-600" />
                <span>{t('join_btn')}</span>
              </Link>

              <Link
                href="/company"
                className="px-5 py-3.5 rounded-xl bg-warm-200/80 hover:bg-warm-200 text-warm-800 font-semibold text-sm transition flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-warm-600" />
                <span>For Companies</span>
              </Link>
            </div>

            {/* Quick Search Input */}
            <div className="pt-6 max-w-xl mx-auto">
              <div className="relative">
                <Search className="w-5 h-5 text-warm-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      window.location.href = `/explore?search=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                  placeholder={t('search_placeholder')}
                  className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-white border border-warm-300 focus:outline-hidden focus:border-terracotta-500 shadow-sm text-sm text-warm-900 placeholder:text-warm-400"
                />
                <Link
                  href={`/explore?search=${encodeURIComponent(searchQuery)}`}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-warm-900 hover:bg-terracotta-600 text-white text-xs font-semibold rounded-xl transition"
                >
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative subtle background circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta-100/30 rounded-full blur-3xl pointer-events-none -z-0"></div>
      </section>

      {/* Category Pills & Directory Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
              Browse Abilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-warm-900 mt-1">
              {t('categories_title')}
            </h2>
            <p className="text-xs sm:text-sm text-warm-500 mt-1">
              Select an ability domain to discover verified skilled women ready to deliver quality work.
            </p>
          </div>

          <Link
            href="/explore"
            className="text-sm font-semibold text-terracotta-600 hover:text-terracotta-700 flex items-center gap-1 self-start md:self-auto"
          >
            <span>View All Profiles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-terracotta-600 text-white border-terracotta-600 shadow-md'
                    : 'bg-white hover:bg-warm-100/80 border-warm-200 text-warm-800'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-warm-100 text-terracotta-600'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight truncate">{cat.name}</div>
                  <div className={`text-[10px] mt-0.5 truncate ${
                    isSelected ? 'text-white/80' : 'text-warm-500'
                  }`}>
                    {cat.count}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Featured Profiles Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-warm-900">
              {selectedCategory === 'All' ? t('featured_talent') : `${selectedCategory} Specialists`}
            </h3>
            <span className="text-xs text-warm-500">{talents.length} Available Providers</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-72 bg-white rounded-2xl border border-warm-200 animate-pulse"></div>
              ))}
            </div>
          ) : talents.length === 0 ? (
            <div className="bg-white rounded-2xl border border-warm-200 p-12 text-center space-y-3">
              <Palette className="w-10 h-10 text-warm-300 mx-auto" />
              <h4 className="font-bold text-warm-800">No profiles found in this category</h4>
              <p className="text-xs text-warm-500">Be the first woman with this skill to create a profile!</p>
              <Link
                href="/join"
                className="inline-block px-4 py-2 bg-terracotta-600 text-white text-xs font-semibold rounded-lg"
              >
                Create Profile
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {talents.map((talent) => (
                <TalentCard
                  key={talent.id}
                  talent={talent}
                  onQuickEnquire={(t) => setSelectedTalentForEnquiry(t)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works (Slide 04 & 11 of the Deck) */}
      <section className="bg-warm-100/70 border-y border-warm-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
              A Discover → Connect → Grow Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-warm-900 mt-1">
              How HerHunar Bridges the Gap
            </h2>
            <p className="text-sm text-warm-600 mt-2">
              Skill alone does not guarantee access to customers. HerHunar creates a simple, respectful pathway.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-warm-200 shadow-xs relative">
              <div className="text-xs font-bold text-terracotta-600 mb-2">STEP 01</div>
              <h4 className="font-bold text-warm-900 text-base mb-2">Create a Profile</h4>
              <p className="text-xs text-warm-600 leading-relaxed">
                Add skills, service area, sample work photos, starting price, and contact preference.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-warm-200 shadow-xs relative">
              <div className="text-xs font-bold text-terracotta-600 mb-2">STEP 02</div>
              <h4 className="font-bold text-warm-900 text-base mb-2">Get Discovered</h4>
              <p className="text-xs text-warm-600 leading-relaxed">
                Companies, event organizers, and local families browse categories and find relevant abilities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-warm-200 shadow-xs relative">
              <div className="text-xs font-bold text-terracotta-600 mb-2">STEP 03</div>
              <h4 className="font-bold text-warm-900 text-base mb-2">Start a Conversation</h4>
              <p className="text-xs text-warm-600 leading-relaxed">
                Clients send direct project enquiries, discuss requirements, and agree on pricing directly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-warm-200 shadow-xs relative">
              <div className="text-xs font-bold text-terracotta-600 mb-2">STEP 04</div>
              <h4 className="font-bold text-warm-900 text-base mb-2">Build Reputation</h4>
              <p className="text-xs text-warm-600 leading-relaxed">
                Add real client portfolio items, collect authentic reviews, and grow an independent income.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Callout (Slide 14 of Deck) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-terracotta-900 to-warm-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-semibold tracking-wider text-terracotta-300 uppercase">
              Trust, Privacy & Respect
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
              A Platform Built with Privacy-First Design.
            </h2>
            <p className="text-sm text-warm-200 leading-relaxed">
              We never show a woman’s exact home address publicly. We show city/service area only. Contact details are shared only with explicit consent, and listings are actively moderated.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage-200" />
                <span>Zero Listing Fees to Start</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage-200" />
                <span>Admin Moderated Content</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage-200" />
                <span>Direct Client Conversation</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                href="/join"
                className="px-6 py-3 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-bold transition shadow-sm"
              >
                List Your Skill Today
              </Link>
              <Link
                href="/how-it-works"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
              >
                Learn Safety Guidelines
              </Link>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
            <Heart className="w-96 h-96 text-white" />
          </div>
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal
        talent={selectedTalentForEnquiry}
        isOpen={!!selectedTalentForEnquiry}
        onClose={() => setSelectedTalentForEnquiry(null)}
      />
    </div>
  );
}
