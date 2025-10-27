import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { ExportShortLinksButton } from "./export-short-links-button"
import { ShortLinkRow } from "./short-link-row"

export interface ShortLinkItem {
  id: string
  originUrl: string
  shortLink: string
  accessCount: number
}

interface ShortLinkListProps {
  links: ShortLinkItem[]
  isLoading: boolean
}

export function ShortLinkList({ links, isLoading }: ShortLinkListProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Meus links</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

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
      <CardHeader className="flex flex-row justify-between items-center">
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
