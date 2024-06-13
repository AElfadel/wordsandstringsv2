"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./Drawer";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./Dialog";

import { Button } from "./Button";
import { Label } from "./Label";
import { Input } from "./Input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { toggleTicketsRegistration } from "@/lib/actions/event.actions";
import { useState } from "react";
import { useToast } from "./Use-Toast";

type toggleTicketStatusProps = {
  eventId: string;
  eventStatus: {
    eventTicketsState: boolean;
  };
};

export default function ToggleTicketsStatus({
  eventStatus,
  eventId,
}: toggleTicketStatusProps) {
  const displayStatus = eventStatus.eventTicketsState ? "OPEN" : "CLOSE";

  const [registrationToggle, setRegistrationToggle] = useState(
    eventStatus.eventTicketsState
  );

  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const { toast } = useToast();

  if (isDesktop) {
    return (
      <section className=" bg-wassecondary bg-dotted-pattern bg-cover bg-center py-5 md:py-10 flex  gap-2 ">
        <h3 className="wrapper h3-bold text-left sm:text-left text-white  ">
          Tickets registration
        </h3>
        <div className="flex flex-col">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="mr-6 mt-4 font-bold text-3xl md:text-5xl md:mr-18 md:text-center text-white  rounded-full border bg-black border-black  cursor-pointer">
              {eventStatus.eventTicketsState ? "OPEN" : "CLOSED"}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle>Change tickets status</DialogTitle>
                <DialogDescription>
                  Events tickets are currently {displayStatus} for booking.
                  Would you like to {registrationToggle ? "CLOSE" : "OPEN"} it?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex flex-col">
                <Button
                  className="items-center w-full justify-center mx-auto"
                  onClick={() => {
                    toggleTicketsRegistration(eventId);
                    toast({
                      title: `REGISTRATION IS NOW ${registrationToggle ? "ClOSE" : "OPEN"} `,
                      description: "Operation completed successfully",
                      variant: "cool",
                    });
                    router.refresh();
                  }}
                >
                  {registrationToggle ? "CLOSE" : "OPEN"} registration
                </Button>
                <DialogClose>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className=" text-white text-center pr-6">
            {eventStatus.eventTicketsState ? (
              <p className="text-white md:pr-16 w-fit ">
                Tickets are available
              </p>
            ) : (
              <p className="text-black md:pr-18 w-fit">
                Tickets not available to public
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className=" bg-wassecondary bg-dotted-pattern bg-cover bg-center py-5 md:py-10 flex  gap-2 ">
      <h3 className="wrapper h3-bold text-left sm:text-left text-white  ">
        Tickets registration
      </h3>
      <div className="flex flex-col">
        <Drawer>
          <DrawerTrigger>
            <div className="mr-6 mt-4 font-bold text-3xl md:text-5xl md:mr-18 md:text-center text-white  rounded-full border bg-black border-black ">
              {eventStatus.eventTicketsState ? (
                "OPEN"
              ) : (
                <p className="text-white">CLOSED</p>
              )}
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>TICKETS STATUS</DrawerTitle>
              <DrawerDescription className="-mb-2 text-base ">
                Events tickets are currently {displayStatus} for booking.
                <br /> Would you like to {registrationToggle
                  ? "CLOSE"
                  : "OPEN"}{" "}
                it?
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <Button
                  className="w-full  items-center justify-center mx-auto"
                  onClick={() => {
                    toggleTicketsRegistration(eventId);
                    toast({
                      title: `REGISTRATION IS NOW ${registrationToggle ? "ClOSE" : "OPEN"} `,
                      description: "Operation completed successfully",
                      variant: "default",
                    });
                    router.refresh();
                  }}
                >
                  {registrationToggle ? "CLOSE" : "OPEN"} registration
                </Button>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <div className=" text-white text-center pr-6">
          {eventStatus.eventTicketsState ? (
            <p className="text-white md:pr-16 fontb-bold ">
              Tickets are available
            </p>
          ) : (
            <p className="text-black md:pr-18 font-bold">
              Tickets not available to public
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
