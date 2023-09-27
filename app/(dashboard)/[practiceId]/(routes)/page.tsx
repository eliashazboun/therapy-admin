import Container from "@/components/layout/container";
import { Heading } from "@/components/ui/heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DollarSign,
  CreditCard,
  Package,
  PersonStanding,
  CalendarDays,
} from "lucide-react";
import { getClientCount } from "@/actions/get-client-count";
import { getAppointmentsTodayCount } from "@/actions/get-appts-today-count";
import { getTodaysAppointments } from "@/actions/get-todays-appointments";
import { Appointment } from "@prisma/client";
import AppointmentHolder from "@/components/appointment-holder";



const DashboardPage = async ({
  params,
}: {
  params: { practiceId: string };
}) => {
  const clientCount = await getClientCount(params.practiceId);
  const todayAppointmentCount = await getAppointmentsTodayCount(params.practiceId );
  const todaysAppointments = await getTodaysAppointments(params.practiceId);

  console.log("Todays Appointments: ", todaysAppointments)

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-9 pt-6">
        <Heading title="Dashboard" description="Overview of your practice" />
        <Separator />
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Number of Clients
              </CardTitle>
              <PersonStanding className="" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Number of Appointments Today
              </CardTitle>
              <CalendarDays className="" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayAppointmentCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{12}</div>
            </CardContent>
          </Card>
        </div>
        <Separator />
        <div className="grid gap-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
          <Card className="cols-span-1 p-4">
            <CardTitle>Todays Appointments</CardTitle>
            <CardDescription>Appointments you have scheduled for today.</CardDescription>
            <CardContent className="pl-2 grid grid-cols-1">
              {todaysAppointments instanceof Array && todaysAppointments.map((appointment: Appointment) => (
                <AppointmentHolder key={appointment.id} appointment={appointment} /> 
              ))}

            </CardContent>
          </Card>
          <Card className="col-span-1 p-4">
            <CardTitle>Appointment Requests</CardTitle>
            <CardDescription>Accept or decline appointment requests.</CardDescription>

            <CardContent className="pl-2"></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
