"use client";
import { useParams, useRouter } from "next/navigation";
import { ClientColumn } from "./columns";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import GenerateRandomUser from "@/components/gen-random";

interface ClientClientProps {
  data: ClientColumn[];
}
export const ClientClient: React.FC<ClientClientProps> = ({ 
  data,
   
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Clients Page"
          description="View and manage current clients in your practice."
        />
        <Button
          onClick={() => router.push(`/${params.practiceId}/clients/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Client
        </Button>
        <GenerateRandomUser practiceId={params.practiceId}/>
      </div>
      <Separator/>
      <DataTable columns={columns} data={data} searchKey="name"/>
    </>
  );
};
