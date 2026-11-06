import React from 'react';
import { ImageBanner  as ImageBannerProps } from '@/lib/optimizely/types/generated'

export default function imageBanner({
  BannerImage, CTA, Description, Title}: ImageBannerProps) {
  const onPayClick = () => {
    console.log("Pay without signing in clicked!");
  };


  const content = {
    title: Title ?? "Traveling Abroad? You may not be able to make a payment.",
    paragraphs: Description ?? "If you're traveling abroad, you may encounter issues making payments due to international restrictions or security measures. To ensure a smooth experience, we recommend using our 'Pay without signing in' option, which allows you to complete your transaction without any hassle."
    ,
    button: {
      label: CTA?.title ?? "Pay without signing in",
      href: CTA?.url?.default ?? "#"
    },
    image: {
      src: BannerImage?.url?.default ?? "/path-to-astronaut-image.png", // Replace with your image asset path or import statement
      alt: BannerImage?.key ?? "Astronaut sitting on the moon using a laptop with Earth in the background"
    }
  };
  return (
    <section className="w-full bg-[#0a0a0a] text-white py-12 md:py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Content Area */}
          <div className="md:col-span-7 space-y-6 z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {content.title}[cite: 9]
            </h2>

            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                  {content.paragraphs}
                </p>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <a
                href={content.button.href}
                onClick={(e) => {
                  if (onPayClick) {
                    e.preventDefault();
                    onPayClick();
                  }
                }}
                className="inline-block px-8 py-3.5 bg-[#7cc3f5] hover:bg-[#6ab3ed] text-slate-950 font-semibold text-base rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300/40 active:scale-95"
              >
                {content.button.label}[cite: 9]
              </a>
            </div>
          </div>

          {/* Right Image Area (Astronaut) */}
          <div className="md:col-span-5 flex justify-center md:justify-end items-center relative">
            <img
              src={content.image.src}
              alt={content.image.alt}
              className="w-full max-w-md lg:max-w-lg h-auto object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
