import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "./useWeb3";
import environment from "../utils/Environment";
import { StakeUnStakeContract } from "../utils/contractHelpers";

export const CheckStack = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const tokenAddress = environment.stakingContractAddress;
  const contract = StakeUnStakeContract(tokenAddress, web3);
  const StackNft = useCallback(
    async () => {
      const nfts = await contract.methods.stakingNft().call();
      return nfts;
    },
    [account, contract]
  );

  return { StackNft };
};

export default CheckStack;
