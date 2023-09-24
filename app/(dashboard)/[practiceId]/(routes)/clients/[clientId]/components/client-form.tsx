"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";

import { Client } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, set } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar as CalendarIcon, Trash } from "lucide-react";

import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/ui/spinner";
import axios from "axios";
import toast from "react-hot-toast";

type ClientFormValues = z.infer<typeof formSchema>;

interface ClientFormProps {
  initialData: Client | null;
}

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required." }),

  lastName: z.string().min(1, { message: "Last Name is required." }),

  gender: z.string({ required_error: "Gender is required." }).min(1),

  birthday: z.date({ required_error: "Birthday is required." }),

  email: z
    .string({required_error:"Email is required."})
    .min(1,{message:"Email is required."})
    .email({ message: "Must be a valid email." }),

  street: z
    .string()
    .min(1, { message: "Street is required." })
    .max(255, { message: "Street must be less than 255 characters." }),

  city: z
    .string()
    .min(1, { message: "City is required." })
    .max(255, { message: "City must be less than 255 characters." }),

  phone: z.string().min(1, { message: "Phone is required." }),

  country: z
    .string()
    .min(1, { message: "Country is required." })
    .max(255, { message: "Country must be less than 255 characters." }),
});

const ClientForm: React.FC<ClientFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Client" : "Add Client";
  const description = initialData
    ? "Edit client details"
    : "Add a new client to your practice.";
  const toastMessage = initialData ? "Client updated" : "Client added";
  const action = initialData ? "Save Changes" : "Create";

  const params = useParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      firstName: "",
      lastName: "",
      city: "",
      street: "",
      country: "",
      phone: "",
    },
  });

  const onSubmit = async (data: ClientFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.practiceId}/clients/${params.clientId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.practiceId}/clients`, data);
      }
      router.refresh();
      router.push(`/${params.practiceId}/clients`);
      toast.success(toastMessage);
    } catch (error) {
      console.log("[ON_SUBMIT_CLIENT_FORM]", error);
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try{
      setLoading(true)
      await axios.delete(`/api/${params.practiceId}/clients/${params.clientId}`)
      router.refresh()
      router.push(`/${params.practiceId}/clients`)
      toast.success("Client deleted")
    }catch(err){
      console.log("[ON_DELETE_CLIENT_FORM]", err)
      toast.error("Something went wrong")
    }finally{
      setLoading(false);
    }
  };
  const onInvalid = (errors: any) => console.error(errors);
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex  items-center justify-between text-center">
        <div>
        </div>
        <Heading title={title} description={description} />
        <div>
        {initialData && (
          <Button
            disabled={loading}
            variant={"destructive"}
            size={"sm"}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" /> Delete
          </Button>
        )}

        </div>
      </div>
      
      <Separator />
      <div className="flex min-h-screen flex-col items-center ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            className="space-y-2 mt-5"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>

                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-neutral-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-neutral-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <SelectTrigger className="SelectTrigger">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs font-bold text-neutral-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInputWithCountry
                      placeholder="Phone Number"
                      name={field.name}
                      defaultCountry="JO"
                      className="border border-input rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-8 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-neutral-600" />

                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Date of Birth</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout={"dropdown-buttons"}
                        fromYear={1910}
                        toYear={new Date().getFullYear()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                    <FormMessage className="text-xs font-bold text-neutral-600" />
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
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-neutral-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input placeholder="Street Name" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-neutral-600" />


                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City Name" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-neutral-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country Name" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs font-bold text-neutral-600" />
                </FormItem>
              )}
            />

            <Button disabled={loading} className="w-full">
              {loading ? <Spinner /> : action}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ClientForm;
