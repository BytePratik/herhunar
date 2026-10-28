'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  CheckCircle, 
  Upload, 
  ShieldCheck, 
  User, 
  MapPin, 
  DollarSign, 
  Layers, 
  Heart,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function JoinPage() {
  const router = useRouter();
  const { loginCustom } = useAuth();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdProfile, setCreatedProfile] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    displayName: '',
    email: '',
    phone: '',
    title: '',
    category: 'Art & Crafts',
    skills: '',
    city: '',
    serviceType: 'Local & Online Delivery',
    experience: '2+ years',
    startingPrice: '₹400 onwards',
    bio: '',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    sampleWorkTitle: 'Handcrafted Sample',
    sampleWorkImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    contactPreference: 'In-App Messages & WhatsApp'
  });

  const categories = [
    'Art & Crafts',
    'Baking & Food',
    'Stitching & Tailoring',
    'Tutoring & Education',
    'Digital & Design',
    'Beauty & Wellness'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        displayName: formData.displayName || formData.name,
        email: formData.email,
        phone: formData.phone,
        title: formData.title || `${formData.category} Specialist`,
        category: formData.category,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        city: formData.city,
        serviceType: formData.serviceType,
        experience: formData.experience,
        startingPrice: formData.startingPrice,
        bio: formData.bio,
        avatar: formData.avatar,
        portfolio: [
          {
            title: formData.sampleWorkTitle || "Sample Work",
            image: formData.sampleWorkImage || "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
            description: "Handcrafted directly by provider."
          }
        ],
        contactPreference: formData.contactPreference
      };

      const res = await fetch('/api/talents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (json.success) {
        setCreatedProfile(json.data);
        // Automatically switch logged-in user to this newly created talent!
        loginCustom({
          id: json.data.id,
          name: json.data.name,
          displayName: json.data.displayName,
          email: json.data.email,
          role: 'talent',
          category: json.data.category,
          avatar: json.data.avatar
        });
        setSuccess(true);
      } else {
        alert(json.error || 'Failed to create profile');
      }
    } catch (err) {
      alert('Error creating profile: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success && createdProfile) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-sage-50 text-sage-600 rounded-full flex items-center justify-center mx-auto border-2 border-sage-200">
          <CheckCircle className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-terracotta-600 uppercase tracking-wider">
            Profile Created Successfully
          </span>
          <h2 className="text-3xl font-serif font-bold text-warm-900">
            Welcome to HerHunar, {createdProfile.name}!
          </h2>
          <p className="text-sm text-warm-600 max-w-md mx-auto">
            Your ability profile for <strong className="text-warm-800">{createdProfile.category}</strong> is now active. Companies and clients can discover your abilities and send project requests.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-warm-200 p-5 text-left text-xs space-y-2">
          <div className="font-semibold text-warm-900">Your Profile Summary:</div>
          <div><span className="text-warm-400">Display Name:</span> {createdProfile.displayName}</div>
          <div><span className="text-warm-400">Skills:</span> {createdProfile.skills.join(', ')}</div>
          <div><span className="text-warm-400">Location:</span> {createdProfile.city}</div>
          <div><span className="text-warm-400">Starting Rate:</span> {createdProfile.startingPrice}</div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={() => router.push(`/profile/${createdProfile.id}`)}
            className="px-6 py-3 rounded-xl bg-terracotta-600 text-white font-semibold text-xs sm:text-sm hover:bg-terracotta-700 transition shadow-sm flex items-center gap-2"
          >
            <span>View Your Public Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => router.push('/dashboard/talent')}
            className="px-6 py-3 rounded-xl bg-warm-900 text-white font-semibold text-xs sm:text-sm hover:bg-warm-800 transition"
          >
            Go to Talent Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-terracotta-600">
          List Your Ability & Get Hired
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-warm-900">
          Join as a Woman Service Provider
        </h1>
        <p className="text-xs sm:text-sm text-warm-600">
          A short, respectful form to showcase what you do best. Zero listing fees, complete control over your pricing.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-3xl border border-warm-200/90 shadow-sm p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Basic Identity */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-warm-900 uppercase tracking-wider flex items-center gap-2 border-b border-warm-100 pb-2">
              <User className="w-4 h-4 text-terracotta-600" />
              <span>Step 1: Your Personal & Display Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-warm-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Asha Sharma"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-700 mb-1">
                  Brand or Display Name
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  placeholder="e.g. Asha Creates or Asha Boutique"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-warm-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="asha@example.com"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-700 mb-1">
                  Phone / WhatsApp (Kept Private)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Ability & Category */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-warm-900 uppercase tracking-wider flex items-center gap-2 border-b border-warm-100 pb-2">
              <Layers className="w-4 h-4 text-terracotta-600" />
              <span>Step 2: What Ability Do You Offer?</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-warm-700 mb-1">
                  Primary Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-700 mb-1">
                  Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Handmade Terracotta & Macrame Jewellery"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-warm-700 mb-1">
                Specific Skills & Abilities (Comma separated) *
              </label>
              <input
                type="text"
                required
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="e.g. Clay Jewellery, Beadwork, Custom Packaging, Festive Hampers"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
              />
              <span className="text-[11px] text-warm-400 mt-1 block">
                Companies search by these keywords to find you.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-warm-700 mb-1">
                About Your Work & Bio *
              </label>
              <textarea
                rows={3}
                required
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Describe your journey, how you make your items, customization options, and turnaround time..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50 resize-none"
              />
            </div>
          </div>

          {/* Step 3: Location, Pricing & Preference */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-warm-900 uppercase tracking-wider flex items-center gap-2 border-b border-warm-100 pb-2">
              <MapPin className="w-4 h-4 text-terracotta-600" />
              <span>Step 3: Location, Pricing & Contact Terms</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-warm-700 mb-1">
                  City / Area Only *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Jaipur, Rajasthan"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                />
                <span className="text-[10px] text-warm-400">Never write home address.</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-700 mb-1">
                  Starting Price *
                </label>
                <input
                  type="text"
                  required
                  value={formData.startingPrice}
                  onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                  placeholder="e.g. ₹450 / piece or ₹500 / hr"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-700 mb-1">
                  Experience Level
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g. 3 years"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-warm-700 mb-1">
                  Service Delivery Type
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                >
                  <option value="Local & Online Delivery">Local & Online Delivery</option>
                  <option value="Doorstep / In-Person Only">Doorstep / In-Person Only</option>
                  <option value="Remote / Online Sessions">Remote / Online Sessions</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-warm-700 mb-1">
                  Contact Preference
                </label>
                <select
                  value={formData.contactPreference}
                  onChange={(e) => setFormData({ ...formData, contactPreference: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500 bg-warm-50/50"
                >
                  <option value="In-App Messages & WhatsApp">In-App Messages & WhatsApp</option>
                  <option value="In-App Messages Only">In-App Messages Only</option>
                  <option value="Email & Phone">Email & Phone</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy statement */}
          <div className="bg-warm-50 border border-warm-200 rounded-xl p-4 text-xs text-warm-600 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
            <p>
              By submitting this profile, you agree to our community standards. Profiles are reviewed by admin to keep the platform safe and free of spam.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-sm transition shadow-md shadow-terracotta-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Saving Your Profile...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Publish My Skill Profile & Start Getting Discovered</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
