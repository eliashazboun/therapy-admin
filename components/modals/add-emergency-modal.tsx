"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { useEmergencyModal } from "@/hooks/use-emergency-modal";
import * as z from "zod";
import { relationships } from "@/lib/consts";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import Spinner from "../ui/spinner";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { EmergencyContact } from "@prisma/client";
import { EmergencyModalPerson } from "@/types";

const formSchema = z.object({
  firstName: z
    .string({ required_error: "Required" })
    .min(1, { message: "Required." }),
  lastName: z
    .string({ required_error: "Required" })
    .min(1, { message: "Required." }),
  phone: z
    .string({ required_error: "Required" })
    .min(1, { message: "Required." }),
  email: z
    .string({ required_error: "Required" })
    .email({ message: "Invalid email." })
    .min(1, { message: "Required." }),
  relationship: z
    .string({ required_error: "Required" })
    .min(1, { message: "Required." }),
});

interface AddEmergencyModalProps {
  initialData: EmergencyModalPerson | null;
}

const AddEmergencyModal:React.FC<AddEmergencyModalProps> = ({
  initialData
}) => {
  const [loading, setLoading] = useState(false);
  const emergencyModal = useEmergencyModal();
  if(initialData){
    console.log('INITIAL DATA PRESENT',initialData)
  }else{
    console.log('INITIAL DATA NOT PRESENT',initialData)
  }

  const title = initialData ? "Edit Emergency Contact" : "Add Emergency Contact";
  const description = initialData
    ? "Edit this emergency contact's information."
    : "Add an emergency contact for your client.";
  const toastMessage = initialData ? "Emergency Contact updated" : "Emergency Contact added";
  const action = initialData ? "Save Changes" : "Submit";

  const params = useParams();
  const router = useRouter();




  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if(initialData){
        const res = await axios.patch(`/api/${params.practiceId}/clients/${params.clientId}/emergency`,{
          ...values,
          id: initialData.id
        })
        if(res.status === 200){
          toast.success(toastMessage);
          emergencyModal.onClose();
          router.refresh();
        }
      }else{
        const res = await axios.post(
          `/api/${params.practiceId}/clients/${params.clientId}/emergency`,
          values
        );
        if (res.status === 200) {
          toast.success(toastMessage);
          emergencyModal.onClose();
          router.refresh();
        }
      }
    } catch (err) {
      console.log("[ADD_EMERGENCY_MODAL]", err);
    } finally {
      setLoading(false);
    }
  }; 

  useEffect(() => {
    if(initialData){
      form.reset({...initialData})
    }else{
      form.reset({
      firstName:'',
      lastName: '',
      phone:'',
      email:'',
      relationship:''
      })
    }
  },[initialData])

  return (
    <Modal
      isOpen={emergencyModal.isOpen}
      onClose={emergencyModal.onClose}
      title={title}
      description={description}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
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
                      <Input
                        placeholder="Last Name"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <PhoneInputWithCountry
                        disabled={loading}
                        placeholder="Phone number"
                        style={{ width: "100%" }}
                        name={field.name}
                        defaultCountry="JO"
                        className="border border-input rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-8 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </FormControl>
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
                        placeholder="Email"
                        type="email"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship</FormLabel>
                    <Select disabled={loading} defaultValue={field.value} name="relationship" onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="SelectTrigger">
                          <SelectValue placeholder={"Relationship"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="overflow-y-auto max-h-80">
                        {relationships.map((relationship, idx) => (
                          <SelectItem value={relationship} key={idx}>
                            {relationship}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant={"outline"}
                  onClick={emergencyModal.onClose}
                  type="button"
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  {loading ? <Spinner /> : action}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AddEmergencyModal;
