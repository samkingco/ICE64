import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useContractWrite, useNetwork, useWaitForTransaction } from "wagmi";
import { assign, createMachine } from "xstate";
import { graphQlClient } from "../graphql/client";
import {
  PhotoByIdQuery,
  PhotoByIdQueryVariables,
  usePhotoByIdQuery,
} from "../graphql/subgraph";
import {
  deployedAbi,
  deployedAddress,
  ice64Settings,
  targetNetwork,
} from "../utils/contracts";
import { getEditionId, getIsEdition, getOriginalId } from "../utils/tokenIds";

interface RootsPhoto {
  id: number;
  hasClaimBeenUsed: boolean;
}

interface SubgraphData {
  id?: number;
  originalOwner: string | null;
  originalURI?: string;
  editionsSold: number;
  editionOwners: string[];
  roots: RootsPhoto[];
  claimableRootsIds: number[];
}

export interface PurchaseMachineContext {
  id: number | null;
  activeId: number | null;
  initialType: "original" | "edition";
  maxEditions: number;
  wallet: string | null;
  networkId: number | null;
  txHash?: string;
  txType?: "purchase" | "claim";
  errorMessage: string;
  subgraphData: SubgraphData;
  subgraphDataById: Record<number, SubgraphData>;
}

const transactionStates = (endState: string) => ({
  initial: "idle",
  on: {
    CONNECT: {
      target: ".connected",
      cond: "whileDisconnected",
      actions: ["connect"],
    },
    SWITCH_NETWORK: {
      target: ".connected",
      cond: "whileConnected",
      actions: ["switchNetwork"],
    },
    DISCONNECT: {
      target: ".notConnected",
      cond: "whileConnected",
      actions: ["disconnect"],
    },
  },
  states: {
    idle: {
      always: [
        { target: "connected", cond: "whileConnected" },
        { target: "notConnected" },
      ],
    },
    notConnected: {},
    connected: {
      initial: "idle",
      states: {
        idle: {
          always: [
            { target: "wrongNetwork", cond: "whileOnWrongNetwork" },
            { target: "ready" },
          ],
        },
        wrongNetwork: {},
        ready: {
          on: {
            TX_SUBMIT: { target: "initiated", actions: ["setTxType"] },
          },
        },
        initiated: {
          entry: ["initiateTx"],
          on: {
            TX_SUCCESS: "broadcast",
            TX_ERROR: { target: "error", actions: ["setErrorMessage"] },
          },
        },
        broadcast: {
          on: {
            TX_CONFIRMED: {
              target: "thankyou",
              actions: ["optimisticOwnerSet"],
            },
            TX_ERROR: { target: "error", actions: ["setErrorMessage"] },
          },
        },
        thankyou: {
          after: {
            THANK_YOU: endState,
          },
        },
        error: {
          on: {
            RETRY: "initiated",
          },
        },
      },
    },
  },
});

const defaultSubgraphData: SubgraphData = {
  originalOwner: null,
  editionsSold: 0,
  editionOwners: [],
  roots: [],
  claimableRootsIds: [],
};

