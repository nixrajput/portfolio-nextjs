import PropTypes from "prop-types";

const CardBox = (props) => {
  const { children, classes } = props;

  return (
    <div
      className={`relative flex flex-col justify-start items-start bg-[var(--dialogColor)] transition duration-300 ease-in-out ${classes}`}
    >
      {children}
    </div>
  );
};

CardBox.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.string,
};

export default CardBox;
