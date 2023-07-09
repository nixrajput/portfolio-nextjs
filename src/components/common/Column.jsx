import PropTypes from "prop-types";

const Column = (props) => {
  const { children, classes } = props;

  return (
    <div
      className={`relative flex flex-col justify-start items-start transition duration-300 ease-in-out ${classes}`}
    >
      {children}
    </div>
  );
};

Column.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string,
};

export default Column;
