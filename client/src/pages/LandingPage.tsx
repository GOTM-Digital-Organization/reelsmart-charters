import { useState } from "react";
import { fireCallConversion, fireBookingConversion } from "@/lib/gtag";
import { Phone, Star, Shield, Fish, Clock, Users, CheckCircle, ChevronDown, Award } from "lucide-react";

const PHOTOS = {
  hero: "/manus-storage/IMG_8048_c31d63c6.jpeg",
  boat: "/manus-storage/IMG_2307_3c222ea8.jpeg",
  fighting: "/manus-storage/IMG_1911_dc01a577.webp",
  snapper: "/manus-storage/IMG_2510_df2d5dc8.webp",
  snook: "/manus-storage/IMG_2061_f2c08380.webp",
  redfish: "/manus-storage/IMG_4281_330f7c42.webp",
  hogfish: "/manus-storage/IMG_2671_3e01b874.webp",
  crew: "/manus-storage/IMG_3729_533ea3f4.webp",
  grouper: "/manus-storage/IMG_2267_006b4b01.webp",
  trout: "/manus-storage/IMG_2101_de18cff3.webp",
};

const PACKAGES = [
  {
    name: "Half-Day Bay",
    price: "$650",
    duration: "4 Hours",
    isInshore: true,
    badge: "MOST POPULAR",
    badgeColor: "bg-[#C9A84C] text-[#0A1628]",
    description: "Mangroves, grass flats, and docks. Snook, redfish, trout, and snapper inside Sarasota Bay. Great for families and first-timers.",
    targets: ["Snook", "Redfish", "Trout", "Flounder"],
  },
  {
    name: "Half-Day Gulf",
    price: "$750",
    duration: "4 Hours",
    isInshore: false,
    badge: "CATCH DINNER",
    badgeColor: "bg-[#1B6CA8] text-white",
    description: "Run straight out to the nearshore reefs and ledges. Snapper, grouper, sheepshead, hogfish, and other pelagic species.",
    targets: ["Snapper", "Grouper", "Sheepshead", "Hogfish"],
  },
  {
    name: "Bucket List Trip",
    price: "$975",
    duration: "6 Hours",
    isInshore: false,
    badge: "BUCKET LIST",
    badgeColor: "bg-[#8B1A1A] text-white",
    description: "Six hours dialed in on one trophy species — pick from tarpon, shark, or goliath grouper. Unforgettable.",
    targets: ["Tarpon", "Shark", "Goliath Grouper", "Permit"],
  },
  {
    name: "Full-Day Combo",
    price: "$1,400",
    duration: "8 Hours",
    isInshore: false,
    badge: "BEST VALUE",
    badgeColor: "bg-[#2E7D32] text-white",
    description: "The whole story. Sunrise in the bay for snook and redfish, then out to the reefs for snapper and grouper.",
    targets: ["Snook", "Redfish", "Snapper", "Grouper"],
  },
];

const REVIEWS = [
  {
    name: "Mark T.",
    stars: 5,
    trip: "Half-Day Bay",
    text: "Captain Jon got my two boys on snook before the sun was even up. Patient with the kids, sharp on the water, and we came home with dinner. Booking again next summer.",
  },
  {
    name: "Sarah K.",
    stars: 5,
    trip: "Full-Day Combo",
    text: "Best charter we've ever booked. Cap Jon knows every honey hole in Sarasota Bay. Caught reds, trout, snook, and a bonus shark. Tight lines all day.",
  },
  {
    name: "Ryan D.",
    stars: 5,
    trip: "Full-Day Combo",
    text: "Took my dad out for his 70th birthday — Captain Jon made it a day he'll never stop talking about. Big sheepshead, a slot redfish, and stories the whole way back.",
  },
  {
    name: "James M.",
    stars: 5,
    trip: "Tarpon Trip",
    text: "Jumped 4 tarpon and landed 2. Captain Jon knew exactly where they were running. If you want tarpon in Sarasota, this is the only call you need to make.",
  },
  {
    name: "Lisa R.",
    stars: 5,
    trip: "Half-Day Inshore",
    text: "Our whole family had an amazing time. Captain Jon was great with our kids, super knowledgeable, and we caught fish the whole trip. Highly recommend!",
  },
  {
    name: "Tom B.",
    stars: 5,
    trip: "Nearshore Trip",
    text: "Limit of mangrove snapper and a nice gag grouper. Captain Jon put us right on the fish from the first drop. Already booked our fall trip.",
  },
];

