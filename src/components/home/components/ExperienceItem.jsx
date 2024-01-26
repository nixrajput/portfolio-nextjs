import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import Column from "@/components/common/Column";
import ReadMoreText from "@/components/common/ReadMoreText";

const ExperienceItem = ({ data }) => {
  return (
    <Column classes="bg-[var(--textColor10)] p-4 rounded-[var(--borderRadius)] w-full h-auto overflow-hidden">
      <FontAwesomeIcon
        icon={faTrophy}
        className="text-2xl md:text-3xl text-[var(--primaryColor)]"
      />

      <p className="font-semibold text-lg mt-4">{data.designation}</p>

      <p className="text-[var(--textColorLight)] font-semibold text-base">
        {data.company}
      </p>

      <div
        className={`mt-4 flex flex-row relative gap-1 items-center px-2 py-0.5 border ${
          data.isCurrentJob
            ? "border-[var(--primaryColor)] text-[var(--primaryColor)]"
            : "border-[var(--textColor)] text-[var(--textColor)]"
        } rounded-[var(--borderRadius)]`}
      >
        <p className="text-xs font-medium uppercase">{data.startDate}</p>

        <span>-</span>

        <p className="text-xs font-medium uppercase">
          {data.isCurrentJob ? "Present" : data.endDate}
        </p>
      </div>

      <p className="text-base font-normal mt-4">{data.shortDescription}</p>

      <button
        type="button"
        className="app__text_btn"
        style={{
          margin: "1rem auto 0",
        }}
      >
        View More
      </button>

      {/* <ReadMoreText className="mt-4 text-[var(--textColorLight)]">
        {data.description}
      </ReadMoreText> */}
    </Column>
  );
};

export default ExperienceItem;
