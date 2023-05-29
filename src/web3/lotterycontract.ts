import abi from '../contractAbi/lotterydapp';
import Web3 from "./web3";

const address = process.env.REACT_APP_LOTTERY_DAPP_ADDRESS;

const contract = new Web3.eth.Contract(abi, address);
export default contract;