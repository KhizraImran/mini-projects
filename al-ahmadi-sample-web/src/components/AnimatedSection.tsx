import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  duration?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.7,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const getInitial = () => {
    switch (direction) {
      case 'up':    return { opacity: 0, y: 40 };
      case 'left':  return { opacity: 0, x: -40 };
      case 'right': return { opacity: 0, x: 40 };
      case 'none':  return { opacity: 0 };
      default:      return { opacity: 0, y: 40 };
    }
  };

  const getAnimate = () => {
    if (inView) return { opacity: 1, y: 0, x: 0 };
    return getInitial();
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={getAnimate()}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
