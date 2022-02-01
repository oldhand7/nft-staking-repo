import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from './useWeb3';
import environment from '../utils/Environment';
import { ApprovedContract } from '../utils/contractHelpers'

export const ApprovedForSingle = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const tokenAddress = environment.djtAddress;
    const stakingAddress = environment.stakingContractAddress;

    const contract = ApprovedContract(tokenAddress, web3)
    const ApproveTokens = useCallback(async (address,tokenId) => {
            const approved = await contract.methods.approve(stakingAddress,tokenId).send({ from: account})
                .on('transactionHash', (tx) => { return tx.transactionHash });
            return approved
    
    }, [account, contract])

    return { Approve: ApproveTokens }
}

export default ApprovedForSingle;