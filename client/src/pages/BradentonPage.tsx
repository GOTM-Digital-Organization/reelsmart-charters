import { fireBookingConversion, fireCallConversion} from "@/lib/gtag";
import { Link } from "wouter";
import { Shield, Fish, Anchor, Users, Star, Phone, ArrowRight, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { LOCAL_BUSINESS_SCHEMA } from "@/components/SEOHead";

const PHOTOS = {
  hero: "/manus-storage/IMG_2743_921fdb55.webp",
  fish1: "/manus-storage/IMG_2101_de18cff3.webp",
  fish2: "/manus-storage/IMG_2671_3e01b874.webp",
  boat: "/manus-storage/IMG_3729_533ea3f4.webp",
};

const BRADENTON_SCHEMA = {
  ...LOCAL_BUSINESS_SCHEMA,
  name: "Reel Smart Charters — Bradenton Fishing Charters",
  description:
    "Fishing charters in Bradenton, FL. Inshore and nearshore trips on Tampa Bay and the Manatee River targeting snook, redfish, tarpon, and more. USCG licensed Captain Jon. All gear included.",
  url: "https://www.reelsmartcharters.com/fishing-charters-bradenton-fl",
};

const BRADENTON_BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.reelsmartcharters.com" },
    { "@type": "ListItem", "position": 2, "name": "Fishing Charters Bradenton FL", "item": "https://www.reelsmartcharters.com/fishing-charters-bradenton-fl" },
  ],
};

