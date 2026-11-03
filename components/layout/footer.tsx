import Link from 'next/link'
import { Icons } from '@/components/ui/icons'
import { getValidLocale } from '@/lib/optimizely/utils/language'
import { optimizely } from '@/lib/optimizely/fetch'
import { castContent, SafeContent } from '@/lib/optimizely/types/typeUtils'
import {
  SocialLink,
  FooterColumn,
  NavItem,
} from '@/lib/optimizely/types/generated'

export async function Footer({ locale }: { locale: string }) {
  const locales = getValidLocale(locale)
  const { data } = await optimizely.getFooter(
    { locales: locales },
    { cacheTag: 'optimizely-footer' }
  )
  const footer = data?.Footer?.item
  if (!footer) {
    return null
  }

  const { columns, socialLinks, copyrightText, directTV } = footer

  return (
    <footer className="bg-black border-t border-white/10 text-gray-300 text-xs py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {columns?.map((columnItem, index) => {
            const column = castContent<FooterColumn>(
              columnItem as SafeContent,
              'FooterColumn'
            )
            if (!column) return null

            return (
              <div key={index}>
                <h3 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-white">
                  {column?.title}
                </h3>
                <nav className="grid gap-2.5" aria-label={column?.title ?? undefined}>
                  {column?.links?.map((linkItem, linkIndex) => {
                    const link = castContent<NavItem>(
                      linkItem as SafeContent,
                      'NavItem'
                    )
                    if (!link){ 
                      console.warn(`Social Invalid link item in column ${index}:`, link);
                      console.warn('linkItem:', linkItem);
                      return null
                    }

                    return (
                      <Link
                        key={linkIndex}
                        href={link.href ?? '/'}
                        className="text-[11px] text-gray-400 hover:text-white transition-colors focus-visible-custom rounded-md w-fit"
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            )
          })}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">{directTV?.title}</h4>
            <p className="text-[11px] mb-3 text-gray-400">{directTV?.description}</p>
            <div className="flex gap-2">
              {directTV?.appCTA?.map((linkItem, linkIndex) => {
                const safeItem = linkItem ? { ...linkItem, __typename: 'NavItem' } : null;
                const appLink = castContent<NavItem>(
                  safeItem as SafeContent,
                  'NavItem'
                );

                if (!appLink) return null

                return (
                  <a
                    key={linkIndex}
                    href={appLink.href || '/'}
                    className="bg-black border border-white/20 p-2 rounded text-center text-[11px] flex-1"
                  >
                    {appLink.label}
                  </a>
                )
              })}
            </div>            
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-gray-500 text-center md:text-left">
            {copyrightText}
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white underline text-xs text-gray-500 text-center md:text-left">Privacy Policy</a>
            <a href="#" className="hover:text-white underline text-xs text-gray-500 text-center md:text-left">Terms of Service</a>
            <a href="#" className="hover:text-white underline text-xs text-gray-500 text-center md:text-left">Accessibility Statement</a>
          </div>
          </div>
          <div className="flex gap-3 p-4">
            {socialLinks?.map((linkItem, index) => {
              const link = castContent<SocialLink>(
                linkItem as SafeContent,
                'SocialLink'
              )
              if (!link) return null
              const platform = (link?.platform ?? '') as keyof typeof Icons
              const Icon = platform ? Icons?.[platform] : null

              return (
                <Link
                  key={index}
                  href={link?.href ?? '/'}
                  aria-label={link?.platform ?? 'Social link'}
                  className="p-2 rounded-full bg-slate-500 border border-white/10 text-gray-400 hover:text-white hover:border-brand-blue hover:bg-brand-blue/20 transition-colors focus-visible-custom"
                >
                  {Icon && <Icon className="h-5 w-5" />}
                </Link>
              )
            })}
          </div>

      </div>
    </footer>
  )
}
 