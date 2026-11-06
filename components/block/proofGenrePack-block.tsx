// ./components/block/proofGenrePack-block.tsx
import React from 'react';
import { ProofOfGenrePackItem, ProofOfGenrePack as ProofOfGenrePackProps } from '@/lib/optimizely/types/generated';
import { castContent, SafeContent } from '@/lib/optimizely/types/typeUtils';
import ProofGenrePackSlider from './proofGenrePackSlider'; 

export default function ProofOfGenrePack({
  Title,
  ShopGenreCTA,
  ProofOfGenrePackItems
}: ProofOfGenrePackProps) {
  
  // 1. Prepare and clean data on the Server
  const formattedTestimonials = ProofOfGenrePackItems?.map((testimonial, index) => {
    const testimonialItem = castContent<ProofOfGenrePackItem>(
      testimonial as SafeContent,
      'ProofOfGenrePackItem'
    );

    return {
      id: index,
      heading: testimonialItem?.Comment ?? "Default Heading",
      rating: 5,
      quote: testimonialItem?.CommentDescription ?? "Default quote text.",
      CommenterName: testimonialItem?.CommenterName ?? "Default Name",
    };
  }) || [];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12 text-center bg-white">
      {/* 2. Section Header (Stays on Server) */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-12">
        {Title}
      </h2>

      {/* 3. Pass ONLY the clean array to the client sandbox */}
      <ProofGenrePackSlider testimonials={formattedTestimonials} />

      {/* 4. Keep the interactive CTA link here on the Server side */}
      {ShopGenreCTA && (
        <div>
          <a
            href={ShopGenreCTA.url?.default ?? "#"}
            className="inline-block px-8 py-3.5 border border-slate-900 text-slate-900 font-semibold text-base rounded-full hover:bg-slate-900 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            {ShopGenreCTA?.title ?? "Shop Genre Packs®"}
          </a>
        </div>
      )}
    </section>
  );
}
