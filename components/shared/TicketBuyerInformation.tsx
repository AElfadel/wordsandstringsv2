import { IEvent } from "@/lib/mongodb/database/models/event.model";
import { IOrder } from "@/lib/mongodb/database/models/order.model";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Icons } from "../ui/Icons";

function TicketBuyerInformation({
  order,
  event,
}: {
  order: IOrder;
  event: IEvent;
}) {
  const eventDate = formatDateTime(event.startDateTime).dateOnly;
  const eventTime = formatDateTime(event.startDateTime).timeOnly;

  return (
    <div>
      <div className="flex ">
        <ul
          key={order.id}
          className="flex flex-col gap-2 text-lg text-left pl-1"
        >
          <li className="">
            <p>General Admission</p>
          </li>
          <li>
            <p className="pl-1"> 1 Ticket</p>
          </li>
          <li className="flex flex-col">
            <p>
              {order.buyer.firstName} {order.buyer.lastName}
            </p>
          </li>

          <li>
            <p className="text-sm">Event Date</p>
            <p className="">{eventDate}</p>
          </li>
          <li>
            <p className="text-sm">Event Start</p>
            <p className=" ">{eventTime}</p>
          </li>
          <li>
            <p className="text-sm">Location</p>
            <a className="underline italic text-wasprimary" href={event.url}>
              {event.location}
            </a>
            <br />
          </li>
        </ul>
        <div className="">
          <Image
            src={event.imageUrl}
            className="content-center align-middle border-3 border-dotted"
            alt="event image"
            width={200}
            height={200}
          />
          <div className="w-full text-black text-start pt-2">
            <p className="font-bold text-lg">
              Price: {order.totalAmount + " QR"}
            </p>
            <p className="font-bold">Cash - Paid at the venue entrance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketBuyerInformation;
