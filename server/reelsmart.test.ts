import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ── Mock DB helpers ───────────────────────────────────────────────────────────
vi.mock("./db", () => ({
  getActiveCharterPackages: vi.fn().mockResolvedValue([
    { id: 1, name: "Half-Day Inshore", description: "4-hour bay trip", duration: "4 Hours", type: "Inshore", price: 450, maxPassengers: 4, badge: null, sortOrder: 1, active: true, createdAt: new Date(), updatedAt: new Date() },
  ]),
  getAllCharterPackages: vi.fn().mockResolvedValue([]),
  createCharterPackage: vi.fn().mockResolvedValue({ id: 2 }),
  updateCharterPackage: vi.fn().mockResolvedValue(undefined),
  deleteCharterPackage: vi.fn().mockResolvedValue(undefined),
  getActiveGalleryPhotos: vi.fn().mockResolvedValue([
    { id: 1, url: "/manus-storage/test.jpg", caption: "Test photo", sortOrder: 1, active: true, createdAt: new Date() },
  ]),
  getAllGalleryPhotos: vi.fn().mockResolvedValue([]),
  createGalleryPhoto: vi.fn().mockResolvedValue({ id: 2 }),
  updateGalleryPhoto: vi.fn().mockResolvedValue(undefined),
  deleteGalleryPhoto: vi.fn().mockResolvedValue(undefined),
  getActiveTestimonials: vi.fn().mockResolvedValue([
    { id: 1, author: "Jane D.", location: "Sarasota", tripType: "Inshore", rating: 5, content: "Amazing trip!", sortOrder: 1, active: true, createdAt: new Date(), updatedAt: new Date() },
  ]),
  getAllTestimonials: vi.fn().mockResolvedValue([]),
  createTestimonial: vi.fn().mockResolvedValue({ id: 2 }),
  updateTestimonial: vi.fn().mockResolvedValue(undefined),
  deleteTestimonial: vi.fn().mockResolvedValue(undefined),
  createContactInquiry: vi.fn().mockResolvedValue({ id: 1 }),
  getAllContactInquiries: vi.fn().mockResolvedValue([]),
  markInquiryRead: vi.fn().mockResolvedValue(undefined),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// ── Context helpers ───────────────────────────────────────────────────────────
function makePublicCtx(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function makeAdminCtx(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-open-id",
      email: "admin@example.com",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function makeUserCtx(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "user-open-id",
      email: "user@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────────
describe("charters.list (public)", () => {
  it("returns active charter packages", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    const result = await caller.charters.list();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject({ name: "Half-Day Inshore", price: 450 });
  });
});

describe("charters.adminList (admin only)", () => {
  it("returns all packages for admin", async () => {
    const caller = appRouter.createCaller(makeAdminCtx());
    const result = await caller.charters.adminList();
    expect(Array.isArray(result)).toBe(true);
  });

  it("throws FORBIDDEN for non-admin user", async () => {
    const caller = appRouter.createCaller(makeUserCtx());
    await expect(caller.charters.adminList()).rejects.toThrow();
  });

  it("throws for unauthenticated user", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    await expect(caller.charters.adminList()).rejects.toThrow();
  });
});

describe("charters.create (admin only)", () => {
  it("creates a charter package as admin", async () => {
    const caller = appRouter.createCaller(makeAdminCtx());
    const result = await caller.charters.create({
      name: "Full-Day Offshore",
      description: "8-hour offshore adventure",
      duration: "8 Hours",
      type: "Offshore",
      price: 950,
      maxPassengers: 6,
      sortOrder: 5,
    });
    expect(result).toMatchObject({ id: 2 });
  });

  it("rejects invalid price (non-positive)", async () => {
    const caller = appRouter.createCaller(makeAdminCtx());
    await expect(
      caller.charters.create({
        name: "Bad Package",
        description: "desc",
        duration: "4 Hours",
        type: "Inshore",
        price: -100,
        maxPassengers: 4,
        sortOrder: 0,
      })
    ).rejects.toThrow();
  });
});

describe("gallery.list (public)", () => {
  it("returns active gallery photos", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    const result = await caller.gallery.list();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject({ url: "/manus-storage/test.jpg" });
  });
});

describe("testimonials.list (public)", () => {
  it("returns active testimonials", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    const result = await caller.testimonials.list();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject({ author: "Jane D.", rating: 5 });
  });
});

describe("contact.submit (public)", () => {
  it("submits a valid contact inquiry", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    const result = await caller.contact.submit({
      name: "John Smith",
      email: "john@example.com",
      phone: "555-1234",
      preferredDate: "2026-07-04",
      groupSize: 3,
      message: "Looking for a half-day inshore trip.",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects submission with invalid email", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    await expect(
      caller.contact.submit({
        name: "Bad Actor",
        email: "not-an-email",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with missing name", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    await expect(
      caller.contact.submit({
        name: "",
        email: "valid@example.com",
      })
    ).rejects.toThrow();
  });
});

describe("contact.adminList (admin only)", () => {
  it("returns inquiries for admin", async () => {
    const caller = appRouter.createCaller(makeAdminCtx());
    const result = await caller.contact.adminList();
    expect(Array.isArray(result)).toBe(true);
  });

  it("throws for non-admin", async () => {
    const caller = appRouter.createCaller(makeUserCtx());
    await expect(caller.contact.adminList()).rejects.toThrow();
  });
});

describe("auth.me", () => {
  it("returns null for unauthenticated user", async () => {
    const caller = appRouter.createCaller(makePublicCtx());
    const result = await caller.auth.me();
    expect(result).toBeNull();
  });

  it("returns user object for authenticated user", async () => {
    const caller = appRouter.createCaller(makeAdminCtx());
    const result = await caller.auth.me();
    expect(result).toMatchObject({ role: "admin" });
  });
});
