import React from 'react';
import { usePageStore } from '../store/pageStore';
import DiscountForm from '../components/discounts/DiscountForm';
import DiscountList from '../components/discounts/DiscountList';
import { EyeOff, Eye } from 'lucide-react';

const DiscountsPage: React.FC = () => {
  const { settings, setShowDiscountCodes } = usePageStore();

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="space-y-8">
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Create Discount Codes</h2>
            <div className="flex items-center">
              <button
                onClick={() => setShowDiscountCodes(!settings.showDiscountCodes)}
                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  settings.showDiscountCodes
                    ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {settings.showDiscountCodes ? (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Codes Visible on Page
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Codes Hidden on Page
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <DiscountForm />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Active Discount Codes</h2>
          <DiscountList />
        </section>
      </div>
    </div>
  );
};

export default DiscountsPage;