const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col dark:bg-[var(--bgColor)] bg-[var(--bgColor)] justify-center items-center w-screen h-screen p-4 m-0 overflow-hidden transition duration-300 ease-in-out z-[9999]">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[var(--textColor)] border-opacity-50"></div>
      <p className="text-center text-sm font-semibold mt-4">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loading;
