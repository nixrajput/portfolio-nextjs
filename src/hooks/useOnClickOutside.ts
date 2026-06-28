"use client";

import { RefObject, useEffect } from "react";

function useOnClickOutside(ref: RefObject<HTMLDivElement>, handler: CallableFunction) {
  useEffect(() => {
    if (!ref) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;
