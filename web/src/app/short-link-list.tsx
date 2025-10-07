"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExportShortLinksButton } from "./export-short-links-button"
import { ShortLinkRow } from "./short-link-row"

export interface ShortLinkItem {
  id: string
  originUrl: string
  shortLink: string
  accessCount: number
}

export function ShortLinkList({ links }: { links: ShortLinkItem[] }) {
  if (links.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Meus links</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>Ainda não existem links cadastrados.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Meus links</CardTitle>
        <ExportShortLinksButton />
      </CardHeader>
      <CardContent className="space-y-4">
        {links.map((link) => (
          <ShortLinkRow key={link.id} link={link} />
        ))}
      </CardContent>
    </Card>
  )
}
