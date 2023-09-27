import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { v4 as uuidv4 } from 'uuid';

export async function POST(
  req: Request,
  { params }: { params: { practiceId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unathenticated", { status: 401 });

    const appointments = await prismadb.appointment.findMany({
      where: { practiceId: params.practiceId },
    });
    const formattedAppointments = appointments.map((appointment) => (
      {
        Id: appointment.id,
        Subject: appointment.clientName,
        Description: appointment.notes,
        StartTime: appointment.startTime,
        EndTime: appointment.endTime,
        IsAllDay: appointment.isAllDay,
      }
    ))

    return NextResponse.json(formattedAppointments);
  } catch (err: any) {
    console.log("[APPOINTMENTS_GET]", err);
    return new NextResponse(err.message, { status: 500 });
  }
}