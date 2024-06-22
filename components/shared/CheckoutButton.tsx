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
import { CheckCheck, Flame } from "lucide-react";

async function onCheckout({
  event,
  userId,
  value,
  phoneNumber,
}: {
  event: IEvent;
  userId: string;
  value: string;
  phoneNumber: string;
}) {
  const amount = event.isFree ? "0" : event.price;

  const order = {
    eventId: event._id,
    buyerId: userId,
    totalAmount: amount,
    createdAt: new Date(),
    ticketQuantity: value,
    phoneNumber,
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
  const freeEvent = event.price === "";

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value;
    setPhoneNumber(phoneNumber);
    setIsButtonDisabled(phoneNumber.length < 8);
  };

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished || eventSoldout ? (
        <div className="flex  text-lg font-bold gap-2 items-center">
          <CheckCheck className="w-6 h-6" />
          <p className="p-2">Event tickets sold out!</p>
        </div>
      ) : (
        <>
          <SignedOut>
            <Button
              asChild
              className="font-bold text-lg hover:text-white rounded-full h-[54px]   bg-white text-black   p-6 hover:bg-black/60"
            >
              <Link href="/sign-in"> GET TICKETS 🎟️</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            {ticketCheck ? (
              <Link
                className="rounded-2xl text-white antialiased bg-wassecondary text-2xl p-3 font-bold"
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
                        className="font-bold text-lg  hover:text-white rounded-full h-[54px]   bg-white text-black   p-6 hover:bg-primary/60"
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
                              type="number"
                              className=" flex-2  "
                              value={phoneNumber}
                              onChange={handlePhoneNumberChange}
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
                          {event.price === "0" || " " ? null : (
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

                          await onCheckout({
                            event,
                            userId,
                            value,
                            phoneNumber,
                          });
                          toast({
                            title: "Ticket booked successfully!",
                            description: `Navigate to My Tickets section to view your ticket`,
                            variant: "success",
                          });
                          router.refresh();
                        }}
                        method="post"
                      >
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            disabled={isButtonDisabled}
                            className="disabled:bg-neutral-300 disabled:text-white"
                          >
                            <button type="submit" role="link">
                              Book Ticket
                            </button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </form>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <div className="flex gap-2 text-center text-lg font-bold">
                    <Flame className="w-6 h-6" />

                    <p className=""> Sorry, tickets sold out!</p>
                  </div>
                )}
              </>
            )}
          </SignedIn>
        </>
      )}
    </div>
  );
}
