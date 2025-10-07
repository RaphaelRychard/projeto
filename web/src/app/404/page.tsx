export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-card rounded-lg p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="text-6xl font-bold text-primary mb-4 relative">
              <span className="relative inline-block">
                4<span className="absolute inset-0 text-primary/20 transform translate-x-1 translate-y-1">4</span>
                <span className="absolute inset-0 text-primary/10 transform translate-x-2 translate-y-2">4</span>
              </span>
              <span className="relative inline-block mx-2">
                0<span className="absolute inset-0 text-primary/20 transform translate-x-1 translate-y-1">0</span>
                <span className="absolute inset-0 text-primary/10 transform translate-x-2 translate-y-2">0</span>
              </span>
              <span className="relative inline-block">
                4<span className="absolute inset-0 text-primary/20 transform translate-x-1 translate-y-1">4</span>
                <span className="absolute inset-0 text-primary/10 transform translate-x-2 translate-y-2">4</span>
              </span>
            </h1>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Link não encontrado</h2>

          <p className="text-muted-foreground mb-6 leading-relaxed">
            O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em{" "}
            <a href="/" className="text-primary hover:underline">
              brev.ly
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
