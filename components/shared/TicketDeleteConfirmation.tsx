"use client";

import { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/AlertDialog";
import { Icons } from "../ui/Icons";
import { usePathname } from "next/navigation";
import { useToast } from "../ui/Use-Toast";
import { useRouter } from "next/navigation";

function TicketDeleteConfirmation({ eventId }: { eventId: string }) {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Icons.delete fill="#FF5050" width={20} height={20} />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to cancel your ticket?
            </AlertDialogTitle>
            <AlertDialogDescription className="p-regular-16 text-grey-600">
              This will permanently delete your ticket
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              className="bg-red-500"
              onClick={async function startTransition() {
                await //Add delete Order function here!
                console.log("Add order deletion here!");
                toast({
                  title: "Ticket cancelled successfully",
                  variant: "destructive",
                });
                router.refresh();
              }}
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default TicketDeleteConfirmation;
