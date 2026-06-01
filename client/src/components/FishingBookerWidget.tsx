import { useEffect } from "react";

const LISTING_URL = "https://fishingbooker.com/embeds/book/2114018";

declare global {
  interface Window {
    FishingBooker?: {
      init: () => void;
    };
  }
}

interface FishingBookerWidgetProps {
  /** Visual variant: "button" renders the branded FB button; "inline" renders the full booking widget */
  variant?: "button" | "inline";
  className?: string;
  label?: string;
}

/**
 * FishingBooker direct booking integration.
 * - variant="button"  → renders the FishingBooker-styled CTA button (opens booking modal)
 * - variant="inline"  → renders the full embedded booking widget inline on the page
 */
export default function FishingBookerWidget({
  variant = "button",
  className = "",
  label = "Book Now",
}: FishingBookerWidgetProps) {
  useEffect(() => {
    // Re-initialize FishingBooker embeds after React renders the DOM node
    if (window.FishingBooker?.init) {
      window.FishingBooker.init();
    }
  }, [variant]);

  if (variant === "inline") {
    return (
      <div className={className}>
        <iframe
          src={LISTING_URL}
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          title="Book a Fishing Charter with Reel Smart Charters on FishingBooker"
          style={{ borderRadius: "12px", minHeight: "580px" }}
        />
      </div>
    );
  }

  // Button variant — uses FishingBooker's embed script to open a booking modal
  return (
    <a
      href={LISTING_URL}
      data-fishingbooker-embed="button"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {label}
    </a>
  );
}

/**
 * FishingBooker trust badge — shows "Verified on FishingBooker ★ 5.0"
 */
export function FishingBookerBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href="https://www.fishingbooker.com/charters/profile/2114018"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity ${className}`}
      aria-label="Verified on FishingBooker"
    >
      <img
        src="https://fishingbooker.com/assets/logo-icon.png"
        alt="FishingBooker"
        className="w-5 h-5 object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
      <span>Verified on FishingBooker · ★ 5.0 · 100+ reviews</span>
    </a>
  );
}
