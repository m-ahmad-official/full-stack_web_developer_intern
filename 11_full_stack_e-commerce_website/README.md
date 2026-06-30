# ☕ Coffee Vault — Full Stack Next.js E-commerce

Premium specialty coffee e-commerce site built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Zustand**.

---

## 🚀 Quick Setup

You've already run `npx create-next-app@latest .` — now replace those files with this project:

### 1. Copy files
Paste all these files into your Next.js project folder, overwriting the defaults.

### 2. Install dependencies
```bash
npm install zustand
npm install lucide-react
```

### 3. Run dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — done! ☕

---

## 📁 Project Structure

```
app/
├── layout.tsx              # Root layout (Navbar + Footer + Notification)
├── page.tsx                # Home page
├── globals.css             # Tailwind + custom styles
│
├── menu/page.tsx           # Full menu — list view with category filter
├── shop/page.tsx           # Shop — grid with search & sort
├── shop/[slug]/page.tsx    # Product detail + image upload
├── cart/page.tsx           # Shopping cart
├── checkout/page.tsx       # Checkout + payment
├── login/page.tsx          # Authentication
├── orders/page.tsx         # Order history
├── about/page.tsx          # About us page
├── contact/page.tsx        # Contact form
│
├── admin/page.tsx          # Admin dashboard
├── admin/products/page.tsx # Product management (add/edit/delete + image upload)
│
├── components/
│   ├── Navbar.tsx          # Sticky navbar with mobile menu
│   ├── Footer.tsx          # Full footer with links + info
│   ├── Notification.tsx    # Toast notification
│   └── ProductCard.tsx     # Reusable product card
│
└── lib/
    ├── types.ts            # TypeScript interfaces
    ├── data.ts             # Seed products + demo users
    └── store.ts            # Zustand global state
```

---

## 🔐 Demo Accounts

| Role  | Email                    | Password |
|-------|--------------------------|----------|
| User  | user@coffeevault.pk      | 123      |
| Admin | admin@coffeevault.pk     | admin    |

---

## 🖼 How to Change Product Images

### Method 1: Admin Panel (Easiest)
1. Login as admin → `/admin/products`
2. Click **Edit** on any product
3. Upload a photo from your computer OR paste an image URL
4. Click **Save Changes**

### Method 2: Product Detail Page (Admin only)
1. Login as admin
2. Go to any product page (`/shop/velvet-latte`)
3. Click **"Change Product Image"** button below the photo
4. Upload your image

### Method 3: Edit `app/lib/data.ts` directly
Change the `image` field for any product:
```ts
image: "https://images.unsplash.com/photo-YOUR_PHOTO_ID?w=600&q=80",
// OR
image: "/images/products/my-photo.jpg",  // put file in /public/images/products/
```

---

## 🛒 Features

| Feature                     | Status |
|-----------------------------|--------|
| Product listing (grid)      | ✅     |
| Product detail page         | ✅     |
| Product image upload        | ✅     |
| Category filter + search    | ✅     |
| Sort by price / rating      | ✅     |
| Shopping cart               | ✅     |
| Checkout flow               | ✅     |
| 4 payment methods           | ✅ Card, Easypaisa, JazzCash, COD |
| User auth (login/logout)    | ✅     |
| Order history               | ✅     |
| Admin dashboard             | ✅     |
| Admin product management    | ✅ Add / Edit / Delete |
| Responsive (mobile)         | ✅     |
| Persistent state            | ✅ localStorage via Zustand |
| Home page                   | ✅     |
| Menu page                   | ✅     |
| Shop page                   | ✅     |
| About page                  | ✅     |
| Contact page                | ✅     |
| Footer                      | ✅     |

---

## 🎨 Customization

### Colors — `tailwind.config.ts`
```ts
coffee: {
  600: "#a86122",  // ← change this for primary button color
  400: "#d49550",  // ← change this for accent/price color
}
```

### Site name — `app/layout.tsx`
```ts
title: "Coffee Vault — Premium Coffee Karachi",
```

### Products — `app/lib/data.ts`
Add/edit the `PRODUCTS` array. Each product needs:
- `id`, `name`, `slug` (URL-safe name)
- `price`, `category`, `description`
- `image` (URL or `/images/...` local path)
- `stock`, `rating`, `reviews`, `featured`, `tags`

### Contact info — `app/components/Footer.tsx`
Update address, phone, email, and social handles.

---

## 📦 Tech Stack

- **Next.js 14** — App Router, Server Components
- **TypeScript** — Full type safety
- **Tailwind CSS** — Utility-first styling
- **Zustand** — Global state with persistence
- **Lucide React** — Icons
- **next/image** — Optimized images
