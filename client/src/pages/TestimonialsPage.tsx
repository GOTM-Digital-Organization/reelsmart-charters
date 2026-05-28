import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Star, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { LOCAL_BUSINESS_SCHEMA } from "@/components/SEOHead";

const HERO_IMG = "/manus-storage/IMG_3729_533ea3f4.webp";

const TESTIMONIALS_SCHEMA = {
  ...LOCAL_BUSINESS_SCHEMA,
  description:
    "Read customer reviews and testimonials for Reel Smart Charters in Sarasota, FL. Five-star fishing charter experiences on the inshore and nearshore waters of Southwest Florida.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "50",
  },
};

export default function TestimonialsPage() {
  const { data: reviews } = trpc.testimonials.list.useQuery();

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Customer Reviews & Testimonials — Reel Smart Charters Sarasota FL"
        description="Read five-star customer reviews for Reel Smart Charters in Sarasota, FL. Real testimonials from anglers who've fished the inshore and nearshore waters of Southwest Florida with Captain Jon."
        canonical="/testimonials"
        jsonLd={TESTIMONIALS_SCHEMA}
      />
      <Navbar />

      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <img src={HERO_IMG} alt="Happy fishing crew on Reel Smart Charters" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy/90" />
        <div className="container relative z-10 text-center">
          <p className="section-label mb-4">From Our Anglers</p>
          <h1 className="text-white text-4xl md:text-6xl mb-4 leading-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
            What Our Guests Say
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Five-star trips. Every time. Real reviews from real anglers.
          </p>
        </div>
      </section>

      {/* Rating Summary */}
      <section className="bg-gold py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 text-navy">
            <div className="text-center">
              <div className="font-heading text-5xl font-bold">5.0</div>
              <div className="flex gap-1 justify-center mt-1">
                {[1,2,3,4,5].map((i) => <Star key={i} className="w-5 h-5 fill-navy text-navy" />)}
              </div>
              <div className="text-sm font-heading tracking-wide mt-1">Average Rating</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-navy/20" />
            <div className="text-center">
              <div className="font-heading text-5xl font-bold">100%</div>
              <div className="text-sm font-heading tracking-wide mt-2">Would Recommend</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-navy/20" />
            <div className="text-center">
              <div className="font-heading text-5xl font-bold">Private</div>
              <div className="text-sm font-heading tracking-wide mt-2">Every Charter</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 md:py-28 bg-navy-mid">
        <div className="container">
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
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
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

          {!reviews?.length && (
            <div className="text-center py-20 text-white/40">
              <p>Loading reviews...</p>
            </div>
          )}
        </div>
      </section>

      {/* Leave a Review CTA */}
      <section className="py-20 bg-off-white">
        <div className="container text-center max-w-2xl">
          <p className="section-label mb-3">Share Your Experience</p>
          <h2 className="text-navy text-3xl md:text-4xl mb-4">Fished with us recently?</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We'd love to hear about your trip! Your review helps other anglers find Reel Smart Charters and helps Captain Jon continue delivering great experiences on the water.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.google.com/search?q=Reel+Smart+Charters+Sarasota+FL"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-8 py-3 rounded text-sm inline-flex items-center gap-2"
            >
              Leave a Google Review <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/contact" className="btn-outline-navy px-8 py-3 rounded text-sm">
              Book Your Next Trip
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
