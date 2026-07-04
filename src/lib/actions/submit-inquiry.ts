'use server'

import { submitInquiry } from '@/lib/submit-inquiry'
import type { InquiryPayload } from '@/lib/cms-types'

export async function submitInquiryAction(data: InquiryPayload) {
  try {
    return await submitInquiry(data)
  } catch (error) {
    console.error('[inquiries] submit failed:', error)
    return { ok: false, error: 'Failed to submit. Please try WhatsApp or email instead.' }
  }
}
