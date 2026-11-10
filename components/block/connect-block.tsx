import React from 'react';
import Image from 'next/image';
import { ConnectItem, ConnectBlock as ConnectBlockProps } from '@/lib/optimizely/types/generated';
import { castContent, SafeContent } from '@/lib/optimizely/types/typeUtils';

export default function ConnectBlock({ 
  Description, 
  Title, 
  ConnectItems 
}: ConnectBlockProps) {

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] tracking-tight">
            {Title}
          </h2>
          {Description && (
            <p className="text-lg text-slate-600 font-normal">
              {Description}
            </p>
          )}
        </div>

        {/* Dynamic Cards Grid (Renders all ConnectItems from Optimizely) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ConnectItems?.map((item, index) => {
            const connectItemData = item ? { ...item, __typename: 'ConnectItem' } : null;
            const connectItem = castContent<ConnectItem>(connectItemData as SafeContent, 'ConnectItem');

            const itemTitle = connectItem?.Title;
            const itemDescription = connectItem?.Description;
            const imageUrl = connectItem?.ConnectImage?.url?.default;
            const ctaTitle = connectItem?.CTA?.title;
            const ctaUrl = connectItem?.CTA?.url?.default;

            return (
              <div
                key={index}
                className="relative flex flex-col justify-between rounded-3xl bg-[#f4f8ff] border border-blue-50 p-8 sm:p-10 shadow-sm text-center"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#0B1E36]">
                    {itemTitle}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
                    {itemDescription}
                  </p>

                  {ctaTitle && ctaUrl && (
                    <div className="pt-2">
                      <a
                        href={ctaUrl}
                        className="inline-block px-8 py-3 bg-[#0066FF] hover:bg-[#0052cc] text-white font-semibold text-sm rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300/40 active:scale-95"
                      >
                        {ctaTitle}
                      </a>
                    </div>
                  )}
                </div>

                {/* Connect Item Image / Graphic */}
                <div className="mt-10 flex justify-center items-center min-h-[220px]">
                  {imageUrl ? (
                    <div className="relative w-full h-[220px]">
                      <Image
                        src={imageUrl}
                        alt={itemTitle ?? "Connect Item Graphic"}
                        fill
                        unoptimized
                        className="object-contain drop-shadow-lg"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-32 bg-slate-200/50 rounded-xl flex items-center justify-center text-slate-400 text-xs italic">
                      No Image Asset
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}