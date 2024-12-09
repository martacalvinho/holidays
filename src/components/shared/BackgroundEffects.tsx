import React from 'react';
import { Snowflake, Star } from 'lucide-react';

interface BackgroundEffectsProps {
  theme: 'winter' | 'christmas' | 'newyear';
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ theme }) => {
  const renderEffect = () => {
    switch (theme) {
      case 'winter':
        return Array.from({ length: 20 }).map((_, i) => (
          <Snowflake
            key={i}
            className="snowflake text-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          />
        ));
      case 'christmas':
        return Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="twinkle absolute w-2 h-2 rounded-full bg-yellow-300/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ));
      case 'newyear':
        return Array.from({ length: 25 }).map((_, i) => (
          <Star
            key={i}
            className="sparkle absolute text-yellow-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {renderEffect()}
    </div>
  );
};

export default BackgroundEffects;