import type { MouseEventHandler, RefObject, ReactNode } from "react";

const ConstraintedBox = (props: {
  children: ReactNode;
  classNames?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  id?: string;
  elementRef?: RefObject<HTMLDivElement>;
}) => {
  const { children, classNames, onClick, id, elementRef } = props;

  return (
    <div
      className={`relative flex flex-col justify-start items-start w-full constrained-width p-0 mx-auto my-0 overflow-hidden transition duration-300 ease-in-out drop_in ${classNames}`}
      onClick={onClick}
      id={id}
      ref={elementRef}
    >
      {children}
    </div>
  );
};

export default ConstraintedBox;
