import { api } from "../api-client"

export async function deleteShortLink(id: string) {
  return api.delete(`short-links/${id}`)
}
