import { Client, Disorders } from "@prisma/client";
import React from "react";
import BasicInfo from "./components/basic-info";
import PersonalDetails from "./components/personal-details";
import DisordersComp from "./components/disorders" ;
import Medications from "./components/medications";

interface ClientOverviewProps {
  client: Client | null;
  disorders: Disorders[]
}

const ClientOverview: React.FC<ClientOverviewProps> = ({ client, disorders }) => {
  return (
    <div className="grid sm:grid-cols-1 md: lg:grid-cols-2 gap-3">
      <BasicInfo client={client}/>
      <PersonalDetails client={client}/>
      <DisordersComp disorders={disorders} client={client}/>
      <Medications client={client}/>
     
    </div>
  );
};

export default ClientOverview;
