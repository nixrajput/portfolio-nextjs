import Image from "next/image";
import Column from "@/components/common/Column";

const SkillItem = ({ item }) => {
  return (
    <Column classes="bg-[var(--textColor10)] p-4 rounded-[var(--borderRadius)] items-center justify-center text-center w-full min-w-[10rem] aspect-square overflow-hidden">
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

      <h5 className="font-bold mt-8">{item.title}</h5>
    </Column>
  );
};

export default SkillItem;
