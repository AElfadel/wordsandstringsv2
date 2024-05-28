"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/Button";
import { IEvent } from "@/lib/mongodb/database/models/event.model";
import { createOrder } from "@/lib/actions/order.actions";
import { toast } from "react-hot-toast";
import { title } from "process";
import { useToast } from "../ui/Use-Toast";
import { useRouter } from "next/navigation";

async function onCheckout({
  event,
  userId,
}: {
  event: IEvent;
  userId: string;
}) {
  const amount = event.isFree ? "0" : event.price;

  const order = {
    eventId: event._id,
    buyerId: userId,
    totalAmount: amount,
    createdAt: new Date(),
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

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                onCheckout({ event, userId });
                toast({
                  title: "Ticket booked succesfully!",
                  description: "Navigate to profile to view your ticket",
                  variant: "default",
                });
                router.refresh();
              }}
              method="post"
            >
              {ticketCheck ? (
                <Link
                  className="inline-flex items-center justify-center whitespace-nowrap text-xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 sm:fit button px-4"
                  href="/profile"
                >
                  View My Ticket 🎫
                </Link>
              ) : (
                <Button
                  type="submit"
                  role="link"
                  size="lg"
                  className="button sm:w-fit"
                >
                  Book Ticket
                </Button>
              )}
            </form>
          </SignedIn>
        </>
      )}
    </div>
  );
}
