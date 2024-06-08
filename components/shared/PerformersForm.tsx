"use client";

import { performerDefaultValues } from "@/constants";
import { performerFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import FileUploader from "./FileUploader";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Checkbox } from "../ui/Checkbox";

type PerformerFormProps = {
  userId: string;
};

function PerformersForm({ userId }: PerformerFormProps) {
  const [files, setFiles] = useState<File[]>([]);

  // 1. Define the form
  const form = useForm<z.infer<typeof performerFormSchema>>({
    resolver: zodResolver(performerFormSchema),
    defaultValues: performerDefaultValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof performerFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="performanceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your performance type</FormLabel>
                <FormControl>
                  <Select
                    required
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-[240px] bg-white">
                      <SelectValue placeholder="Pick One" className="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spoken word" className="bg-white">
                        Spoken Word / Poetry
                      </SelectItem>
                      <SelectItem value="musical performance">
                        Musical Performance
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="First and last name.." {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="performanceDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What will you be performing?</FormLabel>
                <FormControl>
                  <Input placeholder="A poem I wrote about.." {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="funFact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fun Fact about yourself</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Anything about yourself can be fun or serious, go crazy.."
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-xs italic">
                  Our MC will introduce you to the stage with your fun fact
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email address.." {...field} />
                </FormControl>
                {/* <FormDescription>
                  The confirmation email will be sent to this address{" "}
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="performanceLanguage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What language will you perform in ?</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="soloOrGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Will you be performing solo or with someone?
                </FormLabel>
                <FormControl>
                  <Select
                    required
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-[320px] bg-white">
                      <SelectValue placeholder="Pick One" className="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solo" className="bg-white">
                        Solo
                      </SelectItem>
                      <SelectItem value="band">
                        Band - More than 1 person performing
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="idScan_url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Scan of Qatar ID (required) or Passport</FormLabel>

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
          <FormField
            control={form.control}
            name="termsagreement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Terms of participation <span className="text-red-500">*</span>{" "}
                </FormLabel>

                <FormDescription></FormDescription>
                <FormControl>
                  <div
                    className="flex flex-col text-sm  gap-4  text-left max-w-[420px] 
                  "
                  >
                    <p>
                      By registering for and participating in this event, I
                      commit to conducting myself in a family-friendly and
                      respectful manner that adheres to Qatari culture. I agree
                      to refrain from any behavior or language that may be
                      considered disrespectful or inappropriate. I understand
                      that failure to comply with these guidelines makes me
                      solely responsible for my actions.
                      <br />
                      <span>
                        By participating, I affirm my understanding and
                        agreement with this disclaimer.
                      </span>
                    </p>
                    <div className="flex gap-2">
                      <Checkbox
                        id="termsagreement"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label htmlFor="termsagreement">Yes</label>
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default PerformersForm;

//
