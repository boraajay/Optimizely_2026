import Image from 'next/image'
import {
  LogosBlock as LogosBlockProps,
  LogoItemBlock,
} from '@/lib/optimizely/types/generated'
import { castContent } from '@/lib/optimizely/types/typeUtils'

export default function LogosBlock({ logos }: LogosBlockProps) {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-black px-4 py-16">
      <div
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-10 md:gap-16"
        data-epi-edit="logos"
      >
        {logos?.map((logo, index) => {
          const safeLogoItem = castContent<LogoItemBlock>(logo, 'LogoItemBlock')
          if (!safeLogoItem) return null

          return (
            <div key={index} className="flex items-center">
              <Image
                src={safeLogoItem.src || '/placeholder.svg'}
                alt={safeLogoItem.alt || ''}
                width={100}
                height={40}
                className="h-10 w-auto max-w-[150px] object-contain brightness-0 invert opacity-100 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.65)] md:h-12"
              />
            </div>
            
            
          )
        })}
      </div>
    </section>
  )
}
