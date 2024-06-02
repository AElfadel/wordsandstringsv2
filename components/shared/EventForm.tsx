"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import eventFormSchema from "@/lib/validator";
import * as z from "zod";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "../ui/Textarea";
import FileUploader from "./FileUploader";
import Image from "next/image";
import { Icons } from "../ui/Icons";

import { useUploadThing } from "@/lib/uploadthing";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/Checkbox";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { useToast } from "../ui/Use-Toast";
import { IEvent } from "@/lib/mongodb/database/models/event.model";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
};

function EventForm({ userId, type, event, eventId }: EventFormProps) {
  const initialValues =
    event && type === "Update"
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
        }
      : eventDefaultValues;

  const router = useRouter();
  const { toast } = useToast();

  //File upload state
  const { startUpload } = useUploadThing("imageUploader");
  const [files, setFiles] = useState<File[]>([]);

  // 1. Define the form
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }
      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: {
            ...values,
            imageUrl: uploadedImageUrl,
          },
          userId,
          path: "/profile",
        });
        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!eventId) {
        router.back();
        return;
      }

      try {
        const eventToUpdate = await updateEvent({
          userId,
          event: {
            ...values,
            imageUrl: uploadedImageUrl,
            _id: eventId,
          },
          path: `/events/${eventId}`,
        });

        if (eventToUpdate) {
          form.reset();
          router.push(`/events/${eventToUpdate._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 max-w-[1024px] lg:mx-auto"
      >
        <div className="flex flex-col gap-5  ">
          {/*1-  Title field */}

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full bg-gray-50 rounded-full h-[54px] mb-2">
                <FormControl>
                  <Input
                    placeholder="Event title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/*2-  Category field */}

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/*3-  Description field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/*4-  Image URL field */}

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/*5-  Location field */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[55px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <Icons.locationGray width={40} />
                    <Input
                      placeholder="Event venue or Online"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/*6-  Start date field */}
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <Icons.calendar height={49} fill="#757575" />
                    <p className="ml-3 whitespace-nowrap text-gray-500">
                      Start Date and Time:
                    </p>
                    {/*Date picker*/}
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="dd/MM/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                      className="text-right pr-12 text-gray-500 cursor-pointer"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/*7-  End date field */}
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <Icons.calendar height={49} fill="#757575" />
                    <p className="ml-3 whitespace-nowrap text-gray-500">
                      End Date and Time:
                    </p>
                    {/*Date picker*/}
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="dd/MM/yyyy h:mm aa"
                      wrapperClassName="datePicker "
                      className="text-right pr-12 text-gray-500 cursor-pointer"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* //DONE: */}
        {/* TICKETS SECTION*/}
        <div className="flex flex-col gap-5 md:flex-row">
          {/*8- Number of tickets field */}
          <FormField
            control={form.control}
            name="numberOfTickets"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Icons.tickets width={32} fill="#757575" />

                    <Input
                      placeholder="Number of tickets"
                      {...field}
                      className="input-field  justify-start bg-transparent"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/*9-  Price field */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[55px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <Icons.dollar fill="#757575" width={48} />
                    <Input
                      type="number"
                      placeholder="Ticket Price in QR"
                      {...field}
                      className="p-regular-16 border-0  outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-gray-50"
                    />

                    {/* Free ticket */}

                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label
                                htmlFor="isFree"
                                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Free Ticket
                              </label>
                              <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree"
                                className="mr-2 h-5 w-5 border-2 border-primary-500"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* FURTHER INFO SECTION */}
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* event url*/}
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Icons.link width={32} />

                    <Input
                      placeholder="Maps location link or online meeting link"
                      {...field}
                      className="input-field  justify-start bg-transparent"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          {/* terms and agreement url*/}

          <FormField
            control={form.control}
            name="termsagreement"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="  h-[54px] w-full rounded-full bg-grey-50 px-4 flex items-center justify-between text-gray-500">
                    <label
                      htmlFor="termsagreement"
                      className="whitespace-nowrap flex items-center gap-5 pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                    >
                      <Icons.termsandcon height={28} fill="#757575" />
                      <a
                        className="  overflow-y-auto text-sm font-bold underline"
                        href="/events/termsandconditions"
                      >
                        I accept the words and strings terms & conditions
                      </a>
                    </label>
                    <Checkbox
                      onCheckedChange={field.onChange}
                      checked={field.value}
                      id="termsagreement"
                      className="mr-2 h-5 w-5 border-2 border-primary-500"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
          onClick={() => {
            form.formState.isSubmitting &&
              toast({
                title: "Uploading event data",
                variant: "default",
              });
          }}
        >
          {form.formState.isSubmitting ? (
            <p className=" animate-pulse">Uploading..</p>
          ) : (
            `${type} Event`
          )}
        </Button>
      </form>
    </Form>
  );
}

export default EventForm;
