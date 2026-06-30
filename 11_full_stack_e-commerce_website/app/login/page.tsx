// app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "../lib/store";
import { Coffee, Eye, EyeOff, User } from "lucide-react";

type Tab = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const { login, signup, authLoading, authError } = useStore();

  const [tab, setTab] = useState<Tab>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [localError, setLocalError] = useState("");

  const error = localError || authError;

  const switchTab = (t: Tab) => {
    setTab(t);
    setLocalError("");
    setName("");
    setEmail("");
    setPass("");
    setPass2("");
  };

  const handleSubmit = async () => {
    setLocalError("");

    if (tab === "signup") {
      if (!name.trim()) {
        setLocalError("Name is required.");
        return;
      }
      if (!email.trim()) {
        setLocalError("Email is required.");
        return;
      }
      if (pass.length < 6) {
        setLocalError("Password must be at least 6 characters.");
        return;
      }
      if (pass !== pass2) {
        setLocalError("Passwords do not match.");
        return;
      }
      const ok = await signup(name.trim(), email.trim(), pass);
      if (ok) router.push("/");
    } else {
      if (!email.trim() || !pass) {
        setLocalError("Email and password are required.");
        return;
      }
      const ok = await login(email.trim(), pass);
      if (ok) router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Coffee className="w-10 h-10 text-coffee-400 mx-auto mb-3" />
          <h1 className="font-display text-3xl font-bold text-vault-light">
            Coffee Vault
          </h1>
          <p className="text-vault-muted mt-1 text-sm">
            Karachi's finest specialty coffee
          </p>
        </div>

        <div className="card overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-vault-border">
            <button
              onClick={() => switchTab("login")}
              className={`flex-1 py-4 text-sm font-semibold transition-colors ${
                tab === "login"
                  ? "text-coffee-400 border-b-2 border-coffee-400 bg-coffee-900/10"
                  : "text-vault-muted hover:text-vault-light"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => switchTab("signup")}
              className={`flex-1 py-4 text-sm font-semibold transition-colors ${
                tab === "signup"
                  ? "text-coffee-400 border-b-2 border-coffee-400 bg-coffee-900/10"
                  : "text-vault-muted hover:text-vault-light"
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="p-8">
            {/* Error */}
            {error && (
              <div className="bg-red-900/20 border border-red-700/40 text-red-300 rounded-lg px-4 py-3 text-sm mb-5">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Name — signup only */}
              {tab === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-vault-muted mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-vault-muted" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ali Hassan"
                      className="input-field pl-10"
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-vault-muted mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-vault-muted mb-2">
                  Password *{" "}
                  {tab === "signup" && (
                    <span className="text-xs text-vault-muted font-normal">
                      (min. 6 characters)
                    </span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pr-10"
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  />
                  <button
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-vault-muted hover:text-vault-light transition-colors"
                  >
                    {showPw ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password — signup only */}
              {tab === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-vault-muted mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type={showPw ? "text" : "password"}
                    value={pass2}
                    onChange={(e) => setPass2(e.target.value)}
                    placeholder="••••••••"
                    className="input-field"
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  />
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={authLoading}
                className="btn-primary w-full py-3.5 text-base disabled:opacity-70 mt-2"
              >
                {authLoading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : tab === "login" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            {/* Switch tab */}
            <p className="text-center text-sm text-vault-muted mt-5">
              {tab === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => switchTab("signup")}
                    className="text-coffee-400 hover:text-coffee-300 font-medium transition-colors"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => switchTab("login")}
                    className="text-coffee-400 hover:text-coffee-300 font-medium transition-colors"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-vault-muted mt-6">
          By signing up you agree to our{" "}
          <Link href="#" className="text-coffee-400 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
