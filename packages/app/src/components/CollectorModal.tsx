import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { getIsEdition, getOriginalId } from "../utils/tokenIds";
import { MonoButton } from "./Button";
import { ENSAddress } from "./ENSAddress";
import { Modal } from "./Modal";
import { Heading, Mono } from "./Typography";

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
  align-items: center;
`;

const HeaderText = styled.div`
  min-width: 0;

  h2,
  p {
    /* display: inline; */
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ModalTitle = styled(Heading)`
  line-height: 1;
  margin-bottom: 0.5rem;
  @media (min-width: 80rem) {
    margin-bottom: 0.5vw;
  }
`;

const ImageLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  margin-top: 2rem;

  @media (min-width: 32rem) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 80rem) {
    grid-gap: 2vw;
    margin-top: 2vw;
  }
`;

const ImageWrapper = styled.div<{ isEdition?: boolean }>`
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  ${(p) =>
    p.isEdition &&
    css`
      border: 1px solid rgba(var(--foreground-alpha), 0.04);
    `}

  @media (min-width: 80rem) {
    border-radius: 0.5vw;
  }
`;

interface Props {
  address: string;
  highlightId?: number;
  isOpen: boolean;
  originalIds: number[];
  editionIds: number[];
  onClose: () => void;
}

export function CollectorModal({
  address,
  isOpen,
  onClose,
  originalIds,
  editionIds,
}: Props) {
  const ownedIds = [...originalIds, ...editionIds];
  return (
    <Modal
      a11yLabel="Collector information"
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
    >
      <ModalContent>
        <Header>
          <HeaderText>
            <ModalTitle>
              <ENSAddress address={address} />
            </ModalTitle>
            <Mono subdued>{address}</Mono>
          </HeaderText>

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

        {ownedIds.length > 0 && (
          <ImageLayout>
            {ownedIds.map((i) => (
              <ImageWrapper key={`image_${i}`} isEdition={getIsEdition(i)}>
                <Image
                  src={
                    getIsEdition(i)
                      ? `/tokens/${getOriginalId(i)}.svg`
                      : `/tokens/${i}.jpg`
                  }
                  width={2800}
                  height={2800}
                  layout="responsive"
                  alt=""
                />
              </ImageWrapper>
            ))}
          </ImageLayout>
        )}
      </ModalContent>
    </Modal>
  );
}
