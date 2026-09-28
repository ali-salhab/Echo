"use client"
import FilesView from "@/modules/files/ui/views/files-view"
import { Show } from "@clerk/nextjs"
import { PremiumFeatureOverlay } from "@/modules/billing/ui/components/premium-feature-overlay"
const Files = () => {
  return (
    <Show
      when={{ plan: "pro" }}
      fallback={
        <PremiumFeatureOverlay>
          <FilesView />
        </PremiumFeatureOverlay>
      }
    >
      <FilesView />
    </Show>
  )
}

export default Files
