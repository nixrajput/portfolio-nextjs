import type { ComponentsCommonProps } from "@/types";

const WrappedBox = (props: ComponentsCommonProps) => {
  const { children, classes, onClick, id, elementRef } = props;

  return (
    <div
      className={`relative w-full grid grid-cols-1 sm:grid-cols-2 gap-4 transition duration-300 ease-in-out ${classes}`}
      onClick={onClick}
      id={id}
      ref={elementRef}
    >
      {children}
    </div>
  );
};

export default WrappedBox;
