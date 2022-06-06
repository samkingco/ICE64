import { useENS } from "../hooks/useENS";

interface Props {
  address: string;
}

export function ENSAddress({ address }: Props) {
  const { displayName } = useENS(address);
  return <>{displayName}</>;
}
