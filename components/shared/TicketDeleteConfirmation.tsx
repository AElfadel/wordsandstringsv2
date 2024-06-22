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
import { deleteOrder } from "@/lib/actions/order.actions";

function TicketDeleteConfirmation({
  eventId,
  userId,
}: {
  eventId: string;
  userId: string;
}) {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>Cancel Ticket </AlertDialogTrigger>
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
                try {
                  await deleteOrder({ eventId, userId });
                  toast({
                    title: "Ticket cancelled successfully",
                    description: "Thank you for letting us know in advance!",
                    variant: "success",
                  });
                  router.refresh();
                } catch (error) {
                  toast({
                    title: "An error occured",
                    description:
                      "Try again later and if error presists contact us at wordsandstrings@outlook.com",
                    variant: "destructive",
                  });
                }
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
