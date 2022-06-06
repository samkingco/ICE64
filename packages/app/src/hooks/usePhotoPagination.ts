import { useContextualRouting } from "next-use-contextual-routing";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import {
  getEditionId,
  getOriginalId,
  wrapEditions,
  wrapOriginals,
} from "../utils/tokenIds";

interface Options {
  id: number;
  isEdition: boolean;
  closeHref?: string;
  onClose?: () => void;
}

export function usePhotoPagination({
  id,
  isEdition,
  closeHref,
  onClose,
}: Options) {
  const router = useRouter();
  const { makeContextualHref } = useContextualRouting();

  const originalId = getOriginalId(id);
  const editionId = getEditionId(id);

  const prevId = isEdition
    ? wrapEditions(editionId - 1)
    : wrapOriginals(originalId - 1);
  const nextId = isEdition
    ? wrapEditions(editionId + 1)
    : wrapOriginals(originalId + 1);

  const goToPrev = useCallback(() => {
    router.push(makeContextualHref({ photo: prevId }), `/photo/${prevId}`, {
      scroll: false,
    });
  }, [prevId, router, makeContextualHref]);

  const goToNext = useCallback(() => {
    router.push(makeContextualHref({ photo: nextId }), `/photo/${nextId}`, {
      scroll: false,
    });
  }, [nextId, router, makeContextualHref]);

  const goToOriginal = useCallback(() => {
    router.replace(
      makeContextualHref({ photo: originalId }),
      `/photo/${originalId}`,
      {
        scroll: false,
      }
    );
  }, [originalId, router, makeContextualHref]);

  const goToEdition = useCallback(() => {
    router.replace(
      makeContextualHref({ photo: editionId }),
      `/photo/${editionId}`,
      {
        scroll: false,
      }
    );
  }, [editionId, router, makeContextualHref]);

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      if (["ArrowLeft", "p"].includes(key)) goToPrev();
      if (["ArrowRight", "n"].includes(key)) goToNext();
      if (["e"].includes(key)) goToEdition();
      if (["o"].includes(key)) goToOriginal();
      if (["Escape"].includes(key)) {
        if (closeHref) router.push(closeHref);
        // if (onClose) onClose();
      }
    };

    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [
    closeHref,
    onClose,
    goToPrev,
    goToNext,
    goToEdition,
    goToOriginal,
    router,
  ]);

  return {
    goToPrev,
    goToNext,
    goToEdition,
    goToOriginal,
  };
}