export const purchaseMachine = createMachine<PurchaseMachineContext>(
  {
    id: "purchase",
    initial: "subgraphLoading",
    context: {
      id: null,
      activeId: null,
      initialType: "original",
      maxEditions: ice64Settings.maxEditions,
      wallet: null,
      networkId: targetNetwork.id,
      txHash: undefined,
      txType: undefined,
      errorMessage: "",
      subgraphData: defaultSubgraphData,
      subgraphDataById: {},
    },
    states: {
      idle: {
        always: [
          { target: "original", cond: "whileOriginal" },
          { target: "edition", cond: "whileEdition" },
        ],
      },
      original: {
        initial: "idle",
        states: {
          idle: {
            always: [
              { target: "owned", cond: "whenOwnsOriginal" },
              { target: "sold", cond: "whenOriginalSold" },
              { target: "available" },
            ],
          },
          owned: {
            type: "final",
          },
          sold: {
            type: "final",
          },
          available: {
            ...transactionStates("#purchase.original.owned"),
          },
        },
      },
      edition: {
        initial: "idle",
        states: {
          idle: {
            always: [
              { target: "owned", cond: "whenOwnsEdition" },
              { target: "soldOut", cond: "whenEditionSoldOut" },
              { target: "reserved", cond: "whenEditionReserved" },
              { target: "available" },
            ],
          },
          owned: {
            type: "final",
          },
          soldOut: {
            type: "final",
          },
          reserved: {
            on: {
              REFRESH_SUBGRAPH: "#purchase.subgraphLoading",
            },
          },
          available: {
            ...transactionStates("#purchase.edition.owned"),
          },
        },
      },
      subgraphLoading: {
        invoke: {
          id: "fetch-subgraph-data",
          src: "fetchSubgraph",
          onDone: {
            target: "subgraphSuccess",
            actions: assign({
              subgraphData: (ctx, event: any) => subgraphToContext(event),
              subgraphDataById: (ctx, event: any) => {
                const data = subgraphToContext(event);
                if (data.id) {
                  return {
                    ...ctx.subgraphDataById,
                    [data.id]: data,
                  };
                }
                return ctx.subgraphDataById;
              },
            }),
          },
          onError: {
            target: "subgraphFailure",
          },
        },
      },
      subgraphSuccess: {
        always: "idle",
      },
      subgraphFailure: {
        on: {
          RETRY: "subgraphLoading",
        },
      },
    },
    on: {
      CONNECT: {
        cond: "whileDisconnected",
        actions: ["connect"],
      },
      SWITCH_NETWORK: {
        cond: "whileConnected",
        actions: ["switchNetwork"],
      },
      DISCONNECT: {
        cond: "whileConnected",
        actions: ["disconnect"],
      },
      RECEIVE_TX_HASH: {
        actions: ["receiveTx"],
      },
      SET_ACTIVE_ID: { target: "idle", actions: ["setActiveId"] },
    },
  },
  {
    delays: {
      THANK_YOU: 5000,
    },
    actions: {
      setActiveId: assign({
        activeId: (ctx, event) => event.activeId,
        subgraphData: (ctx, event) => {
          const id = getOriginalId(event.activeId);
          return ctx.subgraphDataById[id] || defaultSubgraphData;
        },
      }),
      optimisticOwnerSet: assign((ctx) => {
        if (!ctx.activeId || !ctx.wallet || !ctx.id) return ctx;
        const isEdition = getIsEdition(ctx.activeId);
        const subgraph = { ...ctx.subgraphData };
        if (!isEdition) {
          subgraph.originalOwner = ctx.wallet;
        } else {
          subgraph.editionOwners.push(ctx.wallet);
          subgraph.editionsSold++;
        }
        return {
          ...ctx,
          subgraphData: subgraph,
          subgraphDataById: {
            ...ctx.subgraphDataById,
            [ctx.id]: subgraph,
          },
        };
      }),
      connect: assign({
        wallet: (ctx, event) => event.wallet.toLowerCase() || ctx.wallet,
        networkId: (ctx, event) => event.networkId || ctx.networkId,
      }),
      disconnect: assign({
        wallet: (ctx) => null,
      }),
      switchNetwork: assign({
        networkId: (ctx, event) => event.networkId || ctx.networkId,
      }),
      setErrorMessage: assign({
        errorMessage: (ctx, event) => event.errorMessage || "",
      }),
      receiveTx: assign({
        txHash: (ctx, event) => event.hash || "",
      }),
      setTxType: assign({
        txType: (ctx, event) => event.txType || "",
      }),
    },
    guards: {
      whileOriginal: (ctx) => {
        return !getIsEdition(ctx.activeId || 0);
      },
      whenOwnsOriginal: (ctx) => {
        return !getIsEdition(ctx.activeId || 0) && doesOwnOriginal(ctx);
      },
      whenOriginalSold: (ctx) => {
        return !getIsEdition(ctx.activeId || 0) && isOriginalSoldOut(ctx);
      },
      whileEdition: (ctx) => {
        return getIsEdition(ctx.activeId || 0);
      },
      whenOwnsEdition: (ctx) => {
        return getIsEdition(ctx.activeId || 0) && doesOwnEdition(ctx);
      },
      whenEditionSoldOut: (ctx) => {
        return getIsEdition(ctx.activeId || 0) && isEditionSoldOut(ctx);
      },
      whenEditionReserved: (ctx) => {
        return isEditionReserved(ctx);
      },
      whileConnected: (ctx) => {
        return Boolean(ctx.wallet);
      },
      whileOnWrongNetwork: (ctx) => {
        return ctx.networkId !== targetNetwork.id;
      },
      whileDisconnected: (ctx) => {
        return Boolean(!ctx.wallet);
      },
    },
  }
);

