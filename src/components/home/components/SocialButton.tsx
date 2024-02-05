import type { ISocialLinkItem } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const SocialButton = ({ text, icon, url }: ISocialLinkItem) => {
  return (
    <Link
      className="relative flex flex-row bg-[var(--textColor10)] p-4 rounded-[var(--borderRadius)] items-center text-center justify-center gap-2 cursor-pointer animated__hover"
      href={url}
      target="_blank"
    >
      <span className="text-xl/6 text-[var(--textColor)]">
        <FontAwesomeIcon icon={icon} />
      </span>

      <p className="text-lg/6 font-semibold text-[var(--textColor)]">{text}</p>
    </Link>
  );
};

export default SocialButton;
