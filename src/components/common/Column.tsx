import type { ComponentsCommonProps } from "@/types";

const Column = (props: ComponentsCommonProps) => {
  const { children, classes, onClick, id, elementRef } = props;

  return (
    <div
      className={`relative flex flex-col justify-start items-start transition duration-300 ease-in-out ${classes}`}
      onClick={onClick}
      id={id}
      ref={elementRef}
    >
      {children}
    </div>
  );
};

export default Column;
