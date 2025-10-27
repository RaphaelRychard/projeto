"use server"

import { HTTPError } from "ky"
import { revalidateTag } from "next/cache"
import { z } from "zod"

import { createShortLink } from "@/http/short-links/create-short-link"
import { deleteShortLink } from "@/http/short-links/delete-short-link"
import { exportShortLinks } from "@/http/short-links/export-short-links"

const createSchema = z.object({
  origemUrl: z.string().url(),
  shortLink: z.string()
    .min(4, "O link deve ter pelo menos 4 caracteres")
    .max(20, "O link deve ter no máximo 20 caracteres")
    .regex(/^[a-zA-Z0-9-_]+$/, "Apenas letras, números, hífen e underscore"),
})

export async function createShortLinkAction(data: FormData) {
  const parsed = createSchema.safeParse(Object.fromEntries(data))

  if (!parsed.success) {
    return {
      success: false,
      message: null,
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const { origemUrl, shortLink } = parsed.data


  try {
    await createShortLink({
      origemUrl,
      shortLink,
    })

    revalidateTag("short-links")

    return {
      success: true,
      message: "Link criado com sucesso!",
      errors: null,
    }
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { success: false, message, errors: null }
    }

    return {
      success: false,
      message: "Erro inesperado. Tente novamente mais tarde.",
      errors: null,
    }
  }
}

const deleteSchema = z.object({
  linkId: z.string().cuid2(),
})

export async function deleteShortLinkAction(data: FormData) {
  const parsed = deleteSchema.safeParse(Object.fromEntries(data))

  if (!parsed.success) {
    return {
      success: false,
      message: null,
      errors: parsed.error.flatten().fieldErrors,
    }
  }


  try {
    const { linkId } = parsed.data

    await deleteShortLink({ linkId })
    revalidateTag("short-links")

    return {
      success: true,
      message: "Link removido com sucesso!",
      errors: null,
    }
  } catch {
    return {
      success: false,
      message: "Erro ao remover link",
      errors: null,
    }
  }
}


export async function exportShortLinksAction() {
  try {
    const { reportUrl } = await exportShortLinks()

    return {
      success: true,
      message: reportUrl,
      errors: null,
    }
  } catch {
    return {
      success: false,
      message: "Erro ao exportar links",
      errors: null,
    }
  }
}
