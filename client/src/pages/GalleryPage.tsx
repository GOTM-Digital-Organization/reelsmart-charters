import { useState, useEffect } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { LOCAL_BUSINESS_SCHEMA } from "@/components/SEOHead";

const HERO_IMG = "/manus-storage/IMG_8048_c31d63c6.jpeg";

const GALLERY_SCHEMA = {
  ...LOCAL_BUSINESS_SCHEMA,
  description:
    "Browse the Reel Smart Charters photo gallery — real fishing trips, real catches, and real smiles from the inshore and nearshore waters of Sarasota, Bradenton, and Venice, Florida.",
};

export default function GalleryPage() {
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
    <div className="min-h-screen">
      <SEOHead
        title="Fishing Photo Gallery — Reel Smart Charters Sarasota FL"
        description="Browse the Reel Smart Charters photo gallery — real fishing trips, real catches, and real smiles from the inshore and nearshore waters of Sarasota, Bradenton, and Venice, Florida."
        canonical="/gallery"
        jsonLd={GALLERY_SCHEMA}
      />
      <Navbar />

      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <img src={HERO_IMG} alt="Big shark catch on a Reel Smart Charter" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy/90" />
        <div className="container relative z-10 text-center">
          <p className="section-label mb-4">Real Trips. Real Fish.</p>
          <h1 className="text-white text-4xl md:text-6xl mb-4 leading-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
            Photo Gallery
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Every photo is from an actual Reel Smart Charters adventure on the waters of Southwest Florida.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="container">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {photos?.map((photo, idx) => (
              <div
                key={photo.id}
                className="break-inside-avoid cursor-pointer overflow-hidden rounded-lg group relative"
                onClick={() => openLightbox(photo, idx)}
              >
                <img
                  src={photo.url}
                  alt={photo.caption || "Fishing charter photo — Reel Smart Charters Sarasota FL"}
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

          {!photos?.length && (
            <div className="text-center py-20 text-gray-400">
              <p>Gallery photos loading...</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="container text-center">
          <h2 className="text-white text-3xl md:text-4xl mb-4">Want to be in the next photo?</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Book your charter today and create your own fishing memories on the waters of Southwest Florida.
          </p>
          <a
            href="https://fishingbooker.com/embeds/book/2114018"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-10 py-4 rounded text-base inline-flex items-center gap-2"
          >
            Book Your Charter <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-gold transition-colors p-2 z-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <div
            className="max-w-4xl max-h-[90vh] mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.url}
              alt={lightbox.caption || "Fishing charter photo"}
              className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
            {lightbox.caption && (
              <p className="text-white/70 text-sm text-center mt-3">{lightbox.caption}</p>
            )}
            <button
              className="absolute top-3 right-3 text-white/70 hover:text-gold bg-black/40 rounded-full p-1.5 transition-colors"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-gold transition-colors p-2 z-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </div>
  );
}
