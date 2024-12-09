import React, { useState } from 'react';
import type { PageSettings, Product } from '../../types';
import { themes } from '../../styles/theme';
import BackgroundEffects from '../shared/BackgroundEffects';
import BackgroundPatterns from '../shared/BackgroundPatterns';
import Cart from '../shared/Cart';
import CTAButton from '../shared/CTAButton';
import DiscountBadge from '../shared/DiscountBadge';
import WinterEffects from '../shared/WinterEffects';
import { Timer, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { analytics } from '../../services/analyticsService';

interface BaseTemplateProps {
  settings: PageSettings;
  theme: 'winter' | 'christmas' | 'newyear';
  heroTitle: string;
  heroImage: string;
}

const ProductDescription: React.FC<{ description: string; theme: keyof typeof themes }> = ({ description, theme }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const themeConfig = themes[theme];
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [shouldShowButton, setShouldShowButton] = useState(false);

  // Split text into sentences
  const sentences = description.split(/(?<=[.!?])\s+/);
  const shortText = sentences.slice(0, 3).join(' ');
  const displayText = isExpanded ? description : shortText;

  React.useEffect(() => {
    if (contentRef.current) {
      const hasMoreContent = sentences.length > 3;
      setShouldShowButton(hasMoreContent);
    }
  }, [description, sentences.length]);

  return (
    <div className="product-description-wrapper">
      <div className="product-description" ref={contentRef}>
        <div 
          className={`description-content ${!isExpanded ? 'truncated' : ''}`}
        >
          <p className={`${themeConfig.colors.text} text-sm`}>
            {displayText}
          </p>
        </div>
        
        {!isExpanded && shouldShowButton && (
          <div className="fade-overlay" />
        )}
      </div>

      {shouldShowButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`view-more-button ${themeConfig.colors.accent}`}
        >
          <span>{isExpanded ? 'Show Less' : 'View More'}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
};

const DesktopProductCard: React.FC<{ product: Product; theme: keyof typeof themes; handleAddToCart: (product: Product) => void }> = ({ product, theme, handleAddToCart }) => {
  const themeConfig = themes[theme];

  return (
    <div 
      className={`
        bg-white/95 rounded-lg overflow-hidden
        transform transition-all duration-300 hover:scale-[1.02]
        ${theme === 'winter' ? 'winter-card' : ''}
      `}
    >
      <div className="relative aspect-[3/2]">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover"
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
      <div className="p-6 flex flex-col flex-grow">
        <h3 className={`text-xl font-semibold ${themeConfig.colors.text} mb-3`}>
          {product.title}
        </h3>
        <p className={`${themeConfig.colors.text} text-base leading-relaxed mb-6`}>
          {product.description}
        </p>
        <div className="mt-auto">
          <div className="flex items-baseline gap-3 mb-4">
            <span className={`text-2xl font-bold ${themeConfig.colors.text}`}>
              ${product.discountPrice?.toFixed(2) || product.price.toFixed(2)}
            </span>
            {product.discountPrice && (
              <span className={`text-lg line-through ${themeConfig.colors.text} opacity-50`}>
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <CTAButton
            theme={theme}
            onClick={() => handleAddToCart(product)}
            icon={<ShoppingCart className="w-5 h-5" />}
            className="w-full py-3 text-lg font-medium"
          >
            Add to Cart
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

const BaseTemplate: React.FC<BaseTemplateProps> = ({
  settings,
  theme,
  heroTitle,
  heroImage,
}) => {
  const themeConfig = themes[theme];
  const { addItem } = useCartStore();

  const handleProductClick = (product: any) => {
    analytics.trackProductClick(
      settings.pageId, 
      product.id,
      product.name
    );
  };

  const handleAddToCart = (product: any) => {
    analytics.trackPurchase(
      settings.pageId,
      [{
        id: product.id,
        price: product.price
      }],
      product.price
    );
    addItem(product);
  };

  return (
    <div className={`min-h-screen w-full overflow-x-hidden ${themeConfig.colors.background}`}>
      {/* Winter Effects */}
      {theme === 'winter' && <WinterEffects intensity="medium" />}

      {/* Header - Increased z-index to ensure it's above patterns */}
      <header className={`${themeConfig.effects.header || themeConfig.effects.card} sticky top-0 z-50 bg-opacity-95`}>
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          {settings.logo ? (
            <img src={settings.logo} alt={settings.businessName} className="h-12" />
          ) : (
            <h1 className={`text-2xl font-bold ${themeConfig.colors.text} ${theme === 'winter' ? 'winter-text' : ''}`}
              data-text={settings.businessName ? 
                `${settings.businessName}${settings.showHolidayEdition ? ' - Holiday Edition' : ''}` : 
                'Holiday Store'}>
              {settings.businessName ? 
                `${settings.businessName}${settings.showHolidayEdition ? ' - Holiday Edition' : ''}` : 
                'Holiday Store'}
            </h1>
          )}
          {settings.showDiscountCodes && settings.discountCodes.length > 0 && (
            <div className="relative group">
              <button
                className={`${themeConfig.effects.card} px-4 py-2 rounded-full text-sm font-medium ${themeConfig.colors.text} hover:opacity-90 transition-opacity duration-200`}
              >
                View Discount Codes
              </button>
              <div className="absolute right-0 mt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                <div className={`${themeConfig.effects.card} p-4 rounded-xl shadow-xl`}>
                  <h3 className={`text-lg font-bold ${themeConfig.colors.text} mb-3`}>Special Offers</h3>
                  <div className="space-y-3">
                    {settings.discountCodes.map((code) => (
                      <div key={code.code} className={`${themeConfig.effects.card} p-3 rounded-lg`}>
                        <div className={`text-lg font-bold ${themeConfig.colors.text}`}>{code.code}</div>
                        <div className={`${themeConfig.colors.text} opacity-75`}>
                          {code.type === 'percentage' ? `${code.amount}% OFF` : `$${code.amount} OFF`}
                        </div>
                        {code.expiryDate && (
                          <div className="text-sm mt-1 opacity-75">
                            Expires: {new Date(code.expiryDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - No background pattern here */}
      <div className="relative">
        <div className="absolute inset-0">
          <img 
            src={settings.headerImage || heroImage}
            alt={heroTitle}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${themeConfig.colors.overlay}`} />
        </div>
        <BackgroundEffects theme={theme} />
        
        <div className="relative max-w-7xl mx-auto py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
          <h1 className={`text-4xl sm:text-6xl font-bold text-center ${themeConfig.colors.text} mb-6 ${themeConfig.fonts.heading}`}>
            {settings.headerTitle || heroTitle}
          </h1>
          {settings.countdownEnd && (
            <div className="text-center">
              <div className={`inline-flex items-center px-6 py-3 rounded-full ${themeConfig.effects.card}`}>
                <Timer className={`mr-3 ${themeConfig.colors.text}`} />
                <span className={`font-mono text-lg font-medium ${themeConfig.colors.text}`}>
                  {new Date(settings.countdownEnd).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Section */}
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <BackgroundPatterns theme={theme} />
        </div>
        
        {/* Desktop/Tablet Layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {settings.products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <DesktopProductCard product={product} theme={theme} handleAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {(settings.contactEmail || settings.contactPhone) && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 text-center">
          <div className={`${themeConfig.effects.card} p-8 rounded-2xl`}>
            <h2 className={`text-2xl font-bold ${themeConfig.colors.text} mb-6`}>Contact Us</h2>
            <div className="space-y-4">
              {settings.contactEmail && (
                <div className="flex items-center justify-center space-x-2">
                  <svg className={`w-5 h-5 ${themeConfig.colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${settings.contactEmail}`} className={`${themeConfig.colors.text} hover:underline`}>
                    {settings.contactEmail}
                  </a>
                </div>
              )}
              {settings.contactPhone && (
                <div className="flex items-center justify-center space-x-2">
                  <svg className={`w-5 h-5 ${themeConfig.colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${settings.contactPhone}`} className={`${themeConfig.colors.text} hover:underline`}>
                    {settings.contactPhone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Cart theme={theme} />
    </div>
  );
};

export default BaseTemplate;