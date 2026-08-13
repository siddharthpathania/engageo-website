'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress(): JSX.Element {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[100] h-0.5 origin-left bg-gradient-brand"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
