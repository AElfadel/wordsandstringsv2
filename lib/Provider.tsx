"use client";
import React, { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import { ourFileRouter } from "@/app/api/uploadthing/core";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <NextSSRPlugin
        /**
         * The `extractRouterConfig` will extract **only** the route configs
         * from the router to prevent additional information from being
         * leaked to the client. The data passed to the client is the same
         * as if you were to fetch `/api/uploadthing` directly.
         */
        routerConfig={extractRouterConfig(ourFileRouter)}
      />
      {children}
      <ProgressBar
        color="#25c0fb"
        height="2px"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </ClerkProvider>
  );
}
