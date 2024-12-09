import React from 'react';
import ProductForm from '../components/products/ProductForm';
import ProductList from '../components/products/ProductList';
import TemplateGrid from '../components/templates/TemplateGrid';

const ProductsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-6">Choose Your Template</h2>
          <TemplateGrid />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Add Products</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ProductForm />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Your Products</h2>
          <ProductList />
        </section>
      </div>
    </div>
  );
};

export default ProductsPage;