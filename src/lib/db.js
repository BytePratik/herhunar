import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data', 'db.json');

const INITIAL_DATA = {
  talents: [
    {
      id: "talent-1",
      name: "Asha Sharma",
      displayName: "Asha Crafts & Jewellery",
      email: "asha@example.com",
      phone: "+91 98765 43210",
      role: "talent",
      title: "Handmade Jewellery & Sustainable Accessories",
      category: "Art & Crafts",
      skills: ["Handmade Jewellery", "Beadwork", "Terracotta Art", "Custom Gift Packaging", "Macrame Crafts"],
      city: "Jaipur, Rajasthan",
      serviceType: "Local & Online Delivery",
      experience: "4+ years",
      startingPrice: "₹450 / piece",
      rating: 4.9,
      reviewsCount: 38,
      status: "approved",
      isFeatured: true,
      bio: "Namaste! I design handcrafted contemporary and traditional jewellery pieces using organic terracotta, seed beads, and brass wire. I accept custom bulk orders for weddings, corporate gifting hampers, and boutiques.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      portfolio: [
        {
          title: "Festive Earring Collection",
          image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
          description: "Hand-painted terracotta earrings with hypoallergenic brass hooks."
        },
        {
          title: "Macrame Lifestyle Charms",
          image: "https://images.unsplash.com/photo-1611591475155-42ac62973e01?auto=format&fit=crop&w=600&q=80",
          description: "Custom bulk order for organic cotton bag charms."
        },
        {
          title: "Handcrafted Beaded Choker",
          image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
          description: "Intricate multi-strand choker made with glass seed beads."
        }
      ],
      contactPreference: "In-App Chat & WhatsApp",
      joinedDate: "2024-01-15"
    },
    {
      id: "talent-2",
      name: "Priya Kulkarni",
      displayName: "Priya's Artisan Bakes",
      email: "priya@example.com",
      phone: "+91 98111 22334",
      role: "talent",
      title: "Artisan Pastry Chef & Custom Celebration Cakes",
      category: "Baking & Food",
      skills: ["Custom Fondant Cakes", "Gluten-Free Brownies", "Sourdough Loaves", "Bulk Event Catering", "Gourmet Dessert Jars"],
      city: "Pune, Maharashtra",
      serviceType: "Local Pickup & Delivery",
      experience: "5 years",
      startingPrice: "₹650 / kg",
      rating: 5.0,
      reviewsCount: 62,
      status: "approved",
      isFeatured: true,
      bio: "Certified home baker specializing in eggless desserts, custom celebration cakes, and pure butter cookies. FSSAI certified kitchen maintaining strict hygiene and premium ingredient standards.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      portfolio: [
        {
          title: "Botanical 3-Tier Celebration Cake",
          image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80",
          description: "Belgian dark chocolate ganache cake decorated with pressed edible flowers."
        },
        {
          title: "Artisan Sourdough Loaves",
          image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
          description: "Slow-fermented artisan sourdough using unbleached whole wheat flour."
        }
      ],
      contactPreference: "In-App Chat & Call",
      joinedDate: "2024-02-10"
    },
    {
      id: "talent-3",
      name: "Sunita Devi",
      displayName: "Sunita Boutique & Tailors",
      email: "sunita@example.com",
      phone: "+91 99222 33445",
      role: "talent",
      title: "Master Tailor & Bridal Blouse Specialist",
      category: "Stitching & Tailoring",
      skills: ["Aari & Zardozi Embroidery", "Bridal Blouse Cutting", "Western Dress Alterations", "Boutique Anarkali Suits"],
      city: "New Delhi, NCR",
      serviceType: "Doorstep & Home Studio",
      experience: "8+ years",
      startingPrice: "₹350 onwards",
      rating: 4.8,
      reviewsCount: 45,
      status: "approved",
      isFeatured: true,
      bio: "Expert tailoring with perfect fitting guarantee. I take up bridal wear stitching, salwar suits, kurtis, and designer neck patterns. Can visit client location for measurements within Delhi NCR.",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
      portfolio: [
        {
          title: "Hand-Embroidered Maggam Blouse",
          image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
          description: "Pure raw silk blouse with zardozi peacock motif work."
        },
        {
          title: "Custom Anarkali Suit",
          image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
          description: "Georgette tiered anarkali gown stitched for festive wear."
        }
      ],
      contactPreference: "Call & In-App Chat",
      joinedDate: "2024-03-01"
    },
    {
      id: "talent-4",
      name: "Neha Verma",
      displayName: "Neha Learning Space",
      email: "neha@example.com",
      phone: "+91 97333 44556",
      role: "talent",
      title: "Secondary Math & Science Tutor | CBSE / ICSE",
      category: "Tutoring & Education",
      skills: ["Mathematics (Grade 6-10)", "CBSE Board Prep", "Physics Basics", "Interactive Quizzes", "One-on-One Mentoring"],
      city: "Bengaluru, Karnataka",
      serviceType: "Online & Home Tutoring",
      experience: "6 years",
      startingPrice: "₹500 / hr",
      rating: 4.95,
      reviewsCount: 51,
      status: "approved",
      isFeatured: true,
      bio: "Passionate educator dedicated to demystifying mathematics and physics for students. I emphasize conceptual understanding, problem-solving confidence, and regular doubt clearance sessions.",
      avatar: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80",
      portfolio: [
        {
          title: "Interactive Study Modules",
          image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
          description: "Custom study modules that helped 30+ students score above 90% in board exams."
        }
      ],
      contactPreference: "Email & In-App Chat",
      joinedDate: "2024-03-12"
    },
    {
      id: "talent-5",
      name: "Ananya Sengupta",
      displayName: "Ananya Creative Studio",
      email: "ananya@example.com",
      phone: "+91 96444 55667",
      role: "talent",
      title: "Brand Designer & Social Media Visual Artist",
      category: "Digital & Design",
      skills: ["Brand Identity", "Canva & Figma Templates", "Instagram Post Packs", "Packaging Design", "Catalog Layouts"],
      city: "Kolkata, West Bengal",
      serviceType: "Remote / Online",
      experience: "3+ years",
      startingPrice: "₹1,200 / project",
      rating: 4.9,
      reviewsCount: 29,
      status: "approved",
      isFeatured: true,
      bio: "Helping homegrown brands, boutique owners, and micro-entrepreneurs build beautiful visual presence. I design clean logos, packaging stickers, social media banners, and menu cards.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      portfolio: [
        {
          title: "Artisan Brand Identity",
          image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
          description: "Full logo, packaging label, and social media aesthetic guide."
        }
      ],
      contactPreference: "In-App Chat & Email",
      joinedDate: "2024-04-05"
    }
  ],
  companies: [
    {
      id: "comp-1",
      name: "FabCraft Lifestyle Retailers",
      contactPerson: "Rajiv Singhania",
      email: "contact@fabcraft.in",
      role: "company",
      industry: "Retail & Artisan Home Decor",
      city: "Jaipur / Mumbai",
      website: "https://fabcraft.example.com",
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80",
      about: "We curate handcrafted lifestyle products, jewellery, and sustainable gifts from independent artisans across India."
    },
    {
      id: "comp-2",
      name: "Zest Events & Banquets",
      contactPerson: "Meera Oberoi",
      email: "hello@zestevents.co",
      role: "company",
      industry: "Hospitality & Corporate Catering",
      city: "Pune & Mumbai",
      website: "https://zestevents.example.com",
      avatar: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80",
      about: "Corporate event planner seeking passionate home bakers, dessert stylists, and personalized return gift artisans."
    }
  ],
  admin: {
    id: "admin-1",
    name: "HerHunar Admin Desk",
    email: "admin@herhunar.org",
    role: "admin"
  },
  enquiries: [
    {
      id: "enq-1",
      talentId: "talent-1",
      talentName: "Asha Sharma (Asha Crafts & Jewellery)",
      companyId: "comp-1",
      companyName: "FabCraft Lifestyle Retailers",
      companyEmail: "contact@fabcraft.in",
      companyPhone: "+91 98200 11223",
      serviceNeeded: "Bulk Order: 50 sets of Terracotta Earrings for Diwali Gift Boxes",
      budget: "₹22,500",
      deadline: "Within 3 weeks",
      message: "Hello Asha! We reviewed your portfolio on HerHunar and loved your terracotta ear ring collections. Can you deliver 50 sets packaged in eco boxes by mid-month? Let us connect to discuss sample approval.",
      status: "accepted",
      createdAt: "2024-05-20T10:15:00.000Z"
    },
    {
      id: "enq-2",
      talentId: "talent-2",
      talentName: "Priya Kulkarni (Priya's Artisan Bakes)",
      companyId: "comp-2",
      companyName: "Zest Events & Banquets",
      companyEmail: "hello@zestevents.co",
      companyPhone: "+91 98300 44556",
      serviceNeeded: "Catering: 120 Mini Dessert Jars for Startup Meetup",
      budget: "₹18,000",
      deadline: "Next Saturday",
      message: "Hi Priya! We are organizing a founder conference in Baner, Pune. We require 120 assorted eggless dessert jars (Tiramisu & Belgian chocolate). Can we place this order through HerHunar?",
      status: "pending",
      createdAt: "2024-05-22T14:30:00.000Z"
    }
  ],
  messages: [
    {
      id: "msg-1",
      conversationId: "comp-1_talent-1",
      senderId: "comp-1",
      senderName: "FabCraft Lifestyle Retailers",
      senderRole: "company",
      receiverId: "talent-1",
      text: "Hello Asha! We love your earrings portfolio. Are you open for a bulk consignment of 50 units?",
      timestamp: "2024-05-20T10:20:00.000Z"
    },
    {
      id: "msg-2",
      conversationId: "comp-1_talent-1",
      senderId: "talent-1",
      senderName: "Asha Sharma",
      senderRole: "talent",
      receiverId: "comp-1",
      text: "Namaste Rajiv ji! Thank you so much for reaching out. Yes, I can customize 50 units. Would you like them in earthy terracotta or gold-tipped finishes?",
      timestamp: "2024-05-20T10:35:00.000Z"
    },
    {
      id: "msg-3",
      conversationId: "comp-1_talent-1",
      senderId: "comp-1",
      senderName: "FabCraft Lifestyle Retailers",
      senderRole: "company",
      receiverId: "talent-1",
      text: "A mix of both would be wonderful! Could you share a couple of color swatches on here?",
      timestamp: "2024-05-20T11:00:00.000Z"
    }
  ],
  reports: []
};

