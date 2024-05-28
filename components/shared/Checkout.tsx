import { IEvent } from "@/lib/mongodb/database/models/event.model";
import React from "react";

async function Checkout({ event, userId }: { event: IEvent; userId: string }) {
  return <Checkout event={event} userId={userId} />;
}

export default Checkout;
