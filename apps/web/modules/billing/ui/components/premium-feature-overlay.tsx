import {
  type LucideIcon,
  BookOpenIcon,
  BotIcon,
  GemIcon,
  MicIcon,
  PaletteIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

interface Feature {
  label: string
  description: string
  icon: LucideIcon
}

interface PremiumFeatureOverlayProps {
  children: React.ReactNode
}
const features: Feature[] = [
  {
    icon: GemIcon,
    label: "Exclusive Gems",
    description: "Access special gems that enhance your experience.",
  },
  {
    icon: BotIcon,
    label: "AI Assistant",
    description: "Get personalized assistance from our AI-powered bot.",
  },
  {
    icon: MicIcon,
    label: "Voice Commands",
    description:
      "Control the app using voice commands for a hands-free experience.",
  },
  {
    icon: PaletteIcon,
    label: "Custom Themes",
    description: "Personalize your app with custom themes and color schemes.",
  },
]

export const PremiumFeatureOverlay = ({
  children,
}: PremiumFeatureOverlayProps) => {
  const router = useRouter()
  return (
    <div className="relative min-h-screen min-w-screen">
      {/* Blured background content  */}
      <div className="pointer-events-none blur-[2px] select-none">
        {children}
      </div>
      {/* overlay content */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]">
        {/* background prompt */}
        <div className="absolute inset-0 z-40 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center">
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full border bg-muted">
                  <GemIcon className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
              <CardTitle className="text-xl">Premium Features</CardTitle>
              <CardDescription>
                Unlock exclusive features and enhance your experience with our
                premium plan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="mb-4 flex items-center space-x-4"
                >
                  <feature.icon className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{feature.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className="text-center">
                <Button
                  size={"lg"}
                  className={"w-full"}
                  onClick={() => {
                    router.push("/billing")
                  }}
                >
                  Upgrade to Premium
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
