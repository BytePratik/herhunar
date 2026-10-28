'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  User, 
  Briefcase, 
  Menu, 
  X, 
  Search,
  Globe, 
  Check, 
  ChevronDown 
} from 'lucide-react';
import UserSearchBox from './UserSearchBox';

export default function Navbar() {
  const pathname = usePathname();
  const { user, loginAs, logout } = useAuth();
  const { lang, changeLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const navLinks = [
    { href: '/explore', label: t('explore_btn'), icon: Sparkles },
    { href: '/join', label: t('join_btn'), icon: User },
    { href: '/company', label: t('company_portal'), icon: Briefcase },
    { href: '/how-it-works', label: t('how_it_works') },
  ];

  const getDashboardLink = () => {
    if (!user) return '/join';
    if (user.role === 'talent') return '/dashboard/talent';
    if (user.role === 'company') return '/dashboard/company';
    if (user.role === 'admin') return '/admin';
    return '/';
  };

  return (
    <header className="sticky top-0 z-40 bg-warm-50/90 backdrop-blur-md border-b border-warm-200">
      {/* Top Demo Bar / Role Bar */}
      <div className="bg-warm-100 text-warm-700 text-xs py-1.5 px-4 border-b border-warm-200/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-sage-500 animate-pulse"></span>
            <span className="font-medium text-warm-800">BBA Startup Prototype</span>
            <span className="text-warm-400">|</span>
            <span className="hidden sm:inline text-warm-600">{t('brand_tagline')}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Demo Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full border border-warm-300 text-warm-800 hover:border-terracotta-400 transition text-xs font-medium shadow-sm"
              >
                <span>Demo View:</span>
                <span className="text-terracotta-600 font-semibold capitalize">
                  {user ? `${user.role} (${user.name.split(' ')[0]})` : 'Guest'}
                </span>
                <ChevronDown className="w-3 h-3 text-warm-500" />
              </button>

              {roleMenuOpen && (
                <div 
                  className="absolute right-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-warm-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setRoleMenuOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-warm-400 uppercase tracking-wider">
                    Switch Test Account
                  </div>
                  <button
                    onClick={() => loginAs('talent')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-warm-50 ${user?.role === 'talent' ? 'text-terracotta-600 font-medium bg-terracotta-50/50' : 'text-warm-700'}`}
                  >
                    <div>
                      <div className="font-semibold">Asha Sharma (Talent)</div>
                      <div className="text-[11px] text-warm-500">Handmade Jewellery & Crafts</div>
                    </div>
                    {user?.role === 'talent' && <Check className="w-4 h-4 text-terracotta-600" />}
                  </button>
                  <button
                    onClick={() => loginAs('company')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-warm-50 ${user?.role === 'company' ? 'text-terracotta-600 font-medium bg-terracotta-50/50' : 'text-warm-700'}`}
                  >
                    <div>
                      <div className="font-semibold">FabCraft Retailers (Company)</div>
                      <div className="text-[11px] text-warm-500">Searching & hiring talent</div>
                    </div>
                    {user?.role === 'company' && <Check className="w-4 h-4 text-terracotta-600" />}
                  </button>
                  <button
                    onClick={() => loginAs('admin')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-warm-50 ${user?.role === 'admin' ? 'text-terracotta-600 font-medium bg-terracotta-50/50' : 'text-warm-700'}`}
                  >
                    <div>
                      <div className="font-semibold">Platform Admin Desk</div>
                      <div className="text-[11px] text-warm-500">Profile approvals & reports</div>
                    </div>
                    {user?.role === 'admin' && <Check className="w-4 h-4 text-terracotta-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white rounded-full border border-warm-300 p-0.5 text-xs">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-0.5 rounded-full transition ${lang === 'en' ? 'bg-warm-800 text-white font-medium' : 'text-warm-600 hover:text-warm-900'}`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage('hi')}
                className={`px-2 py-0.5 rounded-full transition ${lang === 'hi' ? 'bg-terracotta-600 text-white font-medium' : 'text-warm-600 hover:text-warm-900'}`}
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-terracotta-600 to-terracotta-400 text-white flex items-center justify-center shadow-md shadow-terracotta-500/20 group-hover:scale-105 transition transform">
            <span className="font-serif font-bold text-xl tracking-tight">H</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-warm-900 font-serif">HerHunar</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-terracotta-100 text-terracotta-700">
                हर हुनर
              </span>
            </div>
            <p className="text-[11px] text-warm-500 tracking-tight font-normal">Empowering Women Through Skills</p>
          </div>
        </Link>

        {/* Quick Search Button / Input on Navbar for User Account */}
        <div className="hidden md:block flex-1 max-w-xs lg:max-w-sm">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-full border border-warm-200 bg-white hover:border-terracotta-400 text-xs text-warm-400 transition shadow-2xs group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-warm-400 group-hover:text-terracotta-600" />
              <span>Search &ldquo;join&rdquo;, skills, or pages...</span>
            </div>
            <kbd className="text-[10px] bg-warm-100 text-warm-500 px-1.5 py-0.5 rounded border border-warm-200">
              Quick
            </kbd>
          </button>
        </div>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-warm-100/70 p-1.5 rounded-full border border-warm-200">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-terracotta-600 shadow-sm'
                    : 'text-warm-700 hover:text-warm-900 hover:bg-white/50'
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4 opacity-75" />}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5 flex-shrink-0">
          {user && (
            <Link
              href="/messages"
              className="p-2.5 rounded-full text-warm-700 hover:text-warm-900 hover:bg-warm-100 border border-warm-200 transition relative"
              title="Messages / Inquiries"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-terracotta-500"></span>
            </Link>
          )}

          {user?.role === 'admin' && (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-warm-800 text-white hover:bg-warm-900 transition"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sage-200" />
              <span>Admin Desk</span>
            </Link>
          )}

          <Link
            href={getDashboardLink()}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-terracotta-600 text-white hover:bg-terracotta-700 transition shadow-sm shadow-terracotta-600/20"
          >
            <User className="w-4 h-4" />
            <span>{user ? t('my_dashboard') : t('login')}</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="p-2 rounded-lg text-warm-700 hover:bg-warm-100"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-warm-700 hover:bg-warm-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-warm-50 border-b border-warm-200 px-4 pt-2 pb-6 space-y-3">
          <div className="p-2">
            <UserSearchBox placeholder="Search 'join', skills, or pages..." />
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-warm-800 hover:bg-warm-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/messages"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-warm-800 hover:bg-warm-100"
            >
              💬 {t('messages')}
            </Link>
            <Link
              href={getDashboardLink()}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-terracotta-600 hover:bg-warm-100 font-semibold"
            >
              👤 {user ? t('my_dashboard') : t('login')}
            </Link>
          </div>
        </div>
      )}

      {/* Quick Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-warm-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-4 sm:p-5 shadow-2xl border border-warm-200 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-warm-100">
              <span className="text-xs font-bold text-terracotta-600 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Search Anything on HerHunar</span>
              </span>
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded-full text-warm-400 hover:text-warm-700 hover:bg-warm-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <UserSearchBox placeholder="Type 'join' to register, search skills, abilities, or companies..." />
          </div>
        </div>
      )}
    </header>
  );
}
