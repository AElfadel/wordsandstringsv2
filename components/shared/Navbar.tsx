"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { Icons } from "../ui/Icons";
import { auth } from "@clerk/nextjs/server";

function Navbar() {
  return (
    <div className=" w-full bg-neutral-100 px-2 py-2">
      <div className="flex    justify-between px-3">
        <Link className="flex  " href="/">
          <Icons.WordsAndString />
          {/* <Image
            src="/was_logo.png"
            width="40"
            height="40"
            className=" object-contain"
            alt="Words and strings logo"
          /> */}
          <p className="md:flex justify-center items-center text-sm px-1 mt-2 -ml-2 text-black   hidden">
            Words & Strings
          </p>
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs ">
            <NavItems />
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
              <div />
            </SignedIn>
            <MobileNav />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
