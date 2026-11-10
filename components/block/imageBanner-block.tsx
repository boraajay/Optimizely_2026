import React from 'react';
import Image from 'next/image';
import { ImageBanner as ImageBannerProps } from '@/lib/optimizely/types/generated';

export default function ImageBanner({
  BannerImage,
  CTA,
  Description,
  Title
}: ImageBannerProps) {
  console.log('imageBanner props:', { BannerImage, CTA, Description, Title });

  return (
    <section className="relative w-full bg-[#0a0a0a] text-white py-16 md:py-24 overflow-hidden">
      {/* Full Background Image */}
      {BannerImage?.url?.default && (
        <div className="absolute inset-0 z-0">
          <Image
            src={BannerImage.url.default}
            alt={Title ?? 'Banner Background'}
            fill
            unoptimized
            priority
            className="object-cover object-center opacity-90"
          />
          {/* Optional dark gradient overlay if needed to make text stand out */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Content Area */}
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
              {Title}
            </h2>

            <div className="space-y-4 text-slate-200 text-base sm:text-lg leading-relaxed max-w-xl drop-shadow">
              <p>
                {Description}
              </p>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <a
                href={CTA?.url?.default ?? "#"}
                className="inline-block px-8 py-3.5 bg-[#7cc3f5] hover:bg-[#6ab3ed] text-slate-950 font-semibold text-base rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300/40 active:scale-95"
              >
                {CTA?.title ?? "Pay without signing in"}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}