import PropTypes from "prop-types";

const Row = (props) => {
  const { children, classes } = props;

  return (
    <div
      className={`relative flex flex-row justify-start items-start transition duration-300 ease-in-out ${classes}`}
    >
      {children}
    </div>
  );
};

Row.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string,
};

export default Row;
