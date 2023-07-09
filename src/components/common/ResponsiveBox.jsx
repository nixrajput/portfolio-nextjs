import PropTypes from "prop-types";

const ResponsiveBox = (props) => {
  const { children, classNames } = props;

  return (
    <div
      className={`relative flex flex-col justify-start items-start w-full p-0 mx-auto my-0 overflow-hidden transition duration-300 ease-in-out ${classNames}`}
    >
      {children}
    </div>
  );
};

ResponsiveBox.propTypes = {
  children: PropTypes.node,
  classNames: PropTypes.string,
};

export default ResponsiveBox;
