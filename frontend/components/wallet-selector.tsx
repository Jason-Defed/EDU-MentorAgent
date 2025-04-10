"use client"
import Image from "next/image"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface WalletOption {
  id: string
  name: string
  icon: string
}

interface WalletSelectorProps {
  onSelect: (wallet: string) => void
  selected: string | null
}

const wallets: WalletOption[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "phantom",
    name: "Phantom",
    icon: "/placeholder.svg?height=40&width=40",
  },
]

export function WalletSelector({ onSelect, selected }: WalletSelectorProps) {
  return (
    <RadioGroup className="grid gap-4" value={selected || undefined} onValueChange={onSelect}>
      {wallets.map((wallet) => (
        <div key={wallet.id} className="flex items-center">
          <RadioGroupItem value={wallet.id} id={wallet.id} className="peer sr-only" />
          <Label
            htmlFor={wallet.id}
            className="flex items-center justify-between w-full p-4 border rounded-md cursor-pointer peer-data-[state=checked]:border-teal-600 peer-data-[state=checked]:bg-teal-50 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Image
                src={wallet.icon || "/placeholder.svg"}
                alt={wallet.name}
                width={24}
                height={24}
                className="rounded-md"
              />
              <span>{wallet.name}</span>
            </div>
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
              className="h-5 w-5 text-teal-600 opacity-0 peer-data-[state=checked]:opacity-100"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}
