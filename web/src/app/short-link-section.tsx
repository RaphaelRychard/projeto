import { Toaster } from "@/components/ui/toaster"
import { fetchShortLinks } from "@/http/short-links/fetch-short-links"
import { ShortLinkForm } from "./short-link-form"
import { ShortLinkList } from "./short-link-list"

export async function ShortLinkSection() {

  const { shortLinks } = await fetchShortLinks()

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ShortLinkForm />
          <ShortLinkList links={shortLinks} />
        </div>
      </div>
      <Toaster />
    </div>
  )
}
