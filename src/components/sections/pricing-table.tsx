'use client'

import { SectionEntrance } from '@/components/motion/section-entrance'
import { SectionHeader } from '@/components/ui/section-header'
import type { PricingTableRow } from '@/lib/cms-types'
import { DEFAULT_PRICING } from '@/lib/defaults'

type PricingTableProps = {
  rows?: PricingTableRow[]
  lastUpdated?: string
}

export function PricingTable({
  rows = DEFAULT_PRICING.tableRows,
  lastUpdated = DEFAULT_PRICING.lastUpdated,
}: PricingTableProps) {
  return (
    <section className="py-12 max-w-4xl mx-auto px-5">
      <SectionHeader title="Clear, Upfront Pricing" />

      <SectionEntrance>
        <div className="double-bezel">
          <div className="double-bezel-inner !p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-surface-container-high border-b border-outline-variant/30">
                  <tr>
                    <th className="p-6 font-bold text-[14px]">Service Type</th>
                    <th className="p-6 font-bold text-[14px]">Booking Fee</th>
                    <th className="p-6 font-bold text-[14px]">Daily/Monthly Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {rows.map((row) => (
                    <tr key={row.service} className="hover:bg-surface-container-low transition-colors">
                      <td className="p-6">{row.service}</td>
                      <td className="p-6 text-primary font-semibold">{row.bookingFee}</td>
                      <td className="p-6">{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p className="text-[12px] text-center mt-6 text-on-surface-variant">
          Last updated: {lastUpdated}. All rates exclude statutory taxes.
        </p>
      </SectionEntrance>
    </section>
  )
}
