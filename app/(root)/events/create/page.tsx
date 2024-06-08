import EventForm from "@/components/shared/EventForm";
import { userPermissions } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";

export default async function CreateEvent() {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const viewCheck = await userPermissions(userId);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        {viewCheck ? (
          <div className="wrapper my-8">
            <h3 className="wrapper h3-bold text-center sm:text-left">
              Create Event
            </h3>
            <EventForm userId={userId} type="Create" />
          </div>
        ) : (
          <p>Please return to the home page</p>
        )}
      </section>
    </>
  );
}
