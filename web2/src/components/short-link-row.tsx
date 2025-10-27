"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Copy, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { deleteShortLink } from "@/http/short-links/delete-short-link"
import type { ShortLinkItem } from "./short-link-list"

export function ShortLinkRow({ link }: { link: ShortLinkItem }) {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: deleteShortLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["short-links"] })
      toast.success("Link removido com sucesso!")
    },
    onError: () => {
      toast.error("Erro ao remover link")
    },
  })

  const copyToClipboard = async (url: string) => {
    await navigator.clipboard.writeText(url)
    toast.success("Link copiado!", { description: url })
  }

  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex-1 min-w-0">
        <a
          href={`https://brev.ly/${link.shortLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary hover:underline block"
        >
          brev.ly/{link.shortLink}
        </a>
        <p className="truncate text-sm text-muted-foreground">{link.originUrl}</p>
      </div>

      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap text-sm text-muted-foreground">{link.accessCount} acessos</span>

        <Button variant="outline" size="sm" onClick={() => copyToClipboard(`https://brev.ly/${link.shortLink}`)}>
          <Copy className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => deleteMutation.mutate(link.id)}
          disabled={deleteMutation.isPending}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
