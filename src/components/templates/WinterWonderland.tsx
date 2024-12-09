import React from 'react';
import { motion } from 'framer-motion';

interface WinterWonderlandProps {
  children: React.ReactNode;
}

const WinterWonderland: React.FC<WinterWonderlandProps> = ({ children }) => {
  return (
    <div className="template-container winter-wonderland">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Snowfall Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
              animate={{
                y: ['0vh', '100vh'],
                x: ['-10px', '10px'],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default WinterWonderland;
