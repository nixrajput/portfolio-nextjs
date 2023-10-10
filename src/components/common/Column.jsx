import PropTypes from "prop-types";

const Column = (props) => {
  const { children, classes, onClick, id, elementRef } = props;

  return (
    <div
      className={`relative flex flex-col justify-start items-start transition duration-300 ease-in-out ${classes}`}
      onClick={onClick}
      id={id}
      ref={elementRef}
    >
      {children}
    </div>
  );
};

Column.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
  elementRef: PropTypes.any,
};

export default Column;
