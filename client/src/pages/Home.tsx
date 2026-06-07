import { fireBookingConversion } from "@/lib/gtag";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Star, Shield, Fish, Anchor, Users, ChevronDown, ChevronLeft, ChevronRight, ArrowRight, MapPin, Phone, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { LOCAL_BUSINESS_SCHEMA } from "@/components/SEOHead";

const PHOTOS = {
  shark: "/manus-storage/IMG_8048_c31d63c6.jpeg",
  boat1: "/manus-storage/IMG_2307_3c222ea8.jpeg",
  boat2: "/manus-storage/IMG_2743_921fdb55.webp",
  fighting: "/manus-storage/IMG_1911_dc01a577.webp",
  snapper: "/manus-storage/IMG_2510_df2d5dc8.webp",
  grouper: "/manus-storage/IMG_2267_006b4b01.webp",
  snook: "/manus-storage/IMG_2061_f2c08380.webp",
  trout1: "/manus-storage/IMG_2101_de18cff3.webp",
  trout2: "/manus-storage/IMG_1284_cba6302c.webp",
  trigger: "/manus-storage/IMG_3020_55518751.webp",
  hogfish: "/manus-storage/IMG_2671_3e01b874.webp",
  redfish: "/manus-storage/IMG_4281_330f7c42.webp",
  crew: "/manus-storage/IMG_3729_533ea3f4.webp",
};

