import styled from "@emotion/styled";
import { useContextualRouting } from "next-use-contextual-routing";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ConnectWalletButton } from "../components/ConnectWalletButton";
import { Cursor } from "../components/Cursor";
import { Modal } from "../components/Modal";
import { PhotoDetail } from "../components/PhotoDetail";
import { useCursorPosition } from "../hooks/useCursorPosition";
import { allIds, getEditionId, originalIds } from "../utils/tokenIds";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 6rem;
  padding: 4vw;
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

  @media (orientation: landscape) {
    max-width: 100vh;
  }
`;

const ConnectNav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  padding: 0.5vw 2vw;
  font-family: var(--font-heading);
  font-size: 2rem;
  line-height: 1;
`;

export default function Index() {
  const router = useRouter();
  const [cursorVisible, setCursorVisible] = useState(true);
  const { returnHref, makeContextualHref } = useContextualRouting();
  const [modalId, setModalId] = useState<number | undefined>();
  const { relPos } = useCursorPosition({
    shouldRespond: Boolean(cursorVisible && !modalId),
  });

  const refs = useRef<Array<HTMLAnchorElement | null>>([]);

  // Setup refs to photo links for scrolling into view when the modal is closed
  useEffect(() => {
    refs.current = refs.current.slice(0, allIds.length);
    return () => {
      refs.current = [];
    };
  }, []);

  useEffect(() => {
    const photo = allIds.find((i) => `${i}` === router.query.photo);
    setModalId(photo);
    return () => {
      setModalId(undefined);
    };
  }, [router.query.photo]);

  const onModalClose = () => {
    router.push(returnHref, undefined, {
      scroll: false,
    });

    if (modalId) {
      const returnId = allIds.findIndex((i) => i === modalId) + 1;
      // Scroll to the image and set focus when the modal closes
      // setTimeout hack because of focus locking in @reach/dialog
      setTimeout(() => {
        if (refs.current[returnId]) {
          // @ts-ignore: Object is possibly 'null'.
          refs.current[returnId].scrollIntoView({
            block: "center",
            inline: "center",
          });
          // @ts-ignore: Object is possibly 'null'.
          refs.current[returnId].focus();
        }
      }, 10);
    }
  };

  return (
    <main>
      <Head>
        <title>ICE64</title>
      </Head>

      <Cursor
        text={
          cursorVisible
            ? relPos.x > 0.5
              ? "Edition of 32"
              : "Original 1 of 1"
            : ""
        }
      />

      <ConnectNav
        onMouseEnter={() => setCursorVisible(false)}
        onMouseLeave={() => setCursorVisible(true)}
      >
        <ConnectWalletButton />
      </ConnectNav>

      <Grid>
        {originalIds.map((id, idx) => (
          <TokenGroup key={`tokenGroup_${id}`}>
            <TokenImage>
              <Link
                href={makeContextualHref({ photo: id })}
                as={`/photo/${id}`}
                scroll={false}
              >
                <a ref={(el) => (refs.current[id] = el)}>
                  <Image
                    src={`/tokens/${id}.jpg`}
                    width={2800}
                    height={2800}
                    layout="responsive"
                  />
                </a>
              </Link>
            </TokenImage>
            <TokenImage>
              <Link
                href={makeContextualHref({ photo: getEditionId(id) })}
                as={`/photo/${getEditionId(id)}`}
                scroll={false}
              >
                <a ref={(el) => (refs.current[id + originalIds.length] = el)}>
                  <Image
                    src={`/tokens/${id}.svg`}
                    width={2800}
                    height={2800}
                    layout="responsive"
                  />
                </a>
              </Link>
            </TokenImage>
          </TokenGroup>
        ))}
      </Grid>

      <Modal
        a11yLabel={`Detail view of photo #${modalId}`}
        isOpen={Boolean(!!router.query.photo && modalId)}
        onClose={onModalClose}
        size="full-screen"
      >
        {modalId && <PhotoDetail id={modalId} onClose={onModalClose} />}
      </Modal>
    </main>
  );
}
