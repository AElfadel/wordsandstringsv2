import React from "react";
import { Button } from "../ui/Button";
import Link from "next/link";
import Image from "next/image";

function Hero() {
  return (
    <section className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0 antialiased">
      <div className="flex flex-col justify-center gap-8">
        <h1 className=" font-semibold text-4xl ">
          Home of poetry <br /> in Qatar since 2014
        </h1>

        <ul className="flex flex-col gap-3 text-2xl ">
          <li className="font-bold">Book your ticket for our next event</li>
          <li>
            <span className="font-bold">Are you a poet or an artist?</span>{" "}
            apply to perform in in our next event
          </li>
        </ul>
        <Button
          asChild
          className="rounded-full h-[54px] p-semibold-20 w-full text-white sm:w-fit "
          variant="default"
        >
          <Link href="#events">NEXT EVENT</Link>
        </Button>
      </div>
      <Image
        src="/assets/images/hero_jan_24_trans.webp"
        width={1000}
        height={1000}
        alt="Event hero"
        className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
      />
    </section>
  );
}

export default Hero;
