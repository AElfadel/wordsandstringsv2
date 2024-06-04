"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/AlertDialog";
import { Icons } from "../ui/Icons";
import { IEvent } from "@/lib/mongodb/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { IOrder } from "@/lib/mongodb/database/models/order.model";
import TicketBuyerInformation from "./TicketBuyerInformation";

export default function TicketInformation({
  event,
  eventFinished,
  order,
}: {
  event: IEvent;
  userId: string;
  eventFinished: boolean;
  order: IOrder;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex w-full bg-gray-50 content-center p-4 gap-4">
          <div className="flex flex-col justify-center items-start">
            <div className="justify-center mx-auto">
              <Icons.barCode width={55} />
            </div>

            <p className="font-mono text-sm capitalize line-clamp-2  text-black mt-2">
              {formatDateTime(event.startDateTime).dateOnly}
            </p>
          </div>
          <div
            className={`text-black text-[12px] font-mono flex flex-col justify-center gap-2 text-left ${
              eventFinished ? "line-through text-gray-300" : ""
            }`}
          >
            <div className="line-clamp-1 flex gap-2">{event.location}</div>

            <div className=" line-clamp-1">
              <span className="">
                {formatDateTime(event.startDateTime).timeOnly}
              </span>{" "}
              - <span>{formatDateTime(event.endDateTime).timeOnly}</span>
            </div>

            <span className="text-[10px] hover:text-blue-500 cursor-pointer italic">
              click to view ticket
            </span>
          </div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Ticket Information</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            <div className="bg-gray-50  outline-dashed outline-4 outline-gray-200">
              <TicketBuyerInformation order={order} event={event} />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction
            className="bg-black"
            onClick={function startTransition() {}}
          >
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
