// app/components/Footer.tsx
import Link from "next/link";
import { Coffee, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-vault-card border-t border-vault-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Coffee className="w-7 h-7 text-coffee-400" />
              <span className="font-display text-2xl font-bold text-vault-light">
                Coffee<span className="text-coffee-400">Vault</span>
              </span>
            </Link>
            <p className="text-vault-muted text-sm leading-relaxed mb-6">
              Karachi's finest specialty coffee roastery and café. Single-origin
              beans, slow brews, and zero shortcuts — since 2019.
            </p>
            {/* Social icons as plain SVG — no lucide dependency */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-vault-dark border border-vault-border hover:border-coffee-500 flex items-center justify-center text-vault-muted hover:text-coffee-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-lg bg-vault-dark border border-vault-border hover:border-coffee-500 flex items-center justify-center text-vault-muted hover:text-coffee-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-vault-dark border border-vault-border hover:border-coffee-500 flex items-center justify-center text-vault-muted hover:text-coffee-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-vault-light font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/menu", label: "Menu" },
                { href: "/shop", label: "Shop" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-vault-muted hover:text-coffee-400 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account links */}
          <div>
            <h4 className="text-vault-light font-semibold text-sm uppercase tracking-wider mb-4">
              Account
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/login", label: "Sign In" },
                { href: "/cart", label: "My Cart" },
                { href: "/orders", label: "My Orders" },
                { href: "/admin", label: "Admin Panel" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-vault-muted hover:text-coffee-400 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-vault-light font-semibold text-sm uppercase tracking-wider mb-4">
              Find Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-vault-muted">
                <MapPin className="w-4 h-4 text-coffee-400 mt-0.5 flex-shrink-0" />
                <span>
                  12-A, Zamzama Commercial Lane 4, DHA Phase 5, Karachi
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-vault-muted">
                <Phone className="w-4 h-4 text-coffee-400 flex-shrink-0" />
                <span>+92 21 3456 7890</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-vault-muted">
                <Mail className="w-4 h-4 text-coffee-400 flex-shrink-0" />
                <span>hello@coffeevault.pk</span>
              </li>
            </ul>
            <div className="mt-5 p-3 rounded-lg bg-vault-dark border border-vault-border">
              <p className="text-xs text-vault-muted">
                <span className="text-coffee-400 font-semibold">
                  Open Daily
                </span>
                <br />
                Mon–Sat: 8:00 AM – 11:00 PM
                <br />
                Sunday: 9:00 AM – 10:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-vault-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-vault-muted text-xs">
            © {new Date().getFullYear()} CoffeeVault. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-vault-muted">
            <Link href="#" className="hover:text-coffee-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-coffee-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-coffee-400 transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
