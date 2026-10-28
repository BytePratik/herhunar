'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  AlertTriangle, 
  Check, 
  X, 
  Star, 
  Trash2, 
  ExternalLink,
  MessageSquare,
  Search,
  CheckCheck,
  Layers,
  Inbox,
  Filter
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminPage() {
  const { user, loginAs } = useAuth();
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'talents' | 'companies' | 'enquiries' | 'reports'
  const [searchQuery, setSearchQuery] = useState('');
  const [approvingAll, setApprovingAll] = useState(false);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin');
      const json = await res.json();
      if (json.success) {
        setAdminData(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveAllPending = async () => {
    setApprovingAll(true);
    try {
      const res = await fetch('/api/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve_all_pending' })
      });
      const json = await res.json();
      if (json.success) {
        fetchAdminData();
        alert('All pending profiles have been approved successfully!');
      }
    } catch (err) {
      alert('Error approving all: ' + err.message);
    } finally {
      setApprovingAll(false);
    }
  };

  const handleUpdateStatus = async (talentId, newStatus) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_talent_status', talentId, status: newStatus })
      });
      const json = await res.json();
      if (json.success) {
        setAdminData(prev => ({
          ...prev,
          talents: prev.talents.map(t => t.id === talentId ? { ...t, status: newStatus } : t)
        }));
      }
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleToggleFeature = async (talentId) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_feature', talentId })
      });
      const json = await res.json();
      if (json.success) {
        setAdminData(prev => ({
          ...prev,
          talents: prev.talents.map(t => t.id === talentId ? { ...t, isFeatured: !t.isFeatured } : t)
        }));
      }
    } catch (err) {
      alert('Error updating feature status: ' + err.message);
    }
  };

  const handleResolveReport = async (reportId) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resolve_report', reportId })
      });
      const json = await res.json();
      if (json.success) {
        setAdminData(prev => ({
          ...prev,
          reports: prev.reports.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r)
        }));
      }
    } catch (err) {
      alert('Error resolving report: ' + err.message);
    }
  };

  const handleDeleteTalent = async (talentId) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    try {
      const res = await fetch(`/api/talents/${talentId}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setAdminData(prev => ({
          ...prev,
          talents: prev.talents.filter(t => t.id !== talentId)
        }));
      }
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  // Filtered lists based on search
  const q = searchQuery.toLowerCase().trim();
  const filteredTalents = (adminData?.talents || []).filter(t => 
    !q || t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q) || t.city.toLowerCase().includes(q)
  );
  const filteredCompanies = (adminData?.companies || []).filter(c => 
    !q || c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q) || c.city.toLowerCase().includes(q)
  );
  const filteredEnquiries = (adminData?.enquiries || []).filter(e => 
    !q || e.talentName.toLowerCase().includes(q) || e.companyName.toLowerCase().includes(q) || e.serviceNeeded.toLowerCase().includes(q)
  );
  const filteredReports = (adminData?.reports || []).filter(r => 
    !q || r.reason.toLowerCase().includes(r) || r.talentId.toLowerCase().includes(q)
  );

  const pendingCount = (adminData?.talents || []).filter(t => t.status === 'pending').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Admin Header */}
      <div className="bg-warm-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-warm-800 border border-warm-700 flex items-center justify-center text-sage-300">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-warm-800 text-sage-200 border border-warm-700">
                Governance & Moderation
              </span>
              <span className="text-xs text-warm-400">All-in-One Master Desk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              HerHunar Unified Admin Panel
            </h1>
            <p className="text-xs text-warm-300">
              Manage talents, companies, customer enquiries, and reports from one unified dashboard.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {pendingCount > 0 && (
            <button
              onClick={handleApproveAllPending}
              disabled={approvingAll}
              className="px-4 py-2.5 rounded-xl bg-sage-600 hover:bg-sage-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-sage-900/40"
              title="Approve all pending profiles at once"
            >
              <CheckCheck className="w-4 h-4" />
              <span>{approvingAll ? 'Approving...' : `Approve All Pending (${pendingCount})`}</span>
            </button>
          )}

          <button
            onClick={fetchAdminData}
            className="px-4 py-2.5 rounded-xl bg-warm-800 hover:bg-warm-700 text-xs font-semibold text-warm-200 transition"
          >
            Refresh
          </button>
          <Link
            href="/explore"
            className="px-4 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-xs font-semibold text-white transition shadow-sm"
          >
            Public Site
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      {adminData?.stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-warm-200 shadow-2xs">
            <span className="text-[11px] font-semibold text-warm-500 uppercase tracking-wider">Talent Profiles</span>
            <div className="text-3xl font-serif font-bold text-warm-900 mt-1">
              {adminData.stats.totalTalents}
            </div>
            <span className="text-[11px] text-sage-600 mt-1 block">
              {adminData.stats.approvedTalents} Published Live
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-warm-200 shadow-2xs">
            <span className="text-[11px] font-semibold text-warm-500 uppercase tracking-wider">Pending Review</span>
            <div className="text-3xl font-serif font-bold text-amber-600 mt-1">
              {adminData.stats.pendingTalents}
            </div>
            <span className="text-[11px] text-warm-400 mt-1 block">Needs verification</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-warm-200 shadow-2xs">
            <span className="text-[11px] font-semibold text-warm-500 uppercase tracking-wider">Registered Companies</span>
            <div className="text-3xl font-serif font-bold text-warm-900 mt-1">
              {adminData.stats.totalCompanies}
            </div>
            <span className="text-[11px] text-warm-400 mt-1 block">Active recruiters</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-warm-200 shadow-2xs">
            <span className="text-[11px] font-semibold text-warm-500 uppercase tracking-wider">Total Enquiries & Reports</span>
            <div className="text-3xl font-serif font-bold text-terracotta-600 mt-1">
              {(adminData.stats.totalEnquiries || 0) + (adminData.stats.openReports || 0)}
            </div>
            <span className="text-[11px] text-warm-400 mt-1 block">
              {adminData.stats.totalEnquiries || 0} Deals • {adminData.stats.openReports || 0} Reports
            </span>
          </div>
        </div>
      )}

      {/* Control Bar: View Buttons & Live Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-warm-200 shadow-2xs">
        {/* The requested ONE-BUTTON "ALL" View + Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-terracotta-600 text-white shadow-md shadow-terracotta-600/30'
                : 'bg-warm-100 text-warm-700 hover:bg-warm-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>🌟 All in One View (Show Everything)</span>
          </button>

          <button
            onClick={() => setActiveTab('talents')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'talents'
                ? 'bg-warm-900 text-white shadow-xs'
                : 'bg-warm-50 text-warm-700 hover:bg-warm-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Talents ({adminData?.talents?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('companies')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'companies'
                ? 'bg-warm-900 text-white shadow-xs'
                : 'bg-warm-50 text-warm-700 hover:bg-warm-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Companies ({adminData?.companies?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'enquiries'
                ? 'bg-warm-900 text-white shadow-xs'
                : 'bg-warm-50 text-warm-700 hover:bg-warm-100'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Enquiries ({adminData?.enquiries?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'reports'
                ? 'bg-warm-900 text-white shadow-xs'
                : 'bg-warm-50 text-warm-700 hover:bg-warm-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Reports ({adminData?.reports?.length || 0})</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-warm-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across all records..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-warm-50 rounded-xl border border-warm-300 focus:outline-hidden focus:border-terracotta-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="h-64 bg-white rounded-3xl border border-warm-200 animate-pulse flex items-center justify-center text-xs text-warm-400">
          Loading platform records...
        </div>
      ) : (
        <div className="space-y-8">
          {/* SECTION 1: TALENTS / SKILL PROVIDERS */}
          {(activeTab === 'all' || activeTab === 'talents') && (
            <div className="bg-white rounded-3xl border border-warm-200 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-warm-100 flex items-center justify-between bg-warm-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-terracotta-100 text-terracotta-700 flex items-center justify-center font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-warm-900 text-base">
                      Women Service Providers & Talents ({filteredTalents.length})
                    </h3>
                    <p className="text-[11px] text-warm-500">Manage abilities, verification status, and homepage features</p>
                  </div>
                </div>

                {activeTab === 'all' && (
                  <button
                    onClick={() => setActiveTab('talents')}
                    className="text-xs font-semibold text-terracotta-600 hover:underline"
                  >
                    View Talents Only →
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-warm-100/70 border-b border-warm-200 text-warm-700 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Provider</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Abilities / Skills</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-warm-100">
                    {filteredTalents.map((t) => (
                      <tr key={t.id} className="hover:bg-warm-50/60 transition">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={t.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"}
                              alt=""
                              className="w-9 h-9 rounded-full object-cover border border-warm-200"
                            />
                            <div>
                              <div className="font-bold text-warm-900">{t.name}</div>
                              <div className="text-[11px] text-warm-500">{t.displayName} • {t.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-warm-100 text-warm-800 font-medium">
                            {t.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-warm-600">{t.city}</td>
                        <td className="py-3.5 px-4 text-warm-600 max-w-xs">
                          <div className="flex flex-wrap gap-1">
                            {(t.skills || []).slice(0, 2).map((s, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 rounded bg-warm-100 text-[10px]">
                                {s}
                              </span>
                            ))}
                            {t.skills?.length > 2 && (
                              <span className="text-[10px] text-warm-400">+{t.skills.length - 2}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-warm-900">{t.startingPrice}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            t.status === 'approved' ? 'bg-sage-100 text-sage-800' :
                            t.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/profile/${t.id}`}
                              target="_blank"
                              className="p-1.5 text-warm-500 hover:text-warm-900 hover:bg-warm-100 rounded-lg transition"
                              title="Open Profile"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>

                            {t.status === 'pending' ? (
                              <button
                                onClick={() => handleUpdateStatus(t.id, 'approved')}
                                className="px-2.5 py-1 bg-sage-500 hover:bg-sage-600 text-white rounded-lg font-semibold text-[11px] transition shadow-2xs"
                                title="Approve and Publish"
                              >
                                Approve
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUpdateStatus(t.id, 'pending')}
                                className="px-2 py-1 border border-warm-300 text-warm-600 hover:bg-warm-100 rounded-lg text-[11px]"
                                title="Move to review"
                              >
                                Review
                              </button>
                            )}

                            <button
                              onClick={() => handleToggleFeature(t.id)}
                              className={`p-1.5 rounded-lg transition ${
                                t.isFeatured ? 'text-amber-500 bg-amber-50' : 'text-warm-300 hover:text-amber-500'
                              }`}
                              title="Toggle Featured on Homepage"
                            >
                              <Star className="w-3.5 h-3.5 fill-current" />
                            </button>

                            <button
                              onClick={() => handleDeleteTalent(t.id)}
                              className="p-1.5 text-warm-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Delete Listing"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION 2: REGISTERED COMPANIES */}
          {(activeTab === 'all' || activeTab === 'companies') && (
            <div className="bg-white rounded-3xl border border-warm-200 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-warm-100 flex items-center justify-between bg-warm-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-warm-200 text-warm-800 flex items-center justify-center font-bold">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-warm-900 text-base">
                      Registered Companies & Recruiters ({filteredCompanies.length})
                    </h3>
                    <p className="text-[11px] text-warm-500">Corporate clients sourcing talent and placing orders</p>
                  </div>
                </div>

                {activeTab === 'all' && (
                  <button
                    onClick={() => setActiveTab('companies')}
                    className="text-xs font-semibold text-terracotta-600 hover:underline"
                  >
                    View Companies Only →
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-warm-100/70 border-b border-warm-200 text-warm-700 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Company Name</th>
                      <th className="py-3 px-4">Contact Person</th>
                      <th className="py-3 px-4">Industry</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">About Requirements</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-warm-100">
                    {filteredCompanies.map((c) => (
                      <tr key={c.id} className="hover:bg-warm-50/60 transition">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-warm-100 text-warm-700 flex items-center justify-center font-bold text-xs border border-warm-200">
                              {c.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-warm-900">{c.name}</div>
                              <div className="text-[11px] text-warm-500">{c.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-warm-800">{c.contactPerson || c.name}</td>
                        <td className="py-3.5 px-4 text-warm-600">
                          <span className="px-2 py-0.5 rounded bg-warm-100 text-warm-700 text-[11px]">
                            {c.industry || 'Retail'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-warm-600">{c.city || 'India'}</td>
                        <td className="py-3.5 px-4 text-warm-500 max-w-sm truncate">{c.about || 'Looking for artisans'}</td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            href={`/messages`}
                            className="px-3 py-1 bg-warm-900 hover:bg-terracotta-600 text-white rounded-lg text-[11px] font-semibold transition"
                          >
                            View Messages
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION 3: RECENT ENQUIRIES & DEALS */}
          {(activeTab === 'all' || activeTab === 'enquiries') && (
            <div className="bg-white rounded-3xl border border-warm-200 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-warm-100 flex items-center justify-between bg-warm-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-sage-100 text-sage-800 flex items-center justify-center font-bold">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-warm-900 text-base">
                      Client Enquiries & Project Proposals ({filteredEnquiries.length})
                    </h3>
                    <p className="text-[11px] text-warm-500">Live service enquiries sent by companies to talent</p>
                  </div>
                </div>

                {activeTab === 'all' && (
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs font-semibold text-terracotta-600 hover:underline"
                  >
                    View Enquiries Only →
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-warm-100/70 border-b border-warm-200 text-warm-700 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Talent</th>
                      <th className="py-3 px-4">Company</th>
                      <th className="py-3 px-4">Service Needed</th>
                      <th className="py-3 px-4">Budget</th>
                      <th className="py-3 px-4">Deadline</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-warm-100">
                    {filteredEnquiries.map((e) => (
                      <tr key={e.id} className="hover:bg-warm-50/60 transition">
                        <td className="py-3.5 px-4 font-bold text-warm-900">{e.talentName}</td>
                        <td className="py-3.5 px-4 text-warm-700">{e.companyName}</td>
                        <td className="py-3.5 px-4 text-warm-800 font-medium max-w-xs truncate">{e.serviceNeeded}</td>
                        <td className="py-3.5 px-4 font-semibold text-warm-900">{e.budget}</td>
                        <td className="py-3.5 px-4 text-warm-500">{e.deadline}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            e.status === 'accepted' ? 'bg-sage-100 text-sage-800' :
                            e.status === 'declined' ? 'bg-red-100 text-red-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {e.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            href={`/messages?recipient=${e.talentId}`}
                            className="px-2.5 py-1 bg-warm-100 hover:bg-warm-200 text-warm-800 rounded-lg text-[11px] font-semibold transition"
                          >
                            Inspect Chat
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION 4: SAFETY & ABUSE REPORTS */}
          {(activeTab === 'all' || activeTab === 'reports') && (
            <div className="bg-white rounded-3xl border border-warm-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-warm-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-warm-900 text-base">
                      Safety & Abuse Queue ({filteredReports.length})
                    </h3>
                    <p className="text-[11px] text-warm-500">Reports filed by community members for verification</p>
                  </div>
                </div>

                {activeTab === 'all' && (
                  <button
                    onClick={() => setActiveTab('reports')}
                    className="text-xs font-semibold text-terracotta-600 hover:underline"
                  >
                    View Reports Only →
                  </button>
                )}
              </div>

              {filteredReports.length === 0 ? (
                <p className="text-xs text-warm-400 py-4 text-center">No reports filed. Everything is clear!</p>
              ) : (
                <div className="space-y-3">
                  {filteredReports.map((r) => (
                    <div
                      key={r.id}
                      className="p-4 rounded-2xl border border-warm-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-warm-50/50"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            r.status === 'open' ? 'bg-amber-100 text-amber-800' : 'bg-sage-100 text-sage-800'
                          }`}>
                            {r.status}
                          </span>
                          <span className="text-xs font-bold text-warm-800">Target Profile: {r.talentId}</span>
                          <span className="text-[11px] text-warm-400">• {new Date(r.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-warm-700 font-medium">&ldquo;{r.reason}&rdquo;</p>
                        <span className="text-[10px] text-warm-400">Reported by: {r.reportedBy}</span>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <Link
                          href={`/profile/${r.talentId}`}
                          target="_blank"
                          className="px-3 py-1.5 rounded-lg border border-warm-300 text-warm-700 text-xs font-medium hover:bg-white"
                        >
                          Inspect Profile
                        </Link>
                        {r.status === 'open' && (
                          <button
                            onClick={() => handleResolveReport(r.id)}
                            className="px-3 py-1.5 rounded-lg bg-sage-500 hover:bg-sage-600 text-white text-xs font-semibold"
                          >
                            Mark Resolved
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
