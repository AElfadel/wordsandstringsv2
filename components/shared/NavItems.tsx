"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavItems({ display }: { display: boolean }) {
  const pathname = usePathname();

  const navbarLinks = [
    {
      route: "/",
      label: "Home",
    },

    { route: "/about", label: "About Us" },
    { route: "/profile", label: "My Tickets" },
  ];

  return (
    <ul className=" md:flex-between flex w-full flex-col items-start gap-5 md:flex-row text-neutral-300 antialiased">
      {navbarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-sky-500"
            } flex-center p-medium-16 whitespace-nowrap hover:text-red-700 `}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
      {display && (
        <li
          className="bg-sky-500 rounded-full text-white  whitespace-nowrap p-2 text-sm hover:bg-black"
          // {`${
          //   pathname === "/events/create" && "text-sky-700"
          // } flex-center p-medium-16 whitespace-nowrap hover:text-red-700 `}
        >
          <Link href="/events/create">Create Event</Link>
        </li>
      )}
    </ul>
  );
}

export default NavItems;
