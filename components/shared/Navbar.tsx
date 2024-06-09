"use client";

import Link from "next/link";
import { Button } from "../ui/Button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { Icons } from "../ui/Icons";

function Navbar() {
  const { user } = useUser();
  const userCheck = user?.emailAddresses[0].emailAddress as string;
  const display = userCheck === process.env.NEXT_PUBLIC_CRE_CHECK;

  return (
    <div className=" w-full bg-velvet-700  px-2 py-2">
      <div className="flex    justify-between px-3">
        <Link className="flex  " href="/">
          <Icons.WordsAndString width={45} />

          <p className="md:flex justify-center text-white items-center text-sm px-1 mt-2 -ml-2   hidden">
            Words & Strings
          </p>
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs ">
            <NavItems display={display} />
          </nav>
        </SignedIn>

        <div className="flex justify-end  mt-3 gap-3 text-center">
          <SignedOut>
            <Button asChild className="rounded-full" size="lg" variant="ghost">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
          <div className=" justify-center flex gap-3 ">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <MobileNav display={display} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
