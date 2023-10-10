"use client";

import { useState } from "react";
import PropTypes from "prop-types";

const ReadMoreText = ({ children, className, visibleTextCount = 150 }) => {
  const text = children;

  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <p
      className={`w-full inline transition duration-500 ease-in-out slide_in ${className}`}
    >
      {text.slice(0, isReadMore ? visibleTextCount : text.length)}
      <span
        onClick={toggleReadMore}
        className="text-[var(--primaryColor)] cursor-pointer"
      >
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

ReadMoreText.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  visibleTextCount: PropTypes.number,
};

export default ReadMoreText;
