"use client";

const Error = ({ error, reset }) => {
  return (
    <div
      className={`relative flex flex-col justify-center items-center w-screen max-w-full min-h-screen p-4 m-0 overflow-hidden transition duration-300 ease-in-out`}
    >
      <h2>Something went wrong!</h2>
      <p className="mt-4 text-[var(--errorColor)]">{error.message}</p>
      <button className="app__outlined_btn mt-8" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
};

export default Error;
