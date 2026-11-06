import ContentAreaMapper from '@/components/content-area/mapper'
import DraftModeHomePage from '@/components/draft/draft-mode-homepage'
import { DraftModeLoader } from '@/components/draft/draft-mode-loader'
import { optimizely } from '@/lib/optimizely/fetch'
import { getValidLocale } from '@/lib/optimizely/utils/language'
import { generateAlternates } from '@/lib/utils/metadata'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await props.params
  const locales = getValidLocale(locale)
  const pageResp = await optimizely.GetStartPage({ locales, key: process.env.OPTIMIZELY_PACKAGES_PAGE_KEY ?? "8811f7d497304e9091e10e8d4b5f227a" })
  const page = pageResp.data?.StartPage?.item
  if (!page) {
    return {}
  }

  return {
    title: page.title,
    description: page.shortDescription || '',
    keywords: page.keywords ?? '',
    alternates: generateAlternates(locale, '/'),
  }
}

export default async function PackagesPage(props: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await props.params
  const locales = getValidLocale(locale)
  const { isEnabled: isDraftModeEnabled } = await draftMode()
  if (isDraftModeEnabled) {
    return (
      <Suspense fallback={<DraftModeLoader />}>
        <DraftModeHomePage locales={locales} />
      </Suspense>
    )
  }

  // const startPageUrl = process.env.OPTIMIZELY_START_PAGE_URL ?? "/directtv"
  const startPageKey = process.env.OPTIMIZELY_PACKAGES_PAGE_KEY ?? "8811f7d497304e9091e10e8d4b5f227a"
  const pageResponse = await optimizely.GetStartPage({ locales, key: startPageKey })

  const startPage = pageResponse.data?.StartPage?.item
  const blocks = (startPage?.blocks ?? []).filter(
    (block) => block !== null && block !== undefined
  )
  console.log('startPage', startPage)
  console.log('blocks', blocks)
  return (
    <>
      <Suspense>
        <ContentAreaMapper blocks={blocks} />
      </Suspense>
    </>
  )
}
