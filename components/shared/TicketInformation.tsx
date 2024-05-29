"use client";

import { useTransition } from "react";
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

export default function TicketInformation({
  event,
  userId,
  eventFinished,
}: {
  event: IEvent;
  userId: string;
  eventFinished: boolean;
}) {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="flex bg-gray-50 content-center p-4 gap-4">
            <div className="flex flex-col justify-center items-start">
              <div className="w-fit justify-center mx-auto">
                <Icons.barCode width={55} />
              </div>
              <p className="font-mono text-sm capitalize line-clamp-2 text-black mt-2">
                {event.title}
              </p>
            </div>
            <div
              className={`text-black text-sm font-mono flex flex-col justify-center gap-2 ${
                eventFinished ? "line-through text-gray-300" : ""
              }`}
            >
              <span>{formatDateTime(event.startDateTime).dateTime}</span>
              <span className="text-xs hover:text-blue-500 cursor-pointer">
                click here to view your ticket
              </span>
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Ticket Information</AlertDialogTitle>
            <AlertDialogDescription className="p-regular-16 text-grey-600">
              <div className="bg-gray-50  outline-dashed outline-4 outline-gray-200">
                {event.title}
                <p>Ticket for {}</p>
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
    </div>
  );
}
