// components/block/proofGenrePackSlider.tsx
"use client";

import React, { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  heading: string;
  rating: number;
  quote: string;
  CommenterName: string;
}

interface ProofGenrePackSliderProps {
  testimonials: Testimonial[];
}

export default function ProofGenrePackSlider({ testimonials }: ProofGenrePackSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeTestimonial = testimonials[currentIndex] || testimonials[0];

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isPlaying && testimonials.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => 
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, testimonials.length]);

  const handlePlayToggle = () => setIsPlaying(!isPlaying);

  const StarIcon = () => (
    <svg className="w-5 h-5 text-[#0066FF] fill-current" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );

  const ChevronLeft = () => (
    <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  );

  const ChevronRight = () => (
    <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );

  const PlayIcon = () => (
    <svg className="w-4 h-4 text-slate-700 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
  );

  const PauseIcon = () => (
    <svg className="w-4 h-4 text-slate-700 fill-current" viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z" /></svg>
  );

  if (testimonials.length === 0) return null;

  return (
    <>
      {/* Testimonial Card Content */}
      <div className="max-w-2xl mx-auto space-y-4 mb-10 min-h-[160px] flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-slate-900">
          {activeTestimonial?.heading}
        </h3>

        {/* Star Rating */}
        <div className="flex justify-center items-center gap-1">
          {[...Array(activeTestimonial?.rating || 5)].map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>

        {/* Quote */}
        <p className="text-lg text-slate-700 italic leading-relaxed font-normal">
          &quot;{activeTestimonial?.quote}&quot;
        </p>

        {/* Author */}
        <p className="text-sm font-medium text-slate-800 pt-1">
          ~ {activeTestimonial?.CommenterName}
        </p>
      </div>

      {/* Carousel Controls / Navigation */}
      <div className="flex items-center justify-between max-w-md mx-auto mb-12">
        <button
          type="button"
          onClick={handlePlayToggle}
          className="w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors focus:outline-none"
          aria-label={isPlaying ? "Pause testimonial slideshow" : "Play testimonial slideshow"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => prev === 0 ? testimonials.length - 1 : prev - 1)}
            className="w-10 h-10 rounded-full border border-slate-200 hover:border-slate-400 flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </button>

          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => prev === testimonials.length - 1 ? 0 : prev + 1)}
            className="w-10 h-10 rounded-full border border-slate-200 hover:border-slate-400 flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </>
  );
}
