// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Coffee, Heart, Leaf, Users } from "lucide-react";

const TEAM = [
  {
    name: "Omar Farooq",
    role: "Founder & Head Roaster",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
  {
    name: "Zara Ahmed",
    role: "Barista Champion 2023",
    img: "https://images.unsplash.com/photo-1494790108755-1616b612b550?w=200&q=80",
  },
  {
    name: "Bilal Sheikh",
    role: "Operations & Logistics",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
];

const MILESTONES = [
  {
    year: "2019",
    title: "The First Brew",
    desc: "Started in a tiny 300 sq ft space in PECHS with one espresso machine and a big dream.",
  },
  {
    year: "2020",
    title: "Direct Trade",
    desc: "Flew to Ethiopia to source our first single-origin lot directly from Worka Cooperative farmers.",
  },
  {
    year: "2022",
    title: "Karachi's Top Pick",
    desc: "Named Best Specialty Coffee by Dawn Life Magazine, serving over 500 customers a day.",
  },
  {
    year: "2024",
    title: "Delivery & Beyond",
    desc: "Launched coffeeVault.pk, bringing our craft directly to your door across Karachi.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1600&q=80"
            alt="Coffee roastery"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-vault-dark/60 via-vault-dark/40 to-vault-dark" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="section-eyebrow">Our Story</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-vault-light mb-6 leading-tight">
            Obsessed with
            <br />
            <span className="text-coffee-400">the Perfect Cup</span>
          </h1>
          <p className="text-vault-muted text-lg max-w-2xl mx-auto leading-relaxed">
            We started Coffee Vault because we were tired of bad coffee in a
            city that deserves better. Five years later, we're still obsessing
            over every detail — so you don't have to.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-vault-card/30 border-y border-vault-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Coffee,
                title: "Craft First",
                desc: "Every drink is made by hand by trained baristas. No shortcuts. No pre-made syrups. Just skill and care.",
              },
              {
                icon: Leaf,
                title: "Ethically Sourced",
                desc: "We visit our farms. We pay fair prices. We believe the best coffee tastes better when no one was exploited for it.",
              },
              {
                icon: Heart,
                title: "Community Driven",
                desc: "We partner with local artists, host cupping events, and give 2% of every sale to Karachi's public schools.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-coffee-900/40 border border-vault-border flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-7 h-7 text-coffee-400" />
                </div>
                <h3 className="font-display text-xl font-bold text-vault-light mb-3">
                  {title}
                </h3>
                <p className="text-vault-muted text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="section-eyebrow">How we got here</p>
          <h2 className="section-title">Our Journey</h2>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-vault-border hidden sm:block" />
          <div className="space-y-10">
            {MILESTONES.map(({ year, title, desc }) => (
              <div key={year} className="flex gap-6 sm:gap-10">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-coffee-900/40 border border-coffee-700/40 flex items-center justify-center z-10 relative">
                    <span className="font-display font-bold text-coffee-400 text-sm">
                      {year}
                    </span>
                  </div>
                </div>
                <div className="pt-3 pb-2">
                  <h3 className="font-display text-xl font-bold text-vault-light mb-2">
                    {title}
                  </h3>
                  <p className="text-vault-muted text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-vault-card/30 border-y border-vault-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-eyebrow">The people behind every cup</p>
            <h2 className="section-title">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {TEAM.map(({ name, role, img }) => (
              <div key={name} className="text-center">
                <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-2 border-vault-border">
                  <Image
                    src={img}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <h3 className="font-semibold text-vault-light text-lg">
                  {name}
                </h3>
                <p className="text-vault-muted text-sm mt-1">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Users className="w-12 h-12 text-coffee-400 mx-auto mb-5" />
        <h2 className="font-display text-3xl md:text-4xl font-bold text-vault-light mb-4">
          Come Visit Us in Karachi
        </h2>
        <p className="text-vault-muted max-w-xl mx-auto mb-8">
          Walk in any time. Pull up a stool. Let us make you something you'll
          remember. 12-A, Zamzama Commercial Lane 4, DHA Phase 5.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/menu" className="btn-primary px-8 py-3">
            View Our Menu
          </Link>
          <Link href="/contact" className="btn-secondary px-8 py-3">
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
