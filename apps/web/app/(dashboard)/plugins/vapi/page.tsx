"use client"
import { PremiumFeatureOverlay } from "@/modules/billing/ui/components/premium-feature-overlay"
import VapiView from "@/modules/plugins/ui/views/vapi-view"
import { Show } from "@clerk/nextjs"
import React from "react"

const VapiPlugin = () => {
  return (
    <Show
      when={{ plan: "pro" }}
      fallback={
        <PremiumFeatureOverlay>
          <VapiView />
        </PremiumFeatureOverlay>
      }
    >
      <VapiView />
    </Show>
  )
}

export default VapiPlugin
