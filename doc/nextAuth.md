step1: install -> npm install next-auth
step2: auth.config.ts
step3: auth.ts
step4: middleware.ts
step5: auth context provider


step6: sign-in page
step7: sign-up page
step8: Api routes create
step9: Dashboard layout with auth
step10: Dashboard page with auth
step11: Main Layout with auth provider
step12: Home page with auth integration
step13: .env setup




## Project Structure
my-nextjs-app/
├── app/
│   ├── globals.css
│   ├── layout.tsx                    # Root layout with AuthProvider
│   ├── page.tsx                      # Home page with auth integration
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.tsx             # Sign in page
│   │   └── signup/
│   │       └── page.tsx             # Sign up page
│   ├── dashboard/                   # Protected routes
│   │   ├── layout.tsx               # Dashboard layout
│   │   ├── page.tsx                 # Dashboard home
│   │   ├── settings/
│   │   │   └── page.tsx            # Settings page
│   │   └── users/                   # Admin only
│   │       └── page.tsx            # Users management
│   └── api/
│       ├── auth/
│       │   ├── [...nextauth]/
│       │   │   └── route.ts        # NextAuth API
│       │   └── register/
│       │       └── route.ts        # User registration
│       └── users/
│           └── route.ts            # Users API
├── components/
│   └── auth/
│       └── AuthProvider.tsx        # Session provider wrapper
├── middleware.ts                   # Route protection middleware
├── auth.config.ts                  # NextAuth configuration
├── auth.ts                         # NextAuth instance
└── .env.local                      # Environment variables