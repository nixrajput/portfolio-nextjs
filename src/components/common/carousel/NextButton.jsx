const NextButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="app__filled_btn ml-2 disabled:opacity-40"
      type="button"
      {...restProps}
    >
      {children}
    </button>
  );
};

export default NextButton;
