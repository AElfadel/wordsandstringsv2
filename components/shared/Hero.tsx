import React from "react";
import { Button } from "../ui/Button";
import Link from "next/link";
import Image from "next/image";

function Hero() {
  return (
    <section className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
      <div className="flex flex-col justify-center gap-8">
        <h1 className=" font-semibold text-4xl">
          Spoken Word & Poetry events in Qatar
        </h1>
        <p className="">
          Register to perform in our events or get your tickets to attend
        </p>
        <Button
          asChild
          className="button w-full text-white sm:w-fit"
          variant="default"
        >
          <Link href="#events">NEXT EVENT ON</Link>
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
