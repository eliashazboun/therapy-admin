import React from 'react'
import { Client } from '@prisma/client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { capitalize } from '@/lib/utils';

interface PersonalDetailsProps {
  client:   Client | null
}



const PersonalDetails:React.FC<PersonalDetailsProps> = ({
  client
}) => {

  

  //create a function that returns the age of the client
  const getAge = (birthday: Date | undefined | null) => {

    const today = new Date();
    if(!birthday){
      return 0;
    }
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
      age--;
    }
    return age;
  }
  return (
    <Card className="pt-6">
        <CardContent>
          <CardHeader className="flex justify-center items-center text-2xl font-bold pt-0">
            <h1 className="font-mono text-blue-600">Personal Details</h1>
          </CardHeader>
           
            <div className="grid grid-cols-3 gap-4 ">
              <div className="">
                <p className='font-bold underline'>Gender</p>
                <p>{capitalize(client ? client.gender : "Loading")}</p>
              </div>
              <div className="">
                <p className='font-bold underline'>Date of Birth</p>
                <p>{client?.birthday ? client.birthday.toLocaleDateString() : "Loading..."}</p>
              </div>
              <div className="">
                <p className="font-bold underline">Country</p>
                <p>{client?.country ? client?.country : "Loading..."}</p>
              </div>
              <div className="">
                <p className="font-bold underline">Age</p>
                <p>{getAge(client?.birthday)}</p>
                </div>
              <div className="">
                <p className="font-bold underline">City</p>
                <p>{client?.city ? client.city : "Loading..."}</p>
              </div>
              <div className="">
                <p className="font-bold underline"> Language</p>
                <p>{client?.prefferedLanguage ? client.prefferedLanguage : "Loading..."}</p>
              </div>
             
             
            </div>
        </CardContent>
      </Card>
  )
}

export default PersonalDetails