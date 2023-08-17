import { motion, Transition } from "framer-motion";

const dotTransition: Transition = { duration: 0.75, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" };

const LoadingAnimation = () => {
  return (
    <div className="pt-20 w-full flex items-center justify-center">
      <motion.div
        className="flex w-40 h-20 justify-around"
        variants={{ initial: { transition: { staggerChildren: 0.2 } }, animate: { transition: { staggerChildren: 0.2 } } }}
        initial="initial"
        animate="animate"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="m-2 block w-8 h-8 bg-white rounded-full"
            variants={{ initial: { y: "0%" }, animate: { y: "100%" } }}
            transition={dotTransition}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;