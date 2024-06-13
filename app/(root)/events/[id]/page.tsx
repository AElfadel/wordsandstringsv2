import {
  getRelatedEventsByCategory,
  getEventById,
  getActiveEvents,
  eventTicketsStatus,
} from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import { Icons } from "@/components/ui/Icons";
import Collection from "@/components/shared/Collection";
import CheckoutButton from "@/components/shared/CheckoutButton";
import {
  checkUserAlreadyHasTicket,
  totalTickets,
} from "@/lib/actions/order.actions";
import { auth } from "@clerk/nextjs/server";

import RegisterToPerform from "@/components/shared/RegisterToPerform";
import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { performerSignedUpAlready } from "@/lib/actions/performer.actions";
import Link from "next/link";
import { userPermissions } from "@/lib/actions/user.actions";
import { IEvent } from "@/lib/mongodb/database/models/event.model";
import { Button } from "@/components/ui/Button";

async function page({ params: { id }, searchParams }: SearchParamProps) {
  const event = (await getEventById(id)) as IEvent;

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const ticketCheck = await checkUserAlreadyHasTicket({
    eventId: event._id,
    userId,
  });

  const perfomerCheck = await performerSignedUpAlready({
    eventId: event._id,
    userId: userId,
  });

  const performersRegistrationOpen = event?.performersReg;

  const SRE_CHECK = await userPermissions(userId);

  const relatedEvents = await getActiveEvents({
    limit: 3,
    page: searchParams.page as string,
  });

  const totalOrders = await totalTickets(event._id);

  const activeTickets = parseInt(totalOrders, 10);

  const ticketsControl = await eventTicketsStatus(event._id);

  return (
    <>
      <section className="flex justify-center ">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl bg-black text-coolBlack antialiased">
          <Image
            src={event.imageUrl}
            alt="hero image"
            width={1000}
            height={1000}
            className="h-fit md:h-full min-h-[300px] object-contain  md:object-cover object-center bg-transparent rounded-b-3xl md:rounded-none "
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10 bg-black text-white ">
            <div className=" gap-6">
              <h2 className="text-6xl font-bold flex flex-col">
                <span className="text-base ml-2">
                  {formatDateTime(event.startDateTime).dateOnly}
                </span>
                {event.title}
              </h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="h3-bold  py-2  text-wassecondary">
                    Ticket Price: {event.isFree ? "FREE" : `${event.price} QR`}
                  </p>
                </div>
              </div>
              {SRE_CHECK && (
                <div className=" p-medium-16 button flex gap-2">
                  <Button
                    asChild
                    className="rounded-full text-white h-[54px] p-semibold-20 w-full  sm:w-fit bg-blue-400 hover:bg-black"
                  >
                    <Link href={`/events/${id}/orders`}>Tickets control</Link>
                  </Button>
                  <Button
                    asChild
                    className="rounded-full text-white h-[54px] p-semibold-20 w-full  sm:w-fit bg-wassecondary hover:bg-wassecondary"
                  >
                    <Link href={`/events/${id}/orders`}>Performers List</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* EVENT DESCRIPTION*/}

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-100">About the event:</p>
              <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
              {/* <div className="flex gap-2 md:gap-3">
                <Icons.link fill="#ffffff" width={24} height={24} />
                <a
                  className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline"
                  href={event.url}
                >
                  Maps Location
                </a>
              </div> */}
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Icons.calendar fill="#25c0fb" width={32} height={32} />

                <div className="text-lg font-bold lg:p-regular-20 flex flex-wrap items-center gap-1">
                  <p>
                    {formatDateTime(event.startDateTime).timeOnly} -{" "}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                  <p className="">
                    {formatDateTime(event.startDateTime).dateOnly}
                  </p>
                </div>
              </div>

              <div className="p-regular-20 flex items-center  gap-3">
                <Icons.location fill="#25c0fb" width={32} height={32} />

                <a
                  className="text-lg truncate font-bold text-wasprimary underline"
                  href={event.url}
                >
                  {event.location}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              {/* PUT CHECKOUT HERE!*/}
              <CheckoutButton
                activeTickets={activeTickets}
                event={event}
                userId={userId}
                ticketCheck={ticketCheck}
                ticketsControl={ticketsControl?.eventTicketsState}
              />

              {perfomerCheck && performersRegistrationOpen ? null : (
                <RegisterToPerform id={id} />
              )}

              {perfomerCheck && (
                <div className="bg-slate-800 text-white rounded-md p-2 ">
                  Application to
                  <br /> perform sent
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS from the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold text-white">UPCOMING EVENTS</h2>

        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </>
  );
}

export default page;
