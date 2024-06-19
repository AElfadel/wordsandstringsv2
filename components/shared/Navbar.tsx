"use client";

import Link from "next/link";
import { Button } from "../ui/Button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { Icons } from "../ui/Icons";

function Navbar({ display }: { display: boolean }) {
  return (
    <div className=" w-full px-2 py-2">
      <div className="flex    justify-between px-3">
        <Link className="flex  " href="/">
          <Icons.WordsAndString width={45} />

          <p className="md:flex justify-center text-white items-center text-sm px-1 mt-2 -ml-2    hidden">
            Words & Strings
          </p>
        </Link>

        <nav className="md:flex-between hidden w-full max-w-xs  md:-ml-20">
          <NavItems display={display} />
        </nav>

        <div className="flex justify-end  mt-3 gap-3 text-center">
          <SignedOut>
            <Button
              asChild
              className="text-black bg-white rounded-full"
              size="lg"
              variant="ghost"
            >
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