const SPECIES = [
  { name: "Snook", season: "Year-round · Peak summer", img: PHOTOS.snook, desc: "Florida's most prized inshore gamefish. Sarasota Bay mangroves and dock lights." },
  { name: "Redfish", season: "Year-round · Schools all summer", img: PHOTOS.redfish, desc: "Schooling on the grass flats. Schools of 20–50 fish are common in summer." },
  { name: "Tarpon", season: "May–September · Peak June–July", img: PHOTOS.fighting, desc: "80–150 lb Silver Kings migrating through Sarasota passes. Bucket-list fishing." },
  { name: "Snapper & Grouper", season: "Year-round nearshore", img: PHOTOS.snapper, desc: "Mangrove snapper, gag grouper, and hogfish on nearshore reefs 20–40 ft deep." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What's included in every charter?",
      a: "All trips include Florida fishing license, live bait & tackle, ice & bottled water, and fish cleaning. You just bring food, sunscreen, and a cooler for your catch.",
    },
    {
      q: "How far in advance should I book?",
      a: "Summer dates (June–August) fill 2–3 weeks out. We recommend booking as soon as you know your dates. Last-minute openings do happen — call us directly.",
    },
    {
      q: "Is this good for kids and beginners?",
      a: "Absolutely. Captain Jon specializes in making every angler — from first-timers to experienced fishermen — have the best day possible. Kids love it.",
    },
    {
      q: "Where do we depart from?",
      a: "We depart from 1059 N Tamiami Trl, Sarasota, FL 34236. Exact meeting instructions are sent after booking confirmation.",
    },
    {
      q: "Do you fish Bradenton and Venice too?",
      a: "Yes — Captain Jon fishes the full Southwest Florida coast including Sarasota Bay, Bradenton's Terra Ceia Bay, and Venice Inlet. We'll go where the fish are.",
    },
    {
      q: "What if the weather is bad?",
      a: "Safety is always first. If conditions are unsafe, we'll reschedule at no charge. Captain Jon monitors forecasts closely and will contact you the evening before.",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── Sticky Top Bar ── */}
      <div className="sticky top-0 z-50 bg-[#0A1628] text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/manus-storage/reel-smart-logo-transparent_724165ca.png"
              alt="Reel Smart Charters"
              className="h-10 w-auto object-contain rounded"
              style={{ backgroundColor: "#fff", padding: "4px" }}
            />
            <div className="hidden sm:block">
              <div className="text-xs text-white/60 leading-none">Sarasota · Bradenton · Venice</div>
              <div className="text-sm font-semibold leading-tight">Reel Smart Charters</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1 text-[#C9A84C]">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              <span className="text-white text-sm ml-1">5.0 · 100+ Reviews</span>
            </div>
            <a
              href="tel:+19417025895"
              onClick={fireCallConversion}
              className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8933d] text-[#0A1628] font-bold px-4 py-2 rounded-lg transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">(941) 702-5895</span>
              <span className="sm:hidden">Call Now</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Hero Section ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${PHOTOS.hero})` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,22,40,0.60) 40%, rgba(10,22,40,0.20) 100%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left: Headline + Trust */}
          <div>
            {/* Urgency badge */}
            <div className="inline-flex items-center gap-2 bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#C9A84C] rounded-full animate-pulse" />
              🌞 Summer Dates Filling Fast — Tarpon Season Is Here
            </div>

            <h1 className="text-white font-bold leading-tight mb-3" style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
              Sarasota Fishing Charters
            </h1>
            <h2 className="text-[#C9A84C] font-medium mb-5" style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontStyle: "italic" }}>
              Siesta Key · Bradenton · Venice · Inshore & Nearshore
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
              Captain Jon puts you on snook, redfish, tarpon, and trophy nearshore fish. 25+ years on these waters. USCG licensed. All gear, bait & license included.
            </p>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: <Star className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />, label: "5.0 Star Rating", sub: "100+ verified reviews" },
                { icon: <Shield className="w-4 h-4 text-[#C9A84C]" />, label: "USCG Licensed", sub: "Fully insured captain" },
                { icon: <CheckCircle className="w-4 h-4 text-[#C9A84C]" />, label: "All-Inclusive", sub: "Gear · Bait · License" },
                { icon: <Users className="w-4 h-4 text-[#C9A84C]" />, label: "100% Private", sub: "No shared charters" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                  {b.icon}
                  <div>
                    <div className="text-white font-semibold text-sm leading-none">{b.label}</div>
                    <div className="text-white/60 text-xs mt-0.5">{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+19417025895"
                onClick={fireCallConversion}
                className="flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8933d] text-[#0A1628] font-bold px-8 py-4 rounded-xl transition-all text-lg shadow-lg hover:shadow-xl active:scale-95"
              >
                <Phone className="w-5 h-5" />
                Call (941) 702-5895
              </a>
              <a
                href="https://fishingbooker.com/embeds/book/2114018"
                target="_blank"
                rel="noopener noreferrer"
                onClick={fireBookingConversion}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all text-lg border border-white/30 backdrop-blur-sm"
              >
                Book Online Now
              </a>
            </div>

            <p className="text-white/50 text-sm mt-4">
              ✓ Secure booking via FishingBooker · Verified charter · Instant confirmation
            </p>
          </div>

          {/* Right: FishingBooker Booking Widget */}
          <div id="book" className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-[#0A1628] px-6 py-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />)}
                <span className="text-white text-sm font-semibold ml-1">5.0 · 100+ Reviews on FishingBooker</span>
              </div>
              <p className="text-white/60 text-xs">Verified charter · Secure booking · Instant confirmation</p>
            </div>
            <div className="p-4">
              <iframe
                src="https://fishingbooker.com/embeds/book/2114018"
                width="100%"
                height="900"
                frameBorder="0"
                scrolling="yes"
                title="Book a Fishing Charter with Reel Smart Charters"
                style={{ borderRadius: "8px", minHeight: "900px", display: "block" }}
              />
            </div>
            <div className="px-6 pb-4 text-center">
              <p className="text-gray-400 text-xs">
                Prefer to call? <a href="tel:+19417025895" onClick={fireCallConversion} className="text-[#0A1628] font-semibold hover:underline">(941) 702-5895</a>
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-[#0A1628] py-5 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: "5 ★", label: "Average Rating" },
            { val: "USCG", label: "Licensed Captain" },
            { val: "100%", label: "Private Charters" },
            { val: "All-In", label: "Bait · Tackle · License" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-[#C9A84C] font-bold text-xl">{s.val}</div>
              <div className="text-white/60 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Charter Packages ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] font-semibold text-sm tracking-widest uppercase mb-2">Choose Your Adventure</p>
            <h2 className="text-[#0A1628] font-bold text-3xl md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
              Sarasota Fishing Charter Packages
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Inshore charters: base price for up to 4 people (5th &amp; 6th person +$50 each). All other charters: listed price for up to 6 people. All gear, bait &amp; Florida fishing license included.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PACKAGES.map((pkg, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 flex flex-col">
                <div className="p-5 flex-1">
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${pkg.badgeColor}`}>
                    {pkg.badge}
                  </span>
                  <h3 className="text-[#0A1628] font-bold text-lg mb-1" style={{ fontFamily: "Georgia, serif" }}>{pkg.name}</h3>
                  <div className="text-3xl font-bold text-[#C9A84C]">{pkg.price}</div>
                  {pkg.isInshore ? (
                    <div className="text-gray-400 text-xs mb-2">base price · up to 4 people · 5th &amp; 6th +$50 each</div>
                  ) : (
                    <div className="text-gray-400 text-xs mb-2">up to 6 people</div>
                  )}
                  <div className="flex items-center gap-3 text-gray-500 text-sm mb-3">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{pkg.duration}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{pkg.isInshore ? "Up to 6" : "Up to 6"}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{pkg.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {pkg.targets.map((t, j) => (
                      <span key={j} className="bg-[#0A1628]/8 text-[#0A1628] text-xs px-2 py-0.5 rounded-full font-medium">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <a
                    href="https://fishingbooker.com/embeds/book/2114018"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={fireBookingConversion}
                    className="block text-center bg-[#0A1628] hover:bg-[#1B2F4A] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                  >
                    Book This Trip
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            ✓ All trips include: Florida fishing license · live bait & tackle · ice & bottled water · fish cleaning
          </p>
        </div>
      </section>

      {/* ── What's Biting ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] font-semibold text-sm tracking-widest uppercase mb-2">Target Species</p>
            <h2 className="text-[#0A1628] font-bold text-3xl md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
              What's Biting in Sarasota Right Now
            </h2>
            <p className="text-gray-500 mt-3">Inshore & nearshore fishing from Sarasota Bay to Venice Inlet</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECIES.map((s, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={s.img}
                    alt={`${s.name} fishing Sarasota`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <div className="text-white font-bold text-lg" style={{ fontFamily: "Georgia, serif" }}>{s.name}</div>
                    <div className="text-[#C9A84C] text-xs">{s.season}</div>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Captain Bio ── */}
      <section className="py-16 bg-[#0A1628]">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src={PHOTOS.crew}
              alt="Captain Jon - Sarasota Fishing Charter Captain"
              className="rounded-2xl w-full object-cover shadow-2xl"
              style={{ maxHeight: "480px" }}
            />
            <div className="absolute -bottom-4 -right-4 bg-[#C9A84C] text-[#0A1628] rounded-2xl px-5 py-3 shadow-xl">
              <div className="font-bold text-lg">25+ Years</div>
              <div className="text-sm font-medium">on Sarasota Waters</div>
            </div>
          </div>
          <div>
            <p className="text-[#C9A84C] font-semibold text-sm tracking-widest uppercase mb-3">Your Captain</p>
            <h2 className="text-white font-bold text-3xl md:text-4xl mb-5" style={{ fontFamily: "Georgia, serif" }}>
              You're Going Fishing<br />With a Friend
            </h2>
            <p className="text-white/75 leading-relaxed mb-5">
              Captain Jon has spent 25+ years learning every flat, reef, and honey hole between Siesta Key and Venice. He didn't build his charter around tourist trips — he built it around <em>your</em> day.
            </p>
            <p className="text-white/75 leading-relaxed mb-6">
              First time on a fishing charter? He'll have you bending a rod in the first hour. Experienced angler chasing a personal best? He'll put you on the structure that's actually holding fish this week.
            </p>
            <div className="space-y-3">
              {[
                "USCG Licensed & Fully Insured",
                "25+ Years on Sarasota Bay Waters",
                "Conservation-First Approach",
                "Custom Trip Planning Before Every Charter",
                "Serves Sarasota, Bradenton, Venice & Siesta Key",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#C9A84C] flex-shrink-0" />
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a
                href="tel:+19417025895"
                onClick={fireCallConversion}
                className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8933d] text-[#0A1628] font-bold px-7 py-4 rounded-xl transition-all text-base"
              >
                <Phone className="w-5 h-5" />
                Call Captain Jon: (941) 702-5895
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Photo Strip ── */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[PHOTOS.grouper, PHOTOS.trout, PHOTOS.boat, PHOTOS.hogfish].map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition-shadow">
                <img src={src} alt={`Sarasota fishing charter catch ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a href="/gallery" className="text-[#1B6CA8] font-semibold hover:underline text-sm">
              View Full Photo Gallery →
            </a>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] font-semibold text-sm tracking-widest uppercase mb-2">What Anglers Say</p>
            <h2 className="text-[#0A1628] font-bold text-3xl md:text-4xl" style={{ fontFamily: "Georgia, serif" }}>
              Real Reviews from Real Fishermen
            </h2>
            <div className="flex items-center justify-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#C9A84C] text-[#C9A84C]" />)}
              <span className="text-gray-600 ml-2 font-semibold">5.0 average · 100+ reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(r.stars)].map((_, j) => <Star key={j} className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">"{r.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#0A1628] text-sm">{r.name}</span>
                  <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">{r.trip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] font-semibold text-sm tracking-widest uppercase mb-2">Common Questions</p>
            <h2 className="text-[#0A1628] font-bold text-3xl" style={{ fontFamily: "Georgia, serif" }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-[#0A1628] text-sm pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#C9A84C] flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 bg-[#0A1628]" id="book-bottom">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Award className="w-12 h-12 text-[#C9A84C] mx-auto mb-4" />
          <h2 className="text-white font-bold text-3xl md:text-4xl mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Ready to Book Your Sarasota Fishing Charter?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Summer dates are limited. Tarpon season, snook on the flats, and nearshore reefs are all firing right now. Don't wait.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+19417025895"
              onClick={fireCallConversion}
              className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8933d] text-[#0A1628] font-bold px-8 py-4 rounded-xl transition-all text-lg shadow-lg"
            >
              <Phone className="w-5 h-5" />
              Call (941) 702-5895
            </a>
            <a
              href="https://fishingbooker.com/embeds/book/2114018"
              target="_blank"
              rel="noopener noreferrer"
              onClick={fireBookingConversion}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all text-lg border border-white/30"
            >
              Book Online via FishingBooker
            </a>
          </div>
          <p className="text-white/40 text-sm mt-6">
            Serving Sarasota · Siesta Key · Bradenton · Venice · Longboat Key · Southwest Florida
          </p>
        </div>
      </section>

      {/* ── Minimal Footer ── */}
      <footer className="bg-[#060E1A] py-6 text-center text-white/40 text-xs">
        <p>© {new Date().getFullYear()} Reel Smart Charters · Sarasota, FL · USCG Licensed · (941) 702-5895</p>
        <p className="mt-1">
          <a href="/privacy-policy" className="hover:text-white/70 transition-colors">Privacy Policy</a>
          {" · "}
          <a href="/" className="hover:text-white/70 transition-colors">Main Site</a>
        </p>
      </footer>
    </div>
  );
}
