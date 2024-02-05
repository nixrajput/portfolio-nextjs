"use client";

import type { ButtonComponentProps } from "@/types";

const AppFilledButton = (props: Readonly<ButtonComponentProps>) => {
  const { label, onClick, classNames, name } = props;

  return (
    <button
      name={name || "filled-btn"}
      type="button"
      className={`app__filled_btn ${classNames}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default AppFilledButton;
