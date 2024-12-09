import React from 'react';

interface BackgroundPatternsProps {
  theme: 'winter' | 'christmas' | 'newyear';
}

const BackgroundPatterns: React.FC<BackgroundPatternsProps> = ({ theme }) => {
  const getPattern = () => {
    switch (theme) {
      case 'winter':
        return (
          <svg className="absolute inset-0 w-full h-full opacity-[0.1]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="snowflake-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M25,0 L25,50 M0,25 L50,25 M12.5,12.5 L37.5,37.5 M37.5,12.5 L12.5,37.5" 
                      stroke="#A5F2F3" strokeWidth="1" fill="none"/>
                <circle cx="25" cy="25" r="2" fill="#A5F2F3"/>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#snowflake-pattern)" />
          </svg>
        );
      case 'christmas':
        return (
          <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="candy-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="20" height="20" fill="#EA4630" opacity="0.1"/>
                <path d="M-5,5 L25,35 M-5,25 L25,55" stroke="#146B3A" strokeWidth="2"/>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#candy-pattern)" />
          </svg>
        );
      case 'newyear':
        return (
          <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="confetti-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="1" fill="#F7E7CE"/>
                <circle cx="20" cy="20" r="1.5" fill="#E8E8E8"/>
                <circle cx="35" cy="35" r="1" fill="#F7E7CE"/>
                <path d="M15,15 L25,25" stroke="#F7E7CE" strokeWidth="0.5"/>
                <path d="M30,10 L35,15" stroke="#E8E8E8" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#confetti-pattern)" />
          </svg>
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {getPattern()}
    </div>
  );
};

export default BackgroundPatterns;