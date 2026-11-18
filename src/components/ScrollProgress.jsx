import { motion, useScroll } from 'framer-motion';

// Thin yellow bar at the top that fills as the visitor scrolls down the page.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="progress" style={{ scaleX: scrollYProgress }} />;
}
