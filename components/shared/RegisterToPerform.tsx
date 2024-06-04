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
        <Button asChild className="rounded-full text-white" variant="secondary">
          <Link href="/sign-in">Register to perform 🎤</Link>
        </Button>
      </SignedOut>

      <SignedIn>
        <Button
          asChild
          className="rounded-full px-4 py-7 text-white"
          variant="secondary"
        >
          <Link href={`/events/${id}/perform`}>Register to perfom 🎤</Link>
        </Button>
      </SignedIn>
    </div>
  );
}

export default RegisterToPerform;
