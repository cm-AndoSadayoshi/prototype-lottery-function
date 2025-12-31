export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};

export const springConfig = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

export const capsuleDropAnimation = {
  initial: { y: -100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export const bounceAnimation = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 0.5,
      times: [0, 0.5, 1],
      repeat: 2,
    },
  },
};

export const glowAnimation = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(255, 215, 0, 0.5)",
      "0 0 40px rgba(255, 215, 0, 0.8)",
      "0 0 20px rgba(255, 215, 0, 0.5)",
    ],
    transition: {
      duration: 1,
      repeat: Infinity,
    },
  },
};

export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
    },
  },
};

export const cardFlipAnimation = {
  initial: { rotateY: 0 },
  flipped: { rotateY: 180 },
  transition: { duration: 0.6 },
};
