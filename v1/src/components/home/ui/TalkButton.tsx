import Link from "next/link";
import Strings from "@/constants/strings";

const TalkButton = () => {
  return (
    <Link
      className="app__filled_btn min-w-[10rem]"
      href={Strings.telegramLink}
      target="_blank"
    >
      Let&apos;s Talk
    </Link>
  );
};

export default TalkButton;
