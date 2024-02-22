import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ResponsiveBox from "@/components/core/ResponsiveBox";
import ConstraintedBox from "@/components/core/ConstraintedBox";

const AppBar = ({ children }: Readonly<{ children: string }>) => {
  return (
    <ResponsiveBox>
      <ConstraintedBox classNames="flex !flex-row items-center p-4 gap-4">
        <Link
          href="/"
          className="app__outlined_btn !rounded-full !p-2 lg:!p-3 !aspect-square !border-[var(--textColor)]"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-lg/6 text-[var(--textColor)]"
          />
        </Link>

        <p className="text-xl/6 font-bold">{children}</p>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default AppBar;
