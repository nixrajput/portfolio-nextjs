import Link from "next/link";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Column from "@/components/core/Column";

const Modal = ({
  children,
  closeHref,
}: Readonly<{ children: ReactNode; closeHref: any }>) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-[var(--blackColor50)] z-[99997] overflow-hidden">
      <div className="relative bg-[var(--dialogColor)] rounded-[var(--defaultRadius)] top-1/2 left-1/2 w-[calc(100vw-2rem)] max-w-[60rem] max-h-[calc(100vh-2rem)] translate-x-[-50%] translate-y-[-50%] z-[99998] transition-transform duration-300 ease-out shadow-[0_5px_10px_rgba(0,0,0,0.3)] overflow-hidden">
        <Link
          scroll={false}
          href={closeHref}
          className="flex items-center justify-center border-none outline-none z-[99999] absolute right-4 top-4"
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="text-2xl/6 md:text-3xl/6 text-[var(--textColor)] hover:scale-110 transition duration-300 ease-in-out"
          />
        </Link>

        <Column classNames="w-full h-full p-4 mt-8 overflow-hidden">
          {children}
        </Column>
      </div>
    </div>
  );
};

export default Modal;
