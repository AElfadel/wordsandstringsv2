import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetOverlay,
  SheetTrigger,
} from "../ui/Sheet";
import { Separator } from "../ui/Seperator";
import { Icons } from "../ui/Icons";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default function MobileNav() {
  const { sessionClaims } = auth();

  return (
    <nav className="md:hidden mt-1 ">
      <Sheet>
        <SheetTrigger className=" align-middle">
          <Icons.menu />
        </SheetTrigger>
        <SheetOverlay className="fixed inset-0 z-40 bg-transparent">
          <SheetContent className="flex flex-col gap-6 md:hidden bg-white w-[250px]">
            <Icons.WordsAndString />
            <Separator className="border border-gray-50 -mt-3" />
            <SheetClose>
              {/* <NavItems /> */}
              <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row text-neutral-600">
                <li className="hover:text-wasprimary">
                  <Link href="/">
                    <SheetClose>Home</SheetClose>
                  </Link>
                </li>
                <li className="hover:text-wasprimary">
                  <Link href="/profile">
                    <SheetClose>My Tickets</SheetClose>
                  </Link>
                </li>
              </ul>
            </SheetClose>
          </SheetContent>
        </SheetOverlay>
      </Sheet>
    </nav>
  );
}
