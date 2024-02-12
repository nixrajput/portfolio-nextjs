import type { ISkillListItem } from "@/types";
import Image from "next/image";
import CardBox from "@/components/core/CardBox";
import Row from "@/components/core/Row";

const SkillItem = ({ data }: { data: ISkillListItem }) => {
  return (
    <CardBox classNames="p-4 items-center justify-start bg-[var(--textColor10)] w-full group">
      <p className="text-lg/6 font-semibold text-center">{data.title}</p>

      {data.items.length > 0 ? (
        <Row classNames="gap-2 mt-8 flex-wrap justify-center items-center">
          {data.items.map((skill, index) => {
            return (
              <Row
                key={`skill-item-${index}`}
                classNames="items-center gap-1 px-2 py-0.5 border border-[var(--textColor)] text-[var(--textColor)] rounded-[var(--borderRadius)]"
              >
                {skill.icon ? (
                  <Image
                    src={skill.icon}
                    alt={`logo-${skill.title}`}
                    width={144}
                    height={144}
                    sizes="100%"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="/images/logical-thinking.png"
                    className="w-4 lg:w-6 h-auto aspect-square object-cover"
                  />
                ) : null}

                <p className="text-xs/6 font-normal">{skill.title}</p>
              </Row>
            );
          })}
        </Row>
      ) : null}
    </CardBox>
  );
};

export default SkillItem;
