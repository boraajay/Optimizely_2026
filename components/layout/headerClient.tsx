'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'

type NavLink = { label: string; href: string }

type HeaderClientProps = {
  logo: ReactNode
  links: NavLink[]
  ctaHref: string
  ctaText: string
}

type ZipStatus = { ok: boolean; message: string }

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function BagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function MenuIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      {open ? (
        <path d="M6 6l12 12M18 6 6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  )
}

export function HeaderClient({ logo, links, ctaHref, ctaText }: HeaderClientProps) {
  const pathname = usePathname()

  const [zipCode, setZipCode] = useState('90210')
  const [tempZip, setTempZip] = useState('90210')
  const [isZipModalOpen, setIsZipModalOpen] = useState(false)
  const [zipStatus, setZipStatus] = useState<ZipStatus | null>(null)

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartCount] = useState(1)

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Close modals on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZipModalOpen(false)
        setIsCartOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname?.startsWith(`${href}/`)

  const submitZip = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^\d{5}$/.test(tempZip)) {
      setZipStatus({ ok: false, message: 'Please enter a valid 5-digit ZIP code.' })
      return
    }
    setZipCode(tempZip)
    setZipStatus({ ok: true, message: `Showing channels available in ${tempZip}.` })
    setTimeout(() => {
      setIsZipModalOpen(false)
      setZipStatus(null)
    }, 900)
  }

  return (
    <>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          {logo}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main">
            {links.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all focus-visible-custom ${
                  isActive(item.href)
                    ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/30'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setTempZip(zipCode)
              setIsZipModalOpen(true)
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-deepNavy border border-white/15 text-xs lg:text-sm hover:border-brand-blue transition-colors focus-visible-custom text-gray-200"
            title="Check local channel availability"
          >
            <MapPinIcon className="w-4 h-4 text-brand-accent" />
            <span>
              Zip: <strong className="text-white">{zipCode}</strong>
            </span>
          </button>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors focus-visible-custom"
            aria-label="View Order Summary"
          >
            <BagIcon className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 bg-brand-blue text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
              {cartCount}
            </span>
          </button>

          <Link
            href={ctaHref}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm transition-all shadow-md shadow-brand-blue/30 focus-visible-custom"
          >
            {ctaText}
          </Link>
          <button style={{color: 'white'}} className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm transition-all shadow-md shadow-brand-blue/30 focus-visible-custom">
            sign in
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white focus-visible-custom"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <MenuIcon open={isMenuOpen} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <nav className="md:hidden max-w-7xl mx-auto mt-3 flex flex-col gap-1 border-t border-white/10 pt-3" aria-label="Mobile">
          {links.map((item) => (
            <Link
              key={`m-${item.href}-${item.label}`}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                isActive(item.href) ? 'bg-brand-blue text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={ctaHref}
            className="mt-2 sm:hidden inline-flex items-center justify-center px-5 py-2 rounded-full bg-brand-blue text-white font-semibold text-sm"
          >
            {ctaText}
          </Link>
        </nav>
      )}

      {/* ZIP modal */}
      {isZipModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="zip-title"
          onClick={() => setIsZipModalOpen(false)}
        >
          <form
            onSubmit={submitZip}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-brand-deepNavy border border-white/15 p-6 shadow-2xl"
          >
            <h2 id="zip-title" className="text-lg font-bold text-white">
              Check channel availability
            </h2>
            <p className="mt-1 text-sm text-gray-400">Enter your ZIP code to see local channels.</p>
            <input
              autoFocus
              inputMode="numeric"
              maxLength={5}
              value={tempZip}
              onChange={(e) => setTempZip(e.target.value.replace(/\D/g, ''))}
              className="mt-4 w-full rounded-lg bg-black/60 border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-brand-blue"
              aria-label="ZIP code"
            />
            {zipStatus && (
              <p className={`mt-2 text-sm ${zipStatus.ok ? 'text-green-400' : 'text-red-400'}`} role="status">
                {zipStatus.message}
              </p>
            )}
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsZipModalOpen(false)}
                className="px-4 py-2 rounded-full text-sm text-gray-300 hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-brand-blue hover:bg-blue-600 text-white text-sm font-semibold"
              >
                Check
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cart drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70" onClick={() => setIsCartOpen(false)}>
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Order summary"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md h-full bg-brand-deepNavy border-l border-white/15 p-6 flex flex-col"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Order Summary</h2>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-white"
                aria-label="Close order summary"
              >
                ✕
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-400">
                Your order includes 1 package and {cartCount - 1} add-on{cartCount - 1 !== 1 ? 's' : ''}.
            </p>
            <Link
              href="/packages"
              onClick={() => setIsCartOpen(false)}
              className="mt-auto inline-flex items-center justify-center px-5 py-3 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-semibold text-sm"
            >
              Continue to packages
            </Link>
          </aside>
        </div>
      )}
    </>
  )
}
 