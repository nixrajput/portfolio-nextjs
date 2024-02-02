"use client";

import { ButtonComponentProps } from "@/types";
import PropTypes from "prop-types";

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

AppFilledButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
};

export default AppFilledButton;
