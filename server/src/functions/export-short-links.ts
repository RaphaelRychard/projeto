import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'

import { stringify } from 'csv-stringify'

import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/infra/shared/either'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage'

type ExportShortLinksOutput = {
  reportUrl: string
}

export async function exportShortLinks(): Promise<Either<never, ExportShortLinksOutput>> {

  const { sql, params } = db
    .select({
      id: schema.shortLinks.id,
      shortLink: schema.shortLinks.shortLink,
      originUrl: schema.shortLinks.originUrl,
      accessCount: schema.shortLinks.accessCount,
      createdAt: schema.shortLinks.createdAt,
    })
    .from(schema.shortLinks)
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(50)

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'id', header: 'id' },
      { key: 'short_link', header: 'shortLink' },
      { key: 'origin_url', header: 'originUrl' },
      { key: 'access_count', header: 'accessCount' },
      { key: 'created_at', header: 'createdAt' },
    ],
  })

  const uploadToStorageStream = new PassThrough()

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }

        callback()
      },
    }),
    csv,
    uploadToStorageStream,
  )

  const uploadToStorage = uploadFileToStorage({
    contentType: 'text/csv',
    folder: 'downloads',
    fileName: `${new Date().toDateString()}-uploads.csv`,
    contentStream: uploadToStorageStream,
  })

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

  return makeRight({ reportUrl: url })
}
