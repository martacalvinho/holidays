import React from 'react';
import { motion } from 'framer-motion';

interface ChristmasJoyProps {
  children: React.ReactNode;
}

const ChristmasJoy: React.FC<ChristmasJoyProps> = ({ children }) => {
  return (
    <div className="template-container christmas-joy">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Twinkling Lights Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [1, 0.5, 1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Holly Corner Decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none">
          <img src="/holly.svg" alt="" className="w-full h-full" />
        </div>
        <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none transform rotate-180">
          <img src="/holly.svg" alt="" className="w-full h-full" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default ChristmasJoy;
