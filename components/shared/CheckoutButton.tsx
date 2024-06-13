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

import { Input } from "../ui/Input";

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
  activeTickets,
  ticketsControl,
}: {
  event: IEvent;
  userId: string;
  ticketCheck: boolean;
  activeTickets: number;
  ticketsControl: {
    ticketsRegistration: boolean;
  };
}) {
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  const ticketsLimit = event.numberOfTickets;
  const { toast } = useToast();
  const router = useRouter();
  const [value, setValue] = useState("1");
  const eventDate = formatDateTime(event.startDateTime).dateOnly;
  const eventstartTime = formatDateTime(event.startDateTime).timeOnly;
  const eventEndTime = formatDateTime(event.endDateTime).timeOnly;
  const eventSoldout = activeTickets >= ticketsLimit;

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished || eventSoldout ? (
        <p className="p-2 text-red-400">Event tickets sold out!</p>
      ) : (
        <>
          <SignedOut>
            <Button
              asChild
              className="button rounded-full  p-4 bg-white text-black"
              size="lg"
            >
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
                {ticketsControl ? (
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button
                        className="font-bold text-xl  hover:text-white rounded-full h-[54px]   bg-white text-black   p-6 hover:bg-primary/60"
                        size="lg"
                      >
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
                        <AlertDialogDescription className="text-black flex flex-col gap-2 justify-between">
                          <div className="flex ">
                            <p className="font-semibold w-[190px] text-left text-sm items-center content-center ">
                              Mobile Number
                            </p>
                            <Input
                              placeholder="ex. 55123456"
                              className=" flex-2  "
                            />
                          </div>

                          <div className="flex">
                            <p className="text-left text-sm font-semibold w-[190px] items-center content-center">
                              GENERAL
                              <br />
                              ADMISSION
                            </p>

                            <Select value={value} onValueChange={setValue}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Tickets" />
                              </SelectTrigger>
                              <SelectContent className="">
                                <SelectItem value="1">1 Ticket</SelectItem>
                                <SelectItem value="2">2 Ticket</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {event.price === "0" ? (
                            <p>FREE</p>
                          ) : (
                            <p className="font-thin pr-2 text-right">
                              Total Price:{" "}
                              <span className="font-bold text-lg">
                                {parseInt(value, 10) *
                                  parseInt(event.price, 10)}{" "}
                                QR total
                              </span>{" "}
                              <br />
                              Payment must be made in cash at the venue
                              entrance.
                            </p>
                          )}
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
                ) : (
                  <p className="text-center text-lg font-bold">
                    Sorry, tickets <br />
                    sold out!
                  </p>
                )}
              </>
            )}
          </SignedIn>
        </>
      )}
    </div>
  );
}
