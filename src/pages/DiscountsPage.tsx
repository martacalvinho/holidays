import React from 'react';
import DiscountForm from '../components/discounts/DiscountForm';
import DiscountList from '../components/discounts/DiscountList';

const DiscountsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-6">Create Discount Codes</h2>
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