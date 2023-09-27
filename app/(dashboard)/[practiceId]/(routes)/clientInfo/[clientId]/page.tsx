import { getClientAppointments } from "@/actions/get-client-appointments";
import { getClientDetails } from "@/actions/get-client-details";
import Container from "@/components/layout/container";
import { Heading } from "@/components/ui/heading";
import { Client } from "@prisma/client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ClientAppointments from "./components/client-appointments";

const ClientInfoPage = async ({
  params,
}: {
  params: {
    practiceId: string;
    clientId: string;
  };
}) => {
  const clientAppointments = await getClientAppointments(
    params.clientId,
    params.practiceId
  );
  const clientDetails = await getClientDetails(
    params.clientId,
    params.practiceId
  );

  return (
    <div className="w-full">
      <Container className="w-full">
        <Heading title={`Client Information: ${clientDetails?.firstName + " " + clientDetails?.lastName}`} description="Client information" />
        <Separator className="mb-4"/>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            Overview
          </TabsContent>
          <TabsContent value="appointments">
            <ClientAppointments clientAppointments={clientAppointments}/>
          </TabsContent>
          <TabsContent value="payments">
            Payments
          </TabsContent>
          <TabsContent value="personal-info">
            Personal Info
          </TabsContent>
          <TabsContent value="emergency">
            Emergency Contact
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
};

export default ClientInfoPage;
