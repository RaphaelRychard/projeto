import { useQuery } from "@tanstack/react-query"
import { fetchShortLinks } from "@/http/short-links/fetch-short-links"
import { ShortLinkForm } from "./short-link-form"
import { ShortLinkList } from "./short-link-list"

export function ShortLinkSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["short-links"],
    queryFn: fetchShortLinks,
  })

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ShortLinkForm />
          <ShortLinkList links={data?.shortLinks || []} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
