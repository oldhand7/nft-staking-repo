import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "./useWeb3";
import environment from "../utils/Environment";
import { StakeUnStakeContract } from "../utils/contractHelpers";
import axios from "axios";


export const StakeForAll = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const tokenAddress = environment.djtAddress;
  const stakingAddress = environment.stakingContractAddress;

  const contract = StakeUnStakeContract(stakingAddress, web3);
  const StakeTokens = useCallback(
    async (tokenIds, tier) => {
      try {
        const gas = await contract.methods
          .stakeMany(tokenIds, tier)
          .estimateGas({ from: account });

        const staked = await contract.methods
          .stakeMany(tokenIds, tier)
          .send({ from: account, gas: gas, gasPrice: "10500000000" })
          .on("transactionHash", (tx) => {
            return tx.transactionHash;
          })

        tokenIds.map(token => {
          axios.post("https://api.opencanvas.app/stake/record", { address: account, tokenId: token, tier });
        })
        return staked;
      } catch (error) {
        return error;
      }

    },
    [account, contract]
  );

  return { StakeAll: StakeTokens };
};

export default StakeForAll;
