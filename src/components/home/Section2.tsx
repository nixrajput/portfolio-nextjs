import ConstraintedBox from "@/components/common/ConstraintedBox";
import ResponsiveBox from "@/components/common/ResponsiveBox";
import WrappedBox from "@/components/common/WrappedBox";
import services from "@/data/services";
import ServiceItem from "./components/ServiceItem";

const HomeSection2 = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="min-h-[calc(100vh-5rem)] items-center justify-center"
      id={id}
    >
      <ConstraintedBox classNames="p-4 py-16">
        <p className="text-center mx-auto text-3xl/6 md:text-4xl/6 font-semibold">
          My Services
        </p>

        <WrappedBox classes="justify-items-center sm:grid-cols-2 lg:grid-cols-3 mt-16">
          {services.map((service, index) => {
            return <ServiceItem key={`service-${index}`} data={service} />;
          })}
        </WrappedBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection2;
