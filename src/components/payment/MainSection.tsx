import RazorPayButton from "@/components/common/razor-pay-button";

const PaymentMainSection = () => {
  return (
    <div
      id="payment"
      className="relative flex flex-col dark:bg-[var(--bgColor)] bg-[var(--bgColor)] justify-center items-center w-screen h-screen p-4 m-0 overflow-hidden transition duration-300 ease-in-out"
    >
      <p className="text-center text-2xl lg:text-3xl font-semibold mt-4 max-w-screen-md">
        Thank you for choosing me to work on your project - I appreciate your
        trust and partnership!
      </p>
      <p className="text-center text-base mt-4 mb-8 max-w-screen-md">
        Securely pay for your website, mobile app, or backend API development
        project. I specialize in creating high-quality, customized solutions
        tailored to your needs.
      </p>

      <RazorPayButton />
    </div>
  );
};

export default PaymentMainSection;
