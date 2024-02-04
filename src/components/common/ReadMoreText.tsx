"use client";

import { useState } from "react";

const ReadMoreText = ({
  children,
  className,
  visibleTextCount = 150,
}: {
  children: string;
  className: string;
  visibleTextCount: number;
}) => {
  const text = children;

  const [isReadMore, setIsReadMore] = useState<boolean>(true);

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

export default ReadMoreText;
