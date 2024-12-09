import React from 'react';
import { Check } from 'lucide-react';
import type { Template } from '../../types';

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, isSelected, onSelect }) => {
  const getThemeStyles = () => {
    switch (template.theme) {
      case 'winter':
        return 'hover:shadow-[#A5F2F3]/20';
      case 'christmas':
        return 'hover:shadow-[#EA4630]/20';
      case 'newyear':
        return 'hover:shadow-[#F7E7CE]/20';
      default:
        return '';
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
        isSelected ? 'border-indigo-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
      } ${getThemeStyles()}`}
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={template.thumbnail}
          alt={template.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="font-medium text-gray-900">{template.name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {template.theme === 'winter' && 'Elegant winter-themed design with snowfall effects'}
          {template.theme === 'christmas' && 'Festive Christmas design with holiday decorations'}
          {template.theme === 'newyear' && 'Luxurious New Year design with sparkle effects'}
        </p>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 bg-indigo-500 rounded-full p-1">
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default TemplateCard;