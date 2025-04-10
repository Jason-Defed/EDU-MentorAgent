"use client";

import { useState } from "react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import OCButton from "./OCButton";
import { Button } from "@/components/ui/button";
import { WalletIcon, BookOpenIcon, UserIcon } from "lucide-react"



const LoginButton = () => {
  const { ocAuth } = useOCAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // await ocAuth.signInWithRedirect({
    //   state: "opencampus",
    // });
    try {
      setIsLoading(true);
      await ocAuth.signInWithRedirect({
        state: "opencampus",
      });
    } catch (error) {
      setIsLoading(false);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // return <OCButton onClick={handleLogin} isLoading={isLoading} size="lg">Connect with OCID</OCButton>;
  return (
    // <Button variant="outline" onClick={handleLogin} isLoading={isLoading} size="sm">
    //   Connect with OCID
    // </Button>
    <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleLogin} isLoading={isLoading} size="sm">
      <WalletIcon className="mr-2 h-4 w-4" />
      Connect with OCID
    </Button>
  );
};

export default LoginButton;
