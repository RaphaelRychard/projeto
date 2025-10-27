import { Link } from "lucide-react"

export function BrevLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
        <Link className="w-4 h-4 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold text-primary">brev.ly</span>
    </div>
  )
}
