export const netflixPromoData = {
  title: "A year of Netflix on us",
  description: "New and existing Netflix customers get 12 months of Netflix on us when you add a DIRECTV Gemini device to any Genre Pack. Over \$100 in value!",
  primaryButton: {
   label: "Explore plans",
   href: "#"
  },
  secondaryButton: {
   label: "Try the experience",
   href: "#"
  },
  image: {
   src: "/path-to-netflix-promo-graphic.png", // Replace with your image asset path or import statement
   alt: "TV showing Netflix content with Gemini remote and Netflix logo"
  },
  disclaimer: {
   text: "*New qual. DIRECTV users only. New & existing Netflix subs eligible. Netflix Standard with Ads continues at reg. price (curr. \$8.99/mo.) after promo; maintain service and device (add'l \$10/mo.) to remain eligible. Services renew monthly unless canceled. Device subject to Equip. Lease Agmt; add'l fees may apply if not returned. Restr's apply. ",
   linkText: "Add'l terms",
   linkHref: "#"
  }
};

import React from 'react';
import { AYearOfNetflixBanner as AYearOfNetflixBannerProps } from './../../lib/optimizely/types/generated';

export default function imageBanner({ Title,   Description,  BannerImage ,  ExplorePlanCTA,  TryTheExperienceCTA , TermsDescription, TermsCTA}: AYearOfNetflixBannerProps) {
  const onExplorePlansClick = () => console.log("Explore plans clicked!");
  const onTryExperienceClick = () => console.log("Try the experience clicked!");
  
  return (
   <section className="w-full max-w-6xl mx-auto px-4 py-8">
     {/* Main Card Container */}
     <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#003882] via-[#051124] to-[#010712] text-white p-8 sm:p-10 md:p-12 shadow-xl">
       <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

         {/* Left Side Content */}
         <div className="md:col-span-7 space-y-6 z-10">
           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
             {Title}
           </h2>

           <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
             {Description}
           </p>

           {/* Action Buttons */}
           <div className="flex flex-wrap items-center gap-4 pt-2">
             <a
               href={ExplorePlanCTA?.url?.default ?? "#"}
               onClick={(e) => {
                 if (onExplorePlansClick) {
                   e.preventDefault();
                   onExplorePlansClick();
                 }
               }}
               className="px-7 py-3.5 bg-white text-[#0066FF] font-semibold text-base rounded-full shadow-md hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/40 active:scale-95"
             >
               {ExplorePlanCTA?.title ?? "Explore plans"}
             </a>

             <a
               href={TryTheExperienceCTA?.url?.default ?? "#"}
               onClick={(e) => {
                 if (onTryExperienceClick) {
                   e.preventDefault();
                   onTryExperienceClick();
                 }
               }}
               className="px-7 py-3.5 bg-transparent text-white font-semibold text-base rounded-full border border-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/40 active:scale-95"
             >
               {TryTheExperienceCTA?.title ?? "Try the experience"}
             </a>
           </div>
         </div>

         {/* Right Side Image Graphic */}
         <div className="md:col-span-5 flex justify-center md:justify-end items-center">
           <img
             src={BannerImage?.url?.default ?? "/path-to-default-banner.png"}
             alt={BannerImage?.key ?? "Banner Image"}
             className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
           />
         </div>

       </div>
     </div>

     {/* Bottom Disclaimer Text */}
     <div className="mt-4 px-2 text-xs text-slate-500 leading-relaxed">
       <span>{TermsDescription}</span>
       <a 
         href={TermsCTA?.url?.default ?? "#"} 
         className="underline font-medium hover:text-slate-700 transition-colors"
       >
         {TermsCTA?.title ?? "Add'l terms"}
       </a>
     </div>
   </section>
  );
};

 