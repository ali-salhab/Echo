import { PricingTable as ClerkPricingTable } from "@clerk/nextjs"
const PricingTable = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <ClerkPricingTable
        for="organization"
        appearance={{
          elements: {
            pricingTableCard: "bg-white shadow-md rounded-lg p-4",
            pricingTableHeader: "bg-background!",
            pricingTableBody: "bg-background!",
            pricingTableRow: "bg-background!",
            pricingTableFooter: "bg-background!",
          },
        }}
      />
    </div>
  )
}

export default PricingTable
