"use client";
import { SessionProvider, useSession } from "next-auth/react";
import Image from "next/image";
import React, { ReactNode } from "react";
import { Toaster } from "sonner";

interface ProviderProps {
  children: ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <>
      <SessionProvider>
        <Toaster />

        {children}
      </SessionProvider>
    </>
  );
};

export default Provider;
