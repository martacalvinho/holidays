import React, { useState } from 'react';
import { usePageStore } from '../../store/pageStore';
import { Plus, RefreshCw } from 'lucide-react';
import type { DiscountCode } from '../../types';

const DiscountForm: React.FC = () => {
  const { addDiscountCode } = usePageStore();
  const [formData, setFormData] = useState<Omit<DiscountCode, 'code'>>({
    amount: 0,
    type: 'percentage',
    expiryDate: new Date()
  });

  const generateCode = () => {
    const prefix = formData.type === 'percentage' ? 'SAVE' : 'OFF';
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `${prefix}${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDiscountCode({
      ...formData,
      code: generateCode()
    });
    setFormData({
      amount: 0,
      type: 'percentage',
      expiryDate: new Date()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Discount Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'percentage' | 'fixed' }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="percentage">Percentage Off</option>
            <option value="fixed">Fixed Amount Off</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {formData.type === 'percentage' ? 'Percentage' : 'Amount'} Off
          </label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            min="0"
            max={formData.type === 'percentage' ? "100" : undefined}
            step={formData.type === 'percentage' ? "1" : "0.01"}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
        <input
          type="datetime-local"
          value={formData.expiryDate.toISOString().slice(0, 16)}
          onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: new Date(e.target.value) }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Plus className="mr-2 h-4 w-4" />
        Generate Discount Code
      </button>
    </form>
  );
};

export default DiscountForm;