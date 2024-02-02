"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={"topToBottom"}>
      {" "}
      {showTopBtn && (
        <button onClick={goToTop} className="">
          <FontAwesomeIcon
            icon={faArrowUpLong}
            className="iconPosition iconStyle"
          />
        </button>
      )}{" "}
    </div>
  );
};
export default ScrollToTop;
