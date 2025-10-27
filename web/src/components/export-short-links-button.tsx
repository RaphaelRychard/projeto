"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { exportShortLinks } from "@/http/short-links/export-short-links"
import { toast } from "sonner"

export function ExportShortLinksButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleExport = async () => {
    setIsLoading(true)
    try {
      const { reportUrl } = await exportShortLinks()
      window.open(reportUrl, "_blank")
      toast.success("Relatório gerado com sucesso!")
    } catch {
      toast.error("Erro ao exportar links")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="outline" size="sm" disabled={isLoading} onClick={handleExport}>
      <Download className="w-4 h-4 mr-2" />
      {isLoading ? "Gerando..." : "Baixar CSV"}
    </Button>
  )
}
