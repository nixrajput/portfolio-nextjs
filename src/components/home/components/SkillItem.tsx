import Image from "next/image";
import CardBox from "@/components/common/CardBox";
import { SkillItem } from "@/types";

const SkillItem = ({ item }: {item: SkillItem}) => {
  return (
    <CardBox classes="p-4 items-center justify-center text-center bg-[var(--textColor10)] w-full min-w-[10rem] aspect-square group">
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

      <p className="text-lg/6 font-bold mt-8">{item.title}</p>
    </CardBox>
  );
};

export default SkillItem;
