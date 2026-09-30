import {
  HTML_SCRIPT,
  type IntegrationId,
  JAVASCRIPT_SCRIPT,
  NEXT_SCRIPT,
  REACT_SCRIPT,
} from "./constants"

export const createScript = (
  integrationId: IntegrationId,
  organizationId: string
) => {
  if (integrationId == "HTML") {
    return HTML_SCRIPT.replace(/{{ORGANIZATION_ID}}/g, organizationId)
  }
  if (integrationId == "REACT") {
    return REACT_SCRIPT.replace(/{{ORGANIZATION_ID}}/g, organizationId)
  }
  if (integrationId == "NEXT") {
    return NEXT_SCRIPT.replace(/{{ORGANIZATION_ID}}/g, organizationId)
  }
  if (integrationId == "JAVASCRIPT") {
    return JAVASCRIPT_SCRIPT.replace(/{{ORGANIZATION_ID}}/g, organizationId)
  }
  return ""
}
