"use client";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { EmergencyContact } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import AddEmergencyModal from "@/components/modals/add-emergency-modal";
import { useEmergencyModal } from "@/hooks/use-emergency-modal";
import { EmergencyModalPerson } from "@/types";
import { AlertModal } from "@/components/modals/alert-modal";
import { useAlertModal } from "@/hooks/use-alert-modal";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ClientEmergencyProps {
  emergencyContacts: EmergencyContact[] | undefined;
}

const ClientEmergency: React.FC<ClientEmergencyProps> = ({
  emergencyContacts,
}) => {
  const [initialData, setInitialData] = 
    useState<EmergencyModalPerson | null>(null );
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  const params = useParams();
  const router = useRouter();

  const onOpen = useEmergencyModal((state) => state.onOpen);

  const onClick = (contact: EmergencyContact) => {
    const formattedContact = {
      firstName: contact?.name.split(" ")[0],
      lastName: contact?.name.split(" ")[1],
      phone: contact?.phone,
      email: contact?.email,
      relationship: contact?.relationship,
      id: contact?.id,
    };
    setInitialData(formattedContact);
    onOpen();
  };

  const onAdd = () => {
    setInitialData(null);
    onOpen();
  };

  const onDelete = async() => {
    setLoading(true)
    try{
      const res = await axios.delete(`/api/${params.practiceId}/clients/${params.clientId}/emergency/${idToDelete}`)
      if(res.status === 200){
        toast.success('Emergency contact deleted!')
        router.refresh()
      }
    }catch(err){
      console.log(err)
      toast.error('Error deleting emergency contact')
    }finally{
      setLoading(false)
      setOpen(false)
      setIdToDelete(null)
    }
  };

  return (
    <>
      <AddEmergencyModal initialData={initialData} />
      <AlertModal
        onConfirm={onDelete}
        loading={loading}
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setIdToDelete(null);
        }}
      />
      <div>
        <Card className="p-4 relative">
          <Heading title="Emergency Contact" />
          <Button onClick={onAdd} className="absolute top-4 right-4">
            <Plus className="" />
          </Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Relationship</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {emergencyContacts?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="font-medium text-center">
                    <p>No Emergency Contacts</p>
                    <p className="text-xs text-muted-foreground">
                      (Click the plus to add one)
                    </p>
                  </TableCell>
                </TableRow>
              )}
              {emergencyContacts?.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.relationship}</TableCell>
                  <TableCell className="flex  items-center">
                    <Button onClick={() => onClick(contact)} variant="outline">
                      Edit
                    </Button>
                    <Button
                      className="hover:bg-red-300"
                      onClick={() => {
                        setOpen(true);
                        setIdToDelete(contact.id);
                      }}
                      variant="outline"
                    >
                      <Trash className="w-6 h-6" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  );
};

export default ClientEmergency;
