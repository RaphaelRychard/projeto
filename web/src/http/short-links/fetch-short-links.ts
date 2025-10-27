import { api } from '../api-client'

export interface ShortLink {
  id: string
  originUrl: string
  shortLink: string
  accessCount: number
}

export interface FetchShortLinksResponse {
  shortLinks: ShortLink[]
}

export async function fetchShortLinks() {
  const result = api
    .get('short-links')
    .json<FetchShortLinksResponse>()

  return result
}
