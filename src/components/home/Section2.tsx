import ConstraintedBox from "@/components/core/ConstraintedBox";
import ResponsiveBox from "@/components/core/ResponsiveBox";
import GridBox from "@/components/core/GridBox";
import services from "@/data/services";
import ServiceItem from "./components/ServiceItem";

const HomeSection2 = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="min-h-[calc(100vh-5rem)] items-center justify-center"
      id={id}
    >
      <ConstraintedBox classNames="p-4 py-16">
        <p className="text-center mx-auto text-3xl/6 md:text-4xl/6 font-bold">
          My Services
        </p>

        <GridBox classNames="justify-items-center sm:grid-cols-2 lg:grid-cols-3 mt-16">
          {services.map((service, index) => {
            return <ServiceItem key={`service-${index}`} data={service} />;
          })}
        </GridBox>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection2;
