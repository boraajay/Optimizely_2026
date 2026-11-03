import { HeroBlock as HeroBlockProps } from '@/lib/optimizely/types/generated'
import Link from 'next/link';
import {Icon} from '../ui/Icon'

export default function HeroBlock({
  title,
  description,
  subtitle,
  exploreAllPackagesDealsCTA,
  viewLiveChannelGuideCTA,
  showDecoration = true,
  decorationColorsPrimary = '#009379',
  decorationColorsSecondary = '#ffd285',
}: HeroBlockProps) {
console.log('HeroBlockProps:', { description});
  console.log("testing: ", { decorationColorsSecondary, decorationColorsPrimary, showDecoration, subtitle, title, exploreAllPackagesDealsCTA, viewLiveChannelGuideCTA });
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex min-h-[680px] w-screen items-center justify-center overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#050917] via-black to-[#0b1745] px-4 text-white lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#006DFF_1px,transparent_1px)] opacity-30 [background-size:24px_24px]" />
      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-[#006dff]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-96 w-96 rounded-full bg-[#7dd3fc]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl py-16 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#006dff]/40 bg-[#006dff]/20 px-4 py-1.5 text-xs font-semibold text-sky-300 md:text-sm">
          <Icon name="sparkles" className="w-4 h-4" />
          <h1>{title}</h1>
        </div>

        <p className="mx-auto mb-6 max-w-5xl text-4xl font-black leading-tight tracking-tight text-white md:text-7xl">
          {subtitle}
        </p>

        <p className="mx-auto mb-8 max-w-3xl text-lg font-normal leading-relaxed text-gray-300 md:text-xl">
          {description} 
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/packages"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#006dff] px-8 py-4 text-base font-bold text-white shadow-xl shadow-[#006dff]/30 transition-all hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:w-auto"
          >
           <span>Explore All Packages & Deals</span>
            <Icon name="arrow-right" className="w-5 h-5" />
          </Link>
          <Link
            href="/guide"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:w-auto"
          >
            <Icon name="tv" className="h-5 w-5 text-sky-300" />
          <span>View Live Channel Guide</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
 