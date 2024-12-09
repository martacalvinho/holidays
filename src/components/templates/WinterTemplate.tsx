import React from 'react';
import type { PageSettings } from '../../types';
import BaseTemplate from './BaseTemplate';

interface TemplateProps {
  settings: PageSettings;
}

const WinterTemplate: React.FC<TemplateProps> = ({ settings }) => {
  return (
    <BaseTemplate
      settings={settings}
      theme="winter"
      heroTitle="Winter Wonderland Sale"
      heroImage="https://images.unsplash.com/photo-1544273677-c433136021d4"
    />
  );
};

export default WinterTemplate;