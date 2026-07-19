import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface GoldDividerProps {
  className?: string;
}

const GoldDivider: React.FC<GoldDividerProps> = ({ className = '' }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div ref={ref} className={`flex items-center justify-center py-8 ${className}`}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-4 w-full max-w-md"
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/60" />
        <motion.div
          animate={inView ? { rotate: [0, 360] } : {}}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="text-[#C9A84C] text-sm"
        >
          ✦
        </motion.div>
        <div className="w-8 h-px bg-[#C9A84C]/60" />
        <motion.div
          animate={inView ? { rotate: [0, -360] } : {}}
          transition={{ duration: 1.5, delay: 1 }}
          className="text-[#C9A84C] text-base"
        >
          ◆
        </motion.div>
        <div className="w-8 h-px bg-[#C9A84C]/60" />
        <motion.div
          animate={inView ? { rotate: [0, 360] } : {}}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="text-[#C9A84C] text-sm"
        >
          ✦
        </motion.div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/60" />
      </motion.div>
    </div>
  );
};

export default GoldDivider;
