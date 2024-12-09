import React from 'react';

interface BackgroundPatternsProps {
  theme: 'winter' | 'christmas' | 'newyear';
}

const BackgroundPatterns: React.FC<BackgroundPatternsProps> = ({ theme }) => {
  const patterns = {
    winter: (
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url('/snowflakes.svg')`,
          backgroundSize: '100px',
          backgroundRepeat: 'repeat',
        }} />
      </div>
    ),
    christmas: (
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #EA4630,
            #EA4630 10px,
            transparent 10px,
            transparent 20px
          )`,
          opacity: '0.15',
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
        }} />
      </div>
    ),
    newyear: (
      <div className="absolute inset-0 opacity-8">
        <div className="absolute inset-0" style={{
          backgroundImage: `url('/confetti.svg')`,
          backgroundSize: '150px',
          backgroundRepeat: 'repeat',
        }} />
      </div>
    ),
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {patterns[theme] || null}
    </div>
  );
};

export default BackgroundPatterns;