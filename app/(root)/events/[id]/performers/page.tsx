import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/Button";
import { auth } from "@clerk/nextjs/server";
import { userPermissions } from "@/lib/actions/user.actions";
import PerformersList from "@/components/shared/PerformersList";

async function Performers({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const eventId = params.id;
  const { sessionClaims } = await auth();
  const userId = (await sessionClaims?.userId) as string;
  const display = (await userPermissions(userId)) as boolean;

  return (
    <div>
      <Button
        variant="ghost"
        className="w-fit text-left justify-start p-4 m-4"
        asChild
      >
        <Link
          href={`/events/${params.id}`}
          className="text-white rounded-full  p-medium-16 h-[54px]  w-fit  "
        >
          ← Return to event
        </Link>
      </Button>

      {display ? (
        <PerformersList eventId={eventId} />
      ) : (
        <div>
          <p className="text-white text-xl">404 Unauthorized</p>
        </div>
      )}
    </div>
  );
}

export default Performers;
