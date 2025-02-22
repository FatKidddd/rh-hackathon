import { ethers } from "ethers";
import TokenABI from "./contracts/Token.sol/Token.json";
import EventFactoryABI from "./contracts/EventFactory.sol/EventFactory.json";
import WelfareFactoryABI from "./contracts/WelfareFactory.sol/WelfareFactory.json";

const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/polygon_amoy");
export const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
export const EventFactoryContract = new ethers.Contract("0x85e9c2959238a4db37e7c92531a9f254b7bf3914", EventFactoryABI.abi, signer);
export const WelfareFactoryContract = new ethers.Contract("0xa9BE787dD4fC9dB90A9aBE099cD7CeA4B9403D6f", WelfareFactoryABI.abi, signer);
export const TokenContract = new ethers.Contract("0x97f2bf7c047ae84810ce51b52128f6bad5f4dfbd", TokenABI.abi, signer);
