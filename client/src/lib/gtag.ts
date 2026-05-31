// Google Ads conversion tracking helper
// Tag: AW-18178176122

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Fire a Google Ads conversion event when a booking form is submitted.
 * The conversion label should be created in Google Ads under
 * Tools → Conversions → New Conversion → Website.
 */
export function fireBookingConversion() {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-18178176122/booking_form_submit",
    });
  }
}

/**
 * Fire a Google Ads conversion for a phone call click.
 */
export function fireCallConversion() {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-18178176122/phone_call_click",
    });
  }
}
