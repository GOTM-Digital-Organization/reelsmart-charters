import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Netlify single-page-app routing", () => {
  it("rewrites direct page requests to the React entry point", () => {
    const redirectsPath = path.resolve(import.meta.dirname, "../client/public/_redirects");
    const redirects = fs.readFileSync(redirectsPath, "utf8");

    expect(redirects).toContain("/*    /index.html   200");
  });
});
