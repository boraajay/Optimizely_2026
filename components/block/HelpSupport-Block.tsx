'use client';
import React, { useState } from 'react';
import { HelpSupportBlock as HelpSupportBlockProps, SupportCategoryItem } from '@/lib/optimizely/types/generated';
import { castContent, SafeContent } from '@/lib/optimizely/types/typeUtils';

export default function HelpSupportBlock({
  Title = "How can we help you today?",
  SearchPlaceholder = "Search CNX Support",
  Categories
}: HelpSupportBlockProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="w-full bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-[#0F294A] tracking-tight">
          {Title}
        </h2>

        {/* Search Input Bar */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            {/* Search Glass Indicator */}
            <div className="absolute left-5 pointer-events-none text-slate-500 font-bold text-lg">
              🔍
            </div>

            {/* Search Input Field */}
            {SearchPlaceholder && (
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={SearchPlaceholder} 
              className="w-full pl-14 pr-14 py-4 rounded-full bg-white text-slate-800 placeholder-slate-400 border border-slate-200/80 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200/50 transition-all text-base font-normal"
            />
            )}

            {/* Mic Trigger Button */}
            <button
              type="button"
              className="absolute right-5 text-slate-500 hover:text-slate-800 transition-colors p-1 text-lg"
              aria-label="Voice search"
            >
              🎙️
            </button>
          </form>
        </div>

        {/* 4-Column Category Grid with JPG Images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6">
          {Categories?.map((item, index) => {
            const rawCategory = item ? { ...item, __typename: 'SupportCategoryItem' } : null;
            const category = castContent<SupportCategoryItem>(rawCategory as SafeContent, 'SupportCategoryItem');

            const categoryTitle = category?.Title;
            const imageUrl = category?.CategoryImage?.url?.default;
            const categoryUrl = category?.Url?.url?.default || '#';

            return (
              <a
                key={index}
                href={categoryUrl}
                className="group flex flex-col items-center text-center space-y-4 focus:outline-none"
              >
                {/* Round Grey Circle Icon Container with JPG Image */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#edf2f7] group-hover:bg-[#e2e8f0] flex items-center justify-center p-6 transition-all duration-300 transform group-hover:scale-105 shadow-sm overflow-hidden">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={categoryTitle ?? "Support category icon"}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-slate-300/40 flex items-center justify-center text-slate-400 text-xs italic">
                      No Image Asset
                    </div>
                  )}
                </div>

                {/* Category Title Label */}
                <span className="text-base sm:text-lg font-semibold text-[#0F294A] max-w-[180px] leading-snug group-hover:text-blue-600 transition-colors">
                  {categoryTitle}
                </span>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}