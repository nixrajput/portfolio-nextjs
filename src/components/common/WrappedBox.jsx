import PropTypes from "prop-types";

const WrappedBox = (props) => {
  const { children, classes, onClick, id, elementRef } = props;

  return (
    <div
      className={`relative w-full grid grid-cols-1 sm:grid-cols-2 gap-8 transition duration-300 ease-in-out ${classes}`}
      onClick={onClick}
      id={id}
      ref={elementRef}
    >
      {children}
    </div>
  );
};

WrappedBox.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
  elementRef: PropTypes.any,
};

export default WrappedBox;
