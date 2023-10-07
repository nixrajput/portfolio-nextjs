import PropTypes from "prop-types";

const Row = (props) => {
  const { children, classes, onClick } = props;

  return (
    <div
      className={`relative flex flex-row justify-start items-start transition duration-300 ease-in-out ${classes}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

Row.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string,
  onClick: PropTypes.func,
};

export default Row;
