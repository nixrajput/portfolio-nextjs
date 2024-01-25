"use client";

import AppOutlinedButton from "@/components/common/OutlinedButton";

const TalkButton = () => {
  const onHandleClickTalkBtn = () => {
    if (typeof window === "undefined") return;

    window.open(Strings.telegramLink, "_blank");
  };

  return (
    <AppOutlinedButton
      label="Let's Talk"
      onClick={onHandleClickTalkBtn}
      className="mt-8 min-w-[10rem]"
    />
  );
};

export default TalkButton;
