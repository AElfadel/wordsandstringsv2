import Link from "next/link";
import React from "react";
import { Button } from "../ui/Button";
import { SignedIn, SignedOut } from "@clerk/nextjs";

type RegisterToPerformProps = {
  id: string;
};

function RegisterToPerform({ id }: RegisterToPerformProps) {
  return (
    <div className="-ml-2">
      <SignedOut>
        <div className="button bg-wassecondary w-fit rounded-full font-bold   p-4 text-white -mt-3">
          <Link className="font-bold text-lg " href="/sign-in">
            REGISTER TO PERFORM 🎤
          </Link>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="button bg-wassecondary w-fit rounded-full font-bold   p-4 text-white -mt-3">
          <Link href={`/events/${id}/perform`} className="font-bold text-lg ">
            REGISTER TO PERFORM 🎤
          </Link>
        </div>
      </SignedIn>
    </div>
  );
}

export default RegisterToPerform;
