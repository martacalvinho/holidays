import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Users, 
  DollarSign, 
  Tag,
  TrendingUp,
  Clock
} from 'lucide-react';

interface AnalyticsData {
  totalVisitors: number;
  productClicks: Record<string, number>;
  discountUsage: Record<string, number>;
  totalSales: number;
  conversionRate: number;
  averageTimeOnPage: number;
}

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalVisitors: 0,
    productClicks: {},
    discountUsage: {},
    totalSales: 0,
    conversionRate: 0,
    averageTimeOnPage: 0
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    fetchAnalyticsData(timeRange);
  }, [timeRange]);

  const fetchAnalyticsData = async (range: string) => {
    // Simulated data - replace with actual API call
    const mockData: AnalyticsData = {
      totalVisitors: 1250,
      productClicks: {
        'Holiday Bundle': 450,
        'Christmas Special': 320,
        'New Year Pack': 280
      },
      discountUsage: {
        'HOLIDAY25': 89,
        'XMAS2024': 65,
        'NEWYEAR': 45
      },
      totalSales: 15800,
      conversionRate: 3.2,
      averageTimeOnPage: 185 // seconds
    };
    setAnalyticsData(mockData);
  };

  const StatCard = ({ title, value, icon: Icon, subtitle }: any) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className="bg-indigo-100 p-3 rounded-full">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <div className="flex space-x-2">
            {['24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as any)}
                className={`px-4 py-2 rounded-md ${
                  timeRange === range
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Visitors"
            value={analyticsData.totalVisitors.toLocaleString()}
            icon={Users}
            subtitle="Unique page views"
          />
          <StatCard
            title="Total Sales"
            value={`$${analyticsData.totalSales.toLocaleString()}`}
            icon={DollarSign}
            subtitle="Revenue generated"
          />
          <StatCard
            title="Conversion Rate"
            value={`${analyticsData.conversionRate}%`}
            icon={TrendingUp}
            subtitle="Visitors who made a purchase"
          />
        </div>

        {/* Product Clicks */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Product Engagement</h2>
          <div className="space-y-4">
            {Object.entries(analyticsData.productClicks).map(([product, clicks]) => (
              <div key={product} className="flex items-center justify-between">
                <div className="flex items-center">
                  <ShoppingCart className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{product}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-900 font-medium">{clicks}</span>
                  <span className="text-gray-500 ml-2">clicks</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Discount Usage */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Discount Code Usage</h2>
          <div className="space-y-4">
            {Object.entries(analyticsData.discountUsage).map(([code, uses]) => (
              <div key={code} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Tag className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{code}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-900 font-medium">{uses}</span>
                  <span className="text-gray-500 ml-2">uses</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
