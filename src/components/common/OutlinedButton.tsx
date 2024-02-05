"use client";

import type { ButtonComponentProps } from "@/types";

const AppOutlinedButton = (props: Readonly<ButtonComponentProps>) => {
  const { label, onClick, classNames, name } = props;

  return (
    <button
      name={name || "outlined-btn"}
      type="button"
      className={`app__outlined_btn ${classNames}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default AppOutlinedButton;
