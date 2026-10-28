'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  UserPlus, 
  Briefcase, 
  MessageSquare, 
  HelpCircle, 
  MapPin, 
  X,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function UserSearchBox({ placeholder = "Search 'join', skills, abilities, companies, or pages..." }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Quick platform actions / pages matching "join" and other common keywords
  const systemActions = [
    {
      id: 'act-join-talent',
      title: 'Join as a Woman Service Provider',
      subtitle: 'List your skills, pricing, and sample work to get discovered',
      url: '/join',
      keywords: ['join', 'sign up', 'register', 'become provider', 'add ability', 'skill', 'talent', 'महिला'],
      icon: UserPlus,
      category: 'Actions'
    },
    {
      id: 'act-join-company',
      title: 'Join as a Company / Recruiter',
      subtitle: 'Create a recruiter profile and hire verified women artisans',
      url: '/company',
      keywords: ['join', 'company', 'hire', 'recruiter', 'business', 'employer', 'order'],
      icon: Briefcase,
      category: 'Actions'
    },
    {
      id: 'act-explore',
      title: 'Explore All Skills & Abilities Directory',
      subtitle: 'Browse jewellery, bakery, tailoring, tutoring, and design',
      url: '/explore',
      keywords: ['explore', 'all', 'skills', 'abilities', 'search', 'find', 'directory'],
      icon: Sparkles,
      category: 'Navigation'
    },
    {
      id: 'act-messages',
      title: 'Direct Messages & In-App Chat',
      subtitle: 'View ongoing conversations and project negotiations',
      url: '/messages',
      keywords: ['chat', 'message', 'talk', 'conversation', 'inbox', 'discuss'],
      icon: MessageSquare,
      category: 'Navigation'
    },
    {
      id: 'act-how',
      title: 'How It Works & Safety Guidelines',
      subtitle: 'Learn about fair discovery, privacy, and enquiry steps',
      url: '/how-it-works',
      keywords: ['how', 'works', 'guide', 'safety', 'privacy', 'rules', 'help'],
      icon: HelpCircle,
      category: 'Navigation'
    }
  ];

  // Sample skill domains for instant discovery
  const popularSkills = [
    { title: 'Handmade Terracotta Jewellery', category: 'Art & Crafts', url: '/explore?category=Art+%26+Crafts' },
    { title: 'Custom Cakes & Artisan Pastries', category: 'Baking & Food', url: '/explore?category=Baking+%26+Food' },
    { title: 'Bridal Blouse Cutting & Alterations', category: 'Stitching & Tailoring', url: '/explore?category=Stitching+%26+Tailoring' },
    { title: 'Secondary Mathematics & Science', category: 'Tutoring & Education', url: '/explore?category=Tutoring+%26+Education' },
    { title: 'Social Media & Brand Design', category: 'Digital & Design', url: '/explore?category=Digital+%26+Design' },
    { title: 'Organic Herbal Skincare & Henna', category: 'Beauty & Wellness', url: '/explore?category=Beauty+%26+Wellness' }
  ];

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const q = query.toLowerCase().trim();

  // Filter actions
  const matchedActions = systemActions.filter(action => {
    if (!q) return true;
    return (
      action.title.toLowerCase().includes(q) ||
      action.subtitle.toLowerCase().includes(q) ||
      action.keywords.some(k => k.toLowerCase().includes(q))
    );
  });

  // Filter skills
  const matchedSkills = popularSkills.filter(skill => {
    if (!q) return true;
    return skill.title.toLowerCase().includes(q) || skill.category.toLowerCase().includes(q);
  });

  const handleSelect = (url) => {
    setIsOpen(false);
    setQuery('');
    router.push(url);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!q) return;

    if (q === 'join' || q.includes('join')) {
      handleSelect('/join');
      return;
    }

    handleSelect(`/explore?search=${encodeURIComponent(query)}`);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-warm-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            placeholder={placeholder}
            className="w-full pl-11 pr-24 py-3 bg-white text-xs sm:text-sm rounded-2xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 shadow-sm text-warm-900 placeholder:text-warm-400 transition"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-20 text-warm-400 hover:text-warm-700 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="submit"
            className="absolute right-2 px-3.5 py-1.5 bg-warm-900 hover:bg-terracotta-600 text-white text-xs font-semibold rounded-xl transition shadow-2xs"
          >
            Search
          </button>
        </div>
      </form>

      {/* Auto-suggest dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl border border-warm-200 shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-98 duration-150 max-h-[420px] overflow-y-auto">
          {/* Quick Match Indicator */}
          {q && (
            <div className="p-3 bg-warm-50 border-b border-warm-100 flex items-center justify-between text-xs">
              <span className="text-warm-600">
                Searching for: <strong className="text-terracotta-700">&ldquo;{query}&rdquo;</strong>
              </span>
              <button
                onClick={() => handleSelect(`/explore?search=${encodeURIComponent(query)}`)}
                className="text-terracotta-600 font-bold hover:underline flex items-center gap-1 text-[11px]"
              >
                <span>Search all results in Directory</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Actions (Join, Explore, Messages) */}
          <div className="p-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-warm-400 px-2 mb-1.5">
              Instant Actions & Navigation
            </div>
            <div className="space-y-1">
              {matchedActions.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-warm-100/80 transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-terracotta-50 text-terracotta-700 flex items-center justify-center group-hover:bg-terracotta-600 group-hover:text-white transition">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-warm-900 group-hover:text-terracotta-700 transition">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-warm-500">{item.subtitle}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-warm-400 group-hover:text-terracotta-600 group-hover:translate-x-0.5 transition" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Popular Abilities */}
          <div className="p-3 border-t border-warm-100 bg-warm-50/40">
            <div className="text-[10px] font-bold uppercase tracking-wider text-warm-400 px-2 mb-1.5">
              Popular Abilities & Craft Categories
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {matchedSkills.slice(0, 4).map((skill, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(skill.url)}
                  className="text-left p-2 rounded-lg hover:bg-white border border-transparent hover:border-warm-200 transition text-xs"
                >
                  <div className="font-semibold text-warm-800 truncate">{skill.title}</div>
                  <div className="text-[10px] text-terracotta-600">{skill.category}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
