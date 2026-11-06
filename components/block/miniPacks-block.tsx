import React from 'react';
import { MiniPacksavailableItem, MiniPacksAvailable  as MiniPacksProps } from '@/lib/optimizely/types/generated'
import { castContent, SafeContent } from '@/lib/optimizely/types/typeUtils';
import { stat } from 'fs/promises';
import { InfoIcon } from 'lucide-react';

export default function MiniPacksAvailable({ Title, MiniPacksavailableItems}: MiniPacksProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-10 bg-slate-50/50">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 tracking-tight">
        {Title }
      </h2>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MiniPacksavailableItems?.map((pack, index) => {
            const miniPack = pack ? { ...stat, __typename: 'MiniPacksavailableItem' } : null;
            const statItem = castContent<MiniPacksavailableItem>(miniPack as SafeContent,'MiniPacksavailableItem');
              console.log('StatusBlockProps:', { statItem });
            return (
                <div
                key={index}
                className="relative flex flex-col justify-between rounded-2xl bg-[#eef5ff] border border-blue-100/60 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                    {/* Top Badge */}
                    <div className="absolute top-0 right-0">
                    <span className="inline-block bg-black text-white text-xs font-semibold px-4 py-1.5 rounded-bl-xl rounded-tr-2xl">
                        {statItem?.Badge}
                    </span>
                    </div>

                    {/* Header Content */}
                    <div className="space-y-3 pt-2">
                    <h3 className="text-2xl font-bold text-slate-900">
                        {statItem?.Title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed min-h-[48px]">
                        {statItem?.Description}
                    </p>
                    </div>

                    {/* Channel Logos */}
                    <div className="my-8 py-4 flex items-center justify-between gap-2 border-y border-blue-100/40">
                    {statItem?.PackagesImage && (
                        <div
                            key={index}
                            className="flex-1 text-center font-extrabold text-slate-800 text-xs tracking-tight uppercase px-1"
                        >
                            <img
                            src={statItem?.PackagesImage?.url?.default ?? "/path-to-default-logo.png"}
                            alt={statItem?.PackagesImage?.key ?? "Channel Logo"}
                            className="mx-auto"
                            />
                        </div>
                        )}

                        {/* Optional Market Note for MyHome Team */}
                        {statItem?.ShortDescription && (
                        <p className="text-xs text-slate-500 mb-6">
                            {statItem?.ShortDescription}
                        </p>
                        )}

                        {/* Bottom Pricing & Info Row */}
                        <div className="flex items-end justify-between mt-auto pt-2">
                            <div>
                                {statItem?.SpecialPriceText && (
                                <div className="mb-1">
                                    <span className="bg-amber-300 text-slate-900 font-semibold text-[10px] px-2 py-0.5 rounded-sm">
                                    {statItem?.SpecialPriceText}
                                    </span>
                                </div>
                                )}
                                {statItem?.SpecialPrice && (
                                <div className="text-xs text-slate-400 line-through">
                                    {statItem?.SpecialPrice}
                                </div>
                                )}
                                <div className="text-slate-900 font-normal text-sm">
                                    <span className="text-2xl font-bold text-[#0066FF]">
                                        {statItem?.Price}
                                    </span>
                                    <span className="text-slate-600 text-xs font-medium ml-1">
                                        {statItem?.PricePeriod}
                                    </span>
                                </div>
                            </div>

                            {/* Info Button */}
                            <button
                                type="button"
                                // onClick={() => onInfoClick && onInfoClick(statItem)}
                                className="p-1 rounded-full hover:bg-blue-100/50 focus:outline-none"
                                aria-label="More information">
                                <InfoIcon />
                            </button>
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
    </section>
  )
};
