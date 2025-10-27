"use client"

import { AlertTriangle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState } from "@/hooks/use-form-state"
import { createShortLinkAction } from "./actions"

export function ShortLinkForm() {
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    createShortLinkAction,
    { resetOnSuccess: true }
  )

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {success === false && message && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="size-4" />
          <AlertTitle>Erro ao criar link</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-foreground">
            Novo link
          </CardTitle>
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
            />
            {errors?.origemUrl && (
              <p className="text-xs text-red-500">{errors.origemUrl[0]}</p>
            )}
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
              />
            </div>

            {errors?.shortLink && (
              <p className="text-xs text-red-500">{errors.shortLink[0]}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12"
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Salvar link"
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
