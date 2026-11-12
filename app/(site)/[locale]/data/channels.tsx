export interface ChannelListing {
  id: string;
  number: number;
  name: string;
  category: 'Sports' | 'Movies' | 'News' | 'Local' | 'Kids' | 'Entertainment';
  currentShow: string;
  timeRange: string;
  progressPercent: number; // 0 to 100
}

export const CHANNELS_DATA: ChannelListing[] = [
  {
    id: 'espn',
    number: 206,
    name: 'ESPN',
    category: 'Sports',
    currentShow: 'SportsCenter Live with Scott Van Pelt',
    timeRange: '11:00 AM - 12:30 PM',
    progressPercent: 65,
  },
  {
    id: 'hbo',
    number: 501,
    name: 'HBO / Max HD',
    category: 'Movies',
    currentShow: 'House of the Dragon - S2 Ep 4',
    timeRange: '11:15 AM - 12:15 PM',
    progressPercent: 40,
  },
  {
    id: 'abc',
    number: 7,
    name: 'ABC Regional Local',
    category: 'Local',
    currentShow: 'Action News Midday & Weather Update',
    timeRange: '11:30 AM - 12:00 PM',
    progressPercent: 85,
  },
  {
    id: 'cnn',
    number: 200,
    name: 'CNN International',
    category: 'News',
    currentShow: 'State of the Union: Breaking World News',
    timeRange: '11:00 AM - 12:00 PM',
    progressPercent: 25,
  },
  {
    id: 'tnt',
    number: 245,
    name: 'TNT',
    category: 'Entertainment',
    currentShow: 'NBA Tip-Off Special',
    timeRange: '12:00 PM - 02:30 PM',
    progressPercent: 15,
  },
  {
    id: 'disney',
    number: 290,
    name: 'Disney Channel',
    category: 'Kids',
    currentShow: 'Big City Greens (Marathon)',
    timeRange: '10:30 AM - 01:00 PM',
    progressPercent: 50,
  },
  {
    id: 'fs1',
    number: 219,
    name: 'Fox Sports 1',
    category: 'Sports',
    currentShow: 'UEFA Champions League Today',
    timeRange: '11:00 AM - 01:30 PM',
    progressPercent: 45,
  },
  {
    id: 'showtime',
    number: 545,
    name: 'Paramount+ with SHOWTIME',
    category: 'Movies',
    currentShow: 'Yellowjackets Season 2',
    timeRange: '11:30 AM - 12:30 PM',
    progressPercent: 70,
  },
  {
    id: 'nbc',
    number: 4,
    name: 'NBC Network News',
    category: 'Local',
    currentShow: 'Today Show Extra & Local Breaking',
    timeRange: '10:00 AM - 12:00 PM',
    progressPercent: 90,
  },
  {
    id: 'msnbc',
    number: 356,
    name: 'MSNBC',
    category: 'News',
    currentShow: 'The ReidOut Live Analysis',
    timeRange: '11:00 AM - 12:00 PM',
    progressPercent: 30,
  },
  {
    id: 'nick',
    number: 299,
    name: 'Nickelodeon',
    category: 'Kids',
    currentShow: 'SpongeBob SquarePants',
    timeRange: '11:30 AM - 12:00 PM',
    progressPercent: 80,
  },
  {
    id: 'usa',
    number: 242,
    name: 'USA Network',
    category: 'Entertainment',
    currentShow: 'WWE',
    timeRange: '11:00 AM - 01:00 PM',
    progressPercent: 55,
  },
];