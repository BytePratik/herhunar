'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, 
  MessageSquare, 
  Check, 
  X, 
  Clock, 
  Calendar, 
  DollarSign, 
  Building2, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import UserSearchBox from '@/components/UserSearchBox';

export default function TalentDashboardPage() {
  const router = useRouter();
  const { user, loginAs } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, [user]);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const talentId = user?.role === 'talent' ? user.id : 'talent-1';
      const res = await fetch(`/api/enquiries?talentId=${talentId}`);
      const json = await res.json();
      if (json.success) {
        setEnquiries(json.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (enquiryId, newStatus) => {
    try {
      const res = await fetch('/api/enquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: enquiryId, status: newStatus })
      });
      const json = await res.json();
      if (json.success) {
        setEnquiries(prev => prev.map(e => e.id === enquiryId ? { ...e, status: newStatus } : e));
      }
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-warm-200/90 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"}
            alt={user?.name || "Talent"}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-warm-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-terracotta-100 text-terracotta-800">
                Talent User Account
              </span>
              <span className="text-xs text-sage-600 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified
              </span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-warm-900 mt-1">
              Namaste, {user?.name || 'Asha Sharma'}!
            </h1>
            <p className="text-xs text-warm-500">
              Manage incoming project enquiries and communicate with clients.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={user?.role === 'talent' ? `/profile/${user.id}` : '/profile/talent-1'}
            className="px-4 py-2 rounded-xl border border-warm-300 text-warm-700 hover:bg-warm-100 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <span>View Public Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/messages"
            className="px-4 py-2 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Open Messages</span>
          </Link>
        </div>
      </div>

      {/* User Account Search Box (Searches 'join', skills, abilities, etc.) */}
      <div className="bg-white p-5 rounded-3xl border border-warm-200 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between text-xs font-semibold text-warm-800 px-1">
          <span className="flex items-center gap-1.5 text-terracotta-700 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>User Account Quick Search</span>
          </span>
          <span className="text-[11px] text-warm-500 font-normal">
            Search <strong>&ldquo;join&rdquo;</strong> to add abilities, or explore companies & skills
          </span>
        </div>
        <UserSearchBox placeholder="Type 'join' to add skills, or search abilities, companies, enquiries..." />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-warm-200 shadow-2xs">
          <span className="text-xs text-warm-500 font-medium">Total Enquiries Received</span>
          <div className="text-2xl font-serif font-bold text-warm-900 mt-1">{enquiries.length}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-warm-200 shadow-2xs">
          <span className="text-xs text-warm-500 font-medium">Accepted Projects</span>
          <div className="text-2xl font-serif font-bold text-sage-600 mt-1">
            {enquiries.filter(e => e.status === 'accepted').length}
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-warm-200 shadow-2xs">
          <span className="text-xs text-warm-500 font-medium">Pending Response</span>
          <div className="text-2xl font-serif font-bold text-amber-600 mt-1">
            {enquiries.filter(e => e.status === 'pending').length}
          </div>
        </div>
      </div>

      {/* Enquiries Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-serif font-bold text-warm-900">
              Incoming Enquiries from Companies & Clients
            </h2>
            <p className="text-xs text-warm-500">
              Review company requirements, proposed budget, and accept or chat directly.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="h-40 bg-white rounded-2xl border border-warm-200 animate-pulse"></div>
        ) : enquiries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-warm-200 p-10 text-center space-y-3">
            <MessageSquare className="w-8 h-8 text-warm-300 mx-auto" />
            <h4 className="font-bold text-warm-800 text-sm">No enquiries yet</h4>
            <p className="text-xs text-warm-500 max-w-sm mx-auto">
              Companies will reach out when they discover your ability in the directory. You can also view how companies see your profile.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                className="bg-white rounded-2xl border border-warm-200 p-5 sm:p-6 shadow-2xs space-y-4 hover:border-warm-300 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-warm-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-warm-100 text-warm-700 flex items-center justify-center font-bold">
                      <Building2 className="w-5 h-5 text-terracotta-600" />
                    </div>
                    <div>
                      <div className="font-bold text-warm-900 text-sm">{enq.companyName}</div>
                      <div className="text-xs text-warm-500">{enq.companyEmail} • {enq.companyPhone || 'Phone upon request'}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full ${
                      enq.status === 'accepted' ? 'bg-sage-100 text-sage-800' :
                      enq.status === 'declined' ? 'bg-red-100 text-red-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {enq.status}
                    </span>
                    <span className="text-[11px] text-warm-400">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-terracotta-700">
                    Service Required: <span className="text-warm-900 font-bold">{enq.serviceNeeded}</span>
                  </div>
                  <p className="text-xs text-warm-700 bg-warm-50 p-3 rounded-xl border border-warm-200/60 leading-relaxed">
                    &ldquo;{enq.message}&rdquo;
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-4 text-warm-600">
                    <div>
                      <span className="text-warm-400 block text-[10px]">Offered Budget</span>
                      <span className="font-bold text-warm-900">{enq.budget || 'To be discussed'}</span>
                    </div>
                    <div>
                      <span className="text-warm-400 block text-[10px]">Timeline</span>
                      <span className="font-semibold text-warm-900">{enq.deadline || 'Flexible'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {enq.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(enq.id, 'accepted')}
                          className="px-3 py-1.5 rounded-lg bg-sage-500 hover:bg-sage-600 text-white font-semibold text-xs transition flex items-center gap-1 shadow-2xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Accept Request</span>
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(enq.id, 'declined')}
                          className="px-3 py-1.5 rounded-lg border border-warm-300 text-warm-600 hover:bg-warm-100 text-xs transition"
                        >
                          Decline
                        </button>
                      </>
                    )}

                    <Link
                      href={`/messages?recipient=${enq.companyId}&name=${encodeURIComponent(enq.companyName)}`}
                      className="px-3.5 py-1.5 rounded-lg bg-warm-900 hover:bg-terracotta-600 text-white text-xs font-semibold transition flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat with Client</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
