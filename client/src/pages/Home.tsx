import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Link } from "wouter";
import { Menu, X, Star, Phone, Mail, MapPin, Clock, ChevronDown, Anchor, Fish, Shield, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

// Photo URLs
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

const HERO_SLIDES = [PHOTOS.boat1, PHOTOS.fighting, PHOTOS.boat2];

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Charters", href: "#charters" },
    { label: "Gallery", href: "#gallery" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy shadow-lg shadow-black/30" : "bg-navy/80 backdrop-blur-md"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <button onClick={() => scrollTo("#hero")} className="flex items-center group">
          <img
            src="/manus-storage/reel-smart-logo-transparent_724165ca.png"
            alt="Reel Smart Charters"
            className="h-16 w-auto object-contain rounded-lg"
            style={{ backgroundColor: '#ffffff', padding: '4px 8px' }}
          />
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              className="text-white/80 hover:text-gold font-heading text-sm tracking-wider uppercase transition-colors duration-150"
            >
              {l.label}
            </button>
          ))}
          {user?.role === "admin" && (
            <Link href="/admin" className="text-gold/70 hover:text-gold font-heading text-sm tracking-wider uppercase transition-colors duration-150">
              Admin
            </Link>
          )}
          <button
            onClick={() => scrollTo("#contact")}
            className="btn-gold px-5 py-2 rounded text-sm ml-2"
          >
            Book Now
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy border-t border-white/10 px-6 pb-6 pt-2">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => scrollTo(l.href)}
              className="block w-full text-left py-3 text-white/80 hover:text-gold font-heading tracking-wider uppercase text-sm border-b border-white/10 transition-colors"
            >
              {l.label}
            </button>
          ))}
          {user?.role === "admin" && (
            <Link href="/admin" className="block py-3 text-gold/70 hover:text-gold font-heading tracking-wider uppercase text-sm border-b border-white/10">
              Admin
            </Link>
          )}
          <button
            onClick={() => scrollTo("#contact")}
            className="btn-gold w-full mt-4 py-3 rounded text-sm"
          >
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background slideshow */}
      {HERO_SLIDES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === slide ? 1 : 0 }}
        >
          <img src={src} alt="" className="w-full h-full object-cover object-center" />
        </div>
      ))}
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === slide ? "bg-gold w-6" : "bg-white/40"}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-20">
        <div className="max-w-2xl">
          <p className="section-label mb-4">Sarasota · Bradenton · Venice</p>
          <h1 className="text-white leading-tight mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 800 }}>
            Tight Lines.
          </h1>
          <h1 className="text-gold leading-tight mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 800, fontStyle: "italic" }}>
            Good Times.
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
            Premium inshore and nearshore fishing charters in the back bays, mangroves, and coastal waters of Southwest Florida. Captain Jon puts you on the fish — you bring the stories home.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("#contact")}
              className="btn-gold px-8 py-4 rounded text-base"
            >
              Book Your Trip
            </button>
            <button
              onClick={() => scrollTo("#charters")}
              className="btn-outline-gold px-8 py-4 rounded text-base"
            >
              View Trips
            </button>
          </div>

          {/* Trust badges */}
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

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo("#stats")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-gold transition-colors animate-bounce z-10"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
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

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="py-20 md:py-28 bg-off-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <img src={PHOTOS.boat1} alt="Reel Smart Charters vessel" className="rounded-lg object-cover w-full h-56 md:h-72 shadow-xl" />
              <img src={PHOTOS.redfish} alt="Happy angler with redfish" className="rounded-lg object-cover w-full h-56 md:h-72 shadow-xl mt-8" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-navy text-white px-6 py-3 rounded-full shadow-xl border border-gold/30 whitespace-nowrap">
              <span className="text-gold font-heading font-bold text-sm tracking-wider">USCG LICENSED CAPTAIN</span>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="section-label mb-3">Meet Your Captain</p>
            <h2 className="text-navy text-3xl md:text-4xl mb-6 leading-tight">
              Captain Jon knows where the fish live.
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Dawn patrols, tide flips, and a deep love for these waters. From the grass flats of Sarasota Bay to the artificial reefs just off Venice, Captain Jon has built a charter around the local knowledge most anglers spend a lifetime trying to find.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Whether you're a first-timer who's never held a rod or a tournament angler hunting your next personal best, every trip is tailored to you. Light tackle, fly, plug, live-bait, artificial — pick your style. The mission is simple: bend rods, land fish, and have a great time doing it.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Vessel", value: "Mako Marine 24ft" },
                { label: "Engine", value: "Suzuki 300hp" },
                { label: "Waters", value: "Sarasota Bay & Gulf" },
                { label: "Experience", value: "Years on the Water" },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                  <div className="text-gold font-heading text-xs tracking-widest uppercase mb-1">{item.label}</div>
                  <div className="text-navy font-semibold text-sm">{item.value}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollTo("#contact")}
              className="btn-gold px-8 py-3 rounded text-sm"
            >
              Book a Trip with Captain Jon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Charters ──────────────────────────────────────────────────────────────────
