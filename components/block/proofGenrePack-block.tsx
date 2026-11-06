// import React, { useState }, { useState } from 'react';
// import { ProofOfGenrePack  as ProofOfGenrePackProps } from '@/lib/optimizely/types/generated'

// export default function imageBanner({
//   Title, ShopGenreCTA, ProofOfGenrePackItems}: ProofOfGenrePackProps) {


// const StarIcon = () => (
//   <svg className="w-5 h-5 text-[#0066FF] fill-current" viewBox="0 0 24 24">
//     <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//   </svg>
// );

// const ChevronLeft = () => (
//   <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//   </svg>
// );

// const ChevronRight = () => (
//   <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//   </svg>
// );

// const PlayIcon = () => (
//   <svg className="w-4 h-4 text-slate-700 fill-current" viewBox="0 0 24 24">
//     <path d="M8 5v14l11-7z" />
//   </svg>
// );

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const activeTestimonial = content.testimonials[currentIndex] || content.testimonials[0];

//   return (
//     <section className="w-full max-w-5xl mx-auto px-4 py-12 text-center bg-white">
//       {/* Section Header */}
//       <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-12">
//         {content.sectionTitle}
//       </h2>

//       {/* Testimonial Card Content */}
//       <div className="max-w-2xl mx-auto space-y-4 mb-10 min-h-[160px] flex flex-col justify-center">
//         <h3 className="text-xl font-semibold text-slate-900">
//           {activeTestimonial.heading}
//         </h3>

//         {/* Star Rating */}
//         <div className="flex justify-center items-center gap-1">
//           {[...Array(activeTestimonial.rating)].map((_, i) => (
//             <StarIcon key={i} />
//           ))}
//         </div>

//         {/* Quote */}
//         <p className="text-lg text-slate-700 italic leading-relaxed font-normal">
//           "{activeTestimonial.quote}"
//         </p>

//         {/* Author */}
//         <p className="text-sm font-medium text-slate-800 pt-1">
//           ~ {activeTestimonial.author}
//         </p>
//       </div>

//       {/* Carousel Controls / Navigation */}
//       <div className="flex items-center justify-between max-w-md mx-auto mb-12">
//         {/* Play/Pause control */}
//         <button
//           onClick={() => onPlayClick && onPlayClick(currentIndex)}
//           className="w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors focus:outline-none"
//           aria-label="Play testimonial slideshow"
//         >
//           <PlayIcon />
//         </button>

//         {/* Arrow Navigation */}
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => {
//               setCurrentIndex((prev) => (prev === 0 ? content.testimonials.length - 1 : prev - 1));
//               if (onPrevClick) onPrevClick();
//             }}
//             className="w-10 h-10 rounded-full border border-slate-200 hover:border-slate-400 flex items-center justify-center transition-colors focus:outline-none"
//             aria-label="Previous testimonial"
//           >
//             <ChevronLeft />
//           </button>

//           <button
//             onClick={() => {
//               setCurrentIndex((prev) => (prev === content.testimonials.length - 1 ? 0 : prev + 1));
//               if (onNextClick) onNextClick();
//             }}
//             className="w-10 h-10 rounded-full border border-slate-200 hover:border-slate-400 flex items-center justify-center transition-colors focus:outline-none"
//             aria-label="Next testimonial"
//           >
//             <ChevronRight />
//           </button>
//         </div>
//       </div>

//       {/* Bottom CTA Button */}
//       <div>
//         <a
//           href={content.button.href}
//           onClick={(e) => {
//             if (onShopClick) {
//               e.preventDefault();
//               onShopClick();
//             }
//           }}
//           className="inline-block px-8 py-3.5 border border-slate-900 text-slate-900 font-semibold text-base rounded-full hover:bg-slate-900 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
//         >
//           {content.button.label}
//         </a>
//       </div>
//     </section>
//   );
// }
// };
