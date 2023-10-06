"use client";

import PropTypes from "prop-types";

const FilledButton = (props) => {
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

FilledButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
};

export default FilledButton;
