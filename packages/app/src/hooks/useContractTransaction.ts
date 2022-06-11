import { CallOverrides, ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import {
  ContractName,
  deployedAbi,
  deployedAddress,
  targetNetwork,
} from "../utils/contracts";

export enum TxState {
  NotReady,
  WrongNetwork,
  Ready,
  WaitingOnWallet,
  Broadcasted,
  Confirmed,
  Error,
}

interface Options {
  args?: any;
  overrides?: CallOverrides;
  onBroadcast?: (data?: ethers.providers.TransactionResponse) => void;
  onConfirmed?: (data?: ethers.providers.TransactionReceipt) => void;
  onError?: (error: Error) => void;
}

export function useContractTransaction(
  contractName: ContractName,
  functionName: string,
  { args, overrides, onBroadcast, onConfirmed, onError }: Options
) {
  const [txState, setTxState] = useState(TxState.NotReady);
  const [errorMessage, setErrorMessage] = useState("");

  const { data: account } = useAccount();
  const { activeChain, switchNetwork } = useNetwork();

  const contractAddress = deployedAddress(contractName, targetNetwork);
  const contractAbi = deployedAbi(contractName);

  useEffect(() => {
    if (account) {
      if (activeChain && activeChain.unsupported) {
        setTxState(TxState.WrongNetwork);
      } else {
        setTxState(TxState.Ready);
      }
    } else {
      setTxState(TxState.NotReady);
    }
  }, [account, activeChain]);

  useEffect(() => {
    if (txState !== TxState.Error) setErrorMessage("");
  }, [txState]);

  const setToReady = useCallback(() => {
    setTxState(account ? TxState.Ready : TxState.NotReady);
  }, [account]);

  const { write, data: writeData } = useContractWrite(
    {
      addressOrName: contractAddress,
      contractInterface: contractAbi,
    },
    functionName,
    {
      args,
      overrides,
      onError(error) {
        setTxState(TxState.Error);
        if (onError) onError(error);
      },
      onMutate() {
        setTxState(TxState.WaitingOnWallet);
      },
      onSettled(_, error: any) {
        if (error) {
          setTxState(TxState.Error);
          if (onError) onError(error);
          if (error.code && error.code === 4001) {
            setErrorMessage("Rejected in wallet");
          }
        }
      },
      onSuccess(data) {
        setTxState(TxState.Broadcasted);
        if (onBroadcast) onBroadcast(data);
      },
    }
  );

  const _ = useWaitForTransaction({
    hash: writeData && writeData.hash,
    onError(error) {
      setTxState(TxState.Error);
      if (onError) onError(error);
    },
    onSettled(data, error: any) {
      if (error) {
        setTxState(TxState.Error);
        setErrorMessage("");
        if (onError) onError(error);
      } else {
        setTxState(TxState.Confirmed);
        if (onConfirmed) onConfirmed(data);
      }
    },
  });

  return {
    write,
    writeData,
    txState,
    setToReady,
    switchNetwork,
    errorMessage,
  };
}
