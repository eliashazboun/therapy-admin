"use client";

import * as z from "zod";

import { usePracticeModal } from "@/hooks/use-practice-modal";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import Spinner from "@/components/ui/spinner"
import axios from 'axios'
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {message:"Required."}),
});

export const PracticeModal = () => {
  const practiceModal = usePracticeModal();

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      setLoading(true)

      const response = await axios.post('/api/practices',values)

      window.location.assign(`/${response.data.id}`)
    }catch(err){
      toast.error("Something went wrong.")
      console.log("[CREATE_PRACTICE_MODAL]", err)
    }finally{
      setLoading(false)
    }
    console.log(values);
  };

  return (
    <Modal
      title="Create Your Practice!"
      description="Give your practice a name to get started."
      isOpen={practiceModal.isOpen}
      onClose={practiceModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Practice Name</FormLabel>
                    <FormControl>
                      <Input 
                        disabled={loading} 
                        placeholder="Ex: 'Sousan's Therapy'" 
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant={"outline"} onClick={practiceModal.onClose}>Cancel</Button>
                <Button disabled={loading} type="submit">
                  {loading ? <Spinner/>: "Continue"}
                </Button>
              </div>

            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