// Memory fallback for read-only serverless environments
let memoryStore = null;

function getStore() {
  if (memoryStore) return memoryStore;

  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      memoryStore = JSON.parse(content);
      return memoryStore;
    }
  } catch (err) {
    console.warn("Could not read local DB file, using in-memory store:", err.message);
  }

  // Initialize with initial seed
  memoryStore = JSON.parse(JSON.stringify(INITIAL_DATA));
  saveStore(memoryStore);
  return memoryStore;
}

function saveStore(store) {
  memoryStore = store;
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.warn("Could not persist to disk (serverless runtime mode active):", err.message);
  }
}

// Talent methods
export function getTalents({ category, search, city, status } = {}) {
  const store = getStore();
  let list = [...store.talents];

  if (status && status !== 'all') {
    list = list.filter(t => t.status === status);
  } else if (!status) {
    list = list.filter(t => t.status === 'approved');
  }

  if (category && category !== 'All') {
    list = list.filter(t => t.category.toLowerCase() === category.toLowerCase());
  }

  if (city && city.trim() !== '') {
    const qCity = city.toLowerCase();
    list = list.filter(t => t.city.toLowerCase().includes(qCity));
  }

  if (search && search.trim() !== '') {
    const q = search.toLowerCase();
    list = list.filter(t => 
      t.name.toLowerCase().includes(q) ||
      t.displayName.toLowerCase().includes(q) ||
      t.title.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.skills.some(s => s.toLowerCase().includes(q)) ||
      t.bio.toLowerCase().includes(q)
    );
  }

  return list;
}

