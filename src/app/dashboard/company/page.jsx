'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Search, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  ExternalLink,
  Plus,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import UserSearchBox from '@/components/UserSearchBox';

export default function CompanyDashboardPage() {
  const { user } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSentEnquiries();
  }, [user]);

  const fetchSentEnquiries = async () => {
    setLoading(true);
    try {
      const companyId = user?.role === 'company' ? user.id : 'comp-1';
      const res = await fetch(`/api/enquiries?companyId=${companyId}`);
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-warm-200/90 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center font-bold text-xl border-2 border-warm-200">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-warm-200 text-warm-800">
                Company User Account
              </span>
              <span className="text-xs text-warm-500">{user?.industry || 'Lifestyle & Retail'}</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-warm-900 mt-1">
              {user?.name || 'FabCraft Lifestyle Retailers'}
            </h1>
            <p className="text-xs text-warm-500">
              Track talent proposals, ongoing order requests, and communicate with creators.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/explore"
            className="px-4 py-2 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Find & Hire More Talent</span>
          </Link>
          <Link
            href="/messages"
            className="px-4 py-2 rounded-xl border border-warm-300 text-warm-700 hover:bg-warm-100 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Messages</span>
          </Link>
        </div>
      </div>

      {/* User Account Search Box */}
      <div className="bg-white p-5 rounded-3xl border border-warm-200 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between text-xs font-semibold text-warm-800 px-1">
          <span className="flex items-center gap-1.5 text-terracotta-700 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Quick Platform Search</span>
          </span>
          <span className="text-[11px] text-warm-500 font-normal">
            Search <strong>&ldquo;join&rdquo;</strong>, abilities, candidates, or services
          </span>
        </div>
        <UserSearchBox placeholder="Type 'join' to explore or join, search abilities, candidates, orders..." />
      </div>

      {/* Sent Enquiries Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-warm-900">
            Sent Project Enquiries & Orders
          </h2>
          <p className="text-xs text-warm-500">
            These are the skill providers you contacted through HerHunar.
          </p>
        </div>

        {loading ? (
          <div className="h-40 bg-white rounded-2xl border border-warm-200 animate-pulse"></div>
        ) : enquiries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-warm-200 p-10 text-center space-y-4">
            <Search className="w-8 h-8 text-warm-300 mx-auto" />
            <h4 className="font-bold text-warm-800 text-sm">No enquiries sent yet</h4>
            <p className="text-xs text-warm-500 max-w-sm mx-auto">
              Explore our directory of skilled women—bakers, jewellery makers, tutors, and tailors—and send your first enquiry!
            </p>
            <Link
              href="/explore"
              className="inline-block px-5 py-2.5 rounded-xl bg-terracotta-600 text-white text-xs font-semibold hover:bg-terracotta-700 transition"
            >
              Explore Skills Directory
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                className="bg-white rounded-2xl border border-warm-200 p-5 sm:p-6 shadow-2xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-warm-100 pb-3">
                  <div>
                    <span className="text-[10px] text-terracotta-600 font-bold uppercase tracking-wider block">
                      Enquiry For
                    </span>
                    <h3 className="font-bold text-warm-900 text-base">{enq.talentName}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full ${
                      enq.status === 'accepted' ? 'bg-sage-100 text-sage-800' :
                      enq.status === 'declined' ? 'bg-red-100 text-red-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      Status: {enq.status}
                    </span>
                    <span className="text-[11px] text-warm-400">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <div className="font-semibold text-warm-800">
                    Requirement: <span className="font-normal text-warm-600">{enq.serviceNeeded}</span>
                  </div>
                  <div className="text-warm-500">
                    Budget Offered: <span className="font-medium text-warm-800">{enq.budget}</span> • Timeline: <span className="font-medium text-warm-800">{enq.deadline}</span>
                  </div>
                  <p className="text-warm-600 italic mt-1 bg-warm-50 p-2.5 rounded-lg border border-warm-200/50">
                    &ldquo;{enq.message}&rdquo;
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Link
                    href={`/profile/${enq.talentId}`}
                    className="text-xs text-terracotta-600 hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>View Provider Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  <Link
                    href={`/messages?recipient=${enq.talentId}`}
                    className="px-4 py-1.5 rounded-lg bg-warm-900 hover:bg-terracotta-600 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open Conversation</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
