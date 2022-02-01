import web3NoAccount from './web3'
// import yfEthAbi from './yfethAbi.json';
import approveAbi from './approveAbi.json';
import stakeUnstakeAbi from './stakeUnstakeAbi.json';


const getContract = (abi, address, web3) => {
    const _web3 = web3 ?? web3NoAccount;
    return new _web3.eth.Contract(abi, address)
}

export const getBep20Contract = (address, web3) => {
    return getContract(approveAbi, address, web3)
}

export const ApprovedContract = (address, web3) => {
    return getContract(approveAbi, address, web3)
}

export const StakeUnStakeContract = (address, web3) => {
    return getContract(stakeUnstakeAbi, address, web3)
}