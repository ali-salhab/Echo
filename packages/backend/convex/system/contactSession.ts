import { ConvexError, v } from "convex/values"
import { internalMutation, internalQuery } from "../_generated/server"
import { AUTO_REFRESH_THRESHOLD_MS, SESSION_DURATION } from "../constants"

export const getOne = internalQuery({
  args: {
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get("contactSessions", args.contactSessionId)
  },
})

export const refresh = internalMutation({
  args: {
    contactSessionId: v.id("contactSessions"),
  },
  handler: async (ctx, args) => {
    const contactSession = await ctx.db.get(
      "contactSessions",
      args.contactSessionId
    )
    if (!contactSession) {
      throw new ConvexError({
        code: "not_found",
        message: "Contact session not found",
      })
    }
    if (contactSession.experiesAt < Date.now()) {
      throw new ConvexError({
        code: "expired",
        message: "Contact session has expired",
      })
    }
    const timeRemaining = contactSession.experiesAt - Date.now()
    if (timeRemaining < AUTO_REFRESH_THRESHOLD_MS) {
      const newExpiresAt = Date.now() + SESSION_DURATION
      await ctx.db.patch(args.contactSessionId, { experiesAt: newExpiresAt })
      // Logic to refresh the contact session goes here
      return {
        ...contactSession,
        experiesAt: newExpiresAt,
      }
    }
    return contactSession
  },
})
