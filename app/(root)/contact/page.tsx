"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { submitEmail } from "@/lib/actions/email.actions";
import { useToast } from "@/components/ui/Use-Toast";
import { SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "name must be longer than two characters")
    .max(50, "name must be less than 50 characters"),
  email: z
    .string()
    .min(2, "email must be longer than two characters")
    .max(50, "email must be less than 50 characters"),
  subject: z
    .string()
    .min(2, "subject must be longer than two characters")
    .max(140, "subject must be less than 140 characters"),
  message: z
    .string()
    .min(10, "message must be longer than ten characters")
    .max(1000, "message must be less than one thousand characters"),
});

export default function ContactUs() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      subject: "",
      message: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formSent = await submitEmail(values);

      if (formSent) {
        console.log("form sent succesfully");

        toast({
          title: "✓  Message Sent",
          description: "Your message was sent succesfully",
          variant: "default",
        });
        form.reset();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Email us directly at wordsandstrings@outlook.com",

        description: "An error occured",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="mx-auto ">
      <h1 className="text-4xl text-white font-bold text-center p-6">
        Contact Us
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-screen md:max-w-[640px] lg:max-w-[940px] px-4 md:px-10 py-6 text-white mb-12"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your name.."
                    {...field}
                    className="text-black"
                  />
                </FormControl>

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
                  <Input
                    placeholder="your email address.."
                    className="text-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input
                    placeholder="subject title.."
                    className="text-black"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="textarea rounded-2xl min-h-44 text-black"
                    placeholder="write your message here.."
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <SignedIn>
            <Button
              type="submit"
              variant="default"
              className="mx-auto flex-center bg-wassecondary hover:bg-white hover:text-black text-lg text-white p-4  "
              size="lg"
            >
              {form.formState.isSubmitting ? (
                <p className=" animate-pulse">Submitting</p>
              ) : (
                "Submit"
              )}
            </Button>
          </SignedIn>

          <SignedOut>
            <Button
              variant="default"
              className="mx-auto flex-center bg-wassecondary hover:bg-white hover:text-black text-lg text-white p-4  "
              size="lg"
            >
              <Link href="/sign-in">Submit</Link>
            </Button>
          </SignedOut>
        </form>
      </Form>
    </div>
  );
}
