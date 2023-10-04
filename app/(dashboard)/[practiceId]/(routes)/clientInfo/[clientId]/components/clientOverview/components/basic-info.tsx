import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Mail, Phone } from "lucide-react";
import { Client } from '@prisma/client';
import Image from 'next/image';

interface BasicInfoProps {
  client: Client | null
}

const BasicInfo:React.FC<BasicInfoProps> = ({client}) => {
  return (
    <Card className="pt-6">
        <CardContent>
          <CardHeader className="flex justify-center items-center text-2xl font-bold pt-0">
            <h1 className="font-mono text-blue-600">Basic Information</h1>
          </CardHeader>
          <div className="flex justify-around  ">
            <Image
              src={client?.profilePicture || ""}
              width={200}
              height={200}
              className="rounded-full"
              alt="Profile Picture"
            />
            <div className="grid  ">
              <Heading title={client?.firstName + " " + client?.lastName} />
              <div className="flex gap-4">
                <Phone />
                <p>{client?.phone}</p>
              </div>
              <div className="flex gap-4">
                <Mail />
                <p>{client?.email}</p>
              </div>
              <div className="flex gap-4">
                <p className="font-bold">Joined:</p>
                <p>{client?.createdAt.toLocaleDateString()}</p>
              </div>
             
            </div>
          </div>
        </CardContent>
      </Card>
  )
}

export default BasicInfo