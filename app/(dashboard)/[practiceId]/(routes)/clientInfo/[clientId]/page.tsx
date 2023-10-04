import { getClientAppointments } from "@/actions/get-client-appointments";
import { getClientDetails } from "@/actions/get-client-details";
import Container from "@/components/layout/container";
import { Heading } from "@/components/ui/heading";
import { Client } from "@prisma/client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ClientAppointments from "./components/client-appointments";
import ClientOverview from "./components/clientOverview/client-overview";
import ClientPersonalInfo from "./components/client-personal-info";
import ClientPayments from "./components/client-payments";
import ClientEmergency from "./components/client-emergency";
import axios from "axios";
import { getDisorders } from "@/actions/get-disorders";

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

  const disorders = await getDisorders()

  return (
    <div className="w-full">
      <Container className="w-full">
        <Heading
          title={`Client Information: ${
            clientDetails?.firstName + " " + clientDetails?.lastName
          }`}
          description="Client information"
        />
        <Separator className="mb-4" />
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full  sm:pb-[8.3rem] md:mb-10 md:pb-10 lg:mb-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <ClientOverview disorders={disorders}  client={clientDetails}/>
          </TabsContent>
          <TabsContent value="appointments">
            <ClientAppointments clientAppointments={clientAppointments} />
          </TabsContent>
          <TabsContent value="payments">
            <ClientPayments/>
          </TabsContent>
          
          <TabsContent value="emergency">
            <ClientEmergency emergencyContacts={clientDetails?.contacts}/>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
};

export default ClientInfoPage;