export default function BradentonPage() {
  return (
    <>
      <SEOHead
        title="Fishing Charters Bradenton FL — Tampa Bay Inshore & Nearshore | Reel Smart Charters"
        description="Top-rated fishing charters in Bradenton, FL. Fish Tampa Bay, the Manatee River, and nearshore Gulf waters for snook, redfish, tarpon, and more. Private charters with USCG licensed Captain Jon."
        canonical="/fishing-charters-bradenton-fl"
        jsonLd={[BRADENTON_SCHEMA, BRADENTON_BREADCRUMB_SCHEMA]}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <img src={PHOTOS.hero} alt="Fishing charters Bradenton FL Tampa Bay" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl">
            <p className="section-label mb-4">Bradenton · Tampa Bay · Southwest Florida</p>
            <h1 className="text-white leading-tight mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800 }}>
              Fishing Charters Bradenton, FL
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-xl">
              Explore the legendary fishing grounds of Tampa Bay, the Manatee River, and the nearshore Gulf with USCG licensed Captain Jon. Private charters for all skill levels — all gear, bait, and license included.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://fishingbooker.com/embeds/book/2114018" onClick={fireBookingConversion} target="_blank" rel="noopener noreferrer" className="btn-gold px-8 py-4 rounded text-base">
                Book a Bradenton Charter
              </a>
              <a href="tel:+19417025895" onClick={fireCallConversion} className="btn-outline-gold px-8 py-4 rounded text-base flex items-center gap-2">
                <Phone className="w-4 h-4" /> (941) 702-5895
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Bradenton */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="section-label mb-3">Why Bradenton?</p>
            <h2 className="text-navy text-3xl md:text-4xl mb-5" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              Bradenton Sits at the Heart of Tampa Bay Fishing
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Bradenton is positioned at the mouth of the Manatee River where it meets Tampa Bay — one of the most productive estuaries on Florida's Gulf Coast. The combination of grass flats, oyster bars, mangrove shorelines, and nearshore reefs creates a year-round fishery that rivals anywhere in the state.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Fish,
                title: "Tampa Bay Flats",
                desc: "The grass flats of Tampa Bay are legendary for snook, redfish, and spotted seatrout. Sight fishing at its finest.",
              },
              {
                icon: Anchor,
                title: "Manatee River",
                desc: "The Manatee River is a snook and redfish highway. Backwater fishing in the river's mangrove-lined banks is world-class.",
              },
              {
                icon: Users,
                title: "All Skill Levels",
                desc: "Whether it's your first time fishing or you're a seasoned angler, Captain Jon tailors every trip to your experience level.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-full bg-navy/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-navy" />
                </div>
                <h3 className="text-navy font-heading text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Species */}
      <section className="py-20 bg-off-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-3">What We Target</p>
              <h2 className="text-navy text-3xl md:text-4xl mb-6" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                Bradenton Fishing Species Guide
              </h2>
              <div className="space-y-4">
                {[
                  { name: "Snook", season: "Year-round", desc: "Tampa Bay is one of the top snook fisheries in the world. The Manatee River and bay shorelines hold big snook year-round." },
                  { name: "Redfish", season: "Year-round", desc: "Copper-colored bruisers that tail on the flats and crush live bait. The grass flats around Bradenton are prime redfish territory." },
                  { name: "Spotted Seatrout", season: "Year-round", desc: "Trout are abundant on the grass flats of Tampa Bay. Great for families and beginners — they bite readily and fight hard." },
                  { name: "Tarpon", season: "Spring–Fall", desc: "The Silver King migrates through Tampa Bay every spring. Bradenton is one of the best places in Florida to target tarpon." },
                  { name: "Cobia", season: "Spring", desc: "Cobia follow rays and sharks across the Tampa Bay flats in spring — one of the most exciting sight-fishing opportunities in Florida." },
                ].map(({ name, season, desc }) => (
                  <div key={name} className="flex gap-4 p-4 bg-white rounded-lg border border-gray-100">
                    <div className="flex-shrink-0 w-2 rounded-full bg-gold mt-1" />
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-navy font-heading font-semibold">{name}</span>
                        <span className="text-xs text-gold bg-gold/10 px-2 py-0.5 rounded-full">{season}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={PHOTOS.fish1} alt="Trout caught on Bradenton fishing charter" className="rounded-xl object-cover w-full h-48 shadow-md" />
              <img src={PHOTOS.fish2} alt="Hogfish caught near Bradenton FL" className="rounded-xl object-cover w-full h-48 shadow-md mt-8" />
              <img src={PHOTOS.boat} alt="Reel Smart Charters crew near Bradenton" className="rounded-xl object-cover w-full h-48 shadow-md col-span-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Charter Options */}
      <section className="py-20 bg-navy text-white">
        <div className="container">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Charter Options</p>
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              Bradenton Fishing Charter Packages
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">All charters depart from Sarasota (1059 N Tamiami Trl) — minutes from Bradenton. All prices are for up to 6 people. 100% private.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { duration: "4-Hour", price: "$500", group: "Up to 6 people", desc: "Perfect intro trip. Inshore flats and backwater fishing targeting snook, redfish, and trout." },
              { duration: "6-Hour", price: "$700", group: "Up to 6 people", desc: "Our most popular trip. More water covered, more species targeted — inshore and nearshore.", popular: true },
              { duration: "8-Hour", price: "$900", group: "Up to 6 people", desc: "Full-day adventure. Nearshore reefs, offshore structure, and everything in between." },
            ].map(({ duration, price, group, desc, popular }) => (
              <div key={duration} className={`rounded-xl p-6 border ${popular ? "border-gold bg-white/10" : "border-white/10 bg-white/5"}`}>
                {popular && <div className="text-gold text-xs font-heading tracking-widest uppercase mb-3">Most Popular</div>}
                <div className="text-3xl font-bold mb-0.5">{price}</div>
                <div className="text-gold font-heading text-sm mb-3">{duration} Charter · {group}</div>
                <p className="text-white/60 text-sm mb-5">{desc}</p>
                <a href="https://fishingbooker.com/embeds/book/2114018" onClick={fireBookingConversion} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center py-2.5 rounded text-sm block">
                  Book This Trip
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-white/40 text-sm mt-6">All gear, bait, tackle &amp; fishing license included. All trips are 100% private — up to 6 people.</p>
        </div>
      </section>

      {/* Testimonials snippet */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <p className="section-label mb-3">What Anglers Say</p>
            <h2 className="text-navy text-2xl md:text-3xl" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              Bradenton Charter Reviews
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Dave R.", text: "Captain Jon knows Tampa Bay like the back of his hand. We caught redfish and snook all morning near Bradenton. Incredible trip!", rating: 5 },
              { name: "Jennifer M.", text: "Took the family out for a 6-hour trip near Bradenton. Kids caught their first snook and trout. Captain Jon was patient and fun. 10/10!", rating: 5 },
            ].map(({ name, text, rating }) => (
              <div key={name} className="bg-off-white rounded-xl p-6 border border-gray-100">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">"{text}"</p>
                <p className="text-navy font-heading text-sm font-semibold">{name}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/testimonials" className="text-gold hover:text-navy transition-colors font-heading text-sm flex items-center gap-2 justify-center">
              Read All Reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-off-white">
        <div className="container max-w-3xl text-center">
          <MapPin className="w-10 h-10 text-gold mx-auto mb-4" />
          <h2 className="text-navy text-2xl md:text-3xl mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            Departure Location
          </h2>
          <p className="text-gray-600 mb-2 text-lg">1059 N Tamiami Trl, Sarasota, FL 34236</p>
          <p className="text-gray-500 text-sm mb-6">Just minutes south of Bradenton — easy access to Tampa Bay, the Manatee River, and all Bradenton area fishing grounds.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://maps.google.com/?q=1059+N+Tamiami+Trl,+Sarasota,+FL+34236"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-navy px-6 py-3 rounded text-sm"
            >
              Get Directions
            </a>
            <a href="https://fishingbooker.com/embeds/book/2114018" onClick={fireBookingConversion} target="_blank" rel="noopener noreferrer" className="btn-gold px-6 py-3 rounded text-sm">
              Book Your Bradenton Trip
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy text-white text-center">
        <div className="container max-w-2xl">
          <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            Ready to Fish Bradenton?
          </h2>
          <p className="text-white/60 mb-8">Book your private Bradenton fishing charter today. Captain Jon will put you on the fish.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://fishingbooker.com/embeds/book/2114018" onClick={fireBookingConversion} target="_blank" rel="noopener noreferrer" className="btn-gold px-10 py-4 rounded text-base">
              Book Now
            </a>
            <a href="tel:+19417025895" onClick={fireCallConversion} className="btn-outline-gold px-10 py-4 rounded text-base flex items-center gap-2">
              <Phone className="w-4 h-4" /> Call (941) 702-5895
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
