import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/Button";

import ToggleTicketsStatus from "@/components/ui/ToggleTicketsStatus";
import {
  eventTicketsStatus,
  toggleTicketsRegistration,
} from "@/lib/actions/event.actions";
import { getOrdersByEvent, totalTickets } from "@/lib/actions/order.actions";
import { IOrderItem } from "@/lib/mongodb/database/models/order.model";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Link from "next/link";

const Orders = async ({ searchParams, params }: SearchParamProps) => {
  const eventId = params.id;
  const searchText = (searchParams?.query as string) || "";

  const orders = await getOrdersByEvent({ eventId, searchString: searchText });

  const ticketSales = await totalTickets(eventId);

  const eventStatus = await Object(eventTicketsStatus(eventId));

  return (
    <div>
      <Button
        variant="ghost"
        className="w-fit text-left justify-start p-4 m-4"
        asChild
      >
        <Link
          href={`/events/${eventId}`}
          className="text-white rounded-full  p-medium-16 h-[54px]  w-fit  "
        >
          ← Return to event
        </Link>
      </Button>

      <ToggleTicketsStatus eventStatus={eventStatus} eventId={eventId} />

      <section className="bg-neutral-200">
        <div className="wrapper -mb-6">
          <Search placeholder="Search buyer name..." />
          <p className="text-2xl py-4 text-black text-right px-6 md:pr-12">
            Total Sold Tickets: {ticketSales}
          </p>
        </div>

        <section className="wrapper text-black ">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto  bg-white rounded-md">
            <table className="w-full border-collapse border-t   bg-white">
              <thead>
                <tr className="p-medium-14 border-b bg-neutral-200 text-neutral-700">
                  <th className="min-w-[250px] py-3 text-left px-2">Buyer</th>
                  <th className="min-w-[200px] py-3  pr-4  text-left">
                    Event Title
                  </th>
                  <th className="min-w-[100px] py-3  text-left">Created</th>
                  <th className="min-w-[100px] py-3 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.length === 0 ? (
                  <tr className="border-b text-black">
                    <td colSpan={4} className="py-4 text-center  text-black">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders &&
                  orders.map((row: IOrderItem) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b text-black bg-white"
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[250px] py-4 text-black font-semibold px-2">
                        {row.buyer}
                      </td>
                      <td className="min-w-[200px] py-4 pr-4">
                        {row.eventTitle}
                      </td>
                      <td className="min-w-[100px] py-4">
                        {formatDateTime(row.createdAt).dateTime}
                      </td>
                      <td className="min-w-[100px] py-4 px-2 text-right">
                        {formatPrice(row.totalAmount)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {orders && orders.length === 0 ? (
              <div className="py-4 text-center text-black rounded-lg bg-white ">
                No orders found.
              </div>
            ) : (
              orders &&
              orders.map((row: IOrderItem) => (
                <div
                  key={row._id}
                  className="border rounded-lg p-4 mb-4 text-black bg-white "
                  style={{ boxSizing: "border-box" }}
                >
                  <div className="mb-2">
                    <span className="font-bold text-primary-500">Buyer: </span>
                    {row.buyer}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold ">Event Title: </span>
                    {row.eventTitle}
                  </div>
                  <div className="mb-2">
                    <span className="font-bold ">Created: </span>
                    {formatDateTime(row.createdAt).dateTime}
                  </div>
                  <div className="text-right ">
                    <span className="font-bold text-wasprimary">Amount: </span>
                    {formatPrice(row.totalAmount)}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Orders;
