"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WalletIcon, BookOpenIcon, UserIcon } from "lucide-react"
import { Header } from "@/components/header"
import LoginButton from "@/components/LoginButton"
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { ethers } from "ethers";


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


export default function Home() {
  const { authState, ocAuth, OCId, ethAddress } = useOCAuth();
  let userInfo: DecodedToken | null = null;
  const router = useRouter()


  if (authState?.idToken) {
    userInfo = jwtDecode<DecodedToken>(authState.idToken);
  }

  const switchToEDUChain = async () => {
    const eduChainParams = {
      chainId: "0x27D8", // 十六进制的656476 (EDU Testnet)656476
      chainName: "EDU Chain Testnet",
      nativeCurrency: {
        name: "EDU",
        symbol: "EDU",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.open-campus-codex.gelato.digital"],
      blockExplorerUrls: ["https://edu-chain-testnet.blockscout.com"],
    };
  
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [eduChainParams],
      });
    } catch (error) {
      console.error("Failed to switch network:", error);
    }
  };
  
  const checkAndAddCodexNetwork = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      console.error("MetaMask not detected");
      return;
    }
  
    const codexChainId = "0xA02DC"; // 656476 in hex
  
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
            } catch (addError) {
              console.error("Failed to add EDU network:", addError);
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
      if (authState === "authenticated") {
        // switchToEDUChain();
        // const provider = new ethers.BrowserProvider(window.ethereum);
        // const network = await provider.getNetwork();
        // console.log("Current chain ID:", network.chainId);
        // if (network.chainId ) {
          
        // }
      }
    }
    changeNetwork()
  }, [authState]);

  const handleGoRoleSelect = async () => {
    router.push("/role-selection")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header showRoleSwitcher={false} />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-teal-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Your AI-Powered Career Planning Platform
                </h1>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connect with industry professionals, get personalized career guidance, and develop skills that matter
                  for your future.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  {/* <Link href="/connect-wallet">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <WalletIcon className="mr-2 h-4 w-4" />
                      Connect Wallet
                    </Button>
                  </Link> */}
                  {userInfo ? (
                    <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleGoRoleSelect}>
                      {/* <WalletIcon className="mr-2 h-4 w-4" /> */}
                      Choose Your Role
                    </Button>
                  ) : (
                    <LoginButton />
                  )}
                  <Link href="/about">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="overflow-hidden rounded-lg border bg-white shadow-xl">
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-teal-100 p-2">
                            <UserIcon className="h-4 w-4 text-teal-600" />
                          </div>
                          <div className="font-medium">Career Matching</div>
                        </div>
                        <div className="text-sm text-teal-600">95% Match</div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="text-lg font-semibold">Software Engineer</div>
                        <div className="text-sm text-gray-500">United States</div>
                        <div className="text-sm">$90,000 - $120,000</div>
                        <div className="flex items-center gap-1">
                          {[...Array(4)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="text-yellow-400"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="text-gray-300"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <span className="ml-1 text-xs text-gray-500">Difficulty</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="w-full py-12 md:py-24 lg:py-32"> */}
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center items-center text-center">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our blockchain-based platform connects you with the right career path and mentors.
                </p>
              </div>
            </div>
            <div className="grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12 mx-auto">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
                  <UserIcon className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold">Create Profile</h3>
                <p className="text-gray-500">Enter your academic background, skills, and interests to get started.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-teal-600"
                  >
                    <path d="m18 16 4-4-4-4" />
                    <path d="m6 8-4 4 4 4" />
                    <path d="m14.5 4-5 16" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">AI Matching</h3>
                <p className="text-gray-500">
                  Our AI agents match you with suitable career positions based on your profile.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-teal-600"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Skill Development</h3>
                <p className="text-gray-500">
                  Get personalized guidance to develop the skills needed for your chosen career.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-50 w-full mx-auto">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-10 md:py-12 px-4 md:px-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpenIcon className="h-6 w-6 text-teal-600" />
              <span className="text-xl font-bold">MentorAgent</span>
            </div>
            <p className="text-sm text-gray-500">
              Blockchain-based AI platform for career planning and skill development.
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-lg font-medium">Links</div>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="#" className="hover:underline">About</Link>
              <Link href="#" className="hover:underline">Features</Link>
              <Link href="#" className="hover:underline">For Students</Link>
              <Link href="#" className="hover:underline">For Mentors</Link>
            </nav>
          </div>
          <div className="space-y-4">
            <div className="text-lg font-medium">Legal</div>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="#" className="hover:underline">Privacy Policy</Link>
              <Link href="#" className="hover:underline">Terms of Service</Link>
              <Link href="#" className="hover:underline">Cookie Policy</Link>
            </nav>
          </div>
        </div>
        {/* <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 py-10 md:flex-row md:justify-between md:py-12 px-4 md:px-6">
          <div className="flex-1 min-w-[200px] space-y-4">
            <div className="flex items-center gap-2">
              <BookOpenIcon className="h-6 w-6 text-teal-600" />
              <span className="text-xl font-bold">MentorAgent</span>
            </div>
            <p className="text-sm text-gray-500">
              Blockchain-based AI platform for career planning and skill development.
            </p>
          </div>
          <div className="flex-1 min-w-[150px] space-y-4">
            <div className="text-lg font-medium">Links</div>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="#" className="hover:underline">About</Link>
              <Link href="#" className="hover:underline">Features</Link>
              <Link href="#" className="hover:underline">For Students</Link>
              <Link href="#" className="hover:underline">For Mentors</Link>
            </nav>
          </div>
          <div className="flex-1 min-w-[150px] space-y-4">
            <div className="text-lg font-medium">Legal</div>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="#" className="hover:underline">Privacy Policy</Link>
              <Link href="#" className="hover:underline">Terms of Service</Link>
              <Link href="#" className="hover:underline">Cookie Policy</Link>
            </nav>
          </div>
        </div> */}
        {/* <div className="w-full max-w-7xl mx-auto flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12 px-4 md:px-6">
          <div className="flex-1 min-w-[200px] space-y-4">
            <div className="flex items-center gap-2">
              <BookOpenIcon className="h-6 w-6 text-teal-600" />
              <span className="text-xl font-bold">MentorAgent</span>
            </div>
            <p className="text-sm text-gray-500">
              Blockchain-based AI platform for career planning and skill development.
            </p>
          </div>
          <div className="flex-1 min-w-[200px] space-y-4">
            <div className="text-lg font-medium">Links</div>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="#" className="hover:underline">
                About
              </Link>
              <Link href="#" className="hover:underline">
                Features
              </Link>
              <Link href="#" className="hover:underline">
                For Students
              </Link>
              <Link href="#" className="hover:underline">
                For Mentors
              </Link>
            </nav>
          </div>
          <div className="flex-1 min-w-[200px] space-y-4">
            <div className="text-lg font-medium">Legal</div>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="#" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:underline">
                Terms of Service
              </Link>
              <Link href="#" className="hover:underline">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div> */}
        <div className="border-t py-6 text-center text-sm text-gray-500">
          <div className="container px-4 md:px-6 mx-auto">© {new Date().getFullYear()} MentorAgent. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
