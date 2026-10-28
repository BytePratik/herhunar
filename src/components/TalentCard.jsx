'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Star, Sparkles, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TalentCard({ talent, onQuickEnquire }) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl border border-warm-200/90 shadow-sm hover:shadow-md hover:border-terracotta-200 transition-all duration-200 flex flex-col overflow-hidden group">
      {/* Profile & Avatar Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start gap-3.5">
          <div className="relative flex-shrink-0">
            <img
              src={talent.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"}
              alt={talent.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-warm-100 group-hover:border-terracotta-300 transition"
            />
            {talent.status === 'approved' && (
              <span className="absolute -bottom-1 -right-1 bg-sage-500 text-white p-0.5 rounded-full border-2 border-white" title="Verified Skill Provider">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-warm-100 text-warm-700">
                {talent.category}
              </span>
              <div className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{talent.rating || '5.0'}</span>
                <span className="text-warm-400 font-normal">({talent.reviewsCount || 1})</span>
              </div>
            </div>

            <Link href={`/profile/${talent.id}`} className="block mt-1">
              <h3 className="font-semibold text-warm-900 group-hover:text-terracotta-600 transition truncate text-base">
                {talent.displayName || talent.name}
              </h3>
            </Link>
            <p className="text-xs text-warm-600 line-clamp-1 font-medium mt-0.5">
              {talent.title}
            </p>
          </div>
        </div>

        {/* Location & Service type */}
        <div className="mt-3 flex items-center justify-between text-xs text-warm-500 border-t border-warm-100 pt-2.5">
          <div className="flex items-center gap-1 truncate max-w-[65%]">
            <MapPin className="w-3.5 h-3.5 text-warm-400 flex-shrink-0" />
            <span className="truncate">{talent.city}</span>
          </div>
          <span className="text-[11px] text-warm-600 bg-warm-50 px-2 py-0.5 rounded border border-warm-200/60 font-medium">
            {talent.serviceType || 'Local & Online'}
          </span>
        </div>
      </div>

      {/* Bio excerpt */}
      <div className="px-5 py-1 text-xs text-warm-600 line-clamp-2 leading-relaxed">
        {talent.bio}
      </div>

      {/* Skills tags */}
      <div className="px-5 py-3 flex flex-wrap gap-1.5">
        {(talent.skills || []).slice(0, 3).map((skill, idx) => (
          <span
            key={idx}
            className="text-[11px] bg-warm-100 text-warm-700 px-2 py-0.5 rounded-full border border-warm-200/50"
          >
            {skill}
          </span>
        ))}
        {talent.skills && talent.skills.length > 3 && (
          <span className="text-[10px] text-warm-500 self-center">
            +{talent.skills.length - 3} more
          </span>
        )}
      </div>

      {/* Card Footer: Price & Actions */}
      <div className="mt-auto px-5 py-3.5 bg-warm-50/80 border-t border-warm-200/70 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-warm-400 block font-medium">
            {t('starting_from')}
          </span>
          <span className="text-xs font-bold text-warm-900">
            {talent.startingPrice || 'Flexible'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onQuickEnquire && (
            <button
              onClick={() => onQuickEnquire(talent)}
              className="px-2.5 py-1.5 rounded-lg border border-warm-300 text-warm-700 hover:text-terracotta-600 hover:border-terracotta-300 bg-white text-xs font-medium transition flex items-center gap-1 shadow-2xs"
              title="Quick Enquiry"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Connect</span>
            </button>
          )}

          <Link
            href={`/profile/${talent.id}`}
            className="px-3.5 py-1.5 rounded-lg bg-warm-900 text-white hover:bg-terracotta-600 transition text-xs font-medium flex items-center gap-1 shadow-sm"
          >
            <span>{t('view_profile')}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
