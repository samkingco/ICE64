import { useEffect } from "react";
import createStore from "zustand";
import { persist } from "zustand/middleware";
import { cachedFetch } from "../utils/cachedFetch";

export function addressDisplayName(address: string) {
  const match = address.match(
    /^(0x[a-zA-Z0-9]{3})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
}

interface ResolvedAddress {
  address: string;
  name: string | null;
  displayName: string;
  avatar: string | null;
}

interface State {
  resolvedAddresses: Record<string, ResolvedAddress>;
}

export const useStore = createStore<State>(
  persist(() => ({ resolvedAddresses: {} }), { name: "resolved-ens" })
);

export const useENS = (address: string) => {
  const addressLowercase = address.toLowerCase();
  const resolved = useStore(
    (state) => state.resolvedAddresses[addressLowercase]
  );

  useEffect(() => {
    (async () => {
      if (!addressLowercase) return;
      try {
        const data = await cachedFetch(
          `https://api.ensideas.com/ens/resolve/${addressLowercase}`
        ).then((res) => res.json());
        useStore.setState((state) => ({
          resolvedAddresses: {
            ...state.resolvedAddresses,
            [addressLowercase]: data,
          },
        }));
      } catch (error) {
        console.log("could not resolve ens", error);
      }
    })();
  }, [addressLowercase]);

  if (!resolved) {
    return {
      address,
      name: null,
      displayName: addressDisplayName(address),
      avatar: null,
    };
  }

  return {
    address: resolved.address,
    name: resolved.name,
    displayName: resolved.displayName,
    avatar: resolved.avatar,
  };
};
