import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function FutureBackground() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 18]);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#030308]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,255,0.35),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(0,240,255,0.12),transparent)]" />

      <motion.div
        style={{ y: y1 }}
        className="absolute -left-[20%] top-[10%] h-[min(90vw,720px)] w-[min(90vw,720px)] rounded-full bg-[conic-gradient(from_120deg,rgba(99,102,241,0.35),rgba(236,72,153,0.25),rgba(34,211,238,0.2),rgba(99,102,241,0.35))] blur-[100px] opacity-70"
      />
      <motion.div
        style={{ y: y2, rotate }}
        className="absolute -right-[15%] bottom-[5%] h-[min(70vw,560px)] w-[min(70vw,560px)] rounded-full bg-[conic-gradient(from_200deg,rgba(34,211,238,0.3),rgba(168,85,247,0.28),rgba(59,130,246,0.22),rgba(34,211,238,0.3))] blur-[90px] opacity-60"
      />

      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
        }}
      />

      {!reduce && (
        <motion.div
          className="absolute left-1/2 top-1/4 h-px w-[140%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.04%22/%3E%3C/svg%3E')] opacity-60 mix-blend-overlay" />
    </div>
  );
}