function doesOwnOriginal(ctx: PurchaseMachineContext): boolean {
  const wallet = ctx.wallet;
  const owner =
    ctx.subgraphData.originalOwner && ctx.subgraphData.originalOwner;
  return Boolean(wallet && owner && wallet === owner);
}

function doesOwnEdition(ctx: PurchaseMachineContext): boolean {
  const wallet = ctx.wallet && ctx.wallet;
  const owners = ctx.subgraphData.editionOwners.map((i) => i);
  return Boolean(wallet && owners.includes(wallet));
}

function isOriginalSoldOut(ctx: PurchaseMachineContext): boolean {
  const wallet = ctx.wallet && ctx.wallet;
  return Boolean(
    ctx.subgraphData.originalOwner && ctx.subgraphData.originalOwner !== wallet
  );
}

function isEditionSoldOut(ctx: PurchaseMachineContext): boolean {
  const ownsEdition = doesOwnEdition(ctx);
  return !ownsEdition && ctx.subgraphData.editionsSold === ctx.maxEditions;
}

function isEditionReserved(ctx: PurchaseMachineContext): boolean {
  const ownsEdition = doesOwnEdition(ctx);
  return (
    !ownsEdition &&
    !ctx.subgraphData.originalOwner &&
    ctx.subgraphData.editionsSold === ctx.maxEditions - 1
  );
}

export function hasClaimableRoots(ctx: PurchaseMachineContext): boolean {
  const wallet = ctx.wallet && ctx.wallet;
  const hasClaims = ctx.subgraphData.claimableRootsIds.length > 0;
  return Boolean(wallet && hasClaims);
}

function subgraphToContext({ data }: { data?: PhotoByIdQuery }): SubgraphData {
  const og = data && data.originalPhoto;
  const originalOwner =
    (og && og.currentOwner && og.currentOwner.address.toLowerCase()) || null;
  const originalURI = (og && og.uri) || "";

  const ed = data && data.editionPhoto;
  const editionsSold =
    ed && ed.totalPurchased && parseInt(ed.totalPurchased, 10);
  const editionOwners =
    (ed && ed.currentOwners.map((i) => i.address.toLowerCase())) || [];

  const r = (data && data.wallet && data.wallet.roots) || [];
  const roots = r.map((i) => ({
    id: parseInt(i.id, 10),
    hasClaimBeenUsed: i.hasClaimedEdition,
  }));
  const claimableRootsIds = r.reduce(
    (ids: number[], i) =>
      !i.hasClaimedEdition ? [...ids, parseInt(i.id, 10)] : ids,
    []
  );

  return {
    id: (og && parseInt(og.id, 10)) || undefined,
    originalOwner,
    originalURI,
    editionsSold,
    editionOwners,
    roots,
    claimableRootsIds,
  };
}

interface Props {
  id: number;
  activeId: number;
  wallet?: string;
  maxEditions: number;
}

