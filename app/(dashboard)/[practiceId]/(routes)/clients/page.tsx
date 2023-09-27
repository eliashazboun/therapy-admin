import Container from "@/components/layout/container";
import { Heading } from "@/components/ui/heading";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { ClientColumn } from "./components/columns";
import { ClientClient } from "./components/client";

const ClientsPage = async ({
  params
}:{
  params: {practiceId: string}
}) => {
  const clients = await prismadb.client.findMany({
    where: {
      practiceId: params.practiceId
    }
  })

  const formattedClients : ClientColumn[] = clients.map((client) => ({
    id: client.id.toString(),
    name: client.firstName + " " + client.lastName,
    gender: client.gender.charAt(0).toUpperCase(),
    birthday: client.birthday.toLocaleDateString(),
    phone: client.phone.toString(),
  }))


  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ClientClient data={formattedClients}/>
      </div>
        <Separator className="mb-5"/>

       
    </div>
  );
};

export default ClientsPage;


