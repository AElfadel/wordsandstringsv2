import { Button } from "@/components/ui/Button";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <SignIn />
    </>
  );
}
