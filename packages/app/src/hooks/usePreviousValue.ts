import { useEffect, useRef } from "react";

export function usePreviousValue<T>(value?: T) {
  const prevValue = useRef<T>();

  useEffect(() => {
    prevValue.current = value;

    return () => {
      prevValue.current = undefined;
    };
  });

  return prevValue.current;
}
