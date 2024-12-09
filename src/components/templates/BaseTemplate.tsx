import React from 'react';
import type { PageSettings, Product } from '../../types';
import { themes } from '../../styles/theme';
import BackgroundEffects from '../shared/BackgroundEffects';
import BackgroundPatterns from '../shared/BackgroundPatterns';
import Cart from '../shared/Cart';
import CTAButton from '../shared/CTAButton';
import DiscountBadge from '../shared/DiscountBadge';
import { Timer, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

interface BaseTemplateProps {
  settings: PageSettings;
  theme: 'winter' | 'christmas' | 'newyear';
  heroTitle: string;
  heroImage: string;
}

const BaseTemplate: React.FC<BaseTemplateProps> = ({
  settings,
  theme,
  heroTitle,
  heroImage,
}) => {
  const themeConfig = themes[theme];
  const { addItem } = useCartStore();

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${themeConfig.colors.background} relative`}>
      <BackgroundPatterns theme={theme} />
      <BackgroundEffects theme={theme} />
      <Cart theme={theme} />
      
      {/* Header */}
      <header className={`${themeConfig.effects.card} sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          {settings.logo ? (
            <img src={settings.logo} alt={settings.businessName} className="h-12" />
          ) : (
            <h1 className={`text-2xl font-bold ${themeConfig.colors.text}`}>
              {settings.businessName || 'Holiday Store'}
            </h1>
          )}
        </div>
      </header>

      {/* Hero */}
      <div className="relative py-24 px-6 sm:px-12 lg:px-16">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <h1 className={`text-4xl sm:text-5xl font-bold ${themeConfig.colors.text} mb-6 ${themeConfig.fonts.heading}`}>
            {heroTitle}
          </h1>
          {settings.countdownEnd && (
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${themeConfig.effects.card} mb-8`}>
              <Timer className={`mr-2 ${themeConfig.colors.text}`} />
              <span className={`font-mono font-medium ${themeConfig.colors.text}`}>
                {new Date(settings.countdownEnd).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {settings.products.map((product) => (
            <div key={product.id} className={`${themeConfig.effects.card} overflow-hidden`}>
              <div className="relative">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                />
                {product.discountPrice && (
                  <div className="absolute top-4 right-4">
                    <DiscountBadge
                      theme={theme}
                      amount={`${Math.round((1 - product.discountPrice / product.price) * 100)}% OFF`}
                    />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className={`text-lg font-medium ${themeConfig.colors.text}`}>{product.title}</h3>
                <p className={`mt-2 ${themeConfig.colors.text} opacity-80`}>{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`text-2xl font-bold ${themeConfig.colors.text}`}>
                      ${product.discountPrice?.toFixed(2) || product.price.toFixed(2)}
                    </span>
                    {product.discountPrice && (
                      <span className={`text-sm ${themeConfig.colors.text} opacity-60 line-through`}>
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <CTAButton theme={theme} onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </CTAButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discount Codes */}
      {settings.discountCodes.length > 0 && (
        <div className={`py-12 ${themeConfig.effects.card}`}>
          <div className="max-w-7xl mx-auto px-4">
            <h2 className={`text-2xl font-bold text-center mb-8 ${themeConfig.colors.text} ${themeConfig.fonts.heading}`}>
              Special Offers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {settings.discountCodes.map((code) => (
                <div key={code.code} className={`${themeConfig.effects.card} p-6 text-center`}>
                  <span className={`inline-block px-4 py-2 rounded-full ${themeConfig.effects.button} mb-4`}>
                    {code.type === 'percentage' ? `${code.amount}% OFF` : `$${code.amount} OFF`}
                  </span>
                  <p className={`font-mono text-lg font-bold ${themeConfig.colors.text}`}>{code.code}</p>
                  <p className={`mt-2 text-sm ${themeConfig.colors.text} opacity-80`}>
                    Expires {new Date(code.expiryDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BaseTemplate;