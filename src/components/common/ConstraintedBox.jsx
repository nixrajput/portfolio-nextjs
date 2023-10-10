"use client";

import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ConstraintedBox = (props) => {
  const { children, classNames, onClick, id, elementRef, animateReverse } =
    props;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ amount: 0.5 }}
      className={`relative flex flex-col justify-start items-start w-full constrained-width p-0 mx-auto my-0 overflow-hidden transition duration-300 ease-in-out drop_in ${classNames}`}
      onClick={onClick}
      id={id}
      ref={elementRef}
    >
      {children}
    </motion.div>
  );
};

ConstraintedBox.propTypes = {
  children: PropTypes.node,
  classNames: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
  elementRef: PropTypes.any,
  animateReverse: PropTypes.bool,
};

export default ConstraintedBox;
