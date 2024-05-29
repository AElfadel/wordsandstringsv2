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
  hidePrice?: boolean;
};

//This component for the TICKETS => Gets passed down an event, as previously we've mapped through every event ordered (user) by the user.

function Card({ event, hasOrderLink, hidePrice }: CardProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  const eventFinished = new Date(event.endDateTime) < new Date();

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
      {isEventCreator && (
        <div className=" absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <Icons.edit fill="#101010" height={20} width={20} />
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <div className="flex gap-2">
          <span
            className={`p-semibold-14 w-fit rounded-full bg-green-100 px-4 py-1  line-clamp-1 ${
              eventFinished ? "bg-gray-100 text-black" : "text-green-600"
            }`}
          >
            {event.isFree ? "FREE" : `${event.price} QR`}
          </span>
          <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
            {event.category.name}
          </p>
        </div>

        <p
          className={`p-medium-16 p-medium-18 text-gray-500 
          ${eventFinished ? "line-through text-gray-300" : null}
        `}
        >
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        <Link href={`/events/${event._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {event.title}
          </p>
        </Link>

        {/* EVENT Finished */}
        {eventFinished ? (
          <p className="p-medium-16 p-medium-18 text-red-800 ">
            Event Finished 👏
          </p>
        ) : null}

        <div className="flex-between w-full ">
          <p className="p-medium-14 md:p-medium-16 text-gray-600">
            {event.organizer.firstName} <span>& </span>
            {event.organizer.lastName}
          </p>

          {hasOrderLink && (
            <Link
              href={`/orders?eventId=${event._id}`}
              className="text-primary-500 "
            >
              <Icons.arrow fill="#101010" width={10} height={10} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