export function getTalentById(id) {
  const store = getStore();
  return store.talents.find(t => t.id === id) || null;
}

export function createTalent(data) {
  const store = getStore();
  const newTalent = {
    id: `talent-${Date.now()}`,
    name: data.name || "Artisan",
    displayName: data.displayName || data.name || "Artisan",
    email: data.email,
    phone: data.phone || "",
    role: "talent",
    title: data.title || "Independent Skill Provider",
    category: data.category || "Art & Crafts",
    skills: Array.isArray(data.skills) ? data.skills : (data.skills ? data.skills.split(',').map(s => s.trim()) : []),
    city: data.city || "India",
    serviceType: data.serviceType || "Local & Online Delivery",
    experience: data.experience || "1+ year",
    startingPrice: data.startingPrice || "₹300 onwards",
    rating: 5.0,
    reviewsCount: 1,
    status: "approved",
    isFeatured: false,
    bio: data.bio || "Passionate about providing high quality handcrafted services and work.",
    avatar: data.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    portfolio: data.portfolio && data.portfolio.length ? data.portfolio : [
      {
        title: "Sample Work",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
        description: "Handcrafted with dedication and care."
      }
    ],
    contactPreference: data.contactPreference || "In-App Chat & WhatsApp",
    joinedDate: new Date().toISOString().split('T')[0]
  };

  store.talents.unshift(newTalent);
  saveStore(store);
  return newTalent;
}

