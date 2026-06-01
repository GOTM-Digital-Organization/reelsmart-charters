import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { LOCAL_BUSINESS_SCHEMA } from "@/components/SEOHead";

const HERO_IMG = "/manus-storage/IMG_1911_dc01a577.webp";

const CHARTERS_SCHEMA = {
  ...LOCAL_BUSINESS_SCHEMA,
  description:
    "View all fishing charter packages and pricing for Reel Smart Charters in Sarasota, FL. Inshore, nearshore, sunset, and full-day trips. All gear, bait, and license included.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Fishing Charter Packages",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Half Day Inshore Charter",
          description: "4-hour inshore fishing charter in Sarasota Bay",
        },
      },
    ],
  },
};

export default function ChartersPage() {
  const { data: packages, isLoading } = trpc.charters.list.useQuery();

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Fishing Charter Packages & Pricing — Reel Smart Charters Sarasota FL"
        description="View all fishing charter packages and pricing for Reel Smart Charters in Sarasota, FL. Half-day, full-day, nearshore, sunset trips. All gear, bait & license included."
        canonical="/charters"
        jsonLd={CHARTERS_SCHEMA}
      />
      <Navbar />

      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <img src={HERO_IMG} alt="Angler fighting a fish on a Reel Smart Charter" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy/90" />
        <div className="container relative z-10 text-center">
          <p className="section-label mb-4">Trips & Rates</p>
          <h1 className="text-white text-4xl md:text-6xl mb-4 leading-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
            Charter Packages
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Eight trip options — bay, Gulf, sunset, single angler, and more. Everything included.
          </p>
        </div>
      </section>

      {/* What's Included Banner */}
      <section className="bg-gold py-5">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {["Fishing License", "All Tackle & Bait", "Ice & Water", "Fish Cleaning", "Private Charter", "USCG Licensed Captain"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-navy font-heading text-sm font-semibold tracking-wide">
                <CheckCircle className="w-4 h-4" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 md:py-28 bg-navy">
        <div className="container">
          <div className="text-center mb-14">
            <p className="section-label mb-3">All Packages</p>
            <h2 className="text-white text-3xl md:text-4xl mb-4">Pick the day you've been daydreaming about.</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Base price is for up to 4 people. 5th &amp; 6th person add $50 each. Up to 6 passengers total. All trips are 100% private.
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-navy-mid rounded-xl h-64 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {packages?.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-navy-mid rounded-xl overflow-hidden border border-white/10 hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 flex flex-col"
                >
                  {pkg.badge && (
                    <div className="bg-gold text-navy text-xs font-heading font-bold tracking-wider px-3 py-1.5 text-center uppercase">
                      {pkg.badge}
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-white font-heading text-lg font-semibold leading-tight">{pkg.name}</h3>
                    </div>
                    <div className="flex gap-3 mb-4">
                      <span className="text-gold/80 text-xs font-heading tracking-wider bg-gold/10 px-2 py-1 rounded">{pkg.duration}</span>
                      <span className="text-white/50 text-xs font-heading tracking-wider bg-white/5 px-2 py-1 rounded">{pkg.type}</span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed flex-1 mb-4">{pkg.description}</p>
                    <div className="border-t border-white/10 pt-4 mt-auto">
                      <div className="flex items-end justify-between mb-1">
                        <div>
                          {pkg.maxPassengers !== 1 && (
                            <div className="text-white/40 text-xs">Base price (up to 4 people)</div>
                          )}
                          <div className="text-gold font-heading text-2xl font-bold">${pkg.price.toLocaleString()}</div>
                        </div>
                        <div className="text-white/40 text-xs text-right">
                          {pkg.maxPassengers === 1 ? "1 passenger" : "up to 6"}
                        </div>
                      </div>
                      {pkg.maxPassengers !== 1 && (
                        <div className="text-white/40 text-xs mb-3">5th &amp; 6th person +$50 each</div>
                      )}
                      {pkg.maxPassengers === 1 && <div className="mb-3" />}
                      <a
                        href="https://fishingbooker.com/embeds/book/2114018"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold w-full py-2.5 rounded text-sm block text-center"
                      >
                        Book This Trip
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-white/40 text-sm text-center mt-8 max-w-2xl mx-auto">
            <strong className="text-white/60">Pricing note:</strong> Base price covers up to 4 people. 5th and 6th passengers are $50 each. A gratuity of around 20% is customary and appreciated.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 bg-off-white">
        <div className="container max-w-3xl">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Common Questions</p>
            <h2 className="text-navy text-3xl md:text-4xl mb-4">Charter FAQ</h2>
          </div>
          <div className="space-y-6">
            {[
              {
                q: "What should I bring on the charter?",
                a: "Sunscreen, sunglasses, a hat, comfortable non-marking shoes, and any food or drinks you'd like. We provide water, but you're welcome to bring snacks, lunch, or beverages.",
              },
              {
                q: "Is the fishing license included?",
                a: "Yes — your Florida saltwater fishing license is included in the charter price for all passengers.",
              },
              {
                q: "What if the weather is bad?",
                a: "Safety is the top priority. If conditions are unsafe, we'll reschedule your trip at no charge. Light rain or wind is usually fine — Captain Jon will make the call.",
              },
              {
                q: "Can I keep the fish I catch?",
                a: "Absolutely. We follow all Florida FWC regulations. Captain Jon will clean and bag your legal catch at the end of the trip.",
              },
              {
                q: "How far in advance should I book?",
                a: "Weekends and holidays book fast — we recommend booking at least 2–3 weeks in advance. Weekday availability is usually more flexible.",
              },
              {
                q: "Is the charter suitable for kids?",
                a: "Yes! Captain Jon loves introducing kids to fishing. Trips are family-friendly and can be tailored to younger anglers.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-navy font-heading font-semibold mb-2">{q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="container text-center">
          <h2 className="text-white text-3xl md:text-4xl mb-4">Ready to book your charter?</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Book instantly through FishingBooker — secure, verified, and confirmed in minutes.
          </p>
          <a
            href="https://fishingbooker.com/embeds/book/2114018"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-10 py-4 rounded text-base inline-flex items-center gap-2"
          >
            Book Now <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