export function usePurchaseMachine({
  id,
  activeId,
  wallet,
  maxEditions,
}: Props) {
  const isEdition = getIsEdition(activeId);
  const price = isEdition
    ? ice64Settings.priceEdition
    : ice64Settings.priceOriginal;

  const { activeChain } = useNetwork();
  const contractAbi = deployedAbi("ICE64");
  const contractAddress = deployedAddress("ICE64", targetNetwork);

  const { write: purchase, data: purchaseData } = useContractWrite(
    {
      addressOrName: contractAddress,
      contractInterface: contractAbi,
    },
    isEdition ? "purchaseEdition" : "purchaseOriginal",
    {
      args: [id],
      overrides: { value: price },
      onError(error: any) {
        let message = "";
        if (error.code && error.code === 4001) {
          message = "Rejected in wallet";
        }
        send("TX_ERROR", { message });
      },
      onMutate() {
        // send("TX_SUBMIT");
      },
      onSettled(_, error: any) {
        if (error) {
          let message = "";
          if (error.code && error.code === 4001) {
            message = "Rejected in wallet";
          }
          send("TX_ERROR", { message });
        }
      },
      onSuccess() {
        send("TX_SUCCESS");
      },
    }
  );

  const purchaseTx = useWaitForTransaction({
    hash: purchaseData && purchaseData.hash,
    onError() {
      send("TX_ERROR");
    },
    onSettled(_, error: any) {
      if (error) {
        send("TX_ERROR");
      } else {
        send("TX_CONFIRMED");
      }
    },
  });

  const { write: claim, data: claimData } = useContractWrite(
    {
      addressOrName: contractAddress,
      contractInterface: contractAbi,
    },
    "claimEditionAsRootsHolder",
    {
      onError(error: any) {
        let message = "";
        if (error.code && error.code === 4001) {
          message = "Rejected in wallet";
        }
        send("TX_ERROR", { message });
      },
      onMutate() {
        // send("TX_SUBMIT");
      },
      onSettled(_, error: any) {
        if (error) {
          let message = "";
          if (error.code && error.code === 4001) {
            message = "Rejected in wallet";
          }
          send("TX_ERROR", { message });
        }
      },
      onSuccess() {
        send("TX_SUCCESS");
      },
    }
  );

  const claimTx = useWaitForTransaction({
    hash: claimData && claimData.hash,
    onError() {
      send("TX_ERROR");
    },
    onSettled(_, error: any) {
      if (error) {
        send("TX_ERROR");
      } else {
        send("TX_CONFIRMED");
      }
    },
  });

  const queryClient = useQueryClient();

  const variables: PhotoByIdQueryVariables = {
    originalId: getOriginalId(id).toString(),
    editionId: getEditionId(id).toString(),
    wallet: wallet || "",
  };

  const machine = useMachine(purchaseMachine, {
    context: {
      id,
      activeId,
      wallet,
      maxEditions,
      initialType: getIsEdition(activeId) ? "edition" : "original",
    },
    actions: {
      initiateTx: (ctx, event) => {
        if (ctx.txType === "claim") {
          claim({ args: [id, event.rootsId] });
        } else {
          purchase();
        }
      },
    },
    services: {
      fetchSubgraph: () => async () => {
        const key = usePhotoByIdQuery.getKey(variables);
        const data = queryClient.getQueryData(key);
        return (
          data ||
          queryClient.fetchQuery(
            key,
            usePhotoByIdQuery.fetcher(graphQlClient, variables),
            { staleTime: 10000 }
          )
        );
      },
    },
  });

  const [state, send] = machine;

  useEffect(() => {
    if (state.context.activeId !== activeId) {
      send("SET_ACTIVE_ID", { activeId });
    }
  }, [activeId, state, send]);

  useEffect(() => {
    if (wallet) {
      send("CONNECT", { wallet });
    } else {
      send("DISCONNECT");
    }
  }, [wallet, send]);

  useEffect(() => {
    if (activeChain) {
      send("SWITCH_NETWORK", { networkId: activeChain.id });
    }
  }, [activeChain, send]);

  useEffect(() => {
    if (purchaseData && purchaseData.hash) {
      send("RECEIVE_TX_HASH", { hash: purchaseData.hash, txType: "purchase" });
    }
  }, [purchaseData, send]);

  return machine;
}
