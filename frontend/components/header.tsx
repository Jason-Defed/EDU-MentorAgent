"use client";

import Link from "next/link"
import { BookOpenIcon } from "lucide-react"
import { RoleSwitcher } from "@/components/role-switcher"
import { Button } from "@/components/ui/button"
import LoginButton from "../components/LoginButton";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import { formatAddress } from "@/utils/util";
import { WalletDropdown } from "@/components/WalletDropdown";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";



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



interface HeaderProps {
  showRoleSwitcher?: boolean
}

export function Header({ showRoleSwitcher = true }: HeaderProps) {
  const { authState, ocAuth, OCId, ethAddress } = useOCAuth();
  let userInfo: DecodedToken | null = null;
  const router = useRouter()
  const { toast } = useToast(); 


  if (authState?.idToken) {
    userInfo = jwtDecode<DecodedToken>(authState.idToken);
  }


  const checkAndAddCodexNetwork = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      console.error("MetaMask not detected");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please Install Metamask.",
      });
      return;
    }
  
    const codexChainId = "0xa045c"; // chainid 656476
    try {
      const currentChainId = await window.ethereum.request({ method: "eth_chainId" });
      if (currentChainId !== codexChainId) {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: codexChainId }],
          });
          console.log("Switched to Codex network");
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: codexChainId,
                    chainName: "EDU Chain Testnet",
                    rpcUrls: ["https://rpc.open-campus-codex.gelato.digital"],
                    nativeCurrency: {
                      name: "EDU",
                      symbol: "EDU",
                      decimals: 18,
                    },
                    blockExplorerUrls: ["https://edu-chain-testnet.blockscout.com"],
                  },
                ],
              });
              console.log("EDU network added and switched");
              toast({
                title: "Success",
                description: "EDU Chain Testnet added and switched",
              });
            } catch (addError) {
              console.error("Failed to add EDU network:", addError);
              toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to add EDU network.",
              });
            }
          } else {
            console.error("Failed to switch network:", switchError);
          }
        }
      } else {
        console.log("Already on EDU network");
      }
    } catch (error) {
      console.error("Error checking network:", error);
    }
  };

  useEffect(() => {
    const changeNetwork = async () => {
      checkAndAddCodexNetwork()
    }
    changeNetwork()
  }, [authState]);

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2">
              <BookOpenIcon className="h-6 w-6 text-teal-600" />
              <span className="text-xl font-bold">MentorAgent</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {showRoleSwitcher && <RoleSwitcher />}

          {userInfo ? (
            <WalletDropdown
              address={userInfo.eth_address}
              onDisconnect={() => {
                console.log("Disconnected");
                ocAuth.logout(window.location.origin);
                router.push("/")
              }}
            />
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </header>
  )
}
