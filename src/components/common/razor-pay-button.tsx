import Image from "next/image";
import Link from "next/link";

const paymentUrl = "https://rzp.io/l/nixrajput-project-payment";

function RazorPayButton() {
  return (
    <Link
      className="app__filled_btn min-w-[10rem] gap-2"
      href={paymentUrl}
      target="_blank"
    >
      <Image
        src="/images/razorpay-logo.png"
        alt={`razor-pay-button`}
        width={100}
        height={100}
        className="h-[1.5rem] w-auto aspect-square"
        style={{ filter: "brightness(0) invert(1)" }}
      />

      <div className="flex flex-col">
        <p className="font-bold text-base/none">Pay Now</p>
        <p
          className="text-xs text-[var(--textColor80)]"
          style={{ textTransform: "initial" }}
        >
          Secured by Razorpay
        </p>
      </div>
    </Link>
  );
}

export default RazorPayButton;
