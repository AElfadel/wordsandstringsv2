import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware()

export const config = {
  
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
// publicRoutes: [
//   '/',
//   '/events/:id',
//   '/api/webhook/clerk',
//   '/api/uploadthing'
// ],
// ignoredRoutes: [
//   '/api/webhook/clerk',
//   '/api/webhook/stripe',
//   '/api/uploadthing'
// ]