"use client";
// components/OCIDProvider.tsx
import { FC, ReactNode } from "react";
import { OCConnect } from "@opencampus/ocid-connect-js";


const AUTH_REDIRECT_URI = process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI || '';
const domain = typeof window !== 'undefined' ? window.location.origin : '';

interface OCIDProviderProps {
  children: ReactNode;
}

const opts = {
  // redirectUri: `${domain}/redirect`,
  storageType: 'cookie',
  domain: '',
  redirectUri: `${domain}/redirect`,
  sameSite: false
};

const OCIDProvider: FC<OCIDProviderProps> = ({ children }) => (
  <OCConnect opts={opts} sandboxMode={true}>
    {children}
  </OCConnect>
);

export default OCIDProvider;
