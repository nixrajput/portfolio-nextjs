"use client";

import Row from "@/components/common/Row";

const SocialButton = ({ text, icon, url }) => {
  const onHandleClickUrl = (url) => {
    if (typeof window === "undefined" || !url) return;

    window.open(url, "_blank");
  };

  return (
    <Row
      classes="bg-[var(--textColor10)] p-4 rounded-[var(--borderRadius)] items-center text-center justify-center cursor-pointer animated__hover"
      onClick={() => onHandleClickUrl(url)}
    >
      <span className="text-xl">{icon}</span>

      <p className="text-lg font-semibold ml-2">{text}</p>
    </Row>
  );
};

export default SocialButton;
