import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface NewYearSparkleProps {
  children: React.ReactNode;
}

const NewYearSparkle: React.FC<NewYearSparkleProps> = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const newYear = new Date(now.getFullYear() + 1, 0, 1);
      const difference = newYear.getTime() - now.getTime();

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="template-container new-year-sparkle">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Champagne Bubbles Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#F7E7CE] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-10px',
              }}
              animate={{
                y: [0, -window.innerHeight],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* Countdown Timer */}
        <div className="absolute top-4 right-4 bg-black/80 p-4 rounded-lg border border-[#F7E7CE]">
          <div className="text-[#F7E7CE] text-sm">
            Time Until New Year
          </div>
          <div className="flex gap-4 text-[#E8E8E8]">
            <div>
              <span className="text-2xl">{timeLeft.days}</span>
              <span className="text-xs block">days</span>
            </div>
            <div>
              <span className="text-2xl">{timeLeft.hours}</span>
              <span className="text-xs block">hours</span>
            </div>
            <div>
              <span className="text-2xl">{timeLeft.minutes}</span>
              <span className="text-xs block">mins</span>
            </div>
            <div>
              <span className="text-2xl">{timeLeft.seconds}</span>
              <span className="text-xs block">secs</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default NewYearSparkle;
