"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Client, Disorders } from "@prisma/client";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";
import { useDisorderModal } from "@/hooks/use-disorder-modal";
import AddDisorderModal from "@/components/modals/add-disorder-modal";

interface ClientWithDis extends Client {
  disorders: Disorders[];
}

interface DisordersProps {
  client: Client | null;
  disorders: Disorders[];
}

const DisordersComp: React.FC<DisordersProps> = ({ client, disorders }) => {
  const clientWithDis: ClientWithDis = client as ClientWithDis;
  const params = useParams();
  const onOpen = useDisorderModal((state) => state.onOpen);

 

  const deleteDisorder = async () => {
    const { data } = await axios.delete(
      `/api/${params.practiceId}/clients/${params.clientId}/disorders`,
      {
        data: {
          disorderId: "cb70b538-e08f-4e78-86a8-a460a20b0748",
        },
      }
    );
    console.log(data);
  };

  return (
    <>
      <AddDisorderModal  disorders={disorders} />
      <Card className="relative">
        <CardContent>
          <CardHeader className="flex justify-center items-center text-2xl font-bold ">
            <h1 className="font-mono text-blue-600">Disorders</h1>
            <Button onClick={onOpen} className="absolute top-2 right-4">
              <Plus  />
            </Button>
          </CardHeader>
          <ul className="list-disc  w-fit m-auto">
          {clientWithDis.disorders.map((disorder: Disorders) => (
            <li key={disorder.id}>

              <p className="text-lg font-semibold">{disorder.condition}</p>
            </li>
            
          ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default DisordersComp;
