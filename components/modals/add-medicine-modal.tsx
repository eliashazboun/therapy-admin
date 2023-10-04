"use client";
import { useMedicineModal } from "@/hooks/use-medicine-modal";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import Spinner from "../ui/spinner";
import MedicineAutocomplete from "@/app/(dashboard)/[practiceId]/(routes)/clientInfo/[clientId]/components/clientOverview/components/medicine-auto";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  drugName: z
    .string({ required_error: "Required" })
    .min(1, { message: "Required." }),
  dosage: z.string().min(1, { message: "Required." }),
  frequency: z.string().min(1, { message: "Required." }),
});

const AddMedicineModal = ({
  clientId,
  practiceId,
}: {
  clientId: string | string[];
  practiceId: string | string[];
}) => {
  const medicineModal = useMedicineModal();

  const [loading, setLoading] = useState(false);
  const [dosages, setDosages] = useState<string[][] | string[] | string>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      drugName: "",
      dosage: "",
      frequency: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `/api/${practiceId}/clients/${clientId}/medications`,
        values
      );
      console.log(res);
      medicineModal.onClose();
      toast.success("Medication added.");
      router.refresh();
    } catch (err) {
      console.log("[ADD_MEDICINE_MODAL]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form.reset({
      drugName: "",
      dosage: "",
      frequency: "",
    });
  }, [medicineModal.isOpen]);
  return (
    <Modal
      title="Add Medication"
      description="Add a medication for your client."
      isOpen={medicineModal.isOpen}
      onClose={medicineModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormLabel>Medication</FormLabel>

              <MedicineAutocomplete
                control={form.control}
                setDosages={setDosages}
              />

              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosage</FormLabel>
                    <Select
                      disabled={dosages.length === 0}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              dosages.length === 0
                                ? "Select medication to view dosages"
                                : "Select dosage"
                            }
                            defaultValue={""}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="overflow-y-auto max-h-80">
                        {typeof dosages !== "string" &&
                          dosages.flat().map((dosage, idx) => (
                            <SelectItem value={dosage} key={idx}>
                              {dosage}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={"Dosage Frequency"}
                            defaultValue={""}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="overflow-y-auto max-h-80">
                        <SelectItem value="0">As needed</SelectItem>
                        <SelectItem value={"1"}>Once a day</SelectItem>
                        <SelectItem value={"2"}>Twice a day</SelectItem>
                        <SelectItem value={"3"}>Three times a day</SelectItem>
                        <SelectItem value={"4"}>Four times a day</SelectItem>
                        <SelectItem value={"5"}>Five times a day</SelectItem>
                        <SelectItem value={"6"}>Six times a day</SelectItem>
                        <SelectItem value={"7"}>Seven times a day</SelectItem>
                        <SelectItem value={"8"}>Eight times a day</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant={"outline"}
                  onClick={medicineModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  {loading ? <Spinner /> : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AddMedicineModal;
