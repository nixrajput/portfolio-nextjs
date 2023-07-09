import PropTypes from "prop-types";

const WrappedBox = (props) => {
  const { children, classes } = props;

  return (
    <div
      className={`relative w-full grid grid-cols-1 sm:grid-cols-2 gap-8 transition duration-300 ease-in-out ${classes}`}
    >
      {children}
    </div>
  );
};

WrappedBox.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string,
};

export default WrappedBox;
