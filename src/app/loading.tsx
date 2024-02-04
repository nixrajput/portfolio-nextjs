const Loading = () => {
  return (
    <div
      className={`relative flex flex-col justify-center items-center w-screen max-w-full min-h-screen p-4 m-0 overflow-hidden transition duration-300 ease-in-out`}
    >
      <p className="mx-auto text-center font-bold">Loading</p>
      <p className="mx-auto mt-2 text-center">Please wait...</p>
    </div>
  );
};

export default Loading;
