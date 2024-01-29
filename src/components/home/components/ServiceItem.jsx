import Image from "next/image";
import CardBox from "@/components/common/CardBox";
import ReadMoreText from "@/components/common/ReadMoreText";

const ServiceItem = ({ data }) => {
  return (
    <CardBox classes="p-4 items-center text-center bg-[var(--textColor10)]">
      <Image
        src={data.image}
        alt={`service-${data.title}`}
        width={100}
        height={100}
        sizes="100%"
        loading="lazy"
        placeholder="blur"
        blurDataURL={data.image}
        style={{
          width: "5rem",
          height: "auto",
          aspectRatio: "1 / 1",
        }}
      />

      <h5 className="font-bold mt-4">{data.title}</h5>

      <span className="w-[3rem] h-[0.125rem] bg-[var(--primaryColor)] mx-auto my-4"></span>

      <ReadMoreText visibleTextCount={120}>{data.description}</ReadMoreText>
    </CardBox>
  );
};

export default ServiceItem;
