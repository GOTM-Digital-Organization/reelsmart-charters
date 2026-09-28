import { Link, useRoute } from "wouter";
import { ArrowLeft, CalendarDays, ChevronRight, Clock, Fish, MapPin, Phone, Waves } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import NotFound from "@/pages/NotFound";
import { fireBookingConversion, fireCallConversion } from "@/lib/gtag";
import { FISHING_REPORTS } from "@/content/fishingReports";

const BASE_URL = "https://reelsmartcharters.com";
const DIRECT_BOOKING_URL = "https://fishingbooker.com/embeds/book/2114018/49132";

export default function FishingReportPage() {
  const [matches, params] = useRoute("/fishing-reports/:slug");
  const report = FISHING_REPORTS.find((entry) => entry.slug === params?.slug);

  if (!matches || !report) return <NotFound />;

  const reportUrl = `${BASE_URL}/fishing-reports/${report.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: report.title,
    description: report.metaDescription,
    image: [`${BASE_URL}${report.heroImage}`],
    datePublished: report.isoDate,
    dateModified: report.isoDate,
    author: { "@type": "Person", name: "Captain Jon Smart" },
    publisher: {
      "@type": "Organization",
      name: "Reel Smart Charters",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/images/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": reportUrl },
    keywords: ["Sarasota fishing report", "Sarasota Bay fishing", "Siesta Key fishing", "Longboat Key fishing", "Venice fishing"],
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Fishing Reports", item: `${BASE_URL}/fishing-reports` },
      { "@type": "ListItem", position: 3, name: report.shortTitle, item: reportUrl },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Sarasota Fishing Report"
        description={report.metaDescription}
        keywords="Sarasota fishing report, Sarasota Bay fishing report, Siesta Key fishing report, Longboat Key fishing report, Venice fishing report, snook fishing Sarasota, redfish fishing Sarasota"
        canonical={`/fishing-reports/${report.slug}`}
        ogImage={`${BASE_URL}${report.heroImage}`}
        jsonLd={[articleSchema, breadcrumbSchema]}
      />
      <Navbar />

      <main>
        <section className="bg-navy pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="container max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-1.5 text-sm text-white/55">
              <Link href="/" className="hover:text-gold">Home</Link><ChevronRight className="h-3.5 w-3.5" />
              <Link href="/fishing-reports" className="hover:text-gold">Fishing Reports</Link><ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white/80">This Week</span>
            </nav>
            <p className="section-label mb-4">Weekly Sarasota Fishing Report</p>
            <h1 className="text-white text-4xl md:text-6xl leading-tight mb-6" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
              {report.title}
            </h1>
            <p className="max-w-3xl text-white/75 text-lg md:text-xl leading-relaxed mb-7">{report.excerpt}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65">
              <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-gold" /> {report.date}</span>
              <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-gold" /> {report.readTime}</span>
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> Sarasota · Siesta Key · Longboat Key · Venice</span>
            </div>
          </div>
        </section>

        <section className="bg-navy pb-12 md:pb-16">
          <div className="container max-w-5xl">
            <img src={report.heroImage} alt={report.heroAlt} className="w-full rounded-2xl border border-white/10 object-cover shadow-2xl shadow-black/30 aspect-video" />
          </div>
        </section>

        <section className="py-10 md:py-14 bg-off-white border-y border-gray-100">
          <div className="container max-w-5xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-7">
              <div>
                <p className="section-label mb-2">This Week at a Glance</p>
                <h2 className="text-navy text-2xl md:text-3xl" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>The Fall Pattern Is Taking Shape</h2>
              </div>
              <p className="max-w-xl text-gray-600 text-sm leading-relaxed">{report.bestTimes}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {report.highlights.map((highlight) => (
                <div key={highlight.species} className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm">
                  <div className="mb-3 flex items-center justify-between gap-2"><h3 className="font-heading text-navy font-semibold">{highlight.species}</h3><span className="rounded-full bg-gold/15 px-2 py-1 text-[10px] font-heading uppercase tracking-wide text-navy">{highlight.status}</span></div>
                  <p className="text-gray-600 text-sm leading-relaxed">{highlight.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="container max-w-5xl grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
            <article className="min-w-0">
              {report.sections.map((section) => (
                <section key={section.heading} className="mb-11">
                  <h2 className="text-navy text-2xl md:text-3xl leading-tight mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>{section.heading}</h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed text-[1.05rem]">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </section>
              ))}

              <section className="rounded-2xl bg-navy p-7 md:p-9 text-white">
                <div className="flex items-center gap-3 mb-4"><Waves className="h-6 w-6 text-gold" /><h2 className="font-heading text-2xl">Best Bait & Lures This Week</h2></div>
                <ul className="space-y-3 text-white/75 leading-relaxed">
                  {report.baitTips.map((tip) => <li key={tip} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />{tip}</li>)}
                </ul>
              </section>
            </article>

            <aside className="lg:sticky lg:top-28 h-fit space-y-6">
              <div className="rounded-2xl border border-gold/25 bg-off-white p-6">
                <Fish className="h-7 w-7 text-gold mb-4" />
                <h2 className="font-heading text-navy text-xl mb-3">Fishing This Week?</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">Captain Jon will build the trip around the best bite and conditions available for your group.</p>
                <a href={DIRECT_BOOKING_URL} onClick={fireBookingConversion} target="_blank" rel="noopener noreferrer" className="btn-gold block w-full rounded py-3 text-center text-sm">Book a Charter</a>
                <a href="tel:+19417025895" onClick={fireCallConversion} className="mt-3 flex items-center justify-center gap-2 text-sm font-heading text-navy hover:text-gold"><Phone className="h-4 w-4" />(941) 702-5895</a>
              </div>
              <div className="rounded-xl border border-gray-100 p-5">
                <p className="font-heading text-navy text-sm mb-3">Areas covered in this report</p>
                <div className="flex flex-wrap gap-2">{report.locations.map((location) => <span key={location} className="rounded-full bg-navy/5 px-3 py-1.5 text-xs text-navy">{location}</span>)}</div>
              </div>
              <Link href="/fishing-reports" className="inline-flex items-center gap-2 text-gold hover:text-navy text-sm font-heading"><ArrowLeft className="h-4 w-4" /> All fishing reports</Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
