"use client";
import React, { useState } from "react";
import { ClientColumn } from "./columns";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import toast from "react-hot-toast";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Copy, Edit, Trash } from "lucide-react";
import axios from "axios";

interface CellActionProps {
  data: ClientColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Copied to clipboard");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.practiceId}/clients/${data.id}`);
      router.refresh();
      router.push(`/${params.practiceId}/clients`);
      toast.success("Client deleted");
    } catch (err) {
      console.log("[ON_DELETE_CLIENT_FORM]", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex">
        <TooltipComponent
          position="TopCenter"
          content={"Copy Client ID"}
          target="#copy"
        >
          <div
            onClick={() => {
              onCopy(data.id);
            }}
            className=" hover:bg-gray-200 flex justify-center items-center rounded-md p-1 w-fit cursor-pointer "
            id="copy"
          >
            <Copy className="h-4 w-4 " />{" "}
          </div>
        </TooltipComponent>
        <TooltipComponent
          position="TopCenter"
          content={"Edit Client Info"}
          target="#edit"
        >
          <div
            id="edit"
            onClick={() =>
              router.push(`/${params.practiceId}/clients/${data.id}`)
            }
            className=" hover:bg-gray-200 flex justify-center items-center rounded-md p-1 w-fit cursor-pointer "
          >
            <Edit className="h-4 w-4 " />{" "}
          </div>
        </TooltipComponent>

        <TooltipComponent position="TopCenter" content={"Delete Client"} target="#delete">

        <div
          id="delete"
          onClick={() => {
            setOpen(true);
          }}
          className=" hover:bg-gray-200 flex justify-center items-center rounded-md p-1 w-fit cursor-pointer "
        >
          <Trash className="h-4 w-4 " />{" "}
        </div>
        </TooltipComponent>
      </div>
    </>
  );
};

export default CellAction;
