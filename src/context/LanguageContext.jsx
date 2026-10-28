'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    brand_tagline: "Her Skills. Her Income. Her Independence.",
    hero_title: "Connecting Women’s Real Skills with Opportunities.",
    hero_sub: "A warm, dignified bridge between skilled women—artisans, bakers, tutors, tailors—and companies or families looking for quality talent.",
    explore_btn: "Explore Skills & Talent",
    join_btn: "Join as a Woman",
    company_portal: "For Companies / Recruiters",
    how_it_works: "How It Works",
    about_us: "About HerHunar",
    contact_help: "Contact & Safety",
    admin_portal: "Admin Desk",
    categories_title: "Browse by Ability & Skill Category",
    featured_talent: "Featured Talent & Creators",
    view_profile: "View Profile",
    send_enquiry: "Send Enquiry",
    direct_chat: "Direct Chat",
    verified: "Community Verified",
    starting_from: "From",
    search_placeholder: "Search by skill (e.g., jewellery, baking, blouse cutting, math)...",
    all_categories: "All Categories",
    all_cities: "All Locations",
    filter_results: "Showing Results",
    login: "Log In",
    logout: "Log Out",
    my_dashboard: "My Dashboard",
    messages: "Messages"
  },
  hi: {
    brand_tagline: "उसका हुनर। उसकी कमाई। उसकी आत्मनिर्भरता।",
    hero_title: "महिलाओं के हुनर को सीधे नए मौकों से जोड़ना।",
    hero_sub: "कारीगरों, बेकर्स, ट्यूटर्स और टेलर्स से लेकर उन कंपनियों और परिवारों के बीच एक सरल और सम्मानजनक सेतु, जिन्हें सच्चे हुनर की तलाश है।",
    explore_btn: "हुनर और प्रतिभा खोजें",
    join_btn: "महिला हुनरमंद के रूप में जुड़ें",
    company_portal: "कंपनियों और नियोक्ताओं के लिए",
    how_it_works: "यह कैसे काम करता है",
    about_us: "हमारे बारे में",
    contact_help: "संपर्क और सुरक्षा",
    admin_portal: "एडमिन पोर्टल",
    categories_title: "हुनर और कार्य श्रेणी के आधार पर खोजें",
    featured_talent: "विशेष हुनरमंद महिलाएं",
    view_profile: "प्रोफाइल देखें",
    send_enquiry: "पूछताछ भेजें",
    direct_chat: "सीधी बातचीत करें",
    verified: "प्रमाणित हुनर",
    starting_from: "शुरुआती दर",
    search_placeholder: "हुनर से खोजें (जैसे: आभूषण, बेकिंग, सिलाई, गणित ट्यूटर)...",
    all_categories: "सभी श्रेणियां",
    all_cities: "सभी शहर",
    filter_results: "परिणाम",
    login: "लॉग इन",
    logout: "लॉग आउट",
    my_dashboard: "मेरा डैशबोर्ड",
    messages: "संदेश"
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('herhunar_lang');
    if (saved && (saved === 'en' || saved === 'hi')) {
      setLang(saved);
    }
  }, []);

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('herhunar_lang', newLang);
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
