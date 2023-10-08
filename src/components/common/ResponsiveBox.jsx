"use client";

import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ResponsiveBox = (props) => {
  const { children, classNames, animateReverse, id, elementRef } = props;

  return (
    <motion.div
      id={id}
      ref={elementRef}
      initial={{ x: animateReverse ? "100%" : "-100%", opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        duration: 0.8,
        bounce: 0.4,
        stiffness: 100,
      }}
      viewport={{ amount: "some" }}
      className={`relative flex flex-col justify-start items-start w-full h-auto p-0 mx-auto my-0 overflow-hidden transition duration-300 ease-in-out ${classNames}`}
    >
      {children}
    </motion.div>
  );
};

ResponsiveBox.propTypes = {
  children: PropTypes.node,
  classNames: PropTypes.string,
  animateReverse: PropTypes.bool,
  id: PropTypes.string,
  elementRef: PropTypes.any,
};

export default ResponsiveBox;
