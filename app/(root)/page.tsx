import Hero from "../components/shared/Hero";

export default function Home() {
  return (
    <section className=" bg-gradient-to-bl  from-neutral-600 to-black text-neutral-100 bg-contain py-5 md:py-10">
      <Hero />
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="font-semibold text-xl">
          Home of poetry <br /> in Qatar since 2014
        </h2>
        <div className="flex w-full gap-5 md:flex-row">
          Search Cateogry Filter
        </div>
      </section>
    </section>
  );
}
