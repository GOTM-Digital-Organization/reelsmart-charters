import { Link } from "wouter";
import { ArrowRight, CalendarDays, Clock, Fish, MapPin, Waves } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { LATEST_FISHING_REPORT } from "@/content/fishingReports";

const HUB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Sarasota Fishing Reports",
  description: "Weekly Sarasota fishing reports covering Sarasota Bay, Siesta Key, Longboat Key, Venice and the nearshore Gulf.",
  url: "https://reelsmartcharters.com/fishing-reports",
  isPartOf: {
    "@type": "WebSite",
    name: "Reel Smart Charters",
    url: "https://reelsmartcharters.com",
  },
  about: ["Sarasota fishing", "Sarasota Bay", "Siesta Key fishing", "Longboat Key fishing", "Venice fishing"],
};

export default function FishingReportsPage() {
  const report = LATEST_FISHING_REPORT;

  return (
    <div className="min-h-screen bg-off-white">
      <SEOHead
        title="Sarasota Fishing Reports"
        description="Weekly Sarasota fishing reports from Captain Jon: what’s biting in Sarasota Bay, Siesta Key, Longboat Key, Venice and the nearshore Gulf."
        keywords="Sarasota fishing report, Sarasota Bay fishing report, Siesta Key fishing report, Longboat Key fishing report, Venice fishing report, what is biting in Sarasota"
        canonical="/fishing-reports"
        jsonLd={HUB_SCHEMA}
      />
      <Navbar />

      <section className="relative min-h-[56vh] flex items-end overflow-hidden">
        <img src={report.heroImage} alt={report.heroAlt} className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/75 to-navy/30" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy/80 to-transparent" />
        <div className="container relative z-10 pt-32 pb-16 md:pb-20">
          <p className="section-label mb-4">Local Conditions · Updated Weekly</p>
          <h1 className="max-w-3xl text-white text-4xl md:text-6xl leading-tight mb-5" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
            Sarasota Fishing Reports
          </h1>
          <p className="max-w-2xl text-white/80 text-lg md:text-xl leading-relaxed">
            Straightforward local insight on what’s biting, where to look and how to make the most of your time on Sarasota Bay and the Gulf.
          </p>
        </div>
      </section>

      <main>
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
              <div>
                <p className="section-label mb-3">Latest Report</p>
                <h2 className="text-navy text-3xl md:text-4xl" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                  This Week on the Water
                </h2>
              </div>
              <p className="text-gray-500 max-w-xl">Built for visiting anglers, local fishermen and anyone planning a Sarasota fishing charter.</p>
            </div>

            <article className="grid overflow-hidden rounded-2xl border border-gray-100 bg-off-white shadow-xl shadow-navy/10 md:grid-cols-2">
              <div className="min-h-[300px] md:min-h-full">
                <img src={report.heroImage} alt={report.heroAlt} className="h-full w-full object-cover object-center" loading="eager" />
              </div>
              <div className="p-7 md:p-10 flex flex-col">
                <div className="flex flex-wrap gap-3 text-xs font-heading tracking-wide uppercase text-gray-500 mb-5">
                  <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-gold" /> {report.date}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-gold" /> {report.readTime}</span>
                </div>
                <h3 className="text-navy text-2xl md:text-3xl leading-tight mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                  {report.shortTitle}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">{report.excerpt}</p>
                <div className="grid gap-3 sm:grid-cols-2 mb-8">
                  {report.highlights.slice(0, 4).map((highlight) => (
                    <div key={highlight.species} className="rounded-lg border border-navy/10 bg-white px-4 py-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-heading text-navy font-semibold">{highlight.species}</span>
                        <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-heading tracking-wide uppercase text-navy">{highlight.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href={`/fishing-reports/${report.slug}`} className="btn-gold mt-auto inline-flex w-fit items-center gap-2 px-6 py-3 rounded text-sm">
                  Read This Week’s Report <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-navy">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="section-label mb-3">Made for Better Days on the Water</p>
              <h2 className="text-white text-3xl md:text-4xl mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                What Every Weekly Report Covers
              </h2>
              <p className="text-white/65">The details that help you decide when, where and how to fish Southwest Florida.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { icon: Fish, title: "What’s Biting", text: "Seasonal species, current patterns and the type of action anglers can expect." },
                { icon: MapPin, title: "Where to Look", text: "Sarasota Bay, Siesta Key, Longboat Key, Venice and nearshore Gulf areas worth watching." },
                { icon: Waves, title: "How to Fish It", text: "Bait, lures, tide windows and practical local cues from a charter captain’s perspective." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-7 text-center">
                  <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15"><Icon className="h-6 w-6 text-gold" /></div>
                  <h3 className="text-white font-heading text-xl mb-3">{title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
