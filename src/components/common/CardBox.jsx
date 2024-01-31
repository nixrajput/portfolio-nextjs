"use client";

import { motion, useMotionTemplate, useSpring } from "framer-motion";
import PropTypes from "prop-types";

const CardBox = (props) => {
  const { children, classes } = props;

  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  let maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div
      onMouseMove={onMouseMove}
      className={`relative w-full flex flex-col justify-start items-start duration-500 border rounded-[var(--borderRadius)] hover:bg-zinc-800/10 hover:border-zinc-400/50 border-zinc-600 overflow-hidden group ${classes}`}
    >
      <div className="pointer-events-none">
        <div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-br opacity-100 via-zinc-100/10 transition duration-1000 group-hover:opacity-50"
          style={style}
        />
        <motion.div
          className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
          style={style}
        />
      </div>
      {children}
    </div>
  );
};

CardBox.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string,
};

export default CardBox;
