import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useIsMounted } from "../hooks/useIsMounted";
import { buttonReset } from "./Button";
import { Ellipsis } from "./Typography";

const CopyButton = styled.button`
  ${buttonReset};
  font: inherit;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CopiedMessaged = styled(Ellipsis)`
  opacity: 0.48;
`;

interface Props {
  children: React.ReactNode;
  copyText: string;
  success?: string;
}

export function CopyToClipboard({ children, copyText, success }: Props) {
  const isMounted = useIsMounted();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied && isMounted) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied, isMounted]);

  async function copy() {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
    } catch (error) {
      console.warn("Copy failed", error);
      setCopied(false);
    }
  }

  return copied ? (
    <CopiedMessaged>{success || "Copied"}</CopiedMessaged>
  ) : (
    <CopyButton onClick={copy}>
      <Ellipsis>{children}</Ellipsis>
    </CopyButton>
  );
}
