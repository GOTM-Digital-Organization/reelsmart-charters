import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const LOGO = "/manus-storage/reel-smart-logo-transparent_724165ca.png";

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="container py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <Link href="/">
                <img
                  src={LOGO}
                  alt="Reel Smart Charters"
                  className="h-16 w-auto object-contain rounded-lg"
                  style={{ backgroundColor: "#ffffff", padding: "4px 8px" }}
                />
              </Link>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Premium inshore and nearshore fishing charters in the back bays, mangroves, and coastal waters of Southwest Florida.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.facebook.com/reelsmartcharters"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-gold transition-colors group"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 text-white group-hover:text-navy" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/reelsmartcharters"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-gold transition-colors group"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 text-white group-hover:text-navy" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-heading text-xs tracking-widest uppercase mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About Captain Jon", href: "/about" },
                { label: "Trips & Rates", href: "/charters" },
                { label: "Photo Gallery", href: "/gallery" },
                { label: "Testimonials", href: "/testimonials" },
                { label: "Contact & Booking", href: "/contact" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="block text-white/50 hover:text-gold text-sm transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold font-heading text-xs tracking-widest uppercase mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="tel:+19417025895" className="text-white/50 hover:text-gold transition-colors">(941) 702-5895</a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href="mailto:Fish@reelsmartcharters.com"
                  className="text-white/50 hover:text-gold transition-colors"
                >
                  Fish@reelsmartcharters.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Sarasota, Florida</span>
              </div>
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Daily · 5am – 8pm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">© 2026 Reel Smart Charters · USCG Licensed · All Rights Reserved</p>
          <p className="text-white/20 text-xs">Sarasota · Bradenton · Venice · Southwest Florida</p>
        </div>
      </div>
    </footer>
  );
}
