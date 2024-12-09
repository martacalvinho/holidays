import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  theme: 'winter' | 'christmas' | 'newyear';
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ theme }) => {
  const renderSnowflakes = () => {
    return Array.from({ length: 50 }).map((_, i) => {
      const size = Math.random() * 10 + 5;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 10;
      
      return (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: size,
            height: size,
            left: `${Math.random() * 100}%`,
            top: -20,
            filter: 'blur(1px)',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
          }}
          animate={{
            y: ['0vh', '100vh'],
            x: ['-20px', '20px'],
            rotate: [0, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: delay,
            ease: 'linear',
          }}
        />
      );
    });
  };

  const renderTwinklingLights = () => {
    return Array.from({ length: 30 }).map((_, i) => {
      const size = Math.random() * 4 + 2;
      return (
        <motion.div
          key={i}
          className="absolute bg-yellow-300"
          style={{
            width: size,
            height: size,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(255, 255, 0, 0.8)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      );
    });
  };

  const renderSparkles = () => {
    return Array.from({ length: 30 }).map((_, i) => {
      const size = Math.random() * 6 + 2;
      return (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: size,
            height: size,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'radial-gradient(circle, #F7E7CE 20%, transparent 70%)',
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
        />
      );
    });
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {theme === 'winter' && (
        <>
          {renderSnowflakes()}
          <div className="absolute inset-0 bg-gradient-to-b from-winter-light/10 to-transparent" />
        </>
      )}
      {theme === 'christmas' && renderTwinklingLights()}
      {theme === 'newyear' && renderSparkles()}
    </div>
  );
};

export default BackgroundEffects;