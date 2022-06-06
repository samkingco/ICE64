import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const StyledCursor = styled.div`
  pointer-events: none;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  transform: translate(-50vw, -50%);
  text-align: center;
  width: 100vw;
  transition: transform 0.1s ease-in-out;
  cursor: none;

  @media (pointer: coarse) {
    display: none;
  }
`;

const CursorText = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  font-family: var(--font-heading);
  font-size: 4vw;
  white-space: nowrap;
`;

const transition = {
  stiffness: 800,
  damping: 20,
  duration: 0.1,
};

const textAnimation = {
  hidden: {
    scale: 0.8,
    opacity: 0,
    transition,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition,
  },
};

interface Props {
  text: string;
}

export function Cursor({ text }: Props) {
  const [hasMoved, setHasMoved] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const endX = useRef(0);
  const endY = useRef(0);

  const requestRef = useRef<ReturnType<typeof requestAnimationFrame>>(null);

  useEffect(() => {
    endX.current = window.innerWidth / 2;
    endY.current = window.innerHeight / 2;
    document.addEventListener("mousemove", mouseMoveEvent);

    return () => {
      document.removeEventListener("mousemove", mouseMoveEvent);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const mouseMoveEvent = (e: MouseEvent) => {
    if (!hasMoved) setHasMoved(true);

    endX.current = e.clientX;
    endY.current = e.clientY;

    if (ref.current) {
      ref.current.style.top = endY.current + "px";
      ref.current.style.left = endX.current + "px";
    }
  };

  return (
    <StyledCursor ref={ref}>
      <AnimatePresence>
        {hasMoved && (
          <CursorText
            key={text}
            variants={textAnimation}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {text}
          </CursorText>
        )}
      </AnimatePresence>
    </StyledCursor>
  );
}
