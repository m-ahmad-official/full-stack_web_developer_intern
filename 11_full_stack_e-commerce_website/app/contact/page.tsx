// app/contact/page.tsx
"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent]   = useState(false);
  const [form, setForm]   = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { alert("Please fill all required fields."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen">

      {/* Header */}
      <div className="bg-vault-card border-b border-vault-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="section-eyebrow">Get in touch</p>
          <h1 className="section-title text-4xl md:text-5xl">We'd Love to Hear From You</h1>
          <p className="text-vault-muted max-w-xl mx-auto">
            Questions, feedback, catering enquiries, or just want to say hi — drop us a line.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Info */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-display font-bold text-vault-light text-lg mb-5">Contact Info</h3>
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: "Address",   value: "12-A, Zamzama Commercial Lane 4, DHA Phase 5, Karachi" },
                  { icon: Phone,  label: "Phone",     value: "+92 21 3456 7890" },
                  { icon: Mail,   label: "Email",     value: "hello@coffeevault.pk" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-coffee-900/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-coffee-400" />
                    </div>
                    <div>
                      <p className="text-xs text-vault-muted">{label}</p>
                      <p className="text-sm text-vault-light mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-display font-bold text-vault-light text-lg mb-5">
                <Clock className="w-4 h-4 inline mr-2 text-coffee-400" />
                Opening Hours
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { day: "Monday – Friday", hours: "8:00 AM – 11:00 PM" },
                  { day: "Saturday",        hours: "8:00 AM – 11:00 PM" },
                  { day: "Sunday",          hours: "9:00 AM – 10:00 PM" },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-vault-muted">{day}</span>
                    <span className="text-vault-light font-medium">{hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400 font-medium">Open Now</span>
              </div>
            </div>

            {/* Social */}
            <div className="card p-6">
              <h3 className="font-display font-bold text-vault-light text-lg mb-4">Follow Us</h3>
              <div className="space-y-2 text-sm text-vault-muted">
                <p>📸 @coffeevault.pk on Instagram</p>
                <p>🐦 @CoffeeVaultPK on Twitter</p>
                <p>👥 /CoffeeVaultKarachi on Facebook</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              {sent ? (
                <div className="text-center py-16">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-5" />
                  <h3 className="font-display text-2xl font-bold text-vault-light mb-3">Message Sent!</h3>
                  <p className="text-vault-muted mb-6">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name:"",email:"",subject:"",message:"" }); }} className="btn-secondary text-sm">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display font-bold text-vault-light text-2xl mb-6">Send a Message</h2>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-vault-muted mb-2">Your Name *</label>
                        <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Ali Hassan" className="input-field" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-vault-muted mb-2">Email Address *</label>
                        <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="ali@example.com" className="input-field" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-vault-muted mb-2">Subject</label>
                      <select value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))} className="input-field cursor-pointer">
                        <option value="">Select a subject...</option>
                        <option>General Enquiry</option>
                        <option>Catering / Bulk Order</option>
                        <option>Feedback</option>
                        <option>Partnership</option>
                        <option>Complaint</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-vault-muted mb-2">Message *</label>
                      <textarea
                        value={form.message}
                        onChange={e => setForm(f => ({...f, message: e.target.value}))}
                        rows={6}
                        placeholder="What's on your mind?"
                        className="input-field resize-none"
                      />
                    </div>

                    <button onClick={handleSubmit} disabled={loading} className="btn-primary flex items-center gap-2 px-8 py-3.5 disabled:opacity-70">
                      {loading
                        ? <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        : <Send className="w-4 h-4" />
                      }
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
