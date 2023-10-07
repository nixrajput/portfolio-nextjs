import ResponsiveBox from "@/components/common/ResponsiveBox";
import ConstraintedBox from "@/components/common/ConstraintedBox";
import WrappedBox from "@/components/common/WrappedBox";
import Column from "@/components/common/Column";

const HomeSection5 = () => {
  return (
    <ResponsiveBox classNames="bg-[var(--dialogColor)] min-h-[90vh] items-center justify-center">
      <ConstraintedBox classNames="p-4 py-12">
        <h2 className="text-center mx-auto">
          Skills <span className="text-[var(--primaryColor)]">I Know</span>
        </h2>
      </ConstraintedBox>
    </ResponsiveBox>
  );
};

export default HomeSection5;
