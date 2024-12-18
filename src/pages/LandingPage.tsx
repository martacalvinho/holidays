import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Gift, Timer, Palette, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Create Stunning Holiday
              <span className="text-indigo-600"> Promo Pages</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Build beautiful, conversion-focused holiday landing pages in minutes.
              No design skills needed.
            </p>
            <button
              onClick={() => navigate('/branding')}
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1"
            >
              Start Creating
              <ArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Palette className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Beautiful Templates</h3>
            <p className="text-gray-600">
              Choose from professionally designed holiday-themed templates that convert.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Gift className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Product Showcase</h3>
            <p className="text-gray-600">
              Display your products beautifully with customizable layouts and styles.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Timer className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Urgency Features</h3>
            <p className="text-gray-600">
              Drive sales with countdown timers and limited-time offers.
            </p>
          </div>
        </div>
      </div>

      {/* Templates Preview */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Holiday Templates for Every Season
            </h2>
            <p className="text-xl text-gray-600">
              Choose from our collection of professionally designed templates
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1544273677-c433136021d4"
                alt="Winter template"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Winter Wonderland</h3>
                <p className="text-gray-600">Cozy winter theme with snow-inspired design</p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1543589077-47d81606c1bf"
                alt="Christmas template"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Christmas Joy</h3>
                <p className="text-gray-600">Festive design with holiday spirit</p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1546271876-af6caec5fae5"
                alt="New Year template"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">New Year Sparkle</h3>
                <p className="text-gray-600">Celebration-themed design for new beginnings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start creating your holiday pages today
            </p>
          </div>
          
          <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
              <div className="flex justify-center">
                <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-indigo-100 text-indigo-600">
                  Per Page Plan
                </span>
              </div>
              <div className="mt-4 flex justify-center text-6xl font-extrabold text-gray-900">
                <span className="ml-1 mr-3 text-xl font-medium text-gray-500 leading-8">$</span>
                25
              </div>
              <p className="mt-4 text-sm text-gray-500 text-center">
                Pay only when you publish your page
              </p>
            </div>
            <div className="px-6 pt-6 pb-8 bg-gray-50 sm:px-10 sm:py-10">
              <ul className="space-y-4">
                {[
                  'Unlimited page customization',
                  'Professional templates',
                  'Custom domain support',
                  'Analytics dashboard',
                  '24/7 customer support'
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <div className="flex-shrink-0">
                      <Sparkles className="h-6 w-6 text-green-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">{feature}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <button
                  onClick={() => navigate('/branding')}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Start Creating Your Page
                  <ArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;