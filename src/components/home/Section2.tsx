import ConstraintedBox from "@/components/core/ConstraintedBox";
import ResponsiveBox from "@/components/core/ResponsiveBox";
import GridBox from "@/components/core/GridBox";
import SectionTitle from "@/components/common/SectionTitle";
import ServiceItem from "./ui/ServiceItem";
import services from "@/data/services";

const HomeSection2 = ({ id }: { id: string }) => {
  return (
    <ResponsiveBox
      classNames="dark:bg-[var(--dialogColor)] bg-[var(--dialogColor)] min-h-screen items-center justify-center dark:bg-dot-white/[0.2] bg-dot-white/[0.2] overflow-hidden rounded-md"
      id={id}
    >
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <ConstraintedBox classNames="p-4 py-16 z-10">
        <SectionTitle>My Services</SectionTitle>

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
