import { motion, Transition } from "framer-motion";

const containerVariants = {
  initial: {
      transition: {
      staggerChildren: 0.2
      }
  },
  animate: {
      transition: {
      staggerChildren: 0.2
      }
  }
};

const dotVariants = {
  initial: {
      y: "0%"
  },
  animate: {
      y: "100%"
  }
};

const dotTransition: Transition = { duration: 0.75, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" };

export const LoadingAnimation = () => {
  return (
      <div className="pt-20 w-full flex items-center justify-center">
      <motion.div
          className="flex w-40 h-20 justify-around"
          variants={containerVariants}
          initial="initial"
          animate="animate"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="m-2 block w-8 h-8 bg-white rounded-full"
            variants={dotVariants}
            transition={dotTransition}
          />
      ))}
      </motion.div>
      </div>
  );
};
