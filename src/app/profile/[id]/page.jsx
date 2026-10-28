'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  MapPin, 
  Star, 
  ShieldCheck, 
  ArrowLeft, 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  Briefcase, 
  AlertTriangle,
  Sparkles,
  Share2
} from 'lucide-react';
import EnquiryModal from '@/components/EnquiryModal';
import ReportModal from '@/components/ReportModal';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [talent, setTalent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchTalent();
  }, [id]);

  const fetchTalent = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/talents/${id}`);
      const json = await res.json();
      if (json.success) {
        setTalent(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const startDirectChat = () => {
    // Navigate to messages with preselected conversation
    const compId = user?.id || 'comp-1';
    router.push(`/messages?recipient=${talent.id}&name=${encodeURIComponent(talent.name)}`);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-3 border-terracotta-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xs text-warm-500">Loading skill profile...</p>
      </div>
    );
  }

  if (!talent) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold font-serif text-warm-900">Profile Not Found</h2>
        <p className="text-xs text-warm-600">The requested profile might have been archived or removed.</p>
        <Link href="/explore" className="inline-block px-4 py-2 bg-terracotta-600 text-white rounded-lg text-xs font-semibold">
          Return to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-warm-600 hover:text-warm-900 transition mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Explore Directory</span>
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-warm-200/90 shadow-sm p-6 sm:p-10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar and Badges */}
          <div className="flex flex-col items-center sm:items-start flex-shrink-0">
            <div className="relative">
              <img
                src={talent.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"}
                alt={talent.name}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-4 border-warm-100 shadow-md"
              />
              <span className="absolute bottom-2 right-2 bg-sage-500 text-white p-1 rounded-full shadow-sm" title="Verified Profile">
                <ShieldCheck className="w-5 h-5" />
              </span>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs text-warm-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>Joined {talent.joinedDate || 'Recently'}</span>
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-terracotta-100 text-terracotta-800">
                    {talent.category}
                  </span>
                  <span className="text-xs font-medium text-sage-600 bg-sage-50 px-2.5 py-0.5 rounded-full border border-sage-200">
                    Active & Available
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-warm-900 mt-2">
                  {talent.name}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-warm-600">
                  {talent.displayName} • {talent.title}
                </p>
              </div>

              {/* Share & Report Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl border border-warm-300 text-warm-600 hover:bg-warm-100 text-xs font-medium transition flex items-center gap-1"
                  title="Share profile link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{copied ? 'Link Copied!' : 'Share'}</span>
                </button>
                <button
                  onClick={() => setReportOpen(true)}
                  className="p-2 rounded-xl border border-warm-200 text-warm-400 hover:text-terracotta-600 hover:bg-warm-50 text-xs transition"
                  title="Report Listing"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick stats & location */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-warm-100 text-xs">
              <div>
                <span className="text-warm-400 block text-[11px]">Location</span>
                <span className="font-semibold text-warm-800 flex items-center gap-1 mt-0.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-warm-500" />
                  {talent.city}
                </span>
              </div>
              <div>
                <span className="text-warm-400 block text-[11px]">Service Type</span>
                <span className="font-semibold text-warm-800 mt-0.5 block">
                  {talent.serviceType || 'Local & Delivery'}
                </span>
              </div>
              <div>
                <span className="text-warm-400 block text-[11px]">Experience</span>
                <span className="font-semibold text-warm-800 mt-0.5 block">
                  {talent.experience || '2+ years'}
                </span>
              </div>
              <div>
                <span className="text-warm-400 block text-[11px]">Pricing Starts At</span>
                <span className="font-bold text-terracotta-600 mt-0.5 block text-sm">
                  {talent.startingPrice}
                </span>
              </div>
            </div>

            {/* About / Bio */}
            <div>
              <h3 className="text-xs font-bold text-warm-900 uppercase tracking-wider mb-1.5">
                About Her Work & Story
              </h3>
              <p className="text-xs sm:text-sm text-warm-700 leading-relaxed whitespace-pre-line">
                {talent.bio}
              </p>
            </div>

            {/* Abilities & Skills */}
            <div>
              <h3 className="text-xs font-bold text-warm-900 uppercase tracking-wider mb-2">
                Specialized Abilities & Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {(talent.skills || []).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-warm-100 text-warm-800 text-xs rounded-full font-medium border border-warm-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar: Send Enquiry & Direct Chat */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setEnquiryOpen(true)}
                className="px-6 py-3 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Formal Enquiry / Order Request</span>
              </button>

              <button
                onClick={startDirectChat}
                className="px-5 py-3 rounded-xl bg-warm-900 hover:bg-warm-800 text-white font-semibold text-xs sm:text-sm transition flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-warm-300" />
                <span>Open Direct Chat</span>
              </button>

              <span className="text-[11px] text-warm-500 italic">
                Preference: {talent.contactPreference || 'In-App Messages'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Showcase Gallery */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
            Work Samples
          </span>
          <h2 className="text-2xl font-serif font-bold text-warm-900 mt-0.5">
            Portfolio & Craft Examples
          </h2>
          <p className="text-xs text-warm-500">
            Verified photos of recent work, client commissions, and handcrafted samples.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(talent.portfolio || []).map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-warm-200 overflow-hidden shadow-2xs hover:shadow-md transition"
            >
              <div className="h-52 overflow-hidden bg-warm-100">
                <img
                  src={item.image || "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-warm-900 text-sm">{item.title}</h4>
                <p className="text-xs text-warm-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety & Consent notice */}
      <div className="bg-warm-100/70 border border-warm-200 rounded-2xl p-5 text-xs text-warm-600 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-sage-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-warm-800">Privacy & Safety Notice:</span>
          <p>
            HerHunar operates on consent-first policies. Full residential addresses are never displayed publicly. All transactions, delivery agreements, and payments are settled directly between clients and providers.
          </p>
        </div>
      </div>

      {/* Modals */}
      <EnquiryModal
        talent={talent}
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />

      <ReportModal
        talent={talent}
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
      />
    </div>
  );
}
