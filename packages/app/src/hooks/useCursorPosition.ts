import { useCallback, useEffect, useState } from "react";

export function useCursorPosition({ shouldRespond = true } = {}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const relPos = { x: pos.x / dims.w, y: pos.y / dims.h };

  useEffect(() => {
    if (shouldRespond) {
      setPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      document.addEventListener("mousemove", handleMouseMove);
      setDims({ w: window.innerWidth, h: window.innerHeight });
      window.addEventListener("resize", handleResize);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [shouldRespond]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleResize = useCallback(() => {
    setDims({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  return { absPos: pos, relPos };
}
