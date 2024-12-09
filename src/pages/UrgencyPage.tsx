import React from 'react';
import { usePageStore } from '../store/pageStore';
import { Timer } from 'lucide-react';

const UrgencyPage: React.FC = () => {
  const { settings, setCountdown } = usePageStore();

  const handleCountdownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountdown(new Date(e.target.value));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-6">Add Urgency Elements</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Sale End Date & Time</label>
                <div className="mt-1">
                  <input
                    type="datetime-local"
                    value={settings.countdownEnd?.toISOString().slice(0, 16) || ''}
                    onChange={handleCountdownChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {settings.countdownEnd && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Preview</h3>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm">
                    <Timer className="mr-2 text-indigo-600" />
                    <span className="font-mono font-medium text-gray-900">
                      {settings.countdownEnd.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UrgencyPage;