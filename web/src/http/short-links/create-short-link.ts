import { api } from "../api-client"

interface CreateShortLinkRequest {
  origemUrl: string
  shortLink: string
}

interface CreateShortLinkResponse {
  id: string
}

export async function createShortLink({ origemUrl, shortLink }: CreateShortLinkRequest) {
  return api
    .post("short-links", {
      json: { origemUrl, shortLink },
    })
    .json<CreateShortLinkResponse>()
}
