import React from 'react';
import { Tag, Gift, Star } from 'lucide-react';

interface DiscountBadgeProps {
  theme: 'winter' | 'christmas' | 'newyear';
  amount: string;
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ theme, amount }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case 'winter':
        return 'bg-blue-100 text-blue-800 ring-blue-500/30';
      case 'christmas':
        return 'bg-red-100 text-red-800 ring-red-500/30';
      case 'newyear':
        return 'bg-yellow-100 text-yellow-800 ring-yellow-500/30';
      default:
        return '';
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'winter':
        return <Tag className="w-4 h-4 mr-1" />;
      case 'christmas':
        return <Gift className="w-4 h-4 mr-1" />;
      case 'newyear':
        return <Star className="w-4 h-4 mr-1" />;
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ring-2 ${getThemeStyles()}`}>
      {getIcon()}
      {amount}
    </span>
  );
};

export default DiscountBadge;