function Charters() {
  const { data: packages, isLoading } = trpc.charters.list.useQuery();
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="charters" className="py-20 md:py-28 bg-navy">
      <div className="container">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Trips & Rates</p>
          <h2 className="text-white text-3xl md:text-4xl mb-4">Pick the day you've been daydreaming about.</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Eight trip options — bay, Gulf, sunset, single angler, and a full-on bucket list day. Up to six passengers per charter. Everything is included — license, bait, tackle, ice, water.
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
                {/* Badge */}
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
                    <span className="text-gold/80 text-xs font-heading tracking-wider bg-gold/10 px-2 py-1 rounded">
                      {pkg.duration}
                    </span>
                    <span className="text-white/50 text-xs font-heading tracking-wider bg-white/5 px-2 py-1 rounded">
                      {pkg.type}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed flex-1 mb-4">{pkg.description}</p>
                  <div className="border-t border-white/10 pt-4 mt-auto">
                    <div className="flex items-end justify-between mb-3">
                      <div>
                        <div className="text-white/40 text-xs">Starting at</div>
                        <div className="text-gold font-heading text-2xl font-bold">${pkg.price.toLocaleString()}</div>
                      </div>
                      <div className="text-white/40 text-xs text-right">
                        {pkg.maxPassengers === 1 ? "1 passenger" : `up to ${pkg.maxPassengers} passengers`}
                      </div>
                    </div>
                    <button
                      onClick={() => scrollTo("#contact")}
                      className="btn-gold w-full py-2.5 rounded text-sm"
                    >
                      Book This Trip
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-white/40 text-sm text-center mt-8 max-w-2xl mx-auto">
          <strong className="text-white/60">Note:</strong> A 25% gratuity is automatically added for trips with five or more passengers. For all other trips, a tip of around 20% of the trip price is the industry standard.
        </p>
      </div>
    </section>
  );
}

