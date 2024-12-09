import React from 'react';
import type { PageSettings } from '../../types';
import BaseTemplate from './BaseTemplate';

interface TemplateProps {
  settings: PageSettings;
}

const NewYearTemplate: React.FC<TemplateProps> = ({ settings }) => {
  return (
    <BaseTemplate
      settings={settings}
      theme="newyear"
      heroTitle="New Year, New Deals"
      heroImage="https://images.unsplash.com/photo-1546271876-af6caec5fae5"
    />
  );
};

export default NewYearTemplate;