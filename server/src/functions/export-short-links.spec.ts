import { randomUUID } from 'node:crypto'

import { describe, expect, it, vi } from 'vitest'

import { isRight, unwrapEither } from '@/infra/shared/either'
import * as upload from '@/infra/storage/upload-file-to-storage'
import { makeShortLink } from '@/test/factories/make-short-link'

import { exportShortLinks } from './export-short-links'

describe('export short-links', () => {
  it('should be able to short-links', async () => {
    const uploadStub = vi
      .spyOn(upload, 'uploadFileToStorage')
      .mockImplementationOnce(async () => {
        return {
          key: `${randomUUID()}.csv`,
          url: 'http://example.com/file.csv',
        }
      })

    const namePattern = randomUUID()

    const shortLink1 = await makeShortLink({ shortLink: `${namePattern}.wep` })
    const shortLink2 = await makeShortLink({ shortLink: `${namePattern}.wep` })
    const shortLink3 = await makeShortLink({ shortLink: `${namePattern}.wep` })
    const shortLink4 = await makeShortLink({ shortLink: `${namePattern}.wep` })
    const shortLink5 = await makeShortLink({ shortLink: `${namePattern}.wep` })

    const sut = await exportShortLinks({
      searchQuery: namePattern,
    })

    const generatedCSVStream = uploadStub.mock.calls[0][0].contentStream
    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = []

      generatedCSVStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      generatedCSVStream.on('end', () => {
        resolve(Buffer.concat(chunks).toString('utf-8'))
      })

      generatedCSVStream.on('error', (err) => {
        reject(err)
      })
    })

    const csvAsArray = csvAsString
      .trim()
      .split('\n')
      .map((row) => row.split(','))

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).reportUrl).toBe('http://example.com/file.csv')
    expect(csvAsArray).toEqual([
      ['id', 'shortLink', 'originUrl', 'accessCount', 'createdAt'],
      [
        shortLink1.id,
        shortLink1.shortLink,
        shortLink1.originUrl,
        shortLink1.accessCount.toString(),
        expect.any(String),
      ],
      [
        shortLink2.id,
        shortLink2.shortLink,
        shortLink2.originUrl,
        shortLink2.accessCount.toString(),
        expect.any(String),
      ],
      [
        shortLink3.id,
        shortLink3.shortLink,
        shortLink3.originUrl,
        shortLink3.accessCount.toString(),
        expect.any(String),
      ],
      [
        shortLink4.id,
        shortLink4.shortLink,
        shortLink4.originUrl,
        shortLink4.accessCount.toString(),
        expect.any(String),
      ],
      [
        shortLink5.id,
        shortLink5.shortLink,
        shortLink5.originUrl,
        shortLink5.accessCount.toString(),
        expect.any(String),
      ],
    ])
  })
})
