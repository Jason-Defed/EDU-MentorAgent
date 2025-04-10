"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { formatAddress } from "@/utils/util";
import { Button } from "@/components/ui/button";

interface WalletDropdownProps {
  address: string;
  onDisconnect: () => void;
}

export function WalletDropdown({ address, onDisconnect }: WalletDropdownProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline" size="sm">
          {formatAddress(address)}
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          className="z-50 rounded-md border bg-popover p-4 shadow-md w-[260px]"
        >
          <div className="text-sm text-muted-foreground mb-3 text-center">Connected</div>
          <div className="break-all text-sm font-mono bg-muted p-2 rounded mb-3">
            {address}
          </div>
          <Button variant="destructive" className="w-full" onClick={onDisconnect}>
            Disconnect
          </Button>
          <Popover.Arrow className="fill-popover" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
