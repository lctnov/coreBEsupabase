"use client";

import { createContext, useContext } from "react";
import { LayoutAuthContextType } from "./layout.type";
import { useLayoutAuthInternal } from "./layout.hook";

const LayoutAuthContext = createContext<LayoutAuthContextType | undefined>(
  undefined
);

export function LayoutAuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useLayoutAuthInternal();

  return (
    <LayoutAuthContext.Provider value={auth}>
      {children}
    </LayoutAuthContext.Provider>
  );
}

export function useLayoutAuth() {
  const context = useContext(LayoutAuthContext);
  if (!context) {
    throw new Error("useLayoutAuth must be used within LayoutAuthProvider");
  }
  return context;
}
