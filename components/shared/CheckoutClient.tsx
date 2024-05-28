"use client";

import { IEvent } from "@/lib/mongodb/database/models/event.model";
import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import Link from "next/link";
import {
  checkUserAlreadyHasTicket,
  createOrder,
} from "@/lib/actions/order.actions";
import { useQuery } from "@tanstack/react-query";

type CheckOutClientProps = {
  event: IEvent;
  userId: string;
  ticketCheck: boolean;
};

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

function CheckoutClient({ event, userId }: CheckOutClientProps) {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        onCheckout({ event, userId });
        window.location.reload(); // Refresh the page after booking a ticket
      }}
      method="post"
    ></form>
  );
}

export default CheckoutClient;
