import Image from "next/image";
import CardBox from "@/components/common/CardBox";

const ServiceItem = ({ data }) => {
  return (
    <CardBox classes="p-4 items-center text-center bg-[var(--textColor10)] group">
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

      <p className="text-lg/6 font-bold mt-4">{data.title}</p>

      <span className="w-[3rem] h-[0.125rem] bg-[var(--primaryColor)] mx-auto my-8"></span>

      <p className="text-base/6 font-normal">{data.shortDescription}</p>

      <div className="absolute left-0 right-0 top-[-200%] bottom-0 w-full h-auto min-h-full scroll-smooth overflow-x-scroll p-4 bg-zinc-800 hidden invisible opacity-0 transition duration-500 ease-in-out slide_in group-hover:flex group-hover:top-0 group-hover:visible group-hover:opacity-100 group-hover:z-10">
        <p className="text-base/6 font-normal m-auto text-center">
          {data.description}
        </p>
      </div>
    </CardBox>
  );
};

export default ServiceItem;
