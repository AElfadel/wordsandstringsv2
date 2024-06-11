import React from "react";
import Card from "./Card";
import TicketCard from "./TicketCard";
import { IEvent } from "@/lib/mongodb/database/models/event.model";
import { IOrder } from "@/lib/mongodb/database/models/order.model";

type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
  orders?: IOrder[];
};

//This component for the tickets. Gets passed down all the orders in the form of an array each containing order.event .. here called "data"

function Collection({
  data,
  emptyTitle,
  emptyStateSubtext,
  collectionType,
  orders,
  urlParamName,
  page,
  totalPages = 0,
}: CollectionProps) {
  return (
    //  TICKET OWNER VIEW
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          {collectionType === "My_Tickets" ? (
            <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
              {data.map((event) => {
                return (
                  <li key={event._id} className="flex justify-center">
                    <TicketCard event={event} />
                  </li>
                );
              })}
            </ul>
          ) : (
            //  Organizer and Guest View
            <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
              {data.map((event) => {
                const hasOrderLink = collectionType === "Events_Organized";
                return (
                  <li key={event._id} className="flex justify-center">
                    <Card event={event} hasOrderLink={hasOrderLink} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] text-black flex-col w-full gap-3 rounded-[14px] bg-gray-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
}

export default Collection;
