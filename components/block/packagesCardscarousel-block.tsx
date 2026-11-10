'use client';
import React, { useRef } from 'react';
import { PackageCardItem, PackageCardsCarousel as PackageCardsProps } from '@/lib/optimizely/types/generated';
import { castContent, SafeContent } from '@/lib/optimizely/types/typeUtils';

export default function PackageCardsCarousel({ Title, PackageItems }: PackageCardsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#0a0711] py-16 px-4 sm:px-6 lg:px-8 text-white relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header & Carousel Controls */}
        <div className="flex items-center justify-between mb-10">
          {Title ? (
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {Title}
            </h2>
          ) : <div />}

          {/* Carousel Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-[#1a1325] border border-purple-900/50 hover:bg-purple-900/60 flex items-center justify-center text-white transition-colors shadow"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-[#1a1325] border border-purple-900/50 hover:bg-purple-900/60 flex items-center justify-center text-white transition-colors shadow"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Carousel Container */}
        <div
          ref={scrollRef}
          className="flex flex-row gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PackageItems?.map((item, index) => {
            const rawItem = item ? { ...item, __typename: 'PackageCardItem' } : null;
            const packageItem = castContent<PackageCardItem>(rawItem as SafeContent, 'PackageCardItem');

            const badge = packageItem?.Badge;
            const title = packageItem?.Title;
            const subtitle = packageItem?.Subtitle;
            const channelLogos = packageItem?.ChannelLogos || [];
            const posterImages = packageItem?.PosterImages || [];
            const specialPriceText = packageItem?.SpecialPriceText;
            const specialPrice = packageItem?.SpecialPrice;
            const price = packageItem?.Price;
            const pricePeriod = packageItem?.PricePeriod;
            const ctaUrl = packageItem?.CTA?.url?.default;

            return (
              <div
                key={index}
                className="snap-start flex-shrink-0 w-[300px] sm:w-[340px] relative flex flex-col justify-between rounded-3xl bg-[#130d1e] border border-purple-900/30 p-6 shadow-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300"
              >
                {/* Top Badge */}
                {badge && (
                  <div className="absolute top-0 right-0 z-10">
                    <span className="inline-block bg-amber-300 text-slate-950 text-xs font-bold px-4 py-1.5 rounded-bl-2xl rounded-tr-3xl shadow">
                      {badge}
                    </span>
                  </div>
                )}

                {/* Top Content Group (Title, Subtitle, & Channel Logos) */}
                <div>
                  <div className="space-y-1 pt-2">
                    <h3 className="text-xl font-bold tracking-tight text-white">
                      {title}
                    </h3>
                    {subtitle && (
                      <p className="text-xs text-slate-400 font-medium">
                        {subtitle}
                      </p>
                    )}
                  </div>

                  {/* Channel Logos (Aligned with consistent min-height container) */}
                  <div className="my-6 flex flex-wrap items-center gap-3 min-h-[56px] content-start">
                    {channelLogos.map((logoItem, logoIdx) => {
                      const logoUrl = logoItem?.url?.default;
                      return logoUrl ? (
                        <div key={logoIdx} className="h-7 w-auto flex items-center justify-center">
                          <img
                            src={logoUrl}
                            alt={`Channel logo ${logoIdx + 1}`}
                            className="h-full w-auto object-contain max-h-7"
                          />
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Movie / Show Poster Section (Pinned uniformly at bottom via mt-auto) */}
                <div className="mt-auto mb-6 w-full flex items-end">
                  <div className="flex flex-row gap-2 overflow-x-auto w-full">
                    {posterImages.map((posterItem, posterIdx) => {
                      const posterUrl = posterItem?.url?.default;
                      return posterUrl ? (
                        <div 
                          key={posterIdx} 
                          className="relative w-full h-32 rounded-lg overflow-hidden bg-slate-900/40 flex-shrink-0"
                        >
                          <img
                            src={posterUrl}
                            alt={`Show poster ${posterIdx + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Bottom Pricing & CTA Row */}
                <div className="pt-4 border-t border-purple-950/60 flex items-end justify-between">
                  <div>
                    {specialPriceText && (
                      <div className="mb-1">
                        <span className="bg-amber-300 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded">
                          {specialPriceText}
                        </span>
                      </div>
                    )}
                    {specialPrice && (
                      <div className="text-xs text-slate-500 line-through">
                        {specialPrice}
                      </div>
                    )}
                    <div className="text-white font-normal text-sm flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-white">
                        {price}
                      </span>
                      {pricePeriod && (
                        <span className="text-slate-400 text-xs font-medium">
                          {pricePeriod}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Arrow Button */}
                  <a
                    href={ctaUrl ?? "#"}
                    className="w-9 h-9 rounded-full bg-purple-950/80 hover:bg-purple-800 text-white flex items-center justify-center transition-colors shadow focus:outline-none"
                    aria-label="View package details"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}