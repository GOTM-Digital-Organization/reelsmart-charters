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
