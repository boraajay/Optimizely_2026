import React from 'react';
import { GenerPackChannel, ShowGenrePackChannels as ShowGenrePackChannelsProps} from '@/lib/optimizely/types/generated';
// import {ShowGenrePackChannelsFragment as props} from '../../lib/optimizely/queries/fragments/Block.graphql';
import { castContent, SafeContent } from '@/lib/optimizely/types/typeUtils';
import ShowGenrePackChannelsClient, { FormattedChannelItem, } from './showGenrePackChannelsClient';

export default function ShowGenrePackChannels({
  Title,
  SubTitle,
  ChannelCategories,
  ShowGenrePackItems,
}: ShowGenrePackChannelsProps) {

  // 1. Prepare and clean channel items on the Server
  const formattedChannels: FormattedChannelItem[] =
    ShowGenrePackItems?.reduce<FormattedChannelItem[]>((acc, item, index) => {
      const pack = item ? { ...item, __typename: 'GenerPackChannel' } : null;
      const channelItem = castContent<GenerPackChannel>(pack as SafeContent,'GenerPackChannel');
     
      console.log('Channel Item:', channelItem);
      if (!channelItem?.name) return acc;

      const rawProgress = Number(channelItem.progressPercent ?? 0);
      const clampedProgress = Number.isFinite(rawProgress)
        ? Math.min(100, Math.max(0, rawProgress))
        : 0;

      acc.push({
        id: channelItem.Id ?? `channel-${channelItem.number ?? index}-${index}`,
        number: channelItem.number != null ? String(channelItem.number) : '--',
        name: channelItem.name,
        category: channelItem.category?.trim() ?? '',
        currentShow: channelItem.currentShow ?? 'Live Programming',
        timeRange: channelItem.timeRange ?? '',
        progressPercent: clampedProgress,
      });

      return acc;
    }, []) || [];
console.log('Formatted Channels000000000000:', formattedChannels);
    // 2. Normalize Categories array from Optimizely
  const parsedCategories: string[] = (ChannelCategories ?? [])
    .filter((c): c is string => Boolean(c && c.trim()))
    .map((c) => c.trim());
    console.log('Parsed Categories:', parsedCategories);
  // Ensure 'All' is always the first filter pill
  const filterCategories = [
    'All',
    ...parsedCategories.filter((cat) => cat.toLowerCase() !== 'all'),
  ];
  return (
    <section className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* 3. Pass clean data and CMS headers to the client interactive sandbox */}
        <ShowGenrePackChannelsClient
          title={Title ?? 'Live Channel Guide'}
          subTitle={SubTitle ?? 'REAL-TIME LISTINGS'}
          categories={filterCategories}
          channels={formattedChannels}
        />
      </div>
    </section>
  );
}