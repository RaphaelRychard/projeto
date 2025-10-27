import { api } from "../api-client"

interface ExportShortLinksResponse {
  reportUrl: string
}

export async function exportShortLinks() {
  return api.post("short-links/export").json<ExportShortLinksResponse>()
}
