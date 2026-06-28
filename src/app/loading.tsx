const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] m-0 flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-[var(--bgColor)] p-4 transition duration-300 ease-in-out dark:bg-[var(--bgColor)]">
      <div className="border-opacity-50 h-8 w-8 animate-spin rounded-full border-t-2 border-[var(--textColor)]"></div>
      <p className="mt-4 text-center text-sm font-semibold">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
