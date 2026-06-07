import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { LOCAL_BUSINESS_SCHEMA } from "@/components/SEOHead";
import { Phone, Star, Shield, CheckCircle, Users, Fish, Clock } from "lucide-react";
import { fireCallConversion } from "@/lib/gtag";

const BOOK_SCHEMA = {
  ...LOCAL_BUSINESS_SCHEMA,
  description:
    "Book a fishing charter with Reel Smart Charters in Sarasota, FL. Inshore, nearshore, sunset, and full-day trips. Secure online booking powered by FishingBooker.",
};

const WHAT_TO_EXPECT = [
  {
    icon: <Clock className="w-5 h-5 text-gold" />,
    title: "Confirmation within minutes",
    desc: "FishingBooker sends an instant booking confirmation. Captain Jon will follow up with meeting details.",
  },
  {
    icon: <Fish className="w-5 h-5 text-gold" />,
    title: "Everything is included",
    desc: "Florida fishing license, all tackle & live bait, ice & water, and fish cleaning at the end of the trip.",
  },
  {
    icon: <Shield className="w-5 h-5 text-gold" />,
    title: "100% private charter",
    desc: "Your group only — no strangers. Captain Jon tailors the trip to your experience level and target species.",
  },
  {
    icon: <Users className="w-5 h-5 text-gold" />,
    title: "Up to 6 passengers",
    desc: "Base price covers up to 4 people. 5th and 6th passengers add $50 each. Perfect for families and groups.",
  },
];

export default function BookTripPage() {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Book a Fishing Charter"
        description="Book your Sarasota fishing charter online with Reel Smart Charters. Powered by FishingBooker. Inshore, nearshore, sunset & full-day trips. All gear included."
        keywords="book Sarasota fishing charter, fishing charter booking, book fishing trip Sarasota FL, FishingBooker Reel Smart Charters"
        canonical="/book"
        jsonLd={BOOK_SCHEMA}
      />
      <Navbar />

      {/* Page Hero */}
      <section className="relative pt-32 pb-16 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-mid opacity-90" />
        <div className="container relative z-10 text-center">
          <p className="section-label mb-4">Direct Booking</p>
          <h1
            className="text-white text-4xl md:text-6xl mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            Book Your Charter
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-6">
            Secure, instant booking powered by FishingBooker — the world's largest fishing charter marketplace.
          </p>
          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-white/80 ml-1">5.0 · 100+ reviews on FishingBooker</span>
            </div>
            <span className="text-white/30 hidden md:inline">·</span>
            <div className="flex items-center gap-1.5 text-white/70">
              <CheckCircle className="w-4 h-4 text-gold" />
              Verified Charter
            </div>
            <span className="text-white/30 hidden md:inline">·</span>
            <div className="flex items-center gap-1.5 text-white/70">
              <Shield className="w-4 h-4 text-gold" />
              USCG Licensed
            </div>
          </div>
        </div>
      </section>

      {/* Main content: embed + sidebar */}
      <section className="py-16 md:py-20 bg-off-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            {/* FishingBooker embed — takes 2/3 width */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-navy px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-heading font-semibold text-sm tracking-wide">
                      Reel Smart Charters — Sarasota, FL
                    </p>
                    <p className="text-white/50 text-xs mt-0.5">Secure booking via FishingBooker</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
                <div className="p-2">
                  <iframe
                    src="https://fishingbooker.com/embeds/book/2114018"
                    width="100%"
                    height="900"
                    frameBorder="0"
                    scrolling="yes"
                    title="Book a Fishing Charter with Reel Smart Charters on FishingBooker"
                    style={{ borderRadius: "8px", minHeight: "900px", display: "block" }}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Call CTA */}
              <div className="bg-navy rounded-2xl p-6 text-center">
                <p className="text-white/70 text-sm mb-3">Prefer to talk first?</p>
                <a
                  href="tel:+19417025895"
                  onClick={fireCallConversion}
                  className="btn-gold w-full py-3 rounded-lg text-sm flex items-center justify-center gap-2 mb-3"
                >
                  <Phone className="w-4 h-4" />
                  Call (941) 702-5895
                </a>
                <p className="text-white/40 text-xs">Captain Jon answers personally</p>
              </div>

              {/* What to expect */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-navy font-heading font-semibold text-base mb-4">What to expect</h2>
                <div className="space-y-4">
                  {WHAT_TO_EXPECT.map(({ icon, title, desc }) => (
                    <div key={title} className="flex gap-3">
                      <div className="flex-shrink-0 mt-0.5">{icon}</div>
                      <div>
                        <p className="text-navy font-semibold text-sm">{title}</p>
                        <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FishingBooker trust badge */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                <p className="text-gray-500 text-xs mb-2">Booking secured by</p>
                <a
                  href="https://www.fishingbooker.com/charters/profile/2114018"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-navy font-semibold text-sm hover:text-gold transition-colors"
                >
                  <img
                    src="https://fishingbooker.com/assets/logo-icon.png"
                    alt="FishingBooker"
                    className="w-6 h-6 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  FishingBooker
                </a>
                <p className="text-gray-400 text-xs mt-1">World's #1 fishing charter marketplace</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
