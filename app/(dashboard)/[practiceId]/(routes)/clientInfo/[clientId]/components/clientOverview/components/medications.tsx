"use client"
import React, { useState } from "react";
import { Client } from "@prisma/client";
import { Medication } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MedicineAutocomplete from "./medicine-auto";
import { Plus } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";
import AddMedicineModal from "@/components/modals/add-medicine-modal";
import { useMedicineModal } from "@/hooks/use-medicine-modal";
import { useParams } from "next/navigation";
import MedHolder from "./med-holder";
interface MedicationsProps {
  client: Client | null;
}

interface ClientWithMeds extends Client {
  medications: Medication[];
}

const Medications: React.FC<MedicationsProps> = ({ client }) => {
  const onOpen = useMedicineModal((state) => state.onOpen);
  const clientWithMeds = client as ClientWithMeds;
  const params = useParams();
  return (
    <>
      <AddMedicineModal clientId={params.clientId} practiceId={params.practiceId}/>

      <Card className="relative">
        <CardContent>
          <CardHeader className="flex flex-row justify-center items-center text-2xl font-bold ">
            <h1 className="font-mono text-blue-600">Medications</h1>
            <Button className="absolute right-4 top-2" onClick={onOpen}>
              <Plus />
            </Button>
          </CardHeader>
          <div className="grid grid-cols-1">

          {clientWithMeds.medications.map((med) => (
            <MedHolder clientId={params.clientId} practiceId={params.practiceId} key={med.id} medication={med}/>
          ))}
          </div>

        </CardContent>
      </Card>
    </>
  );
};

export default Medications;
