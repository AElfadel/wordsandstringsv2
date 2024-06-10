import Hero from "../../components/shared/Hero";
import Collection from "@/components/shared/Collection";
import {
  getActiveEvents,
  getFinishedEvents,
} from "@/lib/actions/event.actions";

export default async function Home() {
  const activeEvents = await getActiveEvents({
    query: "",
    page: "1",
    category: "",
    limit: 6,
  });

  const finishedEvents = await getFinishedEvents({
    query: "",
    page: "1",
    category: "",
    limit: 10,
  });

  return (
    <section className=" bg-gradient-to-bl  from-neutral-600 to-black text-neutral-100 bg-contain py-5 md:py-10">
      <Hero />
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="font-semibold text-xl">
          Register to attend in our upcoming event
        </h2>
        {/* <div className="flex w-full gap-5 md:flex-row">
          Search Cateogry Filter
        </div> */}

        <Collection
          data={activeEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="font-semibold text-xl">Previous chapters</h2>

        <Collection
          data={finishedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </section>
  );
}
