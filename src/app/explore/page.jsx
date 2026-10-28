'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, MapPin, RotateCcw, Sparkles } from 'lucide-react';
import TalentCard from '@/components/TalentCard';
import EnquiryModal from '@/components/EnquiryModal';
import { useLanguage } from '@/context/LanguageContext';

function ExploreContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState('All');
  const [city, setCity] = useState('');
  const [selectedTalentForEnquiry, setSelectedTalentForEnquiry] = useState(null);

  const categories = [
    'All',
    'Art & Crafts',
    'Baking & Food',
    'Stitching & Tailoring',
    'Tutoring & Education',
    'Digital & Design',
    'Beauty & Wellness'
  ];

  const popularCities = ['All India', 'Jaipur', 'Pune', 'New Delhi', 'Bengaluru', 'Kolkata', 'Udaipur'];

  useEffect(() => {
    fetchTalents();
  }, [category, city]);

  const fetchTalents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category !== 'All') params.set('category', category);
      if (city && city !== 'All India') params.set('city', city);
      if (search.trim()) params.set('search', search.trim());

      const res = await fetch(`/api/talents?${params.toString()}`);
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchTalents();
  };

  const handleReset = () => {
    setSearch('');
    setCategory('All');
    setCity('');
    setTimeout(fetchTalents, 10);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
          Discover Real Talent
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-warm-900 mt-1">
          Explore Women’s Skills & Abilities
        </h1>
        <p className="text-sm text-warm-600 mt-1 max-w-2xl">
          Search by craft, subject, culinary specialty, or tailoring service. Directly contact talent without intermediaries.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-warm-200/90 shadow-sm space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-warm-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ability (e.g. handmade terracotta, wedding cake, blouse stitching, ICSE math)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 text-xs sm:text-sm text-warm-900"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-terracotta-600 text-white font-semibold text-xs sm:text-sm rounded-xl hover:bg-terracotta-700 transition"
          >
            Search
          </button>

          {(search || category !== 'All' || city) && (
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 border border-warm-300 text-warm-600 hover:text-warm-900 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-warm-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </form>

        {/* Categories selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-warm-500 flex items-center gap-1 flex-shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition flex-shrink-0 ${
                category === cat
                  ? 'bg-warm-900 text-white shadow-xs'
                  : 'bg-warm-100 text-warm-700 hover:bg-warm-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-warm-500 font-semibold flex items-center gap-1 flex-shrink-0">
            <MapPin className="w-3.5 h-3.5" />
            City:
          </span>
          {popularCities.map((c) => (
            <button
              key={c}
              onClick={() => setCity(c === 'All India' ? '' : c)}
              className={`px-2.5 py-0.5 rounded-md text-[11px] transition flex-shrink-0 ${
                (city === c || (!city && c === 'All India'))
                  ? 'bg-terracotta-100 text-terracotta-800 font-semibold'
                  : 'text-warm-600 hover:text-warm-900'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-warm-600">
        <div>
          Showing <span className="font-bold text-warm-900">{talents.length}</span> profiles
          {category !== 'All' && <span> in <strong className="text-warm-800">{category}</strong></span>}
          {city && <span> in <strong className="text-warm-800">{city}</strong></span>}
        </div>
      </div>

      {/* Grid of Talents */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 bg-white rounded-2xl border border-warm-200 animate-pulse"></div>
          ))}
        </div>
      ) : talents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-warm-200 p-12 text-center space-y-4">
          <Sparkles className="w-10 h-10 text-warm-300 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-warm-900">No matching skill profiles found</h3>
          <p className="text-xs text-warm-500 max-w-sm mx-auto">
            Try adjusting your search terms or resetting filters to browse all verified listings.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-warm-900 text-white text-xs font-semibold rounded-lg hover:bg-terracotta-600 transition"
          >
            Show All Profiles
          </button>
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

      {/* Direct Enquiry Modal */}
      <EnquiryModal
        talent={selectedTalentForEnquiry}
        isOpen={!!selectedTalentForEnquiry}
        onClose={() => setSelectedTalentForEnquiry(null)}
      />
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-warm-500">Loading explore directory...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