export function updateTalent(id, updates) {
  const store = getStore();
  const index = store.talents.findIndex(t => t.id === id);
  if (index === -1) return null;

  store.talents[index] = { ...store.talents[index], ...updates };
  saveStore(store);
  return store.talents[index];
}

export function deleteTalent(id) {
  const store = getStore();
  const index = store.talents.findIndex(t => t.id === id);
  if (index === -1) return false;

  store.talents.splice(index, 1);
  saveStore(store);
  return true;
}

// Companies
export function getCompanies() {
  const store = getStore();
  return store.companies;
}

export function createCompany(data) {
  const store = getStore();
  const newCompany = {
    id: `comp-${Date.now()}`,
    name: data.name,
    contactPerson: data.contactPerson || data.name,
    email: data.email,
    role: "company",
    industry: data.industry || "General Business",
    city: data.city || "All India",
    website: data.website || "",
    avatar: data.avatar || "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=200&q=80",
    about: data.about || "Looking for reliable skilled partners and artisans."
  };
  store.companies.unshift(newCompany);
  saveStore(store);
  return newCompany;
}

// Enquiries
export function getEnquiries({ talentId, companyId } = {}) {
  const store = getStore();
  let list = [...store.enquiries];
  if (talentId) {
    list = list.filter(e => e.talentId === talentId);
  }
  if (companyId) {
    list = list.filter(e => e.companyId === companyId);
  }
  return list;
}

