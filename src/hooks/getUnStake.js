import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "./useWeb3";
import environment from "../utils/Environment";
import { StakeUnStakeContract } from "../utils/contractHelpers";
import axios from "axios";

export const UnStakeForSingle = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const tokenAddress = environment.djtAddress;
  const stakingAddress = environment.stakingContractAddress;

  const contract = StakeUnStakeContract(stakingAddress, web3);
  const StakeTokens = useCallback(
    async (tokenId, tier) => {
      const gas = await contract.methods
        .unstake(tokenId, tier)
        .estimateGas({ from: account })

      const staked = await contract.methods
        .unstake(tokenId, tier)
        .send({ from: account, gas: gas, gasPrice: '10500000000' })
        .on("transactionHash", (tx) => {
          return tx.transactionHash;
        }).then(() => {
          axios.post("https://api.opencanvas.app/stake/record", { address: account, tokenId, tier });
        })
        .catch((error) => {
          return error;
        });
      return staked;
    },
    [account, contract]
  );

  return { UnStake: StakeTokens };
};

export default UnStakeForSingle;
