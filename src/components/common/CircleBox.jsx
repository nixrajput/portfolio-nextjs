import PropTypes from "prop-types";

const CircleBox = (props) => {
  const { children, classes } = props;

  return (
    <div
      className={`relative max-w-[25rem] min-w-[15rem] max-h-[25rem] min-h-[15rem] bg-[var(--primaryColor)] overflow-hidden rounded-full aspect-square transition duration-300 ease-in-out ${classes}`}
    >
      {children}
    </div>
  );
};

CircleBox.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string,
};

export default CircleBox;
