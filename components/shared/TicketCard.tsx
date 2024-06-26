import { IEvent } from "@/lib/mongodb/database/models/event.model";
import Link from "next/link";
import React from "react";
import TicketDeleteConfirmation from "./TicketDeleteConfirmation";
import { formatDateTime } from "@/lib/utils";
import TicketInformation from "./TicketInformation";
import { auth } from "@clerk/nextjs/server";
import { Icons } from "../ui/Icons";
import { getOrder } from "@/lib/actions/order.actions";
import { TicketCheck } from "lucide-react";

async function TicketCard({ event }: { event: IEvent }) {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const eventFinished = new Date(event.endDateTime) < new Date();

  const eventDay =
    new Date(event.startDateTime).getDate() === new Date().getDate();

  const order = await getOrder({ userId, eventId: event._id });

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

      {/* <div className=" absolute right-2 top-8 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
        <Link href={`/events/${event._id}`} className="flex text-sm">
          Go to event page
          <Icons.link fill="#101010" height={20} width={20} />
        </Link>
      </div> */}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        <div
          className={` text-black font-mono flex items-center gap-2 font-bold
      ${eventFinished ? "line-through text-gray-300" : null}
    `}
        >
          {eventDay ? <p>TODAY!</p> : null}
          <TicketCheck className="w-6 h-6" /> {event.title}
        </div>

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
          order={order}
        />

        <div className="">
          {/* <Link href={`/orders?eventId=${event._id}`}> */}
          <div className="text-red-500 flex justify-end gap-2 text-sm font-mono text-right w-full">
            <TicketDeleteConfirmation eventId={event._id} userId={userId} />

            <Icons.delete fill="#FF5050" width={20} height={20} />
          </div>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default TicketCard;
