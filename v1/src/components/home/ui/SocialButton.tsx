import type { ISocialLinkItem } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const SocialButton = ({ text, icon, url }: ISocialLinkItem) => {
  return (
    <Link
      className="relative flex flex-row bg-[var(--textColor10)] p-4 rounded-[var(--borderRadius)] items-center text-center justify-center gap-2 cursor-pointer overflow-hidden z-[1] transition duration-500 ease-in-out before:content-[''] before:w-full before:h-full before:m-auto before:absolute before:top-0 before:left-[-100%] before:bg-[var(--primaryColor50)] before:z-[-1] before:transition-all before:duration-500 before:ease hover:before:top-0 hover:before:left-0 hover:before:border-0 hover:before:translate-x-0"
      href={url}
      target="_blank"
    >
      <span className="text-xl/6 text-[var(--textColor)]">
        {typeof icon === "string" ? (
          <Image
            src={icon}
            alt={`social-${text}`}
            width={100}
            height={100}
            className="w-[1.5rem] h-auto aspect-square"
          />
        ) : (
          <FontAwesomeIcon icon={icon} />
        )}
      </span>

      <p className="text-lg/6 font-semibold text-[var(--textColor)]">{text}</p>
    </Link>
  );
};

export default SocialButton;