export function createEnquiry(data) {
  const store = getStore();
  const talent = store.talents.find(t => t.id === data.talentId);

  const newEnquiry = {
    id: `enq-${Date.now()}`,
    talentId: data.talentId,
    talentName: talent ? `${talent.name} (${talent.displayName})` : "Artisan",
    companyId: data.companyId || "guest-company",
    companyName: data.companyName || "Partner Client",
    companyEmail: data.companyEmail || "client@example.com",
    companyPhone: data.companyPhone || "",
    serviceNeeded: data.serviceNeeded || "Enquiry for custom service",
    budget: data.budget || "Discuss on call",
    deadline: data.deadline || "Flexible",
    message: data.message || "",
    status: "pending",
    createdAt: new Date().toISOString()
  };

  store.enquiries.unshift(newEnquiry);

  const conversationId = `${newEnquiry.companyId}_${newEnquiry.talentId}`;
  store.messages.push({
    id: `msg-${Date.now()}`,
    conversationId,
    senderId: newEnquiry.companyId,
    senderName: newEnquiry.companyName,
    senderRole: "company",
    receiverId: newEnquiry.talentId,
    text: `New Enquiry: "${newEnquiry.serviceNeeded}". Message: ${newEnquiry.message}`,
    timestamp: new Date().toISOString()
  });

  saveStore(store);
  return newEnquiry;
}

export function updateEnquiryStatus(id, status) {
  const store = getStore();
  const enq = store.enquiries.find(e => e.id === id);
  if (!enq) return null;
  enq.status = status;
  saveStore(store);
  return enq;
}

// Messages & Chat
export function getMessages(conversationId) {
  const store = getStore();
  if (!conversationId) return store.messages;
  return store.messages.filter(m => m.conversationId === conversationId);
}

export function getConversationsForUser(userId) {
  const store = getStore();
  const userMessages = store.messages.filter(m => m.senderId === userId || m.receiverId === userId);
  const conversationIds = [...new Set(userMessages.map(m => m.conversationId))];

  return conversationIds.map(cid => {
    const thread = store.messages.filter(m => m.conversationId === cid);
    const lastMsg = thread[thread.length - 1];
    
    const [cId, tId] = cid.split('_');
    const isCompany = userId === cId;
    const talent = store.talents.find(t => t.id === tId);
    const company = store.companies.find(c => c.id === cId);

    return {
      conversationId: cid,
      otherUser: isCompany 
        ? { id: talent?.id, name: talent?.name || "Talent", avatar: talent?.avatar, role: "talent" }
        : { id: company?.id, name: company?.name || "Company", avatar: company?.avatar, role: "company" },
      lastMessage: lastMsg?.text || "",
      lastTimestamp: lastMsg?.timestamp || "",
      unreadCount: 0
    };
  });
}

export function sendMessage({ conversationId, senderId, senderName, senderRole, receiverId, text }) {
  const store = getStore();
  const newMsg = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    conversationId,
    senderId,
    senderName,
    senderRole,
    receiverId,
    text,
    timestamp: new Date().toISOString()
  };
  store.messages.push(newMsg);
  saveStore(store);
  return newMsg;
}

// Admin & Reports
export function getAdminStats() {
  const store = getStore();
  const totalTalents = store.talents.length;
  const approvedTalents = store.talents.filter(t => t.status === 'approved').length;
  const pendingTalents = store.talents.filter(t => t.status === 'pending').length;
  const totalCompanies = store.companies.length;
  const totalEnquiries = store.enquiries.length;
  const openReports = (store.reports || []).filter(r => r.status === 'open').length;

  return {
    totalTalents,
    approvedTalents,
    pendingTalents,
    totalCompanies,
    totalEnquiries,
    openReports
  };
}

export function getReports() {
  const store = getStore();
  return store.reports || [];
}

export function createReport(data) {
  const store = getStore();
  if (!store.reports) store.reports = [];
  const newReport = {
    id: `rep-${Date.now()}`,
    talentId: data.talentId,
    reportedBy: data.reportedBy || "Visitor",
    reason: data.reason || "Verification request",
    status: "open",
    createdAt: new Date().toISOString()
  };
  store.reports.unshift(newReport);
  saveStore(store);
  return newReport;
}

export function resolveReport(id) {
  const store = getStore();
  if (!store.reports) return null;
  const rep = store.reports.find(r => r.id === id);
  if (!rep) return null;
  rep.status = "resolved";
  saveStore(store);
  return rep;
}
