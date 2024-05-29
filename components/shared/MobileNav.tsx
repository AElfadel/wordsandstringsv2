import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/Sheet";
import { Separator } from "../ui/Seperator";
import NavItems from "./NavItems";
import { Icons } from "../ui/Icons";

function MobileNav() {
  return (
    <nav className="md:hidden mt-1 ">
      <Sheet>
        <SheetTrigger className=" align-middle">
          <Icons.menu />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 md:hidden bg-white w-[250px]">
          <Icons.WordsAndString />
          <Separator className="border border-gray-50 -mt-3" />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
}

export default MobileNav;
