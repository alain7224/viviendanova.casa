export interface Analytics {
  date: string;
  visitors: number;
  visits: number;
  conversions: number;
  scrollDepth: number;
  avgSessionTime: number;
  bounceRate: number;
  deviceType: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  languages: Record<string, number>;
  topProperties: Array<{
    propertyId: string;
    views: number;
  }>;
  referrers: Record<string, number>;
}

export interface AnalyticsFilter {
  startDate: string;
  endDate: string;
  groupBy: 'day' | 'week' | 'month' | 'year';
}
