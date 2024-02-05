import type { CoreComponentsProps } from "@/types";

const ResponsiveBox = (props: Readonly<CoreComponentsProps>) => {
  const { children, classNames, id, elementRef, onClick } = props;

  return (
    <div
      className={`relative flex flex-col justify-start items-start w-full h-auto p-0 mx-auto my-0 overflow-hidden transition duration-300 ease-in-out ${classNames}`}
      id={id}
      ref={elementRef}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ResponsiveBox;
