import React, { useState } from 'react';
import { usePageStore } from '../store/pageStore';
import { Monitor, Smartphone } from 'lucide-react';
import BaseTemplate from '../components/templates/BaseTemplate';
import MobileTemplate from '../components/templates/MobileTemplate';

const PreviewPage: React.FC = () => {
  const { settings, handleAddToCart } = usePageStore();
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Preview Your Page</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDevice('desktop')}
              className={`inline-flex items-center px-3 py-2 rounded-md ${
                device === 'desktop'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Monitor size={20} className="mr-2" />
              Desktop
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`inline-flex items-center px-3 py-2 rounded-md ${
                device === 'mobile'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Smartphone size={20} className="mr-2" />
              Mobile
            </button>
          </div>
        </div>
      </div>

      {/* Preview Container */}
      <div className="max-w-7xl mx-auto px-4">
        <div className={`bg-white shadow-lg mx-auto ${
          device === 'mobile' ? 'w-[390px]' : 'w-full'
        }`}>
          {device === 'mobile' ? (
            <MobileTemplate settings={settings} handleAddToCart={handleAddToCart} />
          ) : (
            <BaseTemplate 
              settings={settings}
              theme={settings.template.theme}
              heroTitle={settings.hero.title}
              heroImage={settings.hero.imageUrl}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;