import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs/server";

const CreateEvent = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const userEmail = sessionClaims?.primaryEmail as string;

  const viewCheck = userEmail === process.env.CRE_CHECK;

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
};

export default CreateEvent;
