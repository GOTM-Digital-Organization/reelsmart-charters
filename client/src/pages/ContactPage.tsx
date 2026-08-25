import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { fireBookingConversion, fireCallConversion} from "@/lib/gtag";
import { Phone, Mail, MapPin, Clock, Fish } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { LOCAL_BUSINESS_SCHEMA } from "@/components/SEOHead";

const HERO_IMG = "/images/photo-2267.webp";

const CONTACT_SCHEMA = {
  ...LOCAL_BUSINESS_SCHEMA,
  description:
    "Contact Reel Smart Charters to book your fishing charter in Sarasota, FL. Send a booking inquiry and Captain Jon will get back to you quickly.",
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    groupSize: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", preferredDate: "", groupSize: "", message: "" });
      fireBookingConversion();
      toast.success("Inquiry sent! Captain Jon will be in touch soon.");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    submitMutation.mutate({
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      preferredDate: form.preferredDate || undefined,
      groupSize: form.groupSize ? parseInt(form.groupSize) : undefined,
      message: form.message || undefined,
    });
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Contact & Book a Fishing Charter — Reel Smart Charters Sarasota FL"
        description="Book a fishing charter with Reel Smart Charters in Sarasota, FL. Send a booking inquiry and Captain Jon will get back to you quickly to confirm your trip details."
        canonical="/contact"
        jsonLd={CONTACT_SCHEMA}
      />
      <Navbar />

      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <img src={HERO_IMG} alt="Fishing on the waters of Southwest Florida" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy/90" />
        <div className="container relative z-10 text-center">
          <p className="section-label mb-4">Get In Touch</p>
          <h1 className="text-white text-4xl md:text-6xl mb-4 leading-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
            Book Your Charter
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Fill out the form and Captain Jon will get back to you quickly to confirm your trip details.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Info */}
            <div>
              <p className="section-label mb-3">Contact Info</p>
              <h2 className="text-navy text-3xl md:text-4xl mb-6">Ready to hit the water?</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                All charters are 100% private — your group, your pace, your adventure. Fill out the form and Captain Jon will get back to you quickly to confirm your trip details.
              </p>

              <div className="space-y-5 mb-8">
                {[
                  { icon: Phone, label: "Phone", value: "(941) 702-5895", href: "tel:+19417025895" },
                  { icon: Mail, label: "Email", value: "Fish@reelsmartcharters.com", href: "mailto:Fish@reelsmartcharters.com" },
                  { icon: MapPin, label: "Charter Pickup", value: "1059 N Tamiami Trl, Sarasota, FL 34236", href: "https://maps.google.com/?q=1059+N+Tamiami+Trl,+Sarasota,+FL+34236" },
                  { icon: Clock, label: "Hours", value: "Daily · 5am – 8pm", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <div className="text-navy font-heading text-xs tracking-widest uppercase mb-0.5">{label}</div>
                      {href ? (
                        <a href={href} className="text-gray-700 hover:text-gold transition-colors">{value}</a>
                      ) : (
                        <span className="text-gray-700">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div>
                <p className="text-navy font-heading text-xs tracking-widest uppercase mb-3">Follow Us</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/reelsmartcharters"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center hover:bg-gold transition-colors group"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5 text-white group-hover:text-navy" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/reelsmartcharters"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center hover:bg-gold transition-colors group"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5 text-white group-hover:text-navy" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* What to Expect */}
              <div className="mt-10 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-navy font-heading font-semibold mb-4">What to Expect</h3>
                <div className="space-y-3">
                  {[
                    "Captain Jon responds within 24 hours",
                    "All charters are 100% private",
                    "Flexible scheduling — mornings, evenings, weekends",
                    "25% deposit to confirm your booking",
                    "Full refund for weather cancellations",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                    <Fish className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-navy text-xl font-heading font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-500 mb-6">Captain Jon will be in touch soon to confirm your trip.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-gold px-6 py-2.5 rounded text-sm"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-navy font-heading text-lg font-semibold tracking-wide mb-5">Booking Inquiry</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-navy text-xs font-heading tracking-widest uppercase mb-1.5">Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-navy text-xs font-heading tracking-widest uppercase mb-1.5">Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-navy text-xs font-heading tracking-widest uppercase mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
                        placeholder="(xxx) xxx-xxxx"
                      />
                    </div>
                    <div>
                      <label className="block text-navy text-xs font-heading tracking-widest uppercase mb-1.5">Group Size</label>
                      <select
                        value={form.groupSize}
                        onChange={(e) => setForm({ ...form, groupSize: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors bg-white"
                      >
                        <option value="">Select...</option>
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-navy text-xs font-heading tracking-widest uppercase mb-1.5">Preferred Date</label>
                    <input
                      type="date"
                      value={form.preferredDate}
                      onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-navy text-xs font-heading tracking-widest uppercase mb-1.5">Message</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors resize-none"
                      placeholder="Tell us about your ideal trip — preferred charter type, target species, any questions..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="btn-gold w-full py-3.5 rounded text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitMutation.isPending ? "Sending..." : "Send Booking Inquiry"}
                  </button>

                  <p className="text-gray-400 text-xs text-center">
                    We typically respond within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
