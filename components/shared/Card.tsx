import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "@/components/ui/Icons";
import { auth } from "@clerk/nextjs/server";
import DeleteConfirmation from "./DeleteConfirmation";
import TicketDeleteConfirmation from "./TicketDeleteConfirmation";
import TicketInformation from "./TicketInformation";

import { IEvent } from "@/lib/mongodb/database/models/event.model";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
};

function Card({ event, hasOrderLink }: CardProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  const eventFinished = new Date(event.endDateTime) < new Date();

  const performersRegistrationOpen = event.performersReg;

  return (
    <div
      className={`group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl shadow-md transition-all hover:shadow-lg md:min-h-[438px] ${eventFinished ? " bg-gradient-to-b to-neutral-900 from-neutral-800 text-white" : "bg-white"}`}
    >
      <Link
        href={`/events/${event._id}`}
        style={{
          backgroundImage: `url(${event.imageUrl})`,
          filter: eventFinished ? "grayscale(70%)" : "none",
        }}
        className={`flex-center flex-grow bg-cover bg-center text-grey-500`}
      />
      {/*IS EVENT CREATOR  ..?*/}
      {isEventCreator ? (
        <div className=" absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <Icons.edit fill="#101010" height={20} width={20} />
          </Link>
          <DeleteConfirmation eventId={event._id} imageUrl={event.imageUrl} />
        </div>
      ) : null}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <div className="flex gap-2">
          {eventFinished ? null : (
            <span
              className={`p-semibold-14 w-fit rounded-full bg-wassecondary px-4 py-1  line-clamp-1 ${
                eventFinished ? "bg-gray-100 text-black" : "text-white"
              }`}
            >
              {event.isFree ? "FREE" : `${event.price} QR`}
            </span>
          )}
          <p className="p-semibold-14  rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1 w-fit ">
            {event.category.name}
          </p>
        </div>

        {/* EVENT DATE OR EVENT Finished */}

        {eventFinished ? null : (
          <p
            className="p-medium-16 p-medium-18 text-gray-500 
     
   "
          >
            {formatDateTime(event.startDateTime).dateTime}
          </p>
        )}

        <Link href={`/events/${event._id}`}>
          <p
            className={`p-bold-24  line-clamp-2 flex-1 ${eventFinished ? "text-white" : "text-black"}`}
          >
            {event.title}
          </p>
        </Link>

        {/*EVENT VENUE */}
        <p
          className={`p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black ${eventFinished ? "text-neutral-300 " : ""}`}
        >
          {event.location}
        </p>

        {eventFinished ? (
          <p className=" text-wassecondary  font-bold">
            Event Concluded on {formatDateTime(event.startDateTime).dateOnly}
          </p>
        ) : null}

        {/*PERFORMERS REGISTRATION */}
        <div className="flex-between w-full ">
          {performersRegistrationOpen && !eventFinished ? (
            <a href={`/events/${event._id}`}>
              <div className="p-medium-14 flex gap-1 bg-wasprimary/20 text-sky-500 rounded-lg  align-middle content-center text-center px-1">
                <p> Performers Registration is OPEN!</p>
              </div>
            </a>
          ) : null}

          {hasOrderLink ? (
            <Link
              href={`/orders?eventId=${event._id}`}
              className="text-primary-500 "
            >
              <Icons.arrow fill="#101010" width={10} height={10} />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Card;
