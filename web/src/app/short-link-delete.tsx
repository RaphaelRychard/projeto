"use client"

import { Copy, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useFormState } from "@/hooks/use-form-state"
import { deleteShortLinkAction } from "./actions"
import type { ShortLinkItem } from "./short-link-list"

export function ShortLinkDelete({ linkId }: { linkId: string }) {
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    deleteShortLinkAction,
    { resetOnSuccess: true }
  )


  console.log(errors)
  console.log(message)
  console.log(success)
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="linkId" value={linkId} />
      <Button type="submit" variant="destructive" size="sm">
        <Trash2 className="h-4 w-4" />
      </Button>
    </form>
  )
}
