import { z } from "zod";
import { 
  createTRPCRouter, 
  protectedProcedure, 
  editorProcedure 
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

// Validation schemas
const createNoteSchema = z.object({
  propertyId: z.string().cuid(),
  content: z.string().min(1).max(5000),
  type: z.enum(['GENERAL', 'PRO', 'CON', 'QUESTION', 'INSPECTION', 'IMPORTANT']).default('GENERAL'),
  parentId: z.string().cuid().optional(), // For replies
  mentions: z.array(z.string().cuid()).optional(), // User IDs to mention
});

const updateNoteSchema = z.object({
  id: z.string().cuid(),
  content: z.string().min(1).max(5000),
});

export const notesRouter = createTRPCRouter({
  // Get notes for a property
  getByProperty: protectedProcedure
    .input(z.object({ 
      propertyId: z.string().cuid(),
      limit: z.number().min(1).max(100).default(20),
      offset: z.number().min(0).default(0),
    }))
    .query(async ({ ctx, input }) => {
      const { propertyId, limit, offset } = input;

      const notes = await ctx.db.note.findMany({
        where: { 
          propertyId,
          parentId: null, // Only get top-level notes (not replies)
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
              role: true,
            },
          },
          mentions: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          replies: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  role: true,
                },
              },
              mentions: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
            orderBy: { createdAt: 'asc' },
          },
          _count: {
            select: { replies: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      });

      const total = await ctx.db.note.count({
        where: { propertyId, parentId: null },
      });

      return {
        notes,
        pagination: {
          total,
          hasMore: offset + limit < total,
        },
      };
    }),

  // Create new note
  create: editorProcedure
    .input(createNoteSchema)
    .mutation(async ({ ctx, input }) => {
      const { propertyId, content, type, parentId, mentions = [] } = input;

      // Verify property exists
      const property = await ctx.db.property.findUnique({
        where: { id: propertyId },
        select: { id: true, address: true },
      });

      if (!property) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Property not found',
        });
      }

      // If it's a reply, verify parent note exists
      if (parentId) {
        const parentNote = await ctx.db.note.findUnique({
          where: { id: parentId },
          select: { id: true, propertyId: true },
        });

        if (!parentNote || parentNote.propertyId !== propertyId) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Parent note not found or belongs to different property',
          });
        }
      }

      try {
        const note = await ctx.db.note.create({
          data: {
            content,
            type,
            propertyId,
            authorId: ctx.session.user.id,
            parentId,
            mentions: {
              connect: mentions.map(userId => ({ id: userId })),
            },
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
                role: true,
              },
            },
            mentions: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        });

        // Create activity log
        await ctx.db.activity.create({
          data: {
            type: 'NOTE_ADDED',
            action: parentId 
              ? `Replied to note on property: ${property.address}`
              : `Added note to property: ${property.address}`,
            userId: ctx.session.user.id,
            propertyId,
            metadata: {
              noteId: note.id,
              noteType: type,
              isReply: !!parentId,
              mentionsCount: mentions.length,
            },
          },
        });

        // TODO: Send notifications to mentioned users
        if (mentions.length > 0) {
          console.log(`Note mentions: ${mentions.join(', ')}`);
        }

        return note;
      } catch (error) {
        console.error('Error creating note:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create note',
        });
      }
    }),

  // Update existing note (author only)
  update: editorProcedure
    .input(updateNoteSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, content } = input;

      const existingNote = await ctx.db.note.findUnique({
        where: { id },
        select: {
          id: true,
          authorId: true,
          createdAt: true,
          property: {
            select: { address: true },
          },
        },
      });

      if (!existingNote) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Note not found',
        });
      }

      // Only allow author or admin to edit
      if (existingNote.authorId !== ctx.session.user.id && ctx.session.user.role !== 'ADMIN') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only edit your own notes',
        });
      }

      try {
        const updatedNote = await ctx.db.note.update({
          where: { id },
          data: {
            content,
            edited: true,
            editedAt: new Date(),
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
                role: true,
              },
            },
            mentions: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        });

        // Create activity log
        await ctx.db.activity.create({
          data: {
            type: 'NOTE_EDITED',
            action: `Edited note on property: ${existingNote.property.address}`,
            userId: ctx.session.user.id,
            propertyId: existingNote.id,
            metadata: {
              noteId: id,
              originalDate: existingNote.createdAt,
            },
          },
        });

        return updatedNote;
      } catch (error) {
        console.error('Error updating note:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update note',
        });
      }
    }),

  // Delete note (author or admin only)
  delete: editorProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const existingNote = await ctx.db.note.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          authorId: true,
          propertyId: true,
          property: {
            select: { address: true },
          },
          _count: {
            select: { replies: true },
          },
        },
      });

      if (!existingNote) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Note not found',
        });
      }

      // Only allow author or admin to delete
      if (existingNote.authorId !== ctx.session.user.id && ctx.session.user.role !== 'ADMIN') {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only delete your own notes',
        });
      }

      try {
        // Delete the note (cascading delete will handle replies)
        await ctx.db.note.delete({
          where: { id: input.id },
        });

        // Create activity log
        await ctx.db.activity.create({
          data: {
            type: 'NOTE_DELETED',
            action: `Deleted note on property: ${existingNote.property.address}`,
            userId: ctx.session.user.id,
            propertyId: existingNote.propertyId,
            metadata: {
              noteId: input.id,
              hadReplies: existingNote._count.replies > 0,
            },
          },
        });

        return { success: true };
      } catch (error) {
        console.error('Error deleting note:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to delete note',
        });
      }
    }),

  // Get recent notes across all properties
  getRecent: protectedProcedure
    .input(z.object({
      limit: z.number().min(1).max(50).default(10),
    }))
    .query(async ({ ctx, input }) => {
      const notes = await ctx.db.note.findMany({
        where: {
          property: {
            status: { not: 'ARCHIVED' },
          },
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
              role: true,
            },
          },
          property: {
            select: {
              id: true,
              address: true,
              suburb: true,
              status: true,
            },
          },
          _count: {
            select: { replies: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: input.limit,
      });

      return notes;
    }),

  // Get notes by type for a property
  getByType: protectedProcedure
    .input(z.object({
      propertyId: z.string().cuid(),
      type: z.enum(['GENERAL', 'PRO', 'CON', 'QUESTION', 'INSPECTION', 'IMPORTANT']),
    }))
    .query(async ({ ctx, input }) => {
      const { propertyId, type } = input;

      const notes = await ctx.db.note.findMany({
        where: { 
          propertyId,
          type,
          parentId: null, // Top-level notes only
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
              role: true,
            },
          },
          replies: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  role: true,
                },
              },
            },
            orderBy: { createdAt: 'asc' },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return notes;
    }),

  // Get notes mentioning current user
  getMentions: protectedProcedure
    .input(z.object({
      limit: z.number().min(1).max(50).default(10),
      unreadOnly: z.boolean().default(false),
    }))
    .query(async ({ ctx, input }) => {
      const { limit, unreadOnly } = input;

      const notes = await ctx.db.note.findMany({
        where: {
          mentions: {
            some: { id: ctx.session.user.id },
          },
          property: {
            status: { not: 'ARCHIVED' },
          },
          // TODO: Add read/unread tracking if needed
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
              role: true,
            },
          },
          property: {
            select: {
              id: true,
              address: true,
              suburb: true,
              status: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });

      return notes;
    }),
});