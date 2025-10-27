import { BrevLogo } from "./components/brev-logo"
import { Toaster } from "./components/ui/toaster"
import { ShortLinkSection } from "./components/short-link-section"

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <BrevLogo />
        </div>

        <ShortLinkSection />
      </div>
      <Toaster />
    </div>
  )
}
