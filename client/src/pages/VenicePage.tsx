import { fireBookingConversion, fireCallConversion} from "@/lib/gtag";
import { Link } from "wouter";
import { Shield, Fish, Anchor, Users, Star, Phone, ArrowRight, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { LOCAL_BUSINESS_SCHEMA } from "@/components/SEOHead";

const PHOTOS = {
  hero: "/manus-storage/IMG_2267_006b4b01.webp",
  fish1: "/manus-storage/IMG_2061_f2c08380.webp",
  fish2: "/manus-storage/IMG_4281_330f7c42.webp",
  boat: "/manus-storage/IMG_2307_3c222ea8.jpeg",
};

const VENICE_SCHEMA = {
  ...LOCAL_BUSINESS_SCHEMA,
  name: "Reel Smart Charters — Venice Fishing Charters",
  description:
    "Fishing charters in Venice, FL. Inshore and nearshore trips targeting snook, redfish, tarpon, and more. USCG licensed Captain Jon. All gear included.",
  url: "https://reelsmartcharters.com/fishing-charters-venice-fl",
};

export default function VenicePage() {
  return (
    <>
      <SEOHead
        title="Fishing Charters Venice FL — Inshore & Nearshore | Reel Smart Charters"
        description="Top-rated fishing charters in Venice, FL. Target snook, redfish, tarpon, and more on private inshore and nearshore trips with USCG licensed Captain Jon. All gear, bait & license included."
        canonical="/fishing-charters-venice-fl"
        jsonLd={VENICE_SCHEMA}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <img src={PHOTOS.hero} alt="Fishing charters Venice FL" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl">
            <p className="section-label mb-4">Venice · Sarasota · Southwest Florida</p>
            <h1 className="text-white leading-tight mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800 }}>
              Fishing Charters Venice, FL
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-xl">
              World-class inshore and nearshore fishing just off the Venice coast. Target snook, redfish, tarpon, grouper, and more with USCG licensed Captain Jon aboard a fully equipped private charter.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://fishingbooker.com/embeds/book/2114018" onClick={fireBookingConversion} target="_blank" rel="noopener noreferrer" className="btn-gold px-8 py-4 rounded text-base">
                Book a Venice Charter
              </a>
              <a href="tel:+19417025895" onClick={fireCallConversion} className="btn-outline-gold px-8 py-4 rounded text-base flex items-center gap-2">
                <Phone className="w-4 h-4" /> (941) 702-5895
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Venice */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="section-label mb-3">Why Venice?</p>
            <h2 className="text-navy text-3xl md:text-4xl mb-5" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              Venice Is One of Florida's Best Fishing Destinations
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Venice sits at the southern tip of Sarasota County where the Gulf of Mexico meets a network of bays, passes, and backwater flats. The waters around Venice Inlet, Roberts Bay, and the Intracoastal Waterway are loaded with fish year-round — making it a prime destination for both inshore and nearshore anglers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Fish,
                title: "Diverse Species",
                desc: "Snook, redfish, tarpon, Spanish mackerel, grouper, snapper, cobia, and more — Venice waters hold an incredible variety of gamefish.",
              },
              {
                icon: Anchor,
                title: "Inshore & Nearshore",
                desc: "From the shallow mangrove flats of Roberts Bay to the nearshore reefs just off Venice Inlet, we fish it all depending on conditions and your goals.",
              },
              {
                icon: Shield,
                title: "USCG Licensed Captain",
                desc: "Captain Jon is fully licensed by the US Coast Guard and knows the Venice waters inside and out — maximizing your time on the fish.",
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
                Venice Fishing Species Guide
              </h2>
              <div className="space-y-4">
                {[
                  { name: "Snook", season: "Year-round", desc: "The premier inshore target — aggressive, powerful, and delicious. Venice's mangrove shorelines are loaded with snook." },
                  { name: "Redfish", season: "Year-round", desc: "Copper-colored bruisers that tail on the flats and crush live bait. A favorite for sight fishing in Venice's shallow bays." },
                  { name: "Tarpon", season: "Spring–Fall", desc: "The Silver King runs through Venice Inlet every spring. Hooking a 100+ lb tarpon is a bucket-list experience." },
                  { name: "Grouper & Snapper", season: "Year-round", desc: "Head nearshore to the reefs and ledges for gag grouper, red grouper, mangrove snapper, and lane snapper." },
                  { name: "Spanish Mackerel", season: "Spring–Fall", desc: "Fast, flashy, and great on light tackle. Schools of Spanish mackerel are common just off the Venice beaches." },
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
              <img src={PHOTOS.fish1} alt="Snook caught on Venice fishing charter" className="rounded-xl object-cover w-full h-48 shadow-md" />
              <img src={PHOTOS.fish2} alt="Redfish caught near Venice FL" className="rounded-xl object-cover w-full h-48 shadow-md mt-8" />
              <img src={PHOTOS.boat} alt="Reel Smart Charters boat Venice FL" className="rounded-xl object-cover w-full h-48 shadow-md col-span-2" />
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
              Venice Fishing Charter Packages
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">All charters depart from Sarasota (1059 N Tamiami Trl) and cover the Venice area waters. Base price is for up to 4 people — 5th &amp; 6th person add $50 each. 100% private.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { duration: "4-Hour", price: "$500", group: "Up to 4 people", desc: "Perfect intro trip. Inshore flats and backwater fishing targeting snook, redfish, and trout." },
              { duration: "6-Hour", price: "$700", group: "Up to 4 people", desc: "Our most popular trip. More water covered, more species targeted — inshore and nearshore.", popular: true },
              { duration: "8-Hour", price: "$900", group: "Up to 4 people", desc: "Full-day adventure. Nearshore reefs, offshore structure, and everything in between." },
            ].map(({ duration, price, group, desc, popular }) => (
              <div key={duration} className={`rounded-xl p-6 border ${popular ? "border-gold bg-white/10" : "border-white/10 bg-white/5"}`}>
                {popular && <div className="text-gold text-xs font-heading tracking-widest uppercase mb-3">Most Popular</div>}
                <div className="text-3xl font-bold mb-0.5">{price}</div>
                <div className="text-white/40 text-xs mb-2">base price · 5th &amp; 6th person +$50 each</div>
                <div className="text-gold font-heading text-sm mb-3">{duration} Charter · {group} · up to 6 total</div>
                <p className="text-white/60 text-sm mb-5">{desc}</p>
                <a href="https://fishingbooker.com/embeds/book/2114018" onClick={fireBookingConversion} target="_blank" rel="noopener noreferrer" className="btn-gold w-full text-center py-2.5 rounded text-sm block">
                  Book This Trip
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-white/40 text-sm mt-6">All gear, bait, tackle &amp; fishing license included. Base price for up to 4 people — 5th &amp; 6th person add $50 each.</p>
        </div>
      </section>

      {/* Testimonials snippet */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <p className="section-label mb-3">What Anglers Say</p>
            <h2 className="text-navy text-2xl md:text-3xl" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              Venice Charter Reviews
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Mike T.", text: "Captain Jon put us on redfish and snook all morning near Venice. Best fishing trip I've ever had in Florida. Will be back!", rating: 5 },
              { name: "Sarah L.", text: "Incredible experience near Venice Inlet. Caught our limit of Spanish mackerel and even spotted some tarpon. Highly recommend!", rating: 5 },
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
          <p className="text-gray-500 text-sm mb-6">Conveniently located between Sarasota and Venice — easy access to all Southwest Florida fishing grounds.</p>
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
              Book Your Venice Trip
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy text-white text-center">
        <div className="container max-w-2xl">
          <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            Ready to Fish Venice?
          </h2>
          <p className="text-white/60 mb-8">Book your private Venice fishing charter today. Captain Jon will put you on the fish.</p>
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
