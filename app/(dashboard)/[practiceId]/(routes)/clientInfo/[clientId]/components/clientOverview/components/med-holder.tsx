import { AlertModal } from "@/components/modals/alert-modal";
import { Card, CardContent } from "@/components/ui/card";
import { CardHeader } from "@mui/material";
import { Medication } from "@prisma/client";
import { Trash, X } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface MedHolderProps {
  medication: Medication;
  clientId: string | string[];
  practiceId: string | string[];
}

const MedHolder: React.FC<MedHolderProps> = ({ 
  medication,
  clientId,
  practiceId 

}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true)
    try {
      await axios.delete(`/api/${practiceId}/clients/${clientId}/medications/${medication.id}`)
      router.refresh()
      toast.success("Medication deleted.")
      setOpen(false)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <AlertModal
      isOpen={open}
      onClose={() => setOpen(false)}
      onConfirm={handleDelete}
      loading={loading}

    />
    <Card className="relative">
      <Trash onClick={() => setOpen(true)} className="absolute top-1/4 right-1 cursor-pointer hover:bg-red-500"/>
      <CardContent className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center items-center justify-center pt-6">
        <div>{medication.name}</div>
        <div>{medication.dosage}</div>
        <div>{medication.frequency}x day</div>
      </CardContent>
    </Card>
    </>
  );
};

export default MedHolder;
