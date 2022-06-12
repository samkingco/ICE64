import styled from "@emotion/styled";
import Image from "next/image";
import { Button, LinkButton, MonoButton } from "./Button";
import { Modal } from "./Modal";
import { Body, Heading, Mono, NoWrap, Subheading } from "./Typography";

const ModalContent = styled.div`
  width: 100%;
  background: var(--background);
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 1.5rem;
  box-shadow: 0 1px 32px rgba(0, 0, 0, 0.08);

  @media (min-width: 32rem) {
    padding: 2rem;
  }

  @media (min-width: 80rem) {
    padding: 2vw 2.5vw;
    border-radius: 2vw;
    gap: 0.5vw;
  }
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 1rem;
  align-items: start;

  @media (min-width: 32rem) {
    align-items: center;
  }
`;

const RootsList = styled.ul`
  list-style: none;
  margin: 1rem 0;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(var(--foreground-alpha), 0.1);
  border-bottom: 1px solid rgba(var(--foreground-alpha), 0.1);
`;

const RootsListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.5rem;
  align-items: center;
  & + & {
    margin-top: 3rem;
  }
  @media (min-width: 32rem) {
    grid-gap: 1rem;
    grid-template-columns: 4rem 1fr max-content;
    & + & {
      margin-top: 1.5rem;
    }
  }
  @media (min-width: 80rem) {
    grid-template-columns: 4vw 1fr max-content;
    grid-gap: 1vw;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  @media (min-width: 80rem) {
    border-radius: 0.5vw;
  }
`;

const ClaimButton = styled(Button)`
  width: 100%;
`;

interface RootsPhoto {
  id: number;
  hasClaimBeenUsed: boolean;
}

interface Props {
  originalId: number;
  rootsPhotos: RootsPhoto[];
  onClaim: (rootsId: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function RootsClaimModal({
  originalId,
  rootsPhotos,
  onClaim,
  isOpen,
  onClose,
}: Props) {
  const hasRootsPhotos = rootsPhotos.length > 0;
  return (
    <Modal
      a11yLabel="Use Roots photo to claim free edition"
      isOpen={isOpen}
      onClose={onClose}
      size="md"
    >
      <ModalContent>
        <Header>
          <Heading>
            Claim free edition{" "}
            <NoWrap>
              of N<sup>o</sup> {originalId}
            </NoWrap>
          </Heading>

          <MonoButton onClick={onClose} subdued aria-label="Close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              aria-hidden="true"
            >
              <path
                d="M12 13.4 7.1 18.3Q6.825 18.575 6.4 18.575Q5.975 18.575 5.7 18.3Q5.425 18.025 5.425 17.6Q5.425 17.175 5.7 16.9L10.6 12L5.7 7.1Q5.425 6.825 5.425 6.4Q5.425 5.975 5.7 5.7Q5.975 5.425 6.4 5.425Q6.825 5.425 7.1 5.7L12 10.6L16.9 5.7Q17.175 5.425 17.6 5.425Q18.025 5.425 18.3 5.7Q18.575 5.975 18.575 6.4Q18.575 6.825 18.3 7.1L13.4 12L18.3 16.9Q18.575 17.175 18.575 17.6Q18.575 18.025 18.3 18.3Q18.025 18.575 17.6 18.575Q17.175 18.575 16.9 18.3Z"
                fill="currentColor"
              />
            </svg>
          </MonoButton>
        </Header>
        {hasRootsPhotos ? (
          <Body>
            As a <a href="https://roots.samking.photo">Roots</a> holder,
            you&apos;re eligible to claim a free edition. It&apos;s my way of
            saying thank you for supporting me!
          </Body>
        ) : (
          <>
            <Body margin="0 0 16">
              Ahh, it looks like you don&apos;t have{" "}
              <a href="https://roots.samking.photo">Roots</a> photo in your
              wallet. If you pick one up, you&apos;ll be able to use it to claim
              a free edition (providing it hasn&apos;t already been used to
              claim).
            </Body>
            <LinkButton href="https://roots.samking.photo">
              Check out Roots
            </LinkButton>
          </>
        )}

        {hasRootsPhotos && (
          <>
            <RootsList>
              {rootsPhotos.map((i) => (
                <RootsListItem key={i.id}>
                  <ImageWrapper>
                    <Image
                      src={`/roots/${i.id}.jpg`}
                      width={128}
                      height={128}
                      layout="responsive"
                      alt=""
                    />
                  </ImageWrapper>
                  <div>
                    <Subheading>Roots #{i.id}</Subheading>
                    <Mono subdued>
                      {i.hasClaimBeenUsed
                        ? "Already claimed an edition"
                        : "Ready to use"}
                    </Mono>
                  </div>
                  {!i.hasClaimBeenUsed && (
                    <div>
                      <ClaimButton onClick={() => onClaim(i.id)}>
                        Use to claim
                      </ClaimButton>
                    </div>
                  )}
                </RootsListItem>
              ))}
            </RootsList>

            <Body size="small" subdued>
              Note, you can only use your claims on editions that you don&apos;t
              currently own, and while those editions are still available.
            </Body>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
