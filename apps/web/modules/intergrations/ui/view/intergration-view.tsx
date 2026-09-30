"use client"
import { useOrganization } from "@clerk/nextjs"
import { Button } from "@workspace/ui/components/button"
import { Label } from "@workspace/ui/components/label"
import { Separator } from "@workspace/ui/components/separator"
import { CopyIcon } from "lucide-react"
import React from "react"
import toast from "react-hot-toast"
import { INTEGRATIONS, type IntegrationId } from "../../constants"
import Image from "next/image"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@workspace/ui/components/dialog"
import { set } from "zod"
import { createScript } from "../../utils"
const IntegrationView = () => {
  const { organization } = useOrganization()
  const [dialogeOpen, setDialogeOpen] = React.useState(false)
  const [selectedSnippet, setSelectedSnippet] = React.useState("")

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(organization?.id ?? "")
      toast.success("Organization ID copied to clipboard!")
    } catch (error) {
      console.error("Failed to copy organization ID:", error)
      toast.error("Failed to copy organization ID.")
    }
  }
  const handleIntegrationClick = (integrationId: IntegrationId) => {
    if (!organization) {
      toast.error("Organization not found.")
      return
    }
    const snippet = createScript(integrationId, organization.id)
    setSelectedSnippet(snippet)
    setDialogeOpen(true)
  }
  return (
    <>
      <IntergrationDialog
        open={dialogeOpen}
        onOpenChange={setDialogeOpen}
        snippt={selectedSnippet}
      />

      <div>
        <div className="flex min-h-screen flex-col bg-muted p-4">
          <div className="mx-auto w-full max-w-3xl">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-4xl">Setup & intergrations</h1>
              <p className="text-muted-foreground">
                choose and configure your integrations here.
              </p>
            </div>
          </div>
          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-4">
              <Label className="w-34" htmlFor="organization-id">
                Organization ID
              </Label>
              <input
                id="organization-id"
                disabled
                readOnly
                value={organization?.id ?? ""}
                type="text"
                className="flex-1 bg-background font-mono text-sm"
              />
              <Button size={"sm"} className={"gap-2"} onClick={handleCopy}>
                <CopyIcon />
              </Button>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="space-y-6">
            <div className="space-y-1">
              <Label className="w-34" htmlFor="integration-id">
                Integrations
              </Label>
              <p className="text-sm text-muted-foreground">
                add the following code to your website to enable the chatbox
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {INTEGRATIONS.map((integration) => (
                <button
                  type="button"
                  key={integration.id}
                  onClick={() => handleIntegrationClick(integration.id)}
                  className="flex items-center gap-4 rounded-lg border bg-background p-4"
                >
                  <Image
                    src={integration.icon}
                    alt={integration.title}
                    width={32}
                    height={32}
                  />
                  <p className="text-sm font-medium">{integration.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export const IntergrationDialog = ({
  open,
  onOpenChange,
  snippt,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  snippt: string
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippt)
    } catch (error) {}
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Integration with Your website</DialogTitle>
          <DialogDescription>
            Copy the following snippet to integrate the chatbox into your
            website.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="rounded-md bg-accent p-2 text-sm">
              1. Copy the follwing code
            </div>
            <div className="group relative">
              <pre className="max-h-75 overflow-auto rounded-md bg-foreground p-2 font-mono text-sm break-all whitespace-pre-wrap text-secondary">
                {snippt}
              </pre>
              <Button
                size={"icon"}
                variant={"secondary"}
                className="absolute top-4 right-6 size-6 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={handleCopy}
              >
                <CopyIcon className="size-3" />
              </Button>
            </div>

            {/*  */}
            <div className="rounded-md bg-accent p-2 text-sm">
              2. Add the code in your page
            </div>
            <p className="text-sm text-muted-foreground">
              paste the chatbox snippet into your page's HTML file where you
              want the chatbox to appear.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onOpenChange.bind(null, false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default IntegrationView
