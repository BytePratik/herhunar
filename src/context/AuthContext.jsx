'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('herhunar_current_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Default to Asha (Talent) for friendly default experience, or null
        // Let's set a default demo session so visitors can immediately test features
        const defaultUser = {
          id: "comp-1",
          name: "FabCraft Lifestyle Retailers",
          email: "contact@fabcraft.in",
          role: "company",
          avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80"
        };
        setUser(defaultUser);
        localStorage.setItem('herhunar_current_user', JSON.stringify(defaultUser));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const loginAs = (type) => {
    let selected = null;
    if (type === 'talent') {
      selected = {
        id: "talent-1",
        name: "Asha Sharma",
        displayName: "Asha Creates",
        email: "asha@example.com",
        role: "talent",
        category: "Art & Crafts",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
      };
    } else if (type === 'company') {
      selected = {
        id: "comp-1",
        name: "FabCraft Lifestyle Retailers",
        contactPerson: "Rajiv Singhania",
        email: "contact@fabcraft.in",
        role: "company",
        avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80"
      };
    } else if (type === 'admin') {
      selected = {
        id: "admin-1",
        name: "HerHunar Admin Desk",
        email: "admin@herhunar.org",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
      };
    }

    if (selected) {
      setUser(selected);
      localStorage.setItem('herhunar_current_user', JSON.stringify(selected));
    }
  };

  const loginCustom = (userData) => {
    setUser(userData);
    localStorage.setItem('herhunar_current_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('herhunar_current_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginAs, loginCustom, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
