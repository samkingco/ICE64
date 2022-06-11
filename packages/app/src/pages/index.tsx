import styled from "@emotion/styled";
import { useContextualRouting } from "next-use-contextual-routing";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Cursor } from "../components/Cursor";
import { Modal } from "../components/Modal";
import { Navigation } from "../components/Navigation";
import { PhotoDetail } from "../components/PhotoDetail";
import SocialMeta from "../components/SocialMeta";
import { useCursorPosition } from "../hooks/useCursorPosition";
import { firstParam } from "../utils/firstParam";
import { getEditionId, getOriginalId, originalIds } from "../utils/tokenIds";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 6rem;
  padding: 3rem 4vw;

  @media (min-width: 32rem) {
    padding-top: 4.5rem;
    padding-bottom: 4.5rem;
  }

  @media (min-width: 80rem) {
    padding-top: 6vw;
    padding-bottom: 6vw;
  }
`;

const TokenGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2vw;

  @media (orientation: portrait) {
    grid-template-columns: 1fr;
  }
`;

const TokenImage = styled.figure`
  width: 100%;
  position: relative;
  margin: 0 auto;

  a {
    display: block;
    cursor: inherit;
  }

  @media (orientation: landscape) {
    max-width: 100vh;
  }
`;

export default function Index() {
  const router = useRouter();
  const [cursorVisible, setCursorVisible] = useState(true);
  const { returnHref, makeContextualHref } = useContextualRouting();
  const [modalId, setModalId] = useState<number | undefined>();
  const { relPos } = useCursorPosition({
    shouldRespond: Boolean(cursorVisible && !modalId),
  });

  const refs = useRef<Record<number, HTMLAnchorElement | null>>([]);

  // Setup refs to photo links for scrolling into view when the modal is closed
  useEffect(() => {
    refs.current = {};
    return () => {
      refs.current = {};
    };
  }, []);

  useEffect(() => {
    const id = firstParam(router.query.id);
    if (id) {
      setModalId(parseInt(id, 10));
    }
    return () => {
      setModalId(undefined);
    };
  }, [router.query.id]);

  const onModalClose = () => {
    router.push(returnHref, undefined, { scroll: false });

    if (modalId) {
      // Scroll to the image and set focus when the modal closes
      if (refs.current[modalId]) {
        // @ts-ignore: Object is possibly 'null'.
        refs.current[modalId].scrollIntoView({
          block: "center",
          inline: "center",
        });
        // @ts-ignore: Object is possibly 'null'.
        refs.current[modalId].focus();
      }
    }
  };

  return (
    <main>
      <SocialMeta />

      <Navigation
        onNavMouseEnter={() => setCursorVisible(false)}
        onNavMouseLeave={() => setCursorVisible(true)}
      />

      <Cursor
        text={
          cursorVisible
            ? relPos.x > 0.5
              ? "Edition of 32"
              : "Original 1 of 1"
            : ""
        }
      />

      <Grid>
        {originalIds.map((id, idx) => (
          <TokenGroup key={`tokenGroup_${id}`}>
            <TokenImage>
              <Link
                href={makeContextualHref({ id })}
                as={`/photo/${id}`}
                scroll={false}
              >
                <a ref={(el) => (refs.current[id] = el)}>
                  <Image
                    src={`/tokens/${id}.jpg`}
                    width={2800}
                    height={2800}
                    layout="responsive"
                    alt=""
                  />
                </a>
              </Link>
            </TokenImage>
            <TokenImage>
              <Link
                href={makeContextualHref({ id: getEditionId(id) })}
                as={`/photo/${getEditionId(id)}`}
                scroll={false}
              >
                <a ref={(el) => (refs.current[getEditionId(id)] = el)}>
                  <Image
                    src={`/tokens/${id}.svg`}
                    width={2800}
                    height={2800}
                    layout="responsive"
                    alt=""
                  />
                </a>
              </Link>
            </TokenImage>
          </TokenGroup>
        ))}
      </Grid>

      {/* <nav>
        <Mono>
          <a href="https://samking.studio">A Sam King Studio project</a>
        </Mono>
      </nav> */}

      <Modal
        a11yLabel={`Detail view of photo #${modalId}`}
        isOpen={Boolean(!!router.query.id && modalId)}
        onClose={onModalClose}
        size="full-screen"
        dangerouslyBypassFocusLock
      >
        {modalId && (
          <PhotoDetail key={getOriginalId(modalId)} onClose={onModalClose} />
        )}
      </Modal>
    </main>
  );
}
