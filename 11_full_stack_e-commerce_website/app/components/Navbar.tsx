// app/components/Navbar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "../lib/store";
import { ShoppingCart, User, Menu, X, Coffee } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/",        label: "Home"    },
  { href: "/menu",    label: "Menu"    },
  { href: "/shop",    label: "Shop"    },
  { href: "/about",   label: "About"   },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname  = usePathname();
  const { cart, user, logout } = useStore();
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-vault-dark/95 backdrop-blur-sm border-b border-vault-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Coffee className="w-6 h-6 text-coffee-400" />
          <span className="font-display text-xl font-bold text-vault-light">
            Coffee<span className="text-coffee-400">Vault</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "text-coffee-400 bg-coffee-900/30"
                      : "text-vault-muted hover:text-vault-light hover:bg-vault-card"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Cart */}
          <Link href="/cart" className="relative p-2 rounded-lg hover:bg-vault-card transition-colors">
            <ShoppingCart className="w-5 h-5 text-vault-muted hover:text-vault-light" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-coffee-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              {user.role === "admin" && (
                <Link href="/admin" className="text-sm text-coffee-400 hover:text-coffee-300 font-medium px-3 py-1.5 rounded-lg hover:bg-vault-card transition-colors">
                  Admin
                </Link>
              )}
              <Link href="/orders" className="btn-ghost text-sm hidden lg:block">
                My Orders
              </Link>
              <button onClick={logout} className="btn-ghost text-sm">
                Logout
              </button>
              <div className="w-8 h-8 rounded-full bg-coffee-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user.name.charAt(0)}
              </div>
            </div>
          ) : (
            <Link href="/login" className="hidden md:flex items-center gap-1.5 btn-primary text-sm py-2">
              <User className="w-4 h-4" />
              Sign In
            </Link>
          )}

          {/* Mobile menu btn */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-vault-card transition-colors text-vault-muted">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-vault-card border-t border-vault-border px-4 py-4 space-y-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className="block px-4 py-2 rounded-lg text-vault-muted hover:text-vault-light hover:bg-vault-dark transition-colors text-sm font-medium">
              {label}
            </Link>
          ))}
          <div className="pt-2 border-t border-vault-border mt-2">
            {user ? (
              <>
                <Link href="/orders" onClick={() => setOpen(false)} className="block px-4 py-2 rounded-lg text-vault-muted hover:text-vault-light text-sm">My Orders</Link>
                {user.role === "admin" && <Link href="/admin" onClick={() => setOpen(false)} className="block px-4 py-2 rounded-lg text-coffee-400 text-sm">Admin Panel</Link>}
                <button onClick={() => { logout(); setOpen(false); }} className="block w-full text-left px-4 py-2 rounded-lg text-vault-muted hover:text-vault-light text-sm">Logout</button>
              </>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm font-medium text-coffee-400">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
