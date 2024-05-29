import { IEvent } from "@/lib/mongodb/database/models/event.model";
import Link from "next/link";
import React from "react";
import TicketDeleteConfirmation from "./TicketDeleteConfirmation";
import { formatDateTime } from "@/lib/utils";
import TicketInformation from "./TicketInformation";
import { auth } from "@clerk/nextjs/server";
import { Icons } from "../ui/Icons";

async function TicketCard({ event }: { event: IEvent }) {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

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

      <div className=" absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
        <TicketDeleteConfirmation eventId={event._id} />
      </div>

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <p
          className={`p-medium-16 p-medium-18 text-gray-500 
      ${eventFinished ? "line-through text-gray-300" : null}
    `}
        >
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        {/* EVENT Finished */}

        {eventFinished ? (
          <p className="p-medium-16 p-medium-18 text-red-800 ">
            Event Finished 👏
          </p>
        ) : null}

        <TicketInformation
          event={event}
          userId={userId}
          eventFinished={eventFinished}
        />

        <div className="flex-between w-full ">
          <p className="p-medium-14 md:p-medium-16 text-gray-600">
            {event.organizer.firstName} <span>& </span>
            {event.organizer.lastName}
          </p>

          <Link
            href={`/orders?eventId=${event._id}`}
            className="text-primary-500 "
          >
            <Icons.arrow fill="#101010" width={10} height={10} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
