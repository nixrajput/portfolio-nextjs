import { BulletedTextProps } from "@/types";
import { cn } from "@/utils/cn";

const BulletedText = ({
  children,
  iconSize,
  classNames,
  bulletColor,
}: Readonly<BulletedTextProps>) => {
  return (
    <div
      className={cn(
        "relative w-full flex flex-row flex-wrap items-start justify-start pl-6 break-words transition duration-500 ease-in-out",
        classNames
      )}
    >
      <span
        className={`absolute inline-block top-[9px] left-0 bg-[var(--textColor)] rounded-full`}
        style={{
          width: iconSize || "6px",
          height: iconSize || "6px",
          backgroundColor: bulletColor || "var(--textColor)",
        }}
      ></span>

      {children}
    </div>
  );
};

export default BulletedText;
