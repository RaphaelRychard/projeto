export class ShortLinkAlreadyExists extends Error {
  constructor(shortLink: string) {
    super(`The shortened URL "/${shortLink}" already exists.`)
  }
}
