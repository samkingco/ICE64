import styled from "@emotion/styled";
import Image from "next/image";
import { RootsPhoto } from "../graphql/subgraph";
import { Button } from "./Button";
import { Divider } from "./Divider";
import { Modal } from "./Modal";
import { Body, Heading, Mono, Subheading } from "./Typography";

const ModalContent = styled.div`
  width: 100%;
  background: var(--background);
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 1px 32px rgba(0, 0, 0, 0.08);
  max-height: 90vh;
  overflow-y: auto;
  @media (min-width: 80rem) {
    padding: 2vw 2.5vw;
    border-radius: 2vw;
    gap: 0.5vw;
  }
`;

const RootsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const RootsListItem = styled.li`
  display: grid;
  grid-template-columns: 4rem 1fr max-content;
  grid-gap: 1rem;
  align-items: center;
  & + & {
    margin-top: 1.5rem;
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

interface Props {
  originalId: number;
  rootsPhotos: Partial<RootsPhoto>[];
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
  return (
    <Modal
      a11yLabel="Use Roots photo to claim free edition"
      isOpen={isOpen}
      onClose={onClose}
      size="md"
    >
      <ModalContent>
        <Heading>
          Claim free edition of N<sup>o</sup> {originalId}
        </Heading>
        <Body>
          As a <a href="https://roots.samking.photo/">Roots</a> holder,
          you&apos;re eligible to claim a free edition. It&apos;s my way of
          saying thank you for supporting me!
        </Body>
        <Mono subdued>
          Note: You can only claim editions you don&apos;t currently own.
        </Mono>

        <Divider margin="24 0" />

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
                  {i.hasClaimedEdition
                    ? "Already claimed an edition"
                    : "Ready to use"}
                </Mono>
              </div>
              {!i.hasClaimedEdition && (
                <div>
                  <Button onClick={() => onClaim(parseInt(i.id || "", 10))}>
                    Use to claim
                  </Button>
                </div>
              )}
            </RootsListItem>
          ))}
        </RootsList>
      </ModalContent>
    </Modal>
  );
}
