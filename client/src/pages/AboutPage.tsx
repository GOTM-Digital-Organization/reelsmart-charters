import { fireBookingConversion } from "@/lib/gtag";
import { Link } from "wouter";
import { Shield, Fish, Anchor, Users, ArrowRight, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { LOCAL_BUSINESS_SCHEMA } from "@/components/SEOHead";

const PHOTOS = {
  boat1: "/manus-storage/IMG_2307_3c222ea8.jpeg",
  boat2: "/manus-storage/IMG_2743_921fdb55.webp",
  fighting: "/manus-storage/IMG_1911_dc01a577.webp",
  redfish: "/manus-storage/IMG_4281_330f7c42.webp",
  crew: "/manus-storage/IMG_3729_533ea3f4.webp",
  snook: "/manus-storage/IMG_2061_f2c08380.webp",
};

const ABOUT_SCHEMA = {
  ...LOCAL_BUSINESS_SCHEMA,
  "@type": ["LocalBusiness", "TouristAttraction"],
  description:
    "Meet Captain Jon of Reel Smart Charters — USCG licensed fishing guide with years of experience on the inshore and nearshore waters of Sarasota, Bradenton, and Venice, Florida.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="About Captain Jon — Reel Smart Charters Sarasota FL"
        description="Meet Captain Jon, your USCG licensed fishing guide for Reel Smart Charters. Years of experience on the inshore and nearshore waters of Sarasota, Bradenton, and Venice, Florida."
        canonical="/about"
        jsonLd={ABOUT_SCHEMA}
      />
      <Navbar />

      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <img src={PHOTOS.boat2} alt="Reel Smart Charters vessel on the water" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy/90" />
        <div className="container relative z-10 text-center">
          <p className="section-label mb-4">Your Captain</p>
          <h1 className="text-white text-4xl md:text-6xl mb-4 leading-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
            About Reel Smart Charters
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Local knowledge, USCG credentials, and a genuine passion for putting you on fish.
          </p>
        </div>
      </section>

      {/* Captain Bio */}
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

            <div className="mt-8 md:mt-0">
              <p className="section-label mb-3">Meet Your Captain</p>
              <h2 className="text-navy text-3xl md:text-4xl mb-6 leading-tight">
                Captain Jon knows where the fish live.
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Dawn patrols, tide flips, and a deep love for these waters. From the grass flats of Sarasota Bay to the artificial reefs just off Venice, Captain Jon has built a charter around the local knowledge most anglers spend a lifetime trying to find.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Whether you're a first-timer who's never held a rod or a tournament angler hunting your next personal best, every trip is tailored to you. Light tackle, fly, plug, live-bait, artificial — pick your style. The mission is simple: bend rods, land fish, and have a great time doing it.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Every charter is 100% private — no strangers, no crowds. Just your group, the water, and whatever the tide brings in.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Vessel", value: "Mako Marine 24ft" },
                  { label: "Engine", value: "Suzuki 300hp" },
                  { label: "Waters", value: "Sarasota Bay & Gulf" },
                  { label: "License", value: "USCG Certified" },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                    <div className="text-gold font-heading text-xs tracking-widest uppercase mb-1">{item.label}</div>
                    <div className="text-navy font-semibold text-sm">{item.value}</div>
                  </div>
                ))}
              </div>

              <a
                href="https://fishingbooker.com/embeds/book/2114018"
                onClick={fireBookingConversion}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-8 py-3 rounded text-sm inline-flex items-center gap-2"
              >
                Book a Trip with Captain Jon <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 md:py-24 bg-navy">
        <div className="container">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Everything Included</p>
            <h2 className="text-white text-3xl md:text-4xl mb-4">All-in pricing. No surprises.</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Every charter includes everything you need for a great day on the water. Just show up ready to fish.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: "USCG Licensed Captain", desc: "Fully licensed and insured for your safety and peace of mind." },
              { icon: Fish, title: "All Tackle & Bait", desc: "Rods, reels, terminal tackle, and live or cut bait — all provided." },
              { icon: Anchor, title: "Fishing License", desc: "Your Florida saltwater fishing license is included in the charter price." },
              { icon: Users, title: "Private Charter", desc: "Your group only — no strangers, no shared boats, no compromises." },
              { icon: CheckCircle, title: "Ice & Water", desc: "Cooler with ice and bottled water provided for the duration of your trip." },
              { icon: CheckCircle, title: "Fish Cleaning", desc: "Captain Jon will clean and bag your catch at the end of the trip." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-navy-mid rounded-xl p-6 border border-white/10 hover:border-gold/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-white font-heading font-semibold mb-2">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fishing Areas */}
      <section className="py-20 md:py-24 bg-off-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-3">Fishing Areas</p>
              <h2 className="text-navy text-3xl md:text-4xl mb-6 leading-tight">
                Southwest Florida's best inshore & nearshore waters.
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Reel Smart Charters operates across the full range of Southwest Florida's most productive fishing grounds — from the shallow grass flats and mangrove shorelines of Sarasota Bay to the nearshore reefs and wrecks of the Gulf of Mexico.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Sarasota Bay grass flats & mangroves",
                  "Little Sarasota Bay & Roberts Bay",
                  "Lemon Bay & Englewood waters",
                  "Nearshore Gulf reefs & wrecks (Venice to Sarasota)",
                  "Inshore backwater creeks & passes",
                ].map((area) => (
                  <div key={area} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{area}</span>
                  </div>
                ))}
              </div>
              <Link href="/charters" className="btn-gold px-8 py-3 rounded text-sm inline-flex items-center gap-2">
                See Charter Options <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src={PHOTOS.crew} alt="Fishing crew on Reel Smart Charters" className="rounded-lg object-cover w-full h-48 md:h-64 shadow-lg" />
              <img src={PHOTOS.snook} alt="Snook caught inshore Florida" className="rounded-lg object-cover w-full h-48 md:h-64 shadow-lg mt-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Target Species */}
      <section className="py-20 md:py-24 bg-navy-mid">
        <div className="container">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Target Species</p>
            <h2 className="text-white text-3xl md:text-4xl mb-4">What's biting in Southwest Florida?</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              These waters are home to some of Florida's most sought-after inshore and nearshore species year-round.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              "Snook", "Redfish", "Trout", "Tarpon",
              "Snapper", "Grouper", "Hogfish", "Triggerfish",
              "Flounder", "Cobia", "Shark", "Pompano",
            ].map((species) => (
              <div key={species} className="bg-navy rounded-lg px-4 py-3 border border-white/10 text-center hover:border-gold/40 transition-colors">
                <span className="text-white/80 text-sm font-heading tracking-wide">{species}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-off-white">
        <div className="container text-center">
          <h2 className="text-navy text-3xl md:text-4xl mb-4">Ready to fish with Captain Jon?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            All charters are 100% private. Book instantly through FishingBooker — secure, verified, and confirmed in minutes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://fishingbooker.com/embeds/book/2114018"
              onClick={fireBookingConversion}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-10 py-4 rounded text-base"
            >Book Your Charter</a>
            <Link href="/charters" className="btn-outline-navy px-10 py-4 rounded text-base">View Pricing</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
