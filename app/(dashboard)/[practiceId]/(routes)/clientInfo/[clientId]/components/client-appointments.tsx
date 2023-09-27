import { Card, CardHeader } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { Appointment } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ClientAppointmentsProps {
  clientAppointments: Appointment[] | null;
}

const ClientAppointments: React.FC<ClientAppointmentsProps> = ({
  clientAppointments,
}) => {
  return (
    <div>
      <Card className="p-4">
        <Heading title={`All Appointments`} />
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Payment Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientAppointments?.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.startTime.toLocaleDateString()}</TableCell>
                <TableCell>
                  {appointment.startTime.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {appointment.endTime.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell >{appointment.isPaid ? <Badge variant={'green'}>Paid</Badge> : <Badge variant={'destructive'}>Not Paid</Badge>}</TableCell>
              </TableRow>
            ))}
            
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ClientAppointments;
