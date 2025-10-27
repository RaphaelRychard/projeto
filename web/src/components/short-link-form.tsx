"use client"

import type React from "react"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AlertTriangle, Loader2 } from "lucide-react"
import { HTTPError } from "ky"
import { z } from "zod"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createShortLink } from "@/http/short-links/create-short-link"
import { toast } from "sonner"

const createSchema = z.object({
  origemUrl: z.string().url("URL inválida"),
  shortLink: z
    .string()
    .min(4, "O link deve ter pelo menos 4 caracteres")
    .max(20, "O link deve ter no máximo 20 caracteres")
    .regex(/^[a-zA-Z0-9-_]+$/, "Apenas letras, números, hífen e underscore"),
})

export function ShortLinkForm() {
  const queryClient = useQueryClient()
  const [origemUrl, setOrigemUrl] = useState("")
  const [shortLink, setShortLink] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: createShortLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["short-links"] })
      toast.success("Link criado com sucesso!")
      setOrigemUrl("")
      setShortLink("")
      setErrors({})
      setErrorMessage(null)
    },
    onError: async (error) => {
      if (error instanceof HTTPError) {
        try {
          const { message } = await error.response.json()
          setErrorMessage(message)
        } catch {
          setErrorMessage("Erro ao criar link")
        }
      } else {
        setErrorMessage("Erro inesperado. Tente novamente mais tarde.")
      }
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setErrorMessage(null)

    const parsed = createSchema.safeParse({ origemUrl, shortLink })

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    mutation.mutate(parsed.data)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="size-4" />
          <AlertTitle>Erro ao criar link</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-foreground">Novo link</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="origemUrl" className="text-xs font-semibold text-muted-foreground">
              LINK ORIGINAL
            </Label>
            <Input
              id="origemUrl"
              name="origemUrl"
              type="url"
              placeholder="https://www.exemplo.com"
              className="h-12"
              value={origemUrl}
              onChange={(e) => setOrigemUrl(e.target.value)}
            />
            {errors.origemUrl && <p className="text-xs text-red-500">{errors.origemUrl}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortLink" className="text-xs font-semibold text-muted-foreground">
              LINK ENCURTADO
            </Label>
            <div className="flex h-12">
              <span
                className="inline-flex items-center px-4 
               bg-muted text-muted-foreground
               border border-muted rounded-l-lg border-r-0"
              >
                brev.ly/
              </span>
              <Input
                id="shortLink"
                name="shortLink"
                type="text"
                placeholder="meu-link"
                className="rounded-l-none h-full px-4"
                value={shortLink}
                onChange={(e) => setShortLink(e.target.value)}
              />
            </div>

            {errors.shortLink && <p className="text-xs text-red-500">{errors.shortLink}</p>}
          </div>

          <Button type="submit" disabled={mutation.isPending} className="w-full h-12">
            {mutation.isPending ? <Loader2 className="size-4 animate-spin" /> : "Salvar link"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
