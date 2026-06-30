// app/checkout/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "../lib/store";
import { CreditCard, Smartphone, Banknote, Lock } from "lucide-react";

const PAYMENT_METHODS = [
  { id: "card", icon: CreditCard, label: "Credit / Debit Card" },
  { id: "easypaisa", icon: Smartphone, label: "Easypaisa" },
  { id: "jazzcash", icon: Smartphone, label: "JazzCash" },
  { id: "cod", icon: Banknote, label: "Cash on Delivery" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, placeOrder, user } = useStore();
  const [method, setMethod] = useState("card");
  const [address, setAddress] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = cartTotal();
  const delivery = subtotal >= 1000 ? 0 : 80;
  const total = subtotal + delivery;

  if (!user || cart.length === 0) {
    router.replace(user ? "/cart" : "/login");
    return null;
  }

  const handlePay = async () => {
    if (!address.trim()) {
      alert("Please enter a delivery address.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // Simulate payment processing
    const order = await placeOrder(method, address);
    if (order) router.push("/orders");
    setLoading(false);
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="section-title mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Delivery + Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery address */}
          <div className="card p-6">
            <h2 className="font-display font-bold text-vault-light text-lg mb-5">
              Delivery Address
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-vault-muted mb-2">
                  Full Address *
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  placeholder="House/Flat #, Street, Area, Karachi..."
                  className="input-field resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-vault-muted mb-2">
                    City
                  </label>
                  <input
                    value="Karachi"
                    readOnly
                    className="input-field opacity-60 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-vault-muted mb-2">
                    Phone
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="03XX-XXXXXXX"
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div className="card p-6">
            <h2 className="font-display font-bold text-vault-light text-lg mb-5">
              Payment Method
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {PAYMENT_METHODS.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setMethod(id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                    method === id
                      ? "border-coffee-500 bg-coffee-900/20 text-vault-light"
                      : "border-vault-border text-vault-muted hover:border-coffee-700"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 ${method === id ? "text-coffee-400" : ""}`}
                  />
                  <span className="text-sm font-medium leading-tight">
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {/* Card fields */}
            {method === "card" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-vault-muted mb-2">
                    Card Number
                  </label>
                  <input
                    value={cardNo}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                      setCardNo(v.replace(/(.{4})/g, "$1 ").trim());
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="input-field"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-vault-muted mb-2">
                      Expiry
                    </label>
                    <input
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM / YY"
                      maxLength={7}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-vault-muted mb-2">
                      CVV
                    </label>
                    <input
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      type="password"
                      placeholder="•••"
                      maxLength={3}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            )}

            {(method === "easypaisa" || method === "jazzcash") && (
              <div>
                <label className="block text-sm text-vault-muted mb-2">
                  {method === "easypaisa" ? "Easypaisa" : "JazzCash"} Mobile
                  Number
                </label>
                <input placeholder="03XX-XXXXXXX" className="input-field" />
                <p className="text-xs text-vault-muted mt-2">
                  You will receive a payment request on this number.
                </p>
              </div>
            )}

            {method === "cod" && (
              <div className="bg-coffee-900/20 border border-coffee-800/30 rounded-xl p-4">
                <p className="text-sm text-vault-muted leading-relaxed">
                  Pay in cash when your order arrives. Our rider will carry
                  change for amounts up to Rs 5,000. Please keep exact change
                  ready if possible.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div>
          <div className="card p-6 sticky top-24">
            <h2 className="font-display font-bold text-vault-light text-lg mb-5">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-vault-muted truncate mr-2">
                    {item.name} × {item.qty}
                  </span>
                  <span className="text-vault-light flex-shrink-0">
                    Rs {item.price * item.qty}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-vault-border pt-4 space-y-2 mb-4">
              <div className="flex justify-between text-sm text-vault-muted">
                <span>Subtotal</span>
                <span className="text-vault-light">Rs {subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-vault-muted">
                <span>Delivery</span>
                <span
                  className={
                    delivery === 0 ? "text-green-400" : "text-vault-light"
                  }
                >
                  {delivery === 0 ? "FREE" : `Rs ${delivery}`}
                </span>
              </div>
            </div>

            <div className="border-t border-vault-border pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span className="text-vault-light">Total</span>
                <span className="text-coffee-400">Rs {total}</span>
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  {method === "cod" ? `Place Order (COD)` : `Pay Rs ${total}`}
                </>
              )}
            </button>

            <p className="text-xs text-vault-muted text-center mt-3 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" /> Secure & encrypted checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
