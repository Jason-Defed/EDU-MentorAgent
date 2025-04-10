"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { WalletIcon, AlertCircleIcon } from "lucide-react"
import { WalletSelector } from "@/components/wallet-selector"
import Web3 from "web3";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";



interface DecodedToken {
  user_id: number;
  eth_address: string;
  edu_username: string;
  iss: string;
  iat: number;
  exp: number;
  aud: string;
  [key: string]: any;
}



export default function ConnectWalletPage() {
  const router = useRouter()
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const { authState } = useOCAuth();
  const [mmStatus, setMmStatus] = useState<string>("Not connected!");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [accountAddress, setAccountAddress] = useState<string | undefined>(
    undefined
  );
  const [displayMessage, setDisplayMessage] = useState<string>("");
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
  const [getNetwork, setGetNetwork] = useState<number | undefined>(undefined);
  const [contractAddress, setContractAddress] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [txnHash, setTxnHash] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [ocidUsername, setOcidUsername] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in with OCID
    if (authState.idToken) {
      const decodedToken = jwtDecode<DecodedToken>(authState.idToken);
      setOcidUsername(decodedToken.edu_username);
    }

    // Initialize Web3 and set contract
    (async () => {
      try {
        if (typeof (window as any).ethereum !== "undefined") {
          const web3 = new Web3((window as any).ethereum);
          setWeb3(web3);
          const networkId: any = await web3.eth.getChainId();
          // setGetNetwork(networkId);
          // const contractAddress = "0x48D2d71e26931a68A496F66d83Ca2f209eA9956E";
          // setContractAddress(contractAddress);
          // const Greeter = new web3.eth.Contract(
          //   contractJson.abi,
          //   contractAddress
          // ) as Contracts;
          // setContracts(Greeter);
          // Greeter.setProvider(window.ethereum);
        } else {
          alert("Please install MetaMask!");
        }
      } catch (error) {
        console.error("Failed to initialize web3 or contract:", error);
      }
    })();
  }, [authState.idToken]);


  const ConnectWallet = async () => {
    // Connect to MetaMask and handle errors
    if (typeof (window as any).ethereum !== "undefined") {
      try {
        const chainId = await (window as any).ethereum.request({
          method: "eth_chainId",
        });
        console.log("chainId", chainId)
        if (chainId !== "0xa045c") {
          alert(
            `Please connect to the "Open Campus Codex" network in Metamask.`
          );
          return;
        }
        await (window as any).ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await (window as any).ethereum.request({
          method: "eth_accounts",
        });
        console.log("accounts", accounts)
        console.log("accounts0", accounts[0])
        setAccountAddress(accounts[0]);
        setMmStatus("Connected!");
        setIsConnected(true);
      } catch (error) {
        console.error("Failed to connect to wallet:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const handleConnect = async () => {
    if (!selectedWallet) {
      setError("Please select a wallet")
      return
    }

    setIsConnecting(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // Redirect to role selection page
      router.push("/role-selection")
    } catch (err) {
      setError("Failed to connect wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen px-4 py-12 mx-auto">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Connect Your Wallet</CardTitle>
          <CardDescription className="text-center">
            Connect your blockchain wallet to access MentorAgent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WalletSelector onSelect={setSelectedWallet} selected={selectedWallet} />

          {error && (
            <div className="flex items-center gap-2 mt-4 p-3 text-sm border rounded-md border-red-200 bg-red-50 text-red-600">
              <AlertCircleIcon className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-teal-600 hover:bg-teal-700"
            onClick={handleConnect}
            disabled={isConnecting || !selectedWallet}
          >
            {isConnecting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Connecting...
              </>
            ) : (
              <>
                <WalletIcon className="mr-2 h-4 w-4" />
                Connect Wallet
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
