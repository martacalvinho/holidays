import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { themes } from '../../styles/theme';
import CTAButton from '../shared/CTAButton';
import DiscountBadge from '../shared/DiscountBadge';
import { analytics } from '../../services/analyticsService';

interface MobileTemplateProps {
  settings: {
    products: Product[];
    template: {
      theme: 'winter' | 'christmas' | 'newyear';
    };
    pageId: string;
  };
  handleAddToCart: (product: Product) => void;
}

const MobileTemplate: React.FC<MobileTemplateProps> = ({ settings, handleAddToCart }) => {
  const theme = settings.template.theme;

  const handleProductClick = (product: any) => {
    analytics.trackProductClick(
      settings.pageId, 
      product.id,
      product.name
    );
  };

  const handleAddToCartWithAnalytics = (product: any) => {
    analytics.trackPurchase(
      settings.pageId,
      [{
        id: product.id,
        price: product.price
      }],
      product.price
    );
    handleAddToCart(product);
  };

  return (
    <div className="w-[390px]">
      <div className="flex flex-col">
        {settings.products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <ProductCard 
              product={product} 
              theme={theme} 
              handleAddToCart={handleAddToCartWithAnalytics}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ 
  product: Product; 
  theme: 'winter' | 'christmas' | 'newyear'; 
  handleAddToCart: (product: Product) => void 
}> = ({ product, theme, handleAddToCart }) => {
  const themeConfig = themes[theme];

  return (
    <article className="bg-white">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full aspect-square object-cover"
        />
        {product.discountPrice && (
          <div className="absolute top-6 right-6 transform scale-150">
            <DiscountBadge
              theme={theme}
              amount={`${Math.round((1 - product.discountPrice / product.price) * 100)}% OFF`}
            />
          </div>
        )}
      </div>
      <div className="p-8">
        <h3 className={`text-4xl font-bold mb-6 leading-tight ${themeConfig.colors.text}`}>
          {product.title}
        </h3>
        <p className={`text-2xl leading-relaxed mb-8 opacity-80 ${themeConfig.colors.text}`}>
          {product.description}
        </p>
        <div className="flex flex-col gap-6">
          <div className="flex items-baseline gap-4">
            <span className={`text-4xl font-bold ${themeConfig.colors.text}`}>
              ${product.discountPrice?.toFixed(2) || product.price.toFixed(2)}
            </span>
            {product.discountPrice && (
              <span className={`text-3xl line-through opacity-50 ${themeConfig.colors.text}`}>
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <CTAButton
            theme={theme}
            onClick={() => handleAddToCart(product)}
            icon={<ShoppingCart className="w-8 h-8" />}
            className="w-full py-6 text-2xl"
          >
            Add to Cart
          </CTAButton>
        </div>
      </div>
    </article>
  );
};

export default MobileTemplate;
