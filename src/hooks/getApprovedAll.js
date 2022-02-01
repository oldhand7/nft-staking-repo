import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "./useWeb3";
import environment from "../utils/Environment";
import { ApprovedContract } from "../utils/contractHelpers";

export const ApprovedForAll = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const tokenAddress = environment.djtAddress;
  const stakingAddress = environment.stakingContractAddress;
  const contract = ApprovedContract(tokenAddress, web3);
  const ApproveTokens = useCallback(async () => {

    const gas = await contract.methods
      .setApprovalForAll(stakingAddress, true)
      .estimateGas({ from: account });

    const approved = await contract.methods
      .setApprovalForAll(stakingAddress, true)
      .send({ from: account, gas, gasPrice: "10500000000" })
      .on("transactionHash", (tx) => {
        return tx.transactionHash;
      });
    return approved;
  }, [account, contract]);

  return { ApproveAll: ApproveTokens };
};

export default ApprovedForAll;
