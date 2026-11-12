export type BillingCycle = 'annual' | 'monthly';

export interface PackageItem {
  id: string;
  name: string;
  popular: boolean;
  priceMonthly: number;
  priceAnnual: number;
  channelsCount: string;
  description: string;
  badge: string;
  highlights: string[];
  genreFilters: string[];
}

export type IconName =
  | 'trophy'
  | 'tv'
  | 'film'
  | 'star'
  | 'globe'
  | 'activity'
  | 'map-pin'
  | 'shopping-bag'
  | 'shopping-cart'
  | 'x'
  | 'trash-2'
  | 'check'
  | 'check-circle'
  | 'alert-circle'
  | 'sparkles'
  | 'arrow-right'
  | 'chevron-up'
  | 'chevron-down'
  | 'search'
  | 'play'
  | 'plus';

export interface GenrePack {
  id: string;
  title: string;
  price: number;
  period: string;
  icon: IconName;
  tag: string;
  description: string;
  channels: string[];
}

export interface LiveChannel {
  id: number;
  name: string;
  category: ChannelCategory;
  number: number;
  currentShow: string;
  progress: number;
  startTime: string;
  endTime: string;
  poster: string;
}

export type ChannelCategory =
  | 'Sports'
  | 'Movies'
  | 'News'
  | 'Local'
  | 'Kids'
  | 'Entertainment';

export type ChannelFilter = 'All' | ChannelCategory;

export interface ZipStatus {
  success: boolean;
  message: string;
}

export interface FaqEntry {
  question: string;
  answer: string; // may contain {zip} placeholder
}

export interface SportsHighlight {
  badge: string;
  badgeClass: string;
  icon: IconName;
  title: string;
  description: string;
  availability: string;
}

export interface GenerPackChannel {
  Id?: string | null;
  category?: string | null;
  currentShow?: string | null;
  name?: string | null;
  number?: number | string | null;
  progressPercent?: number | null;
  timeRange?: string | null;
}

export interface ShowGenrePackChannelsData {
  _deleted?: boolean | null;
  _modified?: string | null;
  Title?: string | null;
  SubTitle?: string | null;
  ShowGenrePackItems?: (GenerPackChannel | null)[] | null;
}