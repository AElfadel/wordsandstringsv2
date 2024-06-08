import PerformersForm from "@/components/shared/PerformersForm";
import { auth } from "@clerk/nextjs/server";
import React from "react";
type perfomersFormParams = {
  params: {
    id: string;
  };
};

async function page({ params }: perfomersFormParams) {
  const { sessionClaims } = auth();

  const userId = (await sessionClaims?.userId) as string;

  return (
    <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
      {userId ? (
        <div className="wrapper my-8">
          <h3 className="wrapper h3-bold text-center sm:text-left">
            Performer Registration
          </h3>
          <PerformersForm userId={userId} />
        </div>
      ) : (
        <p>Please return to the home page</p>
      )}
    </section>
  );
}

export default page;
