"use client"

import React from "react"
import PricingTable from "../components/pricing-table"

const BillingView = () => {
  return (
    <div className="flex min-h-screen flex-col bg-muted p-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-4xl">Plans && Billing</h1>
          <p>Choose the plan that best fits your needs.</p>
        </div>
        <div className="mt-8">
          <PricingTable />
        </div>
      </div>
    </div>
  )
}

export default BillingView
