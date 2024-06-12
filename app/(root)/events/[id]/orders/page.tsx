import Search from "@/components/shared/Search";
import { Switch } from "@/components/ui/Switch";
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

  const eventStatus = (await eventTicketsStatus(eventId)) as boolean;

  return (
    <>
      <Link
        href={`/events/${eventId}`}
        className="text-white rounded-full p-medium-16 h-[54px] bg-transparent hover:bg-none  justify-start w-full p-4"
      >
        ← Return to event
      </Link>

      <section className=" bg-wassecondary bg-dotted-pattern bg-cover bg-center py-5 md:py-10 flex  gap-2">
        <h3 className="wrapper h3-bold text-center sm:text-left text-white  ">
          Event Tickets
        </h3>
      </section>

      <section className="wrapper mt-2">
        <Search placeholder="Search buyer name..." />
      </section>

      <p className="text-2xl  text-white text-right px-6">
        Total Sold Tickets: {ticketSales}
      </p>

      <section className="wrapper text-white">
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
                  <td colSpan={4} className="py-4 text-center text-black">
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
            <div className="py-4 text-center text-gray-500 ">
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
    </>
  );
};

export default Orders;
