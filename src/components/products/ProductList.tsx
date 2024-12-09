import React from 'react';
import { usePageStore } from '../../store/pageStore';
import { Trash2 } from 'lucide-react';

const ProductList: React.FC = () => {
  const { settings, removeProduct } = usePageStore();

  if (settings.products.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No products added yet. Add your first product above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {settings.products.map((product) => (
        <div
          key={product.id}
          className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm"
        >
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{product.title}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
            <div className="mt-1 flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.discountPrice?.toFixed(2) || product.price.toFixed(2)}
              </span>
              {product.discountPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => removeProduct(product.id)}
            className="p-2 text-gray-400 hover:text-red-500"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;