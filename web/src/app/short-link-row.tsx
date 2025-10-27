"use client"

import { Copy, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useFormState } from "@/hooks/use-form-state"
import { deleteShortLinkAction } from "./actions"
import type { ShortLinkItem } from "./short-link-list"

export function ShortLinkRow({ link }: { link: ShortLinkItem }) {
  const { toast } = useToast()
  const [, handleDelete] = useFormState(deleteShortLinkAction, { resetOnSuccess: true })

  const copyToClipboard = async (url: string) => {
    await navigator.clipboard.writeText(url)
    toast({ title: "Link copiado!", description: url })
  }

  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <a
        href={`/short-link/${link.shortLink}`}
        className="font-semibold text-primary hover:underline"
      >
        brev.ly/{link.shortLink}
        <p className="truncate text-sm text-muted-foreground">{link.originUrl}</p>
      </a>

      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap text-sm text-muted-foreground">
          {link.accessCount} acessos
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => copyToClipboard(`brev.ly/${link.shortLink}`)}
        >
          <Copy className="h-4 w-4" />
        </Button>

        <deleteShortLinkActionForm linkId={link.id} />
      </div>
    </div>
  )
}
