import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "./useWeb3";
import environment from "../utils/Environment";
import { StakeUnStakeContract } from "../utils/contractHelpers";
import axios from "axios";


export const UnStakeForAll = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const tokenAddress = environment.djtAddress;
  const stakingAddress = environment.stakingContractAddress;

  const contract = StakeUnStakeContract(stakingAddress, web3);
  const StakeTokens = useCallback(
    async (tokenIds, tier) => {
      try {

        const gas = await contract.methods
          .unstakeMany(tokenIds, tier)
          .estimateGas({ from: account });

        const Unstaked = await contract.methods
          .unstakeMany(tokenIds, tier)
          .send({ from: account, gas: gas, gasPrice: "10500000000" })
          .on("transactionHash", (tx) => {
            return tx.transactionHash;
          })

        tokenIds.map(token => {
          axios.post("https://api.opencanvas.app/unstake/record", { address: account, tokenId: token });
        })
        return Unstaked;

      } catch (error) {
        return error
      }
    },
    [account, contract]
  );

  return { UnStakeAll: StakeTokens };
};

export default UnStakeForAll;
