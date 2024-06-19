import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetOverlay,
  SheetTrigger,
} from "../ui/Sheet";
import { Separator } from "../ui/Seperator";
import { Icons } from "../ui/Icons";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function MobileNav({ display }: { display: boolean }) {
  return (
    <nav className="md:hidden mt-1 ">
      <Sheet>
        <SheetTrigger className=" align-middle">
          <Icons.menu fill="#ffffff" />
        </SheetTrigger>
        <SheetOverlay className="fixed inset-0 z-40 bg-transparent">
          {/* <SheetContent className="flex flex-col gap-6 md:hidden bg-white w-[250px]"> */}
          <SheetContent className="flex flex-col gap-6 md:hidden bg-black w-[250px] ">
            <SheetDescription>
              <div>
                <div className="pb-4">
                  <Icons.WordsAndString width={52} />
                </div>
                {/* <Separator className="border border-gray-50 my-4" /> */}
                <SheetClose>
                  {/* <NavItems /> */}
                  <ul className=" md:flex-between flex w-full flex-col items-start gap-5 md:flex-row text-white pt-4 text-3xl antialiased">
                    <li className="hover:text-wasprimary">
                      <Link href="/">
                        <SheetClose>Home</SheetClose>
                      </Link>
                    </li>
                    <li className="hover:text-wasprimary">
                      <SignedIn>
                        <Link href="/profile">
                          <SheetClose>My Tickets</SheetClose>
                        </Link>
                      </SignedIn>

                      <SignedOut>
                        <Link href="/sign-in">
                          <SheetClose>My Tickets</SheetClose>
                        </Link>
                      </SignedOut>
                    </li>

                    <Separator className="border border-gray-600 w-full" />

                    <li className="hover:text-wasprimary">
                      <Link href="/about">
                        <SheetClose>About Us</SheetClose>
                      </Link>
                    </li>
                    <li className="hover:text-wasprimary">
                      <Link href="/contact">
                        <SheetClose>Contact</SheetClose>
                      </Link>
                    </li>
                    {display ? (
                      <>
                        <li className="mt-4 p-2 text-xs bg-white rounded text-black  content-center items-center">
                          Organizers control
                        </li>
                        <li className="rounded-full text-sky-500  whitespace-nowrap font-bold text-[20px] ">
                          <Link
                            href="/events/create"
                            className=" cursor-pointer"
                          >
                            {">"} Create Event
                          </Link>
                        </li>
                      </>
                    ) : null}
                  </ul>
                </SheetClose>
              </div>
            </SheetDescription>
          </SheetContent>
        </SheetOverlay>
      </Sheet>
    </nav>
  );
}
