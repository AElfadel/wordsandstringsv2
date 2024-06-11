import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/Button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { userPermissions } from "@/lib/actions/user.actions";
import { IOrder } from "@/lib/mongodb/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

export default async function ProfilePage({ searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const organizedEvents = await getEventsByUser({ userId, page: 1 });
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  //Pagination
  const ordersPage = Number(searchParams?.ordersPage) || 1;

  //User tickts("orders")
  const orders = await getOrdersByUser({ userId, page: ordersPage });

  //Mapping over orders and extracting event object from each one to pass into the collection
  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

  const SRE_Check = await userPermissions(userId);

  return (
    <div className="h-screen">
      {/* My Tickets */}
      <section className=" text-white bg-transparent bg-cover bg-center py-5 md:py-10  ">
        <div className="wrapper flex items-center justify-center sm:justify-between ">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={orderedEvents}
          emptyTitle="No event tickets booked yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
          orders={orders?.data}
        />
      </section>

      {/* Events User Organized */}

      {SRE_Check ? (
        <>
          <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <div className="wrapper flex items-center justify-center sm:justify-between">
              <h3 className="h3-bold text-center sm:text-left">
                Events Organized
              </h3>
              <Button asChild size="lg" className="button hidden sm:flex">
                <Link href="/events/create">Create New Event</Link>
              </Button>
            </div>
          </section>

          <section className="wrapper my-8">
            <Collection
              data={organizedEvents?.data}
              emptyTitle="No events have been created yet"
              emptyStateSubtext="Go create some now"
              collectionType="Events_Organized"
              limit={3}
              page={eventsPage}
              urlParamName="eventsPage"
              totalPages={organizedEvents?.totalPages}
            />
          </section>
        </>
      ) : null}
    </div>
  );
}
