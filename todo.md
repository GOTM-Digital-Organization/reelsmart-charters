# Reel Smart Charters - Project TODO

## Database & Backend
- [x] Charter packages table (id, name, description, duration, type, price, maxPassengers, badge, sortOrder, active)
- [x] Gallery photos table (id, url, caption, sortOrder, active)
- [x] Testimonials table (id, author, location, tripType, rating, content, active)
- [x] Contact/booking inquiries table (id, name, email, phone, date, groupSize, message, createdAt)
- [x] tRPC procedures: CRUD for charters, gallery, testimonials (admin-protected)
- [x] tRPC procedure: submit contact form + send owner notification
- [x] Seed default charter packages, testimonials, and gallery from real photos

## Frontend - Public Site
- [x] Global CSS theme: deep navy, ocean blue, gold, white text (Playfair Display + Barlow Condensed fonts)
- [x] Navigation bar with logo, links (Home, About, Charters, Gallery, Testimonials, Contact), hamburger mobile menu
- [x] Hero section: full-width photo banner slideshow, headline "Tight Lines. Good Times.", tagline, Book Now CTA
- [x] Stats bar: USCG Licensed, All Gear & Bait Included, Inshore & Nearshore, Family Friendly
- [x] About section: captain bio, experience highlights, boat details with real photos
- [x] Charters section: responsive card grid with all packages, pricing, duration, group size, Book button
- [x] Gallery section: masonry/grid layout with all 13 user photos, lightbox on click
- [x] Testimonials section: star-rated review cards
- [x] Contact/Booking form: name, email, phone, date, group size, message fields with validation
- [x] Footer: contact info, social links, phone placeholder (TBD), location, copyright

## Frontend - Admin Dashboard
- [x] Admin login gate (owner-only via Manus OAuth)
- [x] Admin: manage charter packages (add/edit/delete/toggle active)
- [x] Admin: manage gallery photos (add/delete/toggle active)
- [x] Admin: manage testimonials (add/edit/delete/toggle active)
- [x] Admin: view contact/booking inquiries list with mark-read

## Quality & Delivery
- [x] Fully responsive mobile-first design
- [x] Vitest tests for all server procedures (16 tests passing)
- [x] HTML title and meta tags branded for Reel Smart Charters
- [x] Google Fonts (Playfair Display + Barlow Condensed + Inter) loaded
- [x] Gallery seeded with all 13 real user photos with captions
- [x] Final checkpoint and delivery to user

## SEO Multi-Page Rebuild

- [x] Create shared Navbar component (used across all pages)
- [x] Create shared Footer component (used across all pages)
- [x] Create SEOHead component (unique title, description, canonical, OG tags, JSON-LD per page)
- [x] Build /about page (Captain bio, boat, equipment, target species, fishing areas)
- [x] Build /charters page (all packages, FAQ, CTA)
- [x] Build /gallery page (masonry grid, lightbox, keyboard nav)
- [x] Build /testimonials page (all reviews, rating summary, leave-a-review CTA)
- [x] Build /contact page (booking form, contact info, what to expect)
- [x] Refactor Home page to true landing page with CTAs linking to sub-pages
- [x] Wire all routes in App.tsx
- [x] Add sitemap.xml server route (all 6 pages with priorities)
- [x] Add robots.txt server route pointing to sitemap
- [x] Add JSON-LD LocalBusiness structured data on every page
- [x] Add canonical URLs and Open Graph meta tags per page
- [x] All 16 tests passing after rebuild

## Email, Conversion Tracking & Package Updates
- [x] Set up Resend email integration and wire contact form submissions to jonathansmart4@gmail.com
- [x] Add Google Ads conversion event (gtag conversion) on booking form submit
- [x] Review and update charter packages in DB to match current offerings (names, prices, descriptions)

## FishingBooker Integration
- [x] Add FishingBooker scripts/styles to index.html
- [x] Create reusable FishingBookerWidget React component
- [x] Rename nav "Contact" to "Book Trip", update route to /book
- [x] Replace Home page booking CTAs with FishingBooker embed
- [x] Replace Charters page booking buttons with FishingBooker embed
- [x] Replace Landing page contact form with FishingBooker embed + trust badge
- [x] Replace ContactPage with BookTripPage using FishingBooker embed
- [x] Update Venice and Bradenton pages booking buttons
- [x] Add FishingBooker trust badge sitewide
- [x] Update App.tsx route /contact -> /book

## SEO Title/Description/Keywords Fix
- [x] Fix Home page title to render under 60 chars ("Sarasota Fishing Charters | Reel Smart Charters" = 47 chars)
- [x] Fix all page titles to render under 60 chars (all pages now 43–56 chars)
- [x] Fix all page descriptions to be under 160 chars (all pages now 141–160 chars)
- [x] Add keywords meta tag to SEOHead component
- [x] Add keywords prop to all pages (Home, Charters, About, Venice, Bradenton, Gallery, Testimonials, BookTrip)
