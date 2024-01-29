import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import WrappedBox from "@/components/common/WrappedBox";
import services from "@/data/services";
import ServiceItem from "./components/ServiceItem";

const HomeSection2 = ({ id }) => {
  return (
    <ResponsiveBox
      classNames="bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900 min-h-[100vh] items-center justify-center"
      id={id}
    >
      <ConstraintedBox classNames="p-4 py-16">
        <h2 className="text-center mx-auto">
          My Services
        </h2>

        <WrappedBox classes="justify-items-center sm:grid-cols-2 mt-12">
          {services.map((service, index) => {
            return (
              <ServiceItem
                key={`service-${index}`}
                data={service}
              />
            );
          })}
        </WrappedBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection2;
