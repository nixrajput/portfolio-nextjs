import { ComponentsCommonProps } from "@/types";
import PropTypes from "prop-types";
import { MouseEventHandler, ReactNode, RefObject } from "react";

const Row = (props: ComponentsCommonProps) => {
  const { children, classes, onClick, id, elementRef } = props;

  return (
    <div
      className={`relative flex flex-row justify-start items-start transition duration-300 ease-in-out ${classes}`}
      onClick={onClick}
      id={id}
      ref={elementRef}
    >
      {children}
    </div>
  );
};

Row.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
  elementRef: PropTypes.any,
};

export default Row;
