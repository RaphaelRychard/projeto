"use client"

import { useEffect, useState } from "react"
import { BrevLogo } from "@/components/brev-logo"

export default function RedirectPage() {
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          window.location.href = "/"
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-card rounded-lg p-8 shadow-sm">
          <div className="mb-6">
            <BrevLogo />
          </div>

          <h1 className="text-2xl font-semibold text-foreground mb-4">Redirecionando...</h1>

          <p className="text-muted-foreground mb-4 leading-relaxed">
            O link será aberto automaticamente em alguns instantes.
          </p>

          <p className="text-sm text-muted-foreground">
            Não foi redirecionado?{" "}
            <a href="/" className="text-primary hover:underline">
              Acesse aqui
            </a>
          </p>

          {countdown > 0 && <div className="mt-4 text-sm text-muted-foreground">Redirecionando em {countdown}...</div>}
        </div>
      </div>
    </div>
  )
}
