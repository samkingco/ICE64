import { useENS } from "../hooks/useENS";

interface Props {
  address?: string | null;
}

export function ENSAddress({ address }: Props) {
  const { displayName } = useENS(address || "");
  if (!address) return null;
  return <>{displayName}</>;
}
