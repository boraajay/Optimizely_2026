'use client';

import React, { useState, useMemo } from 'react';

export interface FormattedChannelItem {
  id: string;
  number: string;
  name: string;
  category: string;
  currentShow: string;
  timeRange: string;
  progressPercent: number;
}

interface ShowGenrePackChannelsClientProps {
  title: string;
  subTitle: string;
  categories: string[];
  channels: FormattedChannelItem[];
}

export default function ShowGenrePackChannelsClient({
  title,
  subTitle,
  categories,
  channels,
}: ShowGenrePackChannelsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Derive fallback categories from items if CMS Categories field was left empty
  const availableCategories = useMemo(() => {
    if (categories.length > 1) return categories;

    const derived = Array.from(
      new Set(channels.map((ch) => ch.category).filter(Boolean))
    );
    return ['All', ...derived];
  }, [categories, channels]);

  // Filter channels by active category pill and live search input
  const filteredChannels = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return channels.filter((channel) => {
      const matchesCategory =
        selectedCategory.toLowerCase() === 'all' ||
        channel.category.toLowerCase() === selectedCategory.toLowerCase();

      if (!query) return matchesCategory;

      const matchesSearch =
        channel.name.toLowerCase().includes(query) ||
        channel.currentShow.toLowerCase().includes(query) ||
        channel.number.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [channels, searchQuery, selectedCategory]);

  return (
    <>
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-1">
            {subTitle}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight">{title}</h1>
        </div>

        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search channels or show titles..."
            aria-label="Search channels or show titles"
            className="w-full bg-[#0d1527] border border-slate-800 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* CMS Category Pills */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        {availableCategories.map((cat) => {
          const isActive =
            selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-[#111927] text-slate-300 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Channel Cards */}
      <div className="space-y-4">
        {filteredChannels.length > 0 ? (
          filteredChannels.map((channel) => (
            <div
              key={channel.id}
              className="bg-[#080e1a] border border-[#162238] rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-slate-700 transition-colors"
            >
              {/* Channel Number & Name */}
              <div className="flex items-center gap-4 min-w-[220px]">
                <div className="bg-[#0d192f] border border-[#1e2f4d] rounded-lg w-16 h-16 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] text-cyan-400 uppercase font-semibold">
                    Ch.
                  </span>
                  <span className="text-xl font-bold">{channel.number}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">
                    {channel.name}
                  </h3>
                  {channel.category && (
                    <span className="inline-block mt-1 bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-[10px] px-2.5 py-0.5 rounded-full font-medium">
                      {channel.category}
                    </span>
                  )}
                </div>
              </div>

              {/* Current Show & Progress Bar */}
              <div className="flex-1 w-full max-w-2xl">
                <div className="flex items-center justify-between text-xs text-slate-300 mb-2 font-medium">
                  <span className="truncate pr-4 text-slate-100">
                    {channel.currentShow}
                  </span>
                  {channel.timeRange && (
                    <span className="text-slate-400 shrink-0">
                      {channel.timeRange}
                    </span>
                  )}
                </div>
                <div className="w-full bg-[#111a2e] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${channel.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Watch Live Button */}
              <div className="shrink-0 w-full md:w-auto">
                <button
                  type="button"
                  className="w-full md:w-auto bg-[#13233d] hover:bg-cyan-600 text-cyan-300 hover:text-white px-5 py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Live
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-slate-400 bg-[#0b1322] rounded-xl border border-slate-800">
            No channels found matching &ldquo;{searchQuery}&rdquo;
          </div>
        )}
      </div>
    </>
  );
}