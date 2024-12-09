import React from 'react';
import { usePageStore } from '../../store/pageStore';
import TemplateCard from './TemplateCard';
import type { Template } from '../../types';

const templates: Template[] = [
  {
    id: 'winter-wonderland',
    name: 'Winter Wonderland',
    thumbnail: 'https://images.unsplash.com/photo-1544273677-c433136021d4',
    theme: 'winter'
  },
  {
    id: 'christmas-joy',
    name: 'Christmas Joy',
    thumbnail: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf',
    theme: 'christmas'
  },
  {
    id: 'new-year-sparkle',
    name: 'New Year Sparkle',
    thumbnail: 'https://images.unsplash.com/photo-1546271876-af6caec5fae5',
    theme: 'newyear'
  }
];

const TemplateGrid: React.FC = () => {
  const { settings, setTemplate } = usePageStore();

  const handleTemplateSelect = (template: Template) => {
    setTemplate(template);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          isSelected={settings.template.id === template.id}
          onSelect={() => handleTemplateSelect(template)}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;