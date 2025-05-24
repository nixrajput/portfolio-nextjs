import type { IExperienceItem } from "@/types";
import Column from "@/components/core/Column";
import BulletedText from "@/components/common/bulleted-text";

const ExperienceItem = ({ data }: { data: IExperienceItem }) => {
  return (
    <Column classNames="justify-between w-full h-full gap-2">
      <Column classNames="justify-start">
        <p className="text-lg/6 font-semibold">{data.designation}</p>

        <p className="text-[var(--textColorLight)] text-base/6 font-medium">
          @{data.company}
        </p>
      </Column>

      <div className="w-full flex flex-col gap-2 relative mt-0 md:mt-8">
        {data.description.map((desc, i) => {
          return (
            <BulletedText key={`exp-desc-${i}`}>
              <p className="text-base/6 font-normal">{desc}</p>
            </BulletedText>
          );
        })}
      </div>
    </Column>
  );
};

export default ExperienceItem;
