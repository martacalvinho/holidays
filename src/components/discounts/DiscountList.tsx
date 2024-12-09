import React from 'react';
import { usePageStore } from '../../store/pageStore';
import { Trash2, Clock } from 'lucide-react';

const DiscountList: React.FC = () => {
  const { settings, removeDiscountCode } = usePageStore();

  if (settings.discountCodes.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No discount codes created yet. Generate your first code above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {settings.discountCodes.map((discount) => (
        <div
          key={discount.code}
          className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm"
        >
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-mono text-lg font-bold text-gray-900">{discount.code}</h3>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                {discount.type === 'percentage' ? `${discount.amount}% OFF` : `$${discount.amount} OFF`}
              </span>
            </div>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <Clock size={16} className="mr-1" />
              <span>Expires: {new Date(discount.expiryDate).toLocaleDateString()}</span>
            </div>
          </div>
          <button
            onClick={() => removeDiscountCode(discount.code)}
            className="p-2 text-gray-400 hover:text-red-500"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DiscountList;