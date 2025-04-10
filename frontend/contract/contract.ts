import { BrowserProvider, Contract } from "ethers";
import MentorAgent from "./artifacts/MentorAgent.json";

const contractAddress = process.env.NEXT_PUBLIC_MENTOR_CONTRACT_ADDRESS as string;

let provider: BrowserProvider;
let signer: any; // ethers v6
let contract: Contract;

const initContract = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
        provider = new BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        contract = new Contract(contractAddress, MentorAgent.abi, signer);
    } else {
        console.error("Please install MetaMask!");
    }
};

export { initContract, contract };
