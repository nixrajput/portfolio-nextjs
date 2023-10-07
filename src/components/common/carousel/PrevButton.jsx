const PrevButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <button
      className="app__filled_btn mr-2 disabled:opacity-40"
      type="button"
      {...restProps}
    >
      {children}
    </button>
  );
};

export default PrevButton;
