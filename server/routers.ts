import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import {
  getActiveCharterPackages,
  getAllCharterPackages,
  createCharterPackage,
  updateCharterPackage,
  deleteCharterPackage,
  getActiveGalleryPhotos,
  getAllGalleryPhotos,
  createGalleryPhoto,
  updateGalleryPhoto,
  deleteGalleryPhoto,
  getActiveTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  createContactInquiry,
  getAllContactInquiries,
  markInquiryRead,
} from "./db";

// Admin guard middleware
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ── Public data ────────────────────────────────────────────────────────────

  charters: router({
    list: publicProcedure.query(() => getActiveCharterPackages()),
    adminList: adminProcedure.query(() => getAllCharterPackages()),
    create: adminProcedure
      .input(
        z.object({
          name: z.string().min(1),
          description: z.string().min(1),
          duration: z.string().min(1),
          type: z.string().min(1),
          price: z.number().int().positive(),
          maxPassengers: z.number().int().positive(),
          badge: z.string().optional(),
          sortOrder: z.number().int().default(0),
        })
      )
      .mutation(({ input }) => createCharterPackage(input)),
    update: adminProcedure
      .input(
        z.object({
          id: z.number().int(),
          name: z.string().min(1).optional(),
          description: z.string().min(1).optional(),
          duration: z.string().min(1).optional(),
          type: z.string().min(1).optional(),
          price: z.number().int().positive().optional(),
          maxPassengers: z.number().int().positive().optional(),
          badge: z.string().nullable().optional(),
          sortOrder: z.number().int().optional(),
          active: z.boolean().optional(),
        })
      )
      .mutation(({ input }) => {
        const { id, ...data } = input;
        return updateCharterPackage(id, data);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number().int() }))
      .mutation(({ input }) => deleteCharterPackage(input.id)),
  }),

  gallery: router({
    list: publicProcedure.query(() => getActiveGalleryPhotos()),
    adminList: adminProcedure.query(() => getAllGalleryPhotos()),
    create: adminProcedure
      .input(
        z.object({
          url: z.string().min(1),
          caption: z.string().optional(),
          sortOrder: z.number().int().default(0),
        })
      )
      .mutation(({ input }) => createGalleryPhoto(input)),
    update: adminProcedure
      .input(
        z.object({
          id: z.number().int(),
          url: z.string().min(1).optional(),
          caption: z.string().nullable().optional(),
          sortOrder: z.number().int().optional(),
          active: z.boolean().optional(),
        })
      )
      .mutation(({ input }) => {
        const { id, ...data } = input;
        return updateGalleryPhoto(id, data);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number().int() }))
      .mutation(({ input }) => deleteGalleryPhoto(input.id)),
  }),

  testimonials: router({
    list: publicProcedure.query(() => getActiveTestimonials()),
    adminList: adminProcedure.query(() => getAllTestimonials()),
    create: adminProcedure
      .input(
        z.object({
          author: z.string().min(1),
          location: z.string().optional(),
          tripType: z.string().optional(),
          rating: z.number().int().min(1).max(5).default(5),
          content: z.string().min(1),
          sortOrder: z.number().int().default(0),
        })
      )
      .mutation(({ input }) => createTestimonial(input)),
    update: adminProcedure
      .input(
        z.object({
          id: z.number().int(),
          author: z.string().min(1).optional(),
          location: z.string().nullable().optional(),
          tripType: z.string().nullable().optional(),
          rating: z.number().int().min(1).max(5).optional(),
          content: z.string().min(1).optional(),
          sortOrder: z.number().int().optional(),
          active: z.boolean().optional(),
        })
      )
      .mutation(({ input }) => {
        const { id, ...data } = input;
        return updateTestimonial(id, data);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number().int() }))
      .mutation(({ input }) => deleteTestimonial(input.id)),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Valid email required"),
          phone: z.string().optional(),
          preferredDate: z.string().optional(),
          groupSize: z.number().int().min(1).max(20).optional(),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await createContactInquiry(input);
        // Send owner notification
        const dateStr = input.preferredDate ? ` on ${input.preferredDate}` : "";
        const groupStr = input.groupSize ? ` · Group of ${input.groupSize}` : "";
        await notifyOwner({
          title: `New Booking Inquiry from ${input.name}`,
          content: `**Name:** ${input.name}\n**Email:** ${input.email}\n**Phone:** ${input.phone || "Not provided"}\n**Preferred Date:** ${input.preferredDate || "Not specified"}${groupStr}\n**Message:** ${input.message || "None"}\n\nReply to: ${input.email}`,
        });
        return { success: true };
      }),

    adminList: adminProcedure.query(() => getAllContactInquiries()),
    markRead: adminProcedure
      .input(z.object({ id: z.number().int() }))
      .mutation(({ input }) => markInquiryRead(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
