import type { IExperienceItem } from "@/types";
import { Balancer } from "react-wrap-balancer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import CardBox from "@/components/core/CardBox";
import Column from "@/components/core/Column";

const ExperienceItem = ({ data }: { data: IExperienceItem }) => {
  return (
    <CardBox classNames="p-4 items-center text-center bg-[var(--textColor10)] group min-h-80">
      <Column classNames="items-center justify-between w-full h-full gap-12">
        <Column classNames="items-center justify-start">
          <FontAwesomeIcon
            icon={faTrophy}
            className="text-3xl/6 md:text-4xl/6 text-[var(--primaryColor)]"
          />

          <p className="text-lg/6 font-semibold mt-4">{data.designation}</p>

          <p className="text-[var(--textColorLight)] text-base/6 font-medium">
            {data.company}
          </p>
        </Column>

        <div
          className={`flex flex-row relative gap-1 items-center justify-center px-2 py-0.5 border ${
            data.isCurrentJob
              ? "border-[var(--primaryColor)] text-[var(--primaryColor)]"
              : "border-[var(--textColor)] text-[var(--textColor)]"
          } rounded-[var(--borderRadius)]`}
        >
          <p className="text-xs/6 font-medium uppercase">{data.startDate}</p>

          <span>-</span>

          <p className="text-xs/6 font-medium uppercase">
            {data.isCurrentJob ? "Present" : data.endDate}
          </p>
        </div>

        <p className="text-base/6 font-normal">
          <Balancer>{data.shortDescription}</Balancer>
        </p>
      </Column>

      <div className="absolute left-0 right-0 top-[-200%] bottom-0 w-full h-auto min-h-full scroll-smooth overflow-hidden overflow-y-auto p-4 bg-zinc-800 hidden invisible opacity-0 transition duration-500 ease-in-out slide_in group-hover:flex group-hover:top-0 group-hover:visible group-hover:opacity-100 group-hover:z-10">
        <p className="text-base/6 font-normal m-auto text-center">
          <Balancer preferNative={false}> {data.description}</Balancer>
        </p>
      </div>
    </CardBox>
  );
};

export default ExperienceItem;
