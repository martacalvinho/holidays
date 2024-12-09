import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { PageSettings } from '../../types';
import BaseTemplate from './BaseTemplate';
import { Snowflake } from 'lucide-react';

interface SnowflakeProps {
  delay: number;
  duration: number;
  size: number;
  startX: number;
}

const WinterSnowflake: React.FC<SnowflakeProps> = ({ delay, duration, size, startX }) => {
  return (
    <motion.div
      className="snowflake absolute"
      style={{
        left: `${startX}%`,
        top: '-20px',
        width: size,
        height: size,
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: ['0vh', '100vh'],
        x: [0, size * 2, -size * 2, 0],
        opacity: [0, 1, 1, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: 'linear',
      }}
    >
      <Snowflake className="text-white/80" size={size} />
    </motion.div>
  );
};

const WinterTemplate: React.FC<{ settings: PageSettings }> = ({ settings }) => {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; props: SnowflakeProps }>>([]);

  useEffect(() => {
    const generateSnowflakes = () => {
      return Array.from({ length: 20 }, (_, i) => ({
        id: i,
        props: {
          delay: Math.random() * 5,
          duration: 5 + Math.random() * 5,
          size: 12 + Math.random() * 12,
          startX: Math.random() * 100,
        },
      }));
    };

    setSnowflakes(generateSnowflakes());
  }, []);

  return (
    <>
      {/* Snowfall Effect Container */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {snowflakes.map(({ id, props }) => (
          <WinterSnowflake key={id} {...props} />
        ))}
      </div>

      {/* Main Template */}
      <div className="winter-template">
        <BaseTemplate
          settings={settings}
          theme="winter"
          heroTitle="Winter Wonderland Sale"
          heroImage="https://images.unsplash.com/photo-1544273677-c433136021d4"
        />
      </div>
    </>
  );
};

export default WinterTemplate;