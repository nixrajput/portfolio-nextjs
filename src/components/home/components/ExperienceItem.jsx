import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import CardBox from "@/components/common/CardBox";

const ExperienceItem = ({ data }) => {
  return (
    <CardBox classes="p-4 items-center text-center bg-[var(--textColor10)] group">
      <FontAwesomeIcon
        icon={faTrophy}
        className="text-2xl/6 md:text-3xl/6 text-[var(--primaryColor)]"
      />

      <p className="text-lg/6 font-bold mt-4">{data.designation}</p>

      <p className="text-[var(--textColorLight)] text-base/6 font-medium">
        {data.company}
      </p>

      <div
        className={`my-8 flex flex-row relative gap-1 items-center justify-center px-2 py-0.5 border ${
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

      <p className="text-base/6 font-normal">{data.shortDescription}</p>

      <div className="absolute left-0 right-0 top-[-200%] bottom-0 w-full h-auto min-h-full scroll-smooth overflow-x-scroll p-4 bg-zinc-800 hidden invisible opacity-0 transition duration-500 ease-in-out slide_in group-hover:flex group-hover:top-0 group-hover:visible group-hover:opacity-100 group-hover:z-10">
        <p className="text-base/6 font-normal m-auto text-center">
          {data.description}
        </p>
      </div>
    </CardBox>
  );
};

export default ExperienceItem;
