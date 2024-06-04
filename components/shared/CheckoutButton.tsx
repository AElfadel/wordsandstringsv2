"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/Button";
import { IEvent } from "@/lib/mongodb/database/models/event.model";
import { createOrder } from "@/lib/actions/order.actions";
import { useToast } from "../ui/Use-Toast";
import { useRouter } from "next/navigation";
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
import { formatDateTime } from "@/lib/utils";
import { Separator } from "../ui/Seperator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

async function onCheckout({
  event,
  userId,
  value,
}: {
  event: IEvent;
  userId: string;
  value: string;
}) {
  const amount = event.isFree ? "0" : event.price;

  const order = {
    eventId: event._id,
    buyerId: userId,
    totalAmount: amount,
    createdAt: new Date(),
    ticketQuantity: value,
  };

  await createOrder(order);
}

export default function CheckoutButton({
  event,
  userId,
  ticketCheck,
}: {
  event: IEvent;
  userId: string;
  ticketCheck: boolean;
}) {
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  const { toast } = useToast();
  const router = useRouter();
  const [value, setValue] = useState("1");
  const eventDate = formatDateTime(event.startDateTime).dateOnly;
  const eventstartTime = formatDateTime(event.startDateTime).timeOnly;
  const eventEndTime = formatDateTime(event.endDateTime).timeOnly;

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full  p-4" size="lg">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            {ticketCheck ? (
              <Link
                className="inline-flex items-center justify-center whitespace-nowrap text-xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 sm:fit button px-4"
                href="/profile"
              >
                View My Ticket 🎫
              </Link>
            ) : (
              <>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button className="button rounded-full  p-4" size="lg">
                      GET TICKETS 🎟️
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-center ">
                        <div className="flex flex-col">
                          {event.title}
                          <br />
                          <p className="text-sm font-thin">
                            {eventDate} {eventstartTime} - {eventEndTime}
                          </p>
                          <Separator />
                        </div>
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-black flex justify-between">
                        <div className="font-semibold">
                          <p>GENERAL ADMISSION</p>
                          {event.price === "0" ? (
                            <p>FREE</p>
                          ) : (
                            <p className="font-thin pr-2">
                              {" "}
                              Tickets are {event.price} QR each. Payment must be
                              made in cash at the venue entrance.
                            </p>
                          )}
                        </div>

                        <Select value={value} onValueChange={setValue}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Tickets" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                          </SelectContent>
                        </Select>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        await onCheckout({ event, userId, value });
                        toast({
                          title: "Ticket booked successfully!",
                          description:
                            "Navigate to profile to view your ticket",
                          variant: "success",
                        });
                        router.refresh();
                      }}
                      method="post"
                    >
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>
                          <button type="submit" role="link">
                            Book Ticket
                          </button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </form>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </SignedIn>
        </>
      )}
    </div>
  );
}
