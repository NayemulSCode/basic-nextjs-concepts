Objective: Build server-enabled, file-based routed apps using the Next.js App Router.

Live Class 1: Routing, Layouts & Metadata
App directory structure, nested routes

ক্লাস ১:

✅ App Directory Structure
✅ File-based Routing
✅ Nested Routes (/dashboard/settings)
✅ Layout Components (Root Layout, Nested Layout)
✅ Static এবং Dynamic Metadata
✅ SEO Optimization

Live Class 2: API Routes & Server Components
Dynamic pages, fetch on server, error handling

ক্লাস ২:

✅ API Routes (GET, POST, PUT)
✅ Dynamic API Routes ([id])
✅ Server Components
✅ Data Fetching on Server
✅ Error Handling (not-found.tsx)
✅ Dynamic Pages ([id]/page.tsx)

my-nextjs-app/
├── app/
│ ├── globals.css
│ ├── layout.tsx # মূল লেআউট
│ ├── page.tsx # হোম পেজ
│ ├── about/
│ │ └── page.tsx # অ্যাবাউট পেজ
│ ├── products/
│ │ ├── page.tsx # প্রোডাক্ট লিস্ট
│ │ └── [id]/
│ │ └── page.tsx # ডাইনামিক প্রোডাক্ট পেজ
├── (marketing)/
│ ├── about/
│ │ └── page.tsx # /about
│ └── contact/
│ | └── page.tsx # /contact
│ ├── dashboard/
│ │ ├── layout.tsx # ড্যাশবোর্ড লেআউট
│ │ ├── page.tsx # ড্যাশবোর্ড হোম
│ │ └── settings/
│ │ └── page.tsx # সেটিংস পেজ
│ └── api/
│ ├── products/
│ │ └── route.ts # API রুট
│ └── users/
│ └── [id]/
│ └── route.ts # ডাইনামিক API রুট
├── components/
│ ├── Header.tsx
│ ├── Footer.tsx
│ └── ProductCard.tsx
└── types/
└── index.ts

app/
├── layout.tsx # Root layout (applies to all pages)
├── page.tsx # Home page (/)
├── about/
│ ├── page.tsx # About page (/about)
│ └── team/
│ └── page.tsx # Team page (/about/team)
├── blog/
│ ├── layout.tsx # Blog-specific layout
│ ├── page.tsx # Blog listing (/blog)
│ └── [slug]/
│ └── page.tsx # Dynamic post (/blog/hello-world)
└── (marketing)/ # Route group (no URL path)
└── contact/
└── page.tsx # Contact page (/contact)
