import { Separator } from "@/components/ui/Seperator";
import React from "react";

async function page() {
  return (
    <section className="pt-4 antialiased">
      <div className="pl-6 pr-4 w-full text-white">
        <h1 className="text-3xl h5-bold  py-4 "> About Words & Strings</h1>
        <Separator />
      </div>

      <img src="/stage3.jpeg" className="pt-4" />
      <p className="text-xs text-right text-neutral-400 italic p-2">
        Words & Strings event held in Georgetown University Qatar. Photo by
        Tariq Al Fatih, 2018
      </p>

      {/* &apos;` */}
      <div className="h-full my-8 text-white antialiased leading-loose px-6 text-[16px]  md:px-28">
        <div></div>
        <p className="">
          In 2014, five passionate young artists ignited a spark in
          Qatar&lsquo;s creative scene with Words & Strings (W&S). Frustrated by
          the lack of a consistent platform for spoken word, they built W&S to
          bridge the gap between talented artists and eager audiences. W&S is
          more than just a platform – its a thriving community where artists and
          art lovers can connect, share their voices, and celebrate the power of
          spoken word.
        </p>
        <h1 className="text-3xl h5-bold  py-4 "> Our VISION</h1>
        <p>
          Grow Qatar&lsquo;s creative scene by fostering a multicultural
          community of poets, spoken word artists, and musicians. Our events are
          more than performances – they&lsquo;re a celebration of creative
          writing and the literary arts. We&lsquo;re shining a light on
          Qatar&lsquo;s vibrant spoken word scene and showcasing the
          country&lsquo;s commitment to nurturing artistic talent, both locally
          and on the international stage.
        </p>
        <h1 className="text-3xl h5-bold  py-4 ">Our Mission</h1>

        <p>
          Foster a vibrant community of spoken word artists, poets, musicians,
          and art lovers. Empower them to connect, share their voices, and
          refine their talents through a thriving platform and enriching
          educational experiences. Words & Strings elevates the local arts scene
          and showcases Qatar&lsquo;s commitment to artistic growth on a global
          stage.
        </p>
      </div>
    </section>
  );
}

export default page;
