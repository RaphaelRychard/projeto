"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFormState } from "@/hooks/use-form-state"
import { exportShortLinksAction } from "./actions"

export function ExportShortLinksButton() {
  const [, handleExport, isPending] = useFormState(
    async () => {
      const result = await exportShortLinksAction()

      if (result.success && result.message) {
        // abre a URL em uma nova aba
        window.open(result.message, "_blank")
      }

      return result
    }
  )

  return (
    <form action={handleExport.bind}>
      <Button type="submit" variant="outline" size="sm" disabled={isPending}>
        <Download className="w-4 h-4 mr-2" />
        {isPending ? "Gerando..." : "Baixar CSV"}
      </Button>
    </form>
  )
}
