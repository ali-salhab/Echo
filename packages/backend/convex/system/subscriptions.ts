import { v } from "convex/values"
import { internal } from "../_generated/api"
import { internalMutation, internalQuery } from "../_generated/server"
export const upsert = internalMutation({
  args: {
    organizationId: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const existingSunscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_organization_id", (q) => {
        return q.eq("organizationId", args.organizationId)
      })
      .unique()
    if (existingSunscription) {
      await ctx.db.patch(existingSunscription._id, { status: args.status })
    } else {
      await ctx.db.insert("subscriptions", {
        organizationId: args.organizationId,
        status: args.status,
      })
    }
  },
})

export const getByOrganizationId = internalQuery({
  args: {
    organizationId: v.string(),
  },
  handler: async (ctx, args) => {
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_organization_id", (q) => {
        return q.eq("organizationId", args.organizationId)
      })
      .unique()
    return subscription
  },
})
