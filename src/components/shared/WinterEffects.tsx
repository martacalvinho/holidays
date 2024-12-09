import React from 'react';
import { motion } from 'framer-motion';

interface WinterEffectsProps {
  intensity?: 'light' | 'medium' | 'heavy';
}

const WinterEffects: React.FC<WinterEffectsProps> = ({ intensity = 'medium' }) => {
  const getFrostOpacity = () => {
    switch (intensity) {
      case 'light':
        return 0.1;
      case 'heavy':
        return 0.3;
      default:
        return 0.2;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Frost Pattern */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(165, 242, 243, ${getFrostOpacity()}) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(212, 241, 249, ${getFrostOpacity()}) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, ${getFrostOpacity()}) 0%, transparent 70%)
          `,
        }}
      />

      {/* Sparkle Effects */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Frost Border Effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, rgba(255,255,255,0.1) 0%, transparent 100%) top,
            linear-gradient(to left, rgba(255,255,255,0.1) 0%, transparent 100%) bottom
          `,
          backgroundSize: '100% 1px',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </div>
  );
};

export default WinterEffects;
