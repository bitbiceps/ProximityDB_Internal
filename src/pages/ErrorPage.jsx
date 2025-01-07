import React from "react";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="h-screen bg-gradient-to-r flex flex-col justify-center items-center  font-sans">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.h1
          className="text-9xl font-bold tracking-wide"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          404
        </motion.h1>

        <motion.p
          className="mt-4 text-2xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>

        <motion.a
          href="/"
          className="mt-6 text-lg font-medium  hover:text-indigo-400"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Go Back Home
        </motion.a>
      </motion.div>

      <motion.div
        className="absolute bottom-8 text-center text-sm "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        <p>Made with ❤️ at Cache Labs</p>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
