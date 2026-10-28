'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ShieldCheck, User, Building2, Repeat, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function CornerPanelSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loginAs } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const isAdmin = pathname.startsWith('/admin') || user?.role === 'admin';

  // Single button instant toggle between User & Admin
  const handleInstantToggle = () => {
    if (isAdmin) {
      // Switch from Admin to User Panel
      loginAs('talent');
      router.push('/dashboard/talent');
    } else {
      // Switch from User to Admin Panel
      loginAs('admin');
      router.push('/admin');
    }
  };

  const handleSelectRole = (role, path) => {
    loginAs(role);
    setExpanded(false);
    router.push(path);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 font-sans">
      {/* Expanded quick-selection menu */}
      {expanded && (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-2xl border border-warm-200 w-60 animate-in fade-in slide-in-from-bottom-2 duration-150 space-y-1 mb-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-warm-400 px-2 py-1">
            Switch Panel / Role
          </div>

          <button
            onClick={() => handleSelectRole('talent', '/dashboard/talent')}
            className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition ${
              user?.role === 'talent' && pathname.includes('dashboard')
                ? 'bg-terracotta-50 text-terracotta-700 font-bold border border-terracotta-200'
                : 'text-warm-700 hover:bg-warm-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-terracotta-600" />
              <span>User Panel (Talent)</span>
            </div>
            {user?.role === 'talent' && <span className="w-2 h-2 rounded-full bg-terracotta-500"></span>}
          </button>

          <button
            onClick={() => handleSelectRole('company', '/dashboard/company')}
            className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition ${
              user?.role === 'company' && pathname.includes('company')
                ? 'bg-warm-200 text-warm-900 font-bold border border-warm-300'
                : 'text-warm-700 hover:bg-warm-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-warm-700" />
              <span>Company Panel</span>
            </div>
            {user?.role === 'company' && <span className="w-2 h-2 rounded-full bg-warm-700"></span>}
          </button>

          <button
            onClick={() => handleSelectRole('admin', '/admin')}
            className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition ${
              isAdmin
                ? 'bg-warm-900 text-white font-bold'
                : 'text-warm-700 hover:bg-warm-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sage-400" />
              <span>Admin Panel</span>
            </div>
            {isAdmin && <span className="w-2 h-2 rounded-full bg-sage-400"></span>}
          </button>
        </div>
      )}

      {/* Main Single Corner Button to Switch */}
      <div className="flex items-center bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-warm-300/80 p-1.5 gap-1 hover:border-terracotta-400 transition-all duration-200">
        {/* Instant 1-Click Toggle Button */}
        <button
          onClick={handleInstantToggle}
          className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 shadow-sm ${
            isAdmin
              ? 'bg-warm-900 text-white hover:bg-terracotta-600'
              : 'bg-terracotta-600 text-white hover:bg-terracotta-700'
          }`}
          title={isAdmin ? "Switch to User Account Panel" : "Switch to Admin Panel"}
        >
          <Repeat className="w-3.5 h-3.5 animate-spin-hover" />
          <span>
            {isAdmin ? 'Switch to User Panel 👤' : 'Switch to Admin Panel 🛡️'}
          </span>
        </button>

        {/* Arrow to toggle full options menu */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-full text-warm-600 hover:bg-warm-100 transition"
          title="More panel options"
        >
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
