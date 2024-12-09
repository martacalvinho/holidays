import React, { useState } from 'react';
import { usePageStore } from '../store/pageStore';
import WinterTemplate from '../components/templates/WinterTemplate';
import ChristmasTemplate from '../components/templates/ChristmasTemplate';
import NewYearTemplate from '../components/templates/NewYearTemplate';
import { Monitor, Smartphone } from 'lucide-react';

const PreviewPage: React.FC = () => {
  const { settings } = usePageStore();
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  const getTemplateComponent = () => {
    switch (settings.template.theme) {
      case 'winter':
        return <WinterTemplate settings={settings} />;
      case 'christmas':
        return <ChristmasTemplate settings={settings} />;
      case 'newyear':
        return <NewYearTemplate settings={settings} />;
      default:
        return <WinterTemplate settings={settings} />;
    }
  };

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

        <div className={`bg-white shadow-lg mx-auto overflow-hidden ${
          device === 'mobile' ? 'max-w-sm' : 'w-full'
        }`}>
          {getTemplateComponent()}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;