import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

const LOGO = "/manus-storage/reel-smart-logo-transparent_724165ca.png";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Charters", href: "/charters" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Book Trip", href: "/book" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [location]);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy shadow-lg shadow-black/30" : "bg-navy/90 backdrop-blur-md"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <img
            src={LOGO}
            alt="Reel Smart Charters"
            className="h-16 w-auto object-contain rounded-lg"
            style={{ backgroundColor: "#ffffff", padding: "4px 8px" }}
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`font-heading text-sm tracking-wider uppercase transition-colors duration-150 ${
                isActive(l.href)
                  ? "text-gold"
                  : "text-white/80 hover:text-gold"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="text-gold/70 hover:text-gold font-heading text-sm tracking-wider uppercase transition-colors duration-150"
            >
              Admin
            </Link>
          )}
          <a
            href="https://fishingbooker.com/embeds/book/2114018"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-5 py-2 rounded text-sm ml-2"
          >
            Book Now
          </a>
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
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`block py-3 font-heading tracking-wider uppercase text-sm border-b border-white/10 transition-colors ${
                isActive(l.href)
                  ? "text-gold"
                  : "text-white/80 hover:text-gold"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="block py-3 text-gold/70 hover:text-gold font-heading tracking-wider uppercase text-sm border-b border-white/10"
            >
              Admin
            </Link>
          )}
          <a
            href="https://fishingbooker.com/embeds/book/2114018"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold block w-full mt-4 py-3 rounded text-sm text-center"
          >
            Book Now
          </a>
        </div>
      )}
    </nav>
  );
}
