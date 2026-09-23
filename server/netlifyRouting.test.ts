import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Netlify single-page-app routing", () => {
  it("rewrites direct page requests to the React entry point", () => {
    const redirectsPath = path.resolve(import.meta.dirname, "../client/public/_redirects");
    const redirects = fs.readFileSync(redirectsPath, "utf8");

    expect(redirects).toContain("/*    /index.html   200");
  });

  it("includes the static image assets used by the Netlify build", () => {
    const imagesDir = path.resolve(import.meta.dirname, "../client/public/images");
    const requiredFiles = [
      "captain-jon-boat-hero.jpeg",
      "hero-boat.jpeg",
      "logo.png",
      "reel-smart-wrap-action-hero.webp",
      "reel-smart-wrap-boat-hero.webp",
      "reel-smart-wrap-captain-helm.webp",
      "photo-1911.webp",
      "photo-2061.webp",
      "photo-2101.webp",
      "photo-2267.webp",
      "photo-2307.jpeg",
      "photo-2510.webp",
      "photo-2671.webp",
      "photo-2743.webp",
      "photo-3729.webp",
      "photo-4281.webp",
    ];

    for (const filename of requiredFiles) {
      expect(fs.existsSync(path.join(imagesDir, filename))).toBe(true);
    }
  });
});
