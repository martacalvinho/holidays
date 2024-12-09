import React from 'react';
import { ShoppingCart, Gift, Sparkles } from 'lucide-react';

interface CTAButtonProps {
  theme: 'winter' | 'christmas' | 'newyear';
  onClick?: () => void;
  children: React.ReactNode;
}

const CTAButton: React.FC<CTAButtonProps> = ({ theme, onClick, children }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case 'winter':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/25';
      case 'christmas':
        return 'bg-gradient-to-r from-red-500 to-green-600 hover:from-red-600 hover:to-green-700 text-white shadow-lg hover:shadow-red-500/25';
      case 'newyear':
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black shadow-lg hover:shadow-yellow-500/25';
      default:
        return '';
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'winter':
        return <ShoppingCart className="w-5 h-5 mr-2" />;
      case 'christmas':
        return <Gift className="w-5 h-5 mr-2" />;
      case 'newyear':
        return <Sparkles className="w-5 h-5 mr-2" />;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${getThemeStyles()}`}
    >
      {getIcon()}
      {children}
    </button>
  );
};

export default CTAButton;