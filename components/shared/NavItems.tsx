"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavItems() {
  const pathname = usePathname();

  const navbarLinks = [
    {
      route: "/",
      label: "Home",
    },

    { route: "/about", label: "About Us" },
    { route: "/profile", label: "My Tickets" },
    { route: "events/create", label: "Create Event" },
  ];

  return (
    <ul className=" md:flex-between flex w-full flex-col items-start gap-5 md:flex-row text-neutral-600">
      {navbarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-sky-700"
            } flex-center p-medium-16 whitespace-nowrap hover:text-red-700 `}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavItems;
