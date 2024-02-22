import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Row from "@/components/core/Row";

const AppBar = ({ children }: Readonly<{ children: string }>) => {
  return (
    <Row classNames="items-center p-0 m-0 gap-2">
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
    </Row>
  );
};

export default AppBar;
