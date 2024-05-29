"use client";
import React, { ReactNode, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";

export default function Provider({ children }: { children: ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
