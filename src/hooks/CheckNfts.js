import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "./useWeb3";
import environment from "../utils/Environment";
import { getBep20Contract } from "../utils/contractHelpers";

export const CheckNfts = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const tokenAddress = environment.djtAddress;
  const contract = getBep20Contract(tokenAddress, web3);
  const CategoriesNft = useCallback(
    async (tokenID) => {
      const nfts = await contract.methods.getApproved(tokenID).call();
    //   console.log("nfts",nfts)
      return nfts;
    },
    [account, contract]
  );

  return { CategoriesNft: CategoriesNft };
};

export default CheckNfts;
