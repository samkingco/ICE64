import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  DialogContent as ReachDialogContent,
  DialogOverlay as ReachDialogOverlay,
} from "@reach/dialog";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { scrollable } from "./GlobalStyle";

const MotionDialogOverlay = motion(ReachDialogOverlay);

const ModalOverlay = styled(MotionDialogOverlay)`
  &[data-reach-dialog-overlay] {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(var(--background-alpha), 0.92) !important;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    ${scrollable};
  }
`;

const ModalContent = styled(ReachDialogContent)<{ size: ModalSize }>`
  &[data-reach-dialog-content] {
    width: 100%;
    margin: auto;
    ${(p) =>
      p.size === "sm" &&
      css`
        padding: 2vw;
        max-width: 24rem;
        @media (min-width: 80rem) {
          max-width: 32vw;
        }
      `}
    ${(p) =>
      p.size === "md" &&
      css`
        padding: 2vw;
        max-width: 40rem;
        @media (min-width: 80rem) {
          max-width: 48vw;
        }
      `}
    ${(p) =>
      p.size === "full-screen" &&
      css`
        height: 100%;
        padding: 0;
        margin: 0;
      `}
    outline: none;
  }
`;

type ModalSize = "sm" | "md" | "full-screen";

interface ModalProps {
  children: React.ReactNode;
  a11yLabel: string;
  isOpen: boolean;
  size?: ModalSize;
  onClose?: () => void;
  dangerouslyBypassFocusLock?: boolean;
}

export function Modal({
  children,
  a11yLabel,
  isOpen,
  size = "md",
  onClose,
  dangerouslyBypassFocusLock,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          isOpen={isOpen}
          onDismiss={onClose}
          allowPinchZoom={true}
          dangerouslyBypassFocusLock={dangerouslyBypassFocusLock}
          variants={{
            visible: {
              opacity: 1,
              transition: { duration: 0.25 },
            },
            hidden: { opacity: 0, transition: { duration: 0.25 } },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <ModalContent aria-label={a11yLabel} size={size}>
            {children}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}
