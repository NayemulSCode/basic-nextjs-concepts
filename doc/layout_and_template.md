🎯 Layout Definition:

"একটি React component যা multiple pages এর মধ্যে shared UI তৈরি করে এবং navigation এর সময় state preserve করে।"

🔄 Template Definition:

"Layout এর মত shared UI তৈরি করে কিন্তু প্রতি navigation এ fresh instance create করে এবং সব state reset করে।"

## Next.js Layout এর মূল বৈশিষ্ট্য - wrapper persist থাকে, content refresh হয়।

Layout Structure:
├── Header (✅ Persist)
├── Sidebar (✅ Persist)
├── Main Content ({children}) (❌ Reset)
└── Footer (✅ Persist)

যা Layout এর direct child = Persist
যা {children} এর ভিতর = Reset
এজন্য Header এ search box, user info, cart এগুলো রাখি - যাতে সব page এ থাকে। আর Page specific form, filter এগুলো main content এ রাখি।

### মূল কথা হলো: Layout = State Preserve, Template = Fresh Start।

### Layout = শুধু content পরিবর্তন হয়, container same থাকে Template = container + content দুইটাই নতুন হয়ে যায়

## Layout vs Template এর মূল পার্থক্য

Layout:

1. State preserve হয়: পেজ navigation এর সময় layout component re-render হয় না
2. Shared UI: একাধিক পেজের মধ্যে common UI share করার জন্য
3. Performance optimized: কারণ re-render হয় না

Template:

1. State reset হয়: প্রতি navigation এ template component নতুন করে render হয়
2. Fresh instance: প্রতিবার নতুন instance তৈরি হয়
3. Animation/Effects: পেজ transition animation এর জন্য উপযুক্ত

## কখন Layout ব্যবহার করবেন:

1. Navigation Menu: যেটা সব পেজে একই থাকবে
2. User Authentication State: Login status preserve করতে
3. Shopping Cart: Cart item count maintain করতে
4. Theme Settings: Dark/Light mode toggle
5. Expensive Operations: যেগুলো বার বার করতে চান না

## কখন Template ব্যবহার করবেন:

1. Page Animations: প্রতি পেজে fresh animation
2. Analytics Tracking: প্রতি page view track করতে
3. Fresh Data Loading: প্রতি পেজে নতুন data fetch
4. Reset State: Form state বা filter reset করতে
5. Loading States: প্রতি navigation এ loading show করতে
