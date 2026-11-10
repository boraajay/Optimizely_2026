import React from 'react';
import Image from 'next/image'; // Import Next.js Image component
import { AYearOfNetflixBanner as AYearOfNetflixBannerProps } from '../../lib/optimizely/types/generated';

export default function AYearOfNetflixBanner({ 
  Title,   
  Description,  
  BannerImage,  
  ExplorePlanCTA,  
  TryTheExperienceCTA, 
  TermsDescription, 
  TermsCTA
}: AYearOfNetflixBannerProps) {

  // Safely extract the source URL string from the Optimizely response structure
  const imageUrl = BannerImage?.url?.default;

  return (
   <section className="w-full max-w-6xl mx-auto px-4 py-8">
     {/* Main Card Container with Relative Positioning for Full Background */}
     <div className="relative overflow-hidden rounded-2xl bg-[#010712] text-white p-8 sm:p-10 md:p-12 shadow-xl">
       
       {/* Full Background Image Layer */}
       {imageUrl && (
         <div className="absolute inset-0 z-0">
           <Image
             src={imageUrl}
             alt={Title ?? "Netflix Promo Graphic"}
             fill
             unoptimized
             priority
             className="object-cover object-center opacity-70"
           />
           {/* Dark Gradient Overlay to Keep Left Text Fully Legible */}
           <div className="absolute inset-0 bg-gradient-to-r from-[#003882]/95 via-[#051124]/80 to-transparent" />
         </div>
       )}

       {/* Content Layout Layer */}
       <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

         {/* Left Side Content */}
         <div className="md:col-span-7 space-y-6">
           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-md">
             {Title}
           </h2>

           <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl drop-shadow">
             {Description}
           </p>

           {/* Action Buttons */}
           <div className="flex flex-wrap items-center gap-4 pt-2">
             <a
               href={ExplorePlanCTA?.url?.default ?? "#"}
               className="px-7 py-3.5 bg-white text-[#0066FF] font-semibold text-base rounded-full shadow-md hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/40 active:scale-95"
             >
               {ExplorePlanCTA?.title ?? "Explore plans"}
             </a>

             <a
               href={TryTheExperienceCTA?.url?.default ?? "#"}
               className="px-7 py-3.5 bg-transparent text-white font-semibold text-base rounded-full border border-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/40 active:scale-95"
             >
               {TryTheExperienceCTA?.title ?? "Try the experience"}
             </a>
           </div>
         </div>

         {/* Right Side Empty Column (Allows Background Image to show through fully on the right) */}
         <div className="md:col-span-5 hidden md:block"></div>

       </div>
     </div>

     {/* Bottom Disclaimer Text */}
     <div className="mt-4 px-2 text-xs text-slate-500 leading-relaxed">
       <span>{TermsDescription} </span>
       <a 
         href={TermsCTA?.url?.default ?? "#"} 
         className="underline font-medium hover:text-slate-700 transition-colors"
       >
         {TermsCTA?.title ?? "Add'l terms"}
       </a>
     </div>
   </section>
  );
}