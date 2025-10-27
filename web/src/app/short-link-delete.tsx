"use client"

import { Copy, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useFormState } from "@/hooks/use-form-state"
import { deleteShortLinkAction } from "./actions"
import type { ShortLinkItem } from "./short-link-list"

export function ShortLinkRow({ link }: { link: ShortLinkItem }) {
  const [, handleDelete] = useFormState(deleteShortLinkAction, { resetOnSuccess: true })

  return (
    <form action={handleDelete.bind}>
      <input type="hidden" name="id" value={link.id} />
      <Button type="submit" variant="outline" size="sm">
        <Trash2 className="h-4 w-4" />
      </Button>
    </form>
  )
}
