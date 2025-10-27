export function redirectShortLink(shortLink: string) {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/${shortLink}`
}
