import { httpRouter } from "convex/server"
import { httpAction } from "./_generated/server"
import { Webhook } from "svix"
import { createClerkClient } from "@clerk/backend"
import type { WebhookEvent } from "@clerk/backend"
import { internal } from "./_generated/api"

const http = httpRouter()
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY || "",
})
http.route({
  path: "/clerk-webhook",
  method: "POST",

  handler: httpAction(async (ctx, request) => {
    const event = await validateRequest(request)

    if (!event) {
      return new Response("Invalid webhook request", {
        status: 400,
      })
    }

    switch (event.type) {
      case "subscription.updated": {
        const subscription = event.data as {
          status: string
          payer?: {
            organization_id: string
          }
        }

        const organizationId = subscription.payer?.organization_id

        if (!organizationId) {
          return new Response("Missing organization ID", {
            status: 400,
          })
        }

        const maxAllowedMemberships = subscription.status === "active" ? 5 : 0

        await clerkClient.organizations.updateOrganization(organizationId, {
          maxAllowedMemberships,
        })

        await ctx.runMutation(internal.system.subscriptions.upsert, {
          organizationId,
          status: subscription.status,
        })

        break
      }

      default: {
        console.warn(`Unhandled webhook event type: ${event.type}`)
        break
      }
    }

    // ✅ OUTSIDE switch
    return new Response("OK", {
      status: 200,
    })
  }),
})

async function validateRequest(request: Request): Promise<WebhookEvent | null> {
  const payloadString = await request.text()
  const svixHeaders = {
    "svix-signature": request.headers.get("svix-signature") || "",
    "svix-timestamp": request.headers.get("svix-timestamp") || "",
    "svix-id": request.headers.get("svix-id") || "",
  }
  const wh = new Webhook(process.env.Clerk_WEBHOOK_SECRET || "")
  try {
    return wh.verify(payloadString, svixHeaders) as unknown as WebhookEvent
  } catch (error) {
    console.error("Failed to validate webhook request:", error)
    return null
  }
}
export default http
