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
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        style={{
          backgroundImage: `url(${event.imageUrl})`,
          filter: eventFinished ? "grayscale(100%)" : "none",
        }}
        className={`flex-center flex-grow bg-cover bg-center text-grey-500 ${
          eventFinished ? "bg-gray-50" : ""
        }`}
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
          <span
            className={`p-semibold-14 w-fit rounded-full bg-wassecondary px-4 py-1  line-clamp-1 ${
              eventFinished ? "bg-gray-100 text-black" : "text-white"
            }`}
          >
            {event.isFree ? "FREE" : `${event.price} QR`}
          </span>
          <p className="p-semibold-14  rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1 w-fit ">
            {event.category.name}
          </p>
        </div>

        {/* EVENT DATE OR EVENT Finished */}

        {eventFinished ? (
          <p className="p-medium-16 p-medium-18 text-red-800 ">
            Event Finished 👏
          </p>
        ) : (
          <p
            className="p-medium-16 p-medium-18 text-gray-500 
     
   "
          >
            {formatDateTime(event.startDateTime).dateTime}
          </p>
        )}

        <Link href={`/events/${event._id}`}>
          <p className="p-bold-24  line-clamp-2 flex-1 text-black">
            {event.title}
          </p>
        </Link>

        {/*EVENT VENUE */}
        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
          {event.location}
        </p>

        {/*PERFORMERS REGISTRATION */}
        <div className="flex-between w-full ">
          <a href={`/events/${event._id}`}>
            <div className="p-medium-14 flex gap-1 text-gray-600  align-middle content-center text-center">
              Performers Registration is
              {performersRegistrationOpen ? (
                <p>
                  <span className="bg-wasprimary/20 text-wasprimary rounded-lg px-0.5 ">
                    OPEN!
                  </span>
                </p>
              ) : (
                <p>FULL</p>
              )}
            </div>
          </a>

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
