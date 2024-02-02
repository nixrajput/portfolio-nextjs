"use client";

import { ButtonComponentProps } from "@/types";
import PropTypes from "prop-types";

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

AppOutlinedButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
};

export default AppOutlinedButton;
