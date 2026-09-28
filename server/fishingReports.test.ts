import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { FISHING_REPORTS, LATEST_FISHING_REPORT } from "../client/src/content/fishingReports";

describe("weekly fishing reports", () => {
  it("includes a dated first Sarasota report with a complete article structure", () => {
    expect(LATEST_FISHING_REPORT.slug).toBe("sarasota-fishing-report-september-28-2026");
    expect(LATEST_FISHING_REPORT.isoDate).toBe("2026-09-28");
    expect(LATEST_FISHING_REPORT.sections.length).toBeGreaterThanOrEqual(7);
    expect(LATEST_FISHING_REPORT.highlights).toHaveLength(4);
    expect(FISHING_REPORTS).toHaveLength(1);
  });

  it("publishes the hub and first report in the XML sitemap", () => {
    const sitemapPath = path.resolve(import.meta.dirname, "../client/public/sitemap.xml");
    const sitemap = fs.readFileSync(sitemapPath, "utf8");

    expect(sitemap).toContain("https://reelsmartcharters.com/fishing-reports");
    expect(sitemap).toContain("https://reelsmartcharters.com/fishing-reports/sarasota-fishing-report-september-28-2026");
  });
});
