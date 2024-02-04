"use client";

import type { ButtonComponentProps } from "@/types";

const AppFilledButton = (props: ButtonComponentProps) => {
  const { label, onClick, className, name } = props;

  return (
    <button
      name={name || "filled-btn"}
      type="button"
      className={`app__filled_btn ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default AppFilledButton;
