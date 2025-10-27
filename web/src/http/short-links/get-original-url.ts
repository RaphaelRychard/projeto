import { api } from '../api-client'

export interface GetOriginalUrlResponse {
  originUrl: string
}

export async function getOriginalUrl(shortLink: string) {
  return api
    .get(`short-link/${shortLink}`)
    .json<GetOriginalUrlResponse>()
}
