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
import { useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { toggleTicketsRegistration } from "@/lib/actions/event.actions";
import { useState } from "react";
import { useToast } from "./Use-Toast";
import { Switch } from "./Switch";

type toggleTicketStatusProps = {
  eventId: string;
  eventStatus: {
    eventTicketsState: boolean;
  };
};

export const dynamic = "force-dynamic";

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
      <section
        className={`${registrationToggle ? "bg-green-500" : "bg-red-500"} py-5 md:py-10 flex gap-2`}
      >
        <h3 className="wrapper h3-bold text-left sm:text-left text-white  ">
          Tickets registration
        </h3>
        <div className="flex flex-col text-center items-center content-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="mr-4 mt-4 font-bold text-3xl md:text-5xl md:mr-18 md:text-center text-white px-2 rounded-full border bg-black border-black   cursor-pointer">
              {eventStatus.eventTicketsState ? "OPEN" : "CLOSED"}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
              <DialogHeader>
                <DialogTitle className="text-primary">
                  Change tickets status
                </DialogTitle>
                <DialogDescription>
                  Events tickets are currently {displayStatus} for booking.
                  Would you like to{" "}
                  {registrationToggle ? (
                    <span className="font-bold text-black">CLOSE</span>
                  ) : (
                    <span className="font-bold text-black">OPEN</span>
                  )}{" "}
                  it?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex flex-col">
                <DialogClose>
                  <Button
                    className="items-center w-full justify-center mx-auto"
                    onClick={() => {
                      try {
                        toggleTicketsRegistration(eventId);
                        toast({
                          title: `REGISTRATION IS NOW ${registrationToggle ? "ClOSE" : "OPEN"} `,
                          description: "Operation completed successfully",
                          variant: "cool",
                        });
                        // router.push(`/events/${eventId}/orders`);
                      } catch (error) {
                        toast({
                          title: `Operation failed `,
                          description: (
                            <button
                              onClick={() =>
                                router.push(
                                  "mailto:wordsandstrings@outlook.com"
                                )
                              }
                            >
                              Contact our tech support
                              wordsandstrings@outlook.com
                            </button>
                          ),
                          variant: "destructive",
                        });
                      }
                      setTimeout(() => {
                        location.reload();
                      }, 900);
                    }}
                  >
                    {registrationToggle ? "CLOSE" : "OPEN"} registration
                  </Button>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className=" text-center pr-6">
            {eventStatus.eventTicketsState ? (
              <p
                className="text-white 
                w-fit  text-center"
              >
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
    <section
      className={`${registrationToggle ? "bg-green-500" : "bg-red-500"} py-5 md:py-10 flex gap-2`}
    >
      <h3 className="wrapper h3-bold text-left sm:text-left text-white  ">
        Tickets registration
      </h3>

      <div className="flex flex-col">
        <Drawer>
          <DrawerTrigger>
            <div className="mr-6 mt-4 font-bold text-3xl md:text-5xl md:mr-18 md:text-center text-white flex rounded-full border bg-black border-black ">
              {eventStatus.eventTicketsState ? (
                <p className="text-white text-center w-full">OPEN</p>
              ) : (
                <p className="text-white w-full">CLOSED</p>
              )}
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className=" font-bold text-xl">
                TICKETS STATUS
              </DrawerTitle>
              <DrawerDescription className="-mb-2 text-base ">
                Events tickets are currently {displayStatus} for booking.
                <br /> Would you like to{" "}
                {registrationToggle ? (
                  <span className="font-bold text-black">CLOSE</span>
                ) : (
                  <span className="font-bold text-black">OPEN</span>
                )}{" "}
                it?
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <Button
                  className="w-full  items-center justify-center mx-auto"
                  onClick={() => {
                    try {
                      toggleTicketsRegistration(eventId);
                      toast({
                        title: `✔️ REGISTRATION IS NOW ${registrationToggle ? "ClOSE" : "OPEN"} `,
                        description: "Operation successfull",
                        variant: "success",
                      });
                    } catch (error) {
                      console.log(error);
                      toast({
                        title: `Operation failed `,
                        description: (
                          <button
                            onClick={() =>
                              router.push("mailto:wordsandstrings@outlook.com")
                            }
                          >
                            Contact our tech support wordsandstrings@outlook.com
                          </button>
                        ),
                        variant: "destructive",
                      });
                    }
                    setTimeout(() => {
                      location.reload();
                    }, 900);
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
