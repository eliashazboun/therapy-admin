import React from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import Spinner from "../ui/spinner";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { EventObject } from "@/types";
import { DatePicker } from "../ui/date-picker";
import { cn } from "@/lib/utils";
import { Popover,PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  newEvent: EventObject;
}

export const appointmentFormSchema = z.object({
  title: z.string().min(1, { message: "Required." }),
  start: z.date().nullable(),
  startTime: z.string(),
  endTime: z.string(),
  color: z.string(),
});

export const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  newEvent,
}) => {
  const formattedNewEvent = {
    title: newEvent.title,
    start: newEvent.start ,
    startTime:"",
    endTime:"",
    color:"",
  }
  const form = useForm<z.infer<typeof appointmentFormSchema>>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {...formattedNewEvent},
  });

  return (
    <Modal
      title="Create Appointment"
      description="Give your appointment a name to get started."
      isOpen={isOpen}
      onClose={onClose}
    >
      {/* {JSON.stringify(formattedNewEvent)}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onConfirm)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appointment title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title..." {...field} />
                </FormControl>
                <FormDescription>
                  This title will show up on the calendar.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appointment Date</FormLabel>
                <FormControl>
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
                            <span>Date</span>
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
                </FormControl>
                <FormDescription>
                  This title will show up on the calendar.
                  {JSON.stringify(field.value)}
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button disabled={loading} variant={"outline"} onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={loading}
              onClick={onConfirm}
              variant={"destructive"}
            >
              {loading ? <Spinner /> : "Confirm"}
            </Button>
          </div>
        </form>
      </Form> */}
    </Modal>
  );
};
