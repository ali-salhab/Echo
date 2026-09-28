"use client"
import { CustomizationView } from "@/modules/customization/ui/view/customization-view"
import React from "react"
import { auth, Show } from "@clerk/nextjs"
import { PremiumFeatureOverlay } from "@/modules/billing/ui/components/premium-feature-overlay"
const Customization = () => {
  return (
    <Show
      when={{ plan: "pro" }}
      fallback={
        <PremiumFeatureOverlay>
          <CustomizationView />
        </PremiumFeatureOverlay>
      }
    >
      <CustomizationView />
    </Show>
  )
}

export default Customization
