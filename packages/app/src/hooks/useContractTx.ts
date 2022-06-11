import { CallOverrides, ethers } from "ethers";
import { useEffect, useState } from "react";
import {
  Chain,
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

interface Options {
  args?: any;
  overrides?: CallOverrides;
  onNotReady?: () => void;
  onWrongNetwork?: (chain: Chain) => void;
  onReady?: () => void;
  onInitiate?: () => void;
  onBroadcast?: (data?: ethers.providers.TransactionResponse) => void;
  onConfirmed?: (data?: ethers.providers.TransactionReceipt) => void;
  onError?: (error: Error) => void;
}

export function useContractTx(
  contractName: ContractName,
  functionName: string,
  {
    args,
    overrides,
    onNotReady,
    onWrongNetwork,
    onReady,
    onInitiate,
    onBroadcast,
    onConfirmed,
    onError,
  }: Options
) {
  const [errorMessage, setErrorMessage] = useState("");

  const { data: account } = useAccount();
  const { activeChain } = useNetwork();

  const contractAddress = deployedAddress(contractName, targetNetwork);
  const contractAbi = deployedAbi(contractName);

  useEffect(() => {
    if (account) {
      if (onReady) onReady();
    } else {
      if (onNotReady) onNotReady();
    }
  }, [account, onReady, onNotReady]);

  useEffect(() => {
    if (activeChain && activeChain.unsupported) {
      if (onWrongNetwork) onWrongNetwork(activeChain);
    }
  }, [activeChain, onWrongNetwork]);

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
        if (onError) onError(error);
      },
      onMutate() {
        if (onInitiate) onInitiate();
      },
      onSettled(_, error: any) {
        if (error) {
          if (onError) onError(error);
          if (error.code && error.code === 4001) {
            setErrorMessage("Rejected in wallet");
          }
        }
      },
      onSuccess(data) {
        if (onBroadcast) onBroadcast(data);
      },
    }
  );

  const _ = useWaitForTransaction({
    hash: writeData && writeData.hash,
    onError(error) {
      if (onError) onError(error);
    },
    onSettled(data, error: any) {
      if (error) {
        setErrorMessage("");
        if (onError) onError(error);
      } else {
        if (onConfirmed) onConfirmed(data);
      }
    },
  });

  return {
    write,
    writeData,
    errorMessage,
  };
}