const HERO_SLIDES = [
  { src: PHOTOS.boat1, alt: "Reel Smart Charters fishing boat on the water" },
  { src: PHOTOS.fighting, alt: "Angler fighting a big fish on a Reel Smart Charter" },
  { src: PHOTOS.boat2, alt: "Reel Smart Charters vessel heading out to sea" },
];

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === slide ? 1 : 0 }}
        >
          <img src={s.src} alt={s.alt} className="w-full h-full object-cover object-center" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === slide ? "bg-gold w-6" : "bg-white/40 w-2"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="container relative z-10 pt-20">
        <div className="max-w-2xl">
          <p className="section-label mb-4">Sarasota · Bradenton · Venice</p>
          <h1 className="text-white leading-tight mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5.5vw, 3.75rem)", fontWeight: 800 }}>
            Sarasota Fishing Charters
          </h1>
          <h2 className="text-gold leading-tight mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 4vw, 2.75rem)", fontWeight: 700, fontStyle: "italic" }}>
            Tight Lines. Good Times.
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
            Premium inshore and nearshore fishing charters in the back bays, mangroves, and coastal waters of Southwest Florida. Captain Jon puts you on the fish — you bring the stories home.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://fishingbooker.com/embeds/book/2114018"
              onClick={fireBookingConversion}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-8 py-4 rounded text-base"
            >
              Book Your Trip
            </a>
            <Link href="/charters" className="btn-outline-gold px-8 py-4 rounded text-base">
              View Trips
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 mt-10">
            {[
              { icon: Shield, label: "USCG Licensed Captain" },
              { icon: Fish, label: "All Gear & Bait Included" },
              { icon: Anchor, label: "Inshore & Nearshore" },
              { icon: Users, label: "Family Friendly" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/70 text-sm">
                <Icon className="w-4 h-4 text-gold" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a href="#stats" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-gold transition-colors animate-bounce z-10" aria-label="Scroll down">
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
}

// ── Stats Bar ─────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: "5★", label: "Average Rating" },
    { value: "USCG", label: "Coast Guard Licensed" },
    { value: "100%", label: "Private Charters" },
    { value: "All-In", label: "Bait · Tackle · License" },
  ];
  return (
    <section id="stats" className="bg-navy-mid py-8 border-y border-gold/20">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-gold/20">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-4">
              <div className="text-gold font-heading text-2xl md:text-3xl font-bold tracking-wide">{s.value}</div>
              <div className="text-white/60 text-xs font-heading tracking-widest uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── About Preview ─────────────────────────────────────────────────────────────
function AboutPreview() {
  return (
    <section className="py-20 md:py-28 bg-off-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <img src={PHOTOS.boat1} alt="Reel Smart Charters vessel" className="rounded-lg object-cover w-full h-56 md:h-72 shadow-xl" />
              <img src={PHOTOS.redfish} alt="Happy angler with redfish" className="rounded-lg object-cover w-full h-56 md:h-72 shadow-xl mt-8" />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-navy text-white px-6 py-3 rounded-full shadow-xl border border-gold/30 whitespace-nowrap">
              <span className="text-gold font-heading font-bold text-sm tracking-wider">USCG LICENSED CAPTAIN</span>
            </div>
          </div>
          <div>
            <p className="section-label mb-3">Meet Your Captain</p>
            <h2 className="text-navy text-3xl md:text-4xl mb-6 leading-tight">
              Captain Jon knows where the fish live.
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Dawn patrols, tide flips, and a deep love for these waters. From the grass flats of Sarasota Bay to the artificial reefs just off Venice, Captain Jon has built a charter around the local knowledge most anglers spend a lifetime trying to find.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Whether you're a first-timer who's never held a rod or a tournament angler hunting your next personal best, every trip is tailored to you.
            </p>
            <Link href="/about" className="btn-gold px-8 py-3 rounded text-sm inline-flex items-center gap-2">
              Meet Captain Jon <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Featured Charters ─────────────────────────────────────────────────────────
function FeaturedCharters() {
  const { data: packages, isLoading } = trpc.charters.list.useQuery();
  const featured = packages?.slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-navy">
      <div className="container">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Trips & Rates</p>
          <h2 className="text-white text-3xl md:text-4xl mb-4">Pick the day you've been daydreaming about.</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Bay, Gulf, sunset, single angler, and more. Everything is included — license, bait, tackle, ice, water.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => <div key={i} className="bg-navy-mid rounded-xl h-64 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {featured?.map((pkg) => (
              <div key={pkg.id} className="bg-navy-mid rounded-xl overflow-hidden border border-white/10 hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 flex flex-col">
                {pkg.badge && (
                  <div className="bg-gold text-navy text-xs font-heading font-bold tracking-wider px-3 py-1.5 text-center uppercase">{pkg.badge}</div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-white font-heading text-lg font-semibold mb-3">{pkg.name}</h3>
                  <div className="flex gap-3 mb-4">
                    <span className="text-gold/80 text-xs font-heading tracking-wider bg-gold/10 px-2 py-1 rounded">{pkg.duration}</span>
                    <span className="text-white/50 text-xs font-heading tracking-wider bg-white/5 px-2 py-1 rounded">{pkg.type}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed flex-1 mb-4">{pkg.description}</p>
                  <div className="border-t border-white/10 pt-4 mt-auto">
                    <div className="flex items-end justify-between mb-1">
                      <div>
                        {pkg.maxPassengers === 4 && (
                          <div className="text-white/40 text-xs">Base price (up to 4 people)</div>
                        )}
                        <div className="text-gold font-heading text-2xl font-bold">${pkg.price.toLocaleString()}</div>
                      </div>
                      <div className="text-white/40 text-xs text-right">
                        {pkg.maxPassengers === 1 ? "1 passenger" : `up to ${pkg.maxPassengers}`}
                      </div>
                    </div>
                    {pkg.maxPassengers === 4 && (
                      <div className="text-white/40 text-xs">5th &amp; 6th person +$50 each</div>
                    )}
                    <a
                      href="https://fishingbooker.com/embeds/book/2114018"
                      onClick={fireBookingConversion}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold w-full py-2.5 rounded text-sm block text-center mt-3"
                    >
                      Book This Trip
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/charters" className="btn-outline-gold px-8 py-3 rounded text-sm inline-flex items-center gap-2">
            View All Charters & Pricing <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Gallery Preview ───────────────────────────────────────────────────────────
function GalleryPreview() {
  const previewPhotos = [
    { src: PHOTOS.shark, alt: "Big shark catch on Reel Smart Charters" },
    { src: PHOTOS.snapper, alt: "Snapper catch Southwest Florida" },
    { src: PHOTOS.hogfish, alt: "Hogfish caught nearshore Florida" },
    { src: PHOTOS.trigger, alt: "Triggerfish on a Reel Smart Charter" },
    { src: PHOTOS.grouper, alt: "Grouper fishing Sarasota" },
    { src: PHOTOS.crew, alt: "Happy fishing crew on charter boat" },
  ];

  return (
    <section className="py-20 md:py-28 bg-off-white">
      <div className="container">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Photo Gallery</p>
          <h2 className="text-navy text-3xl md:text-4xl mb-4">The catches speak for themselves.</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Real trips, real fish, real smiles from the waters of Southwest Florida.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {previewPhotos.map((p) => (
            <div key={p.src} className="overflow-hidden rounded-lg aspect-square group">
              <img src={p.src} alt={p.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/gallery" className="btn-gold px-8 py-3 rounded text-sm inline-flex items-center gap-2">
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials Preview ──────────────────────────────────────────────────────
function TestimonialsPreview() {
  const { data: reviews } = trpc.testimonials.list.useQuery();
  const featured = reviews?.slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-navy-mid">
      <div className="container">
        <div className="text-center mb-14">
          <p className="section-label mb-3">From Our Anglers</p>
          <h2 className="text-white text-3xl md:text-4xl mb-4">Five-star trips. Every time.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featured?.map((review) => (
            <div key={review.id} className="bg-navy rounded-xl p-6 border border-white/10 hover:border-gold/30 transition-all duration-300">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-white/80 leading-relaxed mb-5 italic">"{review.content}"</p>
              <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-heading font-bold text-sm">{review.author.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{review.author}</div>
                  {(review.tripType || review.location) && (
                    <div className="text-white/40 text-xs">{[review.tripType, review.location].filter(Boolean).join(" · ")}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/testimonials" className="btn-outline-gold px-8 py-3 rounded text-sm inline-flex items-center gap-2">
            Read All Reviews <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Service Area ─────────────────────────────────────────────────────────────
function ServiceArea() {
  const areas = [
    {
      city: "Sarasota",
      desc: "Our home port. We fish Sarasota Bay, the Intracoastal Waterway, Roberts Bay, and the nearshore Gulf reefs just off Siesta Key and Lido Key.",
      link: "/charters",
    },
    {
      city: "Bradenton",
      desc: "Minutes north of Sarasota, we access Tampa Bay, the Manatee River, and the legendary grass flats that hold some of the biggest redfish and snook in Southwest Florida.",
      link: "/fishing-charters-bradenton-fl",
    },
    {
      city: "Venice",
      desc: "South of Sarasota, we fish the Venice Inlet, the Myakka River backwaters, and the nearshore reefs and ledges that hold snapper, grouper, and cobia.",
      link: "/fishing-charters-venice-fl",
    },
  ];
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Service Area</p>
          <h2 className="text-navy text-3xl md:text-4xl mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            We Fish the Best of Southwest Florida
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Reel Smart Charters is a private fishing charter service based in Sarasota, FL, serving Sarasota, Bradenton, Venice, Siesta Key, Longboat Key, and surrounding Gulf Coast communities. All trips depart from 1059 N Tamiami Trl, Sarasota.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {areas.map(({ city, desc, link }) => (
            <div key={city} className="rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-gold" />
                <h3 className="text-navy font-heading text-lg font-semibold">{city}, FL</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
              <Link href={link} className="text-gold hover:text-navy transition-colors text-sm font-heading flex items-center gap-1">
                {city === "Sarasota" ? "View All Charters" : `${city} Charters`} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
const HOME_FAQS = [
  {
    q: "What is the best time of year to fish in Sarasota?",
    a: "Sarasota offers excellent fishing year-round. Spring (March–May) is prime for tarpon and cobia. Summer brings snook, redfish, and nearshore action. Fall is fantastic for trout and redfish on the flats. Winter is excellent for sheepshead, snapper, and grouper on nearshore structure.",
  },
  {
    q: "Are your charters good for kids and beginners?",
    a: "Absolutely. Captain Jon specializes in making fishing fun and accessible for all ages and skill levels. All gear, bait, and tackle are provided — no experience is needed. The Half-Day Bay charter is especially popular with families.",
  },
  {
    q: "What fish can we catch near Sarasota?",
    a: "Inshore targets include snook, redfish, spotted seatrout, and tarpon. Nearshore trips add snapper, grouper, hogfish, sheepshead, cobia, and mackerel. The specific species available depends on the season and water conditions.",
  },
  {
    q: "Is Captain Jon USCG licensed and insured?",
    a: "Yes. Captain Jon holds a current USCG Captain's License and carries full liability insurance. Your Florida fishing license is also included in the charter price — you don't need to purchase one separately.",
  },
  {
    q: "How much does a fishing charter in Sarasota cost?",
    a: "Prices start at $475 for a single-angler half-day trip and range up to $1,400 for a full-day offshore combo. Inshore half-day charters for groups start at $650 for up to 4 people. The 5th and 6th person on inshore trips add $50 each. All prices include gear, bait, tackle, ice, and water.",
  },
  {
    q: "How soon can I book a charter?",
    a: "You can check availability and book instantly through FishingBooker on our Book Trip page. For same-week trips or custom requests, call Captain Jon directly at (941) 702-5895.",
  },
];

function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 bg-off-white">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Common Questions</p>
          <h2 className="text-navy text-3xl md:text-4xl mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">Everything you need to know before booking your Sarasota fishing charter.</p>
        </div>
        <div className="space-y-3">
          {HOME_FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-navy font-heading font-semibold text-sm md:text-base">{faq.q}</span>
                {open === i ? <ChevronUp className="w-4 h-4 text-gold flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gold flex-shrink-0" />}
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/charters" className="text-gold hover:text-navy transition-colors font-heading text-sm flex items-center gap-2 justify-center">
            View All Charter Packages & Pricing <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── CTA Banner ────────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="relative py-24 overflow-hidden">
      <img src={PHOTOS.fighting} alt="Fishing action shot" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-navy/80" />
      <div className="container relative z-10 text-center">
        <p className="section-label mb-4">Ready to Go?</p>
        <h2 className="text-white text-3xl md:text-5xl mb-6 leading-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
          Your next great fishing story<br />starts here.
        </h2>
        <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
          All charters are 100% private. Your group, your pace, your adventure.
        </p>
        <a
          href="https://fishingbooker.com/embeds/book/2114018"
          onClick={fireBookingConversion}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold px-10 py-4 rounded text-base inline-block"
        >
          Book Your Charter Today
        </a>
        <p className="text-white/40 text-xs mt-4">Secure booking powered by FishingBooker · Verified charter · 5.0 ★ · 100+ reviews</p>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Sarasota Fishing Charters"
        description="Private inshore & nearshore fishing charters in Sarasota, Bradenton & Venice, FL. USCG licensed Captain Jon. All gear, bait & license included."
        keywords="Sarasota fishing charters, inshore fishing Sarasota, nearshore fishing charters, fishing charter Sarasota FL, Captain Jon fishing"
        canonical="/"
        jsonLd={[
          {
          ...LOCAL_BUSINESS_SCHEMA,
          "@type": ["LocalBusiness", "TouristAttraction"],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Fishing Charter Packages",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Half-Day Bay Inshore Charter", "description": "4-hour inshore fishing charter on Sarasota Bay targeting snook, redfish, and trout. Up to 4 people." } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Half-Day Gulf Nearshore Charter", "description": "4-hour nearshore fishing charter on the Gulf of Mexico targeting snapper, grouper, and cobia. Up to 6 people." } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full-Day Combo Charter", "description": "8-hour full-day fishing charter combining inshore and nearshore fishing. Up to 6 people." } },
            ],
          },
          "knowsAbout": ["Inshore Fishing", "Nearshore Fishing", "Snook Fishing", "Redfish Fishing", "Tarpon Fishing", "Sarasota Bay", "Gulf of Mexico"],
          "areaServed": [
            { "@type": "City", "name": "Sarasota", "sameAs": "https://en.wikipedia.org/wiki/Sarasota,_Florida" },
            { "@type": "City", "name": "Bradenton", "sameAs": "https://en.wikipedia.org/wiki/Bradenton,_Florida" },
            { "@type": "City", "name": "Venice", "sameAs": "https://en.wikipedia.org/wiki/Venice,_Florida" },
            { "@type": "Place", "name": "Siesta Key" },
            { "@type": "Place", "name": "Longboat Key" },
          ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Reel Smart Charters",
            "url": "https://www.reelsmartcharters.com",
            "description": "Private inshore and nearshore fishing charters in Sarasota, Bradenton, and Venice, Florida. USCG licensed Captain Jon Smart.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.reelsmartcharters.com/charters",
              "query-input": "required name=search_term_string",
            },
            "publisher": {
              "@type": "LocalBusiness",
              "name": "Reel Smart Charters",
              "url": "https://www.reelsmartcharters.com",
            },
          },
        ]}
      />
      <Navbar />
      <Hero />
      <StatsBar />
      <AboutPreview />
      <FeaturedCharters />
      <GalleryPreview />
      <TestimonialsPreview />
      <ServiceArea />
      <HomeFAQ />
      <CTABanner />
      <Footer />
    </div>
  );
}
