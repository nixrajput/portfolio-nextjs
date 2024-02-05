import type { ISkillItem } from "@/types";
import Image from "next/image";
import CardBox from "@/components/core/CardBox";

const SkillItem = ({ item }: { item: ISkillItem }) => {
  return (
    <CardBox classNames="p-4 items-center justify-center text-center bg-[var(--textColor10)] w-full min-w-[10rem] aspect-square group">
      <Image
        src={item.icon}
        alt={`skill-${item.title}`}
        width={100}
        height={100}
        sizes="100%"
        loading="lazy"
        placeholder="blur"
        blurDataURL={item.icon}
        className="w-12 lg:w-16 h-auto aspect-square object-cover"
      />

      <p className="text-lg/6 font-semibold mt-8">{item.title}</p>
    </CardBox>
  );
};

export default SkillItem;
