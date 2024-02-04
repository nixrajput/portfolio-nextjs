"use client";

import type { ButtonComponentProps } from "@/types";

const AppOutlinedButton = (props: ButtonComponentProps) => {
  const { label, onClick, className, name } = props;

  return (
    <button
      name={name || "outlined-btn"}
      type="button"
      className={`app__outlined_btn ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default AppOutlinedButton;
