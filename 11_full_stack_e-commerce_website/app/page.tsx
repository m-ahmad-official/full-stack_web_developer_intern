// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "./lib/data";
import { ProductCard } from "./components/ProductCard";
import { Coffee, Truck, Leaf, Award } from "lucide-react";

const FEATURED = PRODUCTS.filter(p => p.featured).slice(0, 4);

const PERKS = [
  { icon: Coffee, title: "Single Origin",  desc: "Beans sourced directly from farmers in Ethiopia, Colombia and Kenya." },
  { icon: Truck,  title: "Fast Delivery",  desc: "Hot or cold — delivered across Karachi within 45 minutes." },
  { icon: Leaf,   title: "Sustainably Sourced", desc: "Every bag we buy is Rainforest Alliance certified." },
  { icon: Award,  title: "Award Winning",  desc: "Best Specialty Coffee in Karachi — Time Out Karachi 2024." },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80"
            alt="Coffee beans"
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-vault-dark via-vault-dark/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <p className="section-eyebrow">Karachi's finest specialty coffee</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-vault-light leading-[1.05] mb-6">
              Every Cup,<br />
              <span className="text-coffee-400">Unlocked.</span>
            </h1>
            <p className="text-vault-muted text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              We obsess over every variable — origin, roast, extraction — so you can simply taste the difference.
              Delivered fresh, brewed to order.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary text-base px-8 py-4">
                Order Now
              </Link>
              <Link href="/about" className="btn-secondary text-base px-8 py-4">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERKS ── */}
      <section className="border-y border-vault-border bg-vault-card/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {PERKS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-coffee-900/50 border border-vault-border flex items-center justify-center">
                  <Icon className="w-5 h-5 text-coffee-400" />
                </div>
                <div>
                  <h4 className="text-vault-light font-semibold text-sm mb-1">{title}</h4>
                  <p className="text-vault-muted text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-eyebrow">Hand-picked</p>
            <h2 className="section-title mb-0">Featured Brews</h2>
          </div>
          <Link href="/shop" className="btn-secondary text-sm hidden sm:block">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="mt-8 sm:hidden text-center">
          <Link href="/shop" className="btn-secondary text-sm">View All →</Link>
        </div>
      </section>

      {/* ── BANNER ── */}
      <section className="relative overflow-hidden bg-coffee-900/30 border-y border-vault-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-eyebrow">Limited time</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-vault-light mb-4">
            Free Delivery<br />
            <span className="text-coffee-400">on orders over Rs 1,000</span>
          </h2>
          <p className="text-vault-muted mb-8 max-w-md mx-auto">
            Order three or more drinks and we'll waive the delivery fee. Use code <strong className="text-coffee-300">VAULT1000</strong> at checkout.
          </p>
          <Link href="/shop" className="btn-primary px-8 py-4 text-base">
            Start Ordering
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-eyebrow">Real reviews</p>
          <h2 className="section-title">What Our Customers Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Sara Ahmed",    location: "DHA Phase 6",   text: "The Rose Cardamom Latte is absolutely mind-blowing. I order it every morning without fail.", stars: 5 },
            { name: "Hamza Sheikh",  location: "Gulshan-e-Iqbal", text: "Cold Brew Barrel is on another level. Delivery was hot in under 40 mins too.", stars: 5 },
            { name: "Ayesha Malik",  location: "Clifton",       text: "Finally a specialty coffee place in Karachi that actually knows what they're doing!", stars: 5 },
          ].map(r => (
            <div key={r.name} className="card p-6">
              <div className="flex gap-0.5 mb-4">
                {Array(r.stars).fill(0).map((_, i) => (
                  <span key={i} className="text-coffee-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-vault-light text-sm leading-relaxed mb-5 italic">"{r.text}"</p>
              <div>
                <p className="text-vault-light text-sm font-semibold">{r.name}</p>
                <p className="text-vault-muted text-xs">{r.location}, Karachi</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
