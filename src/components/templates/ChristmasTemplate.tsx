import React from 'react';
import type { PageSettings } from '../../types';
import BaseTemplate from './BaseTemplate';

interface TemplateProps {
  settings: PageSettings;
}

const ChristmasTemplate: React.FC<TemplateProps> = ({ settings }) => {
  return (
    <BaseTemplate
      settings={settings}
      theme="christmas"
      heroTitle="Christmas Magic Sale"
      heroImage="https://images.unsplash.com/photo-1543589077-47d81606c1bf"
    />
  );
};

export default ChristmasTemplate;