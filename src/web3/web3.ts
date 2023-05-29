import Web3 from "web3";
var provider = process.env.REACT_APP_WEB3_PROVIDER || "";

var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);

export default web3; 

