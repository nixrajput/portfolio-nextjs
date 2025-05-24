import type { CoreComponentsProps } from "@/types";

const PageBox = (props: Readonly<CoreComponentsProps>) => {
  const { children, classNames } = props;

  return (
    <div
      className={`relative flex flex-col justify-start items-start w-screen max-w-full p-0 m-0 overflow-hidden transition duration-300 ease-in-out ${classNames}`}
    >
      {children}
    </div>
  );
};

export default PageBox;
