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
import { deleteEvent } from "@/lib/actions/event.actions";
import { usePathname } from "next/navigation";
import { useToast } from "../ui/Use-Toast";

function DeleteConfirmation({
  eventId,
  imageUrl,
}: {
  eventId: string;
  imageUrl: string;
}) {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Icons.delete fill="#FF5050" width={20} height={20} />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete?
            </AlertDialogTitle>
            <AlertDialogDescription className="p-regular-16 text-grey-600">
              This will permanently delete this event
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              className="bg-red-500"
              onClick={async function startTransition() {
                await deleteEvent({
                  eventId,
                  path: pathname,
                  imageUrl: imageUrl,
                });
                toast({
                  title: "Delete successful",
                  description: "Event deleted successfully",
                });
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

export default DeleteConfirmation;

//Stopped at 3:55:27 at the delete confirmation dialog
