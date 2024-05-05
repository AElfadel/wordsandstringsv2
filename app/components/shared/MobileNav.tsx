import Image from "next/image";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
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
import { usePathname } from "next/navigation";

function MobileNav() {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className=" align-middle">
          <Image
            src="assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer mt-1"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 md:hidden bg-white w-[250px]">
          <Image src="/was_logo.png" alt="logo" height={35} width={35} />
          <Separator className="border border-gray-50 -mt-3" />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
}

export default MobileNav;
