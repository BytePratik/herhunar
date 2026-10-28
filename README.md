# HerHunar (हर हुनर) — Empowering Women Through Skills
> **BBA Startup Project** | *Her Skills. Her Income. Her Independence.*

A social-impact, minimalist platform connecting talented women service providers (artisans, bakers, tutors, tailors, and freelancers) with companies, event planners, and local customers.

---

## 🌟 Key Features

1. **Talent Profiles with Abilities**:
   - Women can join, list their abilities, crafts, specialties, starting prices, and upload portfolio work samples.
   - **Privacy by Design**: Never exposes residential home addresses publicly (city and service area only).

2. **Company & Recruiter Hub**:
   - Companies can create their business account, explore candidates by skill, filter by city or budget, and choose matching talent for bulk gifting, catering, tailoring, or custom services.

3. **Direct Enquiries & Negotiation**:
   - Companies can send project proposals with desired quantity, budget, and timeline.
   - Talents receive instant notifications on their dashboard to accept or decline.

4. **In-App Direct Chat & Messaging**:
   - Real-time conversation thread between companies and candidates to discuss samples, adjustments, delivery, and payments.

5. **Admin Moderation & Governance Desk**:
   - Manage pending profiles, verify badges, review reported listings, and monitor platform impact metrics.

6. **Inclusion & Multilingual Support**:
   - 1-click switcher between **English** and **हिन्दी (Hindi)**.

7. **Clean Human Minimalist Aesthetic**:
   - Designed with warm earth tones (terracotta, warm sand, soft cream, sage green), legible typography, and mobile-first responsive layout.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 18, Tailwind CSS, Lucide Icons
- **Backend**: Next.js Serverless Route Handlers (`/api/...`)
- **Database**: Unified persistent JSON DB with in-memory serverless fallback for Vercel
- **Deployment**: 100% native compatibility with Vercel

---

## 🚀 Running Locally

1. Clone or open the project folder in terminal:
   ```bash
   cd shlok
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## ☁️ Deploying to Vercel

This project is configured out-of-the-box for instant Vercel deployment:

### Method 1: Via Vercel Web Dashboard (Recommended)
1. Push this folder to a GitHub, GitLab, or Bitbucket repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New..." > "Project"**.
3. Import your repository.
4. Leave framework as **Next.js** (auto-detected).
5. Click **Deploy**!

### Method 2: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 👥 Demo Test Accounts (1-Click Switch in Top Navigation)

| Role | Name | Use Case |
| :--- | :--- | :--- |
| **Talent (Woman Provider)** | Asha Sharma (*Asha Creates*) | Handmade jewellery, terracotta, view incoming client enquiries |
| **Company / Recruiter** | FabCraft Lifestyle Retailers | Browse talent, send bulk project orders, chat with candidates |
| **Admin** | HerHunar Admin Desk | Review pending submissions, toggle homepage features, manage safety reports |

---

## 📁 Project Structure

```
shlok/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── admin/route.js        # Admin stats & moderation
│   │   │   ├── enquiries/route.js    # Enquiries & proposals API
│   │   │   ├── messages/route.js     # Chat & message threads API
│   │   │   └── talents/              # Talent CRUD API
│   │   ├── about/page.jsx            # Social impact mission
│   │   ├── admin/page.jsx            # Admin desk & review queue
│   │   ├── company/page.jsx          # Company registration & hub
│   │   ├── contact/page.jsx          # FAQs & report listing
│   │   ├── dashboard/
│   │   │   ├── company/page.jsx      # Company sent enquiries
│   │   │   └── talent/page.jsx       # Talent incoming enquiries
│   │   ├── explore/page.jsx          # Search & filter directory
│   │   ├── how-it-works/page.jsx     # User journey guide
│   │   ├── join/page.jsx             # Women skill listing form
│   │   ├── messages/page.jsx         # Direct in-app chat system
│   │   ├── profile/[id]/page.jsx     # Individual talent portfolio
│   │   ├── globals.css               # Warm minimalist styles
│   │   ├── layout.jsx                # Root layout with providers
│   │   └── page.jsx                  # Homepage & hero
│   ├── components/
│   │   ├── Navbar.jsx                # Navigation & demo role switcher
│   │   ├── Footer.jsx                # Human mission footer
│   │   ├── TalentCard.jsx            # Minimalist profile card
│   │   ├── EnquiryModal.jsx          # Company connect / proposal modal
│   │   └── ReportModal.jsx           # Trust & safety report modal
│   ├── context/
│   │   ├── AuthContext.jsx           # Multi-role auth & demo switcher
│   │   └── LanguageContext.jsx       # English / Hindi translation
│   └── lib/
│       └── db.js                     # Unified database layer
├── data/
│   └── db.json                       # Seed database
├── vercel.json                       # Vercel configuration
├── package.json
└── tailwind.config.js
```