// ── Gallery ───────────────────────────────────────────────────────────────────
function Gallery() {
  const { data: photos } = trpc.gallery.list.useQuery();
  const [lightbox, setLightbox] = useState<{ url: string; caption?: string | null } | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const openLightbox = (photo: { url: string; caption?: string | null }, idx: number) => {
    setLightbox(photo);
    setLightboxIdx(idx);
  };

  const prev = () => {
    if (!photos) return;
    const newIdx = (lightboxIdx - 1 + photos.length) % photos.length;
    setLightboxIdx(newIdx);
    setLightbox(photos[newIdx]);
  };

  const next = () => {
    if (!photos) return;
    const newIdx = (lightboxIdx + 1) % photos.length;
    setLightboxIdx(newIdx);
    setLightbox(photos[newIdx]);
  };

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, lightboxIdx, photos]);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-off-white">
      <div className="container">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Photo Gallery</p>
          <h2 className="text-navy text-3xl md:text-4xl mb-4">The catches speak for themselves.</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Real trips, real fish, real smiles. Every photo is from an actual Reel Smart Charters adventure on the waters of Southwest Florida.
          </p>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {photos?.map((photo, idx) => (
            <div
              key={photo.id}
              className="break-inside-avoid cursor-pointer overflow-hidden rounded-lg group relative"
              onClick={() => openLightbox(photo, idx)}
            >
              <img
                src={photo.url}
                alt={photo.caption || "Fishing charter photo"}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-all duration-300 flex items-end">
                {photo.caption && (
                  <p className="text-white text-xs px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                    {photo.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-gold transition-colors p-2 z-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <div className="max-w-4xl max-h-[90vh] mx-4 relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.url}
              alt={lightbox.caption || ""}
              className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
            {lightbox.caption && (
              <p className="text-white/70 text-sm text-center mt-3">{lightbox.caption}</p>
            )}
            <button
              className="absolute top-3 right-3 text-white/70 hover:text-gold bg-black/40 rounded-full p-1.5 transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-gold transition-colors p-2 z-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
function Testimonials() {
  const { data: reviews } = trpc.testimonials.list.useQuery();

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-navy-mid">
      <div className="container">
        <div className="text-center mb-14">
          <p className="section-label mb-3">From Our Anglers</p>
          <h2 className="text-white text-3xl md:text-4xl mb-4">Five-star trips. Every time.</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews?.map((review) => (
            <div
              key={review.id}
              className="bg-navy rounded-xl p-6 border border-white/10 hover:border-gold/30 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-white/80 leading-relaxed mb-5 italic">"{review.content}"</p>
              <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold font-heading font-bold text-sm">
                    {review.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{review.author}</div>
                  {(review.tripType || review.location) && (
                    <div className="text-white/40 text-xs">
                      {[review.tripType, review.location].filter(Boolean).join(" · ")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
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
    <section id="contact" className="py-20 md:py-28 bg-off-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Info */}
          <div>
            <p className="section-label mb-3">Get In Touch</p>
            <h2 className="text-navy text-3xl md:text-4xl mb-6">Ready to hit the water?</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Fill out the form and Captain Jon will get back to you quickly to confirm your trip details. All charters are 100% private — your group, your pace, your adventure.
            </p>

            <div className="space-y-5">
              {[
                { icon: Phone, label: "Phone", value: "(TBD — coming soon)", href: null },
                { icon: Mail, label: "Email", value: "Fish@reelsmartcharters.com", href: "mailto:Fish@reelsmartcharters.com" },
                { icon: MapPin, label: "Location", value: "Sarasota, Florida", href: null },
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
            <div className="flex gap-3 mt-8">
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

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <Fish className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-navy text-xl font-display font-bold mb-2">Message Sent!</h3>
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
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="container py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/manus-storage/reel-smart-logo-transparent_724165ca.png"
                alt="Reel Smart Charters"
                className="h-16 w-auto object-contain rounded-lg"
                style={{ backgroundColor: '#ffffff', padding: '4px 8px' }}
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Premium inshore and nearshore fishing charters in the back bays, mangroves, and coastal waters of Southwest Florida.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com/reelsmartcharters" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-gold transition-colors group" aria-label="Facebook">
                <svg className="w-4 h-4 text-white group-hover:text-navy" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/reelsmartcharters" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-gold transition-colors group" aria-label="Instagram">
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
                { label: "Home", href: "#hero" },
                { label: "About Captain Jon", href: "#about" },
                { label: "Trips & Rates", href: "#charters" },
                { label: "Photo Gallery", href: "#gallery" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "Contact & Booking", href: "#contact" },
              ].map((l) => (
                <button
                  key={l.label}
                  onClick={() => scrollTo(l.href)}
                  className="block text-white/50 hover:text-gold text-sm transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold font-heading text-xs tracking-widest uppercase mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/50 text-sm">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span>TBD — coming soon</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:Fish@reelsmartcharters.com" className="text-white/50 hover:text-gold transition-colors">
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

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <StatsBar />
      <About />
      <Charters />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
