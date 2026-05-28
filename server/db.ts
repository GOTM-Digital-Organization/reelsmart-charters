import { eq, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  charterPackages,
  galleryPhotos,
  testimonials,
  contactInquiries,
  InsertCharterPackage,
  InsertGalleryPhoto,
  InsertTestimonial,
  InsertContactInquiry,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ── Charter Packages ──────────────────────────────────────────────────────────

export async function getActiveCharterPackages() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(charterPackages)
    .where(eq(charterPackages.active, true))
    .orderBy(asc(charterPackages.sortOrder));
}

export async function getAllCharterPackages() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(charterPackages).orderBy(asc(charterPackages.sortOrder));
}

export async function createCharterPackage(data: InsertCharterPackage) {
  const db = await getDb();
  if (!db) throw new Error("DB unavailable");
  await db.insert(charterPackages).values(data);
}

export async function updateCharterPackage(id: number, data: Partial<InsertCharterPackage>) {
  const db = await getDb();
  if (!db) throw new Error("DB unavailable");
  await db.update(charterPackages).set(data).where(eq(charterPackages.id, id));
}

export async function deleteCharterPackage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB unavailable");
  await db.delete(charterPackages).where(eq(charterPackages.id, id));
}

// ── Gallery Photos ────────────────────────────────────────────────────────────

export async function getActiveGalleryPhotos() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(galleryPhotos)
    .where(eq(galleryPhotos.active, true))
    .orderBy(asc(galleryPhotos.sortOrder));
}

export async function getAllGalleryPhotos() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(galleryPhotos).orderBy(asc(galleryPhotos.sortOrder));
}

export async function createGalleryPhoto(data: InsertGalleryPhoto) {
  const db = await getDb();
  if (!db) throw new Error("DB unavailable");
  await db.insert(galleryPhotos).values(data);
}

export async function updateGalleryPhoto(id: number, data: Partial<InsertGalleryPhoto>) {
  const db = await getDb();
  if (!db) throw new Error("DB unavailable");
  await db.update(galleryPhotos).set(data).where(eq(galleryPhotos.id, id));
}

export async function deleteGalleryPhoto(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB unavailable");
  await db.delete(galleryPhotos).where(eq(galleryPhotos.id, id));
}

// ── Testimonials ──────────────────────────────────────────────────────────────

export async function getActiveTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.active, true))
    .orderBy(asc(testimonials.sortOrder));
}

export async function getAllTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
}

export async function createTestimonial(data: InsertTestimonial) {
  const db = await getDb();
  if (!db) throw new Error("DB unavailable");
  await db.insert(testimonials).values(data);
}

export async function updateTestimonial(id: number, data: Partial<InsertTestimonial>) {
  const db = await getDb();
  if (!db) throw new Error("DB unavailable");
  await db.update(testimonials).set(data).where(eq(testimonials.id, id));
}

export async function deleteTestimonial(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB unavailable");
  await db.delete(testimonials).where(eq(testimonials.id, id));
}

// ── Contact Inquiries ─────────────────────────────────────────────────────────

export async function createContactInquiry(data: InsertContactInquiry) {
  const db = await getDb();
  if (!db) throw new Error("DB unavailable");
  await db.insert(contactInquiries).values(data);
}

export async function getAllContactInquiries() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactInquiries).orderBy(asc(contactInquiries.createdAt));
}

export async function markInquiryRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB unavailable");
  await db.update(contactInquiries).set({ read: true }).where(eq(contactInquiries.id, id));
}
