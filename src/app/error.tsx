"use client";

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  return (
    <div
      className={`relative m-0 flex min-h-screen w-screen max-w-full flex-col items-center justify-center overflow-hidden p-4 transition duration-300 ease-in-out`}
    >
      <p className="text-3xl/6 text-[var(--errorColor)]">Something went wrong...!!!</p>

      <div className="mt-4 rounded-[var(--borderRadius)] border border-[var(--errorColor)] p-4">
        <p className="text-base/6 text-[var(--errorColor)]">{error.message}</p>
      </div>

      <button
        className="app__text_btn"
        style={{
          margin: "1rem auto 0",
        }}
        onClick={() => reset()}
      >
        Refresh
      </button>
    </div>
  );
};

export default Error;
