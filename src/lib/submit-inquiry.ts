import { getPayload } from '@/lib/payload'
import type { InquiryPayload } from '@/lib/cms-types'

export type SubmitInquiryResult =
  | { ok: true; id?: number; offline?: boolean }
  | { ok: false; error: string }

export async function submitInquiry(data: InquiryPayload): Promise<SubmitInquiryResult> {
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
    console.warn('[inquiries] CMS unavailable — inquiry logged only:', data)
    return { ok: true, offline: true }
  }

  const payload = await getPayload()
  const doc = await payload.create({
    collection: 'inquiries',
    data: {
      type: data.type,
      inquiryType: data.inquiryType,
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      neighborhood: data.neighborhood,
      message: data.message,
      status: 'new',
    },
  })

  return { ok: true, id: doc.id }
}
