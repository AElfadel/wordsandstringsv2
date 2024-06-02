import { createRouteHandler } from "uploadthing/next";
import { UTApi } from "uploadthing/server";
 
 
import { ourFileRouter } from "./core";
 
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
 
  // Apply an (optional) custom config:
  // config: { ... },
});

export const utapi = new UTApi();
