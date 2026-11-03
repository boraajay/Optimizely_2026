import Link from 'next/link'
import Image from 'next/image'
import { optimizely } from '@/lib/optimizely/fetch'
import { getValidLocale } from '@/lib/optimizely/utils/language'
import { castContent, SafeContent } from '@/lib/optimizely/types/typeUtils'
import { NavItem } from '@/lib/optimizely/types/generated'
import { HeaderClient } from './headerClient'

export async function Header({ locale }: { locale: string }) {
  const locales = getValidLocale(locale)
  const { data } = await optimizely.getHeader(
    { locale: locales },
    { cacheTag: 'optimizely-header' }
  )
  const header = data?.Header?.item
  if (!header) {
    return null
  }

  const { logo, ctaHref, ctaText, navItems } = header

  // Resolve Optimizely content into plain serializable objects for the client component
  const links = (navItems ?? [])
    .map((navItem) => {
      const item = castContent<NavItem>(navItem as SafeContent, 'NavItem')
      if (!item) return null
      return { label: item.label ?? '', href: item.href ?? '/' }
    })
    .filter((l): l is { label: string; href: string } => l !== null)

  const isImageLogo = !!logo && /^(https?:)?\/\/|^\//.test(logo)

  const logoNode = (
    <Link
      href="/"
      className="flex items-center gap-2 text-2xl font-black tracking-tight text-white focus-visible-custom rounded-md"
      aria-label="DIRECTV Home"
    >
      <span className="text-brand-blue flex items-center">
        {isImageLogo ? (
          <Image src={logo as string} width={120} height={32} alt="DIRECTV" unoptimized />
        ) : (
          logo || 'DIRECTV'
        )}
        <svg
          className="w-6 h-6 ml-1 text-brand-accent"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2L2 19h20L12 2zm0 4l6.5 11h-13L12 6z" />
        </svg>
      </span>
    </Link>
  )

  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3.5 transition-all">
      <HeaderClient
        logo={logoNode}
        links={links}
        ctaHref={ctaHref ?? '/packages'}
        ctaText={ctaText ?? 'Get DIRECTV'}
      />
    </header>
  )
}
 