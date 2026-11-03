import type React from 'react' // Import React
import { Icon } from '../ui/Icon'
import Link from 'next/link'
import {
  ServicesBlock as ServicesBlockProps,
  ServiceItem,
} from '@/lib/optimizely/types/generated'
import { castContent } from '@/lib/optimizely/types/typeUtils'
import { IconName } from '../types'

export default function ServicesBlock({ Title, Description, CtaButtonText,services }: ServicesBlockProps) {
  return (
    <section className="relative isolate mx-auto max-w-7xl px-4 py-16 text-white before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:bg-black before:content-[''] lg:px-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
            {Title}
          </span>
          <h2 className="mt-1 text-3xl font-black text-white">{Description}</h2>
        </div>
        <Link href="/" className="flex items-center gap-1 text-sm font-semibold text-sky-300 hover:underline">
          {CtaButtonText}
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {services?.map((serviceItem, index) => {
          const service = castContent<ServiceItem>(serviceItem, 'ServiceItem')
          if (!service) return null

          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#080b1b] p-6 text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-950/40"
            >
            <div className="mb-4 flex items-center justify-between">
              <span className={`${service.BadgeClass} rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white`}>
                {service.packageHighlights}
              </span>
              <Icon name={(service.icon ?? 'default-icon-name') as IconName} className="h-5 w-5 text-sky-300" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">{service.title}</h3>
            <p className="mb-4 text-sm text-gray-300">{service.description}</p>
            <div className="text-sm font-semibold text-sky-300">{service.packageHighlights}</div>
          </div>
          
          )
        })}
      </div>
    </section>
  )
}
 