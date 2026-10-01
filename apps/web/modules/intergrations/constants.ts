export const INTEGRATIONS = [
  {
    id: "HTML",
    title: "HTML",
    icon: "/languages/html5.svg",
  },
  {
    id: "REACT",
    title: "React",
    icon: "/languages/react.svg",
  },
  {
    id: "NEXT",
    title: "Next.js",
    icon: "/languages/nextjs.svg",
  },
  {
    id: "JAVASCRIPT",
    title: "JavaScript",
    icon: "/languages/javascript.svg",
  },
] as const

export type IntegrationId = (typeof INTEGRATIONS)[number]["id"]
export const HTML_SCRIPT = `<script src="https://localhost:3001/widget.js" data-organization-id="{{ORGANIZATION_ID}}" ></script>`
export const REACT_SCRIPT = `<script src="https://localhost:3001/widget.js" data-organization-id="{{ORGANIZATION_ID}}" ></script>`
export const NEXT_SCRIPT = `<script src="https://localhost:3001/widget.js" data-organization-id="{{ORGANIZATION_ID}}" ></script>`
export const JAVASCRIPT_SCRIPT = `<script src="https://localhost:3001/widget.js" data-organization-id="{{ORGANIZATION_ID}}" ></script>`
