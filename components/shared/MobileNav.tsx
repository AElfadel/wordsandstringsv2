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

export default function MobileNav({ display }: { display: boolean }) {
  return (
    <nav className="md:hidden mt-1 ">
      <Sheet>
        <SheetTrigger className=" align-middle">
          <Icons.menu fill="#ffffff" />
        </SheetTrigger>
        <SheetOverlay className="fixed inset-0 z-40 bg-transparent">
          <SheetContent className="flex flex-col gap-6 md:hidden bg-white w-[250px]">
            <SheetDescription>
              <div className="">
                <Icons.WordsAndString width={42} />
                <Separator className="border border-gray-50 my-4" />
                <SheetClose>
                  {/* <NavItems /> */}
                  <ul className=" md:flex-between flex w-full flex-col items-start gap-5 md:flex-row text-neutral-600">
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
                    <li className="hover:text-wasprimary">
                      <Link href="/about">
                        <SheetClose>About Us</SheetClose>
                      </Link>
                    </li>
                    {display && (
                      <>
                        <li className="pt-4 text-xs"> Organizers control:</li>
                        <li className="rounded-full text-sky-500  whitespace-nowrap font-bold  text-sm ">
                          <Link
                            href="/events/create"
                            className=" cursor-pointer"
                          >
                            Create Event
                          </Link>
                        </li>
                      </>
                    )}
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
