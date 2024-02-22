import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Row from "@/components/core/Row";

const AppBar = ({ children }: Readonly<{ children: string }>) => {
  return (
    <Row classNames="gap-4">
      <Link href="/" className="p-0 m-0">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="text-2xl/6 md:text-3xl/6 text-[var(--textColor)]"
        />
      </Link>

      <p className="text-2xl/6 md:text-3xl/6 font-bold">{children}</p>
    </Row>
  );
};

export default AppBar;
