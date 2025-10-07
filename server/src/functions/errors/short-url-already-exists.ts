export class ShortUrlAlreadyExists extends Error {
  constructor(url: string) {
    super(`The shortened LINK "/${url}" already exists.`)
  }
}
