import { useEffect, useRef } from "react";

export function useIsMounted() {
  const mountedRef = useRef(false);
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
  }, []);
  return mountedRef.current;
}